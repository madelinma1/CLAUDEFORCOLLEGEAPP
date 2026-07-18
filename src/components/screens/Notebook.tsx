"use client";

import { useState, useRef, useEffect } from "react";
import { useStore } from "@/lib/store";
import { complete } from "@/lib/ai";
import { PROFILE, FALLBACK_NB } from "@/lib/data";
import { MonoLabel, Spinner } from "../ui";
import { Send, Sparkle } from "@/lib/icons";

const EXAMPLES = [
  "Plan my summer so research readiness goes up",
  "Turn my goal into a semester-by-semester plan",
  "What clubs should I start or join this year?",
  "Draft an email to a professor's lab",
];

const CHIPS = ["+ Tasks", "+ Plan", "+ Reminders"];

export default function Notebook() {
  const { nbMessages, setNbMessages } = useStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [nbMessages, loading]);

  async function send(text?: string) {
    const t = (text ?? input).trim();
    if (!t || loading) return;
    const msgs = [...nbMessages, { role: "user" as const, text: t }];
    setNbMessages(msgs);
    setInput("");
    setLoading(true);
    const hist = msgs.map((m) => (m.role === "user" ? "Student" : "AI-COS") + ": " + m.text).join("\n");
    const prompt = `You are AI-COS, a warm, expert AI college strategist and planner who turns conversations into concrete plans. ${PROFILE}\n\nConversation:\n${hist}\n\nReply as AI-COS in under 140 words. Use plain text only — no markdown headings, no bold, no asterisks or hashes. When you propose a plan, use short bullet lines that start with "• ". Be specific, encouraging, and action-oriented.`;
    const raw = await complete(prompt);
    setNbMessages((m) => [...m, { role: "ai", text: raw || FALLBACK_NB }]);
    setLoading(false);
  }

  return (
    <div className="animate-cosRise mx-auto flex h-full max-w-[880px] flex-col px-8 pb-6 pt-7">
      <div className="mb-3">
        <MonoLabel className="mb-2 text-[10px]" style={{ color: "var(--muted)" }}>
          AI Notebook
        </MonoLabel>
        <h2 className="font-serif text-[26px] text-ink" style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>
          Command center
        </h2>
        <p className="mt-1 text-[13px] text-muted">
          Talk in plain language. AI-COS turns the conversation into plans, tasks, and reminders.
        </p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="cos-scroll flex-1 overflow-y-auto py-3">
        {nbMessages.length === 0 && !loading ? (
          <div className="flex flex-col items-center gap-4 pt-8 text-center">
            <Sparkle size={30} style={{ stroke: "var(--aB)" }} />
            <p className="max-w-[360px] text-[13.5px] text-muted">
              Start a conversation. Try one of these:
            </p>
            <div className="flex flex-col gap-2">
              {EXAMPLES.map((e) => (
                <button
                  key={e}
                  onClick={() => send(e)}
                  className="rounded-[10px] border border-line bg-surface px-4 py-2.5 text-[13.5px] text-ink2 transition hover:bg-surface2"
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {nbMessages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div
                    className="max-w-[76%] whitespace-pre-wrap rounded-[14px] px-4 py-2.5 text-[14px] leading-[1.5] text-white"
                    style={{ background: "var(--aB)", borderBottomRightRadius: 4 }}
                  >
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-start">
                  <div
                    className="max-w-[80%] rounded-[14px] border border-line bg-surface px-4 py-3 shadow-cos"
                    style={{ borderBottomLeftRadius: 4, borderLeft: "3px solid var(--aB)" }}
                  >
                    <MonoLabel className="mb-1.5 text-[9px]" style={{ color: "var(--aB)", letterSpacing: "0.12em" }}>
                      AI
                    </MonoLabel>
                    <p className="whitespace-pre-wrap text-[14px] leading-[1.55] text-ink2">{m.text}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {CHIPS.map((c) => (
                        <span
                          key={c}
                          className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                          style={{ background: "var(--aBsoft)", color: "var(--aB)" }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            )}
            {loading && (
              <div className="flex items-center gap-2.5 text-[13px] text-muted">
                <Spinner size={14} /> AI-COS is planning…
              </div>
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="mt-2 flex items-center gap-2.5 rounded-[14px] border border-line bg-surface p-2 pl-4 shadow-cos">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Tell AI-COS a goal…"
          className="flex-1 bg-transparent text-[14.5px] text-ink placeholder:text-muted"
        />
        <button
          onClick={() => send()}
          disabled={loading}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white disabled:opacity-60"
          style={{ background: "var(--aB)" }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
