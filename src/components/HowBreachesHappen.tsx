"use client";

import { motion } from "framer-motion";
import { Globe, KeyRound, Server, Database, ChevronRight } from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";

const STEPS = [
  {
    title: "Public Exposure",
    icon: Globe,
    label: "Internet",
  },
  {
    title: "Privilege Escalation",
    icon: KeyRound,
    label: "IAM Role",
  },
  {
    title: "Lateral Movement",
    icon: Server,
    label: "EC2 Instance",
  },
  {
    title: "Critical Data Access",
    icon: Database,
    label: "Database",
  },
];

export default function HowBreachesHappen() {
  return (
    <section className="section-base bg-white">
      <div className="container-content mx-auto">
        <SectionFadeIn>
          <h2 className="text-center text-section-title tracking-tight text-slate-900">
            How Cloud Breaches Actually Happen
          </h2>
        </SectionFadeIn>

        <div className="mt-16 flex flex-row justify-center gap-3 overflow-x-auto px-2 pb-4 sm:flex-wrap sm:overflow-visible sm:gap-2 sm:px-0 sm:pb-0 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-shrink-0 items-center"
            >
              <motion.div
                className="relative flex flex-col items-center rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-sm transition-colors sm:min-w-[140px] md:min-w-[160px]"
                whileHover={{ y: -2 }}
                style={{
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: "rgba(239,68,68,0.08)",
                    color: "#EF4444",
                  }}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Step {i + 1}
                </p>
                <p className="mt-1 text-center text-base font-semibold text-slate-900">
                  {step.title}
                </p>
                <p className="mt-0.5 text-center text-sm text-slate-500">
                  {step.label}
                </p>
              </motion.div>
              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex flex-shrink-0 items-center px-2 sm:px-3"
                >
                  <div className="relative h-px w-8 sm:w-12">
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#EF4444] to-[#EF4444]/70"
                      style={{ opacity: 0.6 }}
                    />
                    <motion.div
                      className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#EF4444]"
                      style={{ boxShadow: "0 0 8px rgba(239,68,68,0.5)" }}
                      animate={{ x: ["0%", "100%"] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        repeatDelay: 0.5,
                      }}
                    />
                  </div>
                  <ChevronRight className="h-5 w-5 flex-shrink-0 text-slate-300 sm:h-6 sm:w-6" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <SectionFadeIn>
          <p className="mx-auto mt-12 max-w-2xl text-center text-body-lg font-medium text-slate-600">
            XSEE detects the entire attack path before attackers exploit it.
          </p>
        </SectionFadeIn>
      </div>
    </section>
  );
}
