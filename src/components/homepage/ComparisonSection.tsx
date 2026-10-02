const ROWS = [
  ['Cloud scope', 'Purpose-built for AWS'],
  ['Write boundary', 'Read-only IAM; no AWS resource modification'],
  ['Path validation', 'Live AWS API evidence at each proven joint'],
  ['Evidence artifact', 'Signed receipt with verifiable hash'],
  ['Closure test', 'Original path re-simulated after remediation'],
  ['Drift response', 'Certificate suspension and revocation state'],
] as const

export default function ComparisonSection() {
  return (
    <section id="compare" className="hp-section" aria-labelledby="compare-title">
      <div className="hp-container">
        <p className="hp-eyebrow hp-kicker mb-6">The product boundary</p>
        <h2 id="compare-title" className="hp-h-display hp-h-display--wide" style={{ fontSize: 'clamp(34px, 4.6vw, 60px)' }}>
          <span className="block">Judge the evidence.</span>
          <span className="block text-[var(--hp-ink3)]">Not the category claim.</span>
        </h2>
        <p className="mt-8 max-w-[680px] text-[16px] leading-[1.6] text-[var(--hp-ink2)]">
          XSEE&apos;s defensible distinction is the loop it can demonstrate: validate a reachable joint, attach evidence, re-test closure, then change certificate state when the closed condition drifts.
        </p>
        <div className="mt-14 hp-card overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {ROWS.map(([label, value], index) => <div key={label} className={`flex min-h-28 flex-col justify-center gap-3 px-6 py-5 lg:px-8 ${index % 2 === 0 ? 'md:border-r' : ''} ${index < ROWS.length - 2 ? 'border-b' : ''} border-[var(--hp-line)]`}>
              <span className="hp-eyebrow text-[var(--hp-ink3)]">{label}</span>
              <strong className="text-[15px] font-medium leading-[1.5] text-[var(--hp-ink)]">{value}</strong>
            </div>)}
          </div>
        </div>
        <p className="mt-6 hp-mono text-[11.5px] text-[var(--hp-ink3)] max-w-[820px] leading-[1.6]">
          This table describes XSEE&apos;s product boundary only. It does not assert unverified capabilities or security architecture for other vendors.
        </p>
      </div>
    </section>
  )
}
