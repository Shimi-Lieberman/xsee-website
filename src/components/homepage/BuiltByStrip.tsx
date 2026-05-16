/**
 * Quiet credibility band — built-by credits only (no funding claims).
 */
const COMPANIES: readonly [string, string][] = [
  ["Snowflake", "security platform"],
  ["AWS", "IAM, networking"],
  ["Anthropic", "applied research"],
  ["Datadog", "observability"],
];

export default function BuiltByStrip() {
  return (
    <section
      className="hp-section border-t border-b-0"
      style={{ paddingTop: "80px", paddingBottom: "80px", background: "var(--hp-base)" }}
      aria-labelledby="built-by-title"
    >
      <div className="hp-container">
        <p className="hp-eyebrow mb-6">Built by</p>
        <h3
          id="built-by-title"
          className="max-w-[740px] font-semibold text-[var(--hp-ink)]"
          style={{ fontSize: "clamp(22px, 2.8vw, 32px)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
        >
          Security engineers and researchers
          <span className="text-[var(--hp-ink3)]"> who spent the last decade shipping the tools we now compete with.</span>
        </h3>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
          {COMPANIES.map(([co, role]) => (
            <div key={co} className="flex flex-col">
              <div className="text-[13.5px] font-medium text-[var(--hp-ink)]">{co}</div>
              <div className="mt-1 hp-mono text-[10.5px] uppercase tracking-wide text-[var(--hp-ink3)]">{role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
