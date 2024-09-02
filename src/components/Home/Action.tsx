import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Action() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to Take Your Business to the Next Level?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sign up for a free trial and experience the power of our SaaS
              platform today.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1"
              />
              <Button type="submit">Start Free Trial</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Action;
