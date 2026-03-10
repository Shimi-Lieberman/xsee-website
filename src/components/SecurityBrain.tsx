"use client";

import { motion } from "framer-motion";
import {
  Network,
  Route,
  ShieldAlert,
  Activity,
  Wrench,
} from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";

const MODULES = [
  {
    title: "Continuous Graph Analysis",
    description:
      "Analyzes cloud relationships across identities, networks, and resources.",
    icon: Network,
  },
  {
    title: "Attack Path Discovery",
    description:
      "Identifies real breach paths attackers could exploit.",
    icon: Route,
  },
  {
    title: "Exposure Risk Intelligence",
    description:
      "Prioritizes the risks that lead to actual compromise.",
    icon: ShieldAlert,
  },
  {
    title: "Real-Time Monitoring",
    description:
      "Continuously monitors infrastructure changes.",
    icon: Activity,
  },
  {
    title: "Automated Remediation",
    description:
      "Provides recommended fixes to eliminate exposure paths.",
    icon: Wrench,
  },
];

export default function SecurityBrain() {
  return (
    <section className="section-base bg-white">
      <div className="container-content mx-auto">
        <SectionFadeIn>
          <h2 className="text-center text-section-title tracking-tight text-slate-900">
            XSEE Security Brain
          </h2>
        </SectionFadeIn>
        <SectionFadeIn>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-slate-600">
            Core capabilities that power attack path discovery and validation.
          </p>
        </SectionFadeIn>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {MODULES.map((module) => (
            <motion.div
              key={module.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4 }}
              className="card-enterprise group rounded-xl border border-slate-200 bg-white p-6"
              style={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] transition-colors duration-300 group-hover:bg-[#3B82F6]/15"
              >
                <module.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {module.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {module.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
