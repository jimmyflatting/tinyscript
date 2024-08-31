import Hero from "./components/Hero";
import Bullets from "./components/Bullets";
import Cta from "./components/Cta";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import ReactGA from "react-ga4";

const Home = async () => {
  ReactGA.send({
    hitType: "pageview",
    page: "/",
    title: "Home Page",
  });
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
