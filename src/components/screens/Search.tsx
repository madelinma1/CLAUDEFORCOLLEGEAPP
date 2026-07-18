"use client";

import { useState } from "react";
import { complete, parseJson } from "@/lib/ai";
import { PROFILE, FALLBACK_SEARCH, EXAMPLE_QUERIES } from "@/lib/data";
import type { SearchPayload, SearchResult } from "@/lib/types";
import { AiCard, AiLoading, Card, MonoLabel, PageHeader } from "../ui";
import { Search as SearchIcon, Sparkle, Check } from "@/lib/icons";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [summary, setSummary] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [actions, setActions] = useState<string[]>([]);

  async function submit(q?: string) {
    const text = (q ?? query).trim();
    if (!text) return;
    setQuery(text);
    setLoading(true);
    setDone(false);
    const prompt = `You are AI-COS, an AI college strategist. ${PROFILE}\n\nThe student searched: "${text}".\nReturn ONLY minified JSON, no markdown, shaped exactly: {"summary":"2-3 sentences answering tailored to them","results":[{"type":"College|Scholarship|Program|Faculty|Opportunity","name":"","meta":"short location/amount/deadline","match":0-99,"note":"one line why it fits them"}],"actions":["short action","",""]}\nGive 5 results and 3 actions. Be concrete and realistic.`;
    const raw = await complete(prompt);
    const data = parseJson<SearchPayload>(raw) || FALLBACK_SEARCH;
    const list = Array.isArray(data.results) ? data.results : FALLBACK_SEARCH.results;
    setSummary(data.summary || FALLBACK_SEARCH.summary);
    setResults(
      list.map((r) => ({
        type: r.type || "Result",
        name: r.name || "",
        meta: r.meta || "",
        match: r.match != null ? r.match : "—",
        note: r.note || "",
      })),
    );
    setActions(Array.isArray(data.actions) && data.actions.length ? data.actions : FALLBACK_SEARCH.actions);
    setLoading(false);
    setDone(true);
  }

  return (
    <div className="animate-cosRise mx-auto max-w-[880px] px-8 pb-12 pt-7">
      <PageHeader
        kicker="AI Global Search"
        title="Ask anything about your college journey"
        sub="Natural-language query → AI answer, ranked results, and next actions."
      />

      {/* Search input */}
      <div
        className="flex items-center gap-3 rounded-[12px] bg-surface px-4 py-3"
        style={{ border: "1.5px solid var(--aB)" }}
      >
        <SearchIcon size={20} style={{ stroke: "var(--aB)" }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="e.g. affordable colleges for genetics + AI research"
          className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-muted"
        />
        <button
          onClick={() => submit()}
          className="rounded-[9px] px-4 py-2 text-[13px] font-semibold text-white"
          style={{ background: "var(--aB)" }}
        >
          Search
        </button>
      </div>

      {/* Example chips */}
      {!done && !loading && (
        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLE_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => submit(q)}
              className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12.5px] text-ink2 transition hover:bg-surface2"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      <div className="mt-6">
        {loading && <AiLoading label="AI is researching…" />}

        {done && !loading && (
          <div className="flex flex-col gap-4">
            <AiCard label="AI summary">
              <p className="text-[14.5px] leading-[1.55] text-ink2">{summary}</p>
            </AiCard>

            <div>
              <MonoLabel className="mb-2.5 text-[10px]" style={{ color: "var(--muted)" }}>
                Results
              </MonoLabel>
              <div className="flex flex-col gap-2.5">
                {results.map((r, i) => (
                  <Card key={i}>
                    <div className="flex items-start gap-3.5">
                      <div
                        className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center rounded-[10px] font-serif"
                        style={{ background: "var(--aBsoft)", color: "var(--aB)" }}
                      >
                        <span className="text-[15px] leading-none">{r.match}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-0.5 flex items-center justify-between gap-2">
                          <MonoLabel className="text-[9.5px]" style={{ color: "var(--aB)" }}>
                            {r.type}
                          </MonoLabel>
                          <span className="text-[11.5px] text-muted">{r.meta}</span>
                        </div>
                        <div className="font-serif text-[17px] text-ink" style={{ fontWeight: 500 }}>
                          {r.name}
                        </div>
                        <p className="mt-0.5 text-[13px] leading-[1.5] text-ink2">{r.note}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <AiCard label="AI-suggested next actions">
              <div className="flex flex-col gap-2">
                {actions.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[13.5px] text-ink2">
                    <span
                      className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full"
                      style={{ background: "var(--aBsoft)", color: "var(--aB)" }}
                    >
                      <Check size={12} />
                    </span>
                    {a}
                  </div>
                ))}
              </div>
            </AiCard>
          </div>
        )}

        {!done && !loading && (
          <div className="mt-10 flex flex-col items-center gap-3 text-center text-muted">
            <Sparkle size={28} style={{ stroke: "var(--aB)" }} />
            <p className="max-w-[380px] text-[13.5px]">
              Ask a question and AI-COS will research colleges, scholarships, programs, faculty, and
              opportunities — then hand you the next moves.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
