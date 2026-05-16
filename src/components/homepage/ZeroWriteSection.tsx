"use client";

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

const COMPARE = [
  { name: "Wiz", value: "Write access required", muted: true },
  { name: "Cortex", value: "Write access required", muted: true },
  { name: "Orca", value: "Limited write", muted: true },
  { name: "XSEE", value: "Zero write", muted: false },
] as const;

export default function ZeroWriteSection() {
  return (
    <section id="trust" className="hp-section" aria-labelledby="zero-write-title">
      <div className="hp-container">
        <p className="hp-eyebrow mb-6">Trust architecture</p>
        <h2
          id="zero-write-title"
          className="font-semibold text-[var(--hp-ink)]"
          style={{ fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}
        >
          Zero write access. <span className="text-[var(--hp-ink3)]">Ever.</span>
        </h2>
        <p className="mt-7 text-[18px] text-[var(--hp-ink2)] max-w-[720px] leading-[1.55]">
          Most cloud security vendors need write access to your AWS account to fix anything. If any of them gets
          compromised, an attacker inherits the keys to your cloud. XSEE is different by design.
        </p>
        <div className="mt-16 hp-card p-6 lg:p-10">
          <BoundaryDiagram />
        </div>
        <div className="mt-10 rounded-xl border border-[var(--hp-line)] bg-[var(--hp-overlay)] p-7 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <p className="hp-eyebrow mb-3">Threat model</p>
              <p className="text-[20px] lg:text-[22px] text-[var(--hp-ink)] font-medium leading-[1.3] max-w-[320px]" style={{ letterSpacing: "-0.01em" }}>
                If XSEE is compromised, what can the attacker do?
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "Read your read-only attack surface — the same data shown in our reports. Nothing more.",
                "Push messages to your SQS queue. Your Lambda decides whether to apply them — gated by IAM policies you control.",
                "Nothing else. The blast radius is bounded by AWS IAM, not by trust in XSEE.",
              ].map((text, i) => (
                <div key={text}>
                  <div className="hp-mono text-[11px] text-[var(--hp-ink3)] mb-2">{String(i + 1).padStart(2, "0")}</div>
                  <p className="text-[14px] text-[var(--hp-ink2)] leading-[1.55]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          {COMPARE.map((c) => (
            <div
              key={c.name}
              className={`rounded-[10px] p-5 border bg-[var(--hp-elevated)] ${
                c.muted ? "border-[var(--hp-line)]" : "border-[color:rgba(255,27,141,0.4)]"
              }`}
            >
              <p className={`hp-eyebrow mb-3 ${c.muted ? "text-[var(--hp-ink3)]" : "text-[var(--hp-brand)]"}`}>{c.name}</p>
              <p className={`text-[15px] font-medium leading-tight ${c.muted ? "text-[var(--hp-ink2)]" : "text-[var(--hp-ink)]"}`}>
                {c.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
