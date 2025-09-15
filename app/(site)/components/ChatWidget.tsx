"use client";

import { useState } from "react";
import { ChatWindow } from "./ChatWindow";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-lg hover:bg-white/90"
        aria-label="Open Stipes bot"
      >
        Ask a Stipes bot!
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[92vw]">
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-3 py-2">
          <div className="text-sm font-medium">Ask a Stipes bot!</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(false)}
              className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-300 hover:border-zinc-700 hover:text-white"
              aria-label="Minimize chat"
            >
              Minimize
            </button>
          </div>
        </div>
        <ChatWindow />
      </div>
    </div>
  );
}
