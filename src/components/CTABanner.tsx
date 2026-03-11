import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box reveal-scale">
          <div className="cta-mesh" />
          <span className="eyebrow">See It In Action</span>
          <h2 className="display-lg">
            Find your first proven
            <br />
            attack path today.
          </h2>
          <p>
            Connect your AWS account. XSEE discovers, validates, and shows you
            exactly what to fix — in under 30 minutes. You keep the full report.
          </p>
          <div className="cta-actions">
            <Link href="#contact" className="btn btn-primary btn-lg">
              Request Demo →
            </Link>
            <Link
              href="https://app.xsee.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
