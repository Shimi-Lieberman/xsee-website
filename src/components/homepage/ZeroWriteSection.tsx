"use client";

import { Check, X } from "lucide-react";

const BRAND = "var(--color-primary)";

function BoundaryDiagram() {
  const W = 1200;
  const H = 480;
  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="w-full h-auto" aria-hidden>
        <defs>
          <marker id="zw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#A0A0A8" />
          </marker>
          <marker id="zw-arrow-up" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#10B981" />
          </marker>
          <pattern id="zw-dots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#26262D" />
          </pattern>
        </defs>
        <rect x="0" y="0" width={W} height="170" fill="url(#zw-dots)" opacity="0.5" />
        <rect x="0" y="310" width={W} height="170" fill="url(#zw-dots)" opacity="0.5" />
        <text x="40" y="34" fill="#6A6A72" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1.4">
          XSEE CLOUD · READ-ONLY
        </text>
        <text x="40" y={H - 22} fill="#6A6A72" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1.4">
          YOUR AWS ACCOUNT
        </text>
        <g>
          <rect x="80" y="62" width="240" height="78" rx="10" fill="#13131A" stroke="#26262D" />
          <text x="100" y="88" fill="#6A6A72" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.2">
            XSEE
          </text>
          <text x="100" y="110" fill="#F5F5F7" fontFamily="var(--font-sans)" fontSize="16" fontWeight="500">
            Orchestrator
          </text>
          <text x="100" y="130" fill="#A0A0A8" fontFamily="var(--font-mono)" fontSize="11">
            scan · simulate · propose
          </text>
        </g>
        <g>
          <line x1="0" y1="240" x2={W} y2="240" stroke={BRAND} strokeWidth="1" strokeDasharray="3 5" opacity="0.85" />
          <rect x={W / 2 - 130} y="225" width="260" height="30" rx="6" fill="#0A0A0C" stroke={BRAND} strokeOpacity="0.45" />
          <text x={W / 2} y="245" textAnchor="middle" fill={BRAND} fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1.6">
            AWS IAM BOUNDARY
          </text>
        </g>
        <g>
          <line x1="200" y1="140" x2="200" y2="332" stroke="#A0A0A8" strokeWidth="1.25" markerEnd="url(#zw-arrow)" opacity="0.85" />
          <rect x="220" y="200" width="240" height="22" rx="4" fill="#0A0A0C" />
          <text x="232" y="216" fill="#A0A0A8" fontFamily="var(--font-mono)" fontSize="11">
            fix code · no write API calls
          </text>
        </g>
        <g>
          <rect x="80" y="332" width="180" height="88" rx="10" fill="#13131A" stroke="#26262D" />
          <text x="100" y="358" fill="#6A6A72" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.2">
            SQS
          </text>
          <text x="100" y="382" fill="#F5F5F7" fontFamily="var(--font-sans)" fontSize="15" fontWeight="500">
            xsee-fix-queue
          </text>
          <text x="100" y="402" fill="#A0A0A8" fontFamily="var(--font-mono)" fontSize="11">
            signed messages
          </text>
          <line x1="260" y1="376" x2="334" y2="376" stroke="#A0A0A8" strokeWidth="1.25" markerEnd="url(#zw-arrow)" opacity="0.85" />
          <rect x="340" y="332" width="220" height="88" rx="10" fill="#13131A" stroke="#26262D" />
          <text x="360" y="358" fill="#6A6A72" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.2">
            LAMBDA · YOURS
          </text>
          <text x="360" y="382" fill="#F5F5F7" fontFamily="var(--font-sans)" fontSize="15" fontWeight="500">
            apply-fix
          </text>
          <text x="360" y="402" fill="#A0A0A8" fontFamily="var(--font-mono)" fontSize="11">
            scoped IAM policy · audited
          </text>
          <line x1="560" y1="376" x2="634" y2="376" stroke="#A0A0A8" strokeWidth="1.25" markerEnd="url(#zw-arrow)" opacity="0.85" />
          <rect x="640" y="332" width="200" height="88" rx="10" fill="#13131A" stroke="#26262D" />
          <text x="660" y="358" fill="#6A6A72" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.2">
            AWS RESOURCE
          </text>
          <text x="660" y="382" fill="#F5F5F7" fontFamily="var(--font-sans)" fontSize="15" fontWeight="500">
            sg-bastion
          </text>
          <text x="660" y="402" fill="#A0A0A8" fontFamily="var(--font-mono)" fontSize="11">
            fix applied · 80ms
          </text>
          <line x1="840" y1="376" x2="914" y2="376" stroke="#A0A0A8" strokeWidth="1.25" markerEnd="url(#zw-arrow)" opacity="0.85" />
          <rect x="920" y="332" width="200" height="88" rx="10" fill="#13131A" stroke="#26262D" />
          <text x="940" y="358" fill="#6A6A72" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.2">
            WEBHOOK
          </text>
          <text x="940" y="382" fill="#F5F5F7" fontFamily="var(--font-sans)" fontSize="15" fontWeight="500">
            re-validate
          </text>
          <text x="940" y="402" fill="#10B981" fontFamily="var(--font-mono)" fontSize="11">
            signed · attack denied
          </text>
        </g>
        <g>
          <path
            d="M 1020 332 C 1020 250, 1020 220, 1020 148"
            fill="none"
            stroke="#10B981"
            strokeWidth="1.25"
            markerEnd="url(#zw-arrow-up)"
            opacity="0.9"
          />
          <rect x="850" y="200" width="240" height="22" rx="4" fill="#0A0A0C" />
          <text x="862" y="216" fill="#10B981" fontFamily="var(--font-mono)" fontSize="11">
            signed webhook · proof of closure
          </text>
        </g>
      </svg>
    </div>
  );
}

function RoleCard({
  tag,
  status,
  name,
  sub,
  summary,
  allows,
  denies,
  accent,
}: {
  tag: string;
  status: string;
  name: string;
  sub: string;
  summary: string;
  allows: string[];
  denies: string[];
  accent?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-xl border bg-[var(--hp-elevated)] ${
        accent ? "border-[color:rgba(255,27,141,0.4)]" : "border-[var(--hp-line)]"
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
            className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 hp-mono text-[10.5px] ${
              accent
                ? "border-[color:rgba(16,185,129,0.4)] bg-[rgba(16,185,129,0.08)] text-[var(--hp-ok)]"
                : "border-[var(--hp-line2)] bg-[var(--hp-elevated)] text-[var(--hp-ink2)]"
            }`}
            style={{ letterSpacing: "0.1em" }}
          >
            <span className={accent ? "hp-green-dot" : "hp-amber-dot"} aria-hidden />
            {status}
          </span>
        </div>
        <h3 className="mt-3 text-[20px] font-semibold text-[var(--hp-ink)]" style={{ letterSpacing: "-0.02em" }}>
          {name}
        </h3>
        <p className="mt-1 text-[12.5px] text-[var(--hp-ink3)]">{sub}</p>
      </div>
      <div className="flex flex-1 flex-col px-6 py-5">
        <p className="text-[13.5px] leading-[1.6] text-[var(--hp-ink2)]">{summary}</p>
        <div className="mt-6 space-y-2">
          {allows.map((a) => (
            <div key={a} className="flex items-center gap-2 hp-mono text-[11.5px] text-[var(--hp-ink2)]">
              <Check className="h-3.5 w-3.5 shrink-0 text-[var(--hp-ok)]" aria-hidden />
              <span className="min-w-0 truncate">{a}</span>
            </div>
          ))}
          {denies.map((d) => (
            <div key={d} className="flex items-center gap-2 hp-mono text-[11.5px] text-[var(--hp-ink3)]">
              <X className="h-3.5 w-3.5 shrink-0 text-[var(--hp-ink4)]" aria-hidden />
              <span className="min-w-0 truncate line-through decoration-[var(--hp-ink4)]">{d}</span>
            </div>
          ))}
        </div>
      </div>
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
        <p className="hp-eyebrow mb-6">Zero-trust access model</p>
        <h2
          id="zero-write-title"
          className="font-semibold text-[var(--hp-ink)]"
          style={{ fontSize: "clamp(40px, 5.4vw, 72px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}
        >
          Read-only by default.
          <span className="text-[var(--hp-ink3)]"> Write access only when you approve it.</span>
        </h2>
        <p className="mt-7 max-w-[760px] text-[17px] leading-[1.55] text-[var(--hp-ink2)]">
          XSEE uses two separate IAM roles with completely different permission scopes. You create both. You control both.
          You can revoke either in 10 seconds.
        </p>

        <div className="mt-14 hp-card p-6 lg:p-10">
          <BoundaryDiagram />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <RoleCard
            tag="XSEE · SCANNER ROLE"
            status="ALWAYS ACTIVE"
            name="XSEE Scanner"
            sub="Always read-only · always on"
            summary="Uses AWS ReadOnlyAccess managed policy. Discovers assets, validates attack paths, reads IAM policies and security-group rules. Cannot write, delete, or modify anything. Ever."
            allows={["Describe* · List* · Get*", "iam:SimulatePrincipalPolicy", "iam:GetRolePolicy"]}
            denies={["All write actions", "All delete actions", "All create actions"]}
            accent
          />
          <RoleCard
            tag="YOUR · REMEDIATION LAMBDA ROLE"
            status="HUMAN-GATED"
            name="Your remediation Lambda role"
            sub="Optional · scoped · runs in your AWS account"
            summary={
              "Activated only when you choose automated remediation in your account. " +
              "You define exactly which write actions your-lambda may call — nothing else. " +
              "Every fix requires your explicit approval. YOU CONTROL the IAM trust policy and function code."
            }
            allows={[
              "Scoped writes you enumerate — executed only by your-lambda after your approval",
              "Example calls (your-lambda): ec2:RevokeSecurityGroupIngress — via your-lambda only",
              "Example calls (your-lambda): iam:DetachRolePolicy — via your-lambda only",
              "Example calls (your-lambda): s3:PutBucketPublicAccessBlock — via your-lambda only",
            ]}
            denies={["iam:DeleteRole", "iam:CreateUser", "s3:DeleteBucket"]}
          />
        </div>

        <div className="mt-10 flex flex-col gap-6 rounded-xl border border-[var(--hp-line)] bg-[var(--hp-overlay)] p-7 lg:flex-row lg:items-center lg:gap-10 lg:p-8">
          <div className="lg:max-w-[420px]">
            <p className="hp-eyebrow mb-2 text-[var(--hp-ink3)]">Complete audit trail</p>
            <p className="text-[16px] leading-[1.45] text-[var(--hp-ink)]">
              Every action by either role is logged, timestamped, cryptographically signed, and tied to a human approval
              token.
            </p>
          </div>
          <div className="hidden flex-1 rounded-lg border border-[var(--hp-line)] bg-[var(--hp-elevated)] px-4 py-3 hp-mono text-[11.5px] leading-[1.7] text-[var(--hp-ink3)] lg:block">
            <span className="text-[var(--hp-ok)]">2026-05-16T08:14:02Z</span> scanner · iam:SimulatePrincipalPolicy · sig…a3f2c8
            <br />
            <span className="text-[var(--hp-ok)]">2026-05-16T08:14:11Z</span> scanner · ec2:DescribeInstances · sig…7b1e44
            <br />
            <span className="text-[var(--hp-brand)]">2026-05-16T09:02:31Z</span> remediation · your-lambda · ec2:RevokeSecurityGroupIngress · approved by ops@acme
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          {VENDOR_COMPARE.map((c) => (
            <div
              key={c.name}
              className={`rounded-[10px] border bg-[var(--hp-elevated)] p-5 ${
                c.muted ? "border-[var(--hp-line)]" : "border-[color:rgba(255,27,141,0.4)]"
              }`}
            >
              <p className={`hp-eyebrow mb-3 ${c.muted ? "text-[var(--hp-ink3)]" : "text-[var(--hp-brand)]"}`}>
                {c.name}
              </p>
              <p
                className={`text-[15px] font-medium leading-tight ${c.muted ? "text-[var(--hp-ink2)]" : "text-[var(--hp-ink)]"}`}
              >
                {c.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
