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
              It's just another LLM platform.
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              It&apos;s kinda good but try it out for yourself. - Any money made
              will be reinvested into the project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Action;
