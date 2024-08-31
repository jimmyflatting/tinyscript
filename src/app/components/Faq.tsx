import React from "react";

const Faq: React.FC = () => {
  return (
    <section id="faq" className="py-16">
      <div className="container mx-auto">
        <div className="bg-card rounded-lg p-8 text-text">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p>
              Here are some of our FAQs. If you have any other questions you'd
              like answered please feel free to email us.
            </p>
          </div>
          <div className="border-l border-primary pl-4 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-primary mb-1">
                What is TinyScript?
              </h3>
              <p>
                TinyScript is an AI-powered coding assistant designed to help
                developers write code more efficiently. Whether you're
                debugging, building new features, or just need a second pair of
                eyes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary mb-1">
                How do I use TinyScript?
              </h3>
              <p>
                Using TinyScript is simple! Just click on the "Try now" button
                on the homepage, and you'll be redirected to the app. From
                there, you can begin coding with the assistance of TinyScript.
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
