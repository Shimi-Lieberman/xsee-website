"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Analytics } from "@/lib/analytics";

const PATH_STEPS = [
  { label: "Public entry", detail: "Internet-facing resource" },
  { label: "Workload identity", detail: "AWS role and permissions" },
  { label: "Sensitive service", detail: "Potential path destination" },
] as const;

function AttackPathPreview() {
  return (
    <div className="xsee-product-preview" aria-label="Illustrative AWS attack path review">
      <div className="xsee-preview-header">
        <div>
          <span className="xsee-preview-kicker">ATTACK PATH REVIEW</span>
          <p style={{ color: "#f5f7fa" }}>Reachability, in context</p>
        </div>
        <span className="xsee-preview-badge"><i aria-hidden />Illustrative path</span>
      </div>

      <div className="xsee-preview-path" aria-label="Example path from public entry through workload identity to a sensitive service">
        {PATH_STEPS.map((step, index) => (
          <div className="xsee-preview-path-item" key={step.label}>
            <div className="xsee-preview-node">
              <span className="xsee-preview-node-index">0{index + 1}</span>
              <div>
                <strong>{step.label}</strong>
                <span>{step.detail}</span>
              </div>
              <Check size={15} aria-hidden />
            </div>
            {index < PATH_STEPS.length - 1 ? <div className="xsee-preview-connector" aria-hidden /> : null}
          </div>
        ))}
      </div>

      <div className="xsee-preview-note">
        <ShieldCheck size={16} aria-hidden />
        <span>Evidence-led review. Your team decides and applies any change.</span>
      </div>
      <p className="xsee-preview-disclaimer">Illustrative workflow · no customer environment shown</p>
    </div>
  );
}

export default function HomeHero() {
  return (
    <section id="top" className="xsee-buyer-hero relative overflow-hidden px-5 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-10 lg:pb-20 lg:pt-16">
      <div className="xsee-grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="xsee-buyer-hero-layout relative mx-auto max-w-[1400px]">
        <div className="xsee-buyer-hero-copy">
          <p className="xsee-buyer-eyebrow"><span className="xsee-status-dot" aria-hidden />AWS CLOUD SECURITY</p>
          <h1 className="text-balance">
            Validate attack paths.<br className="hidden sm:block" /> <span>Verify the fix.</span>
          </h1>
          <p className="xsee-buyer-hero-description">
            XSEE helps AWS security teams validate reachable attack paths, prioritize remediation, and verify closure—with evidence that can be revisited when the environment changes.
          </p>
          <div className="xsee-buyer-hero-actions">
            <Link
              href="mailto:sales@xsee.io?subject=Book%20an%20XSEE%20demo"
              className="xsee-primary-cta"
              onClick={() => Analytics.ctaClicked("hero", "book_demo")}
            >
              Book a demo <ArrowRight size={16} aria-hidden />
            </Link>
            <a className="xsee-secondary-cta" href="#workflow">
              Explore the workflow <ArrowDown size={15} aria-hidden />
            </a>
          </div>
        </div>
        <AttackPathPreview />
      </div>
    </section>
  );
}
