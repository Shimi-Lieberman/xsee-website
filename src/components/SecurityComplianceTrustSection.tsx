const BADGE_ROWS: { label: string; inProgress?: boolean }[][] = [
  [
    { label: "SOC 2 Type II", inProgress: true },
    { label: "Read-only IAM — zero write access" },
    { label: "No agents installed" },
    { label: "Data never leaves your AWS environment" },
  ],
  [
    { label: "AWS Partner Network" },
    { label: "Built on Anthropic Claude" },
    { label: "GDPR compliant" },
    { label: "Zero data retention available" },
  ],
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
      className="security-compliance-trust-check"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function SecurityComplianceTrustSection() {
  return (
    <section
      className="security-compliance-trust w-full border-y border-white/[0.06]"
      style={{ background: "var(--dark)" }}
      aria-labelledby="security-compliance-heading"
    >
      <div className="security-compliance-trust-inner">
        <h2 id="security-compliance-heading" className="security-compliance-trust-heading">
          Security &amp; Compliance
        </h2>
        <div className="security-compliance-trust-rows">
          {BADGE_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="security-compliance-trust-row">
              {row.map((b) => (
                <div key={b.label} className="security-compliance-trust-badge">
                  <CheckIcon />
                  <span>
                    {b.label}
                    {b.inProgress ? (
                      <>
                        {" "}
                        <span className="security-compliance-trust-in-progress">(in progress)</span>
                      </>
                    ) : null}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
