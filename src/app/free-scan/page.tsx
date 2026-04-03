"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";

const AWS_REGIONS = [
  { value: "us-east-1", label: "us-east-1 (N. Virginia)" },
  { value: "us-west-2", label: "us-west-2 (Oregon)" },
  { value: "eu-west-1", label: "eu-west-1 (Ireland)" },
  { value: "eu-central-1", label: "eu-central-1 (Frankfurt)" },
  { value: "ap-southeast-1", label: "ap-southeast-1 (Singapore)" },
];

const TRUST_ACCOUNT_ID = "722375386510";

const REMEDIATION_POLICY = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:RevokeSecurityGroupIngress",
        "iam:DetachRolePolicy",
        "s3:PutBucketPublicAccessBlock"
      ],
      "Resource": "*"
    }
  ]
}`;

export default function FreeScanPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    awsRoleArn: "",
    awsRegion: "us-east-1",
    website: "",
    remediation_role_arn: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/free-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website: formData.website,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again or email sales@xsee.io directly.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email sales@xsee.io directly.");
    }
  }

  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <main className="free-scan-main w-full max-w-full mx-auto min-w-0 block">
        <div className="free-scan-page w-full max-w-full mx-auto min-w-0">
        <section className="section sec-navy free-scan-hero">
          <div className="container">
            <div className="free-scan-hero-inner">
              <h1 className="display-lg">Get your free Risk Assessment</h1>
              <p className="free-scan-sub">
                We connect to your AWS account with read-only IAM. No agents, no code deployed. You get a ranked report of your top attack paths in under 30 minutes.
              </p>
              <div className="hero-proof-strip" style={{ marginTop: 24 }}>
                <div className="hps-item">
                  <div className="hps-dot" style={{ background: "var(--green)" }} />
                  Read-only IAM only
                </div>
                <div className="hps-item">
                  <div className="hps-dot" style={{ background: "var(--sky)" }} />
                  No agents installed
                </div>
                <div className="hps-item">
                  <div className="hps-dot" style={{ background: "var(--yellow)" }} />
                  Report delivered in 30 min
                </div>
              </div>
              <div className="my-8 grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-3">
                {[
                  { value: "847", label: "Avg assets scanned" },
                  { value: "22 min", label: "Avg time to first proof" },
                  { value: "3", label: "Avg critical paths found" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="mt-1 text-xs text-white/40">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section sec-navy free-scan-steps">
          <div className="container">
            <h2 className="free-scan-section-title">How to connect your AWS account (2 minutes)</h2>

            <div className="free-scan-step">
              <div className="free-scan-step-num">1</div>
              <div>
                <h3>Create read-only IAM role</h3>
                <ul>
                  <li>In your AWS Console, go to <strong>IAM → Roles → Create Role</strong></li>
                  <li>Select <strong>Another AWS account</strong></li>
                  <li>Account ID to trust: <code className="free-scan-code">{TRUST_ACCOUNT_ID}</code>
                    <button type="button" onClick={() => copyToClipboard(TRUST_ACCOUNT_ID)} className="free-scan-copy">Copy</button>
                  </li>
                  <li>Attach policy: <strong>ReadOnlyAccess</strong> (AWS managed)</li>
                  <li>Role name: <code className="free-scan-code">xsee-free-scan-role</code></li>
                </ul>
              </div>
            </div>

            <div className="free-scan-step">
              <div className="free-scan-step-num">2</div>
              <div>
                <h3>Copy the Role ARN</h3>
                <p>After creating the role, click on it and copy the Role ARN. It looks like:</p>
                <code className="free-scan-code-block">arn:aws:iam::YOUR_ACCOUNT_ID:role/xsee-free-scan-role</code>
              </div>
            </div>

            <div className="free-scan-step">
              <div className="free-scan-step-num">3</div>
              <div>
                <h3>Paste below and run</h3>
                <p>Paste your Role ARN in the form below and we&apos;ll start the scan.</p>
              </div>
            </div>

            <p className="free-scan-optional-head" style={{ marginTop: 40 }}>
              Optional — Enable one-click remediation
            </p>

            <div className="free-scan-step">
              <div className="free-scan-step-num">4</div>
              <div>
                <h3>Enable one-click remediation</h3>
                <p>
                  Want XSEE to apply fixes automatically after you approve them? Create a second scoped role
                  with write permissions.
                </p>
                <p style={{ marginTop: 12, fontWeight: 600, color: "var(--text-primary)" }}>Instructions:</p>
                <ul>
                  <li>
                    In AWS Console → <strong>IAM → Roles → Create Role</strong>
                  </li>
                  <li>
                    Select: <strong>Another AWS account</strong>
                  </li>
                  <li>
                    Account ID: <code className="free-scan-code">{TRUST_ACCOUNT_ID}</code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(TRUST_ACCOUNT_ID)}
                      className="free-scan-copy"
                    >
                      Copy
                    </button>
                  </li>
                  <li>Attach a custom <strong>inline policy</strong> (below)</li>
                  <li>
                    Role name: <code className="free-scan-code">xsee-remediation-role</code>
                  </li>
                </ul>
                <p style={{ marginTop: 16, fontWeight: 600, color: "var(--text-primary)" }}>
                  Custom policy (copy and paste):
                </p>
                <pre className="free-scan-policy-json">{REMEDIATION_POLICY}</pre>
                <button
                  type="button"
                  onClick={() => copyToClipboard(REMEDIATION_POLICY)}
                  className="free-scan-copy"
                  style={{ marginTop: 10 }}
                >
                  Copy policy JSON
                </button>
                <p style={{ marginTop: 16 }}>
                  After creating the role, copy the ARN. Add it to the form below as{" "}
                  <strong>Remediation Role ARN (optional)</strong>.
                </p>
                <div className="free-scan-callout">
                  <strong style={{ color: "var(--text-primary)" }}>Important</strong>
                  <ul style={{ margin: "10px 0 0", paddingLeft: 20 }}>
                    <li>XSEE never executes fixes automatically.</li>
                    <li>Every fix requires your explicit approval.</li>
                    <li>You can revoke access at any time by deleting the IAM role in your AWS console.</li>
                    <li>Full audit log of every action applied.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section sec-navy free-scan-form-section">
          <div className="container">
            <div className="form-box free-scan-form-box">
              <h3 className="form-title">Request your free scan</h3>
              {status === "success" ? (
                <p className="free-scan-success">
                  ✓ Scan request received. Check your email for confirmation. We&apos;ll reach out within one
                  business day to schedule your scan.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="form-fields">
                  <div className="honeypot" aria-hidden="true">
                    <label htmlFor="freescan-website">Website</label>
                    <input
                      id="freescan-website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full name (required)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Alex Johnson"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Work email (required)</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company name (required)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">AWS Role ARN (required)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="arn:aws:iam::123456789012:role/xsee-free-scan-role"
                      value={formData.awsRoleArn}
                      onChange={(e) => setFormData({ ...formData, awsRoleArn: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Remediation Role ARN (optional)</label>
                    <input
                      type="text"
                      name="remediation_role_arn"
                      className="form-input"
                      placeholder="arn:aws:iam::YOUR_ACCOUNT_ID:role/xsee-remediation-role"
                      value={formData.remediation_role_arn}
                      onChange={(e) =>
                        setFormData({ ...formData, remediation_role_arn: e.target.value })
                      }
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">AWS Region</label>
                    <select
                      className="form-select"
                      value={formData.awsRegion}
                      onChange={(e) => setFormData({ ...formData, awsRegion: e.target.value })}
                    >
                      {AWS_REGIONS.map((r) => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </div>
                  {status === "error" && error && (
                    <p className="text-sm" style={{ color: "var(--red)" }}>{error}</p>
                  )}
                  <button type="submit" disabled={status === "loading"} className="btn btn-primary btn-lg free-scan-submit">
                    {status === "loading" ? "Queuing scan..." : "Run Free Scan →"}
                  </button>
                  <p className="mt-4 text-center text-xs text-white/30">
                    Joined 40+ security teams who&apos;ve proven their breach risk this month.
                  </p>
                  <p className="free-scan-note">
                    Read-only access only · No agents · We never store your credentials · Report delivered by email
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
        <Footer />
        </div>
      </main>
    </>
  );
}
