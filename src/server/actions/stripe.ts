'use server';

import { stripe } from '@/server/config/stripe';
import dbConnect from '@/server/config/db';
import UserModel from '@/server/data/user';
import StripeModel from '@/server/data/stripe';
import { User } from '@/lib/types';
import Stripe from 'stripe';
import { Product } from '@/types/product';


export async function getStripeProducts(): Promise<Product[]> {
  const stripeProducts = await stripe.products.list({
    expand: ['data.default_price'],
    active: true,
  });

  const products: Product[] = await Promise.all(
    stripeProducts.data.map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
      });

      const getFeatures = (price: Stripe.Price): string[] => {
        const features: string[] = [];
        if (price.metadata) {
          for (let i = 1; price.metadata[`feature_${i}`]; i++) {
            features.push(price.metadata[`feature_${i}`]);
          }
        }
        return features;
      };

      const monthlyPrice = prices.data.find(price => price.recurring?.interval === 'month');
      const yearlyPrice = prices.data.find(price => price.recurring?.interval === 'year');

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0] || '',
        prices: {
          month: monthlyPrice ? {
            id: monthlyPrice.id,
            unit_amount: monthlyPrice.unit_amount || 0,
            currency: monthlyPrice.currency,
            features: getFeatures(monthlyPrice),
          } : {
            id: '',
            unit_amount: 0,
            currency: 'usd',
            features: [],
          },
          year: yearlyPrice ? {
            id: yearlyPrice.id,
            unit_amount: yearlyPrice.unit_amount || 0,
            currency: yearlyPrice.currency,
            features: getFeatures(yearlyPrice),
          } : {
            id: '',
            unit_amount: 0,
            currency: 'usd',
            features: [],
          },
        },
      };
    })
  );

  return products;
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

  return session.url;
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

export async function updateUserTokens(userId: string) {
  await dbConnect();
  await UserModel.updateOne({ clerkId: userId }, { $inc: { available_tokens: -1 } });
}

export async function updateUserSubscription(userId: string, subscription: string) {
  await dbConnect();
  await UserModel.updateOne({ clerkId: userId }, { $set: { subscription_status: subscription } });

  switch (subscription) { 
    case 'pro':
      await UserModel.updateOne({ clerkId: userId }, { $set: { available_tokens: 10000 } });
      break;
    case 'plus':
      await UserModel.updateOne({ clerkId: userId }, { $set: { available_tokens: 5000 } });
      break;
    case 'starter':
      await UserModel.updateOne({ clerkId: userId }, { $set: { available_tokens: 2500 } });
      break;
  }
}