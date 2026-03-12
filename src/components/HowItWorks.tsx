"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const STEPS = [
  {
    n: "01",
    title: "Infrastructure Discovery",
    desc: "Scans every cloud asset — EC2, IAM roles, S3 buckets, VPCs, Lambda, EKS, RDS. Maps identities, permissions, and network relationships into a queryable inventory.",
  },
  {
    n: "02",
    title: "Live Attack Graph",
    desc: "Assembles every resource, identity, permission, and network edge into a directed attack graph. Shows exactly how an attacker could move — hop by hop — through your environment.",
  },
  {
    n: "03",
    title: "Exploit Validation",
    desc: "Each candidate path is tested with live AWS API calls. XSEE produces a cryptographic evidence package per hop — not \"this could happen\" but documented proof it will.",
  },
  {
    n: "04",
    title: "Attack Simulation",
    desc: "Replays the full attack chain step by step. Measures your detection coverage at each stage — showing exactly where your SIEM, GuardDuty, and XDR go blind.",
  },
  {
    n: "05",
    title: "Fix the Choke Point",
    desc: "XSEE identifies the single control change that collapses the most attack paths. Apply it, re-simulate, and get a timestamped proof-of-closure for your audit trail.",
  },
];

const STEP_CONFIG = [
  { status: "SCANNING", color: "#0EA5E9", activeNodes: ["hn-internet"], activeEdges: [] },
  { status: "LIVE VALIDATED", color: "#F97316", activeNodes: ["hn-internet", "hn-lb", "hn-ec2"], activeEdges: ["he-inet-lb", "he-lb-ec2"] },
  { status: "ESCALATION", color: "#EAB308", activeNodes: ["hn-internet", "hn-lb", "hn-ec2", "hn-sg", "hn-iam"], activeEdges: ["he-inet-lb", "he-lb-ec2", "he-ec2-sg", "he-sg-iam"] },
  { status: "BREACH CONFIRMED", color: "#EF4444", activeNodes: ["hn-internet", "hn-lb", "hn-ec2", "hn-sg", "hn-iam", "hn-rds"], activeEdges: ["he-inet-lb", "he-lb-ec2", "he-ec2-sg", "he-sg-iam", "he-iam-rds"] },
  { status: "REMEDIATED ✓", color: "#22C55E", activeNodes: ["hn-internet", "hn-lb", "hn-ec2"], activeEdges: ["he-inet-lb", "he-lb-ec2"], dimNodes: ["hn-sg", "hn-iam", "hn-rds"], shieldOn: "hn-sg" },
];

const SCAN_LINES = [
  "→ Connecting to AWS eu-central-1 · read-only IAM",
  "→ 847 assets mapped · 12,847 edges · graph ready",
  "→ 14 candidate paths · escalation chain identified",
  "→ CVE-2020-9283 · RCE confirmed · crown jewel reachable",
  "→ 1 SG rule change eliminates 6 attack vectors · verified",
];

const NODES: { id: string; cx: number; cy: number; label: string; crown?: boolean }[] = [
  { id: "hn-internet", cx: 65, cy: 120, label: "Internet" },
  { id: "hn-lb", cx: 160, cy: 200, label: "Load Balancer" },
  { id: "hn-ec2", cx: 270, cy: 255, label: "EC2 Instance" },
  { id: "hn-sg", cx: 370, cy: 300, label: "Security Group" },
  { id: "hn-iam", cx: 450, cy: 330, label: "IAM Role" },
  { id: "hn-rds", cx: 510, cy: 370, label: "RDS / Crown Jewel", crown: true },
];

const EDGES: { id: string; x1: number; y1: number; x2: number; y2: number }[] = [
  { id: "he-inet-lb", x1: 65, y1: 120, x2: 160, y2: 200 },
  { id: "he-lb-ec2", x1: 160, y1: 200, x2: 270, y2: 255 },
  { id: "he-ec2-sg", x1: 270, y1: 255, x2: 370, y2: 300 },
  { id: "he-sg-iam", x1: 370, y1: 300, x2: 450, y2: 330 },
  { id: "he-iam-rds", x1: 450, y1: 330, x2: 510, y2: 370 },
];

export default function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToStep = useCallback((index: number) => {
    setCurrentStep(index);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        if (e.isIntersecting) {
          intervalRef.current = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % 5);
          }, 2500);
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const config = STEP_CONFIG[currentStep];
  const scanLine = SCAN_LINES[currentStep];

  return (
    <section ref={sectionRef} className="section sec-blue-tint" id="how">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">How It Works</span>
          <h2 className="display-lg">
            From cloud scan to
            <br />
            verified proof in 30 minutes
          </h2>
          <p>
            Connect your AWS account with read-only access. XSEE discovers, graphs, validates, and closes the loop — without touching your infrastructure or slowing a single workload.
          </p>
          <div className="section-rule" />
        </div>
      </div>

      <div className="how-grid">
        <div className="hiw-steps">
          <div className="steps reveal-left">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`step ${currentStep === i ? "active" : ""}`}
                data-step={i}
                onClick={() => goToStep(i)}
                onKeyDown={(e) => e.key === "Enter" && goToStep(i)}
                role="button"
                tabIndex={0}
              >
                <div className="step-n">{step.n}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hiw-graph-wrap reveal-right">
          <div className="hiw-graph-card">
            <div className="hiw-chrome">
              <div className="hiw-chrome-dots">
                <div className="hiw-chrome-dot" style={{ background: "#EF4444" }} />
                <div className="hiw-chrome-dot" style={{ background: "#F59E0B" }} />
                <div className="hiw-chrome-dot" style={{ background: "#22C55E" }} />
              </div>
              <div className="hiw-chrome-title">XSEE · Attack Intelligence Graph</div>
              <div
                className="hiw-status-pill"
                style={{
                  background: `${config.color}22`,
                  color: config.color,
                  border: `1px solid ${config.color}44`,
                }}
              >
                {config.status}
              </div>
            </div>

            <div className="hiw-svg-wrap">
              <svg viewBox="0 0 560 420" xmlns="http://www.w3.org/2000/svg">
                {/* Edges */}
                {EDGES.map((edge) => {
                  const active = config.activeEdges.includes(edge.id);
                  return (
                    <line
                      key={edge.id}
                      className="hiw-edge"
                      x1={edge.x1}
                      y1={edge.y1}
                      x2={edge.x2}
                      y2={edge.y2}
                      stroke={active ? config.color : "#334155"}
                      strokeWidth={active ? 2.5 : 1}
                      strokeOpacity={active ? 1 : 0.4}
                      style={active ? { filter: `drop-shadow(0 0 4px ${config.color})` } : undefined}
                    />
                  );
                })}

                {/* Nodes */}
                {NODES.map((node) => {
                  const active = config.activeNodes.includes(node.id);
                  const dim = config.dimNodes?.includes(node.id);
                  const showShield = config.shieldOn === node.id;
                  const fill = dim ? "#1E293B" : active ? config.color : "#1E293B";
                  const stroke = dim ? "#334155" : active ? config.color : "#334155";
                  const opacity = dim ? 0.5 : 1;
                  const pulse = currentStep === 3 && node.id === "hn-rds";

                  return (
                    <g key={node.id} className={`hiw-node ${pulse ? "pulse" : ""}`} style={{ opacity }}>
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={22}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={active ? 2.5 : 1}
                        className={active ? "active" : ""}
                        style={active ? { filter: `drop-shadow(0 0 8px ${config.color})` } : undefined}
                      />
                      {node.crown && (
                        <text
                          x={node.cx}
                          y={node.cy + 5}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.9)"
                          fontSize={12}
                        >
                          👑
                        </text>
                      )}
                      {showShield && (
                        <g transform={`translate(${node.cx - 14}, ${node.cy - 14})`}>
                          <path
                            d="M14 2L4 6v8c0 5.2 4.2 9.8 10 11.5 5.8-1.7 10-6.3 10-11.5V6L14 2z"
                            fill="rgba(34,197,94,0.2)"
                            stroke="#22C55E"
                            strokeWidth={1.5}
                            strokeLinejoin="round"
                          />
                          <text x={14} y={14} textAnchor="middle" fill="#22C55E" fontSize={10} fontWeight="bold">
                            ✓
                          </text>
                        </g>
                      )}
                      <text
                        x={node.cx}
                        y={node.cy + 38}
                        textAnchor="middle"
                        fill="#94A3B8"
                        fontSize={9}
                        fontFamily="var(--font-mono)"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="hiw-scan-line">{scanLine}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
