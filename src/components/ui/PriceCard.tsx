"use client";

import React from "react";
import { Card } from "./card";
import { Button } from "./button";
import { CheckIcon } from "lucide-react";
function PriceCard({
  title,
  price,
  features,
  interval,
  price_id,
}: {
  title: string;
  price: string;
  features: string[];
  interval: string;
  price_id: string;
}) {
  const handleClick = () => {
    console.log(price_id);
  };
  return (
    <Card className="flex flex-col space-y-4 rounded-xl border p-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-4xl font-bold">{price}</p>
        <p className="text-muted-foreground">{interval}</p>
      </div>
      <ul className="space-y-2 text-muted-foreground">
        {features.map((feature, index) => (
          <li className="flex items-center gap-2" key={index}>
            <CheckIcon className="h-4 w-4 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      <Button onClick={handleClick} className="mt-auto">
        Get Started
      </Button>
    </Card>
  );
}

export default PriceCard;
