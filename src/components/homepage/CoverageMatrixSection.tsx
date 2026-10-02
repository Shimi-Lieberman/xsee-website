'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, ChevronRight, CircleMinus, FileCheck2, LockKeyhole, Pause, Play, RotateCcw, ShieldCheck } from 'lucide-react'

type State = 'PROVEN' | 'CLOSURE-ONLY' | 'N/A' | 'ROADMAP'
type Joint = 'Validate' | 'Predict' | 'Certify' | 'Drift-revoke'
type Technique = { tactic: string; name: string; states: Record<Joint, State>; cert?: string; receipt?: string }

const joints: Joint[] = ['Validate', 'Predict', 'Certify', 'Drift-revoke']
const all = (state: State): Record<Joint, State> => ({ Validate: state, Predict: state, Certify: state, 'Drift-revoke': state })
const certifying: Technique[] = [
  { tactic: 'Privilege escalation', name: 'Attach-admin-to-self', states: all('PROVEN') },
  { tactic: 'Privilege escalation', name: 'Self-escalation policy', states: { ...all('PROVEN'), Predict: 'CLOSURE-ONLY' } },
  { tactic: 'Privilege escalation', name: 'PassRole → Lambda', states: { ...all('PROVEN'), Predict: 'CLOSURE-ONLY' } },
  { tactic: 'Privilege escalation', name: 'PassRole → EC2 (quarantine)', states: all('PROVEN'), cert: 'e5a249f5 · rem CERTIFIED' },
  { tactic: 'Privilege escalation', name: 'Access-key privesc', states: { ...all('PROVEN'), Predict: 'CLOSURE-ONLY' }, cert: '4f3769b7' },
  { tactic: 'Credential access', name: 'Secrets plunder (scope)', states: all('PROVEN'), cert: 'e5a249f5 · legit_n=1' },
  { tactic: 'Network', name: 'Public security group', states: all('PROVEN') },
  { tactic: 'Network', name: 'IMDSv2 enforcement', states: { ...all('PROVEN'), Predict: 'N/A' } },
  { tactic: 'Data exposure', name: 'Public S3 bucket', states: { ...all('PROVEN'), Predict: 'N/A' } },
  { tactic: 'Lateral movement', name: 'Cross-account AssumeRole', states: all('PROVEN'), cert: '2c1feda8', receipt: '56898bca' },
]
const roadmapNames = [
  ['Credential access', 'Console-login credentials'], ['Credential access', 'SSM send-command secrets'],
  ['Persistence', 'Lambda backdoor'], ['Persistence', 'Console login-profile creation'], ['Persistence', 'Role chaining'], ['Persistence', 'Organizations account creation'],
  ['Lateral movement', 'EC2 Instance Connect session'], ['Discovery', 'IAM enumeration'], ['Discovery', 'S3 enumeration'], ['Discovery', 'Cross-account trust enumeration'],
  ['Data exposure / exfil', 'EBS snapshot share'], ['Data exposure / exfil', 'RDS snapshot share'], ['Data exposure / exfil', 'S3 download-at-scale'],
  ['Defense evasion / impact', 'IAM policy overwrite'], ['Defense evasion / impact', 'CloudTrail stop-logging'], ['Defense evasion / impact', 'GuardDuty suspend'], ['Defense evasion / impact', 'IAM user deletion'], ['Defense evasion / impact', 'EBS encryption overwrite'],
] as const
const roadmap: Technique[] = roadmapNames.map(([tactic, name]) => ({ tactic, name, states: tactic === 'Discovery' ? { Validate: 'CLOSURE-ONLY', Predict: 'N/A', Certify: 'N/A', 'Drift-revoke': 'N/A' } : all('ROADMAP') }))
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

function StateIcon({ state }: { state: State }) {
  if (state === 'PROVEN') return <Check aria-hidden />
  if (state === 'CLOSURE-ONLY') return <LockKeyhole aria-hidden />
  if (state === 'N/A') return <CircleMinus aria-hidden />
  return <RotateCcw aria-hidden />
}

export default function CoverageMatrixSection() {
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [techniqueIndex, setTechniqueIndex] = useState(0)
  const [jointIndex, setJointIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const rows = useMemo(() => showRoadmap ? [...certifying, ...roadmap] : certifying, [showRoadmap])
  // Rows shrink when the roadmap collapses, so clamp during render rather
  // than writing corrected state back from an effect.
  const activeIndex = techniqueIndex < rows.length ? techniqueIndex : 0
  const technique = rows[activeIndex] ?? rows[0]
  const joint = joints[jointIndex]
  const state = technique.states[joint]

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      setJointIndex((current) => {
        if (current < joints.length - 1) return current + 1
        setTechniqueIndex((index) => (index + 1) % rows.length)
        return 0
      })
    }, 1800)
    return () => window.clearInterval(timer)
  }, [playing, rows.length])

  const selectTechnique = (index: number) => {
    setTechniqueIndex(index)
    setJointIndex(0)
    setPlaying(false)
  }

  return (
    <section id="coverage" className="hp-section xsee-coverage" aria-labelledby="coverage-title">
      <div className="hp-container">
        <div className="xsee-coverage-intro">
          <div>
            <p className="hp-eyebrow hp-kicker mb-6">XSE-482 · evidence reactor</p>
            <h2 id="coverage-title" className="hp-h-display">Watch every claim pass through proof.</h2>
          </div>
          <p>Ten attack techniques enter one by one. The reactor exposes exactly where each is validated, predicted, certified, and monitored for drift—without flattening closure-only or N/A into a false success.</p>
        </div>

        <div className="xsee-reactor-shell mt-12">
          <header className="xsee-reactor-toolbar">
            <div><i aria-hidden /><span>PROOF CORE / LIVE SEQUENCE</span></div>
            <div className="xsee-matrix-legend" aria-label="Coverage state legend">
              {(['PROVEN', 'CLOSURE-ONLY', 'N/A', 'ROADMAP'] as State[]).map((item) => <span key={item}><i className={`is-${item.toLowerCase()}`} />{item}</span>)}
            </div>
            <button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause evidence sequence' : 'Play evidence sequence'}>{playing ? <Pause aria-hidden /> : <Play aria-hidden />}{playing ? 'PAUSE' : 'PLAY'}</button>
          </header>

          <div className="xsee-reactor-stage">
            <aside className="xsee-reactor-queue" aria-label="Technique queue">
              <div className="xsee-queue-head"><span>INBOUND EVIDENCE</span><b>{String(activeIndex + 1).padStart(2, '0')} / {String(rows.length).padStart(2, '0')}</b></div>
              <div className="xsee-queue-list">
                {rows.map((item, index) => <button type="button" key={`${item.tactic}-${item.name}`} className={index === activeIndex ? 'is-active' : ''} onClick={() => selectTechnique(index)} aria-current={index === activeIndex ? 'true' : undefined}>
                  <span>{String(index + 1).padStart(2, '0')}</span><div><small>{item.tactic}</small><strong>{item.name}</strong></div><ChevronRight aria-hidden />
                </button>)}
              </div>
              <button className="xsee-roadmap-toggle" type="button" onClick={() => { setShowRoadmap((value) => !value); setTechniqueIndex(0); setJointIndex(0); setPlaying(false) }} aria-expanded={showRoadmap}>{showRoadmap ? 'SHOW CERTIFYING 10' : 'LOAD SUPPLIED ROADMAP'}<ChevronRight aria-hidden /></button>
            </aside>

            <div className="xsee-reactor-chamber">
              <div className="xsee-reactor-rail xsee-reactor-rail-in"><span>INGEST</span><b /><ChevronRight aria-hidden /></div>
              <div className={`xsee-reactor-core is-${state.toLowerCase()}`}>
                <div className="xsee-reactor-orbit orbit-one" aria-hidden /><div className="xsee-reactor-orbit orbit-two" aria-hidden />
                {joints.map((item, index) => <button type="button" key={item} className={`xsee-reactor-node node-${index + 1} ${index <= jointIndex ? 'is-reached' : ''} is-${technique.states[item].toLowerCase()}`} onClick={() => { setJointIndex(index); setPlaying(false) }} aria-label={`${item}: ${technique.states[item]}`}>
                  <span>{index + 1}</span><strong>{item}</strong>
                </button>)}
                <div className="xsee-reactor-card" aria-live="polite">
                  <small>{technique.tactic}</small><ShieldCheck aria-hidden /><strong>{technique.name}</strong><span>{joint.toUpperCase()} / {state}</span>
                </div>
              </div>
              <div className="xsee-reactor-rail xsee-reactor-rail-out"><ChevronRight aria-hidden /><b /><span>SIGNED</span></div>
            </div>

            <aside className="xsee-reactor-output">
              <div className={`xsee-output-status is-${state.toLowerCase()}`}><StateIcon state={state} /><span>{joint}</span><strong>{state}</strong></div>
              <div className="xsee-output-copy"><span>JOINT PROOF</span><p>{stateCopy[state]} {jointProof[joint]}</p></div>
              {(technique.cert || technique.receipt) && <div className="xsee-output-ids">
                {technique.cert && <span>CERTIFICATE<strong>{technique.cert}</strong></span>}
                {technique.receipt && <span>WHAT-IF RECEIPT<strong>{technique.receipt}</strong></span>}
              </div>}
              <div className="xsee-output-seal"><FileCheck2 aria-hidden /><div><small>OUTPUT ARTIFACT</small><strong>{state === 'PROVEN' ? 'SIGNED EVIDENCE' : state}</strong></div></div>
            </aside>
          </div>

          <footer className="xsee-reactor-footer"><span>SEQUENCE {playing ? 'RUNNING' : 'HELD'} · SELECT ANY CARD OR JOINT TO INSPECT</span><span>SHA-256 VERIFIED WHEN ISSUED · DRIFT MONITORED</span></footer>
        </div>
        <p className="xsee-matrix-note">The live catalog is approximately 25 techniques. The expandable roadmap reflects the supplied working list and remains subject to live-catalog confirmation before publication.</p>
      </div>
    </section>
  )
}
