"use client";

import useSWR from "swr";
import { FILM_CHAPTERS } from "@/lib/cinematic/bible";
import { FILM_TITLE, SHOTS } from "@/lib/cinematic/shots";
import { isActive, type LabSnapshot } from "@/lib/cinematic/types";
import { LAB_KEY, labFetch } from "./api";
import { BibleView } from "./BibleView";
import { FilmPreview } from "./FilmPreview";
import { ShotCard } from "./ShotCard";
import { StatusBar } from "./StatusBar";

export function LabClient() {
  const { data, error, mutate } = useSWR<LabSnapshot>(LAB_KEY, labFetch, {
    refreshInterval: (latest) => (latest?.takes.some((take) => isActive(take.status)) ? 5000 : 0),
    revalidateOnFocus: true,
  });

  return (
    <main className="lab">
      <div className="lab-wrap">
        <header className="lab-head">
          <p className="lab-eyebrow">Cinematic Lab · Phase 1</p>
          <h1 className="lab-h1">{FILM_TITLE}</h1>
          <p className="lab-lede">
            A 15-second proof of concept and the opening of the 75-second film. Generate takes per shot, approve one each,
            then assemble. Every paid generation shows its cost and waits for your approval.
          </p>
        </header>

        <StatusBar status={data?.status} error={error instanceof Error ? error.message : null} />

        <BibleView />

        <section className="lab-section" aria-labelledby="lab-shots">
          <h2 id="lab-shots" className="lab-h2">
            Shots
          </h2>
          {SHOTS.map((shot) => (
            <ShotCard key={shot.id} shot={shot} snapshot={data} onChange={() => mutate()} />
          ))}
        </section>

        <FilmPreview snapshot={data} onChange={() => mutate()} />

        <section className="lab-section" aria-labelledby="lab-roadmap">
          <h2 id="lab-roadmap" className="lab-h2">
            The 75-second film
          </h2>
          <p className="lab-muted">This prototype is chapter one. The other four chapters reuse the same bible.</p>
          <ol className="lab-chapters">
            {FILM_CHAPTERS.map((chapter) => (
              <li key={chapter.index} className="lab-chapter" data-status={chapter.status}>
                <span className="lab-meta">
                  {chapter.window} · {chapter.status === "prototype" ? "This prototype" : "Planned"}
                </span>
                <strong>{chapter.title}</strong>
                <span className="lab-muted">{chapter.story}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
