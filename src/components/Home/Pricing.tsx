import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

function Pricing() {
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
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Starter</h3>
              <p className="text-4xl font-bold">$9</p>
              <p className="text-muted-foreground">per month</p>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                {/* <CheckIcon className="h-4 w-4 text-green-500" /> */}
                Up to 5 users
              </li>
              <li className="flex items-center gap-2">
                {/* <CheckIcon className="h-4 w-4 text-green-500" /> */}
                5GB storage
              </li>
              <li className="flex items-center gap-2">
                {/* <CheckIcon className="h-4 w-4 text-green-500" /> */}
                Basic features
              </li>
            </ul>
            <Button className="mt-auto">Get Started</Button>
          </Card>
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Plus</h3>
              <p className="text-4xl font-bold">$29</p>
              <p className="text-muted-foreground">per month</p>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                {/* <CheckIcon className="h-4 w-4 text-green-500" /> */}
                Up to 25 users
              </li>
              <li className="flex items-center gap-2">
                {/* <CheckIcon className="h-4 w-4 text-green-500" /> */}
                50GB storage
              </li>
              <li className="flex items-center gap-2">
                {/* <CheckIcon className="h-4 w-4 text-green-500" /> */}
                Advanced features
              </li>
            </ul>
            <Button className="mt-auto">Get Started</Button>
          </Card>
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="text-4xl font-bold">$99</p>
              <p className="text-muted-foreground">per month</p>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                {/* <CheckIcon className="h-4 w-4 text-green-500" /> */}
                Unlimited users
              </li>
              <li className="flex items-center gap-2">
                {/* <CheckIcon className="h-4 w-4 text-green-500" /> */}
                Unlimited storage
              </li>
              <li className="flex items-center gap-2">
                {/* <CheckIcon className="h-4 w-4 text-green-500" /> */}
                Enterprise-grade features
              </li>
            </ul>
            <Button className="mt-auto">Get Started</Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
