import React from "react";
import { Card } from "../ui/card";

function Cards() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Enhance Your Coding Experience
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Elevate your coding process with TinyScript, designed to assist
              and inspire developers at every level.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            <h3 className="text-xl font-bold">Streamlined Coding</h3>
            <p className="text-muted-foreground">
              Benefit from TinyScript&apos;s intelligent code suggestions to
              help you write cleaner, more efficient code faster.
            </p>
          </Card>
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            <h3 className="text-xl font-bold">Simplified Problem-Solving</h3>
            <p className="text-muted-foreground">
              Let TinyScript handle routine tasks, freeing you to focus on
              solving complex challenges and creative coding.
            </p>
          </Card>
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            <h3 className="text-xl font-bold">Code Improvement</h3>
            <p className="text-muted-foreground">
              Enhance your code quality with TinyScript&apos;s suggestions for
              best practices and potential optimizations.
            </p>
          </Card>
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            <h3 className="text-xl font-bold">Continuous Learning</h3>
            <p className="text-muted-foreground">
              Expand your coding knowledge with TinyScript&apos;s explanations
              and examples, helping you grow as a developer.
            </p>
          </Card>
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            <h3 className="text-xl font-bold">Customizable Experience</h3>
            <p className="text-muted-foreground">
              Tailor TinyScript to your needs, adjusting its suggestions and
              behavior to match your coding style and preferences.
            </p>
          </Card>
          <Card className="flex flex-col space-y-4 rounded-xl border p-6">
            <h3 className="text-xl font-bold">Inspiration Boost</h3>
            <p className="text-muted-foreground">
              Overcome creative blocks with TinyScript&apos;s ability to
              generate ideas and suggest alternative approaches to coding
              challenges.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Cards;
