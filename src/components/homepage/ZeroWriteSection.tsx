"use client";

import { Check, X } from "lucide-react";

function RoleRow({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="grid h-[22px] grid-cols-[16px_1fr] items-center gap-2.5">
      {ok ? (
        <Check className="h-3.5 w-3.5 text-[var(--hp-ok)]" aria-hidden />
      ) : (
        <X className="h-3.5 w-3.5 text-[var(--hp-ink4)]" aria-hidden />
      )}
      <span
        className={`hp-mono truncate text-[11.5px] leading-none ${ok ? "text-[var(--hp-ink2)]" : "text-[var(--hp-ink3)]"}`}
      >
        {text}
      </span>
    </div>
  );
}

function RoleCard({
  tag,
  status,
  name,
  sub,
  summary,
  listLabel,
  allows,
  denies,
  accent,
}: {
  tag: string;
  status: string;
  name: string;
  sub: string;
  summary: string;
  listLabel?: string;
  allows: string[];
  denies: string[];
  accent?: boolean;
}) {
  return (
    <div
      className={`hp-card flex h-full flex-col overflow-hidden ${
        accent ? "border-[color:rgba(255,27,141,0.4)]" : ""
      }`}
    >
      <div className="border-b border-[var(--hp-line)] px-6 py-5">
        <div className="flex items-center justify-between gap-3">
          <span
            className={`hp-mono text-[11px] ${accent ? "text-[var(--hp-brand)]" : "text-[var(--hp-ink3)]"}`}
            style={{ letterSpacing: "0.14em" }}
          >
            {tag}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-[3px] hp-mono text-[10.5px] ${
              accent
                ? "border-[color:rgba(16,185,129,0.4)] bg-[rgba(16,185,129,0.08)] text-[var(--hp-ok)]"
                : "border-[var(--hp-line2)] bg-[var(--hp-elevated)] text-[var(--hp-ink2)]"
            }`}
            style={{ letterSpacing: "0.1em" }}
          >
            <span className={accent ? "hp-green-dot" : "hp-amber-dot"} style={{ boxShadow: "none" }} aria-hidden />
            {status}
          </span>
        </div>
        <h3 className="mt-3 text-[19px] font-semibold leading-tight text-[var(--hp-ink)]" style={{ letterSpacing: "-0.02em" }}>
          {name}
        </h3>
        <p className="mt-1 text-[12.5px] leading-snug text-[var(--hp-ink3)]">{sub}</p>
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        <p className="text-[13px] leading-[1.6] text-[var(--hp-ink2)]">{summary}</p>
        {listLabel ? (
          <p className="hp-eyebrow mt-6 text-[var(--hp-ink3)]" style={{ fontSize: "10px" }}>
            {listLabel}
          </p>
        ) : null}
        <div className="mt-3 grid gap-2.5">
          {allows.map((a) => (
            <RoleRow key={a} ok text={a} />
          ))}
          {denies.map((d) => (
            <RoleRow key={d} ok={false} text={d} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowStrip() {
  const Step = ({ tag, label, sub, accent }: { tag: string; label: string; sub?: string; accent?: boolean }) => (
    <div className="flex w-[140px] shrink-0 flex-col items-start text-left">
      <div
        className={`hp-mono mb-2 text-[9.5px] ${accent ? "text-[var(--hp-brand)]" : "text-[var(--hp-ink3)]"}`}
        style={{ letterSpacing: "0.14em" }}
      >
        {tag}
      </div>
      <div className="min-h-[34px] text-[12px] font-medium leading-[1.4] text-[var(--hp-ink)]">{label}</div>
      {sub ? <p className="hp-mono mt-1.5 text-[10px] leading-[1.4] text-[var(--hp-ink3)]">{sub}</p> : null}
    </div>
  );

  const Arrow = ({ label }: { label?: string }) => (
    <div className="flex shrink-0 flex-col items-center self-start pt-[22px]" style={{ width: 72 }}>
      <svg viewBox="0 0 60 8" className="h-2 w-full" aria-hidden>
        <defs>
          <marker
            id="zw-fs-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="#5A6275" />
          </marker>
        </defs>
        <line x1="0" y1="4" x2="58" y2="4" stroke="#5A6275" strokeWidth="1.5" markerEnd="url(#zw-fs-arrow)" />
      </svg>
      {label ? <p className="hp-mono mt-2.5 whitespace-nowrap text-[9.5px] leading-none text-[var(--hp-ink3)]">{label}</p> : null}
    </div>
  );

  return (
    <div className="hp-card mt-10 p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <p className="hp-eyebrow text-[var(--hp-ink3)]">Flow · how a fix lands</p>
        <p className="hp-mono inline-flex items-center gap-2 text-[10.5px] text-[var(--hp-ink3)]" style={{ letterSpacing: "0.1em" }}>
          <span className="hp-pink-dot" aria-hidden />
          ONE&nbsp;HUMAN&nbsp;APPROVAL
        </p>
      </div>

      <div className="-mx-2 overflow-x-auto px-2 pb-2">
        <div className="flex min-w-[1240px] items-start gap-1">
          <Step tag="XSEE · 01" label="Scanner finds path" sub="read-only" accent />
          <Arrow label="proves it" />
          <Step tag="XSEE · 02" label="Proposes fix as code" sub="terraform · cli" accent />
          <Arrow label="approval" />
          <Step tag="HUMAN" label="You approve" sub="ops@acme" accent />

          <div className="mx-4 flex shrink-0 flex-col items-center" style={{ width: 92, height: 110 }}>
            <p className="hp-mono whitespace-nowrap text-[9.5px] text-[var(--hp-brand)]" style={{ letterSpacing: "0.18em" }}>
              IAM&nbsp;BOUNDARY
            </p>
            <div className="relative mb-2 mt-2 w-[2px] flex-1">
              <div className="absolute inset-0 rounded-full bg-[var(--hp-brand)]" />
              <span
                className="absolute left-1/2 top-0 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-[var(--hp-brand)]"
                style={{ boxShadow: "0 0 0 4px rgba(255, 27, 141, 0.12)" }}
                aria-hidden
              />
              <span
                className="absolute bottom-0 left-1/2 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-[var(--hp-brand)]"
                style={{ boxShadow: "0 0 0 4px rgba(255, 27, 141, 0.12)" }}
                aria-hidden
              />
            </div>
            <p className="hp-mono whitespace-nowrap text-[9.5px] text-[var(--hp-brand)]" style={{ letterSpacing: "0.18em" }}>
              MESSAGE&nbsp;ONLY
            </p>
          </div>

          <Step tag="YOUR · 01" label="Your SQS queue" sub="signed message" />
          <Arrow label="pull" />
          <Step tag="YOUR · 02" label="Your Lambda applies fix" sub="your IAM policy" />
          <Arrow label="trigger" />
          <Step tag="YOUR · 03" label="Re-simulation" sub="auto · L2" />
          <Arrow label="if open" />
          <Step tag="YOUR · 04" label="Auto-rollback" sub="if still works" />
        </div>
      </div>

      <p className="mt-8 max-w-[840px] border-t border-[var(--hp-line)] pt-5 text-[12.5px] leading-[1.6] text-[var(--hp-ink2)]">
        <span className="font-medium text-[var(--hp-ink)]">XSEE never crosses this line.</span> The only thing that crosses the
        IAM boundary is a signed message on a queue you own. Your Lambda decides whether to apply it.
      </p>
    </div>
  );
}

const VENDOR_COMPARE = [
  { name: "Wiz", value: "Write access required", muted: true },
  { name: "Cortex", value: "Write access required", muted: true },
  { name: "Orca", value: "Limited write", muted: true },
  { name: "XSEE", value: "Zero write · ever", muted: false },
] as const;

export default function ZeroWriteSection() {
  return (
    <section id="trust" className="hp-section" aria-labelledby="zero-write-title">
      <div className="hp-container">
        <p className="hp-eyebrow mb-5">Zero-trust access model</p>
        <h2
          id="zero-write-title"
          className="hp-h-display"
          style={{ fontSize: "clamp(40px, 5.2vw, 68px)", letterSpacing: "-0.04em" }}
        >
          <span className="block">Zero write access.</span>
          <span className="block text-[var(--hp-ink3)]">Ever.</span>
        </h2>
        <p className="mt-8 max-w-[680px] text-[16px] leading-[1.6] text-[var(--hp-ink2)]">
          Most cloud security vendors need write access to your AWS account to fix anything. If any of them is compromised,
          an attacker inherits the keys to your cloud. XSEE is different by design — we never hold write access, ever.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <RoleCard
            tag="XSEE · READ-ONLY"
            status="ALWAYS ACTIVE"
            name="XSEE Scanner"
            sub="The only access XSEE ever holds"
            summary="AWS ReadOnlyAccess managed policy. Discovers assets, validates attack paths, reads IAM policies and security-group rules, runs the attack simulation. Cannot write, delete, or modify anything in your account. There is no second XSEE role."
            listLabel="XSEE's IAM permissions"
            allows={[
              "Describe* · List* · Get*",
              "iam:SimulatePrincipalPolicy",
              "sts:AssumeRole · read-only sandbox",
            ]}
            denies={["All write actions", "All delete actions", "All create actions"]}
            accent
          />
          <RoleCard
            tag="YOUR ACCOUNT · YOUR LAMBDA"
            status="YOU CONTROL IT"
            name="Your Remediation Lambda"
            sub="Runs in your AWS account — not XSEE's"
            summary="When you approve a fix, XSEE generates the change as code and drops it on a queue in your account. A Lambda you deploy and own applies it. The IAM policy is yours, scoped by you. XSEE never has credentials to this Lambda and never executes the fix itself."
            listLabel="Your Lambda — you define the policy"
            allows={["Your scoped fix actions", "You define the policy", "You audit every run"]}
            denies={[
              "XSEE write access · never exists",
              "XSEE-held credentials · never exist",
              "Auto-apply without approval",
            ]}
          />
        </div>

        <FlowStrip />

        <div className="mt-10 flex flex-col gap-6 rounded-xl border border-[var(--hp-line)] bg-[var(--hp-overlay)] p-7 lg:flex-row lg:items-center lg:gap-10 lg:p-8">
          <div className="lg:max-w-[420px]">
            <p className="hp-eyebrow mb-2 text-[var(--hp-ink3)]">Complete audit trail</p>
            <p className="text-[15px] leading-[1.5] text-[var(--hp-ink)]">
              Every step is logged, timestamped, cryptographically signed, and tied to your approval token — across the
              boundary.
            </p>
          </div>
          <div className="hidden flex-1 rounded-lg border border-[var(--hp-line)] bg-[var(--hp-elevated)] px-4 py-3 hp-mono text-[11.5px] leading-[1.8] text-[var(--hp-ink3)] lg:block">
            <span className="text-[var(--hp-ok)]">2026-05-16T08:14:02Z</span>&nbsp;&nbsp;xsee-scanner · iam:SimulatePrincipalPolicy ·
            sig…a3f2c8
            <br />
            <span className="text-[var(--hp-ok)]">2026-05-16T09:02:28Z</span>&nbsp;&nbsp;xsee · fix proposed · queued to your account ·
            sig…7b1e44
            <br />
            <span className="text-[var(--hp-brand)]">2026-05-16T09:02:31Z</span>&nbsp;&nbsp;your-lambda · ec2:RevokeSecurityGroupIngress ·
            approved by ops@acme
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--hp-line)] pt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="hp-eyebrow mb-2 text-[var(--hp-ink3)]">Vendor comparison · write access</p>
              <p className="text-[18px] font-medium text-[var(--hp-ink)]" style={{ letterSpacing: "-0.01em" }}>
                Only one platform never holds the keys.
              </p>
            </div>
            <p className="hp-mono text-[10.5px] text-[var(--hp-ink3)]" style={{ letterSpacing: "0.12em" }}>
              SOURCE · VENDOR&nbsp;DOCS · MAY&nbsp;2026
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {VENDOR_COMPARE.map((c) => (
              <div
                key={c.name}
                className={`rounded-[10px] border p-5 ${
                  c.muted ? "border-[var(--hp-line)] bg-[var(--hp-elevated)]" : "border-[color:rgba(255,27,141,0.4)] bg-[var(--hp-elevated)]"
                }`}
              >
                <p className={`hp-eyebrow mb-3 ${c.muted ? "text-[var(--hp-ink3)]" : "text-[var(--hp-brand)]"}`}>{c.name}</p>
                <p className={`text-[14px] font-medium leading-[1.35] ${c.muted ? "text-[var(--hp-ink2)]" : "text-[var(--hp-ink)]"}`}>
                  {c.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
