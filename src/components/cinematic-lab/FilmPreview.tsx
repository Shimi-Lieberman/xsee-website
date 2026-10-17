"use client";

import { useState } from "react";
import { SHOTS } from "@/lib/cinematic/shots";
import type { LabSnapshot } from "@/lib/cinematic/types";
import { labFetch } from "./api";
import { FilmPlayer } from "./FilmPlayer";

type Props = { snapshot: LabSnapshot | undefined; onChange: () => void };

export function FilmPreview({ snapshot, onChange }: Props) {
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const film = snapshot?.film ?? null;
  const approvedCount = SHOTS.filter((shot) =>
    snapshot?.takes.some((take) => take.shotId === shot.id && take.approved),
  ).length;
  const ready = approvedCount === SHOTS.length && Boolean(snapshot?.status.ffmpeg);
  const shot = SHOTS[active];

  async function assemble() {
    setBusy(true);
    setError(null);
    try {
      await labFetch("/api/cinematic-lab/film", { method: "POST" });
      onChange();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Assembly failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="lab-section lab-film" aria-labelledby="lab-film">
      <div className="lab-shot-head">
        <h2 id="lab-film" className="lab-h2">
          Film preview
        </h2>
        <p className="lab-muted">
          {film
            ? `${film.duration.toFixed(1)}s · joins: ${film.joins.join(", ")} · assembled ${new Date(film.createdAt).toLocaleString()}`
            : `Approve one take per shot (${approvedCount} of ${SHOTS.length}), then assemble. Assembly is free.`}
        </p>
      </div>

      {film ? (
        <FilmPlayer key={film.url} film={film} />
      ) : (
        <>
          <div className="lab-panel">
            <span className="lab-meta">
              {shot.window} · {shot.panelTitle}
            </span>
            <p className="lab-panel-title">{shot.panelBody}</p>
            <ul className="lab-facts">
              {shot.facts.map((fact) => (
                <li key={fact.label}>
                  <strong>{fact.label}:</strong> {fact.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="lab-actions" role="group" aria-label="Preview shot information">
            {SHOTS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === active ? "lab-btn lab-btn--primary" : "lab-btn"}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              >
                {item.index + 1}. {item.title}
              </button>
            ))}
          </div>
        </>
      )}

      {error ? (
        <p className="lab-notice" role="alert">
          {error}
        </p>
      ) : null}
      <div className="lab-actions">
        <button type="button" className="lab-btn lab-btn--primary" onClick={assemble} disabled={!ready || busy}>
          {busy ? "Assembling…" : film ? "Re-assemble film" : "Assemble film"}
        </button>
      </div>
    </section>
  );
}
