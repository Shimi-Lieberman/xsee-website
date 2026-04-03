export default function TrustStrip() {
  return (
    <div className="animate-on-scroll py-10 border-y border-white/5 bg-[#050d1a] trust-inner">
      {/*
        Previous trust strip (replaced):
        <div className="trust-strip border-y border-white/5 bg-[#050d1a] py-8 px-6">
          <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-white/30">
            Trusted by security engineers at high-growth startups and enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-30 grayscale">
            {names.map ...}
          </div>
        </div>
      */}
      <div className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-8 font-mono">
        Trusted by security teams at
      </div>
      <div
        className="px-6"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "48px",
          flexWrap: "nowrap",
          overflowX: "hidden",
        }}
      >
        {[
          "FINTECH STARTUP",
          "SAAS CORP",
          "SCALE-UP INC",
          "DEVOPS CO",
          "CLOUD-FIRST",
          "SECURE BASE",
        ].map((name) => (
          <div
            key={name}
            className="text-white/18 text-sm font-black tracking-[0.12em] uppercase hover:text-white/35 transition-colors cursor-default select-none font-mono"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
