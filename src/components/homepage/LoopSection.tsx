"use client";

import { Fragment, useEffect, useRef, useState } from "react";

const BRAND = "var(--color-primary)";

const LOOP_STAGES = [
  { n: "01", name: "Discover", desc: "Read-only IAM role. XSEE enumerates resources and builds the attack graph in 18 minutes for a typical AWS estate.", art: "discover" as const },
  { n: "02", name: "Validate", desc: "Every hop is verified with a live AWS API call. Each call is timestamped, signed, and retained for audit.", art: "validate" as const },
  { n: "03", name: "Simulate", desc: "The end-to-end attack is replayed against an isolated copy of your environment. A path only counts if it actually reproduces.", art: "simulate" as const },
  { n: "04", name: "Prioritize", desc: "Paths are ranked by data-at-risk and exploit confidence — not by CVSS. The three paths that reach prod data surface first.", art: "prioritize" as const },
  { n: "05", name: "Propose", desc: "For each path, XSEE generates the exact fix as code — Terraform, CloudFormation, or AWS CLI. Diff is reviewable, not generated prose.", art: "propose" as const },
  { n: "06", name: "Approve", desc: "A single human decision per fix lands in the Approval Queue. Everything else is automated.", art: "approve" as const },
  { n: "07", name: "Apply", desc: "Your Lambda — running under IAM policies you control — applies the fix. XSEE never holds write keys.", art: "apply" as const },
  { n: "08", name: "Verify", desc: "The simulation is re-run. If the attack still works, the fix auto-rolls back. Closure is not assumed — it is reproved.", art: "verify" as const },
  { n: "09", name: "Certify", desc: "A signed Breach Prevention Certificate is issued. Cryptographically linked to the original evidence. Board-ready.", art: "certify" as const },
];

function LoopArtifact({ stage }: { stage: (typeof LOOP_STAGES)[number]["art"] }) {
  switch (stage) {
    case "discover":
      return (
        <pre className="hp-mono text-[11.5px] leading-[1.65] text-[var(--hp-ink2)] bg-[var(--hp-overlay)] border border-[var(--hp-line)] rounded-lg px-3.5 py-3 overflow-x-auto m-0">
          {`ec2:i-0a3f2c8d        prod-eu-west-1\nrds:prod-postgres-01  prod-eu-west-1\n…1,247 resources`}
        </pre>
      );
    case "validate":
      return (
        <div className="hp-mono text-[12px] leading-[1.7] text-[var(--hp-ink2)] bg-[var(--hp-overlay)] border border-[var(--hp-line)] rounded-lg px-3.5 py-3">
          <span className="text-[var(--hp-ok)]">success</span> <span className="text-[var(--hp-ink3)]">·</span> sts:AssumeRole
          <div className="text-[var(--hp-ink3)] text-[11px]">2026-05-15T17:42:11Z · sig …a3f2c8</div>
        </div>
      );
    case "simulate":
      return (
        <div className="bg-[var(--hp-overlay)] border border-[var(--hp-line)] rounded-lg px-3.5 py-3">
          <svg viewBox="0 0 240 56" className="w-full h-[56px]" aria-hidden>
            <defs>
              <marker id="lp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="#FF1B8D" />
              </marker>
            </defs>
            {[10, 70, 130, 190].map((x, i) => (
              <rect key={x} x={x} y="18" width="40" height="20" rx="4" fill="#13131A" stroke={i === 3 ? BRAND : "#3A3A44"} strokeOpacity={i === 3 ? 0.6 : 0.7} />
            ))}
            <line x1="50" y1="28" x2="68" y2="28" stroke={BRAND} strokeWidth="1.25" markerEnd="url(#lp-arrow)" />
            <line x1="110" y1="28" x2="128" y2="28" stroke={BRAND} strokeWidth="1.25" markerEnd="url(#lp-arrow)" />
            <line x1="170" y1="28" x2="188" y2="28" stroke={BRAND} strokeWidth="1.25" markerEnd="url(#lp-arrow)" />
          </svg>
        </div>
      );
    case "prioritize":
      return (
        <div className="bg-[var(--hp-overlay)] border border-[var(--hp-line)] rounded-lg px-3.5 py-3">
          <p className="hp-eyebrow text-[var(--hp-ink3)]">Data at risk</p>
          <p className="mt-1 hp-mono text-[20px] text-[var(--hp-ink)]">
            47.2 TB <span className="text-[var(--hp-ink3)] text-[13px] font-normal">· 12.4M records</span>
          </p>
        </div>
      );
    case "propose":
      return (
        <pre className="hp-mono text-[11.5px] leading-[1.6] bg-[var(--hp-overlay)] border border-[var(--hp-line)] rounded-lg px-3.5 py-3 overflow-x-auto text-[var(--hp-ink2)] m-0">
          {`+ cidr_blocks = ["10.0.0.0/8"]\n- cidr_blocks = ["0.0.0.0/0"]`}
        </pre>
      );
    case "approve":
      return (
        <div className="inline-flex items-center gap-2 px-3 py-2 border border-[var(--hp-line)] bg-[var(--hp-overlay)] rounded-lg">
          <span className="hp-amber-dot" />
          <span className="text-[12px] text-[var(--hp-ink)]">Awaiting approval</span>
          <span className="hp-mono text-[11px] text-[var(--hp-ink3)] ml-1">ops@acme.com</span>
        </div>
      );
    case "apply":
      return (
        <pre className="hp-mono text-[11.5px] leading-[1.6] bg-[var(--hp-overlay)] border border-[var(--hp-line)] rounded-lg px-3.5 py-3 text-[var(--hp-ink2)] m-0">
          {`Duration: 84 ms\napplied: sg-bastion · ingress :5432`}
        </pre>
      );
    case "verify":
      return (
        <div className="bg-[var(--hp-overlay)] border border-[var(--hp-line)] rounded-lg px-3.5 py-3">
          <p className="text-[12.5px] text-[var(--hp-ink2)] leading-[1.5] m-0">
            Re-simulated end-to-end. <span className="text-[var(--hp-ok)]">Attack failed at hop 3</span> — sts:AssumeRole denied. Path closed.
          </p>
        </div>
      );
    case "certify":
      return (
        <div className="bg-[var(--hp-overlay)] border border-[color:rgba(255,27,141,0.4)] rounded-lg p-3.5">
          <div className="flex items-center justify-between">
            <p className="hp-eyebrow text-[var(--hp-brand)]">Breach Prevention</p>
            <span className="hp-green-dot" />
          </div>
          <p className="mt-2 hp-mono text-[11.5px] text-[var(--hp-ink)] leading-[1.5] m-0">
            cert/0042-a3f2c8
            <span className="block text-[var(--hp-ink3)]">issued 17:51:08Z · verified closed</span>
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function LoopSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height;
      const start = window.innerHeight * 0.7;
      const seen = Math.max(0, Math.min(total, start - rect.top));
      setProgress(Math.min(100, (seen / total) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="loop" className="hp-section" aria-labelledby="loop-title">
      <div className="hp-container">
        <p className="hp-eyebrow hp-kicker mb-6">The autonomous loop</p>
        <h2
          id="loop-title"
          className="font-semibold text-[var(--hp-ink)] max-w-[920px]"
          style={{ fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          From scan to signed certificate. <span className="text-[var(--hp-ink3)]">One human decision.</span>
        </h2>
        <div ref={ref} className="mt-20 relative">
          <div
            className="hp-loop-trail absolute left-[3px] lg:left-[7px] top-0 bottom-0 w-[2px]"
            style={{ ["--loop-progress" as string]: `${progress}%` }}
          />
          {LOOP_STAGES.map((s, i) => (
            <Fragment key={s.n}>
              <div className="relative grid grid-cols-[28px_1fr] lg:grid-cols-[40px_1fr] gap-x-6 lg:gap-x-10 pb-16 lg:pb-20">
                <div className="relative">
                  <div
                    className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[var(--hp-base)] border-2"
                    style={{
                      borderColor: progress > (i / LOOP_STAGES.length) * 100 ? "var(--color-primary)" : "#3A3A44",
                    }}
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                  <div className="lg:col-span-6">
                    <div className="hp-mono text-[12px] text-[var(--hp-ink3)] mb-2">{s.n}</div>
                    <h3 className="text-[var(--hp-ink)] font-semibold mb-3" style={{ fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                      {s.name}
                    </h3>
                    <p className="text-[15.5px] text-[var(--hp-ink2)] leading-[1.55] max-w-[520px] m-0">{s.desc}</p>
                  </div>
                  <div className="lg:col-span-5 lg:col-start-8">
                    <LoopArtifact stage={s.art} />
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <p className="mt-6 ml-9 lg:ml-12 text-[18px] text-[var(--hp-ink)] max-w-[720px]">
          One human decision at stage 5. XSEE handles detection, proof, proposal, verification, and certification. Your
          Lambda handles execution — XSEE never holds write keys.
        </p>
      </div>
    </section>
  );
}
