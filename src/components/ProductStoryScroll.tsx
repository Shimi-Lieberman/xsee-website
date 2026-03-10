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

const STEPS = [
  {
    step: 1,
    title: "Cloud Discovery",
    body: "Discover your cloud environment.",
  },
  {
    step: 2,
    title: "Attack Graph",
    body: "XSEE builds a full attack graph.",
  },
  {
    step: 3,
    title: "Attack Path Detection",
    body: "XSEE identifies real attack paths.",
  },
  {
    step: 4,
    title: "Attack Simulation",
    body: "XSEE simulates the attack chain.",
  },
  {
    step: 5,
    title: "Remediation",
    body: "XSEE provides the exact fix.",
  },
];

const NODE_IDS = ["internet", "lb", "ec2", "iam", "db"] as const;
const NODES = [
  { id: "internet", label: "Internet", icon: Globe, x: 50, y: 90, color: "#F97316" },
  { id: "lb", label: "Load Balancer", icon: Loader2, x: 50, y: 68, color: "#3B82F6" },
  { id: "ec2", label: "EC2", icon: Server, x: 35, y: 48, color: "#3B82F6" },
  { id: "iam", label: "IAM Role", icon: KeyRound, x: 65, y: 48, color: "#8B5CF6" },
  { id: "db", label: "Database", icon: Database, x: 50, y: 12, color: "#EF4444" },
];

const ATTACK_PATH_EDGES: [string, string][] = [
  ["internet", "lb"],
  ["lb", "ec2"],
  ["ec2", "iam"],
  ["iam", "db"],
];

const ALL_GRAPH_EDGES: [string, string][] = [
  ["internet", "lb"],
  ["lb", "ec2"],
  ["lb", "iam"],
  ["ec2", "iam"],
  ["ec2", "db"],
  ["iam", "db"],
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
    <section className="brand-stripes-bg relative bg-[#0B1C3D] py-28 px-6 overflow-hidden">
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

        <div className="mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-[520px_1fr] lg:gap-[80px]">
          {/* Left: step explanation */}
          <div className="min-w-0 space-y-24">
            {STEPS.map((step, i) => (
              <div
                key={step.step}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="min-h-[45vh]"
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
                  transition={{ duration: 0.3 }}
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

          {/* Right: attack graph — constrained and anchored */}
          <div className="lg:sticky lg:top-28 lg:self-start w-full max-w-[620px] lg:ml-auto min-w-0">
            <StoryViz activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}

const PATH_NODE_ORDER = ["internet", "lb", "ec2", "iam", "db"] as const;

function StoryViz({ activeStep }: { activeStep: number }) {
  const [simulationIndex, setSimulationIndex] = useState(0);
  const showNodesFromStep0 = activeStep >= 0;
  const showGraphLines = activeStep >= 1;
  const showAttackPath = activeStep >= 2;
  const showSimulationPulse = activeStep >= 3;
  const isRemediation = activeStep >= 4;

  useEffect(() => {
    if (activeStep !== 3) return;
    const id = setInterval(() => {
      setSimulationIndex((i) => (i + 1) % PATH_NODE_ORDER.length);
    }, 550);
    return () => clearInterval(id);
  }, [activeStep]);

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
      <div className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden p-10">
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
            <linearGradient id="storyRemediationGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
          </defs>

          {/* Step 2: thin graph lines (all edges) */}
          {ALL_GRAPH_EDGES.map(([a, b], i) => {
            const n1 = getNode(a);
            const n2 = getNode(b);
            const isAttackEdge =
              ATTACK_PATH_EDGES.some(
                ([x, y]) => (x === a && y === b) || (x === b && y === a)
              ) && showAttackPath;
            return (
              <g key={`${a}-${b}`}>
                {showGraphLines && (
                  <line
                    x1={n1.x}
                    y1={n1.y}
                    x2={n2.x}
                    y2={n2.y}
                    stroke={
                      isAttackEdge
                        ? isRemediation
                          ? "url(#storyRemediationGrad)"
                          : "url(#storyAttackGrad)"
                        : "rgba(255,255,255,0.12)"
                    }
                    strokeWidth={isAttackEdge ? 2 : 0.8}
                    strokeLinecap="round"
                  />
                )}
                {isAttackEdge && showAttackPath && (
                  <PathPulse
                    from={n1}
                    to={n2}
                    green={isRemediation}
                    run={showAttackPath}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Step 1: nodes fade in gradually */}
        {NODES.map((node) => {
          const nodeOrder = NODE_IDS.indexOf(node.id as (typeof NODE_IDS)[number]);
          const visible = showNodesFromStep0 && nodeOrder >= 0;
          const isOnPath = PATH_NODE_ORDER.includes(node.id as (typeof PATH_NODE_ORDER)[number]);
          const pathOrderIndex = PATH_NODE_ORDER.indexOf(node.id as (typeof PATH_NODE_ORDER)[number]);
          const litForSimulation =
            activeStep === 3 && isOnPath && pathOrderIndex === simulationIndex;
          const remediated = isRemediation && isOnPath;

          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: visible ? 1 : 0,
                scale: visible ? 1 : 0.8,
              }}
              transition={{
                duration: 0.4,
                delay: visible ? nodeOrder * 0.12 : 0,
              }}
            >
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-xl border-2 bg-[#0B1C3D]"
                animate={{
                  borderColor: remediated
                    ? "#22C55E"
                    : litForSimulation
                      ? "#3B82F6"
                      : node.id === "db" && showAttackPath && !isRemediation
                        ? "#EF4444"
                        : isOnPath && showAttackPath
                          ? isRemediation
                            ? "#22C55E"
                            : "#F97316"
                          : "#475569",
                  boxShadow: remediated
                    ? "0 0 20px rgba(34,197,94,0.5)"
                    : litForSimulation
                      ? "0 0 28px rgba(59,130,246,0.6)"
                      : node.id === "db" && showAttackPath && !isRemediation
                        ? "0 0 24px rgba(239,68,68,0.5)"
                        : isOnPath && showAttackPath
                          ? "0 0 16px rgba(249,115,22,0.4)"
                          : "0 0 8px rgba(255,255,255,0.06)",
                }}
                transition={{ duration: 0.35 }}
              >
                <node.icon
                  className="h-6 w-6"
                  style={{
                    color: remediated
                      ? "#22C55E"
                      : litForSimulation
                        ? "#3B82F6"
                        : node.id === "db" && showAttackPath && !isRemediation
                          ? "#EF4444"
                          : isOnPath && showAttackPath
                            ? isRemediation
                              ? "#22C55E"
                              : node.color
                            : "#64748B",
                  }}
                />
              </motion.div>
              <span className="mt-1.5 text-[10px] font-medium text-slate-400">
                {node.label}
              </span>
            </motion.div>
          );
        })}

        {/* Step 5: Attack blocked label */}
        {isRemediation && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#22C55E]/20 px-4 py-2 ring-1 ring-[#22C55E]/40"
          >
            <ShieldCheck className="h-5 w-5 text-[#22C55E]" />
            <span className="text-sm font-semibold text-[#22C55E]">
              Attack blocked
            </span>
          </motion.div>
        )}
        </div>
      </div>
    </div>
  );
}

function PathPulse({
  from,
  to,
  green,
  run,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  green: boolean;
  run: boolean;
}) {
  return (
    <motion.circle
      r="2"
      fill={green ? "#22C55E" : "#EF4444"}
      style={{
        filter: green
          ? "drop-shadow(0 0 4px #22C55E)"
          : "drop-shadow(0 0 4px #EF4444)",
      }}
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={
        run
          ? {
              cx: [from.x, to.x],
              cy: [from.y, to.y],
              opacity: [0.8, 0.8, 0],
            }
          : {}
      }
      transition={{
        duration: 1.2,
        repeat: run ? Infinity : 0,
        repeatDelay: 0.4,
      }}
    />
  );
}
