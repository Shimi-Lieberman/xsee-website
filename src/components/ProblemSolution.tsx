"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionFadeIn from "./SectionFadeIn";
import AnimatedCounter from "./AnimatedCounter";
import {
  Globe,
  Server,
  KeyRound,
  Database,
  Loader2,
  Cpu,
  ChevronRight,
} from "lucide-react";

const ALERT_CARDS = [
  { value: 10231, label: "alerts", severity: "default" },
  { value: 642, label: "findings", severity: "default" },
  { value: 39, label: "critical", severity: "critical" },
];

const PIPELINE_NODES = [
  { id: "internet", label: "Internet", icon: Globe, x: 50, y: 88, color: "#F97316" },
  { id: "lb", label: "Load Balancer", icon: Loader2, x: 50, y: 68, color: "#3B82F6" },
  { id: "ec2", label: "EC2", icon: Server, x: 38, y: 48, color: "#3B82F6" },
  { id: "iam", label: "IAM Role", icon: KeyRound, x: 62, y: 48, color: "#8B5CF6" },
  { id: "db", label: "Database", icon: Database, x: 50, y: 12, color: "#EF4444" },
];

const PATH_NODES = [
  { id: "internet", label: "Internet", icon: Globe, color: "#F97316" },
  { id: "bastion", label: "Bastion", icon: Server, color: "#3B82F6" },
  { id: "iam", label: "IAM", icon: KeyRound, color: "#8B5CF6" },
  { id: "db", label: "Database", icon: Database, color: "#EF4444" },
];

const GRAPH_EDGES: [string, string][] = [
  ["internet", "lb"],
  ["lb", "ec2"],
  ["lb", "iam"],
  ["ec2", "iam"],
  ["ec2", "db"],
  ["iam", "db"],
];

function getNode(id: string) {
  return PIPELINE_NODES.find((n) => n.id === id)!;
}

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="section-gradient-light py-28 px-6"
    >
      <div className="mx-auto max-w-7xl">
        <SectionFadeIn>
          <h2 className="text-center text-4xl font-semibold tracking-tight text-slate-900">
            Security teams are drowning in alerts.
          </h2>
        </SectionFadeIn>
        <SectionFadeIn>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
            XSEE compresses thousands of signals into a single verified attack
            path.
          </p>
        </SectionFadeIn>

        {/* Horizontal transformation pipeline */}
        <div className="mt-16 overflow-x-auto pb-4">
          <div className="flex min-w-max items-stretch justify-center gap-4 px-2 md:gap-6 lg:gap-8">
            {/* Step 1 — Alert chaos */}
            <PipelineStage title="Alert chaos" className="min-w-[180px] max-w-[200px]">
              <div className="relative flex h-[140px] items-center justify-center">
                {ALERT_CARDS.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={
                      inView
                        ? {
                            opacity: 1,
                            y: [0, -3, 0],
                            transition: {
                              opacity: { delay: i * 0.1 + 0.2, duration: 0.35 },
                              y: {
                                duration: 2.5 + i * 0.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5 + i * 0.2,
                              },
                            },
                          }
                        : { opacity: 0, y: 8 }
                    }
                    className="absolute rounded-xl border bg-white px-3 py-2 shadow-md"
                    style={{
                      left: `${12 + i * 28}%`,
                      top: `${20 + i * 12}%`,
                      transform: `translate(-50%, -50%) rotate(${-2 + i * 1.5}deg)`,
                      zIndex: 3 - i,
                      borderColor:
                        card.severity === "critical"
                          ? "#FECACA"
                          : "#E2E8F0",
                    }}
                  >
                    <p
                      className={`text-sm font-bold ${
                        card.severity === "critical"
                          ? "text-[#EF4444]"
                          : "text-slate-800"
                      }`}
                    >
                      <AnimatedCounter
                        value={card.value}
                        duration={1}
                        delay={i * 0.15 + 0.5}
                      />
                    </p>
                    <p className="text-[10px] text-slate-500">{card.label}</p>
                  </motion.div>
                ))}
              </div>
            </PipelineStage>

            <PipelineConnector inView={inView} delay={0.4} />

            {/* Step 2 — Correlation Engine */}
            <PipelineStage title="Correlation Engine" className="min-w-[160px] max-w-[180px]">
              <div className="relative flex h-[140px] items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-5 py-6 shadow-md"
                  style={{
                    boxShadow: inView
                      ? "0 0 32px rgba(59,130,246,0.12), 0 0 0 1px rgba(139,92,246,0.08)"
                      : undefined,
                  }}
                >
                  <Cpu className="h-10 w-10 text-[#3B82F6]" />
                  <span className="mt-2 text-xs font-semibold text-slate-700">
                    Correlation Engine
                  </span>
                </motion.div>
                {/* Flow dots into engine */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute h-1.5 w-1.5 rounded-full bg-[#3B82F6]/60"
                    style={{ left: "5%", top: `${30 + i * 25}%` }}
                    initial={{ opacity: 0, x: -8 }}
                    animate={
                      inView
                        ? {
                            opacity: [0, 0.8, 0],
                            x: [0, 24, 48],
                            transition: {
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.4,
                            },
                          }
                        : {}
                    }
                  />
                ))}
              </div>
            </PipelineStage>

            <PipelineConnector inView={inView} delay={0.6} />

            {/* Step 3 — Attack graph */}
            <PipelineStage title="Attack graph" className="min-w-[200px] max-w-[240px]">
              <div className="relative h-[140px] w-full">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient
                      id="psGraphGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  {GRAPH_EDGES.map(([a, b], i) => {
                    const n1 = getNode(a);
                    const n2 = getNode(b);
                    return (
                      <motion.line
                        key={`${a}-${b}`}
                        x1={n1.x}
                        y1={n1.y}
                        x2={n2.x}
                        y2={n2.y}
                        stroke="url(#psGraphGrad)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        initial={{ opacity: 0 }}
                        animate={
                          inView ? { opacity: 0.5 } : { opacity: 0 }
                        }
                        transition={{
                          duration: 0.5,
                          delay: 0.7 + i * 0.08,
                        }}
                      />
                    );
                  })}
                </svg>
                {PIPELINE_NODES.map((node, i) => (
                  <motion.div
                    key={node.id}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={
                      inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }
                    }
                    transition={{
                      delay: 0.65 + i * 0.07,
                      duration: 0.35,
                    }}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg border-2 bg-white shadow-sm"
                      style={{
                        borderColor: node.color,
                        boxShadow: `0 0 10px ${node.color}30`,
                      }}
                    >
                      <node.icon className="h-3.5 w-3.5" style={{ color: node.color }} />
                    </div>
                    <span className="mt-0.5 text-[8px] font-medium text-slate-600">
                      {node.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </PipelineStage>

            <PipelineConnector inView={inView} delay={0.9} />

            {/* Step 4 — Attack path */}
            <PipelineStage title="Attack path" className="min-w-[220px] max-w-[260px]">
              <div className="flex h-[140px] items-center justify-center">
                <div className="flex items-center gap-1">
                  {PATH_NODES.map((node, i) => (
                    <div key={node.id} className="flex items-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: 1 + i * 0.1,
                          duration: 0.35,
                        }}
                        className="flex flex-col items-center"
                      >
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white shadow-md"
                          style={{
                            borderColor: node.color,
                            boxShadow: `0 0 14px ${node.color}40`,
                          }}
                        >
                          <node.icon
                            className="h-4 w-4"
                            style={{ color: node.color }}
                          />
                        </div>
                        <span className="mt-1 text-[9px] font-medium text-slate-600">
                          {node.label}
                        </span>
                      </motion.div>
                      {i < PATH_NODES.length - 1 && (
                        <PathSegment
                          fromColor={PATH_NODES[i].color}
                          toColor={PATH_NODES[i + 1].color}
                          inView={inView}
                          delay={1.15 + i * 0.12}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </PipelineStage>

            <PipelineConnector inView={inView} delay={1.1} />

            {/* Step 5 — Result */}
            <PipelineStage title="Result" className="min-w-[180px] max-w-[200px]">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.4 }}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-300"
                style={{
                  boxShadow: inView
                    ? "0 0 24px rgba(34,197,94,0.15), 0 4px 12px rgba(0,0,0,0.06)"
                    : undefined,
                }}
              >
                <p className="text-2xl font-bold text-[#22C55E]">1</p>
                <p className="text-xs text-slate-600">attack path discovered</p>
                <p className="mt-3 text-2xl font-bold text-[#22C55E]">1</p>
                <p className="text-xs text-slate-600">fix required</p>
              </motion.div>
            </PipelineStage>
          </div>
        </div>
      </div>
    </section>
  );
}

function PipelineStage({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 ${className}`}
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.04), 0 0 0 1px rgba(255,255,255,0.8)",
      }}
    >
      <span className="mb-3 block text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </span>
      {children}
    </div>
  );
}

function PipelineConnector({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div className="flex flex-shrink-0 items-center justify-center px-1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay, duration: 0.3 }}
        className="flex items-center gap-0.5"
      >
        <motion.div
          className="h-0.5 w-4 rounded-full bg-[#3B82F6]/40"
          animate={
            inView
              ? { opacity: [0.5, 1, 0.5] }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <ChevronRight className="h-5 w-5 text-slate-400" />
      </motion.div>
    </div>
  );
}

function PathSegment({
  fromColor,
  toColor,
  inView,
  delay,
}: {
  fromColor: string;
  toColor: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <div className="relative h-0.5 w-6 flex-shrink-0 sm:w-8">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${fromColor}, ${toColor})`,
          boxShadow: "0 0 8px rgba(59,130,246,0.35)",
        }}
      />
      <motion.div
        className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white"
        style={{
          boxShadow: "0 0 6px #3B82F6",
        }}
        initial={{ x: 0, opacity: 0 }}
        animate={
          inView
            ? {
                x: [0, 24],
                opacity: [0.8, 0],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  delay,
                },
              }
            : {}
        }
      />
    </div>
  );
}
