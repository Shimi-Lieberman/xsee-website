"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, KeyRound, Crown } from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";

const STEPS = [
  {
    step: 1,
    title: "Initial access",
    desc: "Internet reaches Bastion",
    icon: Globe,
    color: "#F97316",
  },
  {
    step: 2,
    title: "Privilege escalation",
    desc: "Bastion escalates IAM role",
    icon: KeyRound,
    color: "#8B5CF6",
  },
  {
    step: 3,
    title: "Crown jewel compromise",
    desc: "IAM accesses Internal DB",
    icon: Crown,
    color: "#EF4444",
  },
];

export default function AttackSimulation() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((s) => (s + 1) % STEPS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-[#0B1C3D] py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionFadeIn>
          <h2 className="text-center text-4xl font-semibold tracking-tight text-white">
            Attack Simulation
          </h2>
        </SectionFadeIn>
        <SectionFadeIn>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
            Step-by-step simulated attack replay — from initial access to crown
            jewel.
          </p>
        </SectionFadeIn>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-slate-700/50 bg-[#0B1C3D]/80 p-8 shadow-xl md:p-12"
        >
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-4">
            {STEPS.map((s, i) => {
              const isActive = activeStep === i;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative flex flex-1 flex-col items-center text-center"
                >
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-xl border-2 bg-[#0B1C3D]"
                    style={{
                      borderColor: s.color,
                      boxShadow: isActive
                        ? `0 0 28px ${s.color}60`
                        : `0 0 20px ${s.color}40`,
                    }}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      boxShadow: isActive
                        ? `0 0 32px ${s.color}70`
                        : `0 0 20px ${s.color}40`,
                    }}
                    transition={{ duration: 0.3 }}
                    whileHover={{
                      boxShadow: `0 0 28px ${s.color}55`,
                      scale: 1.05,
                    }}
                  >
                    <s.icon className="h-6 w-6" style={{ color: s.color }} />
                  </motion.div>
                  {isActive && (
                    <motion.div
                      className="absolute -inset-1 rounded-2xl border-2"
                      style={{ borderColor: s.color, opacity: 0.35 }}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.35 }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Step {s.step}
                  </p>
                  <p className="mt-1 font-semibold text-white">{s.title}</p>
                  <p className="mt-0.5 text-sm text-slate-400">{s.desc}</p>
                  {i < STEPS.length - 1 && (
                    <div className="relative mt-4 hidden w-20 flex-1 md:block">
                      <div className="h-0.5 w-full rounded-full bg-slate-700" />
                      <motion.div
                        className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#EF4444]"
                        style={{ boxShadow: "0 0 10px #EF4444" }}
                        animate={{
                          x: activeStep > i ? "100%" : activeStep === i ? ["0%", "100%"] : "0%",
                          opacity: activeStep >= i ? 1 : 0.3,
                        }}
                        transition={{
                          x: { duration: 1.2, repeat: activeStep === i ? Infinity : 0, repeatDelay: 0.5 },
                          opacity: { duration: 0.2 },
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          <div className="mt-8 flex justify-center gap-2">
            <div className="h-1.5 w-48 max-w-full rounded-full bg-slate-700">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#EF4444]"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
