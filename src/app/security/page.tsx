import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Security & Trust — XSEE",
  description: "How XSEE handles your AWS credentials, data, and access. Read-only IAM, ephemeral credentials, no data stored.",
};

const DATA_TABLE = [
  { type: "AWS credentials", stored: "Never stored", retention: "N/A" },
  { type: "Scan results (attack paths, findings)", stored: "Yes, encrypted", retention: "90 days default, configurable" },
  { type: "Asset inventory (resource metadata)", stored: "Yes, encrypted", retention: "Retained while account connected" },
  { type: "CloudTrail logs", stored: "Never stored", retention: "Queried live, not retained" },
  { type: "Your source code / application data", stored: "Never accessed", retention: "N/A" },
] as const;

export default function SecurityPage() {
  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <section className="section sec-navy" style={{ background: "#050d1a", paddingTop: 56, paddingBottom: 72 }}>
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow mb-4 inline-block">Security &amp; Trust</span>
              <h1 className="display-lg mb-6 text-white">Security is our product. It has to be our practice too.</h1>
            </div>
          </div>
        </section>

        <div className="sec-transition sec-dark-to-light" />

        <section className="section sec-light" style={{ background: "#f8fafc" }}>
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="display-md mb-6 text-slate-900">How XSEE accesses your AWS environment</h2>
              <ul className="mb-8 list-disc space-y-3 pl-5 text-slate-600">
                <li>Read-only IAM role only — <strong className="text-slate-800">ReadOnlyAccess</strong> AWS managed policy</li>
                <li>XSEE never writes to your environment</li>
                <li>Credentials are ephemeral — never stored after scan completes</li>
                <li>You can revoke access in one click at any time</li>
                <li>Cross-account role trust — you control it, you can delete it instantly</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="sec-transition sec-light-to-dark" />

        <section className="section sec-navy" style={{ background: "#050d1a" }}>
          <div className="container">
            <h2 className="display-md mb-8 text-white">What data XSEE stores</h2>
            <div className="cmp-wrap overflow-x-auto">
              <table className="cmp-table text-left">
                <thead>
                  <tr>
                    <th>Data Type</th>
                    <th>Stored?</th>
                    <th>Retention</th>
                  </tr>
                </thead>
                <tbody>
                  {DATA_TABLE.map((row) => (
                    <tr key={row.type}>
                      <td>{row.type}</td>
                      <td>{row.stored}</td>
                      <td>{row.retention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section sec-navy" style={{ background: "#080c14" }}>
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="display-md mb-6 text-white">Infrastructure</h2>
              <ul className="list-disc space-y-3 pl-5 text-slate-400">
                <li>Hosted on AWS (us-east-1)</li>
                <li>All data encrypted at rest (AES-256) and in transit (TLS 1.3)</li>
                <li>RDS encrypted storage</li>
                <li>No third-party analytics on the platform (no Mixpanel, no Segment, no Hotjar)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section sec-navy border-t border-white/5" style={{ background: "#050d1a" }}>
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="display-md mb-6 text-white">Compliance roadmap</h2>
              <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#0a1628] p-6 font-mono text-sm leading-relaxed text-slate-300">
                {`SOC 2 Type II          In progress — target Q3 2026
ISO 27001              Planned Q4 2026
GDPR                   Compliant — data processing agreement available on request
AWS Partner Network    Application submitted`}
              </pre>
            </div>
          </div>
        </section>

        <section className="section sec-navy pb-20" style={{ background: "#050d1a" }}>
          <div className="container">
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <h2 className="mb-4 text-lg font-bold text-white">Report a vulnerability</h2>
              <p className="mb-6 text-slate-400">
                Found a security issue in XSEE? We take this seriously. Email{" "}
                <a href="mailto:security@xsee.io" className="text-[#ff2d78] hover:underline">
                  security@xsee.io
                </a>{" "}
                with details. We commit to acknowledging within 24 hours and resolving critical issues within 72 hours.
              </p>
              <Link href="/" className="btn btn-secondary text-sm">
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
