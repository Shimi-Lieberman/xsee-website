"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  CirclePause,
  CirclePlay,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

const STEPS = [
  { title: "Discover", short: "Potential path" },
  { title: "Inspect", short: "Evidence" },
  { title: "Remediate", short: "Proposed change" },
  { title: "Approve", short: "Human handoff" },
  { title: "Verify", short: "Closure check" },
  { title: "Re-check", short: "Configuration drift" },
] as const;

const HOPS = [
  { name: "Public ingress", resource: "0.0.0.0/0 · TCP 443", status: "Observed evidence", tone: "observed" },
  { name: "Web security group", resource: "sg-web-01", status: "Observed evidence", tone: "observed" },
  { name: "App workload role", resource: "role-web-prod", status: "Simulated result", tone: "simulated" },
  { name: "Secrets Manager", resource: "secrets-prod", status: "Untested", tone: "untested" },
] as const;

const STAGE_STATUS = [
  { label: "Potential path found", tone: "risk" },
  { label: "Evidence states reviewed", tone: "observed" },
  { label: "Proposed · not applied", tone: "pending" },
  { label: "Human approval required", tone: "pending" },
  { label: "Verified in illustration", tone: "verified" },
  { label: "Reopened after config change", tone: "risk" },
] as const;

export default function AttackPathWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion || activeStep >= STEPS.length - 1) {
      if (activeStep >= STEPS.length - 1) setPlaying(false);
      return;
    }

    const timer = window.setTimeout(() => setActiveStep((step) => step + 1), 4800);
    return () => window.clearTimeout(timer);
  }, [activeStep, playing, reducedMotion]);

  const pathState = activeStep === 4 ? "closed" : activeStep === 5 ? "reopened" : "reachable";

  return (
    <section id="walkthrough" className="xsee-walkthrough" aria-labelledby="walkthrough-title">
      <div className="xsee-walkthrough-topline">
        <div>
          <p className="xsee-walkthrough-kicker">Illustrative AWS environment</p>
          <h2 id="walkthrough-title">One path. Six reviewable steps.</h2>
        </div>
        <span className="xsee-walkthrough-scenario">Fictional scenario · no customer data</span>
      </div>

      <div className="xsee-walkthrough-panel">
        <div className="xsee-walkthrough-panel-head">
          <div>
            <p className="xsee-panel-overline">Scenario / us-east-1</p>
            <h3>Public web workload → sensitive secret</h3>
          </div>
          <span className={`xsee-walkthrough-status xsee-tone-${STAGE_STATUS[activeStep].tone}`} role="status">
            {activeStep === 4 ? <ShieldCheck aria-hidden /> : activeStep === 5 || activeStep === 0 ? <ShieldAlert aria-hidden /> : null}
            {STAGE_STATUS[activeStep].label}
          </span>
        </div>

        <ol className={`xsee-path-hops xsee-path-${pathState}`} aria-label="Illustrative attack path from public ingress to Secrets Manager">
          {HOPS.map((hop, index) => (
            <li className="xsee-path-hop" key={hop.name}>
              <div className="xsee-hop-card">
                <span className="xsee-hop-index">0{index + 1}</span>
                <div className="xsee-hop-copy">
                  <strong>{hop.name}</strong>
                  <span>{hop.resource}</span>
                </div>
                <span className={`xsee-evidence-tag xsee-evidence-${hop.tone}`}>{hop.status}</span>
              </div>
              {index < HOPS.length - 1 ? <span className="xsee-hop-connector" aria-hidden /> : null}
            </li>
          ))}
        </ol>

        <div className="xsee-walkthrough-lower">
          <div className="xsee-walkthrough-stepper" role="group" aria-label="Walkthrough steps">
            <div className="xsee-stepper-label">Walk through the review</div>
            <div className="xsee-stepper-buttons">
              {STEPS.map((step, index) => (
                <button
                  type="button"
                  className={`xsee-step-button${activeStep === index ? " is-active" : ""}`}
                  key={step.title}
                  aria-current={activeStep === index ? "step" : undefined}
                  aria-label={`Step ${index + 1}: ${step.title} — ${step.short}`}
                  onClick={() => {
                    setActiveStep(index);
                    setPlaying(false);
                  }}
                >
                  <span>{index + 1}</span>
                  <span>{step.title}</span>
                </button>
              ))}
            </div>
            <div className="xsee-walkthrough-controls">
              <button type="button" className="xsee-control-button" onClick={() => { setActiveStep(0); setPlaying(false); }}>
                <RotateCcw aria-hidden /> Replay
              </button>
              <button
                type="button"
                className="xsee-control-button"
                onClick={() => setPlaying((value) => !value)}
                aria-pressed={playing}
                disabled={reducedMotion || activeStep === STEPS.length - 1}
                aria-label={reducedMotion ? "Automatic playback disabled by reduced motion preference" : playing ? "Pause walkthrough" : "Play walkthrough"}
              >
                {playing ? <CirclePause aria-hidden /> : <CirclePlay aria-hidden />}
                {playing ? "Pause" : "Play"}
              </button>
              <span className="xsee-control-divider" aria-hidden />
              <button type="button" className="xsee-control-button" onClick={() => { setActiveStep((step) => Math.max(0, step - 1)); setPlaying(false); }} disabled={activeStep === 0} aria-label="Previous step">
                <ArrowLeft aria-hidden /> Previous
              </button>
              <button type="button" className="xsee-control-button" onClick={() => { setActiveStep((step) => Math.min(STEPS.length - 1, step + 1)); setPlaying(false); }} disabled={activeStep === STEPS.length - 1} aria-label="Next step">
                Next <ArrowRight aria-hidden />
              </button>
            </div>
            {reducedMotion ? <p className="xsee-reduced-motion-note">Automatic playback is off for your reduced-motion preference. Use the step controls to explore.</p> : null}
          </div>

          <div className="xsee-walkthrough-detail" aria-live="polite" aria-atomic="true">
            <p className="xsee-detail-step">Step {activeStep + 1} of {STEPS.length} <ArrowDown aria-hidden /></p>
            <h4>{STEPS[activeStep].title}: {stepHeading(activeStep)}</h4>
            <p className="xsee-detail-copy">{stepDescription(activeStep)}</p>
            {activeStep === 1 ? <EvidenceReview /> : null}
            {activeStep === 2 ? <RemediationProposal /> : null}
            {activeStep === 3 ? <ApprovalBoundary /> : null}
            {activeStep === 4 ? <ClosureResult /> : null}
            {activeStep === 5 ? <ConfigurationChange /> : null}
          </div>
        </div>

        <p className="xsee-walkthrough-footnote">
          <span className="xsee-footnote-mark" aria-hidden>i</span>
          All resource names, evidence, simulation, and closure states shown here are illustrative—not a live customer environment. XSEE does not apply AWS changes.
        </p>
      </div>
    </section>
  );
}

function stepHeading(index: number) {
  return [
    "a potential route into sensitive data",
    "what is observed, simulated, and untested",
    "a proposed change and expected effect",
    "the approval and execution boundary",
    "the post-change closure result",
    "how configuration drift changes closure",
  ][index];
}

function stepDescription(index: number) {
  return [
    "A public HTTPS rule leads to a workload identity with a modeled route to a sensitive secret. This is a candidate path for review, not a claim of compromise.",
    "Review the evidence state on each hop before treating the path as actionable. Untested means exactly that: no validation result is being implied.",
    "The suggested change narrows the public ingress rule to an approved edge source. The path is still open until your team approves and applies the change.",
    "XSEE prepares evidence and a remediation handoff. A person approves it, and your own AWS workflow executes it; nothing is changed by this walkthrough.",
    "In this fictional post-change record, a follow-up check finds the original route closed. The result is labeled illustrative and is not a customer verification.",
    "A later configuration change adds another public source. The prior closure no longer applies, so the path is reopened for a new review.",
  ][index];
}

function EvidenceReview() {
  return (
    <ul className="xsee-evidence-review" aria-label="Evidence and validation state for each illustrative path step">
      {HOPS.map((hop) => (
        <li key={hop.name}>
          <span className={`xsee-evidence-dot xsee-evidence-dot-${hop.tone}`} aria-hidden />
          <span className="xsee-review-resource"><strong>{hop.name}</strong><small>{hop.resource}</small></span>
          <span className={`xsee-review-state xsee-evidence-${hop.tone}`}>{hop.status}</span>
        </li>
      ))}
    </ul>
  );
}

function RemediationProposal() {
  return (
    <div className="xsee-remediation-grid">
      <div><span>Proposed change</span><strong>Restrict inbound TCP/443 to the approved edge source</strong></div>
      <div><span>Expected effect</span><strong>Remove direct public ingress to the web workload</strong></div>
      <p>Expected effect only · not applied · requires human approval</p>
    </div>
  );
}

function ApprovalBoundary() {
  return (
    <div className="xsee-approval-boundary">
      <span className="xsee-boundary-icon"><ShieldCheck aria-hidden /></span>
      <div><strong>Approval required · execution stays external</strong><p>Review the recommendation, approve it through your team's process, then apply it in your AWS workflow. XSEE makes no change.</p></div>
      <span className="xsee-boundary-state">NOT EXECUTED</span>
    </div>
  );
}

function ClosureResult() {
  return (
    <div className="xsee-closure-result">
      <span><Check aria-hidden /> Illustrative closure verified</span>
      <p>Follow-up evidence shows the original public ingress route removed. The closure record is limited to this fictional scenario.</p>
    </div>
  );
}

function ConfigurationChange() {
  return (
    <div className="xsee-drift-result">
      <span>Configuration change detected</span>
      <strong>203.0.113.0/24 added to inbound TCP/443</strong>
      <p>Closure status: <b>Reopened · review needed</b>. A new check is untested until evidence is collected.</p>
    </div>
  );
}

export { STEPS as ATTACK_PATH_WALKTHROUGH_STEPS };
