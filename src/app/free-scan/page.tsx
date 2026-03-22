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

export default function FreeScanPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    awsRoleArn: "",
    awsRegion: "us-east-1",
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
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <div className="free-scan-page">
        <section className="section sec-navy free-scan-hero">
          <div className="container">
            <div className="free-scan-hero-inner">
              <h1 className="display-lg">Get your free Breach Proof Report</h1>
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
          </div>
        </section>

        <section className="section sec-navy free-scan-form-section">
          <div className="container">
            <div className="form-box free-scan-form-box">
              <h3 className="form-title">Request your free scan</h3>
              {status === "success" ? (
                <p className="free-scan-success">
                  Your scan is queued — you&apos;ll receive your Breach Proof Report at{" "}
                  <strong>{formData.email}</strong> within 30 minutes.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="form-fields">
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
