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
        <ProblemSolution />
        <StatsBand />
        <HowItWorks />
        <EnginesGrid />
        <ComparisonTable />
        <Testimonials />
        <Pricing />
        <CTABanner />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}
