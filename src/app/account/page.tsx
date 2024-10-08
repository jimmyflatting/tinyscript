import Billing from "@/components/Account/Billing";
import Settings from "@/components/Account/Settings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | TinyScript",
  description: "Easy code LLM for your projects",
};

function page() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:gap-12">
          <Settings />
          <Billing />
        </div>
      </div>
    </section>
  );
}

export default page;
