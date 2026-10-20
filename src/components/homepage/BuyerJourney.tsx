"use client";

import { useState } from "react";
import Link from "next/link";
import "./journey-proof.css";
import { ArrowRight, Check, CircleHelp, FileCheck2, ShieldCheck, Waypoints } from "lucide-react";
import { Analytics } from "@/lib/analytics";
import PilotSection from "@/components/homepage/PilotSection";

const WORKFLOW = [
  { title: "Proposed", copy: "XSEE proposes the smallest change that breaks the path, with the evidence behind it." },
  { title: "Approved by your team", copy: "A person on your team decides whether to make the change.", approval: true },
  { title: "Applied by your pipeline", copy: "Your team applies it in its own AWS workflow, outside XSEE." },
  { title: "Verified closed", copy: "XSEE re-checks the same path and records what it found." },
  { title: "Validity re-assessed on change", copy: "When ongoing monitoring is configured, a relevant change prompts a fresh review." },
] as const;

const BEFORE_AFTER = {
  before: {
    label: "Before",
    status: "Path reachable",
    hops: ["Public endpoint", "Workload role", "Assumable admin role", "Customer data bucket"],
    broken: -1,
  },
  after: {
    label: "After",
    status: "Path broken at the trust policy",
    hops: ["Public endpoint", "Workload role", "Assumable admin role", "Customer data bucket"],
    broken: 2,
  },
} as const;

type View = keyof typeof BEFORE_AFTER;

function BeforeAfter() {
  const [view, setView] = useState<View>("before");
  const current = BEFORE_AFTER[view];
  return (
    <div className="xj-ba">
      <div className="xj-ba-toggle" role="group" aria-label="Compare the path before and after the fix">
        {(Object.keys(BEFORE_AFTER) as View[]).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={view === key}
            className="xj-ba-btn"
            onClick={() => setView(key)}
          >
            {BEFORE_AFTER[key].label}
          </button>
        ))}
      </div>
      <p className={`xj-ba-status is-${view}`} aria-live="polite">
        {current.status}
      </p>
      <ol className="xj-ba-path">
        {current.hops.map((hop, index) => {
          const cut = current.broken >= 0 && index >= current.broken;
          return (
            <li key={hop} className={`xj-ba-hop${cut ? " is-cut" : ""}`}>
              <span className="xj-ba-dot" aria-hidden />
              <span>{hop}</span>
              {index === current.broken ? <span className="xj-ba-note">Trust no longer granted</span> : null}
            </li>
          );
        })}
      </ol>
      <p className="xj-ba-foot">Synthetic demonstration environment.</p>
    </div>
  );
}

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
    <section id="workflow" className="xsee-journey-section xsee-film-workflow" aria-labelledby="workflow-title" data-nav-tone="dark">
      <div className="hp-container xsee-film-workflow-layout">
        <div className="xsee-section-heading">
          <p className="hp-eyebrow">From exposure to outcome</p>
          <h2 id="workflow-title">A path is closed when it is verified, not when a ticket is.</h2>
          <p>Human approval stays with your team. Remediation is handed back to your AWS workflow; XSEE does not apply the change.</p>
          <BeforeAfter />
          <p className="xsee-workflow-footnote"><Check size={15} aria-hidden /> Lifecycle coverage varies by technique and environment.</p>
        </div>
        <ol className="xsee-spine">
          {WORKFLOW.map((step, index) => {
            const approval = "approval" in step;
            return (
              <li className="xsee-spine-step" data-approval={approval || undefined} key={step.title}>
                <span className="xsee-spine-node" aria-hidden />
                <div className="xsee-spine-body">
                  <p className="xsee-spine-index">
                    State {index + 1} of {WORKFLOW.length}
                    {approval ? <span className="xsee-spine-gate">Human approval</span> : null}
                  </p>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section id="outcomes" className="xsee-journey-section xsee-outcomes-section" aria-labelledby="outcomes-title" data-nav-tone="dark">
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

const RECORD = [
  { term: "What was checked", value: "Path XP-0142: public endpoint to customer data bucket, four steps." },
  { term: "When", value: "Re-checked after your team reported the change as applied." },
  { term: "Against which configuration", value: "The read-only snapshot collected at verification time." },
  { term: "What was not tested", value: "Runtime behaviour, and any account XSEE was not granted read access to." },
  { term: "When it stops being valid", value: "When a relevant identity, trust or network change is detected, if monitoring is configured." },
] as const;

function ClosureSection() {
  return (
    <section id="closure" className="xsee-journey-section" aria-labelledby="closure-title" data-nav-tone="dark">
      <div className="hp-container">
        <div className="xsee-closure-layout">
          <div className="xsee-closure-copy">
            <p className="hp-eyebrow">Trust and evidence</p>
            <h2 id="closure-title">Every verification says what it covers, and what it does not.</h2>
            <p>A closure record is scoped to one path, one configuration and one point in time. Its limits are written down next to its result.</p>
            <Link href="/security" className="xsee-text-link">Review security details <ArrowRight size={15} aria-hidden /></Link>
          </div>
          <article className="xj-record" aria-labelledby="xj-record-title">
            <header className="xj-record-head">
              <ShieldCheck size={18} aria-hidden />
              <h3 id="xj-record-title">Closure record</h3>
              <span className="xj-record-tag">Synthetic example</span>
            </header>
            <dl className="xj-record-list">
              {RECORD.map((row) => (
                <div key={row.term} className="xj-record-row">
                  <dt>{row.term}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="xj-record-foot">Monitoring cadence and scope are confirmed during pilot planning.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function BeyondSection() {
  return (
    <section id="beyond" className="xsee-journey-section xj-beyond" aria-labelledby="beyond-title" data-nav-tone="dark">
      <div className="hp-container xj-beyond-inner">
        <p className="hp-eyebrow">Beyond today&apos;s security model</p>
        <h2 id="beyond-title" className="text-balance">
          Beyond detection. Toward continuous assurance.
        </h2>
        <p className="text-pretty">Where XSEE goes next is a conversation we have in person.</p>
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section id="security" className="xsee-journey-section xsee-security-section" aria-labelledby="security-title" data-nav-tone="dark">
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

export default function BuyerJourney() {
  return (
    <>
      <WorkflowSection />
      <OutcomesSection />
      <ClosureSection />
      <SecuritySection />
      <BeyondSection />
      <PilotSection />
    </>
  );
}
