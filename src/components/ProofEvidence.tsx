"use client";

import { motion } from "framer-motion";
import SectionFadeIn from "./SectionFadeIn";

const METRICS = [
  {
    display: "L1+L2",
    label: "Validation model",
    description: "Graph-level (L1) and exploit-level (L2) validation with AWS API evidence per hop.",
    color: "#3B82F6",
  },
  {
    display: "AWS API",
    label: "Evidence per path",
    description: "Each hop backed by IAM, EC2, network, and resource API calls—not assumptions.",
    color: "#22C55E",
  },
  {
    display: "3 formats",
    label: "Remediation",
    description: "Terraform, AWS CLI, or CloudFormation. Copy-paste, review, apply.",
    color: "#F97316",
  },
  {
    display: "% gap",
    label: "Detection gap",
    description: "Simulation reveals what your SIEM/EDR would miss. Measurable, auditable.",
    color: "#8B5CF6",
  },
];

export default function ProofEvidence() {

  return (
    <section
      className="bg-[#0B1C3D] py-28 px-6"
      style={{
        boxShadow: "inset 0 0 80px rgba(0,0,0,0.15)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <SectionFadeIn>
          <h2 className="text-center text-4xl font-semibold tracking-tight text-white">
            Evidence-Based Validation
          </h2>
        </SectionFadeIn>
        <SectionFadeIn>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
            Every path is validated with AWS API evidence—not inferred. Exploit-level proof, measurable detection gaps, and actionable remediation.
          </p>
        </SectionFadeIn>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
              className="group relative overflow-hidden rounded-xl border border-slate-700 bg-[#0B1C3D]/90 p-6 transition-all duration-300 hover:border-slate-600"
              style={{
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow: `inset 0 0 40px ${metric.color}12, 0 0 24px ${metric.color}15`,
                }}
                aria-hidden
              />
              <div
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
                style={{ backgroundColor: metric.color }}
              />
              <div
                className="mb-3 h-1 w-8 rounded-full"
                style={{
                  backgroundColor: metric.color,
                  boxShadow: `0 0 12px ${metric.color}50`,
                }}
              />
              <p
                className="text-3xl font-bold tabular-nums tracking-tight text-white sm:text-4xl"
                style={{
                  textShadow: `0 0 40px ${metric.color}30`,
                }}
              >
                {metric.display}
              </p>
              <p className="mt-2 text-base font-semibold text-slate-200">
                {metric.label}
              </p>
              <p className="mt-1.5 text-sm text-slate-500">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
