'use client';

import Button from '@/components/ui/Button';
import LogoCloud from '@/components/ui/LogoCloud';
import type { Tables } from '@/types_db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function Pricing({ user, products, subscription }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('year');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setIsLoading(true);
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/signup');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
    setIsLoading(false);
  };

  // console.log(products[0].prices);

  if (!products.length) {
    return (
      <section>
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
        <LogoCloud />
      </section>
    );
  } else {
    return (
      <section>
        <div className="container">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Pricing Plans
            </h2>
            <p className="m-auto mt-5 text-xs text-zinc-200 sm:text-center sm:text-md">
              Start building for free, then add a plan to continue.
            </p>
            <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
              {intervals.includes('month') && (
                <button
                  onClick={() => setBillingInterval('month')}
                  type="button"
                  className={`${
                    billingInterval === 'month'
                      ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                      : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                  } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Monthly billing
                </button>
              )}
              {intervals.includes('year') && (
                <button
                  onClick={() => setBillingInterval('year')}
                  type="button"
                  className={`${
                    billingInterval === 'year'
                      ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-text'
                      : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                  } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Yearly billing
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            {products.map((product, index) => {
              const price = product?.prices?.find(
                (price) => price.interval === billingInterval
              );
              if (!price) return null;
              console.log(price);

              if (!price) return null;
              const priceString = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: price?.currency!,
                minimumFractionDigits: 0
              }).format((price?.unit_amount || 0) / 100);
              // format yearly price to show 12 months
              const yearlyPrice = Math.floor(
                (price?.unit_amount || 0) / 100 / 12
              );
              const yearlyPriceString = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: price?.currency!,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(yearlyPrice);
              return (
                <div
                  key={product.id}
                  className={cn(
                    'flex flex-col rounded-lg shadow-sm divide-y divide-card bg-card col-span-1 mx-auto w-full justify-between'
                  )}
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold leading-6">
                      {product.name}
                    </h2>
                    <p className="mt-4 text-zinc-300">{product.description}</p>
                    <p className="mt-6">
                      <span className="text-5xl font-extrabold white">
                        {billingInterval === 'year'
                          ? yearlyPriceString
                          : priceString}
                      </span>
                      <span className="text-base font-medium text-zinc-100">
                        /mo
                      </span>
                    </p>
                    <p className="text-zinc-300 text-xs mt-2">
                      {billingInterval === 'year'
                        ? priceString + ' Billed annually'
                        : priceString + ' Billed monthly'}
                    </p>
                    <ul className="list-disc list-inside mt-6 text-sm space-y-1">
                      {product.name === 'Plus' && (
                        <>
                          <li className="text-zinc-300">
                            Limited to 5.000 messages per month
                          </li>
                          <li className="text-zinc-300">
                            Limited access to new models
                          </li>
                          <li className="text-zinc-300">Feature requests</li>
                        </>
                      )}
                      {product.name === 'Unlimited' && (
                        <>
                          <li className="text-zinc-300">Unlimited messages</li>
                          <li className="text-zinc-300">
                            Early access to new models
                          </li>
                          <li className="text-zinc-300">Feature requests</li>
                        </>
                      )}
                    </ul>
                    <button
                      type="button"
                      onClick={() => handleStripeCheckout(price)}
                      className="px-4 py-2 border border-primary text-primary rounded-lg hover:opacity-90 transition duration-300 hover:bg-primary hover:text-background w-full mt-8"
                    >
                      <span className="flex items-center justify-center">
                        {!isLoading && (subscription ? 'Manage' : 'Subscribe')}
                        {isLoading && (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
