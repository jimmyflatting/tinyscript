"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/Switch";
import { Product } from "@/types/product";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
interface PricingProps {
  products: Product[];
}

interface PricingProps {
  products: Product[];
}

function Pricing({ products }: PricingProps) {
  const router = useRouter();
  const [interval, setInterval] = useState<"month" | "year">("month");

  const sortedProducts = useMemo(() => {
    return [...products].sort(
      (a, b) => a.prices[interval].unit_amount - b.prices[interval].unit_amount
    );
  }, [products, interval]);

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that&apos;s right for you
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span>Monthly</span>
            <Switch
              checked={interval === "year"}
              onCheckedChange={() =>
                setInterval(interval === "month" ? "year" : "month")
              }
            />
            <span>Yearly</span>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold">
                  {product.prices[interval].unit_amount > 0 ? (
                    <>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: product.prices[interval].currency,
                        minimumFractionDigits: 0,
                      }).format(product.prices[interval].unit_amount / 100)}
                      <span className="text-sm font-normal">/{interval}</span>
                    </>
                  ) : (
                    "N/A"
                  )}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  {product.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {product.prices[interval].features &&
                  product.prices[interval].features.length > 0 ? (
                    product.prices[interval].features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted-foreground">
                      No features listed for this plan
                    </li>
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    router.push("/register");
                  }}
                  disabled={product.prices[interval].unit_amount === 0}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
