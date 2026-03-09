"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Server,
  KeyRound,
  Crown,
} from "lucide-react";

const NODE_COLORS = {
  internet: "#F97316",
  loadBalancer: "#3B82F6",
  bastion: "#3B82F6",
  iam: "#8B5CF6",
  db: "#EF4444",
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#0B1C3D] px-6 pt-32 pb-28">
      <CloudTopology />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p
              className="text-2xl font-bold tracking-[0.15em] text-white"
              style={{ letterSpacing: "0.15em" }}
            >
              XSEE
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
              Cloud Attack Intelligence Platform
            </h1>
            <p className="mt-6 text-lg text-slate-400">
              Discover real cloud attack paths. Prove they&apos;re exploitable.
              Fix them before attackers do.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#contact"
                className="flex h-12 min-w-[180px] items-center justify-center rounded-xl bg-[#3B82F6] px-6 text-base font-semibold text-white shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563EB] hover:shadow-[0_8px_24px_rgba(59,130,246,0.45)]"
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
    <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
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

const STEP_LABELS = ["Lateral Movement", "Privilege Escalation", "Data Access"];

const pathNodes = [
  {
    id: "internet",
    label: "Internet",
    icon: Globe,
    color: "#3B82F6",
    glow: "0 0 20px rgba(59,130,255,0.25)",
  },
  {
    id: "bastion",
    label: "Bastion Host",
    icon: Server,
    color: "#ff7a00",
    glow: "0 0 20px rgba(255,80,40,0.25)",
  },
  {
    id: "iam",
    label: "IAM Escalation",
    icon: KeyRound,
    color: "#8B5CF6",
    glow: "0 0 20px rgba(139,92,246,0.25)",
  },
  {
    id: "db",
    label: "Internal DB",
    icon: Crown,
    color: "#EF4444",
    glow: "0 0 30px rgba(255,70,70,0.45)",
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
      <div
        className="relative overflow-hidden rounded-2xl border"
        style={{
          background: "linear-gradient(180deg, #0a1628 0%, #091427 100%)",
          borderColor: "rgba(120,150,255,0.12)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        <div className="border-b px-5 py-3" style={{ borderColor: "rgba(120,150,255,0.1)" }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Top Active Attack Path
          </h3>
        </div>
        <div className="px-10 py-8" style={{ padding: "32px 40px" }}>
          {/* Radial depth behind path */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[180px] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-100"
            style={{
              background: "radial-gradient(circle at center, rgba(255,80,0,0.10) 0%, transparent 70%)",
            }}
          />
          {/* Attack path: centered, even spacing — line aligned with node centers */}
          <div className="relative flex items-end justify-center gap-0">
            {pathNodes.map((node, i) => (
              <div key={node.id} className="flex flex-shrink-0 items-end">
                <div className="flex flex-col items-center">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: node.color,
                      background: "rgba(10,20,40,0.6)",
                      boxShadow: node.crownJewel
                        ? "0 0 30px rgba(255,70,70,0.45)"
                        : node.glow,
                    }}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: node.crownJewel
                        ? "0 0 40px rgba(255,70,70,0.55)"
                        : node.glow.replace("0.25)", "0.45)"),
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <node.icon className="h-6 w-6" style={{ color: node.color }} />
                  </motion.div>
                  <span
                    className="mt-2 max-w-[72px] truncate text-center text-[10px] font-medium"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {node.crownJewel ? "Crown Jewel" : node.label}
                  </span>
                </div>
                {i < pathNodes.length - 1 && (
                  <MiniPathConnector index={i} stepLabel={STEP_LABELS[i]} />
                )}
              </div>
            ))}
          </div>
          {/* Metrics strip */}
          <div
            className="mt-6 flex flex-wrap items-center gap-6 border-t pt-6"
            style={{ borderColor: "rgba(120,150,255,0.1)" }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
              <span className="text-xs text-slate-400">
                Confidence: <span className="font-semibold text-slate-300">92%</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#F97316]" />
              <span className="text-xs text-slate-400">
                Detection Gap: <span className="font-semibold text-slate-300">38%</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="rounded-full border px-3 py-1.5 text-xs font-medium text-[#22C55E]"
                style={{
                  background: "rgba(50,200,120,0.15)",
                  borderColor: "rgba(50,200,120,0.35)",
                }}
              >
                Fix Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MiniPathConnector({ stepLabel }: { index: number; stepLabel: string }) {
  return (
    <div className="flex h-14 w-16 flex-shrink-0 flex-col items-center justify-end sm:w-20">
      <span
        className="mb-1 text-[12px] leading-tight"
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        {stepLabel}
      </span>
      <div className="relative h-[3px] w-full overflow-hidden rounded" style={{ borderRadius: 4 }}>
        <div
          className="absolute inset-0 rounded"
          style={{
            height: 3,
            borderRadius: 4,
            background: "linear-gradient(90deg, #ff3b3b, #ff7a00, #ffb347)",
          }}
        />
        <motion.div
          className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#ffb347]"
          style={{ boxShadow: "0 0 12px rgba(255,183,71,0.8)" }}
          animate={{ x: [0, 56] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}
