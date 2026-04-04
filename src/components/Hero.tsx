"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "calc(100vh - 52px)", background: "#050d1a" }}
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,27,141,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,27,141,0.04) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
          animation: "gridDrift 20s linear infinite",
        }}
      />

      {/* Center glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(255,27,141,0.07) 0%, transparent 65%)",
          animation: "glowBreathe 4s ease-in-out infinite",
        }}
      />

      {/* Two-column hero */}
      <div
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-[60px] w-full"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingTop: "60px",
          paddingBottom: "60px",
          width: "100%",
          minHeight: "calc(100vh - 52px)",
        }}
      >
        {/* LEFT — Headline + CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Announcement bar */}
          <div style={{ display: "flex" }}>
            <Link
              href="/free-scan"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
            >
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "100px",
                  background: "rgba(255,27,141,0.15)",
                  color: "#FF1B8D",
                  letterSpacing: "0.1em",
                }}
              >
                NEW
              </span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
                AI attacker simulation now in XseeCyber 2.0
              </span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>›</span>
            </Link>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(44px, 5vw, 68px)",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="word-reveal" style={{ color: "white" }}>
              Stop{" "}
            </span>
            <span className="word-reveal" style={{ color: "white" }}>
              guessing.
            </span>
            <br />
            <span className="word-reveal" style={{ color: "#FF1B8D", animationDelay: "0.35s" }}>
              Prove{" "}
            </span>
            <span className="word-reveal" style={{ color: "#FF1B8D", animationDelay: "0.5s" }}>
              the{" "}
            </span>
            <span className="word-reveal" style={{ color: "#FF1B8D", animationDelay: "0.65s" }}>
              breach.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="fade-up fade-up-1"
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: "440px",
            }}
          >
            Cryptographic evidence per hop. Live AWS API validation. Attack simulation that runs the way both human and
            AI attackers think. Not theory — proof.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <Link
                href="/free-scan"
                className="btn-shimmer fade-up fade-up-2"
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#FF1B8D",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: 700,
                  padding: "14px 28px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  boxShadow: "0 0 28px rgba(255,27,141,0.4)",
                  overflow: "hidden",
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Run Free Scan — 30 minutes
                </span>
              </Link>
            </div>
            <div className="fade-up fade-up-3" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link
                href="/demo"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                Watch Demo
              </Link>
              <Link
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                Book a Demo
              </Link>
            </div>
          </div>

          {/* Trust micro-line */}
          <div
            className="fade-up fade-up-4"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              color: "rgba(255,255,255,0.25)",
              flexWrap: "wrap",
            }}
          >
            {["Read-only IAM", "No agents installed", "Results in 30 min", "Free — no credit card"].map((t, i) => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {i > 0 && (
                  <span
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                    }}
                  />
                )}
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — Live graph panel */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: "#080f1c",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(255,27,141,0.06), 0 40px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Graph topbar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                background: "#060d18",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                {["Attack Paths", "IAM", "Network", "NHI"].map((tab, i) => (
                  <div
                    key={tab}
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      background: i === 0 ? "rgba(255,27,141,0.12)" : "transparent",
                      color: i === 0 ? "#FF1B8D" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "10px",
                  color: "#22c55e",
                  fontWeight: 600,
                }}
              >
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    animation: "pulse 2s infinite",
                  }}
                />
                Live · eu-central-1
              </div>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {[
                { val: "14", label: "Attack Paths", color: "#ef4444" },
                { val: "3", label: "Critical", color: "#ef4444" },
                { val: "92%", label: "Exploitable", color: "#f97316" },
                { val: "1", label: "Optimal Fix", color: "#FF1B8D" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: "12px 14px",
                    textAlign: "center",
                    borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 900,
                      lineHeight: 1,
                      marginBottom: "3px",
                      color: s.color,
                      fontFamily: "monospace",
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontSize: "8px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.28)",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Screenshot */}
            <div style={{ position: "relative" }}>
              <img
                src="/platform_screenshot.png"
                alt="XSEE Attack Intelligence Platform"
                style={{ width: "100%", display: "block", maxHeight: "280px", objectFit: "cover", objectPosition: "top" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "80px",
                  background: "linear-gradient(to bottom, transparent, #080f1c)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Path list */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              {[
                {
                  chain: "Internet → EC2 → IAM Role → S3",
                  meta: "CVE-2020-9283 · RCE · 4 hops",
                  sev: "CRITICAL",
                  sevColor: "#ef4444",
                  l2: true,
                  active: true,
                },
                {
                  chain: "Public LB → Lambda → RDS Database",
                  meta: "Privilege escalation · 3 hops",
                  sev: "HIGH",
                  sevColor: "#f97316",
                  l2: true,
                  active: false,
                },
                {
                  chain: "EKS Pod → ServiceAccount → Secrets",
                  meta: "Lateral movement · 2 hops",
                  sev: "MEDIUM",
                  sevColor: "#eab308",
                  l2: false,
                  active: false,
                },
              ].map((path) => (
                <div
                  key={path.chain}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "9px 14px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    borderLeft: path.active ? "2px solid #FF1B8D" : "2px solid transparent",
                    background: path.active ? "rgba(255,27,141,0.05)" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "monospace",
                        marginBottom: "2px",
                      }}
                    >
                      {path.chain}
                    </div>
                    <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)" }}>{path.meta}</div>
                  </div>
                  <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: "8px",
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: "100px",
                        background: `${path.sevColor}20`,
                        color: path.sevColor,
                        border: `1px solid ${path.sevColor}40`,
                      }}
                    >
                      {path.sev}
                    </span>
                    {path.l2 && (
                      <span
                        style={{
                          fontSize: "7px",
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: "4px",
                          background: "rgba(37,99,235,0.15)",
                          color: "#60a5fa",
                          border: "1px solid rgba(37,99,235,0.25)",
                        }}
                      >
                        L2 ✓
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ textAlign: "center", paddingBottom: "24px", paddingTop: "8px", opacity: 0.25 }}>
        <div
          style={{
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            color: "white",
            marginBottom: "6px",
          }}
        >
          Scroll
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          style={{ animation: "bounce 1.5s infinite", display: "inline-block" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
