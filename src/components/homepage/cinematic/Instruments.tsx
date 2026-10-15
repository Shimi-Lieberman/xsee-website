import { Check, ShieldAlert, ShieldCheck, UserCheck } from "lucide-react";
import { FIX_STEPS, VALIDATION_LOG, type Scene } from "./scene";

export function ValidationTerminal({ lines }: { lines: number }) {
  const shown = VALIDATION_LOG.slice(0, Math.max(1, lines));
  return (
    <div className="cs-terminal" aria-hidden>
      <div className="cs-terminal-head">
        <span>xsee · validate AP-12 · read-only</span>
        <span className="cs-demo-tag">Demo data</span>
      </div>
      <ol className="cs-terminal-body">
        {shown.map((line, i) => (
          <li key={line.target} className={i === lines - 1 ? "is-new" : undefined}>
            <span className="cs-term-prompt">{">"}</span>
            <span className="cs-term-verb">{line.verb}</span>
            <span className="cs-term-target">{line.target}</span>
            <span className={`cs-term-result is-${line.result}`}>{lines > i ? line.result : ""}</span>
          </li>
        ))}
        {lines < VALIDATION_LOG.length ? <li className="cs-term-cursor" /> : null}
      </ol>
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
          <li key={s.title} className={`is-${state}${approval ? " is-approval" : ""}${i === 3 ? " is-apply" : ""}`}>
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

export function ProofCertificate({ state }: { state: Scene["certificate"] }) {
  if (state === "hidden") return null;
  const revoked = state === "revoked";
  const label = revoked ? "Revoked" : state === "reassessing" ? "Reassessing" : "Verified closed";
  return (
    <div className={`cs-cert is-${state}`} aria-hidden>
      <div className="cs-cert-seal">{revoked ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}</div>
      <div className="cs-cert-body">
        <span className="cs-cert-kicker">Closure record · AP-12</span>
        <strong className="cs-cert-state">{label}</strong>
        <span className="cs-cert-meta">
          {revoked ? "Trust policy drift · path reopened" : state === "reassessing" ? "Environment changed · re-checking" : "Re-test stopped at sts:AssumeRole"}
        </span>
      </div>
      <span className="cs-demo-tag">Illustrative</span>
    </div>
  );
}

export function FindingsCounter({ local }: { local: number }) {
  const connected = local > 0.85;
  return (
    <div className="cs-findings" aria-hidden>
      <span className={connected ? "is-muted" : undefined}>
        <b>3</b> separate findings
      </span>
      <span className="cs-findings-arrow">{"→"}</span>
      <span className={connected ? "is-on" : undefined}>
        <b>1</b> attack path
      </span>
    </div>
  );
}
