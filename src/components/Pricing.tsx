"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import type { Paddle } from "@paddle/paddle-js";

const SUCCESS_URL = "https://app.xsee.io/login?signup=pending";

/**
 * Paddle Billing environment. `live_*` client tokens require `production`.
 * Set NEXT_PUBLIC_PADDLE_ENVIRONMENT=production in Vercel when using live keys.
 */
function getPaddleEnvironment(): "production" | "sandbox" {
  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "";
  if (token.startsWith("live_")) return "production";
  if (token.startsWith("test_")) return "sandbox";
  return process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "sandbox" ? "sandbox" : "production";
}

function getPaddle(): Paddle | undefined {
  return (window as Window & { Paddle?: Paddle }).Paddle;
}

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

function getPriceId(tier: "starter" | "pro"): string | undefined {
  if (tier === "starter") return process.env.NEXT_PUBLIC_PADDLE_STARTER_PRICE_ID;
  return process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID;
}

export default function Pricing() {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (!token || typeof window === "undefined") return;

    let interval: ReturnType<typeof setInterval> | undefined;
    let attempts = 0;
    const maxAttempts = 100;

    const tryInit = () => {
      if (typeof window === "undefined" || !window.Paddle) return false;
      try {
        const P = getPaddle();
        if (!P) return false;
        if (!P.Initialized) {
          P.Environment.set(getPaddleEnvironment());
          P.Initialize({ token });
        }
        return true;
      } catch (e) {
        console.warn("Paddle not ready:", e);
        return false;
      }
    };

    if (tryInit()) return;

    interval = setInterval(() => {
      attempts += 1;
      if (tryInit() || attempts >= maxAttempts) {
        if (interval) clearInterval(interval);
      }
    }, 50);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const openCheckout = useCallback((tier: "starter" | "pro") => {
    const priceId = getPriceId(tier);
    if (typeof window === "undefined") return;
    if (!window.Paddle) {
      window.location.hash = "contact";
      return;
    }
    try {
      const P = getPaddle();
      if (!P?.Checkout || !priceId) {
        window.location.hash = "contact";
        return;
      }
      if (!P.Initialized && process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN) {
        P.Environment.set(getPaddleEnvironment());
        P.Initialize({ token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN });
      }
      P.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        settings: {
          successUrl: SUCCESS_URL,
        },
      });
    } catch (e) {
      console.warn("Paddle not ready:", e);
      window.location.hash = "contact";
    }
  }, []);

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
            Every plan includes the full six-engine platform. No gating, no &quot;enterprise add-ons&quot; for core proof capabilities. <strong>14-day free trial, no credit card required.</strong>
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
              {plan.checkout === "enterprise" ? (
                <Link
                  href="#contact"
                  className={`btn ${plan.featured ? "btn-primary" : "btn-secondary"}`}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {plan.cta}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`btn ${plan.featured ? "btn-primary" : "btn-secondary"}`}
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => openCheckout(plan.checkout)}
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mb-2 mt-8 text-center">
          <p className="text-sm text-white/40">
            Average XSEE customer proves{" "}
            <span className="font-semibold text-white/70">$18.5M in validated exposure</span>
            {" "}on their first scan. At $1,200/mo, that&apos;s a{" "}
            <span className="font-bold text-[#ff2d78]">15,000× ROI</span>
            {" "}before the trial ends.
          </p>
        </div>
        <p className="pricing-note">
          14-day free trial · No credit card required · Starter $1,200/mo · Professional $2,500/mo · Enterprise: contact us · Annual billing: 25% discount · Optional XSEE Agent for real-time mode
        </p>
      </div>
    </section>
  );
}
