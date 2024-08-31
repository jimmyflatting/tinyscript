import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import ReactGA from "react-ga4";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const { user_id } = await req.json();
  
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1PtlTWGq5NXltWykLWpwW3q9',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/?success=true`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
    });

    ReactGA.event({
      category: "Checkout",
      action: "Checkout Started",
      label: session.id,
    });

    if (session.id) {
      // update user's subscription status
      const client = await clientPromise;
      const db = client.db();

      const user = await db.collection('users').findOne({ _id: new ObjectId(user_id) });

      if (user) {
        await db.collection('users').updateOne(
          { _id: new ObjectId(user_id) },
          { $set: { subscriptionStatus: "active" } }
        );
      }
      
      ReactGA.event({
        category: "Checkout",
        action: "Checkout Completed",
        label: session.id,
      });
    }

    return NextResponse.redirect(session.url as string, 303);
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405, headers: { 'Allow': 'POST' } });
}