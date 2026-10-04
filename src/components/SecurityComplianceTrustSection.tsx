const TRUST_BADGES = [
  "Read-only IAM boundary",
  "No agents",
  "AWS hosted",
  "Signed, verifiable evidence",
  "Built on Anthropic Claude",
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
          Security &amp; Trust
        </h2>
        <div className="security-compliance-trust-rows">
          <div className="security-compliance-trust-row">
            {TRUST_BADGES.map((label) => (
              <div key={label} className="security-compliance-trust-badge">
                <CheckIcon />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
