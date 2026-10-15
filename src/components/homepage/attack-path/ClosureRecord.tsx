import { useId, useState } from "react";
import { ChevronDown, History } from "lucide-react";
import { SCENARIO, TIMESTAMPS } from "@/lib/attackPathScenario";
import { closureHistory, pathResult, type DemoState } from "./demoState";
import { ResultChip } from "./parts";

export default function ClosureRecord({ state }: { state: DemoState }) {
  const [open, setOpen] = useState(false);
  const regionId = useId();
  const result = pathResult(state);
  const history = closureHistory(state);
  const verifiedAt = state.step === 5 || (state.step === 4 && state.beat >= 4) ? TIMESTAMPS.verified : "Not yet verified";
  const limitation =
    state.step === 5 && state.drift !== "none"
      ? "The earlier closure applied to the configuration as of the verification time. It does not hold after the trust-policy change."
      : "Covers configuration and policy simulation only. Does not test application vulnerabilities. nw-exports is untested.";

  return (
    <section className="apd-record" aria-label="Closure record">
      <button type="button" className="apd-record-toggle" aria-expanded={open} aria-controls={regionId} onClick={() => setOpen((value) => !value)}>
        <History aria-hidden />
        <span className="apd-record-title">
          Closure record <span>· {SCENARIO.pathId}</span>
        </span>
        <ResultChip result={result} />
        <ChevronDown aria-hidden className="apd-record-chevron" />
      </button>
      <div id={regionId} className="apd-record-region" data-open={open} inert={!open}>
        <div className="apd-record-inner">
          <dl className="apd-record-grid">
            <div>
              <dt>Scenario</dt>
              <dd>
                {SCENARIO.name} · {SCENARIO.account}
              </dd>
            </div>
            <div>
              <dt>Path</dt>
              <dd>
                {SCENARIO.pathId} · {SCENARIO.pathTitle}
              </dd>
            </div>
            <div>
              <dt>Scope and conditions</dt>
              <dd>IAM, ECS, ELB, S3, and Secrets Manager. Assumes code execution in web-frontend. SCPs and permission boundaries included.</dd>
            </div>
            <div>
              <dt>Method</dt>
              <dd>Read-only configuration collection and IAM policy simulation. No role assumed, no secret read.</dd>
            </div>
            <div>
              <dt>Verified</dt>
              <dd>{verifiedAt}</dd>
            </div>
            <div>
              <dt>Limitations</dt>
              <dd>{limitation}</dd>
            </div>
          </dl>
          <h5>History</h5>
          <ol className="apd-history">
            {history.map((event, index) => (
              <li key={index} className={`apd-tone-${event.tone}`}>
                <time>{event.time}</time>
                <span>{event.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
