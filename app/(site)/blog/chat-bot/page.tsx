"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ChatBotPost() {

  return (
    <article className="prose prose-invert mx-auto max-w-3xl prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-code:text-neutral-100">
      <div className="not-prose mt-6">
        <Link href="/" className="badge hover:border-zinc-600">← Back home</Link>
      </div>
      <header className="mb-8 mt-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">From Backend to Frontend: Building a Minimal Chat Bot with Go, Next.js, and Tailwind</h1>
        <p className="text-neutral-300">A clean, production-lean walkthrough of a tiny Go service that wraps OpenAI’s Responses API and a dark, polished Next.js starter with a built-in chat widget.</p>
      </header>

      <section className="not-prose mb-10 rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 shadow-lg">
        <h2 className="text-xl font-semibold">TL;DR</h2>
        <ul className="mt-3 list-disc pl-6 text-neutral-200">
          <li>Single <code>/chat</code> endpoint backed by OpenAI Responses API.</li>
          <li>Embeds a few Markdown files into the binary and sends them as context.</li>
          <li>Ships as a single Go binary or as a Vercel serverless function.</li>
          <li>Next.js + Tailwind frontend with a small chat widget wired to the backend.</li>
        </ul>
      </section>

      <section>
        <h2>Architecture</h2>
        <p>The backend is intentionally minimal: a Go HTTP server with three handlers and an OpenAI client, plus an optional Vercel function that reuses the same logic. The frontend is a dark, typography-forward Next.js starter that includes a tiny chat widget.</p>
        {(() => {
          const [imgOk, setImgOk] = useState(true);
          return (
            <div className="not-prose my-6">
              {imgOk ? (
                <img
                  src="/architecture.png"
                  alt="Architecture diagram"
                  className="w-full rounded-xl border border-neutral-800 shadow-soft"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-neutral-300">
                  <p className="font-medium">architecture.png not found</p>
                  <p className="mt-1 text-sm">Place an image named <code>architecture.png</code> in the <code>public/</code> folder to display the architecture diagram here.</p>
                </div>
              )}
            </div>
          );
        })()}
        <div className="rounded-xl bg-neutral-900 p-4 text-sm">
          <p className="mb-2 font-semibold">Request/Response Example</p>
          <div className="grid gap-3 md:grid-cols-2">
            <pre className="overflow-x-auto rounded-lg bg-neutral-950 p-3"><code className="language-json">{`POST /chat
Content-Type: application/json

{ "message": "Write a short bio of Chris" }`}</code></pre>
            <pre className="overflow-x-auto rounded-lg bg-neutral-950 p-3"><code className="language-json">{`HTTP/1.1 200 OK
Content-Type: application/json

{ "output": "...model reply..." }`}</code></pre>
          </div>
        </div>
      </section>

      <section>
        <h2>The Backend: Minimal Go Service</h2>
        <ol className="list-decimal pl-6">
          <li><strong>Client request</strong> — POST JSON to <code>/chat</code>.</li>
          <li><strong>Validation &amp; context</strong> — Parse JSON, build compact context from embedded Markdown, skipping binaries and truncating very long files.</li>
          <li><strong>OpenAI call</strong> — Use a thin wrapper around the official Go SDK to call the Responses API with three message blocks: system style, embedded context, and the user message (kept concise).</li>
          <li><strong>Return output</strong> — Extract <code>OutputText()</code> and return <code>{`{ "output": "..." }`}</code>.</li>
          <li><strong>Errors</strong> — Map to clean HTTP codes: <code>400</code> invalid JSON, <code>405</code> wrong method, <code>502</code> downstream OpenAI errors.</li>
        </ol>

        <h3 className="mt-6">Key Components</h3>
        <ul className="list-disc pl-6">
          <li><code>cmd/server/main.go</code> — Wires routes, loads env, starts the server.</li>
          <li><code>internal/handlers</code> — Small handlers for <code>/healthz</code>, <code>/files</code>, <code>/chat</code>.</li>
          <li><code>pkg/embedded</code> — Embeds Markdown assets and returns a map for handlers.</li>
          <li><code>pkg/openai</code> — Thin wrapper around the official <code>openai-go</code> SDK.</li>
          <li><code>api/chat.go</code> — Vercel serverless entrypoint reusing the same packages.</li>
        </ul>

        <h3 className="mt-6">Configuration</h3>
        <ul className="list-disc pl-6">
          <li><code>OPENAI_API_KEY</code> (required)</li>
          <li><code>OPENAI_MODEL</code> (optional, default <code>gpt-4o-mini</code>)</li>
          <li><code>ADDR</code> (optional, default <code>:8080</code> or <code>PORT</code> from platform)</li>
        </ul>

        <h3 className="mt-6">Local Dev &amp; Tests</h3>
        <pre className="rounded-xl bg-neutral-900 p-4 text-sm overflow-x-auto"><code className="language-bash">{`# run
go run ./cmd/server

# health
curl localhost:8080/healthz

# chat example
curl -s -X POST localhost:8080/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"Write a short bio of Chris"}' | jq

# tests
go test ./...`}</code></pre>
      </section>

      <section>
        <h2>The Frontend: Resume Site Starter (Next.js + Tailwind)</h2>
        <p>A minimalist, performance‑oriented portfolio starter—dark UI, crisp typography, subtle glassy cards, and metric tiles. It’s inspired by the aesthetic of pahlani.com (not a clone) and ships with a chat widget wired to the upstream service.</p>

        <h3>Quickstart</h3>
        <pre className="rounded-xl bg-neutral-900 p-4 text-sm overflow-x-auto"><code className="language-bash">{`npm install
npm run dev
# open http://localhost:3000`}</code></pre>

        <h3>Customize</h3>
        <ul className="list-disc pl-6">
          <li>Edit copy in <code>app/(site)/components/*</code>.</li>
          <li>Tweak colors/blur/shadows in <code>tailwind.config.ts</code> and <code>app/globals.css</code>.</li>
          <li>Replace the square avatar in <code>Hero</code> with your image in <code>/public</code>.</li>
        </ul>

        <h3>Notes</h3>
        <ul className="list-disc pl-6">
          <li>Built with Next.js App Router + Tailwind CSS.</li>
          <li>Keeps the feel (dark, crisp, card UI, stats tiles) without copying proprietary content.</li>
        </ul>
      </section>

      <section>
        <h2>Chatbot Overview (Web)</h2>
        <ul className="list-disc pl-6">
          <li><strong>What</strong>: A lightweight chat widget posting your prompt to an internal API route that forwards to an upstream service calling OpenAI.</li>
          <li><strong>UI</strong>: <code>app/(site)/components/ChatWidget.tsx</code> (launcher/minimize) and <code>ChatWindow.tsx</code> (messages + input). Minimized by default; button text: “Ask a Stipes bot!”.</li>
          <li><strong>API route</strong>: <code>app/api/chat/route.ts</code> accepts <code>POST</code> <code>{`{ message: string }`}</code> and forwards to <code>process.env.CHAT_API_URL</code> or a default (<code>https://stipes-openai-chat.vercel.app/chat</code>).</li>
          <li><strong>Upstream</strong>: Responsible for calling OpenAI and returning a reply. The web repo does not talk to OpenAI directly.</li>
        </ul>

        <h3>Configure the Upstream</h3>
        <ul className="list-disc pl-6">
          <li><strong>Env</strong>: set <code>CHAT_API_URL</code> in <code>.env.local</code> to your upstream service endpoint.</li>
          <li><strong>Contract</strong>: Upstream should accept <code>POST</code> JSON <code>{`{ message: string }`}</code> and return either:
            <ul className="list-[circle] pl-6">
              <li>JSON with a reply (<code>{`{ reply }`}</code>, <code>{`{ answer }`}</code>, <code>{`{ message }`}</code>, or OpenAI-like <code>{`{ choices: [{ message: { content } }] }`}</code>), or</li>
              <li>Plain text body containing the reply.</li>
            </ul>
          </li>
          <li><strong>Error handling</strong>: Non‑2xx responses are forwarded back to the client (status + body) for transparency.</li>
        </ul>

        <h3>How the Client Parses Responses</h3>
        <p><code>ChatWindow.tsx</code> tries these fields (in order) when <code>content-type</code> is JSON:</p>
        <p><code>choices[0].message.content → message.content → answer → reply → response → message → text → output</code></p>
        <p>If not JSON, it treats the response as plain text. On failure, it renders an error bubble with the status/text.</p>

        <h3>Security &amp; Keys</h3>
        <ul className="list-disc pl-6">
          <li>Keep secrets out of the frontend. Put OpenAI keys in your upstream service.</li>
          <li>Add rate limiting and abuse controls server‑side.</li>
        </ul>

        <h3>Local Development</h3>
        <ul className="list-disc pl-6">
          <li>Start dev: <code>npm run dev</code> then open <code>http://localhost:3000</code>.</li>
          <li>Widget lives bottom‑right; tweak copy and defaults in <code>ChatWidget.tsx</code> and <code>ChatWindow.tsx</code>.</li>
        </ul>
      </section>

      <section>
        <h2>Why This Setup?</h2>
        <ul className="list-disc pl-6">
          <li><strong>Go backend</strong>: tiny, efficient, easy to deploy (binary or serverless).</li>
          <li><strong>Next.js frontend</strong>: modern DX, deployable anywhere, great theming via Tailwind.</li>
          <li><strong>Embedded context</strong>: self‑contained, no database required.</li>
          <li><strong>Security</strong>: API keys stay server‑side; browser only calls your upstream.</li>
        </ul>
      </section>

      <section>
        <h2>What’s Next?</h2>
        <ul className="list-disc pl-6">
          <li>Add richer context files.</li>
          <li>Expose model selection per request.</li>
          <li>Upgrade chat UI (markdown rendering, streaming, avatars).</li>
          <li>Deploy both backend + frontend to Vercel for a full serverless setup.</li>
        </ul>
      </section>

      <footer className="mt-12 rounded-2xl border border-neutral-800 p-6 text-sm text-neutral-300">
        <p>In under 500 lines of Go and a lean Next.js starter, you get a working AI chat bot with a polished UI—perfect for experimenting, demoing, or bootstrapping something bigger.</p>
      </footer>
    </article>
  );
}

