import type { Metadata } from "next";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import GlobalScripts from "@/components/GlobalScripts";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { BeforeAfter } from "@/components/BeforeAfter";
import HeroSocialProofStats from "@/components/HeroSocialProofStats";
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
import { CountUp } from "@/components/CountUp";

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
      <main className="w-full max-w-[100vw] mx-auto">
        <Hero />
        <div
          className="home-stats-strip reveal"
          style={{ background: "white", borderBottom: "1px solid #f1f5f9" }}
        >
          <div className="hero-stats mt-12 md:mt-16">
            <HeroSocialProofStats />
          </div>
        </div>
        <div className="reveal" style={{ background: "white" }}>
          <BeforeAfter />
        </div>
        <div style={{ background: "white", borderBottom: "1px solid #f1f5f9" }}>
          <TrustStrip />
        </div>
        <AttackGraphPreview />
        <DetectionCoverageChart />
        <div className="sec-transition sec-dark-to-light" />
        <ProblemSolution />
        <div className="sec-transition sec-light-to-dark" />
        <AiAttackerSection />
        <div className="sec-transition sec-dark-to-light" />
        <div className="reveal" style={{ background: "#050d1a" }}>
          <section className="shock-stats-section" id="stats">
            <span className="section-eyebrow" style={{ display: "block", marginBottom: 48 }}>
              The Reality
            </span>

            <div className="section-head reveal" style={{ marginBottom: 48 }}>
              <h2 className="display-md" style={{ textAlign: "center", margin: "0 auto 16px", color: "#f8fafc" }}>
                The numbers security teams don&apos;t want to see — until they do.
              </h2>
            </div>

            <div className="shock-stats-grid reveal-on-scroll">
              <div className="shock-stat-cell stat-bar-accent">
                <div className="shock-stat-number font-mono">
                  <CountUp target={4000} color="#ef4444" duration={2000} />
                </div>
                <p className="shock-stat-label">
                  Alerts your scanner generates per month
                </p>
                <p className="shock-stat-fine">
                  Average for a 500-asset AWS environment
                </p>
              </div>
              <div className="shock-stat-cell shock-stat-red stat-bar-accent">
                <div className="shock-stat-number font-mono">
                  <CountUp target={3} color="#FF1B8D" duration={1200} />
                </div>
                <p className="shock-stat-label">
                  That actually reach your crown jewels
                </p>
                <p className="shock-stat-fine">
                  The only 3 that matter
                </p>
              </div>
              <div className="shock-stat-cell stat-bar-accent">
                <div className="shock-stat-number font-mono">
                  <CountUp target={92} suffix="%" color="#f97316" duration={1800} />
                </div>
                <p className="shock-stat-label">
                  Of attack paths undetected by GuardDuty
                </p>
                <p className="shock-stat-fine">
                  Measured across XSEE-validated environments
                </p>
              </div>
              <div className="shock-stat-cell shock-stat-red stat-bar-accent">
                <div className="shock-stat-number font-mono">
                  <CountUp target={34} suffix="%" color="#eab308" duration={1600} />
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
                What&apos;s your Detection Coverage Score? Find out in 30 minutes — free.
              </p>
              <a href="/free-scan" className="shock-cta-btn btn-shimmer">
                <span className="relative z-[2]">Run Free Scan →</span>
              </a>
            </div>
          </section>
        </div>
        <StatsBand />
        <div style={{ background: "#050d1a" }}>
          <TerminalSection subheadline={HOME_LIVE_INTEL_SUBHEADLINE} />
        </div>
        <div className="sec-transition sec-tint-to-dark" style={{ background: "linear-gradient(to bottom,#040B18,#040B18)" }} />
        <div className="reveal" style={{ background: "#f8f9fc" }}>
          <HowItWorks />
        </div>
        <div style={{ background: "#050d1a" }}>
          <CompleteLoopSection />
        </div>
        <div className="sec-transition sec-dark-to-light" />
        <div className="reveal" style={{ background: "white" }}>
          <EnginesGrid />
        </div>
        <div className="sec-transition sec-light-to-dark" />
        <ComparisonTable />
        <div className="sec-transition sec-dark-to-light" />
        <div className="reveal" style={{ background: "#f8f9fc" }}>
          <Testimonials />
        </div>
        <div className="sec-transition sec-light-to-tint" />
        <div className="reveal" style={{ background: "white" }}>
          <Pricing />
        </div>
        <div style={{ background: "#080f1c" }}>
          <ComplianceBar />
        </div>
        <div style={{ background: "#050d1a" }}>
          <CTABanner />
        </div>
        <div className="sec-transition sec-dark-to-light" />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}
