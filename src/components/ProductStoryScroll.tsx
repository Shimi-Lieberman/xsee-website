"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Loader2,
  Server,
  KeyRound,
  Database,
  ShieldCheck,
} from "lucide-react";

/* 4-step flow: Discover → Graph → Detect → Prevent */
const STEPS = [
  {
    step: 1,
    title: "Cloud Discovery",
    body: "XSEE discovers your cloud environment and maps infrastructure assets.",
  },
  {
    step: 2,
    title: "Attack Graph",
    body: "XSEE builds relationships between resources—network access, permissions, dependencies.",
  },
  {
    step: 3,
    title: "Attack Path Detection",
    body: "XSEE identifies real breach paths attackers could exploit.",
  },
  {
    step: 4,
    title: "Stop the Attack",
    body: "XSEE neutralizes the path and blocks the breach before it happens.",
  },
];

const NODE_IDS = ["internet", "lb", "ec2", "iam", "db"] as const;
/* Balanced layout: entry bottom, crown jewel top, compute/IAM center. Safe zone 14–86; generous spacing. */
const NODES = [
  { id: "internet", label: "Internet", icon: Globe, x: 50, y: 81, color: "#F97316" },
  { id: "lb", label: "Load Balancer", icon: Loader2, x: 50, y: 62, color: "#FF1B8D" },
  { id: "ec2", label: "EC2", icon: Server, x: 30, y: 44, color: "#FF1B8D" },
  { id: "iam", label: "IAM Role", icon: KeyRound, x: 70, y: 44, color: "#8B5CF6" },
  { id: "db", label: "Database", icon: Database, x: 50, y: 19, color: "#EF4444" },
];

const ALL_GRAPH_EDGES: [string, string][] = [
  ["internet", "lb"],
  ["lb", "ec2"],
  ["ec2", "db"],
  ["iam", "ec2"],
  ["internet", "iam"],
];

const ATTACK_PATH = ["internet", "iam", "ec2", "db"];
const ATTACK_PATH_EDGES: [string, string][] = [
  ["internet", "iam"],
  ["iam", "ec2"],
  ["ec2", "db"],
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export default function ProductStoryScroll() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStep(i);
            }
          });
        },
        { root: null, rootMargin: "-15% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="brand-stripes-bg relative overflow-hidden bg-[#0B1C3D] py-10 px-6 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            How XSEE Discovers and Stops Attacks
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-base text-slate-400 md:text-lg">
            Scroll to see how the platform discovers infrastructure, builds the
            attack graph, and blocks the breach.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-4 lg:grid-cols-[360px_1fr] lg:gap-6 lg:items-stretch">
          {/* Left: compact stacked step cards — scrolls */}
          <div className="min-w-0 space-y-1.5">
            {STEPS.map((step, i) => (
              <div
                key={step.step}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="min-h-[70px]"
              >
                <motion.div
                  className="rounded-lg border border-slate-700/50 bg-[#0B1C3D]/80 p-4 backdrop-blur-sm transition-shadow duration-300"
                  animate={{
                    borderColor:
                      activeStep === i
                        ? "rgba(255, 27, 141,0.5)"
                        : "rgba(148,163,184,0.18)",
                    boxShadow:
                      activeStep === i
                        ? "0 0 20px rgba(255, 27, 141,0.15)"
                        : "0 1px 8px rgba(0,0,0,0.2)",
                    opacity: activeStep === i ? 1 : 0.72,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold ${
                        activeStep === i
                          ? "bg-[#FF1B8D] text-white"
                          : "bg-slate-700/50 text-slate-400"
                      }`}
                    >
                      {step.step}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-snug text-slate-400">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div className="ml-4 h-2 w-px bg-slate-600/50" aria-hidden />
                )}
              </div>
            ))}
          </div>

          {/* Right: sticky graph — stays visible, evolves by step */}
          <div className="lg:sticky lg:top-20 w-full max-w-[500px] min-h-[280px] lg:min-h-[320px] lg:ml-auto min-w-0">
            <StoryViz activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryViz({ activeStep }: { activeStep: number }) {
  const showNodes = activeStep >= 0;
  const showGraphLines = activeStep >= 1;
  const showAttackPath = activeStep >= 2;
  const isPrevention = activeStep >= 3;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700/50 bg-[#0B1C3D] shadow-xl">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative flex min-h-[260px] w-full items-center justify-center overflow-visible p-8 md:min-h-[300px] md:p-10">
        <div className="relative aspect-square w-full max-w-[320px] flex-shrink-0 overflow-visible">
          <svg
            className="block h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="storyAttackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
              <linearGradient id="storyBlockedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4006E" />
                <stop offset="100%" stopColor="#D4006E" />
              </linearGradient>
            </defs>

            {ALL_GRAPH_EDGES.map(([a, b], i) => {
              const n1 = getNode(a);
              const n2 = getNode(b);
              const isAttackEdge = ATTACK_PATH_EDGES.some(
                ([x, y]) => (x === a && y === b) || (x === b && y === a)
              );
              const pathD = `M ${n1.x} ${n1.y} L ${n2.x} ${n2.y}`;
              const strokeColor = isAttackEdge
                ? isPrevention
                  ? "rgba(255, 27, 141,0.3)"
                  : showAttackPath
                    ? "url(#storyAttackGrad)"
                    : "rgba(255,255,255,0.12)"
                : "rgba(148,163,184,0.1)";
              const strokeWidth = isAttackEdge ? 2 : 0.55;

              if (!showGraphLines) return null;

              return (
                <g key={`${a}-${b}`}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke="rgba(148,163,184,0.08)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    pathLength={100}
                  />
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray="100"
                    initial={false}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                  />
                </g>
              );
            })}

            {showAttackPath && !isPrevention &&
              ATTACK_PATH_EDGES.map(([a, b]) => {
                const n1 = getNode(a);
                const n2 = getNode(b);
                const pathD = `M ${n1.x} ${n1.y} L ${n2.x} ${n2.y}`;
                return (
                  <motion.path
                    key={`pulse-${a}-${b}`}
                    d={pathD}
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray="12 88"
                    animate={{ strokeDashoffset: [0, -100] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
          </svg>

          {NODES.map((node, i) => {
            const nodeOrder = NODE_IDS.indexOf(node.id as (typeof NODE_IDS)[number]);
            const visible = showNodes && nodeOrder >= 0;
            const isOnPath = ATTACK_PATH.includes(node.id);
            const remediated = isPrevention && isOnPath;

            return (
              <motion.div
                key={node.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={false}
                animate={{
                  opacity: visible ? 1 : 0,
                  scale: visible ? 1 : 0.9,
                }}
                transition={{ duration: 0.35, delay: visible ? nodeOrder * 0.08 : 0 }}
              >
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-xl border-2 bg-[#0B1C3D] shadow-inner sm:h-11 sm:w-11"
                  animate={{
                    opacity: isOnPath && showAttackPath && !isPrevention ? [0.9, 1, 0.9] : 1,
                    borderColor: remediated
                      ? "#D4006E"
                      : isOnPath && showAttackPath && !isPrevention
                        ? "#EF4444"
                        : isOnPath && showAttackPath
                          ? "#D4006E"
                          : "#475569",
                    boxShadow: remediated
                      ? "0 0 16px rgba(255, 27, 141,0.45)"
                      : isOnPath && showAttackPath && !isPrevention
                        ? "0 0 16px rgba(239,68,68,0.45)"
                        : "0 0 6px rgba(255,255,255,0.05)",
                  }}
                  transition={{
                    borderColor: { duration: 0.3 },
                    opacity: isOnPath && showAttackPath && !isPrevention
                      ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.3 },
                  }}
                >
                  {remediated ? (
                    <ShieldCheck className="h-5 w-5 text-[#D4006E] sm:h-6 sm:w-6" />
                  ) : (
                    <node.icon
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      style={{
                        color: remediated
                          ? "#D4006E"
                          : isOnPath && showAttackPath && !isPrevention
                            ? "#EF4444"
                            : isOnPath && showAttackPath
                              ? "#D4006E"
                              : node.color,
                      }}
                    />
                  )}
                </motion.div>
                <span className="mt-2 text-[9px] font-medium tracking-tight text-slate-300 sm:text-[10px]">
                  {node.label}
                </span>
              </motion.div>
            );
          })}

          {isPrevention && (
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#D4006E]/15 px-3 py-2 ring-1 ring-[#D4006E]/30"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#D4006E]" />
              <span className="text-[10px] font-semibold tracking-tight text-[#D4006E]">
                Attack Path Neutralized
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
