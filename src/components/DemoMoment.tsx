"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Server, KeyRound, Crown } from "lucide-react";

const TABS = [
  { id: "paths", label: "Attack Paths" },
  { id: "ai", label: "AI Analyst" },
  { id: "sim", label: "Simulation" },
];

const callouts = [
  { id: "attack-path", label: "Attack Path Engine", x: "15%", y: "35%" },
  { id: "ai", label: "AI Security Analyst", x: "75%", y: "25%" },
  { id: "runtime", label: "Runtime Simulation", x: "50%", y: "55%" },
];

const ATTACK_PATH_NODES = [
  {
    id: "internet",
    title: "Internet",
    subtitle: "Entry Point",
    icon: Globe,
    color: "#3B82F6",
    glow: "0 0 20px rgba(59,130,246,0.35)",
  },
  {
    id: "bastion",
    title: "Bastion Host",
    subtitle: "Lateral Movement",
    icon: Server,
    color: "#F97316",
    glow: "0 0 20px rgba(249,115,22,0.35)",
  },
  {
    id: "iam",
    title: "IAM Role",
    subtitle: "Privilege Escalation",
    icon: KeyRound,
    color: "#8B5CF6",
    glow: "0 0 20px rgba(139,92,246,0.35)",
  },
  {
    id: "db",
    title: "Internal DB",
    subtitle: "Crown Jewel",
    icon: Crown,
    color: "#EAB308",
    glow: "0 0 32px rgba(234,179,8,0.55)",
  },
];

function AttackPathDemo() {
  return (
    <div className="flex flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
      <p className="text-center text-sm font-medium text-slate-500">
        XSEE automatically discovers the full attack path from internet entry to crown jewel.
      </p>
      <div className="relative w-full">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-4">
          {ATTACK_PATH_NODES.map((node) => (
            <div
              key={node.id}
              className="flex flex-shrink-0 flex-col items-center"
            >
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 md:h-16 md:w-16"
                style={{
                  borderColor: node.color,
                  background: "white",
                  boxShadow: node.glow,
                }}
                whileHover={{ scale: 1.06 }}
              >
                <node.icon
                  className="h-6 w-6 md:h-7 md:w-7"
                  style={{ color: node.color }}
                />
              </motion.div>
              <span className="mt-2 text-center text-sm font-semibold text-slate-800">
                {node.title}
              </span>
              <span className="mt-0.5 text-center text-xs text-slate-500">
                {node.subtitle}
              </span>
            </div>
          ))}
        </div>
        {/* Glowing attack line with moving pulse */}
        <div
          className="relative mt-6 w-full overflow-hidden rounded-[3px]"
          style={{ height: 3 }}
        >
          <div
            className="absolute inset-0 rounded-[3px]"
            style={{
              background: "linear-gradient(90deg, #ef4444, #f97316)",
              boxShadow: "0 0 12px rgba(239,68,68,0.3)",
            }}
          />
          <motion.div
            className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white"
            style={{ boxShadow: "0 0 10px rgba(255,200,150,0.9)" }}
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
      {/* Status row */}
      <div className="flex flex-wrap items-center justify-center gap-6 border-t border-slate-200 pt-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm text-slate-600">
            Confidence: <span className="font-semibold text-slate-900">92%</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-sm text-slate-600">
            Detection gap: <span className="font-semibold text-slate-900">38%</span>
          </span>
        </div>
        <button
          type="button"
          className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(59,130,246,0.35)] transition-all hover:bg-[#1D4ED8] hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)]"
        >
          Fix Available
        </button>
      </div>
    </div>
  );
}

export default function DemoMoment() {
  const [activeTab, setActiveTab] = useState("paths");
  const [activeCallout, setActiveCallout] = useState<string | null>(null);

  return (
    <section className="bg-slate-50 py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            From alert noise to proven attack paths.
          </h2>
          <p className="mt-6 text-lg text-slate-500">
            &ldquo;Here&apos;s the attack path. Here&apos;s the proof. Here&apos;s
            exactly what to fix.&rdquo;
          </p>
          <Link
            href="#contact"
            className="mt-10 inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-8 text-base font-semibold text-white shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(59,130,246,0.45)]"
          >
            Request Demo
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mt-20"
        >
          <div
            className="overflow-hidden rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] ring-1 ring-slate-200/60"
            style={{
              background:
                "linear-gradient(145deg, #f8fafb 0%, #f1f5f9 50%, #e2e8f0 100%)",
            }}
          >
            <div className="border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="ml-auto rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-400">
                  app.xsee.io
                </div>
              </div>
            </div>
            <div
              className={`relative bg-slate-100 ${activeTab === "paths" ? "min-h-[320px]" : "aspect-video"}`}
            >
              {activeTab === "paths" ? (
                <AttackPathDemo />
              ) : (
                <>
                  <Image
                    src="/platform-screenshot.png"
                    alt="XSEE Cloud Attack Intelligence Platform - Overview dashboard"
                    fill
                    className="object-contain object-top"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                  {callouts.map((callout) => (
                <motion.div
                  key={callout.id}
                  className="absolute z-10 cursor-default"
                  style={{ left: callout.x, top: callout.y }}
                  onMouseEnter={() => setActiveCallout(callout.id)}
                  onMouseLeave={() => setActiveCallout(null)}
                  initial={false}
                  animate={{
                    scale: activeCallout === callout.id ? 1 : 0.92,
                    opacity: activeCallout === callout.id ? 1 : 0.75,
                  }}
                >
                  <div className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                    <motion.div
                      className="h-4 w-4 rounded-full border-2 border-[#3B82F6] bg-white"
                      animate={{
                        boxShadow:
                          activeCallout === callout.id
                            ? "0 0 20px rgba(59,130,246,0.6)"
                            : "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                    {activeCallout === callout.id && (
                      <div className="h-2 w-px bg-[#3B82F6]/60" />
                    )}
                    <span
                      className={`mt-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-white shadow-lg ${
                        activeCallout === callout.id ? "block" : "hidden"
                      }`}
                      style={{
                        backgroundColor: "#0B1C3D",
                        boxShadow:
                          activeCallout === callout.id
                            ? "0 0 16px rgba(59,130,246,0.3)"
                            : undefined,
                      }}
                    >
                      {callout.label}
                    </span>
                  </div>
                </motion.div>
              ))}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
