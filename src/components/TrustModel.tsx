"use client";

import Link from "next/link";
import { Shield, Wrench } from "lucide-react";

type TrustModelProps = {
  /** Free-scan page: two-role cards only, no trust paragraph or CTAs */
  variant?: "full" | "compact";
};

export default function TrustModel({ variant = "full" }: TrustModelProps) {
  const compact = variant === "compact";

  return (
    <section
      className="trust-model-section"
      style={{
        background: "#0B1220",
        padding: compact ? "48px 0 56px" : "88px 0",
        borderTop: compact ? "1px solid rgba(255,255,255,0.06)" : undefined,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container max-w-6xl mx-auto px-6">
        <div style={{ textAlign: "center", marginBottom: compact ? 32 : 48 }}>
          <span className="section-eyebrow" style={{ marginBottom: 16 }}>
            Zero-trust access model
          </span>
          <h2
            className="font-black tracking-tight"
            style={{
              color: "#f8fafc",
              fontSize: compact ? "clamp(1.35rem, 3.5vw, 1.85rem)" : "clamp(1.75rem, 4vw, 2.35rem)",
              lineHeight: 1.15,
              marginBottom: 16,
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Read-only by default.
            <br />
            Write access only when you approve it.
          </h2>
          <p
            style={{
              color: "rgba(148,163,184,0.95)",
              fontSize: compact ? 15 : 16,
              lineHeight: 1.65,
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            XSEE uses two separate IAM roles with completely different permission scopes. You create both. You control
            both. You can revoke either in 10 seconds.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          style={{ maxWidth: 1100, margin: "0 auto" }}
        >
          {/* Card 1 */}
          <div
            style={{
              background: "rgba(15,23,42,0.65)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 16,
              padding: compact ? 22 : 28,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(59,130,246,0.12)",
                    border: "1px solid rgba(59,130,246,0.25)",
                    color: "#60A5FA",
                  }}
                >
                  <Shield size={22} strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Role 1 — XSEE Scanner</h3>
              </div>
              <span
                className="font-mono text-[10px] font-semibold uppercase tracking-wider shrink-0"
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  background: "rgba(59,130,246,0.15)",
                  border: "1px solid rgba(96,165,250,0.35)",
                  color: "#7DD3FC",
                }}
              >
                Always active · Always read-only
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(203,213,225,0.92)" }}>
              Uses AWS ReadOnlyAccess managed policy. Discovers assets, validates attack paths, reads IAM policies and
              security group rules. Cannot write, delete, or modify anything in your environment. Ever.
            </p>
            <pre
              className="font-mono text-[11px] leading-relaxed p-4 rounded-lg overflow-x-auto"
              style={{
                background: "#050a14",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(148,163,184,0.95)",
                margin: 0,
              }}
            >
              {`# Permissions: ReadOnlyAccess (AWS managed)
# Actions: Describe*, List*, Get*
# Excludes: ALL write, delete, create actions`}
            </pre>
            <p className="text-xs leading-relaxed mt-1" style={{ color: "rgba(100,116,139,0.9)" }}>
              You create this role. You can delete it anytime and XSEE goes dark immediately.
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: "rgba(15,23,42,0.65)",
              border: "1px solid rgba(245,158,11,0.22)",
              borderRadius: 16,
              padding: compact ? 22 : 28,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(245,158,11,0.1)",
                    border: "1px solid rgba(245,158,11,0.28)",
                    color: "#FBBF24",
                  }}
                >
                  <Wrench size={22} strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Role 2 — Remediation Agent</h3>
              </div>
              <span
                className="font-mono text-[10px] font-semibold uppercase tracking-wider shrink-0"
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  background: "rgba(245,158,11,0.12)",
                  border: "1px solid rgba(251,191,36,0.35)",
                  color: "#FCD34D",
                }}
              >
                Optional · Human-gated
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(203,213,225,0.92)" }}>
              Only activated when you choose automated remediation. You define exactly which write actions it can perform
              — nothing else. Every fix requires your explicit approval. Every action is logged, timestamped, and signed
              with your identity.
            </p>
            <div
              className="font-mono text-[11px] leading-relaxed p-4 rounded-lg space-y-1.5"
              style={{
                background: "#050a14",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(203,213,225,0.88)",
              }}
            >
              <div>✓ ec2:RevokeSecurityGroupIngress</div>
              <div>✓ iam:DetachRolePolicy</div>
              <div>✓ s3:PutBucketPublicAccessBlock</div>
              <div style={{ color: "rgba(239,68,68,0.85)" }}>
                ✗ DeleteRole ✗ CreateUser ✗ DeleteBucket
              </div>
            </div>
            <p className="text-xs leading-relaxed mt-1" style={{ color: "rgba(100,116,139,0.9)" }}>
              Never auto-applied. One click to approve. One click to rollback. Full audit trail.
            </p>
          </div>
        </div>

        {!compact && (
          <>
            <p
              className="text-center text-sm leading-relaxed"
              style={{
                color: "rgba(148,163,184,0.95)",
                maxWidth: 720,
                margin: "40px auto 0",
              }}
            >
              Every action taken by either role is logged, timestamped, cryptographically signed, and tied to a human
              approval token. Your CISO has a complete audit trail for regulators, auditors, and the board.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              style={{ marginTop: 36 }}
            >
              <Link
                href="/free-scan"
                className="btn-shimmer inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold text-white no-underline transition-opacity hover:opacity-95"
                style={{
                  background: "#FF1B8D",
                  boxShadow: "0 0 24px rgba(255,27,141,0.25)",
                }}
              >
                <span className="relative z-[1]">View IAM Role Templates →</span>
              </Link>
              <Link
                href="/security"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold no-underline transition-colors"
                style={{
                  color: "rgba(226,232,240,0.85)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                Read security whitepaper
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
