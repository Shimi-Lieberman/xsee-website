"use client";

import { motion } from "framer-motion";
import {
  Route,
  Network,
  LayoutDashboard,
  Activity,
} from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";

const FEATURES = [
  {
    title: "Attack Path Explorer",
    description:
      "Trace how attackers move from internet entry to crown jewels. Interactive graph with hop-by-hop evidence, confidence scores, and remediation steps.",
    icon: Route,
    mock: "attack-path",
  },
  {
    title: "Cloud Environment Graph",
    description:
      "Your entire cloud mapped as a live graph. See relationships between identities, compute, storage, and databases—with exploit paths highlighted.",
    icon: Network,
    mock: "cloud-graph",
  },
  {
    title: "Exposure Findings Dashboard",
    description:
      "Prioritized list of exposures with severity, affected assets, and one-click remediation. Terraform, CLI, or CloudFormation—your choice.",
    icon: LayoutDashboard,
    mock: "findings",
  },
  {
    title: "Real-Time Monitoring",
    description:
      "Continuous analysis as your cloud changes. New paths surface in minutes, not days. Detection gaps and simulation results always current.",
    icon: Activity,
    mock: "monitoring",
  },
];

function DeviceFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.02 }}
      className={`overflow-hidden rounded-xl border border-slate-200/80 bg-white transition-transform duration-300 ${className}`}
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      {/* Browser-style chrome */}
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </div>
        <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1.5 text-center text-xs text-slate-400 ring-1 ring-slate-200/80">
          app.xsee.io
        </div>
      </div>
      <div className="aspect-video min-h-[220px] sm:min-h-[280px]">{children}</div>
    </motion.div>
  );
}

function MockAttackPath() {
  return (
    <div className="flex h-full items-center justify-center bg-[#0B1C3D]/[0.02] p-6">
      <div className="flex w-full max-w-[280px] items-center justify-between gap-2">
        {[
          { label: "Internet", color: "#F97316" },
          { label: "IAM", color: "#8B5CF6" },
          { label: "EC2", color: "#FF1B8D" },
          { label: "DB", color: "#EF4444" },
        ].map((node) => (
          <div
            key={node.label}
            className="flex flex-col items-center rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm"
            style={{ boxShadow: `0 0 12px ${node.color}25` }}
          >
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: node.color }}
            />
            <span className="mt-1 text-[10px] font-medium text-slate-600">
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockCloudGraph() {
  return (
    <div className="flex h-full items-center justify-center bg-slate-50/50 p-6">
      <svg viewBox="0 0 200 120" className="h-full w-full max-w-[320px]">
        <defs>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF1B8D" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <line x1="40" y1="60" x2="100" y2="60" stroke="url(#edgeGrad)" strokeWidth="1" />
        <line x1="100" y1="60" x2="160" y2="40" stroke="url(#edgeGrad)" strokeWidth="1" />
        <line x1="100" y1="60" x2="160" y2="80" stroke="url(#edgeGrad)" strokeWidth="1" />
        <circle cx="40" cy="60" r="8" fill="#F97316" opacity={0.9} />
        <circle cx="100" cy="60" r="10" fill="#FF1B8D" opacity={0.9} />
        <circle cx="160" cy="40" r="8" fill="#8B5CF6" opacity={0.9} />
        <circle cx="160" cy="80" r="8" fill="#EF4444" opacity={0.9} />
      </svg>
    </div>
  );
}

function MockFindings() {
  return (
    <div className="flex h-full flex-col gap-2 bg-slate-50/50 p-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-sm"
        >
          <div
            className={`h-2 w-2 rounded-full ${i === 1 ? "bg-red-500" : i === 2 ? "bg-amber-500" : "bg-slate-300"}`}
          />
          <div className="h-2 flex-1 rounded bg-slate-100" style={{ width: `${60 + i * 15}%` }} />
        </div>
      ))}
    </div>
  );
}

function MockMonitoring() {
  return (
    <div className="flex h-full items-end justify-center gap-2 bg-[#0B1C3D]/[0.02] p-6 pb-8">
      {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="w-6 rounded-t bg-[#FF1B8D]/20"
        />
      ))}
    </div>
  );
}

const MOCKS: Record<string, React.ReactNode> = {
  "attack-path": <MockAttackPath />,
  "cloud-graph": <MockCloudGraph />,
  findings: <MockFindings />,
  monitoring: <MockMonitoring />,
};

export default function PlatformShowcase() {
  return (
    <section className="section-base bg-slate-50">
      <div className="container-content mx-auto">
        <SectionFadeIn>
          <h2 className="text-center text-section-title tracking-tight text-slate-900">
            Inside the XSEE Platform
          </h2>
        </SectionFadeIn>
        <SectionFadeIn>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-slate-600">
            See how XSEE maps your cloud and stops breaches before they happen.
          </p>
        </SectionFadeIn>

        <div className="mt-20 space-y-24">
          {FEATURES.map((feature, i) => {
            const isReversed = i % 2 === 1;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className={`grid gap-12 md:grid-cols-2 md:gap-16 ${isReversed ? "md:grid-flow-dense" : ""}`}
              >
                <div
                  className={`flex flex-col justify-center ${isReversed ? "md:col-start-2" : ""}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF1B8D]/10 text-[#FF1B8D]">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-subsection-title tracking-tight text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
                <div className={`flex items-center ${isReversed ? "md:col-start-1 md:row-start-1" : ""}`}>
                  <DeviceFrame>{MOCKS[feature.mock]}</DeviceFrame>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
