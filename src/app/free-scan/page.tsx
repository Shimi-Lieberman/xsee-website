"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import Nav from "@/components/Nav";
import { Analytics } from "@/lib/analytics";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";

const TRUST_ACCOUNT_ID = "722375386510";

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
              <span className="section-eyebrow mb-3 block text-center">Free attack-path assessment</span>
              <h1 className="display-lg">Request your free attack-path assessment.</h1>
              <p className="free-scan-sub">
                Connect a read-only IAM role. Our team runs the assessment on your account and sends you the ranked report.
              </p>
              <div className="hero-proof-strip" style={{ marginTop: 24 }}>
                <div className="hps-item">
                  <div className="hps-dot" style={{ background: "var(--green)" }} />
                  Read-only IAM boundary
                </div>
                <div className="hps-item">
                  <div className="hps-dot" style={{ background: "var(--sky)" }} />
                  No agents
                </div>
              </div>
              <div className="my-8 grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-3">
                {[
                  {
                    title: "Read-only IAM",
                    body: "Connect an IAM role with read-only permissions, under your control.",
                  },
                  {
                    title: "No agents",
                    body: "Nothing to install or deploy in your AWS account.",
                  },
                  {
                    title: "Ranked report",
                    body: "Our team sends your ranked assessment findings.",
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

        <section className="section sec-navy free-scan-steps">
          <div className="container">
            <h2 className="free-scan-section-title">How to connect your AWS account</h2>

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

            <div className="free-scan-callout" style={{ marginTop: 32 }}>
              <strong style={{ color: "var(--text-primary)" }}>About ReadOnlyAccess</strong>
              <ul style={{ margin: "10px 0 0", paddingLeft: 20 }}>
                <li>The AWS-managed ReadOnlyAccess policy grants no write actions.</li>
                <li>
                  It does include some data-read permissions (for example, reading S3 objects). If you need a narrower
                  scope, ask us about a custom policy before you create the role.
                </li>
                <li>XSEE does not apply changes in your account. Your team decides on and applies any fix.</li>
                <li>You can revoke access at any time by deleting the role.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section sec-navy free-scan-form-section">
          <div className="container">
            <div className="form-box free-scan-form-box">
              <h3 className="form-title">Request Your Free Risk Assessment</h3>
              {status === "success" ? (
                <p className="free-scan-success">
                  Request received. We&apos;ll contact you to schedule the assessment.
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
                  <p className="text-sm text-white/50 text-center mb-6">We&apos;ll contact you to schedule the assessment.</p>
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
                      {status === "loading" ? "Submitting..." : "Request an assessment"}
                    </span>
                  </button>
                  <div
                    className="mt-3 flex items-start justify-center gap-2 text-center"
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}
                  >
                    <ShieldCheck size={12} color="#4ade80" className="mt-0.5 shrink-0" aria-hidden />
                    <span>You create the role. You can revoke access by deleting it.</span>
                  </div>
                  <p className="free-scan-note mt-4">
                    No commitment · Read-only IAM
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
