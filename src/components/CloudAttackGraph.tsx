"use client";

import { motion } from "framer-motion";
import SectionFadeIn from "./SectionFadeIn";
import {
  Globe,
  Loader2,
  Server,
  KeyRound,
  Shield,
  HardDrive,
  Database,
} from "lucide-react";

const NODE_LIST = [
  { id: "internet", label: "Internet", icon: Globe, x: 50, y: 80 },
  { id: "lb", label: "Load Balancer", icon: Loader2, x: 50, y: 60 },
  { id: "ec2", label: "EC2", icon: Server, x: 35, y: 40 },
  { id: "iam", label: "IAM Role", icon: KeyRound, x: 65, y: 40 },
  { id: "sg", label: "Security Group", icon: Shield, x: 25, y: 55 },
  { id: "s3", label: "S3", icon: HardDrive, x: 75, y: 55 },
  { id: "rds", label: "RDS", icon: Database, x: 50, y: 20 },
];

const ATTACK_PATH_IDS = ["internet", "lb", "ec2", "iam", "rds"];
const PATH_EDGES: [string, string][] = [
  ["internet", "lb"],
  ["lb", "ec2"],
  ["lb", "iam"],
  ["ec2", "iam"],
  ["ec2", "sg"],
  ["iam", "rds"],
  ["ec2", "rds"],
  ["sg", "rds"],
  ["s3", "iam"],
];

function getNode(id: string) {
  return NODE_LIST.find((n) => n.id === id)!;
}

export default function CloudAttackGraph() {
  return (
    <section className="bg-slate-50 py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionFadeIn>
          <h2 className="text-center text-4xl font-semibold tracking-tight text-slate-900">
            The Cloud Attack Graph
          </h2>
        </SectionFadeIn>
        <SectionFadeIn>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-500">
            XSEE maps your cloud into a live attack graph and reveals how
            attackers can move through it.
          </p>
        </SectionFadeIn>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mt-16 overflow-hidden rounded-2xl border border-slate-200 bg-[#0B1C3D] p-8 shadow-xl md:p-12"
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative aspect-[1.8] min-h-[320px] w-full">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* All edges - subtle */}
              {PATH_EDGES.map(([a, b], i) => {
                const n1 = getNode(a);
                const n2 = getNode(b);
                const isAttackPath = ATTACK_PATH_IDS.includes(a) && ATTACK_PATH_IDS.includes(b) &&
                  ATTACK_PATH_IDS.indexOf(a) + 1 === ATTACK_PATH_IDS.indexOf(b);
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={n1.x}
                    y1={n1.y}
                    x2={n2.x}
                    y2={n2.y}
                    stroke={isAttackPath ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.08)"}
                    strokeWidth={isAttackPath ? 0.8 : 0.4}
                  />
                );
              })}
              {/* Attack path - glowing */}
              {ATTACK_PATH_IDS.slice(0, -1).map((id, i) => {
                const n1 = getNode(id);
                const n2 = getNode(ATTACK_PATH_IDS[i + 1]);
                return (
                  <line
                    key={`path-${id}`}
                    x1={n1.x}
                    y1={n1.y}
                    x2={n2.x}
                    y2={n2.y}
                    stroke="url(#attackPathGrad)"
                    strokeWidth={1.2}
                    opacity={0.9}
                  />
                );
              })}
              <defs>
                <linearGradient id="attackPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
              </defs>
            </svg>
            {/* Moving pulse along attack path */}
            <AttackPathPulse />
            {/* Nodes */}
            {NODE_LIST.map((node, i) => {
              const onAttackPath = ATTACK_PATH_IDS.includes(node.id);
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 bg-[#0B1C3D] ${
                      onAttackPath ? "border-[#3B82F6]" : "border-slate-600"
                    }`}
                    style={{
                      boxShadow: onAttackPath
                        ? "0 0 16px rgba(59,130,246,0.4)"
                        : "0 0 8px rgba(255,255,255,0.08)",
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 24px rgba(59,130,246,0.5)",
                    }}
                  >
                    <node.icon
                      className="h-5 w-5"
                      style={{ color: onAttackPath ? "#3B82F6" : "#94A3B8" }}
                    />
                  </motion.div>
                  <span className="mt-1 text-[10px] font-medium text-slate-400">
                    {node.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AttackPathPulse() {
  const pathOrder = ATTACK_PATH_IDS.map((id) => getNode(id));
  return (
    <motion.div
      className="absolute h-2 w-2 rounded-full bg-[#EF4444]"
      style={{
        boxShadow: "0 0 12px #EF4444",
        left: `${pathOrder[0].x}%`,
        top: `${pathOrder[0].y}%`,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        left: pathOrder.map((n) => `${n.x}%`),
        top: pathOrder.map((n) => `${n.y}%`),
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    />
  );
}
