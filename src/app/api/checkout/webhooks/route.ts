import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const reqText = await req.text();
  return webhooksHandler(reqText, req);
}

async function getCustomerEmail(customerId: string): Promise<string | null> {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return (customer as Stripe.Customer).email;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

async function handleSubscriptionEvent(
  event: Stripe.Event,
  type: "created" | "updated" | "deleted"
) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerEmail = await getCustomerEmail(subscription.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  const client = await clientPromise;
  const db = client.db();

  try {
    if (type === "deleted" || (type === "updated" && subscription.status === "canceled")) {
      // Handle both immediate cancellation and cancellation at period end
      await db.collection("subscriptions").updateOne(
        { subscriptionId: subscription.id },
        { 
          $set: { 
            status: 'canceled',
            cancelAtPeriodEnd: false,
            updatedAt: new Date()
          } 
        }
      );
      await db.collection("users").updateOne(
        { email: customerEmail },
        { 
          $set: { 
            subscriptionStatus: 'canceled',
            cancelAtPeriodEnd: false,
            subscription: null
          } 
        }
      );
    } else {
      const subscriptionData: any = {
        subscriptionId: subscription.id,
        stripeCustomerId: subscription.customer,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        updatedAt: new Date(),
        plan: subscription.items.data[0]?.price.id,
      };

      if (type === "created") {
        subscriptionData.createdAt = new Date(subscription.created * 1000);
        await db.collection("subscriptions").insertOne(subscriptionData);
      } else {
        await db.collection("subscriptions").updateOne(
          { subscriptionId: subscription.id },
          { $set: subscriptionData }
        );
      }

      await db.collection("users").updateOne(
        { email: customerEmail },
        { 
          $set: { 
            subscriptionStatus: subscription.status,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            subscription: subscription.id
          } 
        }
      );
    }

    return NextResponse.json({
      status: 200,
      message: `Subscription ${type} success`,
    });
  } catch (error) {
    console.error(`Error during subscription ${type}:`, error);
    return NextResponse.json({
      status: 500,
      error: `Error during subscription ${type}`,
    });
  }
}

async function handleInvoiceEvent(
  event: Stripe.Event,
  status: "succeeded" | "failed"
) {
  const invoice = event.data.object as Stripe.Invoice;
  const customerEmail = await getCustomerEmail(invoice.customer as string);

  if (!customerEmail) {
    return NextResponse.json({
      status: 500,
      error: "Customer email could not be fetched",
    });
  }

  const invoiceData = {
    invoice_id: invoice.id,
    subscription_id: invoice.subscription as string,
    amount_paid: status === "succeeded" ? invoice.amount_paid / 100 : undefined,
    amount_due: status === "failed" ? invoice.amount_due / 100 : undefined,
    currency: invoice.currency,
    status,
    user_id: invoice.metadata?.userId,
    email: customerEmail,
  };

  const client = await clientPromise;
  const db = client.db();

  try {
    await db.collection("invoices").insertOne(invoiceData);

    return NextResponse.json({
      status: 200,
      message: `Invoice payment ${status}`,
    });
  } catch (error) {
    console.error(`Error inserting invoice (payment ${status}):`, error);
    return NextResponse.json({
      status: 500,
      error: `Error inserting invoice (payment ${status})`,
    });
  }
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.client_reference_id;

  if (!userId) {
    console.error("No user ID found in session");
    return NextResponse.json({ error: "No user ID found" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  try {
    // Fetch the subscription details
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

    // Update user with subscription info
    const updateResult = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          subscription: session.subscription as string,
          subscriptionStatus: subscription.status,
          stripeCustomerId: session.customer as string
        } 
      }
    );

    if (updateResult.modifiedCount === 0) {
      console.error(`No user found with ID: ${userId}`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create a new entry in the subscriptions collection
    await db.collection("subscriptions").insertOne({
      userId: new ObjectId(userId),
      subscriptionId: session.subscription,
      status: subscription.status,
      createdAt: new Date(),
      updatedAt: new Date(),
      stripeCustomerId: session.customer,
      plan: subscription.items.data[0]?.price.id
    });

    return NextResponse.json({
      status: 200,
      message: "Subscription created and user updated successfully",
    });
  } catch (error) {
    console.error("Error handling checkout session completed:", error);
    return NextResponse.json({
      status: 500,
      error: "Error handling checkout session completed",
    });
  }
}

async function webhooksHandler(
  reqText: string,
  request: NextRequest
): Promise<NextResponse> {
  const sig = request.headers.get("Stripe-Signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({
      status: 500,
      error: "Server configuration error",
    });
  }

  try {
    const event = await stripe.webhooks.constructEventAsync(
      reqText,
      sig!,
      webhookSecret
    );

    switch (event.type) {
      case "customer.subscription.created":
        return handleSubscriptionEvent(event, "created");
      case "customer.subscription.updated":
        return handleSubscriptionEvent(event, "updated");
      case "customer.subscription.deleted":
        return handleSubscriptionEvent(event, "deleted");
      case "invoice.payment_succeeded":
        return handleInvoiceEvent(event, "succeeded");
      case "invoice.payment_failed":
        return handleInvoiceEvent(event, "failed");
      case "checkout.session.completed":
        return handleCheckoutSessionCompleted(event);
      default:
        return NextResponse.json({
          status: 400,
          error: "Unhandled event type",
        });
    }
  } catch (err) {
    console.error("Error constructing Stripe event:", err);
    return NextResponse.json({
      status: 500,
      error: "Webhook Error: Invalid Signature",
    });
  }
}