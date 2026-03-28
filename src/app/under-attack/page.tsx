import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import GlobalScripts from "@/components/GlobalScripts";
import UnderAttackForm from "@/components/UnderAttackForm";

export const metadata: Metadata = {
  title: "Under Attack? — XSEE Emergency Response",
  description:
    "Active breach in your AWS environment? XSEE can map your attack surface and validate active paths in under 30 minutes. Emergency scan available.",
};

const TIMELINE = [
  {
    title: "Minutes 1–2",
    body: "Connect read-only IAM. No agents. No risk of interfering with your incident response.",
  },
  {
    title: "Minutes 2–15",
    body: "Map every asset, identity, and permission edge currently in your environment. Build the live attack graph against 1,000+ known attack patterns.",
  },
  {
    title: "Minutes 15–25",
    body: "L2 validation — call live AWS APIs to determine which paths are currently confirmed exploitable. Find where the attacker has already been, and where they can still go.",
  },
  {
    title: "Minutes 25–30",
    body: "Deliver prioritized report: active paths, blast radius per path, immediate containment actions.",
  },
] as const;

const CHECKLIST_LINES = [
  "Immediately revoke any suspicious IAM access keys via AWS Console → IAM → Users",
  "Enable AWS CloudTrail in all regions if not already active",
  "Check CloudTrail for AssumeRole, CreateUser, AttachUserPolicy events in last 24h",
  "Isolate the suspected compromised instance (modify its Security Group to deny all)",
  "Do NOT shut down the instance — preserve forensic evidence",
  "Then connect XSEE to map what they can still reach",
] as const;

export default function UnderAttackPage() {
  return (
    <div className="ua-page ua-page--emergency">
      <ScrollProgressBar />
      <GlobalScripts />
      <Nav />

      <main className="ua-main">
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full border border-red-500/40 bg-red-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-400">
              Emergency
            </span>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Under active attack in AWS?
            </h1>
            <p className="text-lg text-slate-400 md:text-xl">
              XSEE can map your attack surface, validate active paths, and show you exactly where the attacker is moving — in under 30 minutes.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/?subject=emergency#contact"
                className="btn btn-lg inline-flex bg-red-600 text-white shadow-[0_0_24px_rgba(239,68,68,0.35)] transition-all hover:scale-[1.02] hover:bg-red-500"
              >
                Request Emergency Scan →
              </Link>
              <a href="tel:+15555550100" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
                Call us: +1 (555) 555-0100
              </a>
            </div>
          </div>

          <section className="mx-auto mt-20 max-w-3xl" aria-labelledby="ua-timeline-title">
            <h2 id="ua-timeline-title" className="mb-10 text-center text-2xl font-bold text-white">
              What XSEE does in the first 30 minutes during an active incident
            </h2>
            <ol className="relative space-y-0 border-l border-red-500/30 pl-8">
              {TIMELINE.map((step, i) => (
                <li key={step.title} className="mb-10 last:mb-0">
                  <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-red-500 bg-[#050d1a]" />
                  <h3 className="text-lg font-bold text-red-400">{step.title}</h3>
                  <p className="mt-2 text-slate-400">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mx-auto mt-16 max-w-3xl" aria-labelledby="ua-checklist-title">
            <h2 id="ua-checklist-title" className="mb-4 text-lg font-bold text-white">
              Containment checklist
            </h2>
            <p className="mb-4 text-sm text-slate-500">If you suspect active compromise:</p>
            <div className="rounded-xl border border-white/10 bg-[#0a1628] p-6 font-mono text-sm leading-relaxed text-slate-300">
              {CHECKLIST_LINES.map((line) => (
                <div key={line} className="border-b border-white/5 py-2 last:border-0">
                  □ {line}
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-20 max-w-lg" aria-labelledby="ua-form-title">
            <h2 id="ua-form-title" className="mb-6 text-center text-xl font-bold text-white">
              Emergency contact
            </h2>
            <UnderAttackForm />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
