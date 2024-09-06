"use client";

import React, { useState } from "react";
import { createStripePortal } from "@/server/actions/stripe";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { CreditCardIcon, Loader2 } from "lucide-react";

function Billing() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { userId } = useAuth();

  const handleStripePortalRequest = async () => {
    if (!userId) return;
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(userId);
    setIsSubmitting(false);
    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      console.error("Failed to create Stripe portal session");
    }
  };

  return (
    <Card className="flex flex-col justify-between h-full">
      <div>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>Manage your billing information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {/* <div className="text-sm text-muted-foreground mb-3">
              Your current plan is the Pro plan at $9 per month.
            </div> */}
            <div className="text-sm text-muted-foreground">
              You can update your payment method, view invoices, and cancel your
              subscription from the customer portal.
            </div>
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button onClick={handleStripePortalRequest} className="ml-auto gap-x-2">
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <CreditCardIcon className="h-4 w-4" />
              Manage Billing
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Billing;

// function CreditCardIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="20" height="14" x="2" y="5" rx="2" />
//       <line x1="2" x2="22" y1="10" y2="10" />
//     </svg>
//   );
// }
