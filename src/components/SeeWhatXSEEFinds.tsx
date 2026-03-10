"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, KeyRound, Crown } from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";

const TERMINAL_LINES = [
  "Scanning cloud environment...",
  "Discovering assets...",
  "Analyzing identity permissions...",
  "Building attack graph...",
  "Running attack simulation...",
];

const PATH_NODES = [
  { id: "internet", label: "Internet", icon: Globe, color: "#F97316" },
  { id: "bastion", label: "Bastion", icon: Server, color: "#3B82F6" },
  { id: "iam", label: "IAM", icon: KeyRound, color: "#8B5CF6" },
  { id: "db", label: "Production DB", icon: Crown, color: "#EF4444" },
];

type Cloud = "aws" | "azure" | "gcp" | null;
type Phase = "idle" | "scanning" | "results";

export default function SeeWhatXSEEFinds() {
  const [cloud, setCloud] = useState<Cloud>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);

  const startScan = useCallback((provider: "aws" | "azure" | "gcp") => {
    setCloud(provider);
    setPhase("scanning");
    setCurrentLineIndex(-1);
  }, []);

  useEffect(() => {
    if (phase !== "scanning") return;
    const step = () => {
      setCurrentLineIndex((i) => {
        if (i + 1 >= TERMINAL_LINES.length) {
          return i;
        }
        return i + 1;
      });
    };
    const t0 = setTimeout(step, 400);
    const t1 = setTimeout(step, 1100);
    const t2 = setTimeout(step, 1800);
    const t3 = setTimeout(step, 2500);
    const t4 = setTimeout(step, 3200);
    const t5 = setTimeout(step, 3900);
    const done = setTimeout(() => setPhase("results"), 4800);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(done);
    };
  }, [phase, cloud]);

  const reset = useCallback(() => {
    setCloud(null);
    setPhase("idle");
    setCurrentLineIndex(-1);
  }, []);

  return (
    <section className="brand-stripes-bg relative overflow-hidden bg-[#0B1C3D] py-28 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionFadeIn>
          <h2 className="text-center text-4xl font-semibold tracking-tight text-white">
            See What XSEE Would Discover in Your Cloud
          </h2>
        </SectionFadeIn>
        <SectionFadeIn>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
            Simulate how XSEE analyzes your infrastructure and identifies attack
            paths.
          </p>
        </SectionFadeIn>

        {/* Step 1 — Cloud selection */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {(["aws", "azure", "gcp"] as const).map((provider) => (
            <button
              key={provider}
              type="button"
              onClick={() => startScan(provider)}
              disabled={phase === "scanning"}
              className={`rounded-xl border-2 px-8 py-4 text-lg font-semibold uppercase tracking-wider transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                cloud === provider && phase !== "idle"
                  ? "border-[#3B82F6] bg-[#3B82F6]/20 text-white shadow-[0_0_24px_rgba(59,130,246,0.3)]"
                  : "border-slate-600 bg-[#0B1C3D]/80 text-slate-300 hover:border-slate-500 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              {provider}
            </button>
          ))}
        </motion.div>

        {/* Step 2 — Terminal + Step 3 — Results */}
        <AnimatePresence mode="wait">
          {phase === "scanning" && cloud && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-8 overflow-hidden"
            >
              <div
                className="overflow-hidden rounded-xl border border-slate-700 bg-[#0B1C3D]/95 font-mono text-sm shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                style={{
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04), 0 0 30px rgba(59,130,246,0.06)",
                }}
              >
                <div className="flex items-center gap-2 border-b border-slate-700/80 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F97316]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                  <span className="ml-2 text-xs text-slate-500">
                    xsee scan —provider {cloud}
                  </span>
                </div>
                <div className="min-h-[200px] p-4">
                  {TERMINAL_LINES.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: currentLineIndex >= i ? 1 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 py-0.5"
                    >
                      <span className="text-[#22C55E]">$</span>
                      <span className="text-slate-300">{line}</span>
                      {currentLineIndex === i && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                          }}
                          className="inline-block h-4 w-2 bg-slate-400"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {phase === "results" && cloud && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              <div
                className="overflow-hidden rounded-xl border border-slate-700 bg-[#0B1C3D]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:p-8"
                style={{
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04), 0 0 30px rgba(59,130,246,0.06)",
                }}
              >
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Example output (illustrative)
                </p>
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-slate-700/80 bg-[#0B1C3D]/60 px-4 py-3">
                    <p className="text-2xl font-bold text-white">842</p>
                    <p className="text-sm text-slate-400">Assets discovered</p>
                  </div>
                  <div className="rounded-lg border border-slate-700/80 bg-[#0B1C3D]/60 px-4 py-3">
                    <p className="text-2xl font-bold text-white">14</p>
                    <p className="text-sm text-slate-400">Attack paths identified</p>
                  </div>
                  <div className="rounded-lg border border-slate-700/80 bg-[#0B1C3D]/60 px-4 py-3">
                    <p className="text-2xl font-bold text-[#EF4444]">3</p>
                    <p className="text-sm text-slate-400">Critical exposures</p>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-700/80 bg-[#0B1C3D]/60 p-4">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Top attack path
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    {PATH_NODES.map((node, i) => (
                      <div
                        key={node.id}
                        className="flex flex-shrink-0 items-center"
                      >
                        <div className="flex flex-col items-center">
                          <motion.div
                            className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-[#0B1C3D]"
                            style={{
                              borderColor: node.color,
                              boxShadow:
                                node.id === "db"
                                  ? "0 0 20px rgba(239,68,68,0.5)"
                                  : `0 0 12px ${node.color}50`,
                            }}
                          >
                            <node.icon
                              className="h-4 w-4"
                              style={{ color: node.color }}
                            />
                          </motion.div>
                          <span className="mt-1 text-xs text-slate-500">
                            {node.label}
                          </span>
                        </div>
                        {i < PATH_NODES.length - 1 && (
                          <PathConnector
                            fromColor={node.color}
                            toColor={PATH_NODES[i + 1].color}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 4 — CTA */}
                <div className="mt-8 border-t border-slate-700/80 pt-8 text-center">
                  <p className="mb-4 text-lg text-slate-300">
                    Run a real analysis with XSEE
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      href="#contact"
                      className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl bg-[#3B82F6] px-6 text-base font-semibold text-white shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563EB] hover:shadow-[0_8px_24px_rgba(59,130,246,0.45)]"
                    >
                      Request Demo
                    </Link>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-600 px-6 text-base font-semibold text-slate-400 transition-colors hover:border-slate-500 hover:text-slate-300"
                    >
                      Try another cloud
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === "idle" && (
          <p className="mt-6 text-center text-sm text-slate-500">
            Select a cloud provider above to run a simulated scan.
          </p>
        )}
      </div>
    </section>
  );
}

function PathConnector({
  fromColor,
  toColor,
}: {
  fromColor: string;
  toColor: string;
}) {
  return (
    <div className="relative h-0.5 w-6 flex-shrink-0 sm:w-8">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${fromColor}, ${toColor})`,
          boxShadow: "0 0 8px rgba(239,68,68,0.35)",
        }}
      />
      <motion.div
        className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#EF4444]"
        style={{ boxShadow: "0 0 6px #EF4444" }}
        animate={{ x: [0, 20] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </div>
  );
}
