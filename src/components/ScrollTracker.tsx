"use client";

import { useEffect, useRef } from "react";
import { Analytics } from "@/lib/analytics";

export function ScrollTracker() {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    const checkpoints = [25, 50, 75, 90, 100];

    const onScroll = () => {
      const scrolled =
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100;

      checkpoints.forEach((cp) => {
        if (scrolled >= cp && !fired.current.has(cp)) {
          fired.current.add(cp);
          Analytics.scrollDepth(cp);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
