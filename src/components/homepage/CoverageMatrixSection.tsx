'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronRight, CircleMinus, LockKeyhole, X } from 'lucide-react'

type State = 'PROVEN' | 'CLOSURE-ONLY' | 'N/A' | 'ROADMAP'
type Joint = 'Validate' | 'Predict' | 'Certify' | 'Drift-revoke'
type Technique = { tactic: string; name: string; states: Record<Joint, State>; cert?: string; receipt?: string }

const joints: Joint[] = ['Validate', 'Predict', 'Certify', 'Drift-revoke']
const all = (state: State): Record<Joint, State> => ({ Validate: state, Predict: state, Certify: state, 'Drift-revoke': state })
const certifying: Technique[] = [
  { tactic: 'Privilege escalation', name: 'Attach-admin-to-self', states: all('PROVEN') },
  { tactic: 'Privilege escalation', name: 'Self-escalation policy', states: { ...all('PROVEN'), Predict: 'CLOSURE-ONLY' } },
  { tactic: 'Privilege escalation', name: 'PassRole → Lambda', states: { ...all('PROVEN'), Predict: 'CLOSURE-ONLY' } },
  { tactic: 'Privilege escalation', name: 'PassRole → EC2 (quarantine)', states: all('PROVEN'), cert: 'e5a249f5' },
  { tactic: 'Privilege escalation', name: 'Access-key privilege escalation', states: { ...all('PROVEN'), Predict: 'CLOSURE-ONLY' }, cert: '4f3769b7' },
  { tactic: 'Credential access', name: 'Secrets plunder (scope)', states: all('PROVEN'), cert: 'e5a249f5' },
  { tactic: 'Network', name: 'Public security group', states: all('PROVEN') },
  { tactic: 'Network', name: 'IMDSv2 enforcement', states: { ...all('PROVEN'), Predict: 'N/A' } },
  { tactic: 'Data exposure', name: 'Public S3 bucket', states: { ...all('PROVEN'), Predict: 'N/A' } },
  { tactic: 'Lateral movement', name: 'Cross-account AssumeRole', states: all('PROVEN'), cert: '2c1feda8', receipt: '56898bca' },
]
const roadmapNames = [
  ['Credential access', 'Console-login credentials'], ['Credential access', 'SSM send-command secrets'],
  ['Persistence', 'Lambda backdoor'], ['Persistence', 'Console login-profile creation'], ['Persistence', 'Role chaining'], ['Persistence', 'Organizations account creation'],
  ['Lateral movement', 'EC2 Instance Connect session'],
  ['Discovery', 'IAM enumeration'], ['Discovery', 'S3 enumeration'], ['Discovery', 'Cross-account trust enumeration'],
  ['Data exposure / exfil', 'EBS snapshot share'], ['Data exposure / exfil', 'RDS snapshot share'], ['Data exposure / exfil', 'S3 download-at-scale'],
  ['Defense evasion / impact', 'IAM policy overwrite'], ['Defense evasion / impact', 'CloudTrail stop-logging'], ['Defense evasion / impact', 'GuardDuty suspend'], ['Defense evasion / impact', 'IAM user deletion'], ['Defense evasion / impact', 'EBS encryption overwrite'],
] as const
const roadmap: Technique[] = roadmapNames.map(([tactic, name]) => ({
  tactic, name, states: tactic === 'Discovery' ? { Validate: 'CLOSURE-ONLY', Predict: 'N/A', Certify: 'N/A', 'Drift-revoke': 'N/A' } : all('ROADMAP'),
}))
const stateCopy: Record<State, string> = {
  PROVEN: 'End-to-end proof exists for this joint.',
  'CLOSURE-ONLY': 'Path closure is proven; a collateral twin is not asserted.',
  'N/A': 'Not applicable by design; closure is configuration-verified.',
  ROADMAP: 'Catalogued for future end-to-end implementation.',
}
const jointProof: Record<Joint, string> = {
  Validate: 'Live AWS API evidence validates the reachable joint.',
  Predict: 'A proven twin models effect, or closure is explicitly scoped.',
  Certify: 'Signed evidence is SHA-256 verifiable when issued.',
  'Drift-revoke': 'The closed state is monitored and suspends on detected drift.',
}

export default function CoverageMatrixSection() {
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [selected, setSelected] = useState<{ technique: Technique; joint: Joint } | null>({ technique: certifying[0], joint: 'Validate' })
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  const rows = showRoadmap ? [...certifying, ...roadmap] : certifying

  return (
    <section id="coverage" className="hp-section xsee-coverage" aria-labelledby="coverage-title">
      <div className="hp-container">
        <div className="xsee-coverage-intro">
          <div>
            <p className="hp-eyebrow hp-kicker mb-6">XSE-482 · evidence coverage</p>
            <h2 id="coverage-title" className="hp-h-display">XSEE proves 10 attack techniques end-to-end.</h2>
          </div>
          <p>Not a pattern count. Each pink joint has evidence behind it. Closure-only, configuration N/A, and roadmap states remain visibly different because uniformity would overstate the proof.</p>
        </div>

        <div className="xsee-matrix-shell mt-12">
          <div className="xsee-matrix-toolbar">
            <div className="xsee-matrix-legend" aria-label="Coverage state legend">
              {(['PROVEN', 'CLOSURE-ONLY', 'N/A', 'ROADMAP'] as State[]).map((state) => <span key={state}><i className={`is-${state.toLowerCase()}`} />{state}</span>)}
            </div>
            <button type="button" onClick={() => setShowRoadmap((value) => !value)} aria-expanded={showRoadmap}>
              {showRoadmap ? 'Show certifying only' : 'Show full catalogue'} <ChevronRight aria-hidden />
            </button>
          </div>
          <div className="xsee-matrix-scroll">
            <table className="xsee-matrix-table">
              <thead><tr><th>Technique / tactic</th>{joints.map((joint) => <th key={joint}>{joint}</th>)}</tr></thead>
              <tbody>{rows.map((technique, index) => {
                const beginsGroup = index === 0 || rows[index - 1].tactic !== technique.tactic
                return <tr key={`${technique.tactic}-${technique.name}`} className={beginsGroup ? 'is-group-start' : ''}>
                  <th scope="row"><small>{technique.tactic}</small><strong>{technique.name}</strong></th>
                  {joints.map((joint) => {
                    const state = technique.states[joint]
                    const active = selected?.technique.name === technique.name && selected.joint === joint
                    return <td key={joint}><button type="button" className={`xsee-matrix-cell is-${state.toLowerCase()} ${active ? 'is-active' : ''}`} onClick={() => setSelected({ technique, joint })} aria-label={`${technique.name}, ${joint}: ${state}`}>
                      {state === 'PROVEN' && <Check aria-hidden />}{state === 'CLOSURE-ONLY' && <LockKeyhole aria-hidden />}{state === 'N/A' && <CircleMinus aria-hidden />}<span>{state}</span>
                    </button></td>
                  })}
                </tr>
              })}</tbody>
            </table>
          </div>
          <div className="xsee-proof-drawer" aria-live="polite">
            {selected ? <>
              <div><span>{selected.technique.tactic}</span><strong>{selected.technique.name}</strong></div>
              <div><span>{selected.joint} · {selected.technique.states[selected.joint]}</span><p>{stateCopy[selected.technique.states[selected.joint]]} {jointProof[selected.joint]}</p></div>
              <div className="xsee-proof-ids">
                {selected.technique.cert && <span>CERT <b>{selected.technique.cert}</b></span>}
                {selected.technique.receipt && <span>WHAT-IF <b>{selected.technique.receipt}</b></span>}
                {!selected.technique.cert && !selected.technique.receipt && <span>NO CERT ID PUBLISHED</span>}
              </div>
              <button type="button" onClick={() => setSelected(null)} aria-label="Close proof detail"><X aria-hidden /></button>
            </> : <p>Select any joint to inspect exactly what its state means.</p>}
          </div>
        </div>
        <p className="xsee-matrix-note">Approximately 25 techniques are catalogued. A row enters the certifying set only after Validate → Predict → Certify → Drift-revoke is represented honestly end-to-end.</p>
      </div>
    </section>
  )
}
