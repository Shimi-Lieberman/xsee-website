"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import SectionFadeIn from "./SectionFadeIn";

const METRICS = [
  {
    value: 1.2,
    suffix: "M+",
    label: "Assets analyzed",
    description: "Cloud resources mapped and continuously monitored.",
    color: "#3B82F6",
  },
  {
    value: 240,
    suffix: "K+",
    label: "Attack paths discovered",
    description: "Validated paths from entry to crown jewel.",
    color: "#22C55E",
  },
  {
    value: 18,
    suffix: "B+",
    label: "Security signals processed",
    description: "Events correlated into actionable intelligence.",
    color: "#F97316",
  },
  {
    value: 6.3,
    suffix: "M+",
    label: "Simulation scenarios executed",
    description: "Exploit simulations with detection gap analysis.",
    color: "#8B5CF6",
  },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function CountUp({
  target,
  suffix,
  decimals = 1,
  duration = 1350,
  inView,
}: {
  target: number;
  suffix: string;
  decimals?: number;
  duration?: number;
  inView: boolean;
}) {
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = eased * target;
      const formatted =
        decimals >= 1
          ? current.toFixed(decimals)
          : Math.round(current).toString();
      setDisplay(formatted + suffix);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, suffix, decimals, duration]);

  return <span>{display}</span>;
}

export default function ProofEvidence() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="bg-[#0B1C3D] py-28 px-6"
      style={{
        boxShadow: "inset 0 0 80px rgba(0,0,0,0.15)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <SectionFadeIn>
          <h2 className="text-center text-4xl font-semibold tracking-tight text-white">
            Evidence-Driven Security Intelligence
          </h2>
        </SectionFadeIn>
        <SectionFadeIn>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
            XSEE proves cloud risk using real infrastructure evidence.
          </p>
        </SectionFadeIn>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
              className="group relative overflow-hidden rounded-xl border border-slate-700 bg-[#0B1C3D]/90 p-6 transition-all duration-300 hover:border-slate-600"
              style={{
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow: `inset 0 0 40px ${metric.color}12, 0 0 24px ${metric.color}15`,
                }}
                aria-hidden
              />
              <div
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
                style={{ backgroundColor: metric.color }}
              />
              <div
                className="mb-3 h-1 w-8 rounded-full"
                style={{
                  backgroundColor: metric.color,
                  boxShadow: `0 0 12px ${metric.color}50`,
                }}
              />
              <p
                className="text-4xl font-bold tabular-nums tracking-tight text-white sm:text-5xl"
                style={{
                  textShadow: `0 0 40px ${metric.color}30`,
                }}
              >
                <CountUp
                  inView={inView}
                  target={metric.value}
                  suffix={metric.suffix}
                  decimals={metric.value >= 100 ? 0 : 1}
                  duration={1350}
                />
              </p>
              <p className="mt-2 text-base font-semibold text-slate-200">
                {metric.label}
              </p>
              <p className="mt-1.5 text-sm text-slate-500">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
