"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { RefreshCw, Award, type LucideIcon } from "lucide-react";

const ALL_EDGE_IDS: string[] = ["he-inet-lb", "he-lb-ec2", "he-ec2-sg", "he-sg-iam", "he-iam-rds"];
const ALL_NODE_IDS: string[] = ["hn-internet", "hn-lb", "hn-ec2", "hn-sg", "hn-iam", "hn-rds"];

type StepDef = {
  n: string;
  title: string;
  desc: string;
  Icon?: LucideIcon;
  certify?: boolean;
};

const STEPS: StepDef[] = [
  {
    n: "01",
    title: "Connect (2 minutes)",
    desc: "Create a read-only IAM role in AWS. Paste the ARN. That's it. XSEE never writes to your environment. You can revoke access in one click.",
  },
  {
    n: "02",
    title: "Discover (5 minutes)",
    desc: "XSEE maps every asset, identity, permission, and network relationship in your AWS environment. 847 resources. 12,847 edges. Assembled into a live attack graph using 1,000+ known attack patterns.",
  },
  {
    n: "03",
    title: "Validate (10 minutes)",
    desc: "For every candidate path, XSEE calls live AWS APIs to test each hop. Not simulation — validation. Each hop returns a cryptographic evidence package: exact API call, exact response, exact timestamp. \"This path is confirmed exploitable\" — with proof.",
  },
  {
    n: "04",
    title: "Simulate (15 minutes)",
    desc: "XseeCyber replays the confirmed attack chain step by step — the way a human attacker would execute it, and the way an AI attacker would execute it differently. At every step: did GuardDuty fire? Did CloudTrail log it? Did your SIEM catch it? The answer, for most teams, is no.",
  },
  {
    n: "05",
    title: "Fix",
    desc: "One recommended fix. Minimum change, maximum paths eliminated. Terraform, CLI, or CloudFormation — you choose. Apply the change XSEE recommends — then verification runs automatically.",
  },
  {
    n: "06",
    title: "Verify",
    desc: "Apply the fix. XSEE re-runs L2 validation automatically. If the path no longer validates — it's marked closed.",
    Icon: RefreshCw,
  },
  {
    n: "07",
    title: "Certify",
    desc: "Before/after evidence package generated automatically. Timestamped proof that the path was open, is now closed, and what changed. Board-ready. Audit-ready.",
    Icon: Award,
    certify: true,
  },
];

const STEP_CONFIG = [
  { status: "SCANNING", color: "#0EA5E9", activeNodes: ["hn-internet"], activeEdges: [] as string[] },
  { status: "LIVE VALIDATED", color: "#F97316", activeNodes: ["hn-internet", "hn-lb", "hn-ec2"], activeEdges: ["he-inet-lb", "he-lb-ec2"] },
  { status: "ESCALATION", color: "#EAB308", activeNodes: ["hn-internet", "hn-lb", "hn-ec2", "hn-sg", "hn-iam"], activeEdges: ["he-inet-lb", "he-lb-ec2", "he-ec2-sg", "he-sg-iam"] },
  { status: "BREACH CONFIRMED", color: "#EF4444", activeNodes: [...ALL_NODE_IDS], activeEdges: [...ALL_EDGE_IDS] },
  { status: "REMEDIATED ✓", color: "#D4006E", activeNodes: ["hn-internet", "hn-lb", "hn-ec2"], activeEdges: ["he-inet-lb", "he-lb-ec2"], dimNodes: ["hn-sg", "hn-iam", "hn-rds"], shieldOn: "hn-sg" },
  {
    status: "RE-VALIDATED ✓",
    color: "#10B981",
    activeNodes: [...ALL_NODE_IDS],
    activeEdges: [...ALL_EDGE_IDS],
  },
  {
    status: "CERTIFIED ✓",
    color: "#F59E0B",
    activeNodes: [...ALL_NODE_IDS],
    activeEdges: [...ALL_EDGE_IDS],
    shieldOn: "hn-rds",
  },
];

const SCAN_LINES = [
  "→ Connecting to AWS eu-central-1 · read-only IAM",
  "→ 847 assets mapped · 12,847 edges · 1,000+ patterns loaded",
  "→ 14 candidate paths · L2 live API validation running",
  "→ XseeCyber · human + AI attacker simulation · detection gaps mapped",
  "→ 1 SG rule change eliminates 6 attack vectors · Terraform ready",
  "→ Fix applied · L2 validation re-running on affected paths",
  "→ Evidence package sealed · before/after cryptographic proof · audit-ready",
];

const NODES: { id: string; cx: number; cy: number; label: string; sublabel: string; crown?: boolean }[] = [
  { id: "hn-internet", cx: 65, cy: 120, label: "Internet", sublabel: "ENTRY POINT" },
  { id: "hn-lb", cx: 160, cy: 200, label: "Load Balancer", sublabel: "AWS ALB" },
  { id: "hn-ec2", cx: 270, cy: 255, label: "EC2 Instance", sublabel: "COMPUTE" },
  { id: "hn-sg", cx: 370, cy: 300, label: "Security Group", sublabel: "NETWORK" },
  { id: "hn-iam", cx: 450, cy: 330, label: "IAM Role", sublabel: "IDENTITY" },
  { id: "hn-rds", cx: 510, cy: 370, label: "RDS / Crown Jewel", sublabel: "CROWN JEWEL", crown: true },
];

const EDGES: { id: string; x1: number; y1: number; x2: number; y2: number }[] = [
  { id: "he-inet-lb", x1: 65, y1: 120, x2: 160, y2: 200 },
  { id: "he-lb-ec2", x1: 160, y1: 200, x2: 270, y2: 255 },
  { id: "he-ec2-sg", x1: 270, y1: 255, x2: 370, y2: 300 },
  { id: "he-sg-iam", x1: 370, y1: 300, x2: 450, y2: 330 },
  { id: "he-iam-rds", x1: 450, y1: 330, x2: 510, y2: 370 },
];

function NodeIcon({ nodeId, color }: { nodeId: string; color: string }) {
  const c = color;
  const scale = 0.8;
  switch (nodeId) {
    case "hn-internet":
      return (
        <g transform={`scale(${scale})`} stroke={c} fill="none" strokeWidth={1.5}>
          <circle r={10} />
          <ellipse rx={4} ry={10} />
          <line x1={-10} y1={0} x2={10} y2={0} />
          <line x1={0} y1={-10} x2={0} y2={10} />
        </g>
      );
    case "hn-lb":
      return (
        <g transform={`scale(${scale})`} stroke={c} fill={c} strokeWidth={1.5}>
          <rect x={-3} y={-10} width={6} height={5} rx={1} />
          <rect x={-10} y={5} width={6} height={5} rx={1} />
          <rect x={4} y={5} width={6} height={5} rx={1} />
          <line x1={0} y1={-5} x2={-7} y2={5} />
          <line x1={0} y1={-5} x2={7} y2={5} />
        </g>
      );
    case "hn-ec2":
      return (
        <g transform={`scale(${scale})`} stroke={c} fill="none" strokeWidth={1.5}>
          <rect x={-9} y={-10} width={18} height={7} rx={1.5} />
          <rect x={-9} y={1} width={18} height={7} rx={1.5} />
          <circle cx={6} cy={-6.5} r={1.5} fill={c} />
          <circle cx={6} cy={4.5} r={1.5} fill={c} />
        </g>
      );
    case "hn-sg":
      return (
        <g transform={`scale(${scale})`} stroke={c} fill="none" strokeWidth={1.5}>
          <path d="M 0 -10 L -8 -6 L -8 2 C -8 7 -4 10 0 11 C 4 10 8 7 8 2 L 8 -6 Z" />
          <polyline points="-3,0 -1,3 4,-3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "hn-iam":
      return (
        <g transform={`scale(${scale})`} stroke={c} fill="none" strokeWidth={1.5}>
          <circle cx={-3} cy={-2} r={5} />
          <line x1={2} y1={-2} x2={10} y2={-2} />
          <line x1={7} y1={-2} x2={7} y2={2} />
          <line x1={10} y1={-2} x2={10} y2={2} />
        </g>
      );
    case "hn-rds":
      return (
        <g transform={`scale(${scale})`} stroke={c} fill="none" strokeWidth={1.5}>
          <ellipse cx={0} cy={-6} rx={7} ry={2.5} />
          <line x1={-7} y1={-6} x2={-7} y2={5} />
          <line x1={7} y1={-6} x2={7} y2={5} />
          <ellipse cx={0} cy={5} rx={7} ry={2.5} />
          <path d="M -5 -9 L -3 -7 L 0 -11 L 3 -7 L 5 -9" stroke="#F59E0B" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    default:
      return null;
  }
}

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
            setCurrentStep((prev) => (prev + 1) % 7);
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
            From &quot;we might have a problem&quot;
            <br />
            to &quot;here's the proof and here's the fix&quot; in 30 minutes.
          </h2>
          <p>
            Seven steps. No agents. No disruption. Just the truth about your cloud.
          </p>
          <div className="section-rule" />
        </div>
      </div>

      <div className="how-grid">
        <div className="hiw-steps">
          <div className="steps reveal-left reveal-on-scroll">
            {STEPS.map((step, i) => {
              const StepIcon = step.Icon;
              return (
                <div
                  key={step.n}
                  className={`step ${currentStep === i ? "active" : ""} ${step.certify ? "step-certify" : ""}`}
                  data-step={i}
                  onClick={() => goToStep(i)}
                  onKeyDown={(e) => e.key === "Enter" && goToStep(i)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="step-n">{step.n}</div>
                  <div className="step-content">
                    <h3 className={StepIcon ? "step-title-row" : undefined}>
                      {StepIcon ? <StepIcon size={18} strokeWidth={2} aria-hidden /> : null}
                      {step.title}
                    </h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hiw-graph-wrap reveal-right reveal-on-scroll">
          <div className="hiw-graph-card">
            <div className="hiw-chrome">
              <div className="hiw-chrome-dots">
                <div className="hiw-chrome-dot" style={{ background: "#EF4444" }} />
                <div className="hiw-chrome-dot" style={{ background: "#F59E0B" }} />
                <div className="hiw-chrome-dot" style={{ background: "#D4006E" }} />
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
                  const circleFill = dim ? "#1E293B" : active ? `${config.color}33` : "#1E293B";
                  const circleStroke = dim ? "#334155" : active ? config.color : "#334155";
                  const iconColor = dim ? "#64748B" : active ? config.color : "#64748B";
                  const opacity = dim ? 0.5 : 1;
                  const pulse = currentStep === 3 && node.id === "hn-rds";

                  return (
                    <g key={node.id} className={`hiw-node ${pulse ? "pulse" : ""}`} style={{ opacity }}>
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={24}
                        fill={circleFill}
                        stroke={circleStroke}
                        strokeWidth={active ? 2.5 : 1}
                        className={active ? "active" : ""}
                        style={active ? { filter: `drop-shadow(0 0 8px ${config.color})` } : undefined}
                      />
                      <g transform={`translate(${node.cx}, ${node.cy})`} style={{ color: iconColor }}>
                        <NodeIcon nodeId={node.id} color={iconColor} />
                      </g>
                      {showShield && (
                        <g transform={`translate(${node.cx - 14}, ${node.cy - 14})`}>
                          <path
                            d="M14 2L4 6v8c0 5.2 4.2 9.8 10 11.5 5.8-1.7 10-6.3 10-11.5V6L14 2z"
                            fill="rgba(255, 27, 141,0.2)"
                            stroke="#D4006E"
                            strokeWidth={1.5}
                            strokeLinejoin="round"
                          />
                          <text x={14} y={14} textAnchor="middle" fill="#D4006E" fontSize={10} fontWeight="bold">
                            ✓
                          </text>
                        </g>
                      )}
                      <text
                        x={node.cx}
                        y={node.cy + 42}
                        textAnchor="middle"
                        fill={dim ? "#64748B" : active ? config.color : "#64748B"}
                        fontSize={9}
                        fontFamily="var(--font-mono)"
                        letterSpacing="0.06em"
                      >
                        {node.sublabel}
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
