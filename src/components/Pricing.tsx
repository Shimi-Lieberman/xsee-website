"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { Analytics } from "@/lib/analytics";

const PADDLE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "";
const PADDLE_ENV =
  process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "sandbox" ? "sandbox" : "production";
const PADDLE_STARTER_PRICE_ID = process.env.NEXT_PUBLIC_PADDLE_STARTER_PRICE_ID ?? "";
const PADDLE_PRO_PRICE_ID = process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID ?? "";

const REGISTER_FALLBACK = "https://app.xsee.io/register";

type PlanCheckout = "trial" | "starter" | "pro";

const PLANS: {
  tier: string;
  title: string;
  desc: string;
  price: string;
  per: string;
  priceLabel: string;
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
    per: "· 14 days",
    priceLabel: "Free trial",
    feats: [
      "1 AWS account",
      "Full L1 + L2 + L3 scanning",
      "Unlimited findings",
      "Claude AI investigation",
      "Breach Prevention Certificate",
    ],
    dim: [],
    cta: "Start Free Trial",
    featured: false,
    founding: false,
    checkout: "trial",
  },
  {
    tier: "// Starter",
    title: "Starter",
    desc: "For the cost of one day of incident response, XSEE watches your crown jewels 24/7 and proves every risk is real.",
    price: "$1,800",
    per: "/month",
    priceLabel: "Starter",
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
    cta: "Subscribe",
    featured: true,
    founding: true,
    checkout: "starter",
  },
  {
    tier: "// Pro",
    title: "Pro",
    desc: "We detect changes to your attack surface in 60 seconds. You know about new paths before attackers do.",
    price: "$3,500",
    per: "/month",
    priceLabel: "Pro",
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
    cta: "Subscribe",
    featured: false,
    founding: true,
    checkout: "pro",
  },
];

const TRUST_NOTE: CSSProperties = {
  fontSize: 13,
  color: "rgba(15,23,42,0.55)",
  lineHeight: 1.5,
};

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
    <section
      className="section sec-light animate-on-scroll"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, rgba(255,27,141,0.08), transparent 58%), linear-gradient(180deg, #ffffff 0%, #fdf6fa 100%)",
      }}
      id="pricing"
    >
      <div className="max-w-6xl mx-auto w-full px-6 pricing-inner">
        <style>{`
          .pr-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #e91e8c;
            padding: 6px 14px;
            border-radius: 999px;
            background: rgba(233,30,140,0.08);
            border: 1px solid rgba(233,30,140,0.2);
          }
          .pr-head h2 {
            color: #0b1220 !important;
            font-size: clamp(2rem, 4.4vw, 3.1rem);
            font-weight: 800;
            letter-spacing: -0.03em;
            line-height: 1.08;
            max-width: 20ch;
            margin: 22px auto 0;
            text-wrap: balance;
          }
          .pr-head .pr-accent { color: #ff1f8f; }
          .pr-head .pr-sub { color: #475569; font-weight: 700; }

          .pr-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 22px;
            align-items: start;
            margin-top: 56px;
          }
          @media (max-width: 980px) { .pr-grid { grid-template-columns: 1fr; max-width: 460px; margin-left: auto; margin-right: auto; } }

          .pr-card {
            position: relative;
            display: flex;
            flex-direction: column;
            background: #ffffff;
            border: 1px solid #ecd7e6;
            border-radius: 18px;
            padding: 30px 28px;
            box-shadow: 0 1px 2px rgba(11,18,32,0.04);
            transition: transform 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.28s ease, border-color 0.28s ease;
          }
          .pr-card:hover {
            transform: translateY(-4px);
            border-color: #e0bcd3;
            box-shadow: 0 18px 44px -22px rgba(11,18,32,0.28);
          }
          .pr-card.is-featured {
            border: 1.5px solid var(--pink, #ff1f8f);
            box-shadow: 0 0 0 1px rgba(255,31,143,0.12), 0 26px 60px -28px rgba(255,31,143,0.55);
          }
          @media (min-width: 981px) {
            .pr-card.is-featured { transform: translateY(-10px); }
            .pr-card.is-featured:hover { transform: translateY(-16px); }
          }

          .pr-badge {
            position: absolute;
            top: -13px;
            left: 50%;
            transform: translateX(-50%);
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #fff;
            padding: 6px 16px;
            border-radius: 999px;
            background: linear-gradient(135deg, #ff1f8f, #ff6a3d);
            box-shadow: 0 8px 20px -8px rgba(255,31,143,0.7);
            white-space: nowrap;
          }

          .pr-tier {
            font-family: var(--font-mono);
            font-size: 10px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #94a3b8;
          }
          .pr-card h3 {
            color: #0b1220 !important;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: -0.01em;
            margin: 8px 0 0;
          }

          .pr-founding {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin: 12px 0 4px;
            padding: 4px 11px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.02em;
            color: #e91e8c;
            background: rgba(233,30,140,0.1);
            border: 1px solid rgba(233,30,140,0.28);
          }

          .pr-price-block {
            position: relative;
            overflow: hidden;
            border-radius: 14px;
            padding: 22px 20px;
            margin: 14px 0 18px;
            background: linear-gradient(155deg, #0b1220 0%, #111a2e 100%);
            border: 1px solid rgba(255,255,255,0.08);
          }
          .pr-price-block::before {
            content: "";
            position: absolute;
            top: -40%;
            right: -20%;
            width: 220px;
            height: 220px;
            background: radial-gradient(circle, rgba(255,31,143,0.28), transparent 65%);
            pointer-events: none;
          }
          .pr-price-label {
            position: relative;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.5);
            margin-bottom: 10px;
          }
          .pr-price-row { position: relative; display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
          .pr-price {
            font-family: var(--font-mono);
            font-size: 42px;
            font-weight: 800;
            color: #fff;
            letter-spacing: -0.03em;
            line-height: 1;
          }
          .pr-per { font-size: 15px; font-weight: 500; color: rgba(255,255,255,0.5); }
          .pr-price-note { position: relative; font-size: 12.5px; color: rgba(255,255,255,0.55); margin: 14px 0 0; line-height: 1.5; }

          .pr-desc { font-size: 13.5px; color: #475569; line-height: 1.6; margin: 0 0 20px; }

          .pr-feats { list-style: none; display: flex; flex-direction: column; gap: 11px; margin: 0 0 26px; padding: 0; flex: 1; }
          .pr-feats li { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; color: #334155; font-weight: 500; line-height: 1.45; }
          .pr-feats li svg { flex-shrink: 0; margin-top: 1px; }

          .pr-cta { width: 100%; justify-content: center; }
          .pr-trust { margin-top: 12px; display: flex; align-items: flex-start; justify-content: center; gap: 6px; text-align: center; }

          .pr-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            max-width: 900px;
            margin: 56px auto 0;
            padding: 24px 16px;
            background: rgba(255,255,255,0.7);
            backdrop-filter: blur(4px);
            border-radius: 16px;
            border: 1px solid #efdde9;
            box-shadow: 0 10px 30px -20px rgba(11,18,32,0.25);
          }
          .pr-stats .pr-stat { text-align: center; padding: 4px 8px; }
          .pr-stats .pr-stat-val { font-family: var(--font-mono); font-size: 24px; font-weight: 800; line-height: 1.2; }
          .pr-stats .pr-stat-sub { font-size: 11.5px; color: #64748b; margin-top: 6px; line-height: 1.35; }
          @media (max-width: 640px) { .pr-stats { grid-template-columns: 1fr 1fr; } }

          .pr-roi { text-align: center; font-size: 14px; color: #475569; max-width: 640px; margin: 30px auto 0; line-height: 1.65; }
          .pr-roi strong { color: #0b1220; font-weight: 700; }
          .pr-spots {
            display: inline-flex; align-items: center; gap: 7px;
            margin: 18px auto 0; padding: 7px 14px; border-radius: 999px;
            font-size: 12px; font-weight: 600; color: #e91e8c;
            background: rgba(233,30,140,0.08); border: 1px solid rgba(233,30,140,0.22);
          }
          .pr-spots-dot { width: 7px; height: 7px; border-radius: 999px; background: #ff1f8f; box-shadow: 0 0 0 0 rgba(255,31,143,0.6); animation: pr-pulse 2s infinite; }
          @keyframes pr-pulse { 0% { box-shadow: 0 0 0 0 rgba(255,31,143,0.55); } 70% { box-shadow: 0 0 0 8px rgba(255,31,143,0); } 100% { box-shadow: 0 0 0 0 rgba(255,31,143,0); } }
          .pr-spots-wrap { text-align: center; }

          .pr-note { text-align: center; margin-top: 24px; font-family: var(--font-mono); font-size: 11px; color: #94a3b8; letter-spacing: 0.04em; }

          @media (prefers-reduced-motion: reduce) {
            .pr-card, .pr-card.is-featured { transition: none; }
            .pr-spots-dot { animation: none; }
          }
        `}</style>

        <div className="section-head reveal pr-head" style={{ marginBottom: 0 }}>
          <span className="pr-eyebrow">Pricing</span>
          <h2 className="display-lg">
            See your real attack paths{" "}
            <span className="pr-accent">in 15 minutes</span>
            <span className="pr-sub"> — no credit card, no sales call, no theory.</span>
          </h2>
        </div>

        <div className="pr-grid stagger-children">
          {PLANS.map((plan) => (
            <div
              key={plan.tier}
              className={`pr-card reveal ${plan.featured ? "is-featured featured-pulse" : ""}`}
            >
              {plan.featured && (
                <div className="pr-badge">
                  <Sparkles size={11} aria-hidden /> Most Popular
                </div>
              )}
              <div className="pr-tier font-mono">{plan.tier}</div>
              <h3>{plan.title}</h3>
              {plan.founding && (
                <span className="pr-founding">
                  <Sparkles size={11} aria-hidden /> Founding Price
                </span>
              )}

              <div className="pr-price-block">
                <div className="pr-price-label">{plan.priceLabel}</div>
                <div className="pr-price-row">
                  <span className="pr-price">{plan.price}</span>
                  <span className="pr-per">{plan.per}</span>
                </div>
                <p className="pr-price-note">14-day free trial • No credit card required</p>
              </div>

              <p className="pr-desc">{plan.desc}</p>
              <ul className="pr-feats">
                {plan.feats.map((f) => (
                  <li key={f}>
                    <Check size={15} color="#e91e8c" strokeWidth={2.5} aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
                {plan.dim.map((f) => (
                  <li key={f} style={{ color: "#94a3b8" }}>
                    <Check size={15} color="#cbd5e1" strokeWidth={2.5} aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {plan.checkout === "trial" ? (
                <Link
                  href={REGISTER_FALLBACK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-shimmer pr-cta"
                  onClick={() => Analytics.ctaClicked("pricing", "free_trial_card")}
                >
                  <span>{plan.cta} →</span>
                </Link>
              ) : (
                <button
                  type="button"
                  className={`btn ${plan.featured ? "btn-primary btn-shimmer" : "btn-secondary"} pr-cta`}
                  onClick={() => {
                    if (plan.checkout === "starter" || plan.checkout === "pro") {
                      handlePaidClick(plan.checkout);
                    }
                  }}
                >
                  <span className={plan.featured ? "relative z-[2]" : ""}>{plan.cta} →</span>
                </button>
              )}
              <div className="pr-trust" style={TRUST_NOTE}>
                <ShieldCheck size={13} color="#22c55e" className="mt-0.5 shrink-0" aria-hidden />
                <span>14-day free trial · No credit card · Cancel anytime</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pr-stats reveal">
          {(
            [
              { val: "1,000+", sub: "attack patterns", color: "#e91e8c" },
              { val: "7", sub: "engines", color: "#f97316" },
              { val: "92%", sub: "avg exploit confidence", color: "#16a34a" },
              { val: "$3.2M", sub: "avg financial exposure proven on first scan", color: "#d97706" },
            ] as const
          ).map((s) => (
            <div key={s.sub} className="pr-stat">
              <div className="pr-stat-val" style={{ color: s.color }}>
                {s.val}
              </div>
              <div className="pr-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        <p className="pr-roi">
          The average cloud breach costs <strong>$4.88M</strong>. XSEE needs to prevent ONE breach by ONE
          percent to pay for itself.
        </p>

        <div className="pr-spots-wrap">
          <span className="pr-spots">
            <span className="pr-spots-dot" aria-hidden />7 spots remaining at founding price
          </span>
        </div>

        <p className="pr-note">
          14-day free trial · No credit card required · Starter $1,800/mo (founding) · Pro $3,500/mo (founding)
        </p>
      </div>
    </section>
  );
}
