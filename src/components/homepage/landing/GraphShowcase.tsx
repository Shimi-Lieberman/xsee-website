"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import GraphArt from "./GraphArt";

export default function GraphShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(node);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReducedMotion(motion.matches);
    onMotion();
    motion.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  const running = onScreen && tabVisible && !paused && !reducedMotion;

  return (
    <section
      ref={sectionRef}
      className={`lp-showcase${running ? "" : " is-paused"}`}
      aria-labelledby="lp-showcase-title"
      data-nav-tone="dark"
    >
      <div className="lp-showcase-copy">
        <h2 id="lp-showcase-title" className="lp-showcase-title">
          See how <span className="lp-showcase-accent">exposures</span> connect.
        </h2>
        <p className="lp-showcase-lede text-pretty">Separate findings can form a path to critical resources.</p>
      </div>

      <div className="lp-showcase-stage">
        <GraphArt running={running} animated={!reducedMotion} />
        <div className="lp-showcase-scrim" aria-hidden="true" />
      </div>
      <p className="sr-only">
        Illustration: an entry point connects through a workload and an identity to a data store. A highlight travels along that path while the rest of the environment stays in the background.
      </p>

      <div className="lp-showcase-meta">
        <p className="lp-showcase-tag">Illustrative visualization</p>
        {!reducedMotion ? (
          <button
            type="button"
            className="lp-motion-toggle"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? "Play animation" : "Pause animation"}
          >
            {paused ? <Play size={16} aria-hidden /> : <Pause size={16} aria-hidden />}
          </button>
        ) : null}
      </div>
    </section>
  );
}
