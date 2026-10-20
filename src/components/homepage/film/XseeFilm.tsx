"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import {
  FILM_ACTS,
  FILM_DURATION,
  FILM_POSTER,
  FILM_REMEDIATION,
  FILM_SRC,
  FILM_T,
  filmActAt,
  filmCaptionAt,
  formatFilmTime,
} from "./filmData";
import "./xsee-film.css";

function useScreenLight(videoRef: React.RefObject<HTMLVideoElement | null>, active: boolean) {
  const glowRef = useRef<HTMLCanvasElement>(null);
  const floorRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const targets = [glowRef.current, floorRef.current]
      .filter((c): c is HTMLCanvasElement => Boolean(c))
      .map((c) => ({ c, ctx: c.getContext("2d", { alpha: false }) }));
    if (!video || targets.length === 0) return;

    const paint = () => {
      if (video.readyState < 2) return;
      for (const { c, ctx } of targets) ctx?.drawImage(video, 0, 0, c.width, c.height);
    };
    paint();
    video.addEventListener("loadeddata", paint);
    video.addEventListener("seeked", paint);
    const interval = active ? window.setInterval(paint, 200) : undefined;
    return () => {
      video.removeEventListener("loadeddata", paint);
      video.removeEventListener("seeked", paint);
      if (interval) window.clearInterval(interval);
    };
  }, [videoRef, active]);

  return { glowRef, floorRef };
}

function Overlays({ t }: { t: number }) {
  const inRemediation = t >= FILM_T.impact - 0.5 && t < FILM_T.drift - 1;
  const inDrift = t >= FILM_T.drift && t < FILM_T.endCard;
  const endOpacity = Math.min(1, Math.max(0, (t - FILM_T.endCard) / 1.2));
  const titleOpacity = Math.min(
    Math.max(0, (t - FILM_T.titleIn) / 0.8),
    Math.max(0, (FILM_T.titleOut - t) / 0.6),
    1,
  );

  return (
    <>
      {titleOpacity > 0 && (
        <div className="xf-titlecard" style={{ opacity: titleOpacity }}>
          <span className="xf-titlecard-logo">XSEE</span>
          <span className="xf-titlecard-tag">
            <span>See the path.</span> <span>Prove the risk.</span> <span>Verify the fix.</span>
          </span>
        </div>
      )}
      {inRemediation && (
        <div className="xf-panel">
          {FILM_REMEDIATION.map((step) => (
            <div key={step.label} className="xf-step" data-shown={t >= step.at}>
              <Check className="xf-step-icon" aria-hidden="true" />
              <div>
                <span className="xf-step-label">{step.label}</span>
                <span className="xf-step-detail">{step.detail}</span>
              </div>
            </div>
          ))}
          {t >= FILM_T.closure && <div className="xf-record">Closure record · path verified closed</div>}
          <span className="xf-illustrative">Illustrative example</span>
        </div>
      )}
      {inDrift && (
        <div className="xf-panel">
          <div className="xf-step" data-shown="true">
            <span className="xf-step-detail">Configuration change detected · trust policy widened</span>
          </div>
          {t >= FILM_T.reopen && (
            <div className="xf-record" data-tone="alert">
              Reassessment · path re-validates · closure record revoked
            </div>
          )}
          <span className="xf-illustrative">Illustrative example</span>
        </div>
      )}
      {endOpacity > 0 && (
        <div className="xf-endcard" style={{ opacity: endOpacity }}>
          <span className="xf-endcard-logo">XSEE</span>
          <span className="xf-endcard-tag">
            <span>Trust nothing.</span> <span>Prove everything.</span>
          </span>
        </div>
      )}
    </>
  );
}

export default function XseeFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [heardSound, setHeardSound] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [duration, setDuration] = useState(FILM_DURATION);
  const { glowRef, floorRef } = useScreenLight(videoRef, playing);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 1 && Number.isFinite(video.duration)) setDuration(video.duration);

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          video.muted = true;
          video
            .play()
            .then(() => setPlaying(true))
            .catch(() => setAutoplayBlocked(true));
        } else if (!entry.isIntersecting && started && video.muted && !video.paused) {
          video.pause();
          started = false;
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      if (videoRef.current) setT(videoRef.current.currentTime);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.ended || video.currentTime >= duration - 0.05) video.currentTime = 0;
    void video.play();
    setAutoplayBlocked(false);
    setPlaying(true);
  }, [duration]);

  const pause = useCallback(() => {
    videoRef.current?.pause();
    setPlaying(false);
  }, []);

  const seek = useCallback(
    (to: number) => {
      const clamped = Math.min(duration, Math.max(0, to));
      if (videoRef.current) videoRef.current.currentTime = clamped;
      setT(clamped);
    },
    [duration],
  );

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next && !heardSound) {
      setHeardSound(true);
      video.currentTime = 0;
      setT(0);
      void video.play();
      setPlaying(true);
      setAutoplayBlocked(false);
    }
  }, [muted, heardSound]);

  const act = filmActAt(t);
  const caption = filmCaptionAt(t);
  const ended = t >= duration - 0.05;

  return (
    <section id="experience" className="xf-section" aria-labelledby="xf-heading" data-nav-tone="dark">
      <header className="xf-intro">
        <span className="xf-kicker">Experience XSEE · {formatFilmTime(duration)}</span>
        <h2 id="xf-heading" className="xf-heading">
          From finding to proof, in one story.
        </h2>
      </header>

      <div className="xf-stage">
        <canvas ref={glowRef} width={32} height={18} aria-hidden="true" className="xf-glow" />

        <div className="xf-screen">
          <div className="xf-feather">
            <video
              ref={videoRef}
              src={FILM_SRC}
              poster={FILM_POSTER}
              muted
              playsInline
              preload="metadata"
              className="xf-video"
              onEnded={() => setPlaying(false)}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              aria-label="XSEE film: from finding to proof"
            />
            <div className="xf-scanlines" aria-hidden="true" />
            <Overlays t={t} />
            <p className="xf-caption" aria-live="off">
              {caption ? <span>{caption.text}</span> : null}
            </p>
          </div>

          <div className="xf-hud" aria-hidden="true">
            <span className="xf-corner" data-pos="tl" />
            <span className="xf-corner" data-pos="tr" />
            <span className="xf-corner" data-pos="bl" />
            <span className="xf-corner" data-pos="br" />
          </div>

          <div className="xf-hud-top" aria-hidden="true">
            <span>
              <span className="xf-dot" data-live={playing} />
              {act.step}
            </span>
            <span className="xf-tabular">{formatFilmTime(t)}</span>
          </div>

          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? "Turn sound on" : "Mute"}
            className="xf-sound"
          >
            {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
            {muted ? (heardSound ? "Sound off" : "Tap for sound") : "Sound on"}
          </button>

          {autoplayBlocked && !playing && (
            <button type="button" onClick={play} className="xf-bigplay" aria-label="Play film">
              <span className="xf-bigplay-ring" aria-hidden="true" />
              <span className="xf-bigplay-disc" aria-hidden="true" />
              <Play className="xf-bigplay-icon" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="xf-floor-wrap" aria-hidden="true">
          <canvas ref={floorRef} width={32} height={18} className="xf-reflection" />
          <div className="xf-floor" />
        </div>
        <div className="xf-houselights" aria-hidden="true" />
      </div>

      <div className="xf-controls">
        <div className="xf-transport">
          <button
            type="button"
            onClick={playing ? pause : play}
            className="xf-round"
            aria-label={playing ? "Pause" : ended ? "Replay" : "Play"}
          >
            {playing ? <Pause aria-hidden="true" /> : ended ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}
          </button>

          <div className="xf-track">
            <div className="xf-segments" aria-hidden="true">
              {FILM_ACTS.map((a) => {
                const end = Math.min(a.end, duration);
                const fill = Math.min(1, Math.max(0, (t - a.start) / (end - a.start)));
                return (
                  <div key={a.id} className="xf-segment" style={{ flexGrow: end - a.start }}>
                    <div className="xf-segment-fill" style={{ width: `${fill * 100}%` }} />
                  </div>
                );
              })}
            </div>
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={t}
              onChange={(e) => seek(Number(e.target.value))}
              className="xf-range"
              aria-label="Seek"
              aria-valuetext={`${formatFilmTime(t)} of ${formatFilmTime(duration)}`}
            />
          </div>

          <span className="xf-tabular xf-muted">{formatFilmTime(duration)}</span>
        </div>

        <nav aria-label="Film chapters" className="xf-chapters">
          {FILM_ACTS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => seek(a.start + 0.01)}
              aria-current={a.id === act.id ? "step" : undefined}
              className="xf-chapter"
            >
              {a.step}
            </button>
          ))}
        </nav>

        <div aria-live="polite" className="xf-info">
          <span className="xf-kicker xf-accent">{act.step}</span>
          <h3 className="xf-info-title">{act.title}</h3>
          <p className="xf-info-body">{act.summary}</p>
        </div>
      </div>
    </section>
  );
}
