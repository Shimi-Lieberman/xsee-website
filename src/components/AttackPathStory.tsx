"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Loader2,
  Server,
  KeyRound,
  Shield,
  HardDrive,
  Database,
  ShieldCheck,
} from "lucide-react";

const STEPS = [
  { title: "Internet exposure detected", nodeId: "internet" },
  { title: "Bastion host discovered", nodeId: "ec2" },
  { title: "IAM privilege escalation", nodeId: "iam" },
  { title: "Crown jewel at risk", nodeId: "rds" },
  { title: "XSEE remediation applied", nodeId: "remediation" },
];

const NODES = [
  { id: "internet", label: "Internet", icon: Globe, x: 50, y: 81 },
  { id: "lb", label: "Load Balancer", icon: Loader2, x: 50, y: 62 },
  { id: "ec2", label: "EC2", icon: Server, x: 30, y: 44 },
  { id: "iam", label: "IAM Role", icon: KeyRound, x: 70, y: 44 },
  { id: "sg", label: "Security Group", icon: Shield, x: 20, y: 56 },
  { id: "rds", label: "RDS", icon: Database, x: 50, y: 19 },
];

const ATTACK_PATH = ["internet", "lb", "ec2", "iam", "rds"];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export default function AttackPathStory() {
  const containerRef = useRef<HTMLDivElement>(null);
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
        {
          root: null,
          rootMargin: "-15% 0px -60% 0px",
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="attack-path-intelligence"
      ref={containerRef}
      className="brand-stripes-bg relative overflow-hidden bg-[#0B1C3D] py-10 px-6 md:py-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Attack Path Intelligence
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-base text-slate-400 md:text-lg">
            Watch how XSEE discovers and stops real cloud attack paths.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-4 lg:grid-cols-[360px_1fr] lg:gap-6 lg:items-stretch">
          {/* Left: compact stacked step cards */}
          <div className="min-w-0 space-y-1.5">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="min-h-[70px]"
              >
                <motion.div
                  className="rounded-lg border border-slate-700/50 bg-[#0B1C3D]/80 p-4 backdrop-blur-sm transition-shadow duration-300"
                  animate={{
                    borderColor: activeStep === i ? "rgba(59,130,246,0.5)" : "rgba(148,163,184,0.18)",
                    boxShadow: activeStep === i ? "0 0 20px rgba(59,130,246,0.15)" : "0 1px 8px rgba(0,0,0,0.2)",
                    opacity: activeStep === i ? 1 : 0.72,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold ${
                        activeStep === i ? "bg-[#3B82F6] text-white" : "bg-slate-700/50 text-slate-400"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div className="ml-4 h-2 w-px bg-slate-600/50" aria-hidden />
                )}
              </div>
            ))}
          </div>

          {/* Right: sticky visualization */}
          <div className="lg:sticky lg:top-20 w-full max-w-[500px] min-h-[280px] lg:min-h-[320px] lg:ml-auto min-w-0">
            <AttackPathViz activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}

function AttackPathViz({ activeStep }: { activeStep: number }) {
  const isRemediation = activeStep >= 4;
  const pathRevealUpTo = Math.min(activeStep + 1, 4);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-[#0B1C3D] shadow-xl">
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
      <div className="relative mx-auto flex min-h-[260px] w-full items-center justify-center overflow-visible p-8 md:min-h-[320px] md:p-10">
        <div className="relative aspect-square w-full max-w-[360px] flex-shrink-0 overflow-visible">
        <svg
          className="block h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="attackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <linearGradient id="remediationGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
          </defs>
          {/* All edges - faint */}
          {[
            ["internet", "lb"],
            ["lb", "ec2"],
            ["lb", "iam"],
            ["ec2", "iam"],
            ["ec2", "sg"],
            ["iam", "rds"],
            ["ec2", "rds"],
          ].map(([a, b], i) => {
            const n1 = getNode(a);
            const n2 = getNode(b);
            const pathIndex = ATTACK_PATH.indexOf(a) >= 0 && ATTACK_PATH.indexOf(b) >= 0
              && ATTACK_PATH.indexOf(a) + 1 === ATTACK_PATH.indexOf(b)
              ? ATTACK_PATH.indexOf(a)
              : -1;
            const showAttackLine = pathIndex >= 0 && pathIndex < pathRevealUpTo;
            const showRemediation = isRemediation && pathIndex >= 0;
            return (
              <g key={`${a}-${b}`}>
                <line
                  x1={n1.x}
                  y1={n1.y}
                  x2={n2.x}
                  y2={n2.y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.6"
                />
                {showAttackLine && (
                  <>
                    <line
                      x1={n1.x}
                      y1={n1.y}
                      x2={n2.x}
                      y2={n2.y}
                      stroke={showRemediation ? "url(#remediationGrad)" : "url(#attackGrad)"}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <LinePulse
                      from={n1}
                      to={n2}
                      delay={pathIndex * 0.3}
                      green={showRemediation}
                    />
                  </>
                )}
              </g>
            );
            })}
        </svg>

        {/* Entry arrow - Step 1 */}
        {activeStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-1/2 top-[81%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rotate-45 border-b-2 border-r-2 border-[#F97316]" />
              <span className="mt-1 text-[10px] text-slate-400">Entry</span>
            </div>
          </motion.div>
        )}

        {/* Nodes */}
        {NODES.map((node) => {
          const stepForNode = STEPS.findIndex((s) => s.nodeId === node.id);
          const isActive =
            (stepForNode >= 0 && activeStep === stepForNode) ||
            (node.id === "lb" && activeStep >= 1) ||
            (node.id === "ec2" && activeStep >= 1) ||
            (node.id === "iam" && activeStep >= 2) ||
            (node.id === "rds" && activeStep >= 3);
          const isCrownJewel = node.id === "rds" && activeStep >= 3 && activeStep < 4;
          const isRemediated = isRemediation && ATTACK_PATH.includes(node.id);

          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: isActive ? 1.1 : 1,
                filter: isActive ? "drop-shadow(0 0 12px currentColor)" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-xl border-2 bg-[#0B1C3D] shadow-inner"
                animate={{
                  borderColor: isRemediated
                    ? "#22C55E"
                    : isCrownJewel
                      ? "#EF4444"
                      : isActive
                        ? "#3B82F6"
                        : "#475569",
                  boxShadow: isRemediated
                    ? "0 0 24px rgba(34,197,94,0.5)"
                    : isCrownJewel
                      ? "0 0 28px rgba(239,68,68,0.6)"
                      : isActive
                        ? "0 0 20px rgba(59,130,246,0.45)"
                        : "0 0 8px rgba(255,255,255,0.08)",
                }}
                transition={{ duration: 0.3 }}
              >
                <node.icon
                  className="h-6 w-6"
                  style={{
                    color: isRemediated ? "#22C55E" : isCrownJewel ? "#EF4444" : isActive ? "#3B82F6" : "#64748B",
                  }}
                />
              </motion.div>
              <span className="mt-2 text-[10px] font-medium tracking-tight text-slate-300">
                {node.label}
              </span>
            </motion.div>
          );
        })}

        {/* Remediation label - Step 5 */}
        {isRemediation && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#22C55E]/15 px-3 py-2 ring-1 ring-[#22C55E]/30"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#22C55E]" />
            <span className="text-[10px] font-semibold tracking-tight text-[#22C55E]">
              Remediation applied
            </span>
          </motion.div>
        )}
        </div>
      </div>
    </div>
  );
}

function LinePulse({
  from,
  to,
  delay,
  green,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay: number;
  green: boolean;
}) {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  return (
    <motion.circle
      r="1.5"
      fill={green ? "#22C55E" : "#EF4444"}
      style={{
        filter: green ? "drop-shadow(0 0 3px #22C55E)" : "drop-shadow(0 0 3px #EF4444)",
      }}
      initial={{ cx: from.x, cy: from.y }}
      animate={{ cx: [from.x, to.x], cy: [from.y, to.y] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 0.5,
        delay,
      }}
    />
  );
}
