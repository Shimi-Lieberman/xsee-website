"use client";

import { useRef, useState, useEffect } from "react";

const STATS = [
  {
    key: "patterns",
    label: "Attack patterns in XSEE's engine",
    color: "#FF1B8D",
    display: "1,000+",
  },
  {
    key: "engines",
    label: "Engines in the autonomous loop",
    color: "#F97316",
    display: "7",
  },
  {
    key: "conf",
    label: "Avg exploit confidence score",
    color: "#4ade80",
    display: "92%",
  },
  {
    key: "time",
    label: "Time to first proven breach path",
    color: "#F59E0B",
    display: "<30m",
  },
  {
    key: "exposure",
    label: "Avg financial exposure on first scan",
    color: "#EAB308",
    display: "$3.2M",
  },
] as const;

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

  const popStyle = {
    animation: countersVisible ? "count-up-pop 0.6s ease-out both" : "none",
  } as const;

  return (
    <div ref={counterRef} className="stats-band sec-navy">
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div
            key={s.key}
            className="stat-cell"
            style={{
              ...popStyle,
              animationDelay: countersVisible ? `${i * 0.05}s` : undefined,
            }}
          >
            <div className="stat-num" style={{ color: s.color }}>
              {s.display}
            </div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
