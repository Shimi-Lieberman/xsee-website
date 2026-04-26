import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Changelog — XSEE",
  description: "What shipped in XSEE. Public shiplog of platform releases.",
};

const BADGE_STYLE = {
  display: "inline-block",
  padding: "2px 8px",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 600,
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.02em",
  background: "rgba(234, 179, 8, 0.10)",
  color: "#fbbf24",
  border: "1px solid rgba(234, 179, 8, 0.2)",
} as const;

type Feature = { title: string; body: string };

type Release = { date: string; version: string; features: Feature[] };

const releases: Release[] = [
  {
    date: "April 26, 2026",
    version: "v0.9",
    features: [
      {
        title: "Explorer Graph — 5 tabs with real data",
        body: "All 5 Explorer tabs (Attack Paths, Network, CI/CD, NHI, IAM) now show real AWS data from your environment. Every node is a real resource with its actual name, ARN, and risk level.",
      },
      {
        title: "L2 Evidence Layer",
        body: "Every edge on the attack graph shows whether XSEE called the AWS API and what it returned. Click any edge to see the AWS requestId — cryptographic proof the hop is real. No other tool shows this.",
      },
      {
        title: "Choke Points + Blast Radius",
        body: "Right-click any node to see its blast radius — every resource an attacker could reach from that point. Nodes appearing in 3+ attack paths are highlighted as choke points: fixing one closes multiple paths simultaneously.",
      },
      {
        title: "Cinematic Breach Simulation",
        body: "Watch an attacker move through your real infrastructure. Pink cursor traverses each hop. Detection gaps show as silent invisible steps. Crown jewel reached: financial counter climbs to your actual exposure. BREACH SUCCESSFUL.",
      },
      {
        title: "Breach Prevention Certificate",
        body: "When a path is validated, fixed, and re-validated — XSEE issues a signed certificate. Board-ready. Timestamped. Verifiable by third parties via SHA-256 hash.",
      },
    ],
  },
  {
    date: "April 19, 2026",
    version: "v0.8",
    features: [
      {
        title: "Ransomware Readiness Score",
        body: "Every environment gets a 0–100 Ransomware Readiness Score. CRITICAL means an attacker can delete your backups with no recovery path. The score is connected to your real attack paths — not a questionnaire.",
      },
      {
        title: "Optimal Cut-Point",
        body: "XSEE identifies the single fix that closes the most validated attack paths simultaneously. Shown as ⚡ Priority Fix badge on the path and in Stage 5.",
      },
      {
        title: "Autonomous Loop",
        body: "One scan trigger runs all 7 stages automatically: Discover → Validate → Simulate → Prioritize → Fix → Verify → Certify. One human decision. Everything else: XSEE.",
      },
    ],
  },
  {
    date: "April 12, 2026",
    version: "v0.7",
    features: [
      {
        title: "L2 Validation — Live AWS API per hop",
        body: "XSEE calls iam:SimulatePrincipalPolicy for every hop in every attack path. Result: ALLOW or DENY with AWS requestId. Theoretical paths are separated from proven exploitable paths.",
      },
      {
        title: "XseeCyber — Breach Simulation Engine",
        body: "Active attacker simulation on your real AWS graph. MITRE ATT&CK cloud matrix with 45 techniques across 10 tactics. Detection gap scoring per technique. AI-generated attack variants.",
      },
      {
        title: "Claude AI Engine",
        body: "5 capabilities: explain path, explain remediation, investigate story, executive risk summary, ask anything. Streaming responses. Every investigation generates a board-ready narrative.",
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <main
        style={{
          background: "#030810",
          minHeight: "100vh",
          paddingTop: 88,
          paddingBottom: 48,
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "80px 24px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
              fontFamily: "var(--font-sans)",
            }}
          >
            Changelog
          </h1>
          <p
            style={{
              color: "rgba(148, 163, 184, 0.9)",
              fontSize: 14,
              lineHeight: 1.6,
              margin: "0 0 48px",
              maxWidth: 560,
            }}
          >
            What shipped. New capabilities and improvements to the XSEE platform.
          </p>

          {releases.map((release, releaseIndex) => (
            <article
              key={release.version}
              style={{
                borderBottom:
                  releaseIndex < releases.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                paddingBottom: releaseIndex < releases.length - 1 ? 48 : 0,
                marginBottom: releaseIndex < releases.length - 1 ? 48 : 0,
              }}
            >
              <header
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "12px 16px",
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,0.88)",
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 1.6,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {release.date}
                </span>
                <span style={BADGE_STYLE}>{release.version}</span>
              </header>

              {release.features.map((feature) => (
                <div key={feature.title} style={{ marginBottom: 26 }}>
                  <h2
                    style={{
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 600,
                      lineHeight: 1.5,
                      margin: "0 0 8px",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {feature.title}
                  </h2>
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: 13,
                      lineHeight: 1.6,
                      margin: 0,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {feature.body}
                  </p>
                </div>
              ))}
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
