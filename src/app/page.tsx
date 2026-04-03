import type { Metadata } from "next";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import GlobalScripts from "@/components/GlobalScripts";
import Nav from "@/components/Nav";
import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
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
import Pricing from "@/components/Pricing";
import ComplianceBar from "@/components/ComplianceBar";
import CTABanner from "@/components/CTABanner";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "XSEE — Prove Every Attack Path is Real",
  description:
    "XSEE proves which attack paths in your cloud are actually exploitable — with cryptographic evidence per hop, live AWS API validation, and AI attacker simulation. Not theory. Proof.",
};

/** Hero-adjacent subheadline under “Live Intelligence” (replaces legacy read-only IAM one-liner). */
const HOME_LIVE_INTEL_SUBHEADLINE =
  "Starts read-only. Optionally add one-click remediation — you approve every fix, XSEE applies and verifies automatically.";

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <GlobalScripts />
      <Nav />
      <AnnouncementBar />
      <main className="w-full max-w-[100vw] mx-auto">
        <Hero />
        <TrustStrip />
        <AttackGraphPreview />
        <DetectionCoverageChart />
        <div className="sec-transition sec-dark-to-light" />
        <ProblemSolution />
        <div className="sec-transition sec-light-to-dark" />
        <AiAttackerSection />
        <div className="sec-transition sec-dark-to-light" />
        <section className="shock-stats-section" id="stats">
          <p
            style={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#475569",
              marginBottom: 48,
            }}
          >
            The Reality
          </p>

          <div className="section-head reveal" style={{ marginBottom: 48 }}>
            <h2 className="display-md" style={{ textAlign: "center", margin: "0 auto 16px" }}>
              The numbers security teams don't want to see — until they do.
            </h2>
          </div>

          <div className="shock-stats-grid reveal-on-scroll">
            <div className="shock-stat-cell">
              <div className="shock-stat-number font-mono">
                <span id="stat-alerts">4,000</span>
              </div>
              <p className="shock-stat-label">
                Alerts your scanner generates per month
              </p>
              <p className="shock-stat-fine">
                Average for a 500-asset AWS environment
              </p>
            </div>
            <div className="shock-stat-cell shock-stat-red">
              <div className="shock-stat-number font-mono">
                <span id="stat-critical">3</span>
              </div>
              <p className="shock-stat-label">
                That actually reach your crown jewels
              </p>
              <p className="shock-stat-fine">
                The only 3 that matter
              </p>
            </div>
            <div className="shock-stat-cell">
              <div className="shock-stat-number font-mono">
                <span id="stat-undetected">92</span>
                <span className="shock-stat-suffix">%</span>
              </div>
              <p className="shock-stat-label">
                Of attack paths undetected by GuardDuty
              </p>
              <p className="shock-stat-fine">
                Measured across XSEE-validated environments
              </p>
            </div>
            <div className="shock-stat-cell shock-stat-red">
              <div className="shock-stat-number font-mono">
                <span id="stat-detect">34</span>
                <span className="shock-stat-suffix">%</span>
              </div>
              <p className="shock-stat-label">
                Average Detection Coverage Score
              </p>
              <p className="shock-stat-fine">
                Most teams are blind to 66% of attack steps
              </p>
            </div>
          </div>

          <div className="shock-cta-wrap">
            <p className="shock-cta-headline">
              What's your Detection Coverage Score? Find out in 30 minutes — free.
            </p>
            <a href="/free-scan" className="shock-cta-btn">
              Run Free Scan →
            </a>
          </div>
        </section>
        <StatsBand />
        <TerminalSection subheadline={HOME_LIVE_INTEL_SUBHEADLINE} />
        <div className="sec-transition sec-tint-to-dark" style={{ background: "linear-gradient(to bottom,#040B18,#040B18)" }} />
        <HowItWorks />
        <CompleteLoopSection />
        <div className="sec-transition sec-dark-to-light" />
        <EnginesGrid />
        <div className="sec-transition sec-light-to-dark" />
        <ComparisonTable />
        <div className="sec-transition sec-dark-to-light" />
        <Testimonials />
        <div className="sec-transition sec-light-to-tint" />
        <Pricing />
        <div className="sec-warm-line" />
        <ComplianceBar />
        <CTABanner />
        <div className="sec-transition sec-dark-to-light" />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}
