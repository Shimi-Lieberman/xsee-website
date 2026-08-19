import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export const metadata: Metadata = {
  title: "Privacy Policy | XSEE",
  description: "How XSEE collects, stores, and protects your data.",
};

const wrap = { maxWidth: 720, margin: "0 auto", padding: "0 24px" } as const;
const h2 = {
  fontSize: 18,
  fontWeight: 700 as const,
  color: "#0b1220",
  marginTop: 36,
  marginBottom: 12,
  letterSpacing: "-0.02em",
};
const p = { fontSize: 15, lineHeight: 1.65, color: "#48526b", margin: "0 0 12px" } as const;

export default function PrivacyPage() {
  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <main style={{ background: "#f7f9fc", minHeight: "100vh", paddingTop: 88, paddingBottom: 64 }}>
        <article style={wrap}>
          <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7c8aa0", marginBottom: 12 }}>
            Legal
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#0b1220", margin: "0 0 8px", letterSpacing: "-0.03em" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 13, color: "#7c8aa0", marginBottom: 32 }}>Last updated: April 2026</p>

          <section>
            <h2 style={h2}>1. What we collect</h2>
            <p style={p}>
              AWS scan results and validated attack-path metadata from your connected accounts; account and billing
              information you provide; and usage logs for the XSEE service (sign-in, API requests, and support
              interactions).
            </p>
          </section>

          <section>
            <h2 style={h2}>2. How stored</h2>
            <p style={p}>
              Data is stored in encrypted AWS RDS databases in <strong style={{ color: "#0b1220" }}>us-east-1</strong>.
              Encryption in transit uses TLS. Access is restricted to authorized operations staff under least privilege.
            </p>
          </section>

          <section>
            <h2 style={h2}>3. Retention</h2>
            <p style={p}>Default retention for scan and product data is <strong style={{ color: "#0b1220" }}>12 months</strong>, unless a different period is agreed in writing or required by law.</p>
          </section>

          <section>
            <h2 style={h2}>4. Your rights</h2>
            <p style={p}>
              You may request access, correction, export, or deletion of personal data. For deletion requests, email{" "}
              <Link href="mailto:privacy@xsee.io" style={{ color: "#d4006e" }}>
                privacy@xsee.io
              </Link>
              . We will respond and complete eligible requests within a <strong style={{ color: "#0b1220" }}>30-day SLA</strong>.
            </p>
          </section>

          <section>
            <h2 style={h2}>5. Contact</h2>
            <p style={{ ...p, marginBottom: 0 }}>
              Questions about this policy:{" "}
              <Link href="mailto:privacy@xsee.io" style={{ color: "#d4006e" }}>
                privacy@xsee.io
              </Link>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
