import { Check } from 'lucide-react'

const FACTS = ['Read-only IAM boundary', 'Live AWS API evidence', 'Signed evidence per hop']

export default function TrustedByStrip() {
  return (
    <section className="xsee-trust-rail px-6 lg:px-10" aria-label="AWS product boundary">
      <div className="xsee-trust-shell mx-auto max-w-[1400px]">
        <div className="xsee-trust-integrations">
          <div>
            <p className="hp-mono text-[9px] tracking-[0.16em] text-[var(--hp-ink3)]">PURPOSE-BUILT FOR AWS</p>
            <strong className="mt-1 block text-[15px] text-[var(--hp-ink)]">Deep, not wide.</strong>
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            {FACTS.map((fact) => <div key={fact} className="flex items-center gap-2 text-[12px] font-medium text-[var(--hp-ink2)]"><Check className="h-3.5 w-3.5 text-[var(--hp-brand)]" aria-hidden />{fact}</div>)}
          </div>
        </div>
        <div className="xsee-outcome-proof">
          <div><strong>10</strong><span>techniques proven end-to-end</span></div>
          <div><strong>4</strong><span>distinct evidence states</span></div>
          <div className="xsee-proof-seal"><i /> REVOCABLE PROOF</div>
        </div>
      </div>
    </section>
  )
}
