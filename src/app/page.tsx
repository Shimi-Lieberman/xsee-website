import type { Metadata } from "next";
import "./homepage.css";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { ScrollTracker } from "@/components/ScrollTracker";
import GlobalScripts from "@/components/GlobalScripts";
import AnnouncementBar from "@/components/homepage/AnnouncementBar";
import HomeNav from "@/components/homepage/HomeNav";
import HomeHero from "@/components/homepage/HomeHero";
import TrustedByStrip from "@/components/homepage/TrustedByStrip";
import ProblemSection from "@/components/homepage/ProblemSection";
import ProofLoopSection from "@/components/homepage/ProofLoopSection";
import ProofSection from "@/components/homepage/ProofSection";
import HomeScrollReveal from "@/components/homepage/HomeScrollReveal";
import HomepageStatsBand from "@/components/homepage/StatsBand";
import ZeroWriteSection from "@/components/homepage/ZeroWriteSection";
import AiAttackerSection from "@/components/AiAttackerSection";
import DetectionCoverageChart from "@/components/DetectionCoverageChart";
import TerminalSection from "@/components/TerminalSection";
import LoopSection from "@/components/homepage/LoopSection";
import CertificateSection from "@/components/homepage/CertificateSection";
import ComparisonSection from "@/components/homepage/ComparisonSection";
import EnginesGrid from "@/components/EnginesGrid";
import Testimonials from "@/components/Testimonials";
import SecurityComplianceTrustSection from "@/components/SecurityComplianceTrustSection";
import Pricing from "@/components/Pricing";
import ComplianceBar from "@/components/ComplianceBar";
import CTABanner from "@/components/CTABanner";
import ContactForm from "@/components/ContactForm";
import BuiltByStrip from "@/components/homepage/BuiltByStrip";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "XSEE — Stop guessing. Prove the breach.",
  description:
    "Cloud security tools generate thousands of findings. XSEE proves which ones are real attack paths — with live AWS API evidence per hop, attack simulation, and a Breach Prevention Certificate when it's fixed.",
};

const TERMINAL_SUBHEADLINE =
  "Starts read-only. Optionally add one-click remediation — you approve every fix; your Lambda applies it (in your AWS account), and XSEE re-verifies by re-running the original attack simulation. Nothing changes without you.";

export default function Home() {
  return (
    <>
      <ScrollTracker />
      <ScrollProgressBar />
      <GlobalScripts />
      <div className="hp-page min-h-screen">
        <AnnouncementBar />
        <HomeNav />
        <main className="hp-page-main w-full max-w-[100vw] mx-auto">
          <HomeScrollReveal />
          <HomeHero />
          <TrustedByStrip />
          <ProblemSection />
          <ProofLoopSection />
          <ProofSection />
          <div style={{ background: "var(--dark)" }}>
            <AiAttackerSection />
          </div>
          <DetectionCoverageChart />
          <div style={{ background: "var(--dark)" }}>
            <TerminalSection subheadline={TERMINAL_SUBHEADLINE} />
          </div>
          <HomepageStatsBand />
          <div style={{ background: "#030810" }}>
            <EnginesGrid />
          </div>
          <ZeroWriteSection />
          <LoopSection />
          <CertificateSection />
          <ComparisonSection />
          <div style={{ background: "white" }}>
            <Testimonials />
          </div>
          <div style={{ background: "white" }}>
            <SecurityComplianceTrustSection />
          </div>
          <div className="dot-texture" style={{ background: "#f4f4f2", position: "relative", overflow: "hidden" }}>
            <Pricing />
          </div>
          <div style={{ background: "#0c1120" }}>
            <ComplianceBar />
          </div>
          <BuiltByStrip />
          <CTABanner />
          <div className="sec-transition sec-dark-to-light" />
          <ContactForm />
          <Footer />
        </main>
      </div>
    </>
  );
}
