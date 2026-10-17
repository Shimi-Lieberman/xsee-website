"use client";

import { useState } from "react";
import {
  composePrompt,
  estimateCredits,
  formatUsd,
  MODELS,
  previousShot,
  type ModelId,
  type Shot,
} from "@/lib/cinematic/shots";
import type { LabSnapshot } from "@/lib/cinematic/types";
import { labFetch } from "./api";
import { TakeCard } from "./TakeCard";

type Props = { shot: Shot; snapshot: LabSnapshot | undefined; onChange: () => void };

export function ShotCard({ shot, snapshot, onChange }: Props) {
  const [model, setModel] = useState<ModelId>("gen4.5");
  const [duration, setDuration] = useState(MODELS["gen4.5"].defaultDuration);
  const [chain, setChain] = useState(shot.index > 0);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const spec = MODELS[model];
  const credits = estimateCredits(model, duration);
  const prior = previousShot(shot);
  const takes = snapshot?.takes.filter((take) => take.shotId === shot.id) ?? [];
  const priorApproved = prior
    ? snapshot?.takes.find((take) => take.shotId === prior.id && take.approved && take.lastFrameUrl)
    : undefined;
  const chainActive = chain && Boolean(priorApproved);
  const runway = snapshot?.status.runway;
  const balance = runway?.state === "ready" ? runway.creditBalance : null;
  const blocked = runway?.state !== "ready" || !snapshot?.status.blob;
  const short = balance !== null && balance < credits;

  function pickModel(next: ModelId) {
    setModel(next);
    setDuration(MODELS[next].defaultDuration);
    setConfirming(false);
  }

  async function generate() {
    setBusy(true);
    setError(null);
    try {
      await labFetch("/api/cinematic-lab/takes", {
        method: "POST",
        body: JSON.stringify({ shotId: shot.id, model, duration, chain: chainActive, approvedCredits: credits }),
      });
      setConfirming(false);
      onChange();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Generation failed to start.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="lab-card" aria-labelledby={`shot-${shot.id}`}>
      <div className="lab-shot-head">
        <span className="lab-meta">
          Shot {shot.index + 1} · {shot.window}
        </span>
        <h3 id={`shot-${shot.id}`} className="lab-h2">
          {shot.title}
        </h3>
        <span className="lab-muted">
          {shot.camera}. {shot.mood}.
        </span>
      </div>

      <details>
        <summary className="lab-meta">Full prompt sent to {spec.label}</summary>
        <p className="lab-prompt">{composePrompt(shot, model).promptText}</p>
      </details>

      <div className="lab-controls">
        <label className="lab-field">
          Model
          <select value={model} onChange={(event) => pickModel(event.target.value as ModelId)}>
            {Object.values(MODELS).map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
                {option.recommended ? " (recommended)" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="lab-field">
          Duration
          <select
            value={duration}
            onChange={(event) => {
              setDuration(Number(event.target.value));
              setConfirming(false);
            }}
          >
            {spec.durations.map((seconds) => (
              <option key={seconds} value={seconds}>
                {seconds} seconds
              </option>
            ))}
          </select>
        </label>
        {prior ? (
          <label className="lab-check">
            <input
              type="checkbox"
              checked={chain}
              onChange={(event) => {
                setChain(event.target.checked);
                setConfirming(false);
              }}
            />
            <span>
              Start on the last frame of “{prior.title}”
              <small>
                {priorApproved
                  ? "Joined with a straight cut in the film."
                  : "Approve a take of the previous shot first. Until then this generates from text and joins with a dissolve."}
              </small>
            </span>
          </label>
        ) : null}
      </div>

      <div className="lab-cost">
        <p className="lab-cost-figure">
          <strong>{formatUsd(credits)}</strong> · {credits} credits ({spec.creditsPerSecond}/s × {duration}s)
          {balance !== null ? ` · balance ${balance}` : ""}
        </p>
        {error ? (
          <p className="lab-notice" role="alert">
            {error}
          </p>
        ) : null}
        <div className="lab-actions">
          {confirming ? (
            <>
              <button type="button" className="lab-btn lab-btn--primary" onClick={generate} disabled={busy || short}>
                {busy ? "Submitting…" : `Approve ${formatUsd(credits)} and generate`}
              </button>
              <button type="button" className="lab-btn" onClick={() => setConfirming(false)} disabled={busy}>
                Cancel
              </button>
            </>
          ) : (
            <button type="button" className="lab-btn" onClick={() => setConfirming(true)} disabled={blocked || short}>
              {short ? "Not enough credits" : "Review cost to generate"}
            </button>
          )}
        </div>
      </div>

      {takes.length ? (
        <div className="lab-takes">
          {takes.map((take) => (
            <TakeCard key={take.id} take={take} onChange={onChange} />
          ))}
        </div>
      ) : (
        <p className="lab-muted">No takes yet.</p>
      )}
    </article>
  );
}
