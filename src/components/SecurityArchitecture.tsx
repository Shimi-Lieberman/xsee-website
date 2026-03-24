"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Server, FileCheck } from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";

const ITEMS = [
  {
    icon: Shield,
    title: "SOC 2 Type II",
    description: "Enterprise-grade security controls verified by independent auditors.",
  },
  {
    icon: Lock,
    title: "Encryption",
    description: "Data encrypted at rest and in transit. Customer data never leaves your region.",
  },
  {
    icon: Server,
    title: "Zero Standing Access",
    description: "Short-lived, scoped credentials. No persistent access to your cloud.",
  },
  {
    icon: FileCheck,
    title: "Compliance Ready",
    description: "Built for teams that need GDPR, HIPAA, and cloud security frameworks.",
  },
];

export default function SecurityArchitecture() {
  return (
    <section id="security" className="bg-white py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionFadeIn>
          <h2 className="text-center text-4xl font-semibold tracking-tight text-slate-900">
            Security & Architecture
          </h2>
        </SectionFadeIn>
        <SectionFadeIn>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-500">
            SOC 2 Type II, encryption, zero standing access. Built for security-sensitive environments.
          </p>
        </SectionFadeIn>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ITEMS.map((item) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -2 }}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF1B8D]/10 text-[#FF1B8D] transition-colors group-hover:bg-[#FF1B8D]/15">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
