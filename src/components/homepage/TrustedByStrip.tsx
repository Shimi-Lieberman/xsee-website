import {
  siGooglecloud,
  siGithub,
  siGitlab,
  siJira,
  siDatadog,
  siSplunk,
  siOkta,
  siTerraform,
  siKubernetes,
  siSnowflake,
  siCloudflare,
  siPagerduty,
  siGrafana,
  siElastic,
  siDocker,
  siJenkins,
  siPrometheus,
  siSentry,
  type SimpleIcon,
} from "simple-icons";

type Integration = {
  icon: SimpleIcon;
  label: string;
};

const ROW_ONE: Integration[] = [
  { icon: siGooglecloud, label: "Google Cloud" },
  { icon: siGithub, label: "GitHub" },
  { icon: siOkta, label: "Okta" },
  { icon: siDatadog, label: "Datadog" },
  { icon: siSplunk, label: "Splunk" },
  { icon: siCloudflare, label: "Cloudflare" },
  { icon: siKubernetes, label: "Kubernetes" },
  { icon: siTerraform, label: "Terraform" },
  { icon: siSnowflake, label: "Snowflake" },
];

const ROW_TWO: Integration[] = [
  { icon: siJira, label: "Jira" },
  { icon: siGitlab, label: "GitLab" },
  { icon: siPagerduty, label: "PagerDuty" },
  { icon: siGrafana, label: "Grafana" },
  { icon: siElastic, label: "Elastic" },
  { icon: siDocker, label: "Docker" },
  { icon: siJenkins, label: "Jenkins" },
  { icon: siPrometheus, label: "Prometheus" },
  { icon: siSentry, label: "Sentry" },
];

function LogoPill({ icon, label }: Integration) {
  return (
    <div
      className="hp-logo-pill flex items-center justify-center gap-2.5 px-6 py-3.5"
      style={{ ["--brand" as string]: `#${icon.hex}` }}
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="hp-logo-svg h-[18px] w-[18px] shrink-0"
      >
        <path d={icon.path} />
      </svg>
      <span className="hp-logo-mark text-[14px] font-medium tracking-[-0.01em] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: Integration[];
  direction: "left" | "right";
}) {
  // Duplicate the set so the track can loop seamlessly.
  const track = [...items, ...items];
  return (
    <div className="hp-marquee" aria-hidden="true">
      <div
        className={`hp-marquee-track ${
          direction === "right" ? "hp-marquee-track--reverse" : ""
        }`}
      >
        {track.map((item, i) => (
          <LogoPill key={`${item.label}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function TrustedByStrip() {
  const allLabels = [...ROW_ONE, ...ROW_TWO].map((i) => i.label).join(", ");

  return (
    <section className="hp-section px-6 lg:px-10" aria-label="Integrations">
      <div className="hp-container">
        <div className="text-center mb-9 lg:mb-11">
          <p className="hp-eyebrow text-[var(--hp-ink3)] mb-3">Works with your stack</p>
          <h2 className="text-[22px] lg:text-[27px] font-semibold tracking-[-0.02em] text-[var(--hp-ink)] leading-[1.25] m-0 text-balance">
            XSEE plugs into the tools your security team already runs
          </h2>
          <p className="text-[14.5px] text-[var(--hp-ink2)] leading-[1.55] mt-3 mx-auto max-w-[560px]">
            Cloud, identity, and observability platforms &mdash; generating signed
            Receipts across your existing workflow.
          </p>
        </div>

        <div className="hp-marquee-wrap flex flex-col gap-4">
          <MarqueeRow items={ROW_ONE} direction="left" />
          <MarqueeRow items={ROW_TWO} direction="right" />
        </div>

        {/* Accessible, non-visual list of the integrations for screen readers */}
        <p className="sr-only">Integrations include {allLabels}.</p>
      </div>
    </section>
  );
}
