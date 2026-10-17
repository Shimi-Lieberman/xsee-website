"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, RotateCcw, Search, Volume2, VolumeX } from "lucide-react";
import { segmentInfo, SHOTS } from "@/lib/cinematic/shots";
import type { Film } from "@/lib/cinematic/types";

type Props = { film: Pick<Film, "url" | "mobileUrl" | "posterUrl" | "duration" | "segments"> };

const EXPLORE_HREF = "/#reactor";

function chapterAt(film: Props["film"], time: number) {
  const index = film.segments.findIndex((segment) => time >= segment.start && time < segment.end);
  if (index !== -1) return index;
  return time >= film.duration - 0.05 ? film.segments.length - 1 : 0;
}

export function FilmPlayer({ film }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) video.play().catch(() => setPlaying(false));
  }, [film.url]);

  function sync() {
    const video = videoRef.current;
    if (!video) return;
    setTime(video.currentTime);
    setActive(chapterAt(film, video.currentTime));
  }

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  }

  function replay() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => setPlaying(false));
  }

  function seek(index: number) {
    const video = videoRef.current;
    const segment = film.segments[index];
    if (!video || !segment) return;
    video.currentTime = segment.start + 0.01;
    setActive(index);
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function fullscreen() {
    const frame = frameRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => void }) | null;
    const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) return void document.exitFullscreen();
    if (frame?.requestFullscreen) return void frame.requestFullscreen();
    if (frame?.webkitRequestFullscreen) return frame.webkitRequestFullscreen();
    video?.webkitEnterFullscreen?.();
  }

  const shot = segmentInfo(film.segments[active]?.shotId ?? SHOTS[0].id) ?? SHOTS[0];
  const progress = film.duration > 0 ? Math.min(1, time / film.duration) : 0;

  return (
    <div className="lab-player">
      <div ref={frameRef} className="lab-player-frame">
        <video
          ref={videoRef}
          poster={film.posterUrl}
          muted
          playsInline
          preload="metadata"
          aria-label={`XSEE cinematic film, ${Math.round(film.duration)} seconds`}
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={sync}
          onSeeked={sync}
          onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        >
          <source src={film.mobileUrl} type="video/mp4" media="(max-width: 767px)" />
          <source src={film.url} type="video/mp4" />
        </video>
      </div>

      <div className="lab-scrub" aria-hidden>
        {film.segments.map((segment) => {
          const span = segment.end - segment.start;
          const fill = Math.max(0, Math.min(1, (time - segment.start) / span));
          return (
            <span key={segment.shotId} style={{ flexGrow: span }}>
              <span style={{ transform: `scaleX(${fill})` }} />
            </span>
          );
        })}
      </div>

      <div className="lab-player-bar" role="group" aria-label="Film controls">
        <button type="button" className="lab-ctl lab-ctl--main" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
          <span>{playing ? "Pause" : "Play"}</span>
        </button>
        <button type="button" className="lab-ctl" onClick={replay} aria-label="Replay from the start">
          <RotateCcw size={18} aria-hidden />
        </button>
        <button type="button" className="lab-ctl" onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Mute"}>
          {muted ? <VolumeX size={18} aria-hidden /> : <Volume2 size={18} aria-hidden />}
        </button>
        <button type="button" className="lab-ctl" onClick={fullscreen} aria-label="Fullscreen">
          <Maximize size={18} aria-hidden />
        </button>
        <span className="lab-time" aria-hidden>
          {time.toFixed(1)}s / {film.duration.toFixed(1)}s
        </span>
      </div>

      <div className="lab-chapter-nav" role="group" aria-label="Chapters">
        {film.segments.map((segment, index) => {
          const item = segmentInfo(segment.shotId);
          return (
            <button
              key={segment.shotId}
              type="button"
              className="lab-chapter-btn"
              aria-current={index === active ? "true" : undefined}
              onClick={() => seek(index)}
            >
              <span className="lab-meta">{index + 1}</span>
              {item?.title ?? segment.shotId}
            </button>
          );
        })}
      </div>

      <div className="lab-panel" aria-live="polite">
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
        <a
          className="lab-btn"
          href={EXPLORE_HREF}
          onClick={() => videoRef.current?.pause()}
        >
          <Search size={16} aria-hidden />
          Explore the evidence
        </a>
      </div>
      <span className="sr-only">{`Progress ${Math.round(progress * 100)} percent`}</span>
    </div>
  );
}
