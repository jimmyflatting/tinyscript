"use client";

import React from "react";
import { Card } from "./card";
import { Button } from "./button";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  interval: string;
}

function PriceCard({ product }: { product: Product }) {
  const router = useRouter();
  const handleClick = () => {
    console.log(product);
    // Implement your checkout logic here
    // link to /register
    router.push("/register");
  };

  console.log(product);

  return (
    <Card className="flex flex-col space-y-4 rounded-xl border p-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="text-4xl font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: product.currency,
          }).format(product.price)}
        </p>
        <p className="text-muted-foreground">/{product.interval}</p>
      </div>
      {product.description && (
        <ul className="space-y-2 text-muted-foreground">
          {product.description
            .split(". ")
            .map((feature: string, index: number) => (
              <li className="flex items-center gap-2" key={index}>
                <CheckIcon className="h-4 w-4 text-green-500" />
                {feature}
              </li>
            ))}
        </ul>
      )}
      <Button onClick={handleClick} className="mt-auto">
        Get Started
      </Button>
    </Card>
  );
}

export default PriceCard;
