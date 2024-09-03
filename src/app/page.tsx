import Footer from '@/components/Footer';
import Action from '@/components/Home/Action';
import Cards from '@/components/Home/Cards';
import Hero from '@/components/Home/Hero';
import Pricing from '@/components/Home/Pricing';
import { currentUser } from '@clerk/nextjs/server';
import { getStripeProducts } from '@/server/actions/stripe';

export default async function Page() {
  const user = await currentUser();
  const productsResponse = await getStripeProducts();
  const products = productsResponse.data;

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
