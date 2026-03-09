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
  { id: "internet", label: "Internet", icon: Globe, x: 50, y: 88 },
  { id: "lb", label: "Load Balancer", icon: Loader2, x: 50, y: 68 },
  { id: "ec2", label: "EC2", icon: Server, x: 38, y: 48 },
  { id: "iam", label: "IAM Role", icon: KeyRound, x: 62, y: 48 },
  { id: "sg", label: "Security Group", icon: Shield, x: 28, y: 58 },
  { id: "rds", label: "RDS", icon: Database, x: 50, y: 18 },
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
            if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
              setActiveStep(i);
            }
          });
        },
        {
          root: null,
          rootMargin: "-20% 0px -50% 0px",
          threshold: [0, 0.2, 0.5, 1],
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
      className="bg-[#0B1C3D] py-28 px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            Attack Path Intelligence
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Watch how XSEE discovers and stops real cloud attack paths.
          </p>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left: scrollable steps */}
          <div className="space-y-24">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="min-h-[40vh]"
              >
                <motion.div
                  className="rounded-xl border border-slate-700/50 bg-[#0B1C3D]/60 p-8 backdrop-blur-sm"
                  animate={{
                    borderColor: activeStep === i ? "rgba(59,130,246,0.5)" : "rgba(148,163,184,0.2)",
                    boxShadow: activeStep === i ? "0 0 24px rgba(59,130,246,0.15)" : "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#3B82F6]">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {step.title}
                  </h3>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right: sticky visualization */}
          <div className="lg:sticky lg:top-28 lg:self-start">
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
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative aspect-square min-h-[320px] p-6">
        <svg
          className="absolute inset-0 h-full w-full p-6"
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
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.8"
                />
                {showAttackLine && (
                  <>
                    <line
                      x1={n1.x}
                      y1={n1.y}
                      x2={n2.x}
                      y2={n2.y}
                      stroke={showRemediation ? "url(#remediationGrad)" : "url(#attackGrad)"}
                      strokeWidth="1.8"
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
            className="absolute left-1/2 top-[88%] -translate-x-1/2 -translate-y-1/2"
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
                className="flex h-12 w-12 items-center justify-center rounded-xl border-2 bg-[#0B1C3D]"
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
              <span className="mt-1.5 text-[10px] font-medium text-slate-400">
                {node.label}
              </span>
            </motion.div>
          );
        })}

        {/* Remediation label - Step 5 */}
        {isRemediation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#22C55E]/20 px-4 py-2 ring-1 ring-[#22C55E]/40"
          >
            <ShieldCheck className="h-5 w-5 text-[#22C55E]" />
            <span className="text-sm font-semibold text-[#22C55E]">
              Remediation applied
            </span>
          </motion.div>
        )}
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
      r="2"
      fill={green ? "#22C55E" : "#EF4444"}
      style={{
        filter: green ? "drop-shadow(0 0 4px #22C55E)" : "drop-shadow(0 0 4px #EF4444)",
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
