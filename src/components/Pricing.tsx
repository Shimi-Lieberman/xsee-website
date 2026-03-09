"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";

const plans = [
  {
    name: "Starter",
    badge: "For evaluation",
    description: "For small teams evaluating XSEE",
    price: "$499/mo",
    features: [
      "1 AWS account",
      "6 engines included",
      "Community support",
      "100 assets",
    ],
    cta: "Request Demo",
    ctaLink: "#contact",
    highlighted: false,
    enterprise: false,
  },
  {
    name: "Professional",
    badge: "Most Popular",
    description: "For growing teams",
    price: "$1,499/mo",
    features: [
      "Up to 5 accounts",
      "6 engines included",
      "Priority support",
      "1,000 assets",
      "Playbooks",
      "AI analyst",
    ],
    cta: "Request Demo",
    ctaLink: "#contact",
    highlighted: true,
    enterprise: false,
  },
  {
    name: "Enterprise",
    badge: "Full Platform",
    description: "For large orgs",
    price: "Contact us",
    features: [
      "Unlimited accounts",
      "6 engines included",
      "Dedicated support",
      "Unlimited assets",
      "Playbooks",
      "AI analyst",
      "Custom reports",
      "SSO / SAML",
      "Self-hosted option",
    ],
    cta: "Contact Sales",
    ctaLink: "#contact",
    highlighted: false,
    enterprise: true,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-white py-28 px-6"
    >
      <div className="mx-auto max-w-7xl">
        <SectionFadeIn>
          <h2 className="text-center text-4xl font-semibold tracking-tight text-slate-900">
            Pricing
          </h2>
        </SectionFadeIn>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={plan.highlighted ? undefined : { y: -4 }}
              className={`flex flex-col rounded-xl border p-8 shadow-sm transition-all duration-300 ${
                plan.highlighted
                  ? "relative z-10 scale-[1.02] border-2 border-[#3B82F6] bg-white shadow-xl ring-4 ring-[#3B82F6]/20"
                    : plan.enterprise
                    ? "border-slate-200 bg-gradient-to-b from-slate-50 to-white hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15),0_0_24px_rgba(139,92,246,0.08)]"
                    : "border-slate-200 bg-white hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
              }`}
            >
              <span
                className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  plan.highlighted
                    ? "bg-[#3B82F6] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {plan.badge}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
              <p className="mt-6 text-2xl font-bold text-slate-900">
                {plan.price}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-lg text-slate-500"
                  >
                    <Check className="h-5 w-5 flex-shrink-0 text-[#22C55E]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.ctaLink}
                className={`mt-8 flex h-12 w-full items-center justify-center rounded-xl text-base font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-[#3B82F6] text-white shadow-[0_4px_14px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 hover:bg-[#2563EB] hover:shadow-[0_8px_24px_rgba(59,130,246,0.45)]"
                    : "border border-slate-200 text-slate-900 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <SectionFadeIn>
          <p className="mt-12 text-center text-lg text-slate-500">
            All plans include 14-day free trial · Annual billing available (20%
            discount)
          </p>
        </SectionFadeIn>
      </div>
    </section>
  );
}
