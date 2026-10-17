"use client";

import useSWR from "swr";
import { CHAPTERS, FILM_SECONDS, FILM_TITLE, SHOTS } from "@/lib/cinematic/shots";
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
          <p className="lab-eyebrow">Cinematic Lab · Experience V5</p>
          <h1 className="lab-h1">{FILM_TITLE}</h1>
          <p className="lab-lede">
            The {Math.round(FILM_SECONDS)}-second film in {SHOTS.length} chained shots and a closing card. Generate takes per
            shot, approve one each, then assemble. Every paid generation shows its cost and waits for your approval.
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
          <p className="lab-muted">Five chapters, one production bible, one continuous chain of frames.</p>
          <ol className="lab-chapters">
            {CHAPTERS.map((chapter) => (
              <li key={chapter.index} className="lab-chapter">
                <span className="lab-meta">
                  {chapter.window} · {chapter.shotIds.length} {chapter.shotIds.length === 1 ? "shot" : "shots"}
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
