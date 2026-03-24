import ScrollProgressBar from "@/components/ScrollProgressBar";
import GlobalScripts from "@/components/GlobalScripts";
import Nav from "@/components/Nav";
import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProblemSolution from "@/components/ProblemSolution";
import StatsBand from "@/components/StatsBand";
import TerminalSection from "@/components/TerminalSection";
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
        <section className="shock-stats-section">
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
            THE REALITY OF CLOUD SECURITY
          </p>

          <div className="shock-stats-grid reveal-on-scroll">
            <div className="shock-stat-cell">
              <div className="shock-stat-number">
                <span id="stat-alerts">4,000</span>
              </div>
              <p className="shock-stat-label">
                alerts your scanner found
              </p>
              <p className="shock-stat-fine">
                3 actually reach your crown jewels
              </p>
            </div>
            <div className="shock-stat-cell">
              <div className="shock-stat-number">
                <span id="stat-undetected">92</span>
                <span className="shock-stat-suffix">%</span>
              </div>
              <p className="shock-stat-label">
                of attack paths go undetected by GuardDuty
              </p>
              <p className="shock-stat-fine">
                Source: XSEE validation data
              </p>
            </div>
            <div className="shock-stat-cell">
              <div className="shock-stat-number">
                &lt;30
                <span className="shock-stat-suffix">m</span>
              </div>
              <p className="shock-stat-label">
                to find your first validated breach path
              </p>
              <p className="shock-stat-fine">
                Average across XSEE environments
              </p>
            </div>
            <div className="shock-stat-cell">
              <div className="shock-stat-number">
                <span id="stat-patterns">0</span>
                <span className="shock-stat-suffix">+</span>
              </div>
              <p className="shock-stat-label">
                known attack patterns in XSEE&apos;s engine
              </p>
              <p className="shock-stat-fine">
                AI continuously learns and adds new TTPs
              </p>
            </div>
          </div>

          <div className="shock-cta-wrap">
            <p className="shock-cta-headline">
              See which exposures in your cloud actually matter.
            </p>
            <a href="#contact" className="shock-cta-btn">
              Get Free Breach Report →
            </a>
          </div>
        </section>
        <div className="sec-transition sec-dark-to-light" />
        <ProblemSolution />
        <StatsBand />
        <TerminalSection />
        <div className="sec-transition sec-tint-to-dark" style={{ background: "linear-gradient(to bottom,#040B18,#040B18)" }} />
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
