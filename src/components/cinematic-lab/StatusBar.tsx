import { formatUsd } from "@/lib/cinematic/shots";
import type { LabStatus } from "@/lib/cinematic/types";

type Props = { status: LabStatus | undefined; error: string | null };

function gatewayLabel(status: LabStatus) {
  const { gateway } = status;
  if (gateway.state === "ready") return `${formatUsd(gateway.creditBalance)} balance`;
  return gateway.message;
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
    { label: "AI Gateway", value: gatewayLabel(status), ok: status.gateway.state === "ready" },
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
      <p className="lab-muted">
        Clips are generated through Vercel AI Gateway and billed to this team&apos;s Gateway balance. Nothing is billed
        until you approve a take&apos;s cost.
      </p>
    </section>
  );
}
