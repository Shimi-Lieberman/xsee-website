"use client";

import { useLayoutEffect } from "react";
import { shouldAnimateRevealFromBelow } from "@/lib/viewportReveal";

export function ScrollReveal() {
  useLayoutEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const t = e.target as HTMLElement;
            t.classList.remove("reveal-from-below");
            t.classList.add("in", "visible");
            obs.unobserve(t);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      const node = el as HTMLElement;
      if (shouldAnimateRevealFromBelow(node)) {
        node.classList.add("reveal-from-below");
        obs.observe(node);
      } else {
        node.classList.remove("reveal-from-below");
        node.classList.add("in", "visible");
      }
    });
    return () => obs.disconnect();
  }, []);

  return null;
}
