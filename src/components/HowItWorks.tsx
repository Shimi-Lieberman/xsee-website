"use client";

import { Fragment } from "react";
import { Award, Plug, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Connect",
    desc: "Create a read-only IAM role in AWS. Paste the ARN. That's the entire setup. XSEE never writes to your environment. You can revoke access in one click by deleting the role. Takes under 2 minutes. We've never needed more. (~2 minutes)",
    Icon: Plug,
  },
  {
    n: "02",
    title: "Validate",
    desc: "XSEE builds your live attack graph using 1,000+ known attack patterns. Then, for every candidate path, we make a live AWS API call for every single hop. Each call returns a cryptographic response. Each response is timestamped and signed. This is not a theoretical graph. This is a case file. (L2 validated · ~25 minutes)",
    Icon: ShieldCheck,
  },
  {
    n: "03",
    title: "Certify",
    desc: "One recommended fix. You approve. XSEE applies it and re-validates automatically. If the path no longer validates — it's closed. A before/after evidence package is generated, timestamped, and signed. Board-ready. SOC2-ready. The loop is closed. (1 human decision · everything else is XSEE)",
    Icon: Award,
  },
] as const;

export default function HowItWorks() {
  const reveal = ["reveal", "reveal reveal-d1", "reveal reveal-d2"] as const;

  return (
    <section className="section dot-texture" style={{ background: "transparent", position: "relative", overflow: "hidden" }} id="how">
      <div className="container">
        <div className="section-head reveal">
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.24em",
              color: "var(--ink-3)",
              fontFamily: "var(--font-mono)",
              display: "block",
              marginBottom: "14px",
              textAlign: "center",
            }}
          >
            How it works
          </span>
          <h2 className="display-lg" style={{ color: "var(--ink)" }}>
            From zero to proven breach path in 30 minutes.
          </h2>
          <p style={{ color: "var(--ink-2)" }}>Three steps. No agents. No disruption. No guessing.</p>
          <div className="section-rule" />
        </div>

        <div
          className="how-three-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 40px 1fr 40px 1fr",
            gap: 0,
            alignItems: "stretch",
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 16px 48px",
          }}
        >
          {STEPS.map((step, i) => (
            <Fragment key={step.n}>
              {i > 0 && (
                <div
                  className="arrow-col"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--ink-4)",
                  }}
                  aria-hidden
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              )}
              <div
                className={`top-bar-card ${reveal[i]}`}
                style={{
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: "16px",
                  padding: "32px 28px",
                  transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s, border-color 0.25s",
                }}
                onMouseEnter={(e) => {
                  const t = e.currentTarget;
                  t.style.transform = "translateY(-4px)";
                  t.style.boxShadow = "0 20px 60px rgba(0,0,0,0.07)";
                  t.style.borderColor = "rgba(255,31,143,0.14)";
                  const wrap = t.querySelector(".hiw-icon-wrap");
                  const icon = t.querySelector(".hiw-icon");
                  if (wrap instanceof HTMLElement) wrap.style.background = "var(--pink)";
                  if (icon instanceof HTMLElement) icon.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  const t = e.currentTarget;
                  t.style.transform = "translateY(0)";
                  t.style.boxShadow = "none";
                  t.style.borderColor = "rgba(0,0,0,0.07)";
                  const wrap = t.querySelector(".hiw-icon-wrap");
                  const icon = t.querySelector(".hiw-icon");
                  if (wrap instanceof HTMLElement) wrap.style.background = "#fdf2f8";
                  if (icon instanceof HTMLElement) icon.style.color = "#FF1B8D";
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    color: "var(--ink-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    marginBottom: "16px",
                  }}
                >
                  Step {step.n}
                </div>
                <div
                  className="hiw-icon-wrap"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "#fdf2f8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    transition: "background 0.25s",
                    color: "#FF1B8D",
                  }}
                >
                  <step.Icon className="hiw-icon" size={22} strokeWidth={2} aria-hidden style={{ transition: "color 0.25s" }} />
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: 800, color: "var(--ink)", marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--ink-2)", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
