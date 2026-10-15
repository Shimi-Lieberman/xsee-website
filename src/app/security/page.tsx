import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";
import CopyEmailButton from "@/components/CopyEmailButton";

export const metadata: Metadata = {
  title: "Security & Trust — XSEE",
  description:
    "How XSEE connects to your AWS account with a read-only IAM role, what it can read, and how to report a vulnerability.",
};

const H2 = "text-xl font-bold text-[#0b1220] mb-6";

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

const SECURITY_CONTROLS = [
  {
    title: "Read-only IAM boundary",
    status: "Active",
    statusVariant: "green" as const,
    description: "Assessment access is limited to the read-only role you create.",
    Icon: IconShield,
  },
  {
    title: "No agents installed",
    status: "Active",
    statusVariant: "green" as const,
    description: "Assessment requires no agent installation in your account.",
    Icon: IconCloud,
  },
  {
    title: "Evidence integrity",
    status: "Active",
    statusVariant: "green" as const,
    description:
      "Evidence records include hashes so later changes can be detected. A hash shows a record is unaltered, not that an attack succeeds.",
    Icon: IconStar,
  },
  {
    title: "Revocable access",
    status: "Active",
    statusVariant: "green" as const,
    description: "Delete the IAM role at any time to end XSEE access to your account.",
    Icon: IconKey,
  },
];

const TRUST_POINTS = [
  {
    title: "Read-only IAM role",
    description:
      "You create the role and choose its policy. The assessment flow uses the AWS-managed ReadOnlyAccess policy, which grants no write actions.",
    Icon: IconShield,
  },
  {
    title: "No agents installed",
    description: "Nothing is installed on your instances or deployed into your workloads.",
    Icon: IconCloud,
  },
  {
    title: "What the role can read",
    description:
      "XSEE analysis uses AWS configuration and policy metadata. Note that ReadOnlyAccess also permits some data reads, such as S3 objects. If you need a narrower scope, ask us about a custom policy.",
    Icon: IconLock,
  },
  {
    title: "Your team applies fixes",
    description:
      "XSEE does not make changes in your AWS account. Your team decides on and applies any remediation, then XSEE can re-check the path.",
    Icon: IconUserCheck,
  },
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
      <div style={{ background: "#f7f9fc", minHeight: "100vh", paddingTop: "80px" }}>
        <div className="w-full max-w-[720px] mx-auto px-6">
          <header className="mb-14">
            <h1 className="text-4xl font-black tracking-tight text-[#0b1220] mb-4">Security &amp; Trust</h1>
            <p className="text-lg leading-relaxed text-[#475569]">
              How XSEE protects your environment and your data.
            </p>
          </header>

          {/* Section 1 — Security controls */}
          <section className="mb-16" aria-labelledby="sec-controls">
            <h2 id="sec-controls" className={H2}>
              Security controls
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SECURITY_CONTROLS.map(({ title, status, statusVariant, description, Icon }) => (
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
                  style={{ background: "#ffffff", border: "1px solid rgba(11,18,32,0.08)", boxShadow: "0 6px 20px -16px rgba(11,18,32,0.18)" }}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#FF1B8D]"
                    style={{ background: "rgba(255,27,141,0.1)", border: "1px solid rgba(255,27,141,0.2)" }}
                    aria-hidden
                  >
                    <Icon className="text-[#FF1B8D]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-1.5 text-sm font-semibold text-[#0b1220]">{title}</h3>
                    <p className="text-sm leading-relaxed text-[#475569]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 — Infrastructure */}
          <section className="mb-16" aria-labelledby="sec-infra">
            <h2 id="sec-infra" className={H2}>
              Infrastructure and data handling
            </h2>
            <p className="text-sm leading-relaxed text-[#475569]">
              Details on hosting, encryption, data retention and access controls are available on request as part of
              our security documentation. Contact{" "}
              <a href="mailto:security@xsee.io" className="font-semibold text-[#d4006e] hover:underline">
                security@xsee.io
              </a>
              .
            </p>
          </section>

          {/* Section 4 — Disclosure */}
          <section className="mb-16" aria-labelledby="sec-disclosure">
            <h2 id="sec-disclosure" className={H2}>
              Responsible Disclosure
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[#475569]">
              Report vulnerabilities to{" "}
              <a href="mailto:security@xsee.io" className="font-semibold text-[#d4006e] hover:underline">
                security@xsee.io
              </a>
              . We review every report and will reply to coordinate next steps.
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#475569]">
              <li>Please give us reasonable time to investigate before any public disclosure.</li>
              <li>
                PGP key: available on request at{" "}
                <a href="mailto:security@xsee.io" className="text-[#d4006e] hover:underline">
                  security@xsee.io
                </a>
                .
              </li>
            </ul>
            <div
              className="mb-5 flex flex-col gap-4 rounded-xl p-5 sm:flex-row sm:items-center sm:justify-between"
              style={{ background: "#ffffff", border: "1px solid rgba(11,18,32,0.08)", boxShadow: "0 6px 20px -16px rgba(11,18,32,0.18)" }}
            >
              <div>
                <div className="mb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#7c8aa0]">Email</div>
                <a href="mailto:security@xsee.io" className="text-base font-semibold text-[#d4006e] hover:underline">
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
                href="mailto:security@xsee.io?subject=Security%20documentation%20request"
                className="inline-flex items-center justify-center rounded-lg border border-[rgba(11,18,32,0.14)] bg-white px-5 py-3 text-sm font-semibold text-[#0b1220] transition-colors hover:border-[#FF1B8D]/50 hover:bg-[#FF1B8D]/5"
              >
                Request security documentation →
              </a>
              <a
                href="mailto:security@xsee.io?subject=Data%20processing%20agreement%20request"
                className="inline-flex items-center justify-center rounded-lg border border-[rgba(11,18,32,0.14)] bg-white px-5 py-3 text-sm font-semibold text-[#0b1220] transition-colors hover:border-[#FF1B8D]/50 hover:bg-[#FF1B8D]/5"
              >
                Request data processing agreement →
              </a>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-[#7c8aa0]">
              For security documentation or data processing agreement requests, contact security@xsee.io.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
