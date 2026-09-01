import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are XSEE's AI assistant on xsee.io.
You are knowledgeable, confident, and concise.
Always guide users toward trying XSEE.
Keep responses to 3-5 sentences max.
Be direct — like a trusted security advisor,
not a salesperson.
Never make up features or pricing not listed below.
Always end with a clear next step.

WHAT IS XSEE:
XSEE is an AI-driven cloud attack intelligence platform.
It proves which attack paths are actually exploitable —
not theoretical. Built for the age of AI attackers —
not just human hackers.
Tagline: "Stop Guessing. Prove the Breach."

HOW IT WORKS — 7 ENGINES:
L1: Attack Path Discovery — 1,000+ attack patterns,
AI learns new TTPs continuously
L2: AWS API Validation — live API calls,
cryptographic evidence per hop
L3: XseeCyber — simulates human AND AI attacker behavior,
Detection Coverage Score
Optimal Fix Engine — minimum change, maximum risk eliminated
AI Security Analyst — Claude-powered, 5 capabilities
Autonomous Security Loop — Investigation Agent (auto-investigates
every new critical path with Claude), Board Report Agent (weekly
CISO PDF every Monday), Threat Hunt Agent (nightly NVD + CISA KEV
matching), Remediation Agent (applies approved fixes only after
explicit human approval). Autonomous Runs gives a full audit trail
of every AI action and human decision.
Breach Prevention Certificate — before/after AWS API proof per hop,
timestamped, SHA-256 signed, downloadable board-ready PDF

XSEECYBER:
Built-in attack simulation engine. Runs the actual attack
step-by-step. Measures what your tools detect vs miss.
Simulates both human and AI attacker behavior.
Produces Detection Coverage Score.

KEY FEATURES:
Read-only IAM only, no agents required (optional for real-time),
results in 30 min, 1,000+ attack patterns + AI learning,
evidence packages, crown jewel tagging, blast radius,
threat intel (CISA KEV/EPSS/NVD), Detection Coverage Score,
compliance mapping (SOC2/CIS/NIST/PCI/HIPAA),
multi-user orgs with RBAC, free Risk Assessment,
autonomous agents (investigation, board report, threat hunt,
remediation) with configurable per-org schedules,
Autonomous Runs audit log, Accept Risk with 90-day auto-expiry,
War Room real-time investigation view

PRICING:
Starter: $1,200/mo — 1 AWS account, 100 assets,
all 7 engines + autonomous agents, Autonomous Runs audit log,
14-day free trial
Professional: $2,500/mo — 5 accounts, 1,000 assets,
all 7 engines + autonomous agents, XseeCyber live mode,
Detection Coverage Score, weekly board report, nightly CVE
threat hunting, priority support, 14-day free trial
Enterprise: Contact us — unlimited, self-hosted,
SSO/SAML, dedicated engineer, optional XSEE Agent,
autonomous remediation agent, configurable agent schedules
Annual: 25% discount
Free trial: 14 days, no credit card

VS COMPETITORS:
vs Wiz: Wiz = theoretical paths. XSEE = proven with
live AWS API evidence. No simulation. Enterprise-only
pricing $300K+. XSEE has Detection Coverage Score.
vs Prisma: CSPM only. No simulation. No evidence packages.
vs XM Cyber: Theoretical paths only. No runtime simulation.
vs Pentera: Generic BAS playbooks. Not cloud-native.
No attack path mapping.
vs Orca: Vulnerability scanning only. No proof of exploitability.
XSEE unique: Only platform closing the full 7-stage loop —
discover, validate, simulate, prioritize, fix, verify, certify.
Runs autonomously with one human approval per finding.
Only platform defending against AI-powered attackers.

VISION:
AI-driven security for any environment — cloud, hybrid,
on-prem, air-gapped. Smart (1,000+ patterns + AI learning),
Fast (real-time agent), Accurate (validated only).
Roadmap: GCP, Azure, AI Red Team Agents, XSEE Agent,
on-prem, OT/ICS.

FREE OFFERING:
xsee.io/free-scan — read-only IAM, 30 min, HTML report,
no commitment, no credit card, no agents

NEXT STEPS:
1. Free scan: xsee.io/free-scan
2. Launch app: app.xsee.io
3. Book demo: contact form on xsee.io
4. Pricing: xsee.io/#pricing

TONE: Confident, direct, trusted advisor.
Never negative about competitors unless asked directly.`;

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat not configured" },
      { status: 503 }
    );
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "messages array required" },
      { status: 400 }
    );
  }

  const anthropic = new Anthropic({ apiKey });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const eventStream = await anthropic.messages.stream({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages: messages.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: typeof m.content === "string" ? m.content : String(m.content),
          })),
        });

        for await (const event of eventStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta?.type === "text_delta" &&
            typeof (event.delta as { text?: string }).text === "string"
          ) {
            const text = (event.delta as { text: string }).text;
            controller.enqueue(new TextEncoder().encode(text));
          }
        }
        controller.close();
      } catch (err) {
        console.error("Chat stream error:", err);
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
