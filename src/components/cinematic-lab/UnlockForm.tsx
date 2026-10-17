"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function UnlockForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const key = new FormData(event.currentTarget).get("key");
    const response = await fetch("/api/cinematic-lab/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    setBusy(false);
    if (response.ok) return router.refresh();
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    setError(body?.error ?? "Could not unlock the lab.");
  }

  return (
    <form className="lab-unlock" onSubmit={submit}>
      <p className="lab-eyebrow">Internal</p>
      <h1 className="lab-h1">Cinematic Lab</h1>
      <label className="lab-field" htmlFor="lab-key">
        Lab key
        <input id="lab-key" name="key" type="password" className="lab-input" autoComplete="current-password" required />
      </label>
      {error ? (
        <p className="lab-notice" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="lab-btn lab-btn--primary" disabled={busy}>
        {busy ? "Checking…" : "Unlock"}
      </button>
    </form>
  );
}
