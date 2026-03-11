"use client";

import { useState } from "react";
import Link from "next/link";

const CARDS = [
  {
    icon: (
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
        <path d="M9 2L3 9h5l-1 5 6-7H8L9 2Z" stroke="#3B82F6" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" fill="rgba(59,130,246,0.1)" />
      </svg>
    ),
    title: "30-minute live demo",
    desc: "Real scan on your environment, not a pre-recorded walkthrough.",
  },
  {
    icon: (
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
        <rect x={3} y={7.5} width={10} height={7} rx={1.5} stroke="#3B82F6" strokeWidth={1.3} />
        <path d="M5.5 7.5V5a2.5 2.5 0 015 0v2.5" stroke="#3B82F6" strokeWidth={1.3} strokeLinecap="round" />
        <circle cx={8} cy={11} r={1} fill="#3B82F6" />
      </svg>
    ),
    title: "Read-only IAM access",
    desc: "Zero changes to your infrastructure. Fully auditable permissions.",
  },
  {
    icon: (
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
        <rect x={2.5} y={2.5} width={11} height={11} rx={1.5} stroke="#3B82F6" strokeWidth={1.3} />
        <line x1={5} y1={5.5} x2={11} y2={5.5} stroke="#3B82F6" strokeWidth={1.2} strokeLinecap="round" />
        <line x1={5} y1={8} x2={11} y2={8} stroke="#3B82F6" strokeWidth={1.2} strokeLinecap="round" />
        <line x1={5} y1={10.5} x2={8.5} y2={10.5} stroke="#3B82F6" strokeWidth={1.2} strokeLinecap="round" />
      </svg>
    ),
    title: "Full report delivered",
    desc: "You keep the attack path report regardless of next steps.",
  },
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    cloudProvider: "",
    assetCount: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ fullName: "", email: "", company: "", cloudProvider: "", assetCount: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="section section-alt" id="contact">
        <div className="container">
          <div className="reveal mx-auto max-w-xl text-center">
            <h2 className="display-lg mb-4">Thanks!</h2>
            <p className="mb-6">We&apos;ll be in touch within 24 hours.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="btn btn-secondary"
            >
              Submit another request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="reveal-left">
            <span className="badge badge-blue badge-dot eyebrow block mb-5">
              Request Demo
            </span>
            <h2 className="display-lg mb-3.5">
              See XSEE on your
              <br />
              own environment.
            </h2>
            <p className="mb-8">
              We&apos;ll connect your AWS account, run a live scan, and walk you
              through every discovered attack path — in 30 minutes. You keep the
              full report regardless of next steps.
            </p>
            <div className="contact-points">
              {CARDS.map((c) => (
                <div key={c.title} className="c-point">
                  <div className="c-ico">{c.icon}</div>
                  <div>
                    <div className="c-ttl">{c.title}</div>
                    <div className="c-dsc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right">
            <div className="form-box">
              <h3 className="form-title">Request a Demo</h3>
              <p className="form-sub">We&apos;ll respond within one business day.</p>
              <form onSubmit={handleSubmit} className="form-fields">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Alex Johnson"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Work Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Cloud Provider</label>
                    <select
                      className="form-select"
                      value={formData.cloudProvider}
                      onChange={(e) =>
                        setFormData({ ...formData, cloudProvider: e.target.value })
                      }
                      required
                    >
                      <option value="">Select...</option>
                      <option value="AWS">AWS</option>
                      <option value="Azure">Azure</option>
                      <option value="GCP">GCP</option>
                      <option value="Multi-cloud">Multi-cloud</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cloud Assets</label>
                    <select
                      className="form-select"
                      value={formData.assetCount}
                      onChange={(e) =>
                        setFormData({ ...formData, assetCount: e.target.value })
                      }
                      required
                    >
                      <option value="">Select...</option>
                      <option value="1-100">1–100</option>
                      <option value="100-500">100–500</option>
                      <option value="500-1000">500–1,000</option>
                      <option value="1000+">1,000+</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message (optional)</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Tell us about your current stack or what you're looking to solve..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
                {status === "error" && (
                  <p className="text-sm text-[var(--red)]">
                    Something went wrong. Please try again or email demo@xsee.io
                    directly.
                  </p>
                )}
                <div className="form-submit flex flex-col gap-2.5 mt-1">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn btn-primary btn-lg"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {status === "loading" ? "Sending..." : "Request Demo →"}
                  </button>
                  <p
                    className="text-center font-[var(--font-mono)] text-[10px] text-[var(--text-muted)] tracking-wider"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    No commitment · Response within 24 hours · Read-only AWS access
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
