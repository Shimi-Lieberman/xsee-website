import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";
import CopyEmailButton from "@/components/CopyEmailButton";

export const metadata: Metadata = {
  title: "Security & Trust — XSEE",
  description:
    "How XSEE protects your environment and your data. Compliance status, read-only IAM, infrastructure security, and responsible disclosure.",
};

const H2 = "text-xl font-bold text-white mb-6";

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLock({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCloud({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconKey({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="7.5" cy="15.5" r="5.5" stroke="currentColor" strokeWidth="2" />
      <path d="M21 2l-9.6 9.6M15.5 7.5l3 3L22 7l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconUserCheck({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const COMPLIANCE_CARDS = [
  {
    title: "SOC 2 Type II",
    status: "In Progress",
    statusVariant: "amber" as const,
    description:
      "Audit underway. Expected completion Q3 2026. Report available under NDA upon request.",
    Icon: IconShield,
  },
  {
    title: "CSA STAR Level 1",
    status: "In Progress",
    statusVariant: "amber" as const,
    description: "Cloud Security Alliance self-assessment. Submission in progress.",
    Icon: IconStar,
  },
  {
    title: "GDPR",
    status: "Compliant",
    statusVariant: "green" as const,
    description: "Data Processing Agreement available on request. EU data handling compliant.",
    Icon: IconLock,
  },
  {
    title: "AWS Hosted",
    status: "Active",
    statusVariant: "green" as const,
    description: "Hosted on AWS us-east-1. AES-256 encryption at rest and in transit.",
    Icon: IconCloud,
  },
];

const TRUST_POINTS = [
  {
    title: "Read-only IAM role",
    description:
      "You create the role. XSEE never writes to your environment. No resource creation, modification, or deletion — ever.",
    Icon: IconShield,
  },
  {
    title: "No agents installed",
    description:
      "Zero footprint inside your infrastructure. Nothing running in your workloads. Nothing installed on your instances.",
    Icon: IconCloud,
  },
  {
    title: "Credentials ephemeral",
    description:
      "XSEE assumes your role only during active scans. Sessions expire automatically. No persistent access to your account.",
    Icon: IconKey,
  },
  {
    title: "Your data never leaves your environment",
    description:
      "XSEE reads AWS API metadata only — resource IDs, policies, relationships. No file contents, no PII, no workload data.",
    Icon: IconLock,
  },
  {
    title: "Every action requires human approval",
    description:
      "No automated write actions without explicit CISO approval. Every change cryptographically logged to approving identity.",
    Icon: IconUserCheck,
  },
];

const INFRA_FACTS: { label: string; value: string }[] = [
  { label: "Hosting", value: "AWS us-east-1" },
  { label: "Encryption", value: "AES-256 at rest and in transit" },
  { label: "Database", value: "AWS RDS PostgreSQL — encrypted" },
  { label: "TLS", value: "1.2+ enforced everywhere" },
  { label: "Secrets", value: "AWS Secrets Manager" },
  { label: "Auth", value: "JWT with httpOnly cookies" },
  { label: "Access", value: "MFA required for all admin access" },
  { label: "Monitoring", value: "AWS CloudTrail + GuardDuty" },
];

function StatusBadge({ status, variant }: { status: string; variant: "amber" | "green" }) {
  const isAmber = variant === "amber";
  return (
    <span
      className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold font-mono uppercase tracking-wide"
      style={{
        background: isAmber ? "rgba(245,158,11,0.12)" : "rgba(34,197,94,0.12)",
        color: isAmber ? "#fbbf24" : "#4ade80",
        border: `1px solid ${isAmber ? "rgba(245,158,11,0.35)" : "rgba(34,197,94,0.35)"}`,
      }}
    >
      {status}
    </span>
  );
}

export default function SecurityPage() {
  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <div style={{ background: "#050d1a", minHeight: "100vh", paddingTop: "80px" }}>
        <div className="w-full max-w-[720px] mx-auto px-6">
          <header className="mb-14">
            <h1 className="text-4xl font-black tracking-tight text-white mb-4">Security &amp; Trust</h1>
            <p className="text-lg leading-relaxed text-white/45">
              How XSEE protects your environment and your data.
            </p>
          </header>

          {/* Section 1 — Compliance */}
          <section className="mb-16" aria-labelledby="sec-compliance">
            <h2 id="sec-compliance" className={H2}>
              Compliance
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {COMPLIANCE_CARDS.map(({ title, status, statusVariant, description, Icon }) => (
                <div
                  key={title}
                  className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 pt-6 shadow-sm"
                >
                  <div className="absolute right-4 top-4">
                    <StatusBadge status={status} variant={statusVariant} />
                  </div>
                  <div className="flex gap-4 pr-14">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600"
                      aria-hidden
                    >
                      <Icon className="text-slate-700" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-2 text-base font-bold text-slate-900">{title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 — How XSEE connects */}
          <section className="mb-16" aria-labelledby="sec-how-connects">
            <h2 id="sec-how-connects" className={H2}>
              How XSEE connects to your AWS account
            </h2>
            <div className="space-y-4">
              {TRUST_POINTS.map(({ title, description, Icon }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-xl p-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#FF1B8D]"
                    style={{ background: "rgba(255,27,141,0.12)", border: "1px solid rgba(255,27,141,0.2)" }}
                    aria-hidden
                  >
                    <Icon className="text-[#FF1B8D]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-1.5 text-sm font-semibold text-white">{title}</h3>
                    <p className="text-sm leading-relaxed text-white/45">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 — Infrastructure */}
          <section className="mb-16" aria-labelledby="sec-infra">
            <h2 id="sec-infra" className={H2}>
              Infrastructure
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {INFRA_FACTS.map((row) => (
                <div
                  key={row.label}
                  className="rounded-lg px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/30 font-mono">
                    {row.label}
                  </div>
                  <div className="text-sm font-medium leading-snug text-white/75">{row.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 — Disclosure */}
          <section className="mb-16" aria-labelledby="sec-disclosure">
            <h2 id="sec-disclosure" className={H2}>
              Responsible Disclosure
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-white/45">
              Report vulnerabilities to{" "}
              <a href="mailto:security@xsee.io" className="font-semibold text-[#FF1B8D] hover:underline">
                security@xsee.io
              </a>
              . We provide <strong className="text-white/60">48-hour acknowledgement</strong> on all reports and target{" "}
              <strong className="text-white/60">7 days</strong> to remediate or publish a mitigation plan for critical
              issues.
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/45">
              <li>We will not pursue legal action against good-faith researchers who follow these guidelines.</li>
              <li>Public disclosure should wait at least 90 days from our acknowledgement unless we agree otherwise.</li>
              <li>
                PGP key: available on request at{" "}
                <a href="mailto:security@xsee.io" className="text-[#FF1B8D] hover:underline">
                  security@xsee.io
                </a>
                .
              </li>
            </ul>
            <div
              className="mb-5 flex flex-col gap-4 rounded-xl p-5 sm:flex-row sm:items-center sm:justify-between"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div>
                <div className="mb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-white/30">Email</div>
                <a href="mailto:security@xsee.io" className="text-base font-semibold text-[#FF1B8D] hover:underline">
                  security@xsee.io
                </a>
              </div>
              <CopyEmailButton email="security@xsee.io" />
            </div>
          </section>

          {/* Section 5 — Documents */}
          <section className="mb-8" aria-labelledby="sec-docs">
            <h2 id="sec-docs" className={H2}>
              Security Documents
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="mailto:security@xsee.io?subject=SOC2%20Report%20Request"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#FF1B8D]/50 hover:bg-[#FF1B8D]/10"
              >
                Request SOC 2 Report →
              </a>
              <a
                href="mailto:security@xsee.io?subject=DPA%20Request"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#FF1B8D]/50 hover:bg-[#FF1B8D]/10"
              >
                Request DPA →
              </a>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-white/35">
              SOC 2 Type II report available under NDA. DPA available upon request for GDPR compliance.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
