"use client";

import { useId } from "react";
import { Award, Bot, Radio, Shield, Wrench, Zap } from "lucide-react";

function BentoHopApiSvg() {
  const mid = useId().replace(/:/g, "");
  return (
    <svg width="200" height="100" viewBox="0 0 200 100" fill="none" aria-hidden className="bento-main-visual">
      <rect x="8" y="32" width="44" height="36" rx="6" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(37,99,235,0.08)" />
      <text x="30" y="55" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="var(--font-mono)">
        hop
      </text>
      <path d="M52 50h36" stroke="rgba(37,99,235,0.5)" strokeWidth="1.5" strokeDasharray="3 2" markerEnd={`url(#bentoArr-${mid})`} />
      <rect x="92" y="28" width="56" height="44" rx="6" stroke="rgba(37,99,235,0.35)" strokeWidth="1" fill="rgba(37,99,235,0.12)" />
      <text x="120" y="50" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="var(--font-mono)">
        API
      </text>
      <text x="120" y="64" textAnchor="middle" fill="#2563eb" fontSize="9" fontWeight="600" fontFamily="var(--font-mono)">
        call
      </text>
      <path d="M148 50h28" stroke="rgba(37,99,235,0.5)" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x="176" y="32" width="22" height="36" rx="4" stroke="rgba(74,222,128,0.4)" strokeWidth="1" fill="rgba(74,222,128,0.1)" />
      <text x="187" y="56" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700" fontFamily="var(--font-mono)">
        OK
      </text>
      <defs>
        <marker id={`bentoArr-${mid}`} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <polygon points="0 0, 5 2.5, 0 5" fill="rgba(37,99,235,0.5)" />
        </marker>
      </defs>
    </svg>
  );
}

export default function EnginesGrid() {
  return (
    <section className="engines-bento-section" id="engines">
      <style>{`
        .engines-bento-section {
          background: #030810;
          padding: 96px 0;
          color: #fff;
        }
        .engines-bento-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }
        .engines-bento-card {
          position: relative;
        }
        .engines-bento-main {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 1fr minmax(160px, 220px);
          gap: 24px;
          align-items: center;
          padding: 32px;
          border-radius: 12px;
          background: #0d1420;
          border: 1px solid rgba(37, 99, 235, 0.3);
          border-top: 2px solid #2563eb;
          transition: border-color 150ms ease;
        }
        .engines-bento-main:hover {
          border-color: rgba(255, 255, 255, 0.12);
        }
        .engines-bento-span3 {
          grid-column: span 3;
        }
        .engines-bento-span2 {
          grid-column: span 2;
        }
        .engines-bento-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 10px;
          color: #fff;
        }
        .engines-bento-body {
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }
        .engines-bento-icon-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .engines-bento-pro {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 9px;
          font-weight: 600;
          color: #a78bfa;
          background: rgba(167, 139, 250, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
          letter-spacing: 0.06em;
        }
        .engines-bento-tile {
          background: #0d1420;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 28px;
          transition: border-color 150ms ease;
        }
        .engines-bento-tile:hover {
          border-color: rgba(255, 255, 255, 0.12);
        }
        @media (max-width: 768px) {
          .engines-bento-section {
            padding: 64px 0;
          }
          .engines-bento-grid {
            grid-template-columns: 1fr;
          }
          .engines-bento-main {
            grid-template-columns: 1fr;
            padding: 28px;
          }
          .bento-main-visual {
            display: none;
          }
          .engines-bento-span3,
          .engines-bento-span2 {
            grid-column: 1 / -1;
          }
          .engines-bento-body {
            font-size: 16px;
          }
        }
      `}</style>
      <div className="container">
        <div className="section-head reveal" style={{ marginBottom: 56 }}>
          <span className="section-eyebrow" style={{ color: "rgba(255,255,255,0.35)" }}>
            Platform architecture
          </span>
          <h2 className="display-lg" style={{ color: "#fff" }}>
            Seven engines. One autonomous loop.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)" }}>
            From discovery to verified closure — automatically. One human decision per finding.
          </p>
          <div className="section-rule" style={{ background: "linear-gradient(90deg, #2563eb, transparent)" }} />
        </div>

        <div className="engines-bento-grid stagger-children">
          <div className="engines-bento-main engines-bento-card reveal">
            <div style={{ minWidth: 0 }}>
              <div className="engines-bento-icon-wrap">
                <Shield size={20} color="#2563eb" aria-hidden />
              </div>
              <h3 className="engines-bento-title">L2 AWS API Validation</h3>
              <p className="engines-bento-body">
                Live AWS API call per hop — cryptographic evidence per finding. Not theory. Proof.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center" style={{ minHeight: 100 }}>
              <BentoHopApiSvg />
            </div>
          </div>

          <div
            className="engines-bento-span3 engines-bento-card engines-bento-tile reveal"
            style={{ borderTop: "2px solid #e91e8c" }}
          >
            <div className="engines-bento-icon-wrap">
              <Zap size={20} color="#e91e8c" aria-hidden />
            </div>
            <h3 className="engines-bento-title">XseeCyber Simulation</h3>
            <p className="engines-bento-body">
              Replays confirmed paths. Human + AI attacker models. Detection Coverage Score.
            </p>
          </div>

          <div
            className="engines-bento-span3 engines-bento-card engines-bento-tile reveal"
            style={{ borderTop: "2px solid #4ade80" }}
          >
            <div className="engines-bento-icon-wrap">
              <Award size={20} color="#4ade80" aria-hidden />
            </div>
            <h3 className="engines-bento-title">Breach Prevention Certificate</h3>
            <p className="engines-bento-body">
              Before/after cryptographic proof. Issued when L2 confirms path closed.
            </p>
          </div>

          <div className="engines-bento-span2 engines-bento-card engines-bento-tile reveal">
            <div className="engines-bento-icon-wrap">
              <Bot size={20} color="#60a5fa" aria-hidden />
            </div>
            <h3 className="engines-bento-title">Autonomous Agents</h3>
            <p className="engines-bento-body">
              Investigation, Board Report, Threat Hunt, Remediation — AI handles it.
            </p>
          </div>

          <div className="engines-bento-span2 engines-bento-card engines-bento-tile reveal">
            <div className="engines-bento-icon-wrap">
              <Wrench size={20} color="#fbbf24" aria-hidden />
            </div>
            <h3 className="engines-bento-title">Smart Remediation</h3>
            <p className="engines-bento-body">
              One fix that eliminates the most paths simultaneously. Terraform + CLI.
            </p>
          </div>

          <div className="engines-bento-span2 engines-bento-card engines-bento-tile reveal" style={{ position: "relative" }}>
            <span className="engines-bento-pro">PRO</span>
            <div className="engines-bento-icon-wrap">
              <Radio size={20} color="#a78bfa" aria-hidden />
            </div>
            <h3 className="engines-bento-title">Real-Time Detection</h3>
            <p className="engines-bento-body">
              Optional Lambda agent. Sub-60s detection. Pro plan. Auditable code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
