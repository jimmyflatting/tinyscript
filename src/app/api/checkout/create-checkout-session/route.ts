import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import ReactGA from "react-ga4";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    let userId: string | undefined;

    // Log the request headers for debugging
    console.log("Request headers:", Object.fromEntries(req.headers));

    const contentType = req.headers.get("content-type");
    let body;

    if (contentType?.includes("application/json")) {
      body = await req.json();
    } else if (contentType?.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      body = Object.fromEntries(formData);
    } else {
      const text = await req.text();
      console.log("Request body:", text);
      try {
        body = JSON.parse(text);
      } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
      }
    }

    userId = body.userId;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1PtlTWGq5NXltWykLWpwW3q9",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.FRONTEND_URL}/app/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/app/?canceled=true&session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        userId: userId,
        subscription: "true"
      },
      client_reference_id: userId
    });

    ReactGA.event({
      category: "Checkout",
      action: "Checkout Started",
      label: session.id,
    });

    return NextResponse.redirect(session.url as string, 303);
  } catch (err) {
    console.error("Checkout error:", err);
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
