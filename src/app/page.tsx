import Hero from "./components/Hero";
import Bullets from "./components/Bullets";
import Cta from "./components/Cta";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

const Home = async () => {
  return (
    <main>
      <Hero />
      <Bullets />
      <Cta />
      <Faq />
      <Footer />
    </main>
  );
};

export default Home;
