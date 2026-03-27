"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import GlobalScripts from "@/components/GlobalScripts";
import { Lock, Server, Shield } from "lucide-react";

function buildMailto(body: Record<string, string>) {
  const q = new URLSearchParams({
    subject: "Emergency response — XSEE",
    body: Object.entries(body)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n"),
  });
  return `mailto:admin@xsee.io?${q.toString()}`;
}

export default function UnderAttackPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    situation: "",
    website: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const message = [
      "UNDER ATTACK — emergency request",
      `Company: ${form.company}`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "(not provided)"}`,
      "",
      "What they're seeing:",
      form.situation,
    ].join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message,
          website: form.website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
        return;
      }
    } catch {
      /* fall through to mailto */
    }

    window.location.href = buildMailto({
      Company: form.company,
      Name: form.name,
      Email: form.email,
      Phone: form.phone,
      Situation: form.situation,
    });
    setStatus("idle");
  }

  return (
    <div className="ua-page">
      <ScrollProgressBar />
      <GlobalScripts />
      <div className="ua-banner">
        Emergency response available — average response time: 4 hours
      </div>
      <Nav />

      <main className="ua-main">
        <div className="container">
          <div className="ua-hero">
            <span className="ua-hero-badge">Experiencing an incident?</span>
            <h1 className="ua-hero-title">Get immediate attack path validation</h1>
            <p className="ua-hero-sub">
              We run a read-only scan of your AWS environment and identify which exposures are actively exploitable.
              Evidence package delivered within hours.
            </p>
          </div>

          {status === "success" ? (
            <div className="ua-success-card" role="status">
              <p className="ua-success-title">Request received</p>
              <p className="ua-success-body">
                We've received your request. Our team will contact you within 2 hours.
              </p>
              <Link href="/" className="btn btn-secondary ua-success-home">
                Return to homepage
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ua-form-card">
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="ua-website">Website</label>
                <input
                  id="ua-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(ev) => setForm({ ...form, website: ev.target.value })}
                />
              </div>
              <input
                type="text"
                name="name"
                className="ua-input"
                placeholder="Full name"
                required
                value={form.name}
                onChange={(ev) => setForm({ ...form, name: ev.target.value })}
                disabled={status === "loading"}
              />
              <input
                type="email"
                name="email"
                className="ua-input"
                placeholder="Work email"
                required
                value={form.email}
                onChange={(ev) => setForm({ ...form, email: ev.target.value })}
                disabled={status === "loading"}
              />
              <input
                type="text"
                name="company"
                className="ua-input"
                placeholder="Company"
                required
                value={form.company}
                onChange={(ev) => setForm({ ...form, company: ev.target.value })}
                disabled={status === "loading"}
              />
              <input
                type="tel"
                name="phone"
                className="ua-input"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(ev) => setForm({ ...form, phone: ev.target.value })}
                disabled={status === "loading"}
              />
              <textarea
                name="situation"
                className="ua-input ua-textarea"
                placeholder="Describe what you're seeing"
                rows={5}
                required
                value={form.situation}
                onChange={(ev) => setForm({ ...form, situation: ev.target.value })}
                disabled={status === "loading"}
              />
              <button type="submit" className="ua-submit-btn" disabled={status === "loading"}>
                {status === "loading" ? "Submitting…" : "Request emergency response →"}
              </button>
            </form>
          )}

          <section className="ua-next-section" aria-labelledby="ua-next-title">
            <h2 id="ua-next-title" className="ua-section-title">
              What happens next
            </h2>
            <div className="ua-steps-grid">
              <div className="ua-step-card">
                <div className="ua-step-icon" style={{ background: "rgba(239,68,68,0.2)", color: "#FCA5A5" }}>
                  1
                </div>
                <div className="ua-step-name">Connect</div>
                <p className="ua-step-desc">Secure read-only AWS access — you control scope and duration.</p>
              </div>
              <div className="ua-step-card">
                <div className="ua-step-icon" style={{ background: "rgba(249,115,22,0.2)", color: "#FDBA74" }}>
                  2
                </div>
                <div className="ua-step-name">Validate</div>
                <p className="ua-step-desc">We map and L2-validate attack paths with evidence per hop.</p>
              </div>
              <div className="ua-step-card">
                <div className="ua-step-icon" style={{ background: "rgba(255, 27, 141, 0.2)", color: "#FDA4D0" }}>
                  3
                </div>
                <div className="ua-step-name">Deliver</div>
                <p className="ua-step-desc">Ranked paths, blast radius, and remediation guidance — fast.</p>
              </div>
            </div>
          </section>

          <section className="ua-trust-section" aria-label="Trust signals">
            <div className="ua-trust-grid">
              <div className="ua-trust-item">
                <Lock className="ua-trust-ico" aria-hidden />
                <span>Read-only IAM — no write access to your environment</span>
              </div>
              <div className="ua-trust-item">
                <Server className="ua-trust-ico" aria-hidden />
                <span>No agents or code deployed in your accounts</span>
              </div>
              <div className="ua-trust-item">
                <Shield className="ua-trust-ico" aria-hidden />
                <span>Evidence suitable for leadership and audit timelines</span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
