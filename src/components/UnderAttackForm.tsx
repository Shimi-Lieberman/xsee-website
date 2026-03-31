"use client";

import { useState } from "react";
import Link from "next/link";

export default function UnderAttackForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
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
    setErrorMessage("");
    try {
      const res = await fetch("/api/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: form.website,
          work_email: form.email,
          full_name: form.name,
          company: form.company,
          message: form.situation,
          phone: form.phone,
        }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok) {
        throw new Error("Submission failed");
      }
      if (data.success) {
        setStatus("success");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again or email hello@xsee.io directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="ua-success-card mx-auto max-w-lg" role="status">
        <p className="ua-success-title">✓ We&apos;ve been alerted.</p>
        <p className="ua-success-body">
          Expect contact within the hour. For immediate assistance:{" "}
          <a href="mailto:hello@xsee.io" className="text-sky-400 underline">
            hello@xsee.io
          </a>
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
        placeholder="Name (optional)"
        value={form.name}
        onChange={(ev) => setForm({ ...form, name: ev.target.value })}
        disabled={status === "loading"}
      />
      <input
        type="email"
        name="email"
        className="ua-input"
        placeholder="Work email (required)"
        required
        value={form.email}
        onChange={(ev) => setForm({ ...form, email: ev.target.value })}
        disabled={status === "loading"}
      />
      <input
        type="text"
        name="company"
        className="ua-input"
        placeholder="Company (optional)"
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
        placeholder="Brief description (optional)"
        rows={5}
        value={form.situation}
        onChange={(ev) => setForm({ ...form, situation: ev.target.value })}
        disabled={status === "loading"}
      />
      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}
      <button type="submit" className="ua-submit-btn ua-submit-btn--emergency" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : "Request Emergency Scan →"}
      </button>
    </form>
  );
}
