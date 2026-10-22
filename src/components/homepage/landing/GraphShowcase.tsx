"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import GraphScene from "./GraphScene";
import { DESKTOP, MOBILE } from "./graphModel";

export default function GraphShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const running = onScreen && !paused;

  return (
    <section
      ref={sectionRef}
      className={`lp-showcase${running ? "" : " is-paused"}`}
      aria-labelledby="lp-showcase-title"
      data-nav-tone="dark"
    >
      <div className="lp-showcase-stage">
        <GraphScene composition={DESKTOP} className="lp-graph--desktop" />
        <GraphScene composition={MOBILE} className="lp-graph--mobile" />
        <div className="lp-showcase-scrim" aria-hidden="true" />
      </div>

      <div className="lp-showcase-copy">
        <h2 id="lp-showcase-title" className="lp-showcase-title text-balance">
          Connected exposures. <span>Consequential decisions.</span>
        </h2>
        <p className="lp-showcase-lede text-pretty">
          Findings that look minor on their own can combine into a route to what matters most.
        </p>
      </div>

      <p className="lp-showcase-tag">Illustrative example</p>
      <p className="sr-only">
        Animated illustration: a public endpoint connects through a load balancer, a web service and a workload role to customer data.
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
