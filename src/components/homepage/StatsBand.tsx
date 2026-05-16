type StatItem = { value: string; label: string; accent?: boolean };

const STATS: StatItem[] = [
  { value: "1,000+", label: "attack patterns in XSEE's engine" },
  { value: "7", label: "engines in the autonomous loop" },
  { value: "92%", label: "avg exploit confidence score" },
  { value: "<30m", label: "time to first proven breach path" },
  { value: "$3.2M", label: "avg data-at-risk proven on first scan", accent: true },
];

export default function HomepageStatsBand() {
  return (
    <section className="hp-section" aria-labelledby="stats-title">
      <div className="hp-container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 mb-16">
          <div>
            <p className="hp-eyebrow mb-5">Production telemetry</p>
            <h2
              id="stats-title"
              className="font-semibold text-[var(--hp-ink)] max-w-[720px]"
              style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              Numbers from the loop.
              <span className="text-[var(--hp-ink3)]"> Real customer environments.</span>
            </h2>
          </div>
          <div className="hp-mono text-[11.5px] text-[var(--hp-ink3)] inline-flex items-center gap-2">
            <span className="hp-green-dot" style={{ boxShadow: "none" }} />
            Live read-only scans
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                className={`hp-mono font-medium leading-none ${s.accent ? "text-[var(--hp-brand)]" : "text-[var(--hp-ink)]"}`}
                style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.04em" }}
              >
                {s.value}
              </div>
              <p className="mt-4 text-[14px] text-[var(--hp-ink2)] leading-[1.45] max-w-[220px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
