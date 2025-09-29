"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Role = "user" | "assistant" | "error";
type Message = {
  id: string;
  role: Role;
  content: string;
};

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro-1",
      role: "assistant",
      content:
        "Hey, YO! I am Chris Stipes' resume assistant, ask me anything about him, his work experience, or this site.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages.length]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    setMessages((m) => [...m, { id: id + "-u", role: "user", content: prompt }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ message: prompt }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      // Try JSON first; gracefully fall back to text
      let replyText = "";
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        // Common shapes: { reply }, { response }, { message }, { text }, { output }
        // OpenAI-like: { choices: [{ message: { content } }] } or { message: { content } }
        const fromChoices =
          (data?.choices?.[0]?.message?.content as string | undefined) ??
          (data?.message?.content as string | undefined);
        replyText =
          fromChoices ??
          (data?.answer as string) ??
          (data?.reply as string) ??
          (data?.response as string) ??
          (data?.message as string) ??
          (data?.text as string) ??
          (data?.output as string) ??
          JSON.stringify(data);
      } else {
        replyText = await res.text();
      }

      const safeText = replyText && replyText.trim().length > 0 ? replyText : "(no content)";
      setMessages((m) => [...m, { id: id + "-a", role: "assistant", content: safeText }]);
    } catch (err: any) {
      setMessages((m) => [
        ...m,
        { id: id + "-e", role: "error", content: err?.message || "Request failed" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-0 overflow-hidden">
      <div
        ref={listRef}
        className="h-[440px] overflow-y-auto p-4 space-y-3 bg-black/40"
      >
        {messages.length === 0 ? (
          <div className="text-sm text-zinc-500">Start a conversation below.</div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={
                m.role === "user"
                  ? "ml-auto max-w-[85%] rounded-lg bg-zinc-800 px-3 py-2 text-sm"
                  : m.role === "assistant"
                  ? "mr-auto max-w-[85%] rounded-lg bg-zinc-900 px-3 py-2 text-sm"
                  : "mr-auto max-w-[85%] rounded-lg bg-red-900/50 px-3 py-2 text-sm text-red-100"
              }
            >
              {m.content}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="border-t border-zinc-800 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-zinc-600"
          />
          <button
            type="submit"
            disabled={!canSend}
            className="rounded-md bg-white/90 px-4 py-2 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white"
          >
            {loading ? "Sending…" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
