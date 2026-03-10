"use client";

import { motion } from "framer-motion";
import {
  Route,
  Wrench,
  Network,
  Zap,
  Bot,
  BookOpen,
} from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";

const engines = [
  {
    title: "Attack Path Discovery",
    description: "Graph-level (L1) and exploit-level (L2) validation. Each hop backed by AWS API evidence.",
    tag: "Graph Engine",
    icon: Route,
    color: "#3B82F6",
  },
  {
    title: "Smart Remediation",
    description: "3 strategies per path. Terraform, CLI, CloudForm.",
    tag: "Remediation Engine",
    icon: Wrench,
    color: "#22C55E",
  },
  {
    title: "Intelligent Correlation",
    description: "Turn alerts into attack stories. Priority rerank.",
    tag: "Correlation Engine",
    icon: Network,
    color: "#8B5CF6",
  },
  {
    title: "XseeCyber Simulation",
    description: "Runtime exploit simulation with detection gaps.",
    tag: "Simulation Engine",
    icon: Zap,
    color: "#F97316",
  },
  {
    title: "AI Security Analyst",
    description: "Query your cloud inventory and attack graph. Answers cite AWS resources and path evidence.",
    tag: "AI Engine",
    icon: Bot,
    color: "#0891B2",
  },
  {
    title: "Operational Playbooks",
    description: "Track fixes from detection to verified closed.",
    tag: "Automation Engine",
    icon: BookOpen,
    color: "#EF4444",
  },
];

export default function SixEngines() {
  return (
    <section className="section-base bg-white">
      <div className="container-content mx-auto">
        <SectionFadeIn>
          <h2 className="text-center text-section-title tracking-tight text-slate-900">
            Attack Path Intelligence Platform
          </h2>
        </SectionFadeIn>
        <SectionFadeIn>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-500">
            Six engines. One platform. Attack paths validated with exploit-level proof, remediation in Terraform/CLI/CloudFormation.
          </p>
        </SectionFadeIn>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {engines.map((engine) => (
            <motion.div
              key={engine.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              whileHover={{
                y: -4,
                borderColor: engine.color,
                boxShadow: `0 0 20px ${engine.color}30`,
              }}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300"
            >
              <div
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300"
                style={{
                  backgroundColor: `${engine.color}15`,
                  boxShadow: `0 0 0 0 ${engine.color}20`,
                }}
              >
                <engine.icon
                  className="h-5 w-5"
                  style={{ color: engine.color }}
                />
              </div>
              <span
                className="mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${engine.color}12`,
                  color: engine.color,
                }}
              >
                {engine.tag}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                {engine.title}
              </h3>
              <p className="mt-2 text-base text-slate-500">
                {engine.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
