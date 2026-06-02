"use client";

import { useLayoutEffect } from "react";
import { shouldAnimateRevealFromBelow } from "@/lib/viewportReveal";

/** Below-fold only — avoids hiding above-fold content after hydration. */
const TAG_SELECTORS = [
  ".hp-page-main section h2",
  ".hp-page-main section > .hp-container > .hp-eyebrow",
  ".hp-page-main section > .hp-container > p.hp-eyebrow",
  ".hp-page-main section .hp-card",
  ".hp-page-main section .hp-step",
];

function shouldTagForReveal(el: Element): boolean {
  if (el.closest("#proof-loop")) return false;
  if (el.closest("#get-started")) return false;
  return true;
}

function isInRevealViewport(el: Element): boolean {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const r = el.getBoundingClientRect();
  return r.top < vh * 0.92 && r.bottom > 0;
}

/**
 * Premium reveal-on-scroll for the marketing homepage.
 * Only below-fold nodes get the hidden state (no SSR → flash to invisible).
 * IntersectionObserver + scroll fallback for iframe/preview contexts.
 */
export default function HomeScrollReveal() {
  useLayoutEffect(() => {
    const seen = new WeakSet<Element>();

    const tag = () => {
      TAG_SELECTORS.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          if (seen.has(el)) return;
          if (!shouldTagForReveal(el)) return;
          seen.add(el);

          if (!shouldAnimateRevealFromBelow(el)) {
            return;
          }

          el.classList.add("hp-scroll-reveal");
          if (isInRevealViewport(el)) {
            el.classList.add("is-in");
          }
        });
      });
    };

    const reveal = (el: Element) => {
      el.classList.add("is-in");
    };

    const checkAll = () => {
      document.querySelectorAll(".hp-scroll-reveal:not(.is-in)").forEach((el) => {
        if (isInRevealViewport(el)) reveal(el);
      });
    };

    tag();
    checkAll();

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
