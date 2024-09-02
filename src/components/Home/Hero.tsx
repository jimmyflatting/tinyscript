import Link from "next/link";
import React from "react";
import NeuralNetworkAnimation from "./NeuralNetworkAnimation";

function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      <NeuralNetworkAnimation />
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none mb-4">
            We&apos;re changing the way you code
          </h1>
          <p className="text-gray-300 md:text-xl mb-8 max-w-2xl">
            From squashing bugs to building features—when you&apos;re in a bind,
            TinyScript is here to help.
          </p>
          <Link
            href="/signup"
            className="inline-flex px-8 h-12 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            prefetch={false}
          >
            Get started for free
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
