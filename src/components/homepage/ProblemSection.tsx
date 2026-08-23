import type { CSSProperties } from "react";

const CHECKPOINTS = [
  { value: "4,000", label: "raw findings", tone: "neutral" },
  { value: "82", label: "reachable", tone: "orange" },
  { value: "11", label: "exploitable", tone: "orange" },
  { value: "3", label: "proven paths", tone: "pink" },
] as const;

const PATHS = [
  { id: "P-01", path: "Internet → ALB → IAM → RDS", target: "customer-db", status: "CRITICAL" },
  { id: "P-02", path: "CI token → role chain → S3", target: "prod-artifacts", status: "VERIFIED" },
  { id: "P-03", path: "Public pod → metadata → secrets", target: "cluster-admin", status: "VERIFIED" },
] as const;

export default function ProblemSection() {
  return (
    <section id="problem" className="hp-section xsee-problem" aria-labelledby="problem-title">
      <div className="hp-container">
        <div className="xsee-problem-intro">
          <div>
            <p className="hp-eyebrow mb-5">03 / SIGNAL REDUCTION</p>
            <h2 id="problem-title" className="hp-h-display max-w-[820px] text-balance">
              Security tools count findings. <span>XSEE finds the route in.</span>
            </h2>
          </div>
          <p>
            Severity predicts what might happen. XSEE safely validates what can—against your real identities,
            controls, and cloud APIs.
          </p>
        </div>

        <div className="xsee-refinery mt-14 lg:mt-20">
          <header className="xsee-refinery-head">
            <div className="flex items-center gap-3">
              <span className="xsee-refinery-pulse" aria-hidden />
              <span>LIVE CORRELATION / ACME-PROD</span>
            </div>
            <span>LAST RUN · 02:41</span>
          </header>

          <div className="xsee-checkpoints" aria-label="Finding reduction summary">
            {CHECKPOINTS.map((checkpoint, index) => (
              <div key={checkpoint.label} className={`xsee-checkpoint xsee-checkpoint--${checkpoint.tone}`}>
                <span className="xsee-checkpoint-index">0{index + 1}</span>
                <strong>{checkpoint.value}</strong>
                <span>{checkpoint.label}</span>
                {index < CHECKPOINTS.length - 1 && <i aria-hidden />}
              </div>
            ))}
          </div>

          <div className="xsee-evidence-board">
            <div className="xsee-evidence-axis" aria-hidden>
              <span>ENTRY</span><span>IDENTITY</span><span>CONTROL</span><span>IMPACT</span>
            </div>
            <div className="xsee-evidence-lanes">
              {PATHS.map((item, index) => (
                <article key={item.id} className="xsee-evidence-lane" style={{ "--lane-delay": `${index * 220}ms` } as CSSProperties}>
                  <span className="xsee-evidence-id">{item.id}</span>
                  <div className="xsee-evidence-track" aria-hidden><i /><b /><b /><b /><em /></div>
                  <div className="xsee-evidence-copy">
                    <strong>{item.path}</strong>
                    <span>target / {item.target}</span>
                  </div>
                  <span className={`xsee-evidence-status ${index === 0 ? "is-critical" : ""}`}>{item.status}</span>
                </article>
              ))}
            </div>
          </div>

          <footer className="xsee-refinery-foot">
            <span>99.92% noise removed</span>
            <span><b>3</b> paths require action</span>
            <span>evidence signed / immutable</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
