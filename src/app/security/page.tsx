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

        <section
          className="section sec-navy border-t border-white/[0.06]"
          style={{ background: "#050d1a", paddingTop: 56, paddingBottom: 64 }}
        >
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="display-md mb-6 font-extrabold text-white" style={{ fontWeight: 800 }}>
                Two roles. You control both.
              </h2>
              <div className="mb-10 space-y-5 text-[15px] leading-[1.8] text-[#94A3B8]">
                <p>
                  XSEE uses two separate IAM roles — you create both, you control both, you can revoke both at any time.
                </p>
                <div className="space-y-2">
                  <p className="font-bold text-[#F8FAFC]">ROLE 1 — XSEE Scanner (always required):</p>
                  <p>Policy: AWS managed ReadOnlyAccess</p>
                  <p>Used for: discovery, validation, simulation</p>
                  <p>This role never changes. Always read-only.</p>
                  <p>XSEE observes your environment — never modifies it through this role.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-[#F8FAFC]">ROLE 2 — XSEE Remediation Agent (optional):</p>
                  <p>Policy: Scoped write permissions only</p>
                  <p>Used for: applying approved fixes</p>
                  <p>Created by you when you&apos;re ready for one-click remediation.</p>
                  <p>Every fix requires your explicit approval.</p>
                  <p>Auto-rolled back if verification fails.</p>
                </div>
                <div>
                  <p className="mb-2 font-bold text-[#34D399]">Permitted write actions (only these):</p>
                  <ul className="space-y-1 font-mono text-[13px] text-[#94A3B8]">
                    <li>+ ec2:RevokeSecurityGroupIngress</li>
                    <li>+ iam:DetachRolePolicy</li>
                    <li>+ s3:PutBucketPublicAccessBlock</li>
                    <li>+ iam:PutRolePolicy (restrict, not expand)</li>
                  </ul>
                </div>
                <div>
                  <p className="mb-2 font-bold text-[#F87171]">Never permitted (ever):</p>
                  <ul className="space-y-1 font-mono text-[13px] text-[#94A3B8]">
                    <li>✗ iam:DeleteRole</li>
                    <li>✗ iam:CreateUser</li>
                    <li>✗ s3:DeleteBucket</li>
                    <li>✗ Any destructive action</li>
                    <li>✗ Any crown jewel path (always human)</li>
                  </ul>
                </div>
                <p>
                  XSEE never takes action without your explicit approval. Every automated action is logged with full audit trail.
                </p>
              </div>

              <div className="mt-10">
                <h3 className="sec-info-box-title mb-4 text-left">Scanner role</h3>
                <div className="sec-info-box">
                  <h4 className="sec-info-box-title">IAM role details</h4>
                  <dl className="sec-info-dl">
                    <dt>Policy</dt>
                    <dd>AWS managed ReadOnlyAccess</dd>
                    <dt>Trust</dt>
                    <dd>XSEE account ID 722375386510</dd>
                    <dt>External ID</dt>
                    <dd>Unique per organization</dd>
                    <dt>Session duration</dt>
                    <dd>Scan duration only</dd>
                    <dt>Revocation</dt>
                    <dd>Delete role in AWS console</dd>
                  </dl>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="sec-info-box-title mb-4 text-left">Remediation role</h3>
                <div className="sec-info-box">
                  <h4 className="sec-info-box-title">IAM role details</h4>
                  <dl className="sec-info-dl">
                    <dt>Policy</dt>
                    <dd>Scoped write (customer-defined)</dd>
                    <dt>Trigger</dt>
                    <dd style={{ color: "#34D399" }}>Human approval only</dd>
                    <dt>Rollback</dt>
                    <dd style={{ color: "#34D399" }}>Automatic if verification fails</dd>
                    <dt>Audit</dt>
                    <dd>Full log of every action</dd>
                    <dt>Revocation</dt>
                    <dd>Delete role in AWS console</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section sec-navy border-t border-white/[0.06]" style={{ background: "#050d1a" }}>
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
