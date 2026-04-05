import Navbar from "@/components/custom/Navbar";
import Hero from "@/components/custom/Hero";
import About from "@/components/custom/About";
import Services from "@/components/custom/Services";
import DarkQuote from "@/components/custom/DarkQuote";
import Methodology from "@/components/custom/Methodology";
import Experts from "@/components/custom/Experts";
import Schedule from "@/components/custom/Schedule";
import Blog from "@/components/custom/Blog";
import RestoreBalance from "@/components/custom/RestoreBalance";
import Pricing from "@/components/custom/Pricing";
import CTA from "@/components/custom/CTA";
import Footer from "@/components/custom/Footer";

export default function Home() {
  return (
    <div id="home" className="w-full relative">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <DarkQuote />
      <Methodology />
      <Experts />
      <Schedule />
      <Blog />
      <RestoreBalance />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
