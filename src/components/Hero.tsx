"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Globe,
  Server,
  KeyRound,
  Crown,
} from "lucide-react";
import HeroNetworkViz from "@/components/background/HeroNetworkViz";
import AttackPulseOverlay from "@/components/background/AttackPulseOverlay";

const NODE_COLORS = {
  internet: "#F97316",
  loadBalancer: "#3B82F6",
  bastion: "#3B82F6",
  iam: "#8B5CF6",
  db: "#EF4444",
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#0B1C3D] px-4 pt-28 pb-24 sm:px-6 sm:pt-32 sm:pb-28">
      <div className="absolute inset-0 z-0">
        <HeroNetworkViz />
      </div>
      <AttackPulseOverlay />
      <CloudTopology />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <Link
              href="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#0B1C3D] rounded-lg"
              aria-label="XSEE Home"
            >
              <Image
                src="/xsee-logo.png"
                alt="XSEE — Trust nothing. Prove everything."
                width={200}
                height={52}
                className="h-12 w-auto object-contain object-left sm:h-14"
                priority
              />
            </Link>
            <h1 className="mt-4 text-hero-title tracking-tight text-white sm:mt-6">
              See How Attackers Can Breach Your Cloud — Before They Do
            </h1>
            <p className="mt-5 text-body-lg text-slate-400 sm:mt-6 sm:text-xl">
              XSEE discovers real attack paths in your AWS environment and validates each step with API evidence—not assumptions.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#contact"
                className="btn-enterprise btn-enterprise-primary flex h-12 min-w-[180px] items-center justify-center rounded-xl bg-[#3B82F6] px-6 text-base font-semibold text-white shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563EB]"
              >
                Request Demo
              </Link>
              <Link
                href="#how-it-works"
                className="flex h-12 min-w-[200px] items-center justify-center rounded-xl border border-white/30 bg-transparent px-6 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:-translate-y-0.5"
              >
                See How It Works ↓
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:items-start">
            <FloatingProductPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

const TOPOLOGY_NODES = [
  { x: 15, y: 20 }, { x: 85, y: 15 }, { x: 45, y: 35 }, { x: 70, y: 55 },
  { x: 25, y: 60 }, { x: 55, y: 75 }, { x: 10, y: 80 }, { x: 90, y: 70 },
  { x: 35, y: 45 }, { x: 65, y: 40 }, { x: 20, y: 50 }, { x: 80, y: 85 },
];

function CloudTopology() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
      {/* Faint nodes with slow drift */}
      {TOPOLOGY_NODES.map((node, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-white"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
      {/* Subtle connection lines (SVG) */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        {[
          [15, 20, 45, 35], [45, 35, 70, 55], [25, 60, 55, 75], [70, 55, 90, 70],
          [35, 45, 65, 40], [10, 80, 25, 60],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={`${x1}%`}
            y1={`${y1}%`}
            x2={`${x2}%`}
            y2={`${y2}%`}
            stroke="url(#lineGrad)"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}

const STEP_LABELS = [
  "Initial Access",
  "Lateral Movement",
  "Privilege Escalation",
];

const pathNodes = [
  {
    id: "internet",
    label: "Internet",
    subtitle: "Entry Point",
    icon: Globe,
    color: "#3B82F6",
    glow: "0 0 24px rgba(59,130,255,0.22)",
    glowHover: "0 0 32px rgba(59,130,255,0.38)",
  },
  {
    id: "bastion",
    label: "Bastion Host",
    subtitle: "Lateral Access",
    icon: Server,
    color: "#ff7a00",
    glow: "0 0 24px rgba(255,122,0,0.22)",
    glowHover: "0 0 32px rgba(255,122,0,0.38)",
  },
  {
    id: "iam",
    label: "IAM Privilege",
    subtitle: "Privilege Escalation",
    icon: KeyRound,
    color: "#8B5CF6",
    glow: "0 0 24px rgba(139,92,246,0.22)",
    glowHover: "0 0 32px rgba(139,92,246,0.38)",
  },
  {
    id: "db",
    label: "Internal DB",
    subtitle: "Crown Jewel",
    icon: Crown,
    color: "#EF4444",
    glow: "0 0 32px rgba(239,68,68,0.4)",
    glowHover: "0 0 44px rgba(239,68,68,0.55)",
    crownJewel: true,
  },
];

function FloatingProductPreview() {
  return (
    <motion.div
      className="w-full max-w-md"
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-[24px] border"
        style={{
          background: "linear-gradient(180deg, #070d18 0%, #0b1320 100%)",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        }}
        whileHover={{
          boxShadow: "0 32px 88px rgba(0,0,0,0.5)",
        }}
        transition={{ duration: 0.25 }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 border-b py-4"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            paddingLeft: 32,
            paddingRight: 32,
          }}
        >
          <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-100">
            Top Active Attack Path
          </h3>
        </div>

        {/* Content: path + strip */}
        <div
          className="relative overflow-hidden px-8 py-8"
          style={{ padding: "32px 40px" }}
        >
          {/* Subtle orange/red glow around path area */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 90% 60% at 50% 45%, rgba(255,80,40,0.06) 0%, transparent 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background: "linear-gradient(180deg, transparent 30%, rgba(239,68,68,0.03) 50%, transparent 70%)",
            }}
          />

          {/* Attack path: evenly spaced nodes, step labels above line, one continuous glowing line */}
          <div className="attack-path-container relative mx-auto w-full max-w-[900px]">
            {/* Row 1: nodes evenly spaced */}
            <div className="flex justify-between gap-4">
              {pathNodes.map((node) => (
                <div key={node.id} className="flex flex-shrink-0 flex-col items-center">
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2 md:h-[72px] md:w-[72px]"
                    style={{
                      borderColor: node.color,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(7,13,24,0.95) 100%)",
                      boxShadow: node.crownJewel ? undefined : node.glow,
                    }}
                    animate={
                      node.crownJewel
                        ? {
                            boxShadow: [
                              "0 0 32px rgba(239,68,68,0.4)",
                              "0 0 44px rgba(239,68,68,0.55)",
                              "0 0 32px rgba(239,68,68,0.4)",
                            ],
                          }
                        : undefined
                    }
                    transition={
                      node.crownJewel
                        ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.2 }
                    }
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: node.glowHover,
                    }}
                  >
                    <node.icon
                      className="h-7 w-7 md:h-8 md:w-8"
                      style={{ color: node.color }}
                    />
                  </motion.div>
                  <span className="mt-2.5 max-w-[90px] text-center text-sm font-medium text-slate-200">
                    {node.label}
                  </span>
                  {node.subtitle && (
                    <span
                      className={`mt-0.5 text-xs ${node.crownJewel ? "text-amber-400/90" : "text-slate-500"}`}
                    >
                      {node.subtitle}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Step labels above line segments: Internet→Bastion | Bastion→IAM | IAM→DB */}
            <div className="mt-4 flex w-full">
              {STEP_LABELS.map((label) => (
                <div
                  key={label}
                  className="flex-1 text-center text-xs text-slate-400"
                >
                  {label}
                </div>
              ))}
            </div>
            {/* One continuous attack signal line + pulse (live replay feel) */}
            <div className="relative mt-1 w-full overflow-hidden rounded-[3px]" style={{ height: 3 }}>
              <div
                className="absolute inset-0 rounded-[3px]"
                style={{
                  background: "linear-gradient(90deg, #ef4444, #f97316)",
                  boxShadow: "0 0 16px rgba(239,68,68,0.35)",
                }}
              />
              <motion.div
                className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white"
                style={{ boxShadow: "0 0 12px rgba(255,200,150,0.9)" }}
                animate={{ x: ["0%", "100%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
              />
            </div>
          </div>

          {/* Metrics row: status indicators + Fix available */}
          <div
            className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/[0.06] pt-6 md:justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
              <span className="text-xs text-slate-400">
                Confidence: <span className="font-semibold text-white">92%</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#F97316]" />
              <span className="text-xs text-slate-400">
                Detection Gap: <span className="font-semibold text-white">38%</span>
              </span>
            </div>
            <button
              type="button"
              className="rounded-full border text-xs font-medium transition-colors hover:opacity-90"
              style={{
                background: "rgba(34,197,94,0.14)",
                borderColor: "rgba(34,197,94,0.35)",
                color: "#22C55E",
                padding: "8px 14px",
              }}
            >
              Fix available
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
