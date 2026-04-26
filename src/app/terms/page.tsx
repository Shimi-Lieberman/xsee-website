import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export const metadata: Metadata = {
  title: "Terms of Service | XSEE",
  description: "Terms of Service for the XSEE website and services.",
};

const wrap = { maxWidth: 720, margin: "0 auto", padding: "0 24px" } as const;
const h2 = {
  fontSize: 18,
  fontWeight: 700 as const,
  color: "#fff",
  marginTop: 36,
  marginBottom: 12,
  letterSpacing: "-0.02em",
};
const p = { fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.65)", margin: "0 0 12px" } as const;

export default function TermsPage() {
  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <main style={{ background: "#030810", minHeight: "100vh", paddingTop: 88, paddingBottom: 64 }}>
        <article style={wrap}>
          <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>
            Legal
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.03em" }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>Last updated: April 2026</p>

          <section>
            <h2 style={h2}>Acceptance</h2>
            <p style={p}>
              By accessing or using XSEE&apos;s website, trial, or paid services, you agree to these Terms. If you do
              not agree, do not use the services.
            </p>
          </section>

          <section>
            <h2 style={h2}>Service description</h2>
            <p style={p}>
              XSEE provides cloud attack intelligence for AWS environments, including discovery, validation, simulation,
              and related reporting, as described in product documentation at the time of use.
            </p>
          </section>

          <section>
            <h2 style={h2}>User obligations</h2>
            <p style={p}>
              You represent that you have authority to connect the AWS accounts you register. You must comply with
              applicable laws, maintain the security of your credentials, and use the service only for lawful security
              purposes. You are responsible for actions taken under your account.
            </p>
          </section>

          <section>
            <h2 style={h2}>Data ownership</h2>
            <p style={p}>
              You retain ownership of your data. XSEE processes your scan and account data only to provide and improve
              the service, as described in our Privacy Policy. Outputs generated for you are licensed for your internal
              use during your subscription or trial.
            </p>
          </section>

          <section>
            <h2 style={h2}>Limitation of liability</h2>
            <p style={p}>
              To the maximum extent permitted by law, XSEE is not liable for indirect, incidental, special,
              consequential, or punitive damages, or for loss of profits, data, or goodwill. The service is provided
              &quot;as is&quot; without warranties except where expressly required by law.
            </p>
          </section>

          <section>
            <h2 style={h2}>Governing law</h2>
            <p style={p}>
              These Terms are governed by the laws of <strong style={{ color: "rgba(255,255,255,0.85)" }}>Israel</strong>, without regard to conflict-of-law rules. Courts in Israel shall have exclusive jurisdiction, subject to mandatory consumer protections where applicable.
            </p>
          </section>

          <section>
            <h2 style={h2}>Contact</h2>
            <p style={{ ...p, marginBottom: 0 }}>
              Legal inquiries:{" "}
              <Link href="mailto:legal@xsee.io" style={{ color: "#e91e8c" }}>
                legal@xsee.io
              </Link>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
