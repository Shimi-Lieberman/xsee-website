"use client";

import { motion } from "framer-motion";
import { Search, Wrench, ShieldCheck, ChevronRight } from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";

const steps = [
  {
    title: "Discover",
    subtitle: " & Validate",
    description:
      "Connect your AWS account. XSEE discovers attack paths and validates each hop with real AWS API evidence.",
    icon: Search,
    color: "#3B82F6",
  },
  {
    title: "Remediate",
    subtitle: " & Track",
    description:
      "Three remediation strategies per path. Copy-paste Terraform. Track progress with Playbooks.",
    icon: Wrench,
    color: "#F97316",
  },
  {
    title: "Simulate",
    subtitle: " & Verify",
    description:
      "Run the attack again. Prove defenses work. Measure detection gaps. Show before/after proof.",
    icon: ShieldCheck,
    color: "#22C55E",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white py-28 px-6"
    >
      <div className="mx-auto max-w-7xl">
        <SectionFadeIn>
          <h2 className="text-center text-4xl font-semibold tracking-tight text-slate-900">
            How XSEE Works
          </h2>
        </SectionFadeIn>

        <div className="mt-20 flex flex-col items-stretch gap-8 md:flex-row md:items-center md:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-1 flex-col items-center md:flex-row"
            >
              <motion.div
                whileHover={{
                  y: -4,
                  borderColor: "rgb(96 165 250)",
                  boxShadow: "0 0 20px rgba(59,130,246,0.12)",
                }}
                className="flex w-full max-w-sm flex-col rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 md:max-w-none"
              >
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${step.color}18`,
                    boxShadow: `0 0 0 0 ${step.color}40`,
                  }}
                  whileHover={{
                    boxShadow: `0 0 20px ${step.color}40`,
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon className="h-6 w-6" style={{ color: step.color }} />
                </motion.div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {step.title}
                  <span className="text-slate-500">{step.subtitle}</span>
                </h3>
                <p className="mt-3 text-lg text-slate-500">{step.description}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="hidden flex-shrink-0 px-3 md:flex md:items-center">
                  <motion.div
                    className="h-px w-8 bg-gradient-to-r from-slate-200 to-slate-300"
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  />
                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ChevronRight className="h-7 w-7 text-slate-400" />
                  </motion.div>
                  <motion.div
                    className="h-px w-8 bg-gradient-to-r from-slate-300 to-slate-200"
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
