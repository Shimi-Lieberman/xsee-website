import Link from "next/link";
import { MagneticCard } from "@/components/MagneticCard";

export function BeforeAfter() {
  return (
    <section style={{ padding: "80px 0", background: "var(--dark)" }}>
      <div
        className="max-w-6xl mx-auto px-6 w-full"
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span
            className="mb-3 text-center block"
            style={{
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.24em",
              color: "rgba(255,255,255,0.22)",
              fontFamily: "var(--font-mono)",
              marginBottom: "14px",
            }}
          >
            The difference that matters
          </span>
          <h2
            className="display-lg"
            style={{
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            Wiz shows you what could go wrong.
            <br />
            <span style={{ color: "var(--pink)" }}>XSEE proves what will.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full" style={{ marginBottom: "36px" }}>
          <MagneticCard
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                What Wiz gives you
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                }}
              >
                Theoretical
              </span>
            </div>
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "4,000 alerts ranked by CVSS score",
                "Theoretical attack graph — not validated against live AWS",
                "No live API call per hop — cannot prove exploitability",
                "No cryptographic evidence package for audit",
                "No detection coverage score per path",
                "Structurally cannot close the proof loop",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontSize: "12px",
                    color: "#64748b",
                    lineHeight: 1.5,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    style={{ flexShrink: 0, marginTop: "1px" }}
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </MagneticCard>

          <MagneticCard
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                What XSEE proves
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                }}
              >
                Live validated
              </span>
            </div>
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                ["3 paths", " that actually reach your production database"],
                ["Live AWS API call per hop", " — confirmed exploitable, not theoretical"],
                ["Cryptographic evidence package", " per hop — timestamped, audit-ready"],
                ["Detection Coverage Score", " — % of attack steps your tools actually catch"],
                ["AI attacker simulation", " — not just human attack patterns"],
                ["One fix → 6 paths eliminated", " → L2 re-validates → certificate generated"],
              ].map(([bold, rest]) => (
                <div
                  key={bold}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontSize: "12px",
                    color: "#64748b",
                    lineHeight: 1.5,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    style={{ flexShrink: 0, marginTop: "1px" }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    <strong style={{ color: "#0f172a", fontWeight: 600 }}>{bold}</strong>
                    {rest}
                  </span>
                </div>
              ))}
            </div>
          </MagneticCard>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}>
            Don&apos;t cancel Wiz. Add the layer it structurally cannot provide.
          </p>
          <Link
            href="/free-scan"
            className="btn-shimmer"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--pink)",
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
              padding: "12px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(255,27,141,0.35)",
              transition: "all 0.2s",
              overflow: "hidden",
            }}
          >
            <span className="inline-flex items-center gap-2">Run Free Scan — Prove it yourself →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
