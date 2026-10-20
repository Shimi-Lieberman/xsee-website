"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import FilmDialog from "./FilmDialog";
import { FILM_DURATION, LOOP_SOURCES, formatFilmTime } from "./filmData";
import "./xsee-film.css";

export default function XseeFilm() {
  const loopRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const video = loopRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduceMotion.matches && !open) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [open]);

  return (
    <section id="experience" className="xf-section" aria-labelledby="xf-heading" data-nav-tone="dark">
      <div className="xf-stage" aria-hidden="true">
        <video
          ref={loopRef}
          className="xf-loop"
          muted
          loop
          playsInline
          preload="metadata"
          poster={LOOP_SOURCES.posterDesktop}
          disablePictureInPicture
          tabIndex={-1}
        >
          <source src={LOOP_SOURCES.mobile} type="video/mp4" media="(max-width: 767px)" />
          <source src={LOOP_SOURCES.desktop} type="video/mp4" />
        </video>
        <div className="xf-atmos" />
        <div className="xf-vignette" />
      </div>

      <div className="xf-copy">
        <span className="xf-kicker">The film</span>
        <h2 id="xf-heading" className="xf-heading">
          From exposure to proof, in one story.
        </h2>
        <p className="xf-lede">
          Discover the path. Prove it with evidence. Approve the fix. Verify it closed.
        </p>
        <div className="xf-actions">
          <button type="button" className="xf-watch" onClick={() => setOpen(true)} aria-haspopup="dialog">
            <span className="xf-watch-disc" aria-hidden="true">
              <Play />
            </span>
            Watch the film
            <span className="xf-watch-time">{formatFilmTime(FILM_DURATION)}</span>
          </button>
          <span className="xf-note">Illustrative scenario · synthetic environment</span>
        </div>
      </div>

      <FilmDialog open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
