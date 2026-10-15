"use client";

import Link from "next/link";
import { ArrowRight, Check, CircleHelp, FileCheck2, ShieldCheck, Waypoints } from "lucide-react";
import { Analytics } from "@/lib/analytics";

const WORKFLOW = [
  { title: "Discover", copy: "Map AWS resources and the relationships between them." },
  { title: "Validate", copy: "Check whether an attack path is reachable." },
  { title: "Prioritize", copy: "Focus review on paths with meaningful exposure." },
  { title: "Approve remediation", copy: "A person on your team chooses what to change.", approval: true },
  { title: "Verify closure", copy: "Re-check the path after your team applies the change." },
  { title: "Monitor drift", copy: "Compare later environment changes with verified closure." },
] as const;

const OUTCOMES = [
  {
    icon: Waypoints,
    title: "See the reachable path",
    copy: "Connect exposures, identities, and services into a path your team can assess—not another disconnected finding.",
  },
  {
    icon: CircleHelp,
    title: "Prioritize the next review",
    copy: "Give cloud security and engineering a clearer basis for deciding which paths need attention first.",
  },
  {
    icon: FileCheck2,
    title: "Keep evidence with the decision",
    copy: "Retain a reviewable record of what was validated and what changed after remediation.",
  },
] as const;

function WorkflowSection() {
  return (
    <section id="workflow" className="xsee-journey-section" aria-labelledby="workflow-title">
      <div className="hp-container">
        <div className="xsee-section-heading">
          <p className="hp-eyebrow">One workflow, end to end</p>
          <h2 id="workflow-title">From a reachable path to a verified fix.</h2>
          <p>Human approval stays with your team. Remediation is handed back to your AWS workflow; XSEE does not apply the change.</p>
        </div>
        <ol className="xsee-workflow-grid">
          {WORKFLOW.map((step, index) => (
            <li className={`xsee-workflow-step${"approval" in step ? " xsee-workflow-step--approval" : ""}`} key={step.title}>
              <span className="xsee-workflow-number">0{index + 1}</span>
              {"approval" in step ? <span className="xsee-approval-label">HUMAN APPROVAL</span> : null}
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
        <p className="xsee-workflow-footnote"><Check size={15} aria-hidden /> Your team owns the change. XSEE supports validation and evidence—not autonomous remediation.</p>
      </div>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section id="outcomes" className="xsee-journey-section xsee-outcomes-section" aria-labelledby="outcomes-title">
      <div className="hp-container">
        <div className="xsee-section-heading">
          <p className="hp-eyebrow">For security and engineering</p>
          <h2 id="outcomes-title">Make the next security decision clearer.</h2>
        </div>
        <div className="xsee-outcome-grid">
          {OUTCOMES.map(({ icon: Icon, title, copy }) => (
            <article className="xsee-outcome-card" key={title}>
              <Icon size={20} aria-hidden />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosureSection() {
  return (
    <section id="closure" className="xsee-journey-section" aria-labelledby="closure-title">
      <div className="hp-container">
        <div className="xsee-closure-layout">
          <div className="xsee-closure-copy">
            <p className="hp-eyebrow">Closure and drift</p>
            <h2 id="closure-title">A fix is verified after the change—not assumed.</h2>
            <p>Once your team makes a remediation change in AWS, XSEE can re-check the path and retain evidence of the updated state. When ongoing monitoring is configured, drift can prompt a fresh review.</p>
            <Link href="/security" className="xsee-text-link">Review security details <ArrowRight size={15} aria-hidden /></Link>
          </div>
          <div className="xsee-closure-panel" aria-label="Illustrative closure verification and drift flow">
            <div className="xsee-closure-panel-header"><span>VERIFICATION RECORD</span><span>ILLUSTRATIVE</span></div>
            <div className="xsee-closure-record">
              <span className="xsee-closure-record-icon"><Check size={15} aria-hidden /></span>
              <div><strong>Path validated</strong><span>Evidence retained for review</span></div>
              <span className="xsee-closure-state">RECORDED</span>
            </div>
            <div className="xsee-closure-record xsee-closure-record--handoff">
              <span className="xsee-closure-record-icon"><ArrowRight size={15} aria-hidden /></span>
              <div><strong>Change applied by your team</strong><span>Outside XSEE, in your AWS workflow</span></div>
              <span className="xsee-closure-state">HANDOFF</span>
            </div>
            <div className="xsee-closure-record">
              <span className="xsee-closure-record-icon"><ShieldCheck size={15} aria-hidden /></span>
              <div><strong>Closure re-checked</strong><span>Later drift can trigger a new review</span></div>
              <span className="xsee-closure-state">REVISIT</span>
            </div>
            <p className="xsee-closure-panel-note">Monitoring cadence and scope are confirmed during pilot planning.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section id="security" className="xsee-journey-section xsee-security-section" aria-labelledby="security-title">
      <div className="hp-container xsee-security-layout">
        <div>
          <p className="hp-eyebrow">Security and deployment</p>
          <h2 id="security-title">Read-only by design. Your cloud stays yours.</h2>
        </div>
        <ul className="xsee-security-list">
          <li><Check size={17} aria-hidden /><span><strong>Read-only AWS access</strong> for assessment</span></li>
          <li><Check size={17} aria-hidden /><span><strong>No agents or code deployment</strong> in your environment</span></li>
          <li><Check size={17} aria-hidden /><span><strong>Your team applies changes</strong> using its own AWS workflow</span></li>
        </ul>
      </div>
    </section>
  );
}

function PilotInvitation() {
  return (
    <section id="contact" className="xsee-pilot-section" aria-labelledby="pilot-title">
      <div className="hp-container">
        <div className="xsee-pilot-panel">
          <div>
            <p className="xsee-pilot-eyebrow">Enterprise pilot</p>
            <h2 id="pilot-title">Bring one real AWS security question.</h2>
            <p>Talk with the XSEE team about your environment, approval process, and what a focused pilot should verify.</p>
          </div>
          <div className="xsee-pilot-actions">
            <Link
              href="mailto:sales@xsee.io?subject=Enterprise%20pilot%20conversation"
              className="xsee-pilot-cta"
              onClick={() => Analytics.ctaClicked("pilot", "enterprise_pilot")}
            >
              Start a pilot conversation <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href="/free-scan" className="xsee-pilot-secondary" onClick={() => Analytics.ctaClicked("pilot", "free_assessment")}>
              Or request a free assessment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BuyerJourney() {
  return (
    <>
      <WorkflowSection />
      <OutcomesSection />
      <ClosureSection />
      <SecuritySection />
      <PilotInvitation />
    </>
  );
}
