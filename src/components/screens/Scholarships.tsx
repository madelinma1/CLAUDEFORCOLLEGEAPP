"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { complete } from "@/lib/ai";
import { PROFILE, SCHOLARSHIPS, FALLBACK_INSIGHT } from "@/lib/data";
import { Card, MonoLabel, PageHeader, Spinner } from "../ui";
import { Sparkle, Check } from "@/lib/icons";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "high", label: "High match" },
  { key: "soon", label: "Deadline soon" },
  { key: "noessay", label: "No essay" },
];

export default function ScholarshipsScreen() {
  const { tracker, toggleTracker, insights, insightLoading, setInsight, setInsightLoading } = useStore();
  const [filter, setFilter] = useState("all");

  const trackedCount = SCHOLARSHIPS.filter((s) => tracker[s.id]).length;

  const list = SCHOLARSHIPS.filter((s) => {
    if (filter === "high") return s.match >= 75;
    if (filter === "soon") return s.soon;
    if (filter === "noessay") return s.tag.toLowerCase() === "no essay";
    return true;
  });

  async function whyMatch(id: string, name: string) {
    const key = `sch_${id}`;
    if (insights[key] || insightLoading[key]) return;
    setInsightLoading(key, true);
    const raw = await complete(
      `You are AI-COS, a scholarship strategist. ${PROFILE}\n\nExplain in 2-3 concise sentences why this student is a strong match for the "${name}" scholarship and what to do now to strengthen the application. Respond in plain prose.`,
    );
    setInsight(key, raw || FALLBACK_INSIGHT);
    setInsightLoading(key, false);
  }

  return (
    <div className="animate-cosRise mx-auto max-w-[980px] px-8 pb-12 pt-7">
      <PageHeader
        kicker="Scholarship Discovery + Matching"
        title="Scholarships matched to you"
        sub={
          <>
            <strong className="text-ink">$148K</strong> potential · {trackedCount} tracked
          </>
        }
      />

      {/* Filters */}
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition"
            style={
              filter === f.key
                ? { background: "var(--aB)", color: "#fff" }
                : { background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--line)" }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {list.map((s) => {
          const key = `sch_${s.id}`;
          return (
            <Card key={s.id}>
              <div className="flex items-start gap-3.5">
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[10px] font-serif text-[15px]"
                  style={{ background: "var(--goldsoft)", color: "var(--gold)" }}
                >
                  {s.match}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-[18px] text-ink" style={{ fontWeight: 500 }}>
                      {s.name}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold"
                      style={{ background: "var(--surface2)", color: "var(--muted)" }}
                    >
                      {s.tag}
                    </span>
                    {s.soon && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold"
                        style={{ background: "var(--rosesoft)", color: "var(--rose)" }}
                      >
                        Deadline soon
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13.5px] leading-[1.5] text-ink2">{s.note}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px]">
                    <span className="font-semibold" style={{ color: "var(--gold)" }}>
                      {s.amount}
                    </span>
                    <span className="text-muted">Deadline: {s.deadline}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleTracker(s.id)}
                      className="inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-[12.5px] font-semibold"
                      style={
                        tracker[s.id]
                          ? { background: "var(--aA)", color: "#fff" }
                          : { border: "1px solid var(--line)", color: "var(--ink2)" }
                      }
                    >
                      {tracker[s.id] && <Check size={14} />}
                      {tracker[s.id] ? "Tracking" : "Track"}
                    </button>
                    <button
                      onClick={() => whyMatch(s.id, s.name)}
                      className="inline-flex items-center gap-1.5 rounded-[8px] border border-line px-3 py-1.5 text-[12.5px] font-semibold text-ink2"
                    >
                      <Sparkle size={14} /> Why I match
                    </button>
                  </div>

                  {(insightLoading[key] || insights[key]) && (
                    <div
                      className="mt-3 rounded-[10px] p-3"
                      style={{ background: "var(--aBsoft)", borderLeft: "3px solid var(--aB)" }}
                    >
                      {insightLoading[key] ? (
                        <div className="flex items-center gap-2.5 text-[13px] text-muted">
                          <Spinner size={14} /> Matching your profile…
                        </div>
                      ) : (
                        <>
                          <MonoLabel className="mb-1 text-[9.5px]" style={{ color: "var(--aB)" }}>
                            Why you match
                          </MonoLabel>
                          <p className="text-[13.5px] leading-[1.5] text-ink2">{insights[key]}</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
