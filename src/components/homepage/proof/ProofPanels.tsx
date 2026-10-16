import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  CLAIMS,
  EVIDENCE_CLAIMS,
  LOG,
  LOG_LENGTH,
  STATE_LABEL,
  STATE_MEANING,
  VERDICT,
  focusClaim,
  isResolved,
  type Claim,
  type ProofState,
  type Proof,
} from "./proofModel";

const ORDER: ProofState[] = ["observed", "simulated", "assumed", "untested", "blocked"];

export function Terminal({ proof: p, compact = false }: { proof: Proof; compact?: boolean }) {
  const lines = LOG.slice(0, Math.min(LOG_LENGTH, p.resolved + 1));
  const visible = compact ? lines.slice(-4) : lines;
  const offset = lines.length - visible.length;
  const done = p.resolved >= LOG_LENGTH;
  return (
    <div className="pe-term" aria-hidden="true">
      <div className="pe-term-head">
        <span className="pe-term-dot" />
        <span>xsee validate AP-12</span>
        <span className="pe-term-mode">read-only</span>
      </div>
      <ol className="pe-term-log">
        {visible.map((line, i) => {
          const idx = i + offset;
          const settled = idx < p.resolved;
          return (
            <li key={line.target} className={`${settled ? `is-${line.state}` : "is-typing"}`}>
              <span className="pe-term-verb">{line.verb}</span>
              <span className="pe-term-target">{line.target}</span>
              <span className="pe-term-result">{settled ? line.result : "…"}</span>
            </li>
          );
        })}
      </ol>
      <p className={`pe-term-verdict${done ? " is-on" : ""}`}>{done ? VERDICT : "verifying…"}</p>
    </div>
  );
}

function Ledger({ proof: p }: { proof: Proof }) {
  return (
    <ul className="pe-ledger">
      {ORDER.map((s) => {
        const n = CLAIMS.filter((c) => c.state === s && isResolved(p, c)).length;
        return (
          <li key={s} className={`is-${s}${n ? " is-on" : ""}`}>
            <b>{n}</b>
            {STATE_LABEL[s]}
          </li>
        );
      })}
    </ul>
  );
}

function ClaimChips({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <ul className="pe-chips" aria-label="Relationships on the path">
      {CLAIMS.map((c) => (
        <li key={c.id}>
          <button type="button" className={`is-${c.state}`} aria-pressed={selected === c.id} onClick={() => onSelect(c.id)}>
            <i aria-hidden />
            {c.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

function ClaimDetail({ claim, onBack }: { claim: Claim; onBack: () => void }) {
  return (
    <div className="pe-detail">
      <p className="pe-insp-kicker">{claim.step}</p>
      <p className={`pe-state is-${claim.state}`}>
        <i aria-hidden />
        {STATE_LABEL[claim.state]}
        <span>{claim.evidence ? claim.evidence.type : "No evidence collected"}</span>
      </p>
      <dl className="pe-dl">
        <div>
          <dt>Supports</dt>
          <dd>{claim.supports}</dd>
        </div>
        <div>
          <dt>Uncertain</dt>
          <dd>{claim.uncertainty}</dd>
        </div>
        <div>
          <dt>Next</dt>
          <dd>{claim.next}</dd>
        </div>
      </dl>
      <button type="button" className="pe-back" onClick={onBack}>
        <ArrowLeft size={14} aria-hidden /> Back to the story
      </button>
    </div>
  );
}

type InspectorProps = {
  proof: Proof;
  selected: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
};

export function Inspector({ proof: p, selected, onSelect, onBack }: InspectorProps) {
  const claim = selected ? CLAIMS.find((c) => c.id === selected) : null;
  if (claim) return <ClaimDetail claim={claim} onBack={onBack} />;

  const focus = focusClaim(p);

  if (p.stage === 0) {
    return (
      <div className="pe-insp-body">
        <p className="pe-insp-kicker">AP-12 · candidate path</p>
        <p className="pe-insp-lead">internet → prod/orders-db</p>
        <div className="pe-stats">
          <span>
            <b>5</b>relationships
          </span>
          <span>
            <b>0</b>proven
          </span>
          <span className="is-pending">
            <b>?</b>status
          </span>
        </div>
      </div>
    );
  }

  if (p.stage === 1) {
    const count = p.evidence.filter((v) => v >= 1).length;
    return (
      <div className="pe-insp-body">
        <p className="pe-insp-kicker">
          Evidence · {count} / {EVIDENCE_CLAIMS.length} attached
        </p>
        {focus?.evidence ? (
          <div className="pe-ev-focus" key={focus.id}>
            <span>{focus.evidence.type}</span>
            <strong>{focus.evidence.detail}</strong>
            <small>Attaches to {focus.label}</small>
          </div>
        ) : (
          <p className="pe-insp-lead">The graph separates into infrastructure, permissions and evidence.</p>
        )}
        <ol className="pe-ev-list">
          {EVIDENCE_CLAIMS.map((c, k) => (
            <li key={c.id} className={p.evidence[k] >= 1 ? "is-on" : p.evidence[k] > 0 ? "is-arriving" : undefined}>
              <span>{String(k + 1).padStart(2, "0")}</span>
              {c.evidence!.type}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (p.stage === 2) {
    return (
      <div className="pe-insp-body">
        <p className="pe-insp-kicker">Verification</p>
        {focus ? (
          <div className="pe-ev-focus" key={focus.id}>
            <span>{focus.step}</span>
            <strong className={`pe-state-text is-${focus.state}`}>{STATE_LABEL[focus.state]}</strong>
            <small>{STATE_MEANING[focus.state]}</small>
          </div>
        ) : (
          <p className="pe-insp-lead">Each relationship is checked against its evidence.</p>
        )}
        <Ledger proof={p} />
      </div>
    );
  }

  if (p.stage === 3) {
    return (
      <div className="pe-insp-body">
        <p className="pe-insp-kicker">Proof boundary</p>
        <div className="pe-split">
          <div className="is-in">
            <span>Inside</span>
            <p>3 observed · 2 simulated</p>
            <small>Rests on 1 stated assumption</small>
          </div>
          <div className="is-out">
            <span>Outside</span>
            <p>1 untested · 1 blocked</p>
            <small>No conclusion drawn</small>
          </div>
        </div>
        <p className="pe-hint">Select a relationship to inspect it.</p>
        <ClaimChips selected={selected} onSelect={onSelect} />
      </div>
    );
  }

  return (
    <div className="pe-insp-body">
      <p className="pe-insp-kicker">Conclusion · AP-12</p>
      <dl className="pe-dl pe-dl--decision">
        <div>
          <dt>Supported</dt>
          <dd>The internet can reach prod/orders-db, under one stated assumption.</dd>
        </div>
        <div>
          <dt>Uncertain</dt>
          <dd>Two hops are simulated, not exercised. One branch is untested and one check is blocked.</dd>
        </div>
        <div>
          <dt>Next</dt>
          <dd>Narrow the role-batch-ops trust policy, then re-check the path.</dd>
        </div>
      </dl>
      <a className="pe-cta" href="#act-close">
        See how the fix is verified <ArrowRight size={15} aria-hidden />
      </a>
      <ClaimChips selected={selected} onSelect={onSelect} />
    </div>
  );
}
