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
import QuoteSection from "@/components/homepage/QuoteSection";
import CertificateSection from "@/components/homepage/CertificateSection";
import ComparisonSection from "@/components/homepage/ComparisonSection";
import Pricing from "@/components/Pricing";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "XSEE — Stop guessing. Prove the breach.",
  description:
    "Cloud security tools generate thousands of findings. XSEE proves which ones are real attack paths — with live AWS API evidence per hop, attack simulation, and a Breach Prevention Certificate when it's fixed.",
};

/**
 * Section order matches verified handoff `app.jsx`:
 * Hero → TrustedBy → Problem → ProofLoop → Proof → AI → Detection → Stats → Engines
 * → ZeroWrite → Loop → Quote → Certificate → Comparison → Pricing → BuiltBy
 *
 * Production-only (not in export): CTABanner (#get-started), ContactForm (#contact), then Footer.
 * Removed from homepage vs older main: Terminal, Testimonials, SecurityCompliance white band,
 * Pricing dot-texture wrapper, ComplianceBar.
 */
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
          {/* 01 — Claim and live attack-state instrument */}
          <HomeHero />
          {/* 02 — Enterprise trust rail */}
          <TrustedByStrip />
          {/* 03 — Findings compressed into real paths */}
          <ProblemSection />
          {/* 04 — Autonomous validation loop */}
          <ProofLoopSection />
          {/* 05 — Evidence workspace and signed closure artifact */}
          <ProofSection />
          <CertificateSection />
          {/* 06 — Customer outcomes and concise competitive proof */}
          <QuoteSection />
          <ComparisonSection />
          {/* 07 — Commercial path and conversion */}
          <Pricing />
          <CTABanner />
          <Footer />
        </main>
      </div>
    </>
  );
}
