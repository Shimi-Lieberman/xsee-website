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
  background: "rgba(234, 179, 8, 0.12)",
  color: "#b45309",
  border: "1px solid rgba(234, 179, 8, 0.3)",
} as const;

type Feature = { title: string; body: string };

type Release = { date: string; version: string; features: Feature[] };

const releases: Release[] = [
  {
    date: "April 26, 2026",
    version: "v0.9",
    features: [
      {
        title: "Explorer views",
        body: "Explorer views for attack paths, network, CI/CD, non-human identities and IAM, built from the connected account's configuration.",
      },
      {
        title: "Evidence labels on path steps",
        body: "Each step on a path now shows what was checked — a configuration observation, a permission simulation result, or untested — along with the recorded AWS request ID where one exists.",
      },
      {
        title: "Shared steps and reachability",
        body: "Select a resource to see what is reachable from it. Steps shared by several paths are highlighted, so teams can review fixes that may affect more than one path.",
      },
      {
        title: "Closure records",
        body: "After your team applies a fix, XSEE can re-check the same path and record the conditions tested and the time of the check. A record covers that path only.",
      },
    ],
  },
  {
    date: "April 19, 2026",
    version: "v0.8",
    features: [
      {
        title: "Backup exposure view",
        body: "Highlights paths that reach backup and recovery resources, based on the connected account's configuration.",
      },
      {
        title: "Fix review",
        body: "Suggested fixes are shown alongside the paths they affect, for your team to review and apply.",
      },
    ],
  },
  {
    date: "April 12, 2026",
    version: "v0.7",
    features: [
      {
        title: "IAM permission simulation",
        body: "Path steps that depend on IAM permissions can be checked with the AWS IAM policy simulator. A result shows what policy allows for that principal and action; it does not show that the action was performed.",
      },
      {
        title: "AI-assisted explanations",
        body: "Plain-language explanations of paths and suggested fixes, based on the account's scan data. Outputs should be reviewed by your team.",
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
          background: "#f7f9fc",
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
              color: "#0b1220",
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
              color: "#48526b",
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
                  releaseIndex < releases.length - 1 ? "1px solid rgba(11,18,32,0.08)" : "none",
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
                    color: "#0b1220",
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
                      color: "#0b1220",
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
                      color: "#48526b",
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
