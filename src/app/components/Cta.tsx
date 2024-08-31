"use client";

import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const Cta: React.FC = () => {
  const { openLoginModal } = useAuth();
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
          <button
            className="inline-block px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300"
            onClick={openLoginModal}
          >
            Try for free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
