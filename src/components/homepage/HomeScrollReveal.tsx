"use client";

import { useEffect } from "react";

const TAG_SELECTORS = [
  ".hp-page-main section .hp-card",
  ".hp-page-main section h2",
  ".hp-page-main section .hp-eyebrow",
];

/**
 * Premium reveal-on-scroll for the marketing homepage.
 * IntersectionObserver when available; scroll-position fallback for iframe/preview contexts.
 */
export default function HomeScrollReveal() {
  useEffect(() => {
    const seen = new WeakSet<Element>();

    const tag = () => {
      TAG_SELECTORS.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          if (seen.has(el)) return;
          seen.add(el);
          el.classList.add("hp-scroll-reveal");
        });
      });
    };

    const reveal = (el: Element) => {
      el.classList.add("is-in");
    };

    const checkAll = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll(".hp-scroll-reveal:not(.is-in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) reveal(el);
      });
    };

    tag();

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) reveal(e.target);
          });
        },
        { threshold: 0, rootMargin: "0px 0px -8% 0px" }
      );
      document.querySelectorAll(".hp-scroll-reveal").forEach((el) => io!.observe(el));
    }

    const retag = window.setInterval(() => {
      tag();
      if (io) {
        document.querySelectorAll(".hp-scroll-reveal:not(.is-in)").forEach((el) => io!.observe(el));
      }
      checkAll();
    }, 500);
    const stopRetag = window.setTimeout(() => clearInterval(retag), 4000);

    checkAll();
    window.addEventListener("scroll", checkAll, { passive: true });

    return () => {
      clearInterval(retag);
      clearTimeout(stopRetag);
      window.removeEventListener("scroll", checkAll);
      io?.disconnect();
    };
  }, []);

  return null;
}
