import Footer from "@/components/Footer";
import Action from "@/components/Home/Action";
import Cards from "@/components/Home/Cards";
import Hero from "@/components/Home/Hero";
import Pricing from "@/components/Home/Pricing";
import { currentUser } from "@clerk/nextjs/server";
import { getStripeProducts } from "@/server/actions/stripe";
import ReactGA from "react-ga4";

export default async function Page() {
  ReactGA.initialize("G-0J51VNPXCB");
  ReactGA.send({ hitType: "pageview", pagePath: "/" });
  const user = await currentUser();
  const products = await getStripeProducts();

  return (
    <>
      <Hero />
      <Cards />
      <Pricing products={products} />
      <Action />
      <Footer />
    </>
  );
}
