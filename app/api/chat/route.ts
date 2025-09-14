import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_UPSTREAM = "https://stipes-openai-chat.vercel.app/chat";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message: string | undefined = body?.message ?? body?.prompt;
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Missing 'message' or 'prompt'" }, { status: 400 });
    }

    const upstreamUrl = process.env.CHAT_API_URL || DEFAULT_UPSTREAM;

    const upstream = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const contentType = upstream.headers.get("content-type") || "";
    if (!upstream.ok) {
      const text = await upstream.text();
      return new NextResponse(text || `Upstream error ${upstream.status}`, { status: upstream.status });
    }

    if (contentType.includes("application/json")) {
      const data = await upstream.json();
      return NextResponse.json(data, { status: upstream.status });
    }

    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "content-type": contentType || "text/plain; charset=utf-8" },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Request failed" }, { status: 500 });
  }
}
