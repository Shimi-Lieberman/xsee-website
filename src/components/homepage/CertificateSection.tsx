'use client'

import { useEffect, useState } from 'react'
import { Check, ShieldAlert } from 'lucide-react'

const states = [
  { name: 'ISSUED', note: 'closure certified', tone: 'ok' },
  { name: 'SUSPENDED', note: 'drift detected', tone: 'warn' },
  { name: 'REVOKED', note: 'FIX_REVERTED', tone: 'danger' },
  { name: 'SUPERSEDED', note: 're-closed', tone: 'brand' },
] as const

export default function CertificateSection() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % states.length), 2600)
    return () => window.clearInterval(timer)
  }, [])
  const current = states[active]

  return (
    <section id="certificate" className="hp-section xsee-cert-lifecycle" aria-labelledby="cert-title">
      <div className="hp-container">
        <div className="xsee-cert-intro">
          <div>
            <p className="hp-eyebrow hp-kicker mb-6">Revocable proof</p>
            <h2 id="cert-title" className="hp-h-display">A certificate that can tell you when it stops being true.</h2>
          </div>
          <p>Closure is not permanent. XSEE monitors the certified state, suspends trust when drift is detected, and preserves the evidence trail through revocation and re-closure.</p>
        </div>

        <div className="xsee-lifecycle-console mt-12">
          <div className="xsee-lifecycle-bar"><span><i /> CERTIFICATE STATE MACHINE</span><span>MONITOR · VERIFY · REVOKE</span></div>
          <div className="xsee-lifecycle-states" role="tablist" aria-label="Certificate lifecycle states">
            {states.map((state, index) => <button key={state.name} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={active === index ? `is-active is-${state.tone}` : ''}>
              <span>0{index + 1}</span><strong>{state.name}</strong><small>{state.note}</small>
            </button>)}
          </div>
          <div className="xsee-lifecycle-body">
            <div className="xsee-lifecycle-path" aria-hidden>
              {states.map((state, index) => <div key={state.name} className={index <= active ? `is-reached is-${state.tone}` : ''}><i>{index < active ? <Check /> : index + 1}</i><span>{state.name}</span>{index < states.length - 1 && <b />}</div>)}
            </div>
            <div className={`xsee-cert-tombstone is-${current.tone}`}>
              <div className="xsee-tombstone-head"><span>BREACH PREVENTION CERTIFICATE</span><strong>{current.name}</strong></div>
              <div className="xsee-tombstone-main">
                <ShieldAlert aria-hidden />
                <div><small>CURRENT ASSERTION</small><h3>{current.note}</h3><p>{active === 0 ? 'The original path re-simulation failed at the remediated joint.' : active === 1 ? 'A monitored configuration no longer matches the certified closed state.' : active === 2 ? 'The prior closure claim is retained as evidence, but is no longer valid.' : 'A new closure proof replaces the revoked certificate without erasing its history.'}</p></div>
              </div>
              <dl>
                <div><dt>Reason</dt><dd>{active === 2 ? 'FIX_REVERTED' : current.note.toUpperCase().replaceAll(' ', '_')}</dd></div>
                <div><dt>Observed</dt><dd>2026-08-23T13:42:39Z</dd></div>
                <div><dt>Verification</dt><dd>SHA-256 verified</dd></div>
                <div><dt>Evidence</dt><dd>CLI-verifiable</dd></div>
              </dl>
            </div>
            <aside>
              <p className="hp-eyebrow hp-eyebrow--bare">Monitoring contract</p>
              <div><strong>Baseline</strong><span>Checked once per scan interval</span></div>
              <div><strong>Pro</strong><span>&lt;60s drift monitoring</span></div>
              <div><strong>Auditor / insurer</strong><span>Independently verifiable evidence of what was proven closed and continuously monitored since.</span></div>
            </aside>
          </div>
          <div className="xsee-lifecycle-foot"><span>STATE TRANSITIONS ARE APPEND-ONLY</span><span>NO CERTIFICATE ID SHOWN WITHOUT ISSUED SOURCE DATA</span></div>
        </div>
      </div>
    </section>
  )
}
