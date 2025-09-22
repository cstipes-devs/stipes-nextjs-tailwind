# Resume Site Starter (Next.js + Tailwind)

A minimalist, performance-oriented portfolio starter inspired by the aesthetic of pahlani.com — **not a clone** (no copied content), but a faithful, clean vibe: dark UI, strong typography, subtle glassy cards, and metric tiles.

## Quickstart

```bash
# 1) Install deps
npm install

# 2) Run dev
npm run dev

# 3) Open
http://localhost:3000
```

## Customize
- Edit copy in `app/(site)/components/*`.
- Tweak colors/blur/shadows in `tailwind.config.ts` and `app/globals.css`.
- Replace the square avatar in `Hero` with your image in `/public` and a `<Image>` tag.

## Notes
- Built with Next.js App Router + Tailwind CSS.
- Keeps the *feel* (dark, crisp, card UI, stats tiles) without copying any proprietary content.

## Chatbot Overview
- What: A lightweight chat widget that sends your prompt to an internal API route, which forwards it to an upstream service that calls ChatGPT.
- UI: `app/(site)/components/ChatWidget.tsx` (launcher/minimize) and `ChatWindow.tsx` (messages + input). Minimized by default; button text is "Ask a Stipes bot!".
- API route: `app/api/chat/route.ts` accepts `POST` `{ message: string }`, forwards to `process.env.CHAT_API_URL` or a default (`https://stipes-openai-chat.vercel.app/chat`).
- Upstream: The upstream service is responsible for calling OpenAI (ChatGPT) and returning the response. This repo does not talk to OpenAI directly.

### Configure the upstream
- Env var: set `CHAT_API_URL` in `.env.local` to your own service endpoint that calls OpenAI.
- Contract: upstream should accept `POST` JSON `{ message: string }` and return either:
  - JSON with a reply (e.g., `{ reply: string }`, `{ answer: string }`, `{ message: string }`, or OpenAI-like `{ choices: [{ message: { content } }] }`), or
  - Plain text body containing the reply.
- Error handling: non-2xx responses are forwarded back to the client (status + body) for transparency.

### How the client parses responses
- `ChatWindow.tsx` tries these fields (in order) when `content-type` is JSON:
  - `choices[0].message.content`, `message.content`, `answer`, `reply`, `response`, `message`, `text`, `output`.
- If not JSON, it treats the response as plain text.
- On failure, it renders an error bubble with the status/text.

### Security and keys
- Keep secrets out of the frontend. Put OpenAI keys in your upstream service, or (if you fork to call OpenAI directly in `route.ts`) use `.env.local` and Next.js runtime env access.
- Add rate limiting and abuse controls in your upstream.

### Local development
- Start dev: `npm run dev` then open `http://localhost:3000`.
- Widget: bottom-right launcher; opens to the chat window. You can tweak defaults and copy in `ChatWidget.tsx` and `ChatWindow.tsx`.
