// REDUCTION — The editorial slab. Massive type. 4,000 → 3.
// Two beats: (1) the strike-through reduction, (2) the serif italic counterpoint.

function Reduction() {
  return (
    <section className="relative py-32 lg:py-48 px-6 lg:px-10 overflow-hidden">
      {/* Faint floor texture */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 dotgrid-dark opacity-40"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/3 glow-brand-soft"
          style={{ width: '900px', height: '600px' }}></div>
      </div>

      <div className="max-w-[1400px] mx-auto">

        {/* Top-line caption */}
        <div className="flex items-center gap-4 mb-16 lg:mb-24">
          <span className="eyebrow">01 · The problem</span>
          <span className="flex-1 h-px bg-line2 opacity-30 max-w-[200px]"></span>
        </div>

        {/* The reduction headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          <div className="lg:col-span-7">
            <h2 className="display text-ink mb-4"
              style={{ fontSize: 'clamp(56px, 9vw, 132px)', lineHeight: 0.95, letterSpacing: '-0.045em' }}>
              <span className="block text-ink3">Your scanner found</span>
              <span className="block">
                <span className="num-strike mono text-ink" style={{ fontWeight: 600 }}>4,000</span>
                <span className="text-ink3"> findings.</span>
              </span>
              <span className="block">
                <span className="text-ink">3</span>{" "}
                <span className="serif-accent text-ink2">actually</span>{" "}
                <span className="text-ink">matter.</span>
              </span>
            </h2>
          </div>

          {/* Right column: the counter-narrative */}
          <div className="lg:col-span-5 lg:pt-12">
            <div className="border-l hairline pl-6 lg:pl-8 max-w-[460px]">
              <p className="text-[19px] lg:text-[20px] leading-[1.6] text-ink2"
                style={{ textWrap: 'pretty' }}>
                Severity scores. Risk ratings. Compliance traffic-lights. Every dashboard
                tells you something is wrong — none of them tell you{" "}
                <span className="text-ink">whether it can actually be exploited</span>.
              </p>
              <p className="mt-6 text-[16px] text-ink3 leading-[1.65]">
                xsee chains misconfigurations, IAM permissions, and network access into
                realistic attack paths. The only finding that earns your attention is the
                one that reaches data.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison strip — the contrast in numbers */}
        <div className="mt-24 lg:mt-32 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border hairline rounded-[14px] overflow-hidden">
          {[
            { label: 'Findings produced', value: '4,127', sub: 'last 24h', tone: 'ink3' },
            { label: 'Reach prod data',   value: '23',    sub: 'paths',     tone: 'ink' },
            { label: 'Genuinely novel',   value: '3',     sub: 'after dedupe', tone: 'brand' },
            { label: 'Need a human',      value: '1',     sub: 'review queue', tone: 'brand' },
          ].map((c, i) => (
            <div key={i} className="bg-base p-7 lg:p-9 relative">
              <div className="eyebrow mb-3">{c.label}</div>
              <div className={`display mono font-semibold tracking-tight ${
                c.tone === 'brand' ? 'text-brand' : c.tone === 'ink' ? 'text-ink' : 'text-ink2'
              }`} style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1 }}>
                {c.value}
              </div>
              <div className="mt-3 text-[12px] text-ink3 mono tracking-wider">{c.sub}</div>
              {/* Arrow between cells (desktop) */}
              {i < 3 && (
                <div className="hidden md:flex absolute -right-px top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-6 h-6 rounded-full bg-base border hairline items-center justify-center">
                  <I.ArrowRight className="w-3 h-3 text-ink3"/>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Reduction = Reduction;
