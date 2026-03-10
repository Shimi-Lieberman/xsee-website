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
const NODES = [
  { id: "internet", label: "Internet", icon: Globe, x: 50, y: 88, color: "#F97316" },
  { id: "lb", label: "Load Balancer", icon: Loader2, x: 50, y: 68, color: "#3B82F6" },
  { id: "ec2", label: "EC2", icon: Server, x: 38, y: 48, color: "#3B82F6" },
  { id: "iam", label: "IAM Role", icon: KeyRound, x: 62, y: 48, color: "#8B5CF6" },
  { id: "db", label: "Database", icon: Database, x: 50, y: 12, color: "#EF4444" },
];

/* Step 2: All graph connections */
const ALL_GRAPH_EDGES: [string, string][] = [
  ["internet", "lb"],
  ["lb", "ec2"],
  ["ec2", "db"],
  ["iam", "ec2"],
  ["internet", "iam"],
];

/* Step 3: Attack path — Internet → IAM → EC2 → Database */
const ATTACK_PATH = ["internet", "iam", "ec2", "db"];
const ATTACK_PATH_EDGES: [string, string][] = [
  ["internet", "iam"],
  ["iam", "ec2"],
  ["ec2", "db"],
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function lineLength(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
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
            if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
              setActiveStep(i);
            }
          });
        },
        { root: null, rootMargin: "-15% 0px -40% 0px", threshold: [0, 0.15, 0.5, 1] }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="brand-stripes-bg relative overflow-hidden bg-[#0B1C3D] py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            How XSEE Discovers and Stops Attacks
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Scroll to see how the platform discovers infrastructure, builds the
            attack graph, and blocks the breach.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 items-start gap-12 lg:grid-cols-[480px_1fr] lg:gap-16 lg:items-stretch">
          {/* Left: step explanation — scrolls */}
          <div className="min-w-0 space-y-24">
            {STEPS.map((step, i) => (
              <div
                key={step.step}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="min-h-[50vh]"
              >
                <motion.div
                  className="rounded-xl border border-slate-700/50 bg-[#0B1C3D]/60 p-8 backdrop-blur-sm"
                  animate={{
                    borderColor:
                      activeStep === i
                        ? "rgba(59,130,246,0.45)"
                        : "rgba(148,163,184,0.2)",
                    boxShadow:
                      activeStep === i
                        ? "0 0 24px rgba(59,130,246,0.12)"
                        : "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#3B82F6]">
                    Step {step.step}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-slate-400">{step.body}</p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right: infrastructure graph — fixed while steps scroll, evolves by step */}
          <div className="lg:sticky lg:top-28 w-full max-w-[580px] lg:ml-auto min-w-0">
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
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative flex min-h-[340px] w-full items-center justify-center overflow-hidden p-10">
        <div className="relative aspect-square w-full flex-shrink-0">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="storyAttackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
              <linearGradient id="storyBlockedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>
            </defs>

            {/* Connection lines — Step 2: animate draw, Step 3: attack path red, Step 4: dimmed */}
            {ALL_GRAPH_EDGES.map(([a, b], i) => {
              const n1 = getNode(a);
              const n2 = getNode(b);
              const isAttackEdge = ATTACK_PATH_EDGES.some(
                ([x, y]) => (x === a && y === b) || (x === b && y === a)
              );
              const pathD = `M ${n1.x} ${n1.y} L ${n2.x} ${n2.y}`;
              const len = lineLength(n1.x, n1.y, n2.x, n2.y);

              if (!showGraphLines) return null;

              const strokeColor = isAttackEdge
                ? isPrevention
                  ? "rgba(34,197,94,0.25)"
                  : showAttackPath
                    ? "url(#storyAttackGrad)"
                    : "rgba(255,255,255,0.15)"
                : "rgba(148,163,184,0.18)";

              const strokeWidth = isAttackEdge ? 1.8 : 0.7;

              return (
                <g key={`${a}-${b}`}>
                  {/* Gray base line (always visible once step 2) */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="rgba(148,163,184,0.12)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    pathLength={100}
                  />
                  {/* Animated / colored overlay */}
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray="100"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{
                      strokeDashoffset: showGraphLines ? 0 : 100,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.12,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </g>
              );
            })}

            {/* Attack path pulse (step 3 only) */}
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
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    pathLength={100}
                    strokeDasharray="12 88"
                    animate={{
                      strokeDashoffset: [0, -100],
                    }}
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

          {/* Nodes — Step 1: fade in gradually */}
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
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: visible ? 1 : 0,
                  scale: visible ? 1 : 0.85,
                }}
                transition={{
                  duration: 0.45,
                  delay: visible ? nodeOrder * 0.1 : 0,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <motion.div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border-2 bg-[#0B1C3D] sm:h-12 sm:w-12"
                  animate={{
                    opacity: isOnPath && showAttackPath && !isPrevention ? [0.9, 1, 0.9] : 1,
                    borderColor: remediated
                      ? "#22C55E"
                      : isOnPath && showAttackPath && !isPrevention
                        ? "#EF4444"
                        : isOnPath && showAttackPath
                          ? "#22C55E"
                          : "#475569",
                    boxShadow: remediated
                      ? "0 0 20px rgba(34,197,94,0.5)"
                      : isOnPath && showAttackPath && !isPrevention
                        ? "0 0 20px rgba(239,68,68,0.5)"
                        : "0 0 8px rgba(255,255,255,0.06)",
                  }}
                  transition={{
                    borderColor: { duration: 0.35 },
                    opacity: isOnPath && showAttackPath && !isPrevention
                      ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.35 },
                  }}
                >
                  {remediated ? (
                    <ShieldCheck className="h-6 w-6 text-[#22C55E]" />
                  ) : (
                    <node.icon
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      style={{
                        color: remediated
                          ? "#22C55E"
                          : isOnPath && showAttackPath && !isPrevention
                            ? "#EF4444"
                            : isOnPath && showAttackPath
                              ? "#22C55E"
                              : node.color,
                      }}
                    />
                  )}
                </motion.div>
                <span className="mt-1.5 text-[9px] font-medium text-slate-400 sm:text-[10px]">
                  {node.label}
                </span>
              </motion.div>
            );
          })}

          {/* Step 4: Attack Path Neutralized */}
          {isPrevention && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#22C55E]/20 px-4 py-2.5 ring-1 ring-[#22C55E]/40"
            >
              <ShieldCheck className="h-5 w-5 text-[#22C55E]" />
              <span className="text-sm font-semibold text-[#22C55E]">
                Attack Path Neutralized
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
