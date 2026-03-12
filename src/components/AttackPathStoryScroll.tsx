"use client";

import { useRef, useState, useEffect, useId } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  KeyRound,
  Server,
  Database,
  CheckCircle2,
} from "lucide-react";
import { LABEL_OFFSET_Y } from "@/lib/graphLayout";

const STEPS = [
  {
    step: 1,
    title: "How Cloud Breaches Happen",
    body: "Internet exposure → privilege escalation → lateral movement → critical data access.",
  },
  {
    step: 2,
    title: "Xsee Maps Your Infrastructure",
    body: "Every resource and connection discovered. Edges show how access flows.",
  },
  {
    step: 3,
    title: "Attack Path Discovery",
    body: "Xsee highlights the path attackers would take: Internet → IAM → EC2 → Database.",
  },
  {
    step: 4,
    title: "Breach Prevention",
    body: "Xsee recommends and tracks remediation. The attack path is closed.",
  },
] as const;

const BREACH_STEP_ICONS = [
  { label: "Internet", icon: Globe },
  { label: "IAM", icon: KeyRound },
  { label: "Compute", icon: Server },
  { label: "Data", icon: Database },
] as const;

/* Balanced layout in safe zone 14–86; generous spacing between nodes. Indices must match INFRA_EDGES. */
const INFRA_NODES = [
  { id: "internet", label: "Internet", cx: 24, cy: 78 },
  { id: "iam", label: "IAM Role", cx: 28, cy: 26 },
  { id: "ec2", label: "EC2", cx: 50, cy: 50 },
  { id: "db", label: "Database", cx: 76, cy: 22 },
  { id: "lb", label: "Load Balancer", cx: 38, cy: 66 },
  { id: "s3", label: "S3 Bucket", cx: 20, cy: 84 },
  { id: "sg", label: "Security Group", cx: 70, cy: 70 },
] as const;

/* [fromIndex, toIndex] into INFRA_NODES. No duplicates. */
const INFRA_EDGES: ReadonlyArray<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [0, 4], [4, 2], [1, 5], [2, 6], [6, 3],
];

const ATTACK_PATH_INDICES: ReadonlyArray<number> = [0, 1, 2, 3];
const ATTACK_PATH_SET = new Set(ATTACK_PATH_INDICES);

const REMEDIATIONS = [
  "IAM permission removed",
  "Network access restricted",
  "Database isolated",
] as const;

function isAttackEdge(a: number, b: number): boolean {
  const ia = ATTACK_PATH_INDICES.indexOf(a);
  const ib = ATTACK_PATH_INDICES.indexOf(b);
  return ia >= 0 && ib >= 0 && Math.abs(ia - ib) === 1;
}

export default function AttackPathStoryScroll() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveStep(i);
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
    <section className="relative overflow-hidden bg-[#0f172a] py-10 px-6 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            From Breach to Prevention
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-base text-slate-400 md:text-lg">
            One flow: how breaches happen, how Xsee maps and highlights the path, then blocks it.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 items-start gap-4 lg:grid-cols-[360px_1fr] lg:gap-6 lg:items-stretch">
          {/* Left: compact stacked step cards */}
          <div className="min-w-0 space-y-1.5">
            {STEPS.map((step, i) => (
              <div
                key={`step-${i}`}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="min-h-[70px]"
              >
                <motion.div
                  className="rounded-lg border border-slate-700/50 bg-[#0B1C3D]/80 p-4 backdrop-blur-sm transition-shadow duration-300"
                  animate={{
                    borderColor:
                      activeStep === i
                        ? "rgba(59,130,246,0.5)"
                        : "rgba(148,163,184,0.18)",
                    boxShadow:
                      activeStep === i
                        ? "0 0 20px rgba(59,130,246,0.15)"
                        : "0 1px 8px rgba(0,0,0,0.2)",
                    opacity: activeStep === i ? 1 : 0.72,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold ${
                        activeStep === i
                          ? "bg-[#3B82F6] text-white"
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

          {/* Right: sticky evolving visual */}
          <div className="lg:sticky lg:top-20 w-full max-w-[500px] min-h-[280px] lg:min-h-[320px] lg:ml-auto min-w-0">
            <AttackPathViz activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}

function AttackPathViz({ activeStep }: { activeStep: number }) {
  const svgId = useId();
  const showBreachSteps = activeStep === 0;
  const showInfra = activeStep >= 1;
  const showAttackPath = activeStep >= 2;
  const showPrevention = activeStep >= 3;

  const attackGradId = `ap-attack-${svgId}`;
  const safeGradId = `ap-safe-${svgId}`;

  /* Step 1: breach step icons in a row */
  if (showBreachSteps) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700/50 bg-[#0B1C3D] shadow-xl">
        <div className="flex flex-wrap items-center justify-center gap-3 p-6 md:p-8">
          {BREACH_STEP_ICONS.map((item, i) => (
            <motion.div
              key={`breach-${i}`}
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center rounded-lg border border-slate-600/50 bg-[#0B1C3D]/80 px-3 py-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="mt-1.5 text-[10px] font-medium text-slate-400">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  /* Steps 2–4: single graph that evolves */
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700/50 bg-[#0B1C3D] shadow-xl">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative flex min-h-[260px] w-full items-center justify-center overflow-visible p-8 md:min-h-[300px] md:p-10">
        <div className="relative aspect-[1.7] w-full max-w-[400px] overflow-visible">
          <svg
            className="block h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id={attackGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(249,115,22,0.9)" />
                <stop offset="100%" stopColor="rgba(239,68,68,0.9)" />
              </linearGradient>
              <linearGradient id={safeGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(37,99,235,0.6)" />
                <stop offset="100%" stopColor="rgba(37,99,235,0.9)" />
              </linearGradient>
            </defs>
            {INFRA_EDGES.map(([a, b], i) => {
              const n1 = INFRA_NODES[a];
              const n2 = INFRA_NODES[b];
              if (!n1 || !n2) return null;
              const attack = isAttackEdge(a, b);
              const stroke =
                showPrevention && attack
                  ? `url(#${safeGradId})`
                  : showAttackPath && attack
                    ? `url(#${attackGradId})`
                    : "rgba(148,163,184,0.14)";
              const strokeWidth = attack ? (showPrevention ? 2 : 1.8) : 0.5;
              return (
                <line
                  key={`edge-${i}`}
                  x1={n1.cx}
                  y1={n1.cy}
                  x2={n2.cx}
                  y2={n2.cy}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
              );
            })}
            {INFRA_NODES.map((node, i) => {
              const onPath = ATTACK_PATH_SET.has(i);
              const fill = showPrevention && onPath
                ? "rgba(37,99,235,0.75)"
                : showAttackPath && onPath
                  ? "rgba(239,68,68,0.85)"
                  : showInfra
                    ? "rgba(96,165,250,0.3)"
                    : "rgba(148,163,184,0.18)";
              const stroke = showPrevention && onPath
                ? "rgba(37,99,235,0.95)"
                : showAttackPath && onPath
                  ? "rgba(239,68,68,1)"
                  : "rgba(148,163,184,0.35)";
              return (
                <g key={node.id}>
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r={onPath ? 4.2 : 3.2}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={onPath ? 0.9 : 0.45}
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <text
                    x={node.cx}
                    y={node.cy + LABEL_OFFSET_Y}
                    textAnchor="middle"
                    className={
                      showPrevention && onPath
                        ? "fill-emerald-200 font-medium"
                        : showAttackPath && onPath
                          ? "fill-red-200 font-medium"
                          : "fill-slate-400 font-medium"
                    }
                    style={{ fontSize: 3.4 }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        {showPrevention && (
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            className="absolute bottom-4 left-3 right-3 rounded-xl border border-emerald-500/25 bg-[#0B1C3D]/95 px-4 py-3"
          >
            <ul className="space-y-1.5">
              {REMEDIATIONS.map((item, i) => (
                <li key={`remediation-${i}`} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
