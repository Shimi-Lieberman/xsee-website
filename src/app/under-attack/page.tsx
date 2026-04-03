import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import GlobalScripts from "@/components/GlobalScripts";

export const metadata: Metadata = {
  title: "Under Active Attack? — XSEE Emergency Response",
  description:
    "Active breach in your AWS environment? XSEE maps your attack surface and validates active paths in under 30 minutes. Request emergency scan.",
};

export default function UnderAttackPage() {
  return (
    <>
      <ScrollProgressBar />
      <GlobalScripts />
      <Nav />
      <div style={{ background: "#050d1a", minHeight: "100vh", paddingTop: "80px" }}>
        <div className="max-w-2xl mx-auto w-full px-6 py-16">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#ef4444", boxShadow: "0 0 8px #ef4444" }}
            />
            <span
              className="text-xs font-bold uppercase tracking-widest font-mono"
              style={{ color: "#ef4444" }}
            >
              Emergency Response
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Under active attack
            <br />
            in AWS?
          </h1>

          <p className="text-lg text-white/50 mb-10 leading-relaxed">
            XSEE can map your attack surface, validate active paths, and show you exactly where the attacker is moving — in under 30 minutes. Read-only IAM. No agents. No disruption to your incident response.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link
              href="/?subject=emergency#contact"
              className="flex items-center justify-center gap-2 font-bold text-white px-7 py-3.5 rounded-xl text-base transition-all"
              style={{
                background: "#ef4444",
                boxShadow: "0 0 24px rgba(239,68,68,0.4)",
              }}
            >
              Request Emergency Scan →
            </Link>
            <a
              href="mailto:security@xsee.io"
              className="flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-xl text-base border transition-all"
              style={{
                color: "rgba(255,255,255,0.7)",
                borderColor: "rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              security@xsee.io
            </a>
          </div>

          <div className="mb-12">
            <div
              className="text-xs font-bold uppercase tracking-widest font-mono mb-6"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              What happens in the first 30 minutes
            </div>
            <div className="space-y-4">
              {[
                {
                  time: "0–2 min",
                  title: "Connect read-only IAM",
                  detail:
                    "No agents. No risk of interfering with active incident response. You can revoke in one click.",
                  color: "#ef4444",
                },
                {
                  time: "2–15 min",
                  title: "Map your full attack surface",
                  detail:
                    "Every asset, identity, and permission edge. Live attack graph against 1,000+ known attack patterns.",
                  color: "#f97316",
                },
                {
                  time: "15–25 min",
                  title: "L2 validation — what's confirmed exploitable right now",
                  detail:
                    "Live AWS API calls prove which paths are currently open. Find where the attacker has been and where they can still go.",
                  color: "#eab308",
                },
                {
                  time: "25–30 min",
                  title: "Prioritized containment report delivered",
                  detail:
                    "Active paths, blast radius, immediate containment actions — ranked by financial exposure.",
                  color: "#22c55e",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderLeft: `3px solid ${step.color}`,
                  }}
                >
                  <div
                    className="text-xs font-bold font-mono flex-shrink-0 pt-0.5 w-14"
                    style={{ color: step.color }}
                  >
                    {step.time}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-1">{step.title}</div>
                    <div className="text-sm text-white/40 leading-relaxed">{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-5 mb-10"
            style={{
              background: "rgba(239,68,68,0.05)",
              border: "1px solid rgba(239,68,68,0.15)",
            }}
          >
            <div
              className="text-xs font-bold uppercase tracking-widest font-mono mb-4"
              style={{ color: "#ef4444" }}
            >
              While you wait — immediate containment steps
            </div>
            <div className="space-y-2.5">
              {[
                "Revoke any suspicious IAM access keys — AWS Console → IAM → Users",
                "Enable CloudTrail in all regions if not already active",
                "Check CloudTrail for AssumeRole, CreateUser, AttachUserPolicy events in last 24h",
                "Isolate the suspected compromised instance — modify its Security Group to deny all inbound",
                "DO NOT shut down the instance — preserve forensic evidence",
                "Then connect XSEE to map what the attacker can still reach",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 rounded border flex-shrink-0 mt-0.5"
                    style={{ borderColor: "rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.08)" }}
                  />
                  <span
                    className="text-sm font-mono leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="text-white font-bold mb-2">Need immediate help?</div>
            <div className="text-white/40 text-sm mb-4">
              Email us directly — we respond to emergency requests within the hour.
            </div>
            <a
              href="mailto:security@xsee.io?subject=Emergency%20Incident%20Response"
              className="text-base font-black"
              style={{ color: "#ef4444" }}
            >
              security@xsee.io →
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
