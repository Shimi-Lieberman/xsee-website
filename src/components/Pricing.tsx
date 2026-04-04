"use client";

import Link from "next/link";

const PLANS = [
  {
    tier: "// Starter",
    title: "For Small Teams",
    desc: "Prove exploitability on a single AWS account.",
    price: "$1,200",
    per: "/mo",
    feats: [
      "1 AWS account",
      "Up to 100 assets",
      "All 6 intelligence engines",
      "L2 validated attack paths",
      "XseeCyber simulation",
      "AI security analyst",
      "Operational Playbooks",
      "Evidence packages",
      "Email support",
    ],
    dim: [],
    cta: "Start Free Trial",
    featured: false,
    checkout: "starter" as const,
  },
  {
    tier: "// Professional",
    title: "For Growing Teams",
    desc: "Full platform for teams managing multiple AWS environments.",
    price: "$2,500",
    per: "/month",
    feats: [
      "Up to 5 AWS accounts",
      "Up to 1,000 assets",
      "All 6 intelligence engines",
      "XseeCyber live mode",
      "AI security analyst",
      "Detection Coverage Score",
      "Operational Playbooks",
      "Priority support",
      "Annual discount available",
    ],
    dim: [],
    cta: "Start Free Trial →",
    featured: true,
    checkout: "pro" as const,
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
      "Optional XSEE Agent (real-time monitoring)",
      "Dedicated customer engineer",
      "SLA guarantee",
      "Custom integrations",
    ],
    dim: [],
    cta: "Contact Sales",
    featured: false,
    checkout: "enterprise" as const,
  },
];

export default function Pricing() {
  return (
    <section className="section sec-light animate-on-scroll !pb-8" style={{ background: "transparent" }} id="pricing">
      <div className="max-w-6xl mx-auto w-full px-6 pricing-inner">
        <div className="section-head reveal">
          <span className="section-eyebrow section-eyebrow-dark">Pricing</span>
          <h2 className="display-lg" style={{ color: "#0f172a" }}>
            Know your breach risk
            <br />
            from day one.
          </h2>
          <p style={{ color: "#64748b" }}>
            Every plan includes the full six-engine platform. No gating, no &quot;enterprise add-ons&quot; for core proof capabilities.{" "}
            <strong style={{ color: "#0f172a" }}>14-day free trial, no credit card required.</strong>
          </p>
          <div className="section-rule" />
        </div>
        <div className="pricing-grid">
          {PLANS.map((plan, i) => (
            <div
              key={plan.tier}
              className={`pricing-card reveal-on-scroll ${i === 0 ? "" : i === 1 ? "reveal-delay-1" : "reveal-delay-2"} ${plan.featured ? "featured featured-pulse" : ""}`}
              style={
                plan.featured
                  ? {
                      border: "2px solid #FF1B8D",
                      borderRadius: "16px",
                      padding: "28px",
                      background: "white",
                      position: "relative",
                    }
                  : {
                      transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                    }
              }
              onMouseEnter={
                plan.featured
                  ? undefined
                  : (e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                    }
              }
              onMouseLeave={
                plan.featured
                  ? undefined
                  : (e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }
              }
            >
              {plan.featured && (
                <div className="pricing-badge pricing-badge-warm">Most Popular</div>
              )}
              <div className="pricing-tier font-mono">{plan.tier}</div>
              <h3>{plan.title}</h3>
              <p className="pricing-desc">{plan.desc}</p>
              <div className="pricing-amount">
                <span
                  className="pricing-num font-mono"
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
              {plan.checkout === "enterprise" ? (
                <Link
                  href="#contact"
                  className={`btn ${plan.featured ? "btn-primary btn-shimmer" : "btn-secondary"}`}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span className={plan.featured ? "relative z-[2]" : ""}>{plan.cta}</span>
                </Link>
              ) : (
                <Link
                  href="https://app.xsee.io/register"
                  className={`btn ${plan.featured ? "btn-primary btn-shimmer" : "btn-secondary"}`}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span className={plan.featured ? "relative z-[2]" : ""}>{plan.cta}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "14px 24px",
            background: "#fdf2f8",
            borderRadius: "10px",
            maxWidth: "600px",
            margin: "20px auto 0",
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          Average XSEE customer proves{" "}
          <strong style={{ color: "#0f172a" }}>$18.5M in validated exposure</strong>
          {" "}on their first scan. At $1,200/mo, that&apos;s a{" "}
          <strong style={{ color: "#FF1B8D" }}>15,000× ROI</strong>
          {" "}before the trial ends.
        </div>
        <p className="pricing-note">
          14-day free trial · No credit card required · Starter $1,200/mo · Professional $2,500/mo · Enterprise: contact us · Annual billing: 25% discount · Optional XSEE Agent for real-time mode
        </p>
      </div>
    </section>
  );
}
