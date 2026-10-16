import { Check, ShieldAlert, ShieldCheck, ShieldQuestion, UserCheck } from "lucide-react";
import { FIX_STEPS, VALIDATION_LOG, type EvidenceState } from "./scene";
import type { Certificate } from "./cinema";

const LEDGER: { state: EvidenceState; label: string }[] = [
  { state: "observed", label: "Observed" },
  { state: "simulated", label: "Simulated" },
  { state: "assumed", label: "Assumed" },
  { state: "untested", label: "Untested" },
  { state: "blocked", label: "Blocked" },
];

/** Evidence Chamber: a glass terminal synchronized with an evidence timeline. */
export function EvidenceChamber({ lines }: { lines: number }) {
  const shown = VALIDATION_LOG.slice(0, Math.max(1, lines));
  const done = VALIDATION_LOG.slice(0, lines);
  const count = (s: EvidenceState) => done.filter((l) => l.state === s).length;
  const complete = lines >= VALIDATION_LOG.length;
  return (
    <div className="ec" aria-hidden>
      <div className="ec-head">
        <span className="ec-dot" />
        <span className="ec-title">xsee validate AP-12</span>
        <span className="ec-mode">read-only</span>
        <span className="cs-demo-tag">Simulation</span>
      </div>
      <ol className="ec-log">
        {shown.map((line, i) => (
          <li
            key={line.target}
            className={`${i === lines - 1 ? "is-new " : ""}${i === shown.length - 1 ? "is-latest " : ""}is-${line.state}`}
          >
            <span className="ec-verb">{line.verb}</span>
            <span className="ec-target">{line.target}</span>
            <span className="ec-result">{lines > i ? line.result : ""}</span>
          </li>
        ))}
        {!complete ? <li className="ec-cursor" /> : null}
      </ol>
      <div className="ec-timeline" role="presentation">
        {VALIDATION_LOG.map((line, i) => (
          <span key={line.target} className={`is-${line.state}${i < lines ? " is-on" : ""}`} />
        ))}
      </div>
      <ul className="ec-ledger">
        {LEDGER.map((l) => (
          <li key={l.state} className={`is-${l.state}${count(l.state) ? " is-on" : ""}`}>
            <b>{count(l.state)}</b>
            {l.label}
          </li>
        ))}
      </ul>
      <p className={`ec-verdict${complete ? " is-on" : ""}`}>
        {complete ? "Reachable under 1 stated assumption · 2 checks not proven" : "Collecting evidence…"}
      </p>
    </div>
  );
}

export function FixStepper({ step }: { step: number }) {
  return (
    <ol className="cs-fix" aria-hidden>
      {FIX_STEPS.map((s, i) => {
        const state = i < step ? "done" : i === step ? "active" : "todo";
        const approval = i === 2;
        return (
          <li key={s.title} className={`is-${state}${approval ? " is-approval" : ""}${i === 3 ? " is-apply" : ""}${i === 4 ? " is-recheck" : ""}`}>
            <span className="cs-fix-dot">{i < step ? <Check size={11} /> : approval ? <UserCheck size={11} /> : null}</span>
            <span className="cs-fix-text">
              <strong>{s.title}</strong>
              {i === step ? <small>{s.detail}</small> : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

const CERT: Record<Exclude<Certificate, "hidden">, { label: string; meta: string }> = {
  verified: { label: "Verified closed", meta: "Re-check denied sts:AssumeRole" },
  drift: { label: "Drift detected", meta: "Trust policy changed · reassessment queued" },
  reassessing: { label: "Reassessing", meta: "Re-running the path against today's config" },
  revoked: { label: "Revoked", meta: "Re-validation reached prod/orders-db again" },
};

export function ProofCertificate({ state }: { state: Certificate }) {
  if (state === "hidden") return null;
  const Icon = state === "revoked" ? ShieldAlert : state === "verified" ? ShieldCheck : ShieldQuestion;
  return (
    <div className={`cs-cert is-${state}`} aria-hidden>
      <div className="cs-cert-seal">
        <Icon size={18} />
      </div>
      <div className="cs-cert-body">
        <span className="cs-cert-kicker">Closure record · AP-12</span>
        <strong className="cs-cert-state">{CERT[state].label}</strong>
        <span className="cs-cert-meta">{CERT[state].meta}</span>
      </div>
      <span className="cs-demo-tag">Illustrative</span>
    </div>
  );
}

export function FindingsCounter({ local }: { local: number }) {
  const connected = local > 0.82;
  return (
    <div className="cs-findings" aria-hidden>
      <span className={connected ? "is-muted" : undefined}>
        <b>3</b> separate findings
      </span>
      <span className="cs-findings-arrow">{"→"}</span>
      <span className={connected ? "is-on" : undefined}>
        <b>1</b> candidate path
      </span>
    </div>
  );
}
