"use client";

import { Zap, Key, Crown, Check, AlertTriangle } from "lucide-react";

/** Animated attack graph preview — static layout, SVG + CSS motion */
export default function AttackGraphPreview() {
  const attackPathD = "M 52 108 L 168 152 L 352 108 L 718 104";
  const secondaryPathUpper = "M 52 108 L 168 48 L 352 108";
  const secondaryPathToTarget = "M 352 108 L 528 48 L 718 104";

  const criticalParticleBegins = ["0.5s", "1s", "1.5s", "2s", "2.5s", "3s", "3.5s", "4s"];

  return (
    <section className="elite-attack-graph-section" aria-labelledby="elite-attack-graph-title">
      <div className="container">
        <div className="elite-attack-graph-head">
          <span className="section-eyebrow mb-3 block">The proof layer</span>
          <h2 id="elite-attack-graph-title" className="elite-attack-graph-title">
            Every hop. Cryptographically proven.
          </h2>
          <p className="elite-attack-graph-sub">
            This is what separates XSEE from every other tool in the market. Not theory — evidence. For every candidate path, XSEE calls IAM Policy Simulator, evaluates security group rules, and checks trust policies. Each response is recorded, timestamped, and signed.
          </p>
        </div>

        <div className="elite-attack-svg-wrap">
          <svg
            viewBox="0 0 800 220"
            width="100%"
            height="220"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: "block" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="attackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#EF4444" stopOpacity="1" />
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.9" />
              </linearGradient>
              <filter id="attackGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="pBlur" />
                <feMerge>
                  <feMergeNode in="pBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Secondary edges (dimmer) */}
            <line x1="52" y1="108" x2="168" y2="48" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="168" y1="48" x2="352" y2="108" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="352" y1="108" x2="528" y2="48" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="528" y1="152" x2="352" y2="108" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="528" y1="48" x2="718" y2="104" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="528" y1="152" x2="718" y2="104" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Glass pill labels */}
            <g>
              <rect x="198" y="72" width="118" height="20" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" />
              <text x="257" y="86" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600">
                Lateral Movement
              </text>
            </g>
            <g>
              <rect x="420" y="78" width="152" height="20" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" />
              <text x="496" y="92" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="600">
                IAM Privilege Escalation
              </text>
            </g>

            {/* Primary attack path */}
            <path
              id="eliteAttackPath"
              d={attackPathD}
              fill="none"
              stroke="url(#attackGradient)"
              strokeWidth="2.5"
              strokeDasharray="800"
              strokeDashoffset="800"
              filter="url(#attackGlow)"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="800"
                to="0"
                dur="2.5s"
                begin="0.5s"
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.42 0 0.58 1"
              />
            </path>

            {/* Critical path particles */}
            {criticalParticleBegins.map((begin) => (
              <circle key={begin} r="4" fill="#EF4444" filter="url(#particleGlow)">
                <animateMotion
                  path={attackPathD}
                  dur="4s"
                  begin={begin}
                  repeatCount="indefinite"
                  calcMode="linear"
                  keyPoints="0;1"
                  keyTimes="0;1"
                />
              </circle>
            ))}

            {/* Softer particles on secondary routes */}
            <circle r="2.5" fill="rgba(255,255,255,0.5)">
              <animateMotion
                path={secondaryPathUpper}
                dur="6s"
                begin="0s"
                repeatCount="indefinite"
                calcMode="linear"
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </circle>
            <circle r="2.5" fill="rgba(255,255,255,0.5)">
              <animateMotion
                path={secondaryPathUpper}
                dur="6s"
                begin="3s"
                repeatCount="indefinite"
                calcMode="linear"
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </circle>
            <circle r="2.5" fill="rgba(255,255,255,0.5)">
              <animateMotion
                path={secondaryPathToTarget}
                dur="6s"
                begin="1.5s"
                repeatCount="indefinite"
                calcMode="linear"
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </circle>
            <circle r="2.5" fill="rgba(255,255,255,0.5)">
              <animateMotion
                path={secondaryPathToTarget}
                dur="6s"
                begin="4.5s"
                repeatCount="indefinite"
                calcMode="linear"
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </circle>

            {/* Node 1 Internet */}
            <g transform="translate(52,108)">
              <circle r="22" fill="rgba(8,145,178,0.15)" stroke="#0891B2" strokeWidth="2">
                <animate attributeName="r" values="22;25;22" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
              </circle>
              <g stroke="#0891B2" fill="none" strokeWidth="1.2">
                <circle r="8" />
                <ellipse rx="3" ry="8" />
                <line x1="-8" y1="0" x2="8" y2="0" />
                <line x1="0" y1="-8" x2="0" y2="8" />
              </g>
            </g>

            {/* Node 2 ALB */}
            <g transform="translate(168,48)">
              <circle r="20" fill="rgba(249,115,22,0.12)" stroke="#F97316" strokeWidth="2" />
              <g stroke="#F97316" fill="#F97316" strokeWidth="1.2">
                <rect x="-2" y="-8" width="4" height="4" rx="0.5" />
                <rect x="-8" y="4" width="4" height="4" rx="0.5" />
                <rect x="4" y="4" width="4" height="4" rx="0.5" />
              </g>
            </g>

            {/* Node 3 EC2 bastion */}
            <g transform="translate(168,152)">
              <circle r="20" fill="rgba(249,115,22,0.12)" stroke="#F97316" strokeWidth="2" />
              <g stroke="#F97316" fill="none" strokeWidth="1.2">
                <rect x="-9" y="-8" width="18" height="6" rx="1" />
                <rect x="-9" y="2" width="18" height="6" rx="1" />
              </g>
            </g>

            {/* Node 4 IAM — float */}
            <g transform="translate(352,108)">
              <g>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 0,-8; 0,0"
                  dur="3s"
                  repeatCount="indefinite"
                />
                <circle r="22" fill="rgba(124,58,237,0.15)" stroke="#7C3AED" strokeWidth="2">
                  <animate
                    attributeName="r"
                    values="22;26;22"
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </circle>
                <g stroke="#7C3AED" fill="none" strokeWidth="1.2">
                  <circle cx="-3" cy="-1" r="5" />
                  <line x1="2" y1="-1" x2="10" y2="-1" />
                  <line x1="7" y1="-1" x2="7" y2="3" />
                  <line x1="10" y1="-1" x2="10" y2="3" />
                </g>
              </g>
            </g>

            {/* Node 5 Lambda */}
            <g transform="translate(528,48)">
              <circle r="18" fill="rgba(249,115,22,0.1)" stroke="#F97316" strokeWidth="2" />
            </g>

            {/* Node 6 Secret */}
            <g transform="translate(528,152)">
              <circle r="18" fill="rgba(124,58,237,0.12)" stroke="#7C3AED" strokeWidth="2" />
            </g>

            {/* Node 7 prod-db crown jewel */}
            <g transform="translate(718,104)">
              <circle r="28" fill="none" stroke="#7C3AED" strokeWidth="1" opacity="0">
                <animate attributeName="r" values="28;45" dur="2s" repeatCount="indefinite" begin="1s" />
                <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" begin="1s" />
              </circle>
              <circle r="30" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.35">
                <animate attributeName="r" values="26;34;26" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle
                r="26"
                fill="rgba(245,158,11,0.12)"
                stroke="#F59E0B"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 8px rgba(245,158,11,0.45))" }}
              >
                <animate
                  attributeName="r"
                  values="26;30;26"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="1s"
                />
                <animate
                  attributeName="stroke-width"
                  values="1.5;3;1.5"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="1s"
                />
              </circle>
            </g>

            {/* Labels */}
            <text x="52" y="188" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="600">Internet</text>
            <text x="52" y="200" textAnchor="middle" fill="#475569" fontSize="9">Entry</text>
            <text x="168" y="28" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="600">ALB</text>
            <text x="168" y="40" textAnchor="middle" fill="#475569" fontSize="9">AWS</text>
            <text x="168" y="188" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="600">EC2</text>
            <text x="168" y="200" textAnchor="middle" fill="#475569" fontSize="9">Bastion</text>
            <text x="352" y="188" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="600">IAM Role</text>
            <text x="352" y="200" textAnchor="middle" fill="#475569" fontSize="9">Identity</text>
            <text x="528" y="28" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="600">Lambda</text>
            <text x="528" y="40" textAnchor="middle" fill="#475569" fontSize="9">Compute</text>
            <text x="528" y="188" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="600">Secret</text>
            <text x="528" y="200" textAnchor="middle" fill="#475569" fontSize="9">AWS SM</text>
            <text x="718" y="188" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="600">prod-db</text>
            <text x="718" y="200" textAnchor="middle" fill="#475569" fontSize="9">Crown jewel</text>
          </svg>
          <div
            className="elite-attack-node-icon-layer"
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: `${(528 / 800) * 100}%`,
                top: `${(48 / 220) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Zap size={16} color="#F97316" strokeWidth={2} aria-hidden />
            </div>
            <div
              style={{
                position: "absolute",
                left: `${(528 / 800) * 100}%`,
                top: `${(152 / 220) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Key size={14} color="#A78BFA" strokeWidth={2} aria-hidden />
            </div>
            <div
              style={{
                position: "absolute",
                left: `${(718 / 800) * 100}%`,
                top: `${(104 / 220) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Crown size={18} color="#F59E0B" strokeWidth={2} aria-hidden />
            </div>
          </div>
        </div>

        <div className="elite-attack-pills font-mono">
          <span className="elite-evidence-pill elite-pill-orange-pulse elite-pill-with-icon">
            <Zap size={12} strokeWidth={2.5} aria-hidden />
            EXPLOITABLE
          </span>
          <span className="elite-evidence-pill elite-pill-green elite-pill-with-icon">
            <Check size={12} strokeWidth={2.5} aria-hidden />
            Confidence 92% · L2
          </span>
          <span className="elite-evidence-pill">4 Hops</span>
          <span className="elite-evidence-pill elite-pill-red elite-pill-with-icon">
            <AlertTriangle size={12} strokeWidth={2.5} aria-hidden />
            Blast: 4 resources
          </span>
          <span className="elite-evidence-pill elite-pill-red elite-pill-with-icon">
            <AlertTriangle size={12} strokeWidth={2.5} aria-hidden />
            Detection 0%
          </span>
        </div>
      </div>
    </section>
  );
}
