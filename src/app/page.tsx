import type { Metadata } from "next";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { ScrollTracker } from "@/components/ScrollTracker";
import GlobalScripts from "@/components/GlobalScripts";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HomeProofSections from "@/components/HomeProofSections";
import { BeforeAfter } from "@/components/BeforeAfter";
import { NumbersMoment } from "@/components/NumbersMoment";
import AttackGraphPreview from "@/components/AttackGraphPreview";
import DetectionCoverageChart from "@/components/DetectionCoverageChart";
import TrustStrip from "@/components/TrustStrip";
import ProblemSolution from "@/components/ProblemSolution";
import AiAttackerSection from "@/components/AiAttackerSection";
import StatsBand from "@/components/StatsBand";
import TerminalSection from "@/components/TerminalSection";
import HowItWorks from "@/components/HowItWorks";
import CompleteLoopSection from "@/components/CompleteLoopSection";
import EnginesGrid from "@/components/EnginesGrid";
import ComparisonTable from "@/components/ComparisonTable";
import Testimonials from "@/components/Testimonials";
import TrustModel from "@/components/TrustModel";
import Pricing from "@/components/Pricing";
import SecurityComplianceTrustSection from "@/components/SecurityComplianceTrustSection";
import ComplianceBar from "@/components/ComplianceBar";
import CTABanner from "@/components/CTABanner";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "XSEE — Stop guessing. Prove the breach.",
  description:
    "Cloud security tools generate thousands of findings. XSEE proves which ones are real attack paths — with live AWS API evidence per hop, attack simulation, and a Breach Prevention Certificate when it's fixed.",
};

/** Hero-adjacent subheadline under “Live Intelligence” (replaces legacy read-only IAM one-liner). */
const HOME_LIVE_INTEL_SUBHEADLINE =
  "Starts read-only. Optionally add one-click remediation — you approve every fix, XSEE applies and verifies automatically.";

export default function Home() {
  return (
    <>
      <ScrollTracker />
      <ScrollProgressBar />
      <GlobalScripts />
      <Nav />
      <main className="w-full max-w-[100vw] mx-auto">
        <Hero />
        <HomeProofSections />
        <SecurityComplianceTrustSection />
        <NumbersMoment />
        <div className="reveal" style={{ background: "var(--dark)" }}>
          <BeforeAfter />
        </div>
        <div className="reveal" style={{ background: "white", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          <TrustStrip />
        </div>
        <div className="reveal">
          <AttackGraphPreview />
        </div>
        <div className="reveal">
          <DetectionCoverageChart />
        </div>
        <div className="sec-transition sec-dark-to-light" />
        <div className="reveal">
          <ProblemSolution />
        </div>
        <div className="sec-transition sec-light-to-dark" />
        <div className="reveal">
          <AiAttackerSection />
        </div>
        <div className="sec-transition sec-dark-to-light" />
        <StatsBand />
        <div className="reveal" style={{ background: "var(--dark)" }}>
          <TerminalSection subheadline={HOME_LIVE_INTEL_SUBHEADLINE} />
        </div>
        <div
          className="sec-transition sec-tint-to-dark"
          style={{ background: "linear-gradient(to bottom,#040B18,#040B18)" }}
        />
        <div
          className="reveal dot-texture"
          style={{ background: "#f4f4f2", position: "relative", overflow: "hidden" }}
        >
          <HowItWorks />
        </div>
        <div className="reveal" style={{ background: "var(--dark)" }}>
          <CompleteLoopSection />
        </div>
        <div className="sec-transition sec-dark-to-light" />
        <div className="reveal" style={{ background: "white" }}>
          <EnginesGrid />
        </div>
        <div className="sec-transition sec-light-to-dark" />
        <div style={{ background: "var(--dark)" }}>
          <ComparisonTable />
        </div>
        <div className="sec-transition sec-dark-to-light" />
        <div className="reveal" style={{ background: "white" }}>
          <Testimonials />
        </div>
        <div className="sec-transition sec-light-to-tint" />
        <div className="reveal" style={{ background: "white" }}>
          <TrustModel />
        </div>
        <div
          className="reveal dot-texture"
          style={{ background: "#f4f4f2", position: "relative", overflow: "hidden" }}
        >
          <Pricing />
        </div>
        <div className="reveal" style={{ background: "#0c1120" }}>
          <ComplianceBar />
        </div>
        <div style={{ background: "var(--dark)" }}>
          <CTABanner />
        </div>
        <div className="sec-transition sec-dark-to-light" />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}
