"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";

const BRAND = "var(--color-primary)";

const EVIDENCE = [
  { call: "sts:AssumeRole", status: "success", ts: "2026-05-15T17:42:11.213Z", hash: "a3f2c8" },
  { call: "iam:GetRolePolicy", status: "success", ts: "2026-05-15T17:42:13.408Z", hash: "7b1e44" },
  { call: "ec2:DescribeInstances", status: "success", ts: "2026-05-15T17:42:14.762Z", hash: "d09c11" },
  { call: "rds:DescribeDBInstances", status: "success", ts: "2026-05-15T17:42:16.094Z", hash: "5e8a02" },
] as const;

const TABS = ["Overview", "Engineering", "Evidence", "Audit"] as const;

type GNode = { x: number; y: number; kind: string; label: string; id: string; target?: boolean };

const NODE_W = 150;
const NODE_H = 66;

function GraphCard({ n }: { n: GNode }) {
  const cardFill = n.target ? "#1A0E1A" : "#0F1320";
  const cardStroke = n.target ? "rgba(255,27,141,0.55)" : "var(--hp-line)";
  return (
    <g>
      {n.target && (
        <rect
          x={n.x - 8}
          y={n.y - 8}
          width={NODE_W + 16}
          height={NODE_H + 16}
          rx={16}
          fill="none"
          stroke="rgba(255,27,141,0.18)"
        />
      )}
      <rect
        x={n.x}
        y={n.y}
        width={NODE_W}
        height={NODE_H}
        rx={10}
        fill={cardFill}
        stroke={cardStroke}
        strokeWidth={1}
        filter={n.target ? "url(#proofTargetShadow)" : "url(#proofNodeShadow)"}
      />
      <text
        x={n.x + 14}
        y={n.y + 20}
        fill="var(--hp-ink3)"
        fontFamily="var(--font-geist-mono), Geist Mono, monospace"
        fontSize={9.5}
        letterSpacing={1}
      >
        {n.kind}
      </text>
      <text x={n.x + 14} y={n.y + 38} fill="var(--hp-ink)" fontSize={13} fontWeight={500}>
        {n.label}
      </text>
      <text
        x={n.x + 14}
        y={n.y + 54}
        fill="var(--hp-ink3)"
        fontFamily="var(--font-geist-mono), Geist Mono, monospace"
        fontSize={10.5}
      >
        {n.id}
      </text>
      <circle cx={n.x + NODE_W - 9} cy={n.y + 11} r={3} fill="#FF1B8D" />
      <circle cx={n.x + NODE_W - 9} cy={n.y + 11} r={6.5} fill="none" stroke="rgba(255,27,141,0.25)" />
    </g>
  );
}

function AttackGraph() {
  // Funnel layout: a top row of four hops draining diagonally into the
  // production database, which sits centered at the bottom as the focal point.
  const nodes: GNode[] = [
    { x: 8, y: 40, kind: "INTERNET", label: "Internet", id: "0.0.0.0/0" },
    { x: 196, y: 40, kind: "ALB", label: "Public ALB", id: "alb-prod-edge" },
    { x: 384, y: 40, kind: "EC2", label: "EC2 Instance", id: "i-0a3f2c8d" },
    { x: 572, y: 40, kind: "IAM ROLE", label: "svc-app-prod", id: "role/svc-app" },
    { x: 305, y: 232, kind: "RDS", label: "prod-postgres", id: "prod-postgres-01", target: true },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
  ];
  const cx = (n: GNode) => n.x + NODE_W / 2;

  return (
    <div className="hp-dotgrid w-full">
      <svg viewBox="0 0 730 330" className="w-full h-auto" aria-hidden>
        <defs>
          <marker
            id="gh-arrow-pink"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="#FF1B8D" />
          </marker>
          <filter id="proofNodeShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#04060C" floodOpacity="0.5" />
          </filter>
          <filter id="proofTargetShadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="6" stdDeviation="14" floodColor="#FF1B8D" floodOpacity="0.3" />
          </filter>
        </defs>

        {edges.map(([a, b], i) => {
          const A = nodes[a];
          const B = nodes[b];
          if (B.target) {
            // Diagonal drop from IAM's bottom edge into the RDS top edge.
            const x1 = cx(A);
            const y1 = A.y + NODE_H;
            const x2 = cx(B);
            const y2 = B.y;
            const d = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2 - 6}`;
            return (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={BRAND}
                strokeWidth={1.4}
                strokeOpacity={0.85}
                markerEnd="url(#gh-arrow-pink)"
              />
            );
          }
          // Straight horizontal hop along the top row.
          const y = A.y + NODE_H / 2;
          const d = `M ${A.x + NODE_W} ${y} L ${B.x - 6} ${y}`;
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={BRAND}
              strokeWidth={1.4}
              strokeOpacity={0.85}
              markerEnd="url(#gh-arrow-pink)"
            />
          );
        })}

        {nodes.map((n) => (
          <GraphCard key={n.id} n={n} />
        ))}
      </svg>
    </div>
  );
}

function ReceiptPanel() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Evidence");

  return (
    <div className="flex flex-col">
      <div className="px-5 py-4 border-b border-[var(--hp-line)]">
        <p className="hp-eyebrow text-[var(--hp-ink3)] mb-1.5">Receipt · Path 0042</p>
        <p className="text-[15px] font-medium text-[var(--hp-ink)] leading-tight">
          Internet <span className="text-[var(--hp-ink3)]">→</span> prod-postgres-db
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="hp-pink-dot" />
          <span className="text-[12px] text-[var(--hp-ink)]">
            <span className="text-[var(--hp-brand)] font-medium">Critical</span>
            <span className="text-[var(--hp-ink3)]"> · </span>
            92% exploit confidence
          </span>
        </div>
      </div>
      <div className="px-5 pt-3 border-b border-[var(--hp-line)]">
        <div className="flex items-center gap-5" role="tablist">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`pb-3 text-[12.5px] transition-colors border-b-2 -mb-px ${
                tab === t ? "text-[var(--hp-ink)] border-[var(--hp-brand)]" : "text-[var(--hp-ink3)] border-transparent hover:text-[var(--hp-ink2)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-5 overflow-auto">
        {tab === "Evidence" && (
          <>
            <p className="hp-eyebrow text-[var(--hp-ink3)] mb-3">Live AWS API calls · per hop</p>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {EVIDENCE.map((e, i) => (
                <li key={e.call} className="hp-mono text-[11.5px] leading-[1.5]">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-[var(--hp-ink3)] w-3 text-right">{i + 1}</span>
                    <span className="text-[var(--hp-ink)]">{e.call}</span>
                    <span className="text-[var(--hp-ok)] shrink-0 inline-flex items-center gap-1">
                      <span className="hp-green-dot" style={{ boxShadow: "none" }} />
                      {e.status}
                    </span>
                  </div>
                  <div className="pl-5 text-[var(--hp-ink3)]">
                    {e.ts} <span className="text-[var(--hp-ink4)] mx-1">·</span> sig …{e.hash}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-[var(--hp-line)] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--hp-ok)] mt-0.5 shrink-0" aria-hidden />
              <p className="text-[12px] text-[var(--hp-ink2)] leading-[1.5] m-0">
                <span className="text-[var(--hp-ink)]">Signed by XSEE</span>
                <span className="text-[var(--hp-ink4)] mx-1.5">·</span>
                Verifiable
                <span className="text-[var(--hp-ink4)] mx-1.5">·</span>
                30-day retention
              </p>
            </div>
          </>
        )}
        {tab === "Audit" && (
          <div className="space-y-3 hp-mono text-[11.5px] text-[var(--hp-ink2)] leading-[1.6]">
            <div>
              <span className="text-[var(--hp-ink3)]">17:51:14Z</span> customer Lambda applied fix
            </div>
            <div>
              <span className="text-[var(--hp-ink3)]">17:51:31Z</span> re-simulation{" "}
              <span className="text-[var(--hp-ok)]">failed at hop 3 (denied)</span>
            </div>
            <div className="pt-3 border-t border-[var(--hp-line)]">
              <span className="text-[var(--hp-ok)]">certificate issued</span> · cert/0042-a3f2c8
            </div>
          </div>
        )}
        {tab === "Overview" && (
          <div className="space-y-4">
            <div>
              <p className="hp-eyebrow text-[var(--hp-ink3)] mb-1">Data at risk</p>
              <p className="hp-mono text-[18px] text-[var(--hp-ink)]">
                47.2 TB <span className="text-[var(--hp-ink3)] text-[12px]">· 12.4M records</span>
              </p>
            </div>
          </div>
        )}
        {tab === "Engineering" && (
          <pre className="hp-mono text-[11.5px] leading-[1.6] bg-[var(--hp-overlay)] rounded-lg p-3 border border-[var(--hp-line)] text-[var(--hp-ink2)] overflow-x-auto m-0">
            {`+ cidr_blocks = ["10.0.0.0/8"]\n- cidr_blocks = ["0.0.0.0/0"]\n  ~ sg-bastion · ingress :5432`}
          </pre>
        )}
      </div>
    </div>
  );
}

export default function ProofSection() {
  return (
    <section id="proof" className="hp-section" aria-labelledby="proof-title">
      <div className="hp-container">
        <p className="hp-eyebrow hp-kicker mb-5">Live on your account · 30 minutes</p>
        <h2
          id="proof-title"
          className="hp-h-display hp-h-display--wide"
          style={{ fontSize: "clamp(34px, 4.4vw, 56px)" }}
        >
          <span className="block">This is what XSEE finds</span>
          <span className="block text-[var(--hp-ink3)]">in your AWS environment.</span>
        </h2>
        <p className="mt-8 text-[16px] leading-[1.6] text-[var(--hp-ink2)] max-w-[620px]">
          Connect a read-only IAM role. XSEE builds the attack graph, validates each hop against the live AWS API, and
          writes a signed Receipt for every path that reaches production data.
        </p>
        <div className="mt-16 hp-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--hp-line)] bg-[var(--hp-base)]/40">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--hp-line2)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--hp-line2)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--hp-line2)]" />
              </div>
              <div className="hp-mono text-[11px] text-[var(--hp-ink3)]">
                app.xsee.io <span className="text-[var(--hp-ink4)] mx-1">/</span> attack-intelligence
              </div>
            </div>
            <div className="flex items-center gap-3 hp-mono text-[11px] text-[var(--hp-ink3)]">
              <span className="hp-green-dot" />
              <span>monitoring · 2m ago</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:items-stretch">
            <div className="flex flex-col lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[var(--hp-line)]">
              <div className="px-5 py-3 border-b border-[var(--hp-line)] flex items-center justify-between">
                <p className="hp-eyebrow text-[var(--hp-ink3)]">Attack graph · prod-eu-west-1</p>
                <div className="flex items-center gap-2 hp-mono text-[11px] text-[var(--hp-ink3)]">
                  <span className="hp-pink-dot" />3 critical paths
                </div>
              </div>
              <div className="flex flex-1 items-center p-4 lg:p-6">
                <AttackGraph />
              </div>
            </div>
            <div className="lg:col-span-2 bg-[var(--hp-elevated)]/40">
              <ReceiptPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
