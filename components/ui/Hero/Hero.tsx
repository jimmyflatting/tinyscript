import Link from 'next/link';
import React from 'react';
import { ChevronRight } from 'lucide-react';

function Hero() {
  return (
    <section>
      <div className="container mx-auto">
        <div className="bg-card rounded-lg p-8 flex items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl mb-4">
              We&apos;re changing the way you code
            </h1>
            <p className="text-lg mb-6">
              From squashing bugs to building features—when you&apos;re in a
              bind, TinyScript is here to help.
            </p>
            <Link
              href={'/chat'}
              className="inline-flex items-center px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300"
            >
              <span>Get started for free</span>
              <ChevronRight size={16} className="ml-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
