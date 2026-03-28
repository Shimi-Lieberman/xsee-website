export default function TrustStrip() {
  const names = ["Fintech Co", "SaaS Corp", "Scale-up Inc", "DevCo", "CloudFirst", "SecureBase"] as const;

  return (
    <div className="trust-strip border-y border-white/5 bg-[#050d1a] py-8 px-6">
      <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-white/30">
        Trusted by security engineers at high-growth startups and enterprises
      </p>
      <div className="flex flex-wrap items-center justify-center gap-10 opacity-30 grayscale">
        {names.map((name) => (
          <span key={name} className="text-sm font-bold uppercase tracking-wide text-white/50">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
