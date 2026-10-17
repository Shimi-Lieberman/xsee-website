import { formatUsd } from "@/lib/cinematic/shots";
import type { LabStatus } from "@/lib/cinematic/types";

type Props = { status: LabStatus | undefined; error: string | null };

function runwayLabel(status: LabStatus) {
  const { runway } = status;
  if (runway.state === "ready") return `${runway.creditBalance} credits (${formatUsd(runway.creditBalance)})`;
  if (runway.state === "missing") return "Secret not set";
  return runway.message;
}

export function StatusBar({ status, error }: Props) {
  if (error) {
    return (
      <p className="lab-notice" role="alert">
        {error}
      </p>
    );
  }
  if (!status) return <p className="lab-muted">Checking connections…</p>;

  const items = [
    { label: "Runway", value: runwayLabel(status), ok: status.runway.state === "ready" },
    { label: "Storage", value: status.blob ? "Blob connected" : "Not connected", ok: status.blob },
    { label: "Assembly", value: status.ffmpeg ? "ffmpeg ready" : "ffmpeg missing", ok: status.ffmpeg },
    { label: "Mode", value: status.production ? "Production" : "Preview", ok: true },
  ];

  return (
    <section className="lab-section" aria-label="Connection status">
      <dl className="lab-status">
        {items.map((item) => (
          <div key={item.label} className="lab-pill" data-ok={item.ok}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      {status.runway.state === "missing" ? (
        <p className="lab-notice">
          Add <code>RUNWAYML_API_SECRET</code> in the Vars panel to enable generation. Nothing is billed until you approve
          a take&apos;s cost.
        </p>
      ) : null}
    </section>
  );
}
