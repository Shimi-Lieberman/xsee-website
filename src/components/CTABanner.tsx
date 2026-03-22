import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="cta-section sec-deepblack">
      <div className="container">
        <div className="cta-box cta-box-warm reveal-scale">
          <div className="cta-mesh" />
          <span className="eyebrow">Free Risk Assessment</span>
          <h2 className="display-lg">
            See which exposures in
            <br />
            your cloud lead to a breach.
          </h2>
          <p>
            Connect your AWS account with read-only access. In 30 minutes XSEE delivers a validated attack graph, ranked by blast radius — with the exact fix to close each path. Yours to keep.
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
