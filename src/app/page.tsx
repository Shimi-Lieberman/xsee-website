import ScrollProgressBar from "@/components/ScrollProgressBar";
import GlobalScripts from "@/components/GlobalScripts";
import Nav from "@/components/Nav";
import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProblemSolution from "@/components/ProblemSolution";
import StatsBand from "@/components/StatsBand";
import HowItWorks from "@/components/HowItWorks";
import EnginesGrid from "@/components/EnginesGrid";
import ComparisonTable from "@/components/ComparisonTable";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTABanner from "@/components/CTABanner";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <GlobalScripts />
      <Nav />
      <AnnouncementBar />
      <main>
        <Hero />
        <TrustStrip />
        <div className="sec-transition sec-dark-to-light" />
        <ProblemSolution />
        <StatsBand />
        <div className="sec-transition sec-light-to-tint" />
        <HowItWorks />
        <div className="sec-transition sec-dark-to-light" />
        <EnginesGrid />
        <div className="sec-transition sec-light-to-dark" />
        <ComparisonTable />
        <div className="sec-transition sec-dark-to-light" />
        <Testimonials />
        <div className="sec-transition sec-light-to-tint" />
        <Pricing />
        <div className="sec-warm-line" />
        <CTABanner />
        <div className="sec-transition sec-dark-to-light" />
        <ContactForm />
        <div className="sec-transition sec-light-to-dark" />
        <Footer />
      </main>
    </>
  );
}
