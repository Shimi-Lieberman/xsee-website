"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";

type CellValue = boolean | "partial";
const rows: {
  feature: string;
  xsee: CellValue;
  wiz: CellValue;
  prisma: CellValue;
}[] = [
  { feature: "Attack path discovery", xsee: true, wiz: true, prisma: true },
  { feature: "L2 validation (proof)", xsee: true, wiz: false, prisma: false },
  { feature: "Runtime simulation", xsee: true, wiz: false, prisma: false },
  { feature: "Detection gap analysis", xsee: true, wiz: false, prisma: false },
  { feature: "AI analyst", xsee: true, wiz: "partial", prisma: false },
  {
    feature: "Remediation IaC",
    xsee: true,
    wiz: "partial",
    prisma: "partial",
  },
  { feature: "Operational playbooks", xsee: true, wiz: false, prisma: false },
  { feature: "Time-to-compromise", xsee: true, wiz: false, prisma: false },
];

function Cell({
  value,
  className = "",
}: {
  value: CellValue;
  className?: string;
}) {
  if (value === true) {
    return (
      <td
        className={`border-b border-slate-100 px-4 py-4 text-center ${className}`}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Check className="mx-auto h-6 w-6 text-[#22C55E]" />
        </motion.span>
      </td>
    );
  }
  if (value === "partial") {
    return (
      <td
        className={`border-b border-slate-100 px-4 py-4 text-center text-sm text-slate-500 ${className}`}
      >
        partial
      </td>
    );
  }
  return (
    <td
      className={`border-b border-slate-100 px-4 py-4 text-center ${className}`}
    >
      <X className="mx-auto h-5 w-5 text-[#EF4444]" />
    </td>
  );
}

export default function CompetitiveDiff() {
  return (
    <section className="bg-slate-50 py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionFadeIn>
          <h2 className="text-center text-4xl font-semibold tracking-tight text-slate-900">
            Where XSEE Goes Further
          </h2>
        </SectionFadeIn>

        <SectionFadeIn>
          <div className="mt-20 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-md">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border-b border-slate-200 px-5 py-5 text-left text-sm font-semibold text-slate-900">
                    Feature
                  </th>
                  <th className="border-b border-slate-200 px-5 py-5 text-center text-lg font-bold text-[#3B82F6]">
                    XSEE
                  </th>
                  <th className="border-b border-slate-200 px-5 py-5 text-center text-sm font-semibold text-slate-500">
                    Wiz
                  </th>
                  <th className="border-b border-slate-200 px-5 py-5 text-center text-sm font-semibold text-slate-500">
                    Prisma Cloud
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50">
                    <td className="border-b border-slate-100 px-5 py-4 text-base text-slate-900">
                      {row.feature}
                    </td>
                    <Cell value={row.xsee} className="bg-[#3B82F6]/[0.08] px-5 py-4 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.12)]" />
                    <Cell value={row.wiz} className="px-5 py-4" />
                    <Cell value={row.prisma} className="px-5 py-4" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionFadeIn>

        <SectionFadeIn>
          <p className="mt-10 text-center text-lg font-semibold text-slate-900">
            Other tools show you what could happen. XSEE proves what will happen
            — and fixes it.
          </p>
        </SectionFadeIn>
      </div>
    </section>
  );
}
