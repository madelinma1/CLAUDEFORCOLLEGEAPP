import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

/**
 * The single AI endpoint. In the prototype every AI moment called
 * `window.claude.complete(prompt)`; here that becomes a POST to this route,
 * which forwards to Claude. This is the seam where a production multi-agent
 * layer (orchestrator + RAG + structured outputs) would live.
 *
 * If ANTHROPIC_API_KEY is unset, the route returns `{ text: null }` so callers
 * fall back to their deterministic built-in answers and the UI degrades
 * gracefully — the whole app stays usable offline.
 */

export const runtime = "nodejs";

const MODEL = process.env.AI_COS_MODEL || "claude-sonnet-5";

const SYSTEM_PROMPT =
  "You are AI-COS, an AI-first college operating system that acts as a student's personal college strategist, admissions consultant, academic advisor, scholarship expert, career coach, and research mentor. You are warm, sharp, specific, and realistic. You do the planning workload so the student reviews and approves. Follow the exact output shape requested in each prompt — when JSON is requested, return only minified JSON with no markdown.";

export async function POST(req: NextRequest) {
  let prompt = "";
  try {
    const body = await req.json();
    prompt = typeof body?.prompt === "string" ? body.prompt : "";
  } catch {
    return NextResponse.json({ text: null, error: "bad request" }, { status: 400 });
  }

  if (!prompt.trim()) {
    return NextResponse.json({ text: null }, { status: 200 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured — signal the client to use its fallback.
    return NextResponse.json({ text: null, offline: true }, { status: 200 });
  }

  try {
    const client = new Anthropic({ apiKey });
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    });
    const text = msg.content
      .filter((b) => b.type === "text")
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
    return NextResponse.json({ text: text || null });
  } catch (err) {
    console.error("AI route error:", err);
    // Degrade gracefully — callers fall back to deterministic answers.
    return NextResponse.json({ text: null, error: "ai_error" }, { status: 200 });
  }
}
