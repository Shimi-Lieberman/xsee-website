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
  type SimpleIcon,
} from "simple-icons";

type Integration = {
  icon: SimpleIcon;
  label: string;
};

const INTEGRATIONS: Integration[] = [
  { icon: siGooglecloud, label: "Google Cloud" },
  { icon: siGithub, label: "GitHub" },
  { icon: siOkta, label: "Okta" },
  { icon: siDatadog, label: "Datadog" },
  { icon: siSplunk, label: "Splunk" },
  { icon: siCloudflare, label: "Cloudflare" },
  { icon: siKubernetes, label: "Kubernetes" },
  { icon: siTerraform, label: "Terraform" },
  { icon: siSnowflake, label: "Snowflake" },
  { icon: siJira, label: "Jira" },
  { icon: siGitlab, label: "GitLab" },
  { icon: siPagerduty, label: "PagerDuty" },
];

function LogoPill({ icon, label }: Integration) {
  return (
    <div
      className="hp-logo-pill group flex items-center justify-center gap-2.5 px-4 py-5"
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

export default function TrustedByStrip() {
  return (
    <section className="hp-section px-6 lg:px-10" aria-label="Integrations">
      <div className="hp-container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7 lg:gap-12">
          <div className="lg:max-w-[300px]">
            <p className="hp-eyebrow text-[var(--hp-ink3)] mb-2">Works with your stack</p>
            <p className="text-[14.5px] text-[var(--hp-ink2)] leading-[1.55] m-0">
              XSEE plugs into the cloud, identity, and observability tools your
              security team already runs &mdash; generating signed Receipts across
              your existing workflow.
            </p>
          </div>
          <div className="flex-1 lg:max-w-[920px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              {INTEGRATIONS.map((item) => (
                <LogoPill key={item.label} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
