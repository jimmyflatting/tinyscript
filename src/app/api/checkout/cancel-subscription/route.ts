import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Find the user and their subscription
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!user || !user.subscription) {
      return NextResponse.json({ error: "User or subscription not found" }, { status: 404 });
    }

    // Cancel the subscription in Stripe
    const canceledSubscription = await stripe.subscriptions.update(user.subscription, {
      cancel_at_period_end: true
    });

    // Update the user's subscription status in the database
    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          subscriptionStatus: 'canceling',
          cancelAtPeriodEnd: true
        } 
      }
    );

    // Update the subscription document in the database
    await db.collection("subscriptions").updateOne(
      { subscriptionId: user.subscription },
      { 
        $set: { 
          status: 'canceling',
          cancelAtPeriodEnd: true,
          updatedAt: new Date()
        } 
      }
    );

    return NextResponse.json({
      message: "Subscription cancellation scheduled",
      cancelAtPeriodEnd: canceledSubscription.cancel_at_period_end,
      currentPeriodEnd: new Date(canceledSubscription.current_period_end * 1000)
    });

  } catch (error) {
    console.error("Error canceling subscription:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}