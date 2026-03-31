"use client";

import { useState } from "react";

export default function FooterMiniContact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: honeypot,
          name,
          email,
          message,
          source: "footer",
        }),
      });
      const data = (await res.json()) as { error?: string; success?: boolean };
      if (!res.ok) {
        throw new Error(data.error ?? "Submission failed");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email hello@xsee.io directly."
      );
    }
  }

  if (status === "success") {
    return (
      <p className="mb-4 text-sm text-white/70" role="status">
        ✓ Request received. We&apos;ll be in touch within one business day.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3">
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none" }}
        aria-hidden
      />
      <input
        type="text"
        name="name"
        className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={status === "loading"}
      />
      <input
        type="email"
        name="email"
        className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40"
        placeholder="Work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
      />
      <textarea
        name="message"
        rows={3}
        className="w-full resize rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        disabled={status === "loading"}
      />
      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}
      <button
        type="submit"
        className="w-full rounded border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
