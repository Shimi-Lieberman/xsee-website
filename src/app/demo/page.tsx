import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Interactive Demo — XSEE",
  description:
    "See XSEE in action. Walk through live " +
    "attack path discovery, L2 validation with " +
    "real AWS API evidence, remediation, and a " +
    "board-ready certificate — in under 6 minutes.",
  openGraph: {
    title: "XSEE Interactive Demo — Prove Every Attack Path",
    description:
      "War Room → Attack Graph → L2 Proof → " +
      "Remediation → XseeCyber → Certificate. " +
      "The full autonomous security loop in 6 screens.",
    url: "https://xsee.io/demo",
    siteName: "XSEE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XSEE Interactive Demo",
    description:
      "See how XSEE proves attack paths with live " +
      "AWS API evidence and generates a board-ready " +
      "certificate in 28 minutes.",
  },
};

export default function DemoPage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#010912",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Minimal back link — top left, low opacity */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 16,
          zIndex: 9999,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            color: "rgba(100,116,139,.55)",
            textDecoration: "none",
            letterSpacing: ".06em",
            padding: "3px 8px",
            borderRadius: 4,
            border: "1px solid rgba(45,63,85,.35)",
            background: "rgba(4,12,28,.75)",
          }}
        >
          ← xsee.io
        </Link>
      </div>

      {/* Full-screen demo */}
      <iframe
        src="/xsee-demo.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
        title="XSEE Interactive Platform Demo"
        allow="clipboard-write"
      />
    </div>
  );
}
