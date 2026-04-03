import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Security & Trust — XSEE",
  description:
    "How XSEE handles your AWS credentials, data, and access. Read-only IAM, ephemeral credentials, no data stored after scan.",
};

export default function SecurityPage() {
  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <div style={{ background: "#050d1a", minHeight: "100vh", paddingTop: "80px" }}>
        <div className="max-w-3xl mx-auto w-full px-6 py-16">
          <div className="mb-16">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 font-mono mb-4">
              Security & Trust
            </div>
            <h1 className="text-4xl font-black text-white mb-4">
              Security is our product.
              <br />
              It has to be our practice too.
            </h1>
            <p className="text-white/45 text-lg">
              XSEE requires access to your AWS environment. Here is exactly what we access, what we store, and how you can revoke us in one click.
            </p>
          </div>

          <div className="mb-14">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span style={{ color: "#FF1B8D" }}>01</span>
              How XSEE accesses your AWS environment
            </h2>
            <div className="space-y-4 mb-6">
              {[
                {
                  step: "1",
                  title: "You create a read-only IAM role",
                  detail: "Uses AWS managed ReadOnlyAccess policy. Takes under 2 minutes. You control it entirely.",
                },
                {
                  step: "2",
                  title: "You paste the Role ARN into XSEE",
                  detail: "XSEE assumes the role via cross-account trust. We never see your AWS credentials.",
                },
                {
                  step: "3",
                  title: "Scan runs — credentials expire",
                  detail: "STS tokens are ephemeral. They expire automatically. We never store them.",
                },
                {
                  step: "4",
                  title: "You can revoke access in one click",
                  detail: "Delete the IAM role in your AWS console. XSEE immediately loses all access.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black font-mono"
                    style={{ background: "rgba(255,27,141,0.12)", color: "#FF1B8D" }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                    <div className="text-sm text-white/40">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-[10px] font-mono text-white/35 uppercase tracking-wider">Trust policy</span>
                <span className="text-[10px] text-white/25">Copy</span>
              </div>
              <pre className="p-4 text-xs font-mono text-white/60 overflow-x-auto" style={{ background: "#080c14" }}>
                {`{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "AWS": "arn:aws:iam::722375386510:root"
    },
    "Action": "sts:AssumeRole"
  }]
}`}
              </pre>
            </div>
          </div>

          <div className="mb-14">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span style={{ color: "#FF1B8D" }}>02</span>
              What data XSEE stores
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr
                    style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {["Data type", "Stored?", "Retention", "Encrypted"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-white/30 font-mono"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["AWS credentials", "Never", "N/A", "N/A"],
                    ["Scan results (findings)", "Yes", "90 days", "AES-256"],
                    ["Asset metadata", "Yes", "While connected", "AES-256"],
                    ["CloudTrail logs", "Never", "Not retained", "N/A"],
                    ["Source code", "Never accessed", "N/A", "N/A"],
                    ["Your application data", "Never accessed", "N/A", "N/A"],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td className="px-4 py-3 text-white/70 font-mono text-xs">{row[0]}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-bold font-mono ${
                            row[1] === "Never" || row[1] === "Never accessed" ? "text-emerald-400" : "text-white/50"
                          }`}
                        >
                          {row[1]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/35 text-xs">{row[2]}</td>
                      <td className="px-4 py-3 text-white/35 text-xs">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-14">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span style={{ color: "#FF1B8D" }}>03</span>
              Infrastructure
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Hosting", value: "AWS us-east-1" },
                { label: "Encryption at rest", value: "AES-256" },
                { label: "Encryption in transit", value: "TLS 1.3" },
                { label: "Database", value: "AWS RDS · encrypted" },
                { label: "Third-party analytics", value: "None on platform" },
                { label: "Agent required", value: "Never" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-4 py-3 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-xs text-white/35">{item.label}</span>
                  <span className="text-xs font-semibold text-white/70 font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-14">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span style={{ color: "#FF1B8D" }}>04</span>
              Compliance roadmap
            </h2>
            <div className="space-y-3">
              {[
                { standard: "SOC 2 Type II", status: "In progress", target: "Q3 2026", color: "#f97316" },
                { standard: "ISO 27001", status: "Planned", target: "Q4 2026", color: "#eab308" },
                { standard: "GDPR", status: "Compliant", target: "DPA available on request", color: "#22c55e" },
                { standard: "AWS Partner Network", status: "Application submitted", target: "2026", color: "#3b82f6" },
              ].map((item) => (
                <div
                  key={item.standard}
                  className="flex items-center justify-between px-4 py-3 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-sm font-semibold text-white/70">{item.standard}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-white/30">{item.target}</span>
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full font-mono"
                      style={{
                        background: `${item.color}15`,
                        color: item.color,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-6"
            style={{ background: "rgba(255,27,141,0.05)", border: "1px solid rgba(255,27,141,0.15)" }}
          >
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span style={{ color: "#FF1B8D" }}>05</span>
              Report a vulnerability
            </h2>
            <p className="text-white/45 text-sm leading-relaxed mb-4">
              Found a security issue in XSEE? We take this seriously. Email us with full details — we commit to acknowledging within 24 hours and resolving critical issues within 72 hours.
            </p>
            <a href="mailto:security@xsee.io" className="text-sm font-bold" style={{ color: "#FF1B8D" }}>
              security@xsee.io →
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
