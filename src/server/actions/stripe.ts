'use server';

import { stripe } from '@/server/config/stripe';
import dbConnect from '@/server/config/db';
import UserModel from '@/server/data/user';
import StripeModel from '@/server/data/stripe';
import { User } from '@/lib/types';

export async function getStripeProducts() {
  try {
    const products = await stripe.products.list({
      active: true,
      expand: ['data.prices'],
      limit: 100,
    });
    return products;
  } catch (error) {
    console.error('Error getting stripe products:', error);
    throw error;
  }
}

export async function createStripeCheckout(userId: string, productId: string) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account`,
    line_items: [
      {
        price: productId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
  });

  return session;
}

export async function createStripePortal(userId: string) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    await dbConnect();

    const user = await UserModel.findOne({ clerkId: userId });

    if (!user) {
      throw new Error('Could not find user.');
    }

    console.log(user.stripe);

    const stripeCustomer = await StripeModel.findOne({ _id: user.stripe });

    if (!stripeCustomer) {
      throw new Error('Could not find Stripe customer.');
    }

    const { url } = await stripe.billingPortal.sessions.create({
      customer: stripeCustomer.user,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/account`,
    });

    if (!url) {
      throw new Error('Could not create billing portal');
    }

    return url;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return `${
        process.env.NEXT_PUBLIC_APP_URL
      }/error?message=${encodeURIComponent(error.message)}`;
    } else {
      return `${process.env.NEXT_PUBLIC_APP_URL}/error?message=An unknown error occurred`;
    }
  }
}
