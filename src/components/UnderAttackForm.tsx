"use client";

import { useState } from "react";
import Link from "next/link";

function buildMailto(body: Record<string, string>) {
  const q = new URLSearchParams({
    subject: "Emergency response — XSEE",
    body: Object.entries(body)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n"),
  });
  return `mailto:admin@xsee.io?${q.toString()}`;
}

export default function UnderAttackForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    situation: "",
    website: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const message = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "(not provided)"}`,
      "",
      "Describe what you're seeing:",
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
          emergency: true,
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
      Name: form.name,
      Email: form.email,
      Phone: form.phone,
      Situation: form.situation,
    });
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="ua-success-card mx-auto max-w-lg" role="status">
        <p className="ua-success-title">Request received</p>
        <p className="ua-success-body">
          We&apos;ve received your request. Our team will contact you as soon as possible.
        </p>
        <Link href="/" className="btn btn-secondary ua-success-home">
          Return to homepage
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="ua-form-card ua-form-card--emergency mx-auto max-w-lg">
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
        placeholder="Name"
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
      <button type="submit" className="ua-submit-btn ua-submit-btn--emergency" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : "Request Emergency Response →"}
      </button>
    </form>
  );
}
