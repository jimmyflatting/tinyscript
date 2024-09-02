import React from "react";
import { Card } from "../ui/card";

function Cards() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Unlock Your Business Potential
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our SaaS platform offers a comprehensive suite of tools and
              features to help your business thrive.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            {/* <InfoIcon className="h-12 w-12 text-primary" /> */}
            <h3 className="text-xl font-bold">Effortless coding assistance</h3>
            <p className="text-muted-foreground">
              TinyScript speeds up your workflow by providing smart,
              context-aware code suggestions, so you can focus on building.
            </p>
          </Card>
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            {/* <BotIcon className="h-12 w-12 text-primary" /> */}
            <h3 className="text-xl font-bold">Reduce cognitive load</h3>
            <p className="text-muted-foreground">
              Let TinyScript handle repetitive coding tasks, giving you more
              mental space to solve complex problems.
            </p>
          </Card>
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            {/* <CombineIcon className="h-12 w-12 text-primary" /> */}
            <h3 className="text-xl font-bold">Code with confidence</h3>
            <p className="text-muted-foreground">
              TinyScript helps you catch errors and improve code quality,
              reducing bugs before they reach production.
            </p>
          </Card>
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            {/* <ScalingIcon className="h-12 w-12 text-primary" /> */}
            <h3 className="text-xl font-bold">Stay in the flow</h3>
            <p className="text-muted-foreground">
              Maintain momentum in your coding sessions with TinyScript's
              on-demand guidance, keeping interruptions to a minimum.
            </p>
          </Card>
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            {/* <LockIcon className="h-12 w-12 text-primary" /> */}
            <h3 className="text-xl font-bold">Security</h3>
            <p className="text-muted-foreground">
              Protect your data and ensure compliance with our robust security
              features.
            </p>
          </Card>
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            {/* <PowerIcon className="h-12 w-12 text-primary" /> */}
            <h3 className="text-xl font-bold">Expert Support</h3>
            <p className="text-muted-foreground">
              Get dedicated support from our team of experts to help you
              succeed.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Cards;
