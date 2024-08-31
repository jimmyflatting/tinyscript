import React from "react";

const Faq: React.FC = () => {
  return (
    <section id="faq">
      <div className="container mx-auto">
        <div className="bg-card rounded-lg p-8 text-text">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p>
              Here&apos;s a list of frequently asked questions. Can&apos;t find
              what you&apos;re looking for?
            </p>
          </div>
          <div className="border-l border-primary pl-4 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-primary mb-1">
                What is TinyScript?
              </h3>
              <p>
                TinyScript is an AI-powered coding assistant that helps you
                write better code faster. It&apos;s like having a senior
                developer sitting next to you, always ready to help with
                suggestions, explanations, and code generation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary mb-1">
                How do I use TinyScript?
              </h3>
              <p>
                Using TinyScript is simple! Just click on the &quot;Try
                now&quot; button on the homepage, and you&apos;ll be redirected
                to the app. From there, you can begin coding with the assistance
                of TinyScript.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary mb-1">
                Can I save my chats?
              </h3>
              <p>
                Yes, you can save your chats. TinyScript allows you to keep a
                record of your coding sessions, so you can easily refer back to
                previous conversations whenever needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
