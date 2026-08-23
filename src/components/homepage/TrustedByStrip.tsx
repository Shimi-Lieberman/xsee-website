import { siGooglecloud, siGithub, siOkta, siDatadog, siSplunk, siKubernetes, siTerraform, siSnowflake, type SimpleIcon } from "simple-icons";

type Integration = { icon: SimpleIcon; label: string };
const INTEGRATIONS: Integration[] = [
  { icon: siGooglecloud, label: "Google Cloud" }, { icon: siGithub, label: "GitHub" },
  { icon: siOkta, label: "Okta" }, { icon: siDatadog, label: "Datadog" },
  { icon: siSplunk, label: "Splunk" }, { icon: siKubernetes, label: "Kubernetes" },
  { icon: siTerraform, label: "Terraform" }, { icon: siSnowflake, label: "Snowflake" },
];

export default function TrustedByStrip() {
  return (
    <section className="xsee-trust-rail px-6 lg:px-10" aria-label="Integrations">
      <div className="mx-auto flex max-w-[1400px] flex-col border-y border-[var(--hp-line)] lg:flex-row lg:items-center">
        <div className="shrink-0 border-b border-[var(--hp-line)] py-5 lg:w-[220px] lg:border-b-0 lg:border-r lg:pr-8">
          <p className="hp-mono text-[10px] tracking-[0.16em] text-[var(--hp-ink3)]">OPERATES ACROSS YOUR STACK</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 py-5 lg:px-8">
          {INTEGRATIONS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-[12px] font-medium text-[var(--hp-ink2)]">
              <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-[var(--hp-ink3)]"><path d={icon.path} /></svg>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="ml-auto hidden shrink-0 border-l border-[var(--hp-line)] py-5 pl-8 lg:block"><span className="hp-mono text-[10px] text-[var(--hp-ok)]">● SYSTEM READY</span></div>
      </div>
    </section>
  );
}
