import { motion } from "framer-motion";
import MouseGlow from "../components/MouseGlow.jsx";
import Navbar from "../components/landing/Navbar.jsx";
import Hero from "../components/landing/Hero.jsx";
import StatsBar from "../components/landing/StatsBar.jsx";
import FeatureGrid from "../components/landing/FeatureGrid.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import Testimonials from "../components/landing/Testimonials.jsx";
import FAQ from "../components/landing/FAQ.jsx";
import CTASection from "../components/landing/CTASection.jsx";
import Footer from "../components/landing/Footer.jsx";

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="relative min-h-screen bg-void"
    >
      <MouseGlow />
      <Navbar />
      <Hero />
      <StatsBar />
      <FeatureGrid />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </motion.div>
  );
}
