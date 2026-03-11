const LOGOS = [
  "Amazon AWS",
  "Terraform",
  "Kubernetes",
  "AWS GuardDuty",
  "CloudTrail",
  "Okta SSO",
  "GitHub Actions",
  "Amazon EKS",
  "AWS Lambda",
];

export default function TrustStrip() {
  return (
    <div className="logos-strip">
      <p className="logos-label">Integrates with your existing cloud stack</p>
      <div className="overflow-hidden">
        <div className="logos-track">
          <div className="logos-set">
            {LOGOS.map((name) => (
              <span key={name} className="logo-item">
                {name}
              </span>
            ))}
          </div>
          <div className="logos-set" aria-hidden>
            {LOGOS.map((name) => (
              <span key={name} className="logo-item">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
