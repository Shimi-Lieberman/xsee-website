"use client";

import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AnnouncementBar() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email is required");
      setStatus("error");
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setError("Invalid email format");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setError(data.error ?? "Something went wrong");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="announcement-bar">
        <div className="ann-inner">
          <span className="ann-badge-warm">New</span>
          <span className="ann-text">You&apos;re on the list. We&apos;ll be in touch soon.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="announcement-bar">
      <form onSubmit={handleSubmit} className="ann-inner ann-form">
        <span className="ann-badge-warm">New</span>
        <span className="ann-text">
          XSEE is now in early access — the first platform that proves which exposures actually lead to a breach.
        </span>
        <div className="ann-waitlist">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="ann-input"
          />
          <button type="submit" disabled={status === "loading"} className="ann-link ann-btn">
            {status === "loading" ? "Joining..." : "Request access →"}
          </button>
        </div>
        {status === "error" && error && (
          <span className="ann-err">{error}</span>
        )}
      </form>
    </div>
  );
}
