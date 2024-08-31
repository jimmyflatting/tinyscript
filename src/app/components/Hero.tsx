import React, { useState } from "react";

const Hero: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg p-8 flex items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Your AI-powered coding assistant for seamless development.
            </h1>
            <p className="text-lg mb-6">
              From squashing bugs to building features—when you're in a bind,
              TinyScript is here to help.
            </p>
            <button className="inline-flex items-center px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300">
              <span>Get started for free</span>
              <i className="fa-solid fa-chevron-right ml-2"></i>
            </button>
          </div>
        </div>
        <div>
          <div className="bg-card text-primary font-mono rounded-lg p-4 h-[400px] flex flex-col justify-between">
            <div className="overflow-y-auto whitespace-pre-wrap flex-grow mb-2"></div>
            <div>
              <input
                disabled
                type="text"
                placeholder="|"
                className="w-full bg-background border-none p-2 text-primary font-mono text-sm outline-none rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
