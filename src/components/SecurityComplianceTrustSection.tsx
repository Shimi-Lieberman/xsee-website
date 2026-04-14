const BADGES: { label: string; inProgress?: boolean }[] = [
  { label: "SOC 2 Type II", inProgress: true },
  { label: "Read-only IAM — zero write access" },
  { label: "No agents installed" },
  { label: "Data never leaves your AWS environment" },
  { label: "AWS Partner Network" },
  { label: "Built on Anthropic Claude" },
  { label: "GDPR compliant" },
  { label: "Zero data retention available" },
];

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-emerald-500/70"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function SecurityComplianceTrustSection() {
  return (
    <section
      className="w-full border-y border-white/[0.06]"
      style={{ background: "var(--dark)" }}
      aria-labelledby="security-compliance-heading"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 py-10 text-center sm:px-8">
        <h2 id="security-compliance-heading" className="section-eyebrow mb-6 w-full text-center sm:mb-8">
          Security &amp; Compliance
        </h2>
        <div className="flex w-full flex-wrap items-center justify-center gap-6">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-2 text-center"
            >
              <CheckIcon />
              <span className="min-w-0 text-center text-[11px] leading-snug text-white/45 sm:text-[11px]">
                {b.label}
                {b.inProgress ? (
                  <>
                    {" "}
                    <span className="whitespace-nowrap text-[10px] font-medium text-amber-400/55">
                      (in progress)
                    </span>
                  </>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
