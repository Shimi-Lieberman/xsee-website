const LOGOS = [
  { name: "atlas·grid", className: "font-semibold text-[15px] lowercase", style: { letterSpacing: "-0.02em" } as const },
  { name: "NORTHBOUND", className: "hp-mono text-[12.5px] font-medium", style: { letterSpacing: "0.16em" } as const },
  { name: "Trellis", className: "font-semibold text-[16px]", style: { letterSpacing: "-0.025em" } as const },
  { name: "keystone", className: "font-medium text-[15px]", style: undefined },
  { name: "MERIDIAN", className: "font-semibold text-[14.5px]", style: { letterSpacing: "0.06em" } as const },
  { name: "spectra", className: "font-medium text-[16px] lowercase", style: { letterSpacing: "-0.02em" } as const },
  { name: "Beacon", className: "font-semibold text-[16px]", style: { letterSpacing: "-0.025em" } as const },
  { name: "orbital", className: "font-medium text-[15.5px] lowercase", style: undefined },
];

export default function TrustedByStrip() {
  return (
    <section className="hp-section px-6 lg:px-10" aria-label="Trusted by">
      <div className="hp-container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7 lg:gap-12">
          <div className="lg:max-w-[280px]">
            <p className="hp-eyebrow text-[var(--hp-ink3)] mb-2">In production</p>
            <p className="text-[14.5px] text-[var(--hp-ink2)] leading-[1.55] m-0">
              Cloud security teams generate signed Receipts on XSEE every day.
            </p>
          </div>
          <div className="flex-1 lg:max-w-[920px]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
              {LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  className="hp-logo-pill flex items-center justify-center px-4 py-5"
                >
                  <span className={`hp-logo-mark ${logo.className}`} style={logo.style}>
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
