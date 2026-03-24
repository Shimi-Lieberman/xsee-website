"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import Image from "next/image";

const OPENING_MESSAGE =
  "Hi! I'm XSEE's AI assistant. I can help you understand how XSEE proves which attack paths in your cloud are actually exploitable. What would you like to know?";

type Message = { role: "user" | "assistant"; content: string };

function TypingIndicator() {
  return (
    <div className="chat-msg chat-msg-assistant" style={{ alignItems: "flex-start" }}>
      <div className="chat-typing">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingContent, setStreamingContent] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: OPENING_MESSAGE }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, streamingContent]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  async function handleSend(e?: React.FormEvent, textOverride?: string) {
    e?.preventDefault();
    const text = (textOverride ?? input.trim()).trim();
    if (!text || isLoading) return;

    setInput("");
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setStreamingContent("");

    const historyWithNew: Message[] = [...messages, userMsg];
    const apiMessages = historyWithNew
      .filter((m) => !(m.role === "assistant" && m.content === OPENING_MESSAGE))
      .map((m) => ({ role: m.role, content: m.content }));

    let fullContent = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      if (!res.ok || !res.body) {
        throw new Error("Request failed");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;
        setStreamingContent(fullContent);
      }
      setMessages((prev) => [...prev, { role: "assistant", content: fullContent }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't get a response. Please try again or reach out at contact@xsee.io.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setStreamingContent("");
    }
  }

  const displayMessages = messages.length === 0 && open
    ? [{ role: "assistant" as const, content: OPENING_MESSAGE }]
    : messages;

  const QUICK_REPLIES = [
    "How does validation work?",
    "How is XSEE different from Wiz?",
    "Get a free risk assessment",
  ];

  return (
    <>
      <button
        type="button"
        aria-label="Open chat"
        onClick={() => setOpen(true)}
        className="chat-fab"
        style={{ display: open ? "none" : "flex" }}
      >
        <MessageCircle size={24} strokeWidth={2} />
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="XSEE AI assistant">
          <div className="chat-header">
            <div className="chat-header-brand">
              <Image
                src="/logo-symbol-only.svg"
                alt=""
                width={28}
                height={28}
                className="chat-logo"
              />
              <span className="chat-header-title">Ask XSEE anything</span>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="chat-close"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div className="chat-messages" ref={scrollRef}>
            {displayMessages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "user"
                    ? "chat-msg chat-msg-user"
                    : msg.content === OPENING_MESSAGE
                      ? "chat-msg chat-msg-assistant chat-msg-has-chips"
                      : "chat-msg chat-msg-assistant"
                }
              >
                <div className="chat-bubble">{msg.content}</div>
                {msg.role === "assistant" &&
                  msg.content === OPENING_MESSAGE && (
                    <div className="chat-chips">
                      {QUICK_REPLIES.map((label) => (
                        <button
                          key={label}
                          type="button"
                          className="chat-chip"
                          onClick={() => handleSend(undefined, label)}
                          disabled={isLoading}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}
            {streamingContent ? (
              <div className="chat-msg chat-msg-assistant">
                <div className="chat-bubble">{streamingContent}</div>
              </div>
            ) : null}
            {isLoading && !streamingContent && <TypingIndicator />}
          </div>

          <form onSubmit={handleSend} className="chat-input-wrap">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about XSEE..."
              rows={1}
              disabled={isLoading}
              className="chat-input"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="chat-send"
              aria-label="Send message"
            >
              <Send size={18} strokeWidth={2} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
