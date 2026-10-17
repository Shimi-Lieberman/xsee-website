"use client";

import { useState } from "react";
import { formatUsd, MODELS } from "@/lib/cinematic/shots";
import { isActive, type Take } from "@/lib/cinematic/types";
import { labFetch } from "./api";

type Props = { take: Take; onChange: () => void };

const STATUS_LABEL: Record<Take["status"], string> = {
  pending: "Queued",
  throttled: "Waiting for a slot",
  running: "Generating",
  saving: "Saving",
  succeeded: "Ready",
  failed: "Failed",
  cancelled: "Cancelled",
};

export function TakeCard({ take, onChange }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const active = isActive(take.status);
  const tone = take.status === "succeeded" ? "good" : take.status === "failed" ? "bad" : undefined;

  async function act(init: RequestInit) {
    setBusy(true);
    setError(null);
    try {
      await labFetch(`/api/cinematic-lab/takes/${take.id}`, init);
      onChange();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "That did not work.");
    } finally {
      setBusy(false);
    }
  }

  function remove() {
    const message = active
      ? "Cancel this generation and delete it? Runway may still bill credits already used."
      : "Delete this take and its video?";
    if (window.confirm(message)) act({ method: "DELETE" });
  }

  return (
    <div className="lab-take" data-approved={take.approved}>
      {take.videoUrl ? (
        <video src={take.videoUrl} controls muted playsInline preload="metadata" />
      ) : null}
      <div className="lab-take-row">
        <span className="lab-badge" data-tone={tone}>
          {take.approved ? "Approved · " : ""}
          {STATUS_LABEL[take.status]}
          {take.status === "running" && take.progress !== null ? ` ${Math.round(take.progress * 100)}%` : ""}
        </span>
        <span className="lab-meta">
          {MODELS[take.model].label} · {take.duration}s · {formatUsd(take.credits)}
          {take.chainedFromTakeId ? " · chained" : ""}
        </span>
      </div>
      {active ? (
        <div className="lab-progress" aria-hidden="true">
          <span style={{ width: `${Math.max(6, Math.round((take.progress ?? 0) * 100))}%` }} />
        </div>
      ) : null}
      {take.error || error ? (
        <p className="lab-muted" role={error ? "alert" : undefined}>
          {error ?? take.error}
        </p>
      ) : null}
      <div className="lab-actions">
        {take.status === "succeeded" ? (
          <button
            type="button"
            className={take.approved ? "lab-btn" : "lab-btn lab-btn--primary"}
            onClick={() => act({ method: "PATCH", body: JSON.stringify({ approved: !take.approved }) })}
            disabled={busy}
          >
            {take.approved ? "Unapprove" : "Approve for film"}
          </button>
        ) : null}
        <button type="button" className="lab-btn" onClick={remove} disabled={busy}>
          {active ? "Cancel" : "Delete"}
        </button>
      </div>
    </div>
  );
}
