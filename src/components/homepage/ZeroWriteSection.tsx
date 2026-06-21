"use client";

import { Check, X, ShieldCheck, Lock } from "lucide-react";

function RoleRow({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="grid h-[22px] grid-cols-[16px_1fr] items-center gap-2.5">
      {ok ? (
        <Check className="h-3.5 w-3.5 text-[var(--hp-ok)]" aria-hidden />
      ) : (
        <X className="h-3.5 w-3.5 text-[var(--hp-brand)]" aria-hidden />
      )}
      <span
        className={`hp-mono truncate text-[11.5px] leading-none ${ok ? "text-[var(--hp-ink2)]" : "text-[var(--hp-ink2)]"}`}
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
                ? "border-[color:rgba(255,27,141,0.4)] bg-[rgba(255,27,141,0.08)] text-[var(--hp-brand)]"
                : "border-[color:rgba(16,185,129,0.4)] bg-[rgba(16,185,129,0.08)] text-[var(--hp-ok)]"
            }`}
            style={{ letterSpacing: "0.1em" }}
          >
            <span className={accent ? "hp-pink-dot" : "hp-green-dot"} style={{ boxShadow: "none" }} aria-hidden />
            {status}
          </span>
        </div>
        <h3 className="mt-3 flex items-center gap-2 text-[19px] font-semibold leading-tight text-[var(--hp-ink)]" style={{ letterSpacing: "-0.02em" }}>
          {accent ? (
            <Lock className="h-4 w-4 text-[var(--hp-brand)]" aria-hidden />
          ) : (
            <ShieldCheck className="h-4 w-4 text-[var(--hp-ok)]" aria-hidden />
          )}
          {name}
        </h3>
        <p className="mt-1 text-[12.5px] leading-snug text-[var(--hp-ink3)]">{sub}</p>
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        <p className="text-[13px] leading-[1.6] text-[var(--hp-ink2)]">{summary}</p>
        {listLabel ? (
          <p className="hp-eyebrow hp-eyebrow--bare mt-6 text-[var(--hp-ink3)]" style={{ fontSize: "10px" }}>
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
  const steps = [
    { tag: "01 · SCAN", label: "Path found + proven", sub: "read-only" },
    { tag: "02 · PROPOSE", label: "Exact fix as code", sub: "terraform · cfn · cli" },
    { tag: "03 · APPROVE", label: "ONE human decision", sub: "ops@acme", accent: true },
    { tag: "04 · APPLY", label: "Assume scoped role", sub: "per-call STS · single action" },
    { tag: "05 · RE-SIMULATE", label: "Attack replayed (L2)", sub: "auto-rollback if path holds" },
    { tag: "06 · CERTIFY", label: "Signed certificate", sub: "breach prevention" },
  ] as const;

  const Step = ({ tag, label, sub, accent }: { tag: string; label: string; sub?: string; accent?: boolean }) => (
    <div
      className={`flex w-[176px] shrink-0 flex-col items-start rounded-xl border p-4 text-left ${
        accent
          ? "border-[color:rgba(255,27,141,0.5)] bg-[rgba(255,27,141,0.06)]"
          : "border-[var(--hp-line)] bg-[var(--hp-elevated)]"
      }`}
    >
      <div
        className={`hp-mono mb-2 inline-flex items-center gap-1.5 text-[9.5px] ${accent ? "text-[var(--hp-brand)]" : "text-[var(--hp-ink3)]"}`}
        style={{ letterSpacing: "0.14em" }}
      >
        {accent ? <span className="hp-pink-dot" style={{ boxShadow: "none" }} aria-hidden /> : null}
        {tag}
      </div>
      <div
        className={`min-h-[34px] text-[13px] font-medium leading-[1.35] ${accent ? "text-[var(--hp-brand)]" : "text-[var(--hp-ink)]"}`}
      >
        {label}
      </div>
      {sub ? <p className="hp-mono mt-1.5 text-[10px] leading-[1.4] text-[var(--hp-ink3)]">{sub}</p> : null}
    </div>
  );

  const Arrow = () => (
    <div className="flex shrink-0 items-center self-center" style={{ width: 40 }}>
      <svg viewBox="0 0 40 8" className="h-2 w-full" aria-hidden>
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
        <line x1="0" y1="4" x2="38" y2="4" stroke="#5A6275" strokeWidth="1.5" markerEnd="url(#zw-fs-arrow)" />
      </svg>
    </div>
  );

  return (
    <div className="hp-card mt-10 p-6 lg:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <p className="hp-eyebrow text-[var(--hp-ink3)]">How a fix lands</p>
        <p className="hp-mono inline-flex items-center gap-2 text-[10.5px] text-[var(--hp-brand)]" style={{ letterSpacing: "0.1em" }}>
          <span className="hp-pink-dot" aria-hidden />
          ONE&nbsp;HUMAN&nbsp;APPROVAL
        </p>
      </div>

      <div className="-mx-2 overflow-x-auto px-2 pb-2">
        <div className="flex min-w-[1240px] items-stretch gap-1">
          {steps.map((s, i) => (
            <div key={s.tag} className="flex items-stretch">
              <Step tag={s.tag} label={s.label} sub={s.sub} accent={"accent" in s ? s.accent : undefined} />
              {i < steps.length - 1 ? <Arrow /> : null}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 max-w-[840px] border-t border-[var(--hp-line)] pt-5 text-[12.5px] leading-[1.6] text-[var(--hp-ink2)]">
        <span className="font-medium text-[var(--hp-ink)]">One human decision.</span> Every step is scoped, re-proved, and
        cryptographically signed — from the read-only scan to the final certificate.
      </p>
    </div>
  );
}

type Cell = { v: string; tone?: "yes" | "no" | "muted" | "win" };

const COMPARE_COLS = ["Wiz", "Cortex", "Orca", "XSEE"] as const;

const COMPARE_ROWS: { label: string; cells: Cell[]; highlight?: boolean }[] = [
  {
    label: "Reads your AWS resources",
    cells: [
      { v: "Yes", tone: "muted" },
      { v: "Yes", tone: "muted" },
      { v: "Yes", tone: "muted" },
      { v: "Yes", tone: "yes" },
    ],
  },
  {
    label: "Standing write access to your cloud",
    cells: [
      { v: "Yes", tone: "no" },
      { v: "Yes", tone: "no" },
      { v: "Limited", tone: "no" },
      { v: "None — scoped, revocable role only", tone: "win" },
    ],
  },
  {
    label: "Applies a fix without approval",
    cells: [
      { v: "—", tone: "muted" },
      { v: "—", tone: "muted" },
      { v: "—", tone: "muted" },
      { v: "No", tone: "win" },
    ],
  },
  {
    label: "Cryptographic proof per hop",
    highlight: true,
    cells: [
      { v: "No", tone: "no" },
      { v: "No", tone: "no" },
      { v: "No", tone: "no" },
      { v: "Yes · signed", tone: "win" },
    ],
  },
  {
    label: "Re-verification via re-simulation",
    highlight: true,
    cells: [
      { v: "No", tone: "no" },
      { v: "No", tone: "no" },
      { v: "No", tone: "no" },
      { v: "Yes", tone: "win" },
    ],
  },
];

function CompareCellContent({ cell }: { cell: Cell }) {
  const color =
    cell.tone === "win"
      ? "text-[var(--hp-ink)]"
      : cell.tone === "yes"
      ? "text-[var(--hp-ink2)]"
      : cell.tone === "no"
      ? "text-[var(--hp-ink3)]"
      : "text-[var(--hp-ink3)]";
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12.5px] font-medium leading-[1.3] ${color}`}>
      {cell.tone === "win" ? <Check className="h-3.5 w-3.5 shrink-0 text-[var(--hp-brand)]" aria-hidden /> : null}
      {cell.tone === "no" ? <X className="h-3.5 w-3.5 shrink-0 text-[var(--hp-ink4)]" aria-hidden /> : null}
      <span className="hp-mono">{cell.v}</span>
    </span>
  );
}

function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--hp-line)]">
      {/* Header */}
      <div className="grid grid-cols-[minmax(180px,1.6fr)_repeat(4,1fr)] border-b border-[var(--hp-line)] bg-[var(--hp-overlay)]">
        <div className="px-5 py-4" />
        {COMPARE_COLS.map((c) => {
          const isXsee = c === "XSEE";
          return (
            <div
              key={c}
              className={`px-4 py-4 ${isXsee ? "bg-[rgba(255,27,141,0.06)]" : ""}`}
            >
              <span
                className={`hp-eyebrow hp-eyebrow--bare ${isXsee ? "text-[var(--hp-brand)]" : "text-[var(--hp-ink3)]"}`}
              >
                {c}
              </span>
            </div>
          );
        })}
      </div>

      {/* Rows */}
      {COMPARE_ROWS.map((row, ri) => (
        <div
          key={row.label}
          className={`grid grid-cols-[minmax(180px,1.6fr)_repeat(4,1fr)] items-center ${
            ri < COMPARE_ROWS.length - 1 ? "border-b border-[var(--hp-line)]" : ""
          } ${row.highlight ? "bg-[rgba(255,27,141,0.04)]" : ""}`}
        >
          <div className="px-5 py-4">
            <span
              className={`text-[13px] leading-[1.4] ${row.highlight ? "font-semibold text-[var(--hp-ink)]" : "text-[var(--hp-ink2)]"}`}
            >
              {row.label}
            </span>
            {row.highlight ? (
              <span className="hp-mono ml-2 hidden align-middle text-[9px] text-[var(--hp-brand)] lg:inline" style={{ letterSpacing: "0.12em" }}>
                XSEE&nbsp;ONLY
              </span>
            ) : null}
          </div>
          {row.cells.map((cell, ci) => {
            const isXsee = COMPARE_COLS[ci] === "XSEE";
            return (
              <div
                key={`${row.label}-${ci}`}
                className={`px-4 py-4 ${isXsee ? "bg-[rgba(255,27,141,0.06)]" : ""}`}
              >
                <CompareCellContent cell={cell} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function ZeroWriteSection() {
  return (
    <section id="trust" className="hp-section" aria-labelledby="access-model-title">
      <div className="hp-container">
        <p className="hp-eyebrow mb-5">The access model</p>
        <h2
          id="access-model-title"
          className="hp-h-display"
          style={{ fontSize: "clamp(36px, 4.6vw, 60px)", letterSpacing: "-0.04em" }}
        >
          <span className="block">Scoped write. Customer-owned.</span>
          <span className="block text-[var(--hp-ink3)]">Revocable.</span>
        </h2>
        <p className="mt-8 max-w-[720px] text-[16px] leading-[1.6] text-[var(--hp-ink2)]">
          Most cloud security vendors hold standing write access to your account. XSEE doesn&apos;t. The only role that
          can change anything is one you deploy, scope, and revoke.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <RoleCard
            tag="XSEE · READ-ONLY"
            status="ALWAYS ACTIVE"
            name="XSEE Scanner"
            sub="Read-only, always"
            summary="AWS ReadOnlyAccess. Discovers assets, validates attack paths, and runs the attack simulations. It cannot write, delete, or modify anything in your account."
            listLabel="What the scanner can do"
            allows={[
              "AWS ReadOnlyAccess managed policy",
              "Discovers assets · validates paths",
              "Runs attack simulations",
            ]}
            denies={["Cannot write anything", "Cannot delete anything", "Cannot modify anything"]}
          />
          <RoleCard
            tag="YOUR ACCOUNT · SCOPED WRITE"
            status="YOU DEPLOY & REVOKE"
            name="XseeRemediationRole"
            sub="Scoped write — you own it"
            summary="Deployed in your account via CloudFormation. Every fix is constrained by a per-call AWS STS session policy to exactly the actions that fix needs — enforced by AWS, not by us. Revoke it anytime from your console."
            listLabel="Hard, role-level DENY"
            allows={[
              "Deployed via CloudFormation · your account",
              "Per-call STS session policy · scoped by AWS",
              "Revoke anytime from your console",
            ]}
            denies={["DENY · CloudTrail", "DENY · GuardDuty", "DENY · Organizations"]}
            accent
          />
        </div>

        <p className="mt-5 text-[12.5px] leading-[1.6] text-[var(--hp-ink3)]">
          No standing write access. No fix without one human approval. Every action scoped, logged, and signed.
        </p>

        <FlowStrip />

        <div className="mt-14 border-t border-[var(--hp-line)] pt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="hp-eyebrow mb-2 text-[var(--hp-ink3)]">Vendor comparison</p>
              <p className="text-[18px] font-medium text-[var(--hp-ink)]" style={{ letterSpacing: "-0.01em" }}>
                The same reads. A very different blast radius.
              </p>
            </div>
            <p className="hp-mono text-[10.5px] text-[var(--hp-ink3)]" style={{ letterSpacing: "0.12em" }}>
              SOURCE · VENDOR&nbsp;DOCS · MAY&nbsp;2026
            </p>
          </div>

          <div className="-mx-2 overflow-x-auto px-2 pb-1">
            <div className="min-w-[680px]">
              <ComparisonTable />
            </div>
          </div>

          <p className="mt-5 text-[12.5px] leading-[1.6] text-[var(--hp-ink3)]">
            Cryptographic proof per hop and re-verification by re-simulation are unique to XSEE.
          </p>
        </div>
      </div>
    </section>
  );
}
