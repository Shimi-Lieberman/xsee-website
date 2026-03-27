"use client";

import Link from "next/link";
import { Zap, RefreshCw, Eye, Key } from "lucide-react";

const COLUMNS = [
  {
    icon: Zap,
    title: "10,000x faster",
    body: "An AI attacker runs 10,000 attack variations in the time a human runs 10. Your team cannot keep up manually.",
    nhi: false,
  },
  {
    icon: RefreshCw,
    title: "Infinitely adaptive",
    body: "AI attackers learn from every blocked attempt and instantly try a different path. Static defenses fail.",
    nhi: false,
  },
  {
    icon: Eye,
    title: "Invisible to legacy tools",
    body: "Your SIEM, GuardDuty, and XDR were built to detect human attack patterns. AI attackers move differently.",
    nhi: false,
  },
  {
    icon: Key,
    title: "Non-Human Identities",
    body: "In 2026, machine identities — Lambda roles, CI/CD tokens, AI agents — outnumber humans. 92% of organizations cannot track them. XSEE maps and validates every NHI.",
    nhi: true,
  },
];

export default function AiAttackerSection() {
  return (
    <section className="section sec-navy" id="ai-threat">
      <div className="container">
        <div className="section-head reveal" style={{ textAlign: "center" }}>
          <span className="eyebrow">The New Threat</span>
          <h2 className="display-lg">
            Human hackers were bad enough.
            <br />
            AI attackers are a different category.
          </h2>
        </div>
        <div className="ai-threat-grid reveal-on-scroll">
          {COLUMNS.map((col, i) => (
            <div
              key={col.title}
              className={`ai-threat-col ${col.nhi ? "ai-threat-col-nhi" : ""} ${i === 1 ? "reveal-delay-1" : i === 2 ? "reveal-delay-2" : i === 3 ? "reveal-delay-3" : ""}`}
            >
              <div className={`ai-threat-icon ${col.nhi ? "ai-threat-icon-nhi" : ""}`}>
                <col.icon size={28} strokeWidth={2} />
              </div>
              <h3 className="ai-threat-title">{col.title}</h3>
              <p className="ai-threat-body">{col.body}</p>
            </div>
          ))}
        </div>
        <p className="ai-threat-summary reveal">
          XSEE simulates AI attacker behavior — so you can measure your defenses against the threat that's actually coming.
        </p>
        <div className="ai-threat-cta reveal">
          <Link href="/free-scan" className="btn btn-primary">
            See your AI attacker exposure →
          </Link>
        </div>
      </div>
    </section>
  );
}
