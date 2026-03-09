import SectionFadeIn from "./SectionFadeIn";

const TRUST_MARKERS = [
  "AWS environments",
  "Security teams",
  "DevOps teams",
  "Enterprise cloud",
];

export default function TrustBar() {
  return (
    <section
      className="border-b border-slate-200/60 py-10 px-6"
      style={{
        background:
          "linear-gradient(180deg, #0B1C3D 0%, #0B1C3D 25%, rgba(11,28,61,0.98) 90%, #f1f5f9 100%)",
      }}
    >
      <SectionFadeIn className="mx-auto max-w-4xl text-center">
        <p className="text-lg font-medium text-white/95">
          Built for modern cloud security teams.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-slate-400">
          {TRUST_MARKERS.map((label) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              {label}
            </span>
          ))}
        </div>
      </SectionFadeIn>
    </section>
  );
}
