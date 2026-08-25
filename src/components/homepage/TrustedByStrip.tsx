import { siGithub, siOkta, siKubernetes, type SimpleIcon } from "simple-icons";

const INTEGRATIONS: { icon?: SimpleIcon; label: string }[] = [
  { label: "AWS" },
  { icon: siKubernetes, label: "Kubernetes" },
  { icon: siGithub, label: "GitHub" },
  { icon: siOkta, label: "Okta" },
];

export default function TrustedByStrip() {
  return (
    <section className="xsee-trust-rail px-6 lg:px-10" aria-label="Trust and integrations">
      <div className="xsee-trust-shell mx-auto max-w-[1400px]">
        <div className="xsee-trust-integrations">
          <p className="hp-mono text-[9px] tracking-[0.16em] text-[var(--hp-ink3)]">VALIDATES ACROSS YOUR STACK</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            {INTEGRATIONS.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-[12px] font-semibold text-[var(--hp-ink2)]">
                {icon ? <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-[var(--hp-ink3)]"><path d={icon.path} /></svg> : <span className="hp-mono flex h-4 items-center text-[10px] text-[var(--hp-ink3)]">AWS</span>}
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="xsee-outcome-proof">
          <div><strong>3</strong><span>critical paths found</span></div>
          <div><strong>11 min</strong><span>from access to proof</span></div>
          <div className="xsee-proof-seal"><i /> SIGNED · #4821</div>
        </div>
      </div>
    </section>
  );
}
