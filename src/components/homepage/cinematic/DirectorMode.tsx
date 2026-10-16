"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { Pause, Play, RotateCcw, SkipForward, X } from "lucide-react";
import "./director.css";

export const DIRECTOR_SECONDS = 75;
const DURATION_MS = DIRECTOR_SECONDS * 1000;
const ACT_COUNT = 5;
const INTERRUPT_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);

export type DirectorStatus = "idle" | "playing" | "paused" | "done";

function geometry(track: HTMLElement) {
  const top = track.getBoundingClientRect().top + window.scrollY;
  const span = Math.max(1, track.offsetHeight - window.innerHeight);
  return { top, span };
}

function scrollProgress(track: HTMLElement) {
  const { top, span } = geometry(track);
  return Math.min(1, Math.max(0, (window.scrollY - top) / span));
}

function scrollToProgress(track: HTMLElement, p: number) {
  const { top, span } = geometry(track);
  // The page uses smooth scroll-behavior; each frame must land instantly or the camera lags behind the clock.
  window.scrollTo({ top: top + span * p, behavior: "instant" as ScrollBehavior });
}

export function useDirector(trackRef: RefObject<HTMLDivElement | null>, inView: boolean) {
  const [status, setStatus] = useState<DirectorStatus>("idle");
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  const commit = useCallback((p: number) => {
    progressRef.current = p;
    setProgress((prev) => (Math.abs(prev - p) < 0.002 && p < 1 ? prev : p));
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      const next = Math.min(1, progressRef.current + dt / DURATION_MS);
      scrollToProgress(track, next);
      commit(next);
      if (next >= 1) {
        setStatus("done");
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const interrupt = () => setStatus("paused");
    const onKey = (e: KeyboardEvent) => {
      if (INTERRUPT_KEYS.has(e.key) && !(e.target as HTMLElement | null)?.closest?.(".dm-bar")) interrupt();
    };
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchmove", interrupt, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchmove", interrupt);
      window.removeEventListener("keydown", onKey);
    };
  }, [status, trackRef, commit]);

  const start = useCallback(
    (from: number) => {
      const track = trackRef.current;
      if (!track) return;
      scrollToProgress(track, from);
      commit(from);
      setStatus("playing");
    },
    [trackRef, commit],
  );

  const play = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (status === "paused") start(scrollProgress(track));
    else start(0);
  }, [status, start, trackRef]);

  const pause = useCallback(() => setStatus("paused"), []);
  const replay = useCallback(() => start(0), [start]);
  const exit = useCallback(() => setStatus("idle"), []);
  const skip = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const current = status === "playing" ? progressRef.current : scrollProgress(track);
    const next = Math.min(1, (Math.floor(current * ACT_COUNT + 0.001) + 1) / ACT_COUNT);
    if (next >= 1) {
      scrollToProgress(track, 1);
      commit(1);
      setStatus("done");
      return;
    }
    scrollToProgress(track, next);
    commit(next);
    if (status !== "playing") setStatus("paused");
  }, [status, trackRef, commit]);

  const visibleStatus: DirectorStatus = !inView && status !== "playing" ? "idle" : status;

  return { status: visibleStatus, progress, play, pause, replay, skip, exit };
}

type Director = ReturnType<typeof useDirector>;

export function DirectorBar({ director, labels }: { director: Director; labels: string[] }) {
  const { status, progress, play, pause, replay, skip, exit } = director;
  if (status === "idle") return null;
  const actIndex = Math.min(labels.length - 1, Math.floor(progress * labels.length));
  const remaining = Math.max(0, Math.round(DIRECTOR_SECONDS * (1 - progress)));
  const playing = status === "playing";

  return (
    <div className="dm-bar" role="toolbar" aria-label="Story playback">
      <span className="dm-progress" aria-hidden>
        <span style={{ transform: `scaleX(${progress})` }} />
      </span>
      {status === "done" ? (
        <button type="button" className="dm-btn dm-btn--main" onClick={replay} aria-label="Replay the story">
          <RotateCcw size={18} aria-hidden />
        </button>
      ) : (
        <button
          type="button"
          className="dm-btn dm-btn--main"
          onClick={playing ? pause : play}
          aria-label={playing ? "Pause the story" : "Play the story"}
        >
          {playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
        </button>
      )}
      <p className="dm-meta" aria-live="polite">
        <span className="dm-act">{status === "done" ? "The end" : `${actIndex + 1}/${labels.length} · ${labels[actIndex]}`}</span>
        <span className="dm-time">{status === "done" ? "Replay or keep scrolling" : `${remaining}s left`}</span>
      </p>
      {status !== "done" && (
        <>
          <button type="button" className="dm-btn" onClick={replay} aria-label="Replay from the start">
            <RotateCcw size={16} aria-hidden />
          </button>
          <button type="button" className="dm-btn" onClick={skip} aria-label="Skip to the next act">
            <SkipForward size={16} aria-hidden />
          </button>
        </>
      )}
      <button type="button" className="dm-btn" onClick={exit} aria-label="Return to exploring by scroll">
        <X size={16} aria-hidden />
      </button>
    </div>
  );
}
