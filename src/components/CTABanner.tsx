import Link from "next/link";

export default function CTABanner() {
  return (
    <section
      className="cta-section sec-deepblack animate-on-scroll reveal"
      id="get-started"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "130px 48px",
        background: "var(--dark)",
      }}
    >
      <div
        className="mesh-orb"
        style={{
          width: "560px",
          height: "560px",
          background: "radial-gradient(circle, rgba(255,31,143,0.12), transparent 70%)",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "orbDrift1 14s ease-in-out infinite",
        }}
      />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-head" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-eyebrow">Get started</span>
          <h2
            className="display-lg"
            style={{
              fontSize: "clamp(42px,6vw,76px)",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.03em",
            }}
          >
            The breach your scanner missed is
            <br />
            <em
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--pink)",
              }}
            >
              already in your graph.
            </em>
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.4)", maxWidth: "520px", margin: "20px auto 0" }}>
            Most teams find out during an incident. XSEE gives you the proof before the attacker does. One IAM role. Thirty
            minutes. The truth about your cloud.
          </p>
          <div className="section-rule" style={{ margin: "20px auto 0" }} />
        </div>
        <div className="cta-two-options reveal-on-scroll">
          <div className="cta-option cta-option-free">
            <div className="cta-option-badge">FREE</div>
            <h3 className="cta-option-title">Free Risk Assessment</h3>
            <p className="cta-option-body">
              Connect your AWS account with read-only IAM. XSEE scans your environment, validates attack paths, and delivers a ranked HTML report in 30 minutes. No commitment. No credit card. No agents. 14-day free trial · No credit card required · Read-only IAM · Results in 30 minutes
            </p>
            <Link href="/free-scan" className="btn btn-primary btn-shimmer">
              <span className="relative z-[2]">Run Free Scan →</span>
            </Link>
          </div>
          <div className="cta-option cta-option-platform">
            <div className="cta-option-badge">FULL PLATFORM</div>
            <h3 className="cta-option-title">Start Free Trial</h3>
            <p className="cta-option-body">
              14-day full access to all 6 engines. See your Detection Coverage Score. Generate evidence packages. After trial: Starter $1,200/mo, Professional $2,500/mo —{" "}
              <Link href="#pricing" style={{ color: "var(--blue-light)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                view plans
              </Link>
              .
            </p>
            <Link
              href="https://app.xsee.io/register"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Start Free Trial →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
