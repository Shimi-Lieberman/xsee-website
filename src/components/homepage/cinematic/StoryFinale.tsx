"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Analytics } from "@/lib/analytics";
import "./cinematic.css";
import "./finale.css";

const STAGES = [
  { name: "Discover", detail: "Map identities, trust and network reach across your AWS accounts." },
  { name: "Validate", detail: "Prove which paths are reachable, read-only, with observed and simulated evidence." },
  { name: "Remediate", detail: "Prioritize the one change that breaks the path. Your team approves it." },
  { name: "Verify", detail: "Re-check after the fix and record closure with evidence." },
  { name: "Monitor", detail: "When ongoing monitoring is configured, a relevant change prompts a fresh review." },
];

export default function StoryFinale() {
  const loopRef = useRef<HTMLOListElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const node = loopRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cx cx-finale" aria-labelledby="cx-finale-title" data-nav-tone="dark">
      <p className="cx-finale-kicker">The XSEE loop</p>

      <ol ref={loopRef} className={`fl-loop${lit ? " is-lit" : ""}`} aria-label="The XSEE loop, repeating continuously">
        {STAGES.map((stage, index) => (
          <li key={stage.name} className="fl-stage" style={{ "--fl-i": index } as React.CSSProperties}>
            <span className="fl-dot" aria-hidden />
            <div className="fl-copy">
              <h3>{stage.name}</h3>
              <p>{stage.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className={`fl-return${lit ? " is-lit" : ""}`}>
        <span className="fl-return-line" aria-hidden />
        Monitor feeds Discover. The loop never closes for good.
      </p>

      <h2 id="cx-finale-title" className="fl-mantra">
        <span>Trust nothing.</span> <span>Prove everything.</span>
      </h2>

      <p className="cx-finale-kicker">See it on your own terms</p>
      <div className="cs-actions">
        <Link href="/demo" className="cs-btn cs-btn--primary" onClick={() => Analytics.ctaClicked("finale", "private_walkthrough")}>
          Request a private technical walkthrough <ArrowRight size={16} aria-hidden />
        </Link>
        <a href="#pilot" className="cs-btn cs-btn--ghost" onClick={() => Analytics.ctaClicked("finale", "evaluation")}>
          Discuss an evaluation
        </a>
      </div>
      <p className="cx-finale-note">Methodology and architecture are covered in the walkthrough itself.</p>
    </section>
  );
}
