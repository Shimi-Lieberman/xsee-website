"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  color?: string;
}

export function CountUp({ target, suffix = "", prefix = "", duration = 2000, color }: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const p = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(ease * target));
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} style={{ color }}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
