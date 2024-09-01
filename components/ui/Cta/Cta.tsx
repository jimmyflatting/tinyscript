import Link from 'next/link';
import React from 'react';

function Cta() {
  return (
    <section>
      <div className="container mx-auto">
        <div className="bg-card rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-2">
            Ready to supercharge your coding?
          </h2>
          <p className="italic mb-8">
            Sign up today and elevate your development skills with TinyScript.
          </p>
          <Link
            href="/signin"
            className="inline-block px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300"
          >
            Try for free
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cta;
