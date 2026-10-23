"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import GraphScene from "./GraphScene";
import { DESKTOP, MOBILE } from "./graphModel";

export default function GraphShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [paused, setPaused] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(node);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const running = onScreen && tabVisible && !paused;

  return (
    <section
      ref={sectionRef}
      className={`lp-showcase${running ? "" : " is-paused"}`}
      aria-labelledby="lp-showcase-title"
      data-nav-tone="dark"
    >
      <div className="lp-showcase-stage">
        <GraphScene composition={DESKTOP} className="lp-graph--desktop" fit="slice" />
        <GraphScene composition={MOBILE} className="lp-graph--mobile" fit="meet" />
        <div className="lp-showcase-scrim" aria-hidden="true" />
      </div>

      <div className="lp-showcase-copy">
        <h2 id="lp-showcase-title" className="lp-showcase-title text-balance">
          See how exposures connect.
        </h2>
        <p className="lp-showcase-lede text-pretty">
          Separate findings can form a path to critical resources.
        </p>
      </div>

      <p className="lp-showcase-tag">Illustrative visualization</p>
      <p className="sr-only">
        Animated illustration: an entry point connects through a workload and an identity to a data store, while unrelated parts of the environment recede.
      </p>

      <button
        type="button"
        className="lp-motion-toggle"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play animation" : "Pause animation"}
      >
        {paused ? <Play size={16} aria-hidden /> : <Pause size={16} aria-hidden />}
      </button>
    </section>
  );
}
