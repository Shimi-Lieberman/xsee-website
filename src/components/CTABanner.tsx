import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="cta-section sec-deepblack animate-on-scroll" id="get-started">
      <div className="container">
        <div className="section-head reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="eyebrow">Get Started</span>
          <h2 className="display-lg">
            The question isn't whether your cloud
            <br />
            will be attacked by AI.
            <br />
            It's whether you'll know before the breach.
          </h2>
          <p>
            Most teams find out the hard way. XSEE gives you proof before the attacker does.
          </p>
          <div className="section-rule" style={{ margin: "20px auto 0" }} />
        </div>
        <div className="cta-two-options reveal-on-scroll">
          <div className="cta-option cta-option-free">
            <div className="cta-option-badge">FREE</div>
            <h3 className="cta-option-title">Free Risk Assessment</h3>
            <p className="cta-option-body">
              Connect your AWS account with read-only IAM. XSEE scans your environment, validates attack paths, and delivers a ranked HTML report in 30 minutes. No commitment. No credit card. No agents.
            </p>
            <Link href="/free-scan" className="btn btn-primary">
              Run Free Scan →
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
