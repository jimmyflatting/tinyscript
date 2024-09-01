import Pricing from '@/components/ui/Pricing/Pricing';
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';
import Hero from '@/components/ui/Hero/Hero';
import ReactGA from 'react-ga4';
import Bullets from '@/components/ui/Bullets/Bullets';
import Faq from '@/components/ui/Faq/Faq';
import Cta from '@/components/ui/Cta/Cta';

export default async function PricingPage() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  ReactGA.send({
    hitType: 'pageview',
    page: '/',
    title: 'Home Page'
  });

  console.log(user);

  return (
    <>
      <Hero />
      <Bullets />
      <Pricing
        user={user}
        products={products ?? []}
        subscription={subscription}
      />
      <Faq />
      <Cta />
    </>
  );
}
