"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Server, Database } from "lucide-react";
import HeroAttackPathViz from "@/components/background/HeroAttackPathViz";

const CINEMATIC_NODES = [
  {
    id: "internet",
    label: "Internet",
    subtitle: "Entry Point",
    icon: Globe,
    glow: "0 0 28px rgba(59,130,246,0.5), 0 0 40px rgba(239,68,68,0.25)",
  },
  {
    id: "bastion",
    label: "Bastion Host",
    subtitle: "EC2 Instance",
    icon: Server,
    glow: "0 0 28px rgba(255,140,0,0.55), 0 0 42px rgba(255,100,0,0.3)",
  },
  {
    id: "db",
    label: "Internal DB",
    subtitle: "Crown Jewel",
    icon: Database,
    glow: "0 0 32px rgba(255,193,7,0.6), 0 0 48px rgba(255,160,0,0.35)",
    crownJewel: true,
  },
];

export default function Hero() {
  return (
    <section className="hero brand-stripes-bg relative min-h-[90vh] overflow-hidden bg-[#0B1220] px-4 py-24 sm:px-6 sm:py-28">
      <div className="absolute inset-0 z-0">
        <HeroAttackPathViz />
      </div>
      <CloudTopology />
      <div className="relative z-10 flex min-h-[calc(90vh-80px)] flex-col justify-center mx-auto max-w-7xl">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-hero-title tracking-tight text-white w-full">
              See Every Cloud Attack Path Before It Becomes a Breach
            </h1>
            <p className="mt-5 text-body-lg text-slate-400 sm:mt-6 sm:text-xl">
              Xsee continuously maps your cloud environment, identifies attack paths, and proves your security posture in real time.
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
      {TOPOLOGY_NODES.map((node, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-white"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
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

function FloatingProductPreview() {
  return (
    <motion.div
      className="w-full max-w-[1100px] mx-auto"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="relative overflow-hidden rounded-[18px] border"
        style={{
          background: "rgba(10,14,28,0.8)",
          borderColor: "rgba(255,140,0,0.35)",
          boxShadow: "0 0 30px rgba(255,100,0,0.2)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 border-b py-4 px-6"
          style={{ borderColor: "rgba(255,140,0,0.2)" }}
        >
          <span
            className="h-2 w-2 rounded-full flex-shrink-0"
            style={{ background: "#EF4444", boxShadow: "0 0 8px rgba(239,68,68,0.8)" }}
          />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/90">
            Top Active Attack Path
          </h3>
        </div>

        {/* Main: path viz + risk panel */}
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {/* Attack path visualization */}
          <div className="flex-1 p-6 lg:p-8">
            {/* Nodes: stack on mobile, row on desktop */}
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-4">
              {CINEMATIC_NODES.map((node) => (
                <div
                  key={node.id}
                  className="flex flex-col items-center flex-shrink-0"
                >
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 md:h-16 md:w-16"
                    style={{
                      borderColor: node.crownJewel ? "rgba(255,193,7,0.9)" : "rgba(255,140,0,0.6)",
                      background: "rgba(10,14,28,0.9)",
                      boxShadow: node.glow,
                    }}
                    animate={
                      node.crownJewel
                        ? {
                            boxShadow: [
                              "0 0 32px rgba(255,193,7,0.6), 0 0 48px rgba(255,160,0,0.35)",
                              "0 0 40px rgba(255,193,7,0.75), 0 0 56px rgba(255,160,0,0.45)",
                              "0 0 32px rgba(255,193,7,0.6), 0 0 48px rgba(255,160,0,0.35)",
                            ],
                          }
                        : undefined
                    }
                    transition={
                      node.crownJewel
                        ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                        : undefined
                    }
                  >
                    <node.icon
                      className="h-6 w-6 md:h-7 md:w-7 text-white/90"
                      strokeWidth={1.8}
                    />
                  </motion.div>
                  <span className="mt-2 text-center text-sm font-medium text-white">
                    {node.label}
                  </span>
                  <span
                    className={`mt-0.5 text-xs ${node.crownJewel ? "text-amber-400/90" : "text-slate-400"}`}
                  >
                    {node.subtitle}
                  </span>
                </div>
              ))}
            </div>

            {/* Glowing attack line — single segment; on mobile simplified between stacked nodes */}
            <div className="mt-6 flex items-center justify-center">
              <div
                className="relative h-1 w-full max-w-[320px] lg:max-w-none rounded-full overflow-hidden"
                style={{
                  background: "linear-gradient(90deg, #ef4444 0%, #f97316 50%, #ff8c00 100%)",
                  boxShadow: "0 0 20px rgba(255,100,0,0.5)",
                }}
              >
                <motion.div
                  className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white"
                  style={{ boxShadow: "0 0 14px rgba(255,255,255,0.95)" }}
                  animate={{ x: ["0%", "100%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Risk panel — right side */}
          <div
            className="border-t lg:border-t-0 lg:border-l px-6 py-5 lg:py-8 lg:px-6 lg:min-w-[200px]"
            style={{ borderColor: "rgba(255,140,0,0.2)" }}
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-1 lg:gap-y-5 text-sm">
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wider">Risk</span>
                <p className="font-semibold text-red-400 mt-0.5">CRITICAL</p>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wider">Data Sensitivity</span>
                <p className="font-semibold text-white mt-0.5">HIGH</p>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wider">Records</span>
                <p className="font-semibold text-white mt-0.5">2.4M</p>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wider">Blast Radius</span>
                <p className="font-semibold text-white mt-0.5">4 resources</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom metrics — pills */}
        <div
          className="flex flex-wrap items-center gap-3 border-t px-6 py-4"
          style={{ borderColor: "rgba(255,140,0,0.2)" }}
        >
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: "rgba(239,68,68,0.2)",
              border: "1px solid rgba(239,68,68,0.5)",
              color: "#fca5a5",
            }}
          >
            EXPLOITABLE
          </span>
          <span className="text-slate-400 text-xs">
            Confidence: <span className="font-semibold text-white">85%</span>
          </span>
          <span className="text-slate-400 text-xs">
            Detection: <span className="font-semibold text-white">0%</span>
          </span>
          <span className="text-slate-400 text-xs">
            Hops: <span className="font-semibold text-white">3</span>
          </span>
          <span className="text-slate-400 text-xs">
            Blast: <span className="font-semibold text-white">4 resources</span>
          </span>
        </div>

        {/* Button — right side */}
        <div className="flex justify-end px-6 pb-6">
          <Link
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
            style={{
              background: "rgba(255,140,0,0.2)",
              border: "1px solid rgba(255,140,0,0.4)",
            }}
          >
            View in Explorer →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
