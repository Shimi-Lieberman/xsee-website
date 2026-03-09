"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

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
            <div className="relative aspect-video bg-slate-100">
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
