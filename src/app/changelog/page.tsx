import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Changelog — XSEE",
  description: "What's new in XSEE. Platform updates, new engines, and improvements.",
};

const releases = [
  {
    date: "April 2026",
    version: "v1.5.0",
    tag: "Release" as const,
    title: "Autonomous Agents — now live",
    description:
      "XSEE now ships autonomous agents that run the security loop from investigation through verified closure.",
    highlights: [
      "Investigation Agent: auto-investigates every new critical path with Claude AI. Produces verdict, confidence score, fix plan, compliance impact, board summary.",
      "Board Report Agent: weekly PDF emailed to CISO every Monday automatically. No action required.",
      "Threat Hunt Agent: nightly CVE matching via NVD + CISA KEV against your asset inventory. Finds threats before you hear about them elsewhere.",
      "Remediation Agent: applies approved fixes via AWS SDK. Only activates after explicit human approval. Auto-reverts if L2 re-validation fails.",
      "Configurable schedules: every agent schedule is configurable per org in Settings → Agent Schedules.",
      "War Room: full-screen real-time investigation command center. Opens automatically on new critical path.",
      "Autonomous Runs: complete audit trail of every AI action and human decision. Replaces manual Playbooks.",
      "Accept Risk: suppress false positives with required reason and 90-day auto-expiry.",
      "Overview redesigned as Command Center: live loop status, approval queue, activity feed.",
      "Evidence Package PDF: premium board-ready redesign with dark cover and pink accents.",
    ],
  },
  {
    date: "March 2026",
    version: "v1.4.0",
    tag: "Release" as const,
    title: "Evidence package and closure workflow upgrades",
    description: "Board and audit workflows now ship with stronger proof and approval controls.",
    highlights: [
      "Evidence Package PDF: 6-section cryptographic proof document per finding. Downloadable from any path.",
      "Breach Prevention Certificate: board-ready PDF issued automatically when path is verified closed.",
      "Approval Queue: every proposed fix requires human approval before execution.",
      "XseeCyber 2.0: AI attacker simulation added alongside human attacker models.",
      "Detection Coverage Score: per-path measurement of what your tools actually catch.",
    ],
  },
  {
    date: "March 2026",
    version: "v1.4",
    tag: "New Feature" as const,
    title: "Ransomware Readiness Score",
    description:
      "Board-ready ransomware exposure score (0–100) with validated attack paths mapped to ransomware TTPs. Exportable PDF report. Available on all plans.",
  },
  {
    date: "February 2026",
    version: "v1.3",
    tag: "New Feature" as const,
    title: "NHI Full Inventory + L2 Validation",
    description:
      "Complete Non-Human Identity mapping — Lambda roles, CI/CD tokens, AI agent identities. Dormant NHI detection. L2-validated attack paths through every NHI.",
  },
  {
    date: "February 2026",
    version: "v1.2",
    tag: "Improvement" as const,
    title: "CI/CD Pipeline Security + OIDC Misconfiguration Detection",
    description:
      "Attack paths through CI/CD pipelines. GitHub Actions OIDC misconfiguration detection. Privilege escalation via pipeline roles validated by L2.",
  },
  {
    date: "January 2026",
    version: "v1.1",
    tag: "New Feature" as const,
    title: "Financial Exposure Per Path",
    description:
      "Every attack path now shows validated financial exposure using IBM Cost of a Data Breach methodology ($164/record). Crown jewel assets tagged with blast radius.",
  },
] as const;

const tagClass: Record<string, string> = {
  Release: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
  "New Feature": "bg-sky-500/20 text-sky-300 border-sky-500/30",
  Improvement: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Fix: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export default function ChangelogPage() {
  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <main className="min-h-screen pb-8 w-full" style={{ paddingTop: 88 }}>
        <section className="page-container-sm">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white">Changelog</h1>
          <p className="mb-14 text-slate-400">Platform updates, new engines, and improvements.</p>

          <ol className="relative border-l border-white/10 pl-8">
            {releases.map((r) => (
              <li key={r.version} className="mb-14 last:mb-0">
                <span className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full bg-[#ff2d78]" />
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm font-bold text-white">{r.version}</span>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tagClass[r.tag]}`}
                  >
                    {r.tag}
                  </span>
                  <span className="text-xs text-slate-500">{r.date}</span>
                </div>
                <h2 className="mb-2 text-xl font-bold text-white">{r.title}</h2>
                <p className="text-slate-400 leading-relaxed">{r.description}</p>
                {"highlights" in r && Array.isArray(r.highlights) ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                    {r.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
