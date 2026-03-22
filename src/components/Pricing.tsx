import Link from "next/link";

const PLANS = [
  {
    tier: "// Starter",
    title: "For Small Teams",
    desc: "Evaluate XSEE on a single AWS account with the full platform.",
    price: "$499",
    per: "/month",
    feats: [
      "1 AWS account",
      "Up to 100 assets",
      "All 6 intelligence engines",
      "L2 validated attack paths",
      "XseeCyber simulation",
      "AI security analyst",
    ],
    dim: ["Operational Playbooks", "Priority support"],
    cta: "Start Free Trial",
    featured: false,
  },
  {
    tier: "// Professional",
    title: "For Growing Teams",
    desc: "Full platform for teams managing multiple AWS environments.",
    price: "$1,499",
    per: "/month",
    feats: [
      "Up to 5 AWS accounts",
      "Up to 1,000 assets",
      "All 6 intelligence engines",
      "XseeCyber live mode",
      "AI security analyst",
      "Operational Playbooks",
      "Priority support",
      "Annual discount available",
    ],
    dim: [],
    cta: "Start Free Trial →",
    featured: true,
  },
  {
    tier: "// Enterprise",
    title: "For Large Orgs",
    desc: "Unlimited scale, dedicated support, and self-hosted option.",
    price: "Contact us",
    per: "",
    feats: [
      "Unlimited accounts & assets",
      "All 6 intelligence engines",
      "Custom reporting & dashboards",
      "SSO / SAML integration",
      "Self-hosted deployment",
      "Dedicated customer engineer",
      "SLA guarantee",
      "Custom integrations",
    ],
    dim: [],
    cta: "Contact Sales",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section className="section sec-blue-tint" id="pricing">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Pricing</span>
          <h2 className="display-lg">
            Know your breach risk
            <br />
            from day one.
          </h2>
          <p>
            Every plan includes the full six-engine platform. No gating, no &quot;enterprise add-ons&quot; for core proof capabilities. 14-day free trial, no credit card required.
          </p>
          <div className="section-rule" />
        </div>
        <div className="pricing-grid">
          {PLANS.map((plan, i) => (
            <div
              key={plan.tier}
              className={`pricing-card reveal-on-scroll ${i === 0 ? "" : i === 1 ? "reveal-delay-1" : "reveal-delay-2"} ${plan.featured ? "featured" : ""}`}
            >
              {plan.featured && (
                <div className="pricing-badge pricing-badge-warm">Most Popular</div>
              )}
              <div className="pricing-tier">{plan.tier}</div>
              <h3>{plan.title}</h3>
              <p className="pricing-desc">{plan.desc}</p>
              <div className="pricing-amount">
                <span
                  className="pricing-num"
                  style={
                    plan.price === "Contact us"
                      ? { fontSize: "28px", lineHeight: "1.2" }
                      : undefined
                  }
                >
                  {plan.price}
                </span>
                {plan.per && (
                  <span className="pricing-per">{plan.per}</span>
                )}
              </div>
              <ul className="pricing-feats">
                {plan.feats.map((f) => (
                  <li key={f}>{f}</li>
                ))}
                {plan.dim.map((f) => (
                  <li key={f} className="dim">
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="#contact"
                className={`btn ${plan.featured ? "btn-primary" : "btn-secondary"}`}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="pricing-note">
          14-day free trial · No credit card required · Annual billing: 20%
          discount
        </p>
      </div>
    </section>
  );
}
