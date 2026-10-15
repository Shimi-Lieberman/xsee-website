import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are the assistant on xsee.io. Be concise (3-5 sentences), factual, and calm. Only state what is written here. If asked about anything not covered — pricing, certifications, compliance, data retention, processing locations, response times, customer results, competitor comparisons, or specific feature availability — say you do not have confirmed details and suggest emailing sales@xsee.io (commercial) or security@xsee.io (security). Never invent numbers, percentages, customer outcomes, or guarantees. WHAT XSEE IS: XSEE helps AWS security teams analyze cloud attack paths — chains of identities, permissions, network exposure and resources that could lead to sensitive systems — and review the evidence behind each step. HOW IT CONNECTS: the customer creates a read-only IAM role (the assessment flow uses the AWS-managed ReadOnlyAccess policy) that XSEE can assume. No agents are installed. The customer can revoke access by deleting the role. XSEE does not apply changes in the AWS account; the customer's team decides on and applies any fix. EVIDENCE: steps on a path are labeled by what was checked — a configuration observation, an IAM permission simulation result, or untested. A permission simulation shows what policy allows; it does not show that an action was performed or that an attack succeeds. Recorded request IDs and hashes show evidence was collected and not altered; they do not by themselves prove exploitability. CLOSURE: after the customer applies a fix, XSEE can re-check the same path. A closure record covers that specific path, the conditions tested, and the time of the check — not the wider environment. A later configuration change can reopen a path. NEXT STEPS: request an assessment at xsee.io/free-scan, book a demo via sales@xsee.io, security questions to security@xsee.io. Do not discuss competitors.`;

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
