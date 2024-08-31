"use client";

import { useAuth } from "@/contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Hero: React.FC = () => {
  const { openLoginModal } = useAuth();

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
            <button
              onClick={openLoginModal}
              className="inline-flex items-center px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300"
            >
              <span>Get started for free</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                size="sm"
                className="ml-4"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
