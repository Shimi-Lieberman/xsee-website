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
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCountersVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const attackPatterns = useCountUp(1000, 1200, countersVisible);
  const candidatePaths = useCountUp(14, 1200, countersVisible);
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
          <div className="stat-num" style={{ color: "#F97316" }}>{candidatePaths}</div>
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
          <div className="stat-num" style={{ color: "#EAB308" }}>
            &lt;30<span className="sfx" style={{ color: "#EAB308" }}>m</span>
          </div>
          <div className="stat-lbl">First path found</div>
        </div>
        <div className="stat-cell" style={{ ...popStyle, animationDelay: countersVisible ? "0.2s" : undefined }}>
          <div className="stat-num" style={{ color: "#F59E0B" }}>
            $18.5<span className="sfx" style={{ color: "#F59E0B" }}>M</span>
          </div>
          <div className="stat-lbl">Avg financial exposure proven</div>
        </div>
      </div>
    </div>
  );
}
