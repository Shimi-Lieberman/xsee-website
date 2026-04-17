"use client";

import { useRef, useState, useEffect } from "react";

function useCountUpInt(target: number, duration: number, enabled: boolean) {
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

function useCountUpFloat(target: number, duration: number, enabled: boolean, decimals: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const v = ease * target;
      setValue(Number(v.toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [enabled, target, duration, decimals]);
  return value;
}

const STATS = [
  { key: "patterns", label: "Attack patterns in XSEE's engine", color: "#FF1B8D", kind: "int" as const, target: 1000, suffix: "+" },
  { key: "engines", label: "Engines in the autonomous loop", color: "#F97316", kind: "int" as const, target: 7, suffix: "" },
  { key: "conf", label: "Avg exploit confidence score", color: "#4ade80", kind: "int" as const, target: 92, suffix: "%" },
  { key: "time", label: "Time to first proven breach path", color: "#F59E0B", kind: "static" as const, display: "<30m" },
  {
    key: "exposure",
    label: "Avg financial exposure on first scan",
    color: "#EAB308",
    kind: "money" as const,
    target: 18.5,
    prefix: "$",
    suffix: "M",
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

  const n1000 = useCountUpInt(1000, 1200, countersVisible);
  const n7 = useCountUpInt(7, 1000, countersVisible);
  const n92 = useCountUpInt(92, 1200, countersVisible);
  const money = useCountUpFloat(18.5, 1200, countersVisible, 1);

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
              {s.kind === "static" ? (
                s.display
              ) : s.kind === "money" ? (
                <>
                  {s.prefix}
                  {money}
                  <span className="sfx" style={{ color: s.color }}>
                    {s.suffix}
                  </span>
                </>
              ) : s.key === "patterns" ? (
                <>
                  {n1000.toLocaleString()}
                  <span className="sfx" style={{ color: s.color }}>
                    {s.suffix}
                  </span>
                </>
              ) : s.key === "engines" ? (
                <>{n7}</>
              ) : (
                <>
                  {n92}
                  <span className="sfx" style={{ color: s.color }}>
                    {s.suffix}
                  </span>
                </>
              )}
            </div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
