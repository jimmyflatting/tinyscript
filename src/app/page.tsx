import Footer from "@/components/Footer";
import Action from "@/components/Home/Action";
import Cards from "@/components/Home/Cards";
import Hero from "@/components/Home/Hero";
import Pricing from "@/components/Home/Pricing";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();

  return (
    <>
      <Hero />
      <Cards />
      <Pricing />
      <Action />
      <Footer />
    </>
  );
}
