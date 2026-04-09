"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { Analytics } from "@/lib/analytics";

const PADDLE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "";
const PADDLE_ENV =
  process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "sandbox" ? "sandbox" : "production";
const PADDLE_STARTER_PRICE_ID = process.env.NEXT_PUBLIC_PADDLE_STARTER_PRICE_ID ?? "";
const PADDLE_PRO_PRICE_ID = process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID ?? "";

const REGISTER_FALLBACK = "https://app.xsee.io/register";

const PLANS = [
  {
    tier: "// Starter",
    title: "For Small Teams",
    desc: "Prove exploitability on a single AWS account.",
    price: "$1,200",
    per: "/mo",
    feats: [
      "1 AWS account · Up to 100 assets",
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
      "Optional XSEE Agent (real-time)",
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

function priceIdForCheckout(kind: "starter" | "pro" | "enterprise"): string {
  if (kind === "starter") return PADDLE_STARTER_PRICE_ID;
  if (kind === "pro") return PADDLE_PRO_PRICE_ID;
  return "";
}

export default function Pricing() {
  const paddleRef = useRef<Paddle | null>(null);
  const [paddleReady, setPaddleReady] = useState(false);

  useEffect(() => {
    Analytics.pricingViewed();
  }, []);

  useEffect(() => {
    if (!PADDLE_TOKEN) return;
    let cancelled = false;
    initializePaddle({
      environment: PADDLE_ENV,
      token: PADDLE_TOKEN,
    }).then((instance) => {
      if (cancelled || !instance) return;
      paddleRef.current = instance;
      setPaddleReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const openCheckout = useCallback((kind: "starter" | "pro") => {
    const priceId = priceIdForCheckout(kind);
    const paddle = paddleRef.current;
    if (paddleReady && paddle && priceId) {
      paddle.Checkout.open({ items: [{ priceId, quantity: 1 }] });
      return;
    }
    window.location.href = REGISTER_FALLBACK;
  }, [paddleReady]);

  const handlePlanClick = useCallback(
    (kind: "starter" | "pro") => {
      if (kind === "starter") {
        Analytics.ctaClicked("pricing", "starter_trial");
      } else {
        Analytics.ctaClicked("pricing", "pro_demo");
      }
      openCheckout(kind);
    },
    [openCheckout]
  );

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
            Every plan includes the full six-engine platform. No gating. No enterprise add-ons for core proof capabilities.{" "}
            <strong style={{ color: "#0f172a" }}>14-day free trial. No credit card required.</strong>
          </p>
          <div className="section-rule" />
        </div>
        <div className="pricing-grid pr-grid stagger-children">
          {PLANS.map((plan) => (
            <div
              key={plan.tier}
              className={`pricing-card reveal ${plan.featured ? "featured featured-pulse" : ""}`}
              style={
                plan.featured
                  ? {
                      border: "2px solid var(--pink)",
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
                <button
                  type="button"
                  className={`btn ${plan.featured ? "btn-primary btn-shimmer" : "btn-secondary"}`}
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => handlePlanClick(plan.checkout)}
                >
                  <span className={plan.featured ? "relative z-[2]" : ""}>{plan.cta}</span>
                </button>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "16px 24px",
            background: "white",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: "12px",
            maxWidth: "560px",
            margin: "32px auto 0",
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          Average XSEE customer proves{" "}
          <strong style={{ color: "#0f172a" }}>$18.5M</strong>
          {" "}in validated exposure on their first scan. At $1,200/mo, that&apos;s a{" "}
          <strong style={{ color: "#FF1B8D" }}>15,000× ROI</strong>
          {" "}before the trial ends.
        </div>
        <p className="pricing-note">
          14-day free trial · No credit card required · Starter $1,200/mo · Professional $2,500/mo · Enterprise: contact us · Annual billing: 25% discount
        </p>
      </div>
    </section>
  );
}
