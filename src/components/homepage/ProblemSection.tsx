"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const STATS = [
  { label: "Findings produced", value: "4,127", sub: "last 24h", tone: "ink3" as const },
  { label: "Reach prod data", value: "23", sub: "paths", tone: "ink" as const },
  { label: "Genuinely novel", value: "3", sub: "after dedupe", tone: "brand" as const },
  { label: "Need a human", value: "1", sub: "review queue", tone: "brand" as const },
] as const;

function toneClass(tone: (typeof STATS)[number]["tone"]) {
  if (tone === "brand") return "text-[var(--v2-brand)]";
  if (tone === "ink") return "text-[var(--v2-ink)]";
  return "text-[var(--v2-ink2)]";
}

export default function ProblemSection() {
  const strikeRef = useRef<HTMLSpanElement>(null);
  const [strikeActive, setStrikeActive] = useState(false);

  useEffect(() => {
    const el = strikeRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStrikeActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="problem" className="v2-polish relative overflow-hidden px-6 py-28 lg:px-10 lg:py-40" aria-labelledby="problem-title">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="dotgrid-dark absolute inset-0 opacity-40" />
        <div
          className="glow-brand-soft absolute left-1/2 top-1/3 -translate-x-1/2"
          style={{ width: "900px", height: "600px" }}
        />
        <div className="grain" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-16 flex items-center gap-4 lg:mb-24">
          <span className="v2-eyebrow">01 · The problem</span>
          <span className="h-px max-w-[200px] flex-1 bg-[var(--v2-line2)] opacity-30" />
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2
              id="problem-title"
              className="display mb-4 text-[var(--v2-ink)]"
              style={{
                fontSize: "clamp(56px, 9vw, 132px)",
                lineHeight: 0.95,
                letterSpacing: "-0.045em",
              }}
            >
              <span className="block text-[var(--v2-ink3)]">Your scanner found</span>
              <span className="block">
                <span
                  ref={strikeRef}
                  className={`num-strike v2-mono text-[var(--v2-ink)]${strikeActive ? " num-strike-animate" : ""}`}
                  style={{ fontWeight: 600 }}
                >
                  4,000
                </span>
                <span className="text-[var(--v2-ink3)]"> findings.</span>
              </span>
              <span className="block">
                <span className="text-[var(--v2-ink)]">3</span>{" "}
                <span className="serif-accent text-[var(--v2-ink2)]">actually</span>{" "}
                <span className="text-[var(--v2-ink)]">matter.</span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-12">
            <div className="max-w-[460px] border-l border-[var(--v2-line)] pl-6 lg:pl-8">
              <p
                className="text-[19px] leading-[1.6] text-[var(--v2-ink2)] lg:text-[20px]"
                style={{ textWrap: "pretty" }}
              >
                Severity scores. Risk ratings. Compliance traffic-lights. Every dashboard tells you something is wrong —
                none of them tell you{" "}
                <span className="text-[var(--v2-ink)]">whether it can actually be exploited</span>.
              </p>
              <p className="mt-6 text-[16px] leading-[1.65] text-[var(--v2-ink3)]">
                xsee chains misconfigurations, IAM permissions, and network access into realistic attack paths. The only
                finding that earns your attention is the one that reaches data.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-[var(--v2-line)] bg-[var(--v2-line)] md:grid-cols-4 lg:mt-32">
          {STATS.map((c, i) => (
            <div key={c.label} className="relative bg-[var(--v2-base)] p-7 lg:p-9">
              <div className="v2-eyebrow mb-3">{c.label}</div>
              <div
                className={`display v2-mono font-semibold tracking-tight ${toneClass(c.tone)}`}
                style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1 }}
              >
                {c.value}
              </div>
              <div className="v2-mono mt-3 text-[12px] tracking-wider text-[var(--v2-ink3)]">{c.sub}</div>
              {i < 3 && (
                <div className="absolute -right-px top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-[var(--v2-line)] bg-[var(--v2-base)] md:flex">
                  <ArrowRight className="h-3 w-3 text-[var(--v2-ink3)]" aria-hidden />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
