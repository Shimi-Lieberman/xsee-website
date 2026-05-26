// Subtle "Trusted by" logo marquee — restrained, no fake brand logos
function Logos() {
  // Set of generic-looking wordmarks built from typography (premium, not slop)
  const marks = [
    { name: 'NORTHRIDGE',  weight: 700, tracking: '0.18em' },
    { name: 'sentry/co',   weight: 500, tracking: '0' },
    { name: 'OPENBANK',    weight: 600, tracking: '0.12em' },
    { name: 'Halo Labs',   weight: 600, tracking: '-0.01em' },
    { name: 'KINETIC',     weight: 700, tracking: '0.22em' },
    { name: 'mercator·',   weight: 500, tracking: '0' },
    { name: 'Forge & Foundry', weight: 600, tracking: '-0.01em' },
    { name: 'AXIS9',       weight: 700, tracking: '0.16em' },
  ];
  const row = [...marks, ...marks];
  return (
    <section className="relative py-16 lg:py-20 px-6 lg:px-10 border-y hairline-soft overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-6 mb-8">
          <div className="eyebrow">In production at</div>
          <div className="flex-1 h-px bg-line2 opacity-30"></div>
          <div className="mono text-[11px] text-ink3 tracking-[0.14em]">
            <span className="text-ink">38</span> teams · <span className="text-ink">14</span> verticals
          </div>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #06080F, transparent)' }}></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #06080F, transparent)' }}></div>

        <div className="flex marquee whitespace-nowrap gap-16">
          {row.map((m, i) => (
            <div key={i}
              className="text-ink3 hover:text-ink2 transition-colors"
              style={{
                fontWeight: m.weight,
                letterSpacing: m.tracking,
                fontSize: '20px',
                textTransform: i % 3 === 0 ? 'uppercase' : 'none',
              }}>
              {m.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Logos = Logos;
