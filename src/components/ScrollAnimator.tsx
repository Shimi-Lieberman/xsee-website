"use client";

import { useLayoutEffect } from "react";
import { shouldAnimateRevealFromBelow } from "@/lib/viewportReveal";

export default function ScrollAnimator() {
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const t = entry.target as HTMLElement;
            t.classList.remove("animate-from-below");
            t.classList.add("visible");
            observer.unobserve(t);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      const node = el as HTMLElement;
      if (shouldAnimateRevealFromBelow(node)) {
        node.classList.add("animate-from-below");
        observer.observe(node);
      } else {
        node.classList.remove("animate-from-below");
        node.classList.add("visible");
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
