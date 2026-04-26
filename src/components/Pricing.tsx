"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { ShieldCheck } from "lucide-react";
import { Analytics } from "@/lib/analytics";

const PADDLE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "";
const PADDLE_ENV =
  process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "sandbox" ? "sandbox" : "production";
const PADDLE_STARTER_PRICE_ID = process.env.NEXT_PUBLIC_PADDLE_STARTER_PRICE_ID ?? "";
const PADDLE_PRO_PRICE_ID = process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID ?? "";

const REGISTER_FALLBACK = "https://app.xsee.io/register";

const FOUNDING_PILL_STYLE: CSSProperties = {
  display: "inline-block",
  marginTop: 10,
  marginBottom: 4,
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.02em",
  background: "rgba(233,30,140,0.15)",
  color: "#e91e8c",
  border: "1px solid rgba(233,30,140,0.3)",
};

const PRICE_BLOCK: CSSProperties = {
  background: "#0b1220",
  borderRadius: 12,
  padding: "20px 18px",
  marginTop: 14,
  marginBottom: 12,
  border: "1px solid rgba(255,255,255,0.08)",
};

type PlanCheckout = "trial" | "starter" | "pro";

const PLANS: {
  tier: string;
  title: string;
  desc: string;
  price: string;
  per: string;
  feats: string[];
  dim: string[];
  cta: string;
  featured: boolean;
  founding: boolean;
  checkout: PlanCheckout;
}[] = [
  {
    tier: "// Free Trial",
    title: "Free Trial",
    desc: "14 days • Full product • No credit card",
    price: "$0",
    per: "",
    feats: [
      "1 AWS account",
      "Full L1 + L2 + L3 scanning",
      "Unlimited findings",
      "Claude AI investigation",
      "Breach Prevention Certificate",
    ],
    dim: [],
    cta: "Start Free Trial →",
    featured: false,
    founding: false,
    checkout: "trial",
  },
  {
    tier: "// Starter",
    title: "Starter",
    desc: "For the cost of one day of incident response, XSEE watches your crown jewels 24/7 and proves every risk is real.",
    price: "$1,800",
    per: "/ month",
    feats: [
      "1 AWS account",
      "L1 + L2 + L3 validation",
      "Unlimited attack paths",
      "Claude AI Engine",
      "Breach Prevention Certificate",
      "2 users",
      "Email support",
    ],
    dim: [],
    cta: "Subscribe →",
    featured: true,
    founding: true,
    checkout: "starter",
  },
  {
    tier: "// Pro",
    title: "Pro",
    desc: "We detect changes to your attack surface in 60 seconds. You know about new paths before attackers do.",
    price: "$3,500",
    per: "/ month",
    feats: [
      "Up to 3 AWS accounts",
      "Everything in Starter",
      "Real-time Detection Agent (60s alerts)",
      "UEBA behavioral analysis",
      "Scheduled automatic scans",
      "Slack + email notifications",
      "10 users",
      "Priority support",
    ],
    dim: [],
    cta: "Subscribe →",
    featured: false,
    founding: true,
    checkout: "pro",
  },
];

function priceIdForCheckout(kind: "starter" | "pro"): string {
  if (kind === "starter") return PADDLE_STARTER_PRICE_ID;
  return PADDLE_PRO_PRICE_ID;
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

  const handlePaidClick = useCallback(
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
    <section className="section sec-light animate-on-scroll" style={{ background: "transparent" }} id="pricing">
      <div className="max-w-6xl mx-auto w-full px-6 pricing-inner">
        <style>{`
          .pricing-page-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            max-width: 900px;
            margin: 40px auto 0;
            padding: 20px 16px;
            background: rgba(15, 23, 42, 0.04);
            border-radius: 12px;
            border: 1px solid rgba(0, 0, 0, 0.06);
          }
          @media (max-width: 640px) {
            .pricing-page-stats {
              grid-template-columns: 1fr 1fr;
            }
          }
        `}</style>
        <div className="section-head reveal">
          <span className="section-eyebrow section-eyebrow-dark">Pricing</span>
          <h2 className="display-lg" style={{ color: "#0f172a" }}>
            See your real attack paths in 15 minutes — no credit card, no sales call, no theory.
          </h2>
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
              {plan.founding && <span style={FOUNDING_PILL_STYLE}>Founding Price</span>}

              <div style={PRICE_BLOCK}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: 8,
                  }}
                >
                  {plan.checkout === "trial" ? "Free trial" : plan.title}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 44,
                      fontWeight: 800,
                      color: "#fff",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.checkout !== "trial" ? (
                    <span style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.45)" }}>/month</span>
                  ) : (
                    <span style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.45)" }}>· 14 days</span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 16, marginBottom: 0, lineHeight: 1.5 }}>
                  14-day free trial • No credit card required
                </p>
              </div>

              <p className="pricing-desc">{plan.desc}</p>
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
              {plan.checkout === "trial" ? (
                <>
                  <Link
                    href={REGISTER_FALLBACK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-shimmer"
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={() => Analytics.ctaClicked("pricing", "free_trial_card")}
                  >
                    <span>{plan.cta}</span>
                  </Link>
                  <div
                    className="mt-3 flex items-start justify-center gap-2 text-center"
                    style={{ fontSize: 13, color: "rgba(15,23,42,0.55)", lineHeight: 1.5 }}
                  >
                    <ShieldCheck size={12} color="#4ade80" className="mt-0.5 shrink-0" aria-hidden />
                    <span>14-day free trial · No credit card required · Cancel anytime</span>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className={`btn ${plan.featured ? "btn-primary btn-shimmer" : "btn-secondary"}`}
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={() => {
                      if (plan.checkout === "starter" || plan.checkout === "pro") {
                        handlePaidClick(plan.checkout);
                      }
                    }}
                  >
                    <span className={plan.featured ? "relative z-[2]" : ""}>{plan.cta}</span>
                  </button>
                  <div
                    className="mt-3 flex items-start justify-center gap-2 text-center"
                    style={{ fontSize: 13, color: "rgba(15,23,42,0.55)", lineHeight: 1.5 }}
                  >
                    <ShieldCheck size={12} color="#4ade80" className="mt-0.5 shrink-0" aria-hidden />
                    <span>14-day free trial · No credit card required · Cancel anytime</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="pricing-page-stats reveal">
          {(
            [
              { val: "1,000+", sub: "attack patterns", color: "#e91e8c" },
              { val: "7", sub: "engines", color: "#f97316" },
              { val: "92%", sub: "avg exploit confidence", color: "#4ade80" },
              { val: "$3.2M", sub: "avg financial exposure proven on first scan", color: "#fbbf24" },
            ] as const
          ).map((s) => (
            <div key={s.sub} style={{ textAlign: "center", padding: "4px 8px" }}>
              <div className="font-mono" style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1.2 }}>
                {s.val}
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 6, lineHeight: 1.35 }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "#64748b",
            maxWidth: "640px",
            margin: "32px auto 0",
            lineHeight: 1.65,
          }}
        >
          The average cloud breach costs $4.88M. XSEE needs to prevent ONE breach by ONE percent to pay for itself.
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#94a3b8",
            maxWidth: "560px",
            margin: "16px auto 0",
            lineHeight: 1.55,
          }}
        >
          7 spots remaining at founding price
        </p>
        <p className="pricing-note">
          14-day free trial · No credit card required · Starter $1,800/mo (founding) · Pro $3,500/mo (founding)
        </p>
      </div>
    </section>
  );
}
