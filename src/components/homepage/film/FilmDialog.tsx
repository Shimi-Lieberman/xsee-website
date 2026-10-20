"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, RotateCcw, Volume2, VolumeX, X } from "lucide-react";
import {
  FILM_ACTS,
  FILM_DURATION,
  FILM_POSTER,
  FILM_SRC,
  filmActAt,
  filmCaptionAt,
  formatFilmTime,
} from "./filmData";

type WebkitVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

export default function FilmDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(FILM_DURATION);

  useEffect(() => {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      if (video) {
        video.muted = false;
        void video.play().catch(() => {
          video.muted = true;
          void video.play().catch(() => {});
        });
      }
    } else if (!open && dialog.open) {
      video?.pause();
      dialog.close();
    }
  }, [open]);

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

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (video.ended) video.currentTime = 0;
      void video.play();
    } else {
      video.pause();
    }
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
    video.muted = !video.muted;
  }, []);

  const fullscreen = useCallback(() => {
    const frame = frameRef.current;
    const video = videoRef.current as WebkitVideo | null;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (frame?.requestFullscreen) {
      void frame.requestFullscreen().catch(() => video?.webkitEnterFullscreen?.());
    } else {
      video?.webkitEnterFullscreen?.();
    }
  }, []);

  const act = filmActAt(t);
  const caption = filmCaptionAt(t);
  const ended = !playing && t >= duration - 0.1;

  return (
    <dialog
      ref={dialogRef}
      className="xf-dialog"
      aria-label="XSEE film"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="xf-player">
        <button type="button" className="xf-close" onClick={onClose} aria-label="Close film">
          <X aria-hidden="true" />
        </button>

        <div ref={frameRef} className="xf-frame">
          <video
            ref={videoRef}
            className="xf-video"
            src={FILM_SRC}
            poster={FILM_POSTER}
            playsInline
            preload="none"
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            aria-label="XSEE film: from exposure to proof"
          />
          <p className="xf-caption" aria-live="off">
            {caption ? <span>{caption.text}</span> : null}
          </p>
        </div>

        <div className="xf-controls">
          <div className="xf-transport">
            <button
              type="button"
              onClick={togglePlay}
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

            <span className="xf-time">
              {formatFilmTime(t)} / {formatFilmTime(duration)}
            </span>

            <button type="button" onClick={toggleSound} className="xf-round" aria-pressed={!muted} aria-label={muted ? "Turn sound on" : "Mute"}>
              {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
            </button>
            <button type="button" onClick={fullscreen} className="xf-round" aria-label="Fullscreen">
              <Maximize aria-hidden="true" />
            </button>
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
        </div>
      </div>
    </dialog>
  );
}
