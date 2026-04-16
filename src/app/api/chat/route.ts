import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat-system-prompt";

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
          system: CHAT_SYSTEM_PROMPT,
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
