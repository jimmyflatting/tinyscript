import React from "react";

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-5 text-text">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-primary">Pro Plan</h2>
              <h3 className="text-lg">Monthly</h3>
              <h2 className="text-2xl font-bold">
                $20<span className="text-base font-normal">/monthly</span>
              </h2>
              <p>
                Perfect for trying out TinyScript without a long-term
                commitment.
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 text-center">
              <form method="POST" action="/app/create-checkout-session">
                <input
                  type="hidden"
                  name="price_id"
                  value="price_1PrjsIGq5NXltWyk0fLJlUR2"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300"
                >
                  Get started
                </button>
              </form>
            </div>
          </div>
          <div className="bg-card rounded-lg p-5 text-text border border-primary">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-primary">
                Pro Plan (6+ months free)
              </h2>
              <h3 className="text-lg">Yearly</h3>
              <h2 className="text-2xl font-bold">
                $100<span className="text-base font-normal">/yearly</span>
              </h2>
              <p>
                Best value for committed developers looking to save in the long
                run.
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 text-center">
              <form method="POST" action="/app/create-checkout-session">
                <input
                  type="hidden"
                  name="price_id"
                  value="price_1PrjsIGq5NXltWyklZBGeHCR"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300"
                >
                  Get started
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
