"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { complete } from "@/lib/ai";
import { PROFILE, CMDK_SUGGESTIONS, FALLBACK_CMDK } from "@/lib/data";
import { Sparkle, Search } from "@/lib/icons";
import { AiLoading, MonoLabel } from "./ui";

/** Global ⌘K command assistant. Idle → suggested prompts; submit → spinner → answer. */
export default function CmdK() {
  const { cmdkOpen, setCmdkOpen } = useStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  if (!cmdkOpen) return null;

  async function ask(q?: string) {
    const query = (q ?? input).trim();
    if (!query) return;
    setInput(query);
    setLoading(true);
    setAnswer("");
    const prompt = `You are AI-COS, a warm, sharp AI college strategist for a student. ${PROFILE}\n\nThe student asks: "${query}".\nAnswer concisely (under 130 words). Use plain text only — no markdown headings, bold, asterisks, or hashes. If they ask for a plan, give 3-5 short bullet lines starting with "• ". Be specific to their genetics + AI goal and their stage (rising freshman).`;
    const raw = await complete(prompt);
    setLoading(false);
    setAnswer(raw || FALLBACK_CMDK);
  }

  function close() {
    setCmdkOpen(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]"
      style={{ background: "rgba(20,17,12,0.42)" }}
      onClick={close}
    >
      <div
        className="w-full max-w-[640px] overflow-hidden rounded-[16px] border border-line shadow-cos"
        style={{ background: "var(--surface)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 border-b border-line px-[18px] py-4">
          <Sparkle size={20} style={{ stroke: "var(--aB)" }} />
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") ask();
            }}
            placeholder="Ask AI-COS anything…"
            className="flex-1 bg-transparent text-[15.5px] text-ink placeholder:text-muted"
          />
          <span className="rounded-[5px] border border-line px-[7px] py-[3px] font-mono text-[10px] text-muted">
            ESC
          </span>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-[18px]">
          {loading ? (
            <AiLoading label="AI is thinking…" />
          ) : answer ? (
            <p className="whitespace-pre-wrap text-[14.5px] leading-[1.6] text-ink2">{answer}</p>
          ) : (
            <>
              <MonoLabel className="mb-2.5 text-[10px]" style={{ color: "var(--muted)" }}>
                Suggested
              </MonoLabel>
              <div className="flex flex-col gap-1.5">
                {CMDK_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="flex items-center gap-2.5 rounded-[10px] border border-line px-3.5 py-2.5 text-left text-[14px] text-ink2 transition hover:bg-bg"
                  >
                    <Search size={16} style={{ stroke: "var(--aB)" }} />
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
