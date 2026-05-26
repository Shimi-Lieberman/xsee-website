// CTA — return to dark. Massive editorial closing moment.

function CTA() {
  return (
    <section id="cta" className="relative pt-28 lg:pt-44 pb-24 lg:pb-32 px-6 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Two layered glows for depth */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 glow-brand"
          style={{ width: '1200px', height: '800px' }}></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 glow-brand-soft"
          style={{ width: '1600px', height: '1200px' }}></div>
        <div className="grain"></div>
      </div>

      <div className="max-w-[1200px] mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border hairline mb-10">
          <span className="pink-dot dot-pulse"></span>
          <span className="mono text-[10.5px] tracking-[0.16em] text-ink2">FREE · NO COMMITMENT</span>
        </div>

        <h2 className="display text-ink mb-10"
          style={{ fontSize: 'clamp(56px, 9.5vw, 156px)', lineHeight: 0.94, letterSpacing: '-0.045em', maxWidth: '14ch', margin: '0 auto 40px' }}>
          <span className="block">Show me</span>
          <span className="block">
            <span className="serif-accent text-ink2" style={{ fontWeight: 400 }}>my own</span>{" "}
            breach paths.
          </span>
        </h2>

        <p className="text-[18px] lg:text-[19px] leading-[1.6] text-ink2 max-w-[560px] mx-auto mb-10"
          style={{ textWrap: 'pretty' }}>
          Connect a read-only role. We'll send back a signed report of every attack
          path in your AWS estate that actually reaches data. No call required.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <a href="#" className="btn-pink inline-flex items-center gap-2 h-14 px-7 rounded-full text-[15.5px] font-medium text-white">
            Free breach report
            <I.ArrowRight className="w-4 h-4"/>
          </a>
          <a href="#" className="btn-ghost inline-flex items-center gap-2 h-14 px-7 rounded-full text-[15.5px] text-ink2">
            Book a 20-min walkthrough
            <I.ArrowUpRight className="w-4 h-4"/>
          </a>
        </div>

        <div className="mono text-[11px] text-ink3 tracking-[0.16em] flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <span>2 MIN TO CONNECT</span>
          <span className="text-ink4">·</span>
          <span>READ-ONLY IAM</span>
          <span className="text-ink4">·</span>
          <span>NO AGENTS</span>
          <span className="text-ink4">·</span>
          <span>SOC2 TYPE II</span>
        </div>
      </div>
    </section>
  );
}

window.CTA = CTA;
