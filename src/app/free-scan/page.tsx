"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import Nav from "@/components/Nav";
import { Analytics } from "@/lib/analytics";
import TrustModel from "@/components/TrustModel";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";

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
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const formStartedRef = useRef(false);

  useEffect(() => {
    Analytics.freeScanViewed();
  }, []);

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
          full_name: formData.fullName,
          work_email: formData.email,
          company: formData.company,
          website: formData.website,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        Analytics.formSubmitted("free_scan");
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
      <main className="page-container-sm min-w-0 block">
        <div className="free-scan-page w-full min-w-0">
        <section className="section sec-navy free-scan-hero">
          <div className="container">
            <div className="free-scan-hero-inner">
              <span className="section-eyebrow mb-3 block text-center">Request Demo</span>
              <h1 className="display-lg">Get your free Risk Assessment.</h1>
              <p className="free-scan-sub">
                We connect to your AWS account with read-only IAM access, run a full attack graph analysis using 1,000+ attack patterns, and show you the exact paths that reach your crown-jewel assets. You keep the validated report — no commitment required.
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
                  {
                    title: "Live environment analysis",
                    body: "We run live analysis on your actual AWS environment using our full attack pattern library — not a staged walkthrough.",
                  },
                  {
                    title: "Zero-touch access",
                    body: "Read-only IAM role — no agents, no code deployment, nothing installed. Works in under 2 minutes.",
                  },
                  {
                    title: "Full report delivered",
                    body: "Validated attack graph + ranked exposures + fix recommendations + evidence packages. Yours, no strings.",
                  },
                ].map(({ title, body }) => (
                  <div key={title} className="text-center">
                    <div className="text-lg font-bold text-white">{title}</div>
                    <div className="mt-2 text-xs text-white/40 leading-relaxed">{body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TrustModel variant="compact" />

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
                <h3>Request your scan</h3>
                <p>
                  Submit the form below with your work details. We&apos;ll email you secure onboarding steps and can
                  collect your Role ARN when you&apos;re ready.
                </p>
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
                  After creating the role, copy the ARN. Reply to your onboarding email with it as{" "}
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
              <h3 className="form-title">Request Your Free Risk Assessment</h3>
              {status === "success" ? (
                <p className="free-scan-success">
                  ✓ Scan request received. Check your email for confirmation. We&apos;ll reach out within one
                  business day to schedule your scan.
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="form-fields"
                  onFocusCapture={() => {
                    if (!formStartedRef.current) {
                      formStartedRef.current = true;
                      Analytics.formStarted("free_scan");
                    }
                  }}
                >
                  <p className="text-sm text-white/50 text-center mb-6">We&apos;ll reach out within one business day to schedule the scan.</p>
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
                  <div className="form-group">
                    <label className="form-label">Name</label>
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
                    <label className="form-label">Work email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                  {status === "error" && error && (
                    <p className="text-sm" style={{ color: "var(--red)" }}>{error}</p>
                  )}
                  <button type="submit" disabled={status === "loading"} className="btn btn-primary btn-lg btn-shimmer free-scan-submit">
                    <span className="relative z-[2]">
                      {status === "loading" ? "Submitting..." : "Run Free Scan →"}
                    </span>
                  </button>
                  <div
                    className="mt-3 flex items-start justify-center gap-2 text-center"
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}
                  >
                    <ShieldCheck size={12} color="#4ade80" className="mt-0.5 shrink-0" aria-hidden />
                    <span>Only 2 permissions required. You can revoke access in 10 seconds.</span>
                  </div>
                  <p className="free-scan-note mt-4">
                    No commitment · Read-only IAM · Report delivered in 30 min
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
