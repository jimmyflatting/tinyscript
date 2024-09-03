'use client';

import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import PriceCard from '../ui/PriceCard';
import { Stripe } from 'stripe';
const prices = [
  {
    title: 'Starter',
    price: '$19',
    features: ['Up to 1.000 messages', 'Base model'],
    interval: 'per month',
    price_id: 'price_1P5K13EzZvKYlo2C105Z0XjF',
  },
  {
    title: 'Plus',
    price: '$29',
    features: ['Up to 5.000 messages', 'Plus model'],
    interval: 'per month',
    price_id: 'price_1P5K13EzZvKYlo2C105Z0XjF',
  },
  {
    title: 'Pro',
    price: '$99',
    features: ['Up to 10.000 messages', 'Premium model'],
    interval: 'per month',
    price_id: 'price_1P5K13EzZvKYlo2C105Z0XjF',
  },
];

function Pricing({ products }: { products: Stripe.Product[] }) {
  // console.log(products);
  return (
    <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Pricing Plans to Fit Your Needs
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that works best for your business and scale as you
              grow.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {prices.map((price) => (
            <PriceCard key={price.title} {...price} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
