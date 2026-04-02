"use client";

import { useRef, useState, useEffect } from "react";

function useCountUp(target: number, duration: number, enabled: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [enabled, target, duration]);
  return value;
}

export default function StatsBand() {
  const counterRef = useRef<HTMLDivElement>(null);
  const [countersVisible, setCountersVisible] = useState(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    let activated = false;
    const activate = () => {
      if (activated) return;
      activated = true;
      setCountersVisible(true);
    };

    const inViewport = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const margin = 100;
      return rect.top < vh + margin && rect.bottom > -margin;
    };

    const tryActivate = () => {
      if (inViewport()) activate();
    };

    requestAnimationFrame(tryActivate);

    let scrollRaf = 0;
    const onScrollOrResize = () => {
      if (activated) return;
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(tryActivate);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    if (typeof IntersectionObserver === "undefined") {
      activate();
      return () => {
        window.removeEventListener("scroll", onScrollOrResize);
        window.removeEventListener("resize", onScrollOrResize);
        cancelAnimationFrame(scrollRaf);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) activate();
      },
      { root: null, rootMargin: "120px 0px 120px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      cancelAnimationFrame(scrollRaf);
    };
  }, []);

  const attackPatterns = useCountUp(1000, 1200, countersVisible);
  const candidatePaths = useCountUp(847, 1200, countersVisible);
  const confidence = useCountUp(92, 1200, countersVisible);

  const popStyle = {
    animation: countersVisible ? "count-up-pop 0.6s ease-out both" : "none",
  } as const;

  return (
    <div ref={counterRef} className="stats-band sec-navy">
      <div className="stats-grid">
        <div className="stat-cell" style={popStyle}>
          <div className="stat-num" style={{ color: "#FF1B8D" }}>
            {attackPatterns.toLocaleString()}
            <span className="sfx" style={{ color: "#FF1B8D" }}>+</span>
          </div>
          <div className="stat-lbl">Attack patterns</div>
        </div>
        <div className="stat-cell stat-warm" style={{ ...popStyle, animationDelay: countersVisible ? "0.05s" : undefined }}>
          <div className="stat-num" style={{ color: "#F97316" }}>
            {candidatePaths.toLocaleString()}
          </div>
          <div className="stat-lbl">Candidate paths discovered</div>
        </div>
        <div className="stat-cell" style={{ ...popStyle, animationDelay: countersVisible ? "0.1s" : undefined }}>
          <div className="stat-num" style={{ color: "#F97316" }}>
            {confidence}
            <span className="sfx" style={{ color: "#F97316" }}>%</span>
          </div>
          <div className="stat-lbl">Avg. path confidence</div>
        </div>
        <div className="stat-cell stat-warm" style={{ ...popStyle, animationDelay: countersVisible ? "0.15s" : undefined }}>
          <div className="stat-num" style={{ color: "#F59E0B" }}>
            $18.5<span className="sfx" style={{ color: "#F59E0B" }}>M</span>
          </div>
          <div className="stat-lbl">Avg financial exposure proven</div>
        </div>
        <div className="stat-cell" style={{ ...popStyle, animationDelay: countersVisible ? "0.2s" : undefined }}>
          <div className="stat-num" style={{ color: "#EAB308" }}>
            &lt;30<span className="sfx" style={{ color: "#EAB308" }}>m</span>
          </div>
          <div className="stat-lbl">First path found</div>
        </div>
      </div>
    </div>
  );
}
