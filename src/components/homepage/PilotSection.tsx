import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PILOT_HREF } from "@/lib/navigation";

export const PILOT_STAGES = [
  "Agree on scope and success criteria.",
  "Review access and deployment requirements.",
  "Evaluate supported attack-path scenarios.",
  "Review evidence, findings, and next steps.",
] as const;

export default function PilotSection() {
  return (
    <section id="pilot" className="xsee-pilot-section" aria-labelledby="pilot-title">
      <div className="hp-container">
        <div className="xsee-pilot-panel">
          <div className="xsee-pilot-intro">
            <p className="xsee-pilot-eyebrow">Enterprise pilot</p>
            <h2 id="pilot-title">Evaluate XSEE in your AWS environment.</h2>
            <p>
              Explore a focused pilot to validate attack paths, review evidence, and evaluate remediation verification
              with your security team.
            </p>
          </div>
          <ol className="xsee-pilot-stages" aria-label="Pilot stages">
            {PILOT_STAGES.map((stage, index) => (
              <li key={stage}>
                <span className="xsee-pilot-stage-number" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{stage}</p>
              </li>
            ))}
          </ol>
          <Link href={PILOT_HREF} className="xsee-pilot-cta">
            Discuss a pilot <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
