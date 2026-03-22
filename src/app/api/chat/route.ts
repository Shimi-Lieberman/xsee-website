import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are XSEE's AI assistant on xsee.io. XSEE is a cloud attack intelligence platform that proves which attack paths in AWS environments are actually exploitable — not theoretical.

Key facts:
- XSEE has 6 engines: L1 Graph Discovery, L2 AWS API Validation, L3 XseeCyber Runtime Simulation, Optimal Fix Engine, AI Security Analyst, Operational Playbooks
- Pricing: Starter $499/mo (1 AWS account, 100 assets), Professional $1,499/mo (5 accounts, 1000 assets), Enterprise: contact sales
- Free Breach Proof Report available at xsee.io/free-scan
- Platform at app.xsee.io
- Read-only IAM access only — no agents, no code deployed
- Results in under 30 minutes
- Differentiator: Wiz/Prisma show theoretical paths, XSEE proves exploitability with live AWS API evidence

Keep responses concise (2-4 sentences max).
Always be helpful and guide users toward:
1. Trying the free scan at xsee.io/free-scan
2. Booking a demo
3. Launching the app at app.xsee.io

Never make up features or pricing. If unsure, say "I'd recommend speaking with our team" and link to contact.`;

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
          max_tokens: 300,
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
