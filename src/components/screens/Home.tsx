"use client";

import { useStore } from "@/lib/store";
import { STUDENT } from "@/lib/data";
import { FALLBACK_RECS_UG, AGENTS_AT_WORK } from "@/lib/homeData";
import { AiCard, Card, Donut, MonoLabel, BandBadge } from "../ui";
import { Sparkle, Plus, Bookmark } from "@/lib/icons";
import type { BandColor } from "@/lib/types";

const RINGS = [
  { label: "Admission", pct: 34, color: "var(--aB)" },
  { label: "Scholarship", pct: 41, color: "var(--gold)" },
  { label: "Research", pct: 28, color: "var(--aA)" },
  { label: "Academic", pct: 76, color: "var(--rose)" },
];

const YEARS = ["Freshman", "Sophomore", "Junior", "Senior"];

export default function Home() {
  const { setScreen, openCollege, toggleSaved, isSaved } = useStore();

  return (
    <div className="animate-cosRise mx-auto max-w-[1180px] px-8 pb-12 pt-7">
      {/* Greeting */}
      <div className="mb-[22px] flex flex-wrap items-end justify-between gap-3.5">
        <div>
          <h2
            className="mb-1 font-serif text-[32px] leading-[1.1] text-ink"
            style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
          >
            Good morning, {STUDENT.firstName}
          </h2>
          <div className="text-[13.5px] text-muted">
            {STUDENT.classLine} · {STUDENT.yearAheadLine} ·{" "}
            <span className="text-ink2">{STUDENT.daysToAppLine}</span>
          </div>
        </div>
        <button
          onClick={() => setScreen("analytics")}
          className="flex items-center gap-2 rounded-full px-[13px] py-2 font-mono text-[11px]"
          style={{ color: "var(--aA)", background: "var(--aAsoft)", letterSpacing: "0.04em" }}
        >
          <span className="h-[7px] w-[7px] animate-cosPulse rounded-full" style={{ background: "var(--aA)" }} />
          AI completed 23 actions this week
        </button>
      </div>

      {/* AI morning briefing */}
      <div className="mb-[22px]">
        <AiCard label="AI morning briefing">
          <p className="text-[14.5px] leading-[1.55] text-ink2">
            Your priority this summer is{" "}
            <strong className="text-ink">early lab exposure</strong> — it lifts research readiness
            faster than anything else on your timeline. I lined up the Rice Bioscience Academy,
            queued a free genomics course, and matched 6 new scholarships. Tap any agent below to see
            its reasoning.
          </p>
        </AiCard>
      </div>

      {/* Readiness rings */}
      <div className="mb-6 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {RINGS.map((r) => (
          <Card key={r.label} onClick={() => setScreen("analytics")} className="flex flex-col items-center">
            <MonoLabel className="mb-2 self-start text-[10px]" style={{ color: "var(--muted)" }}>
              {r.label}
            </MonoLabel>
            <Donut pct={r.pct} color={r.color} />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Recommendation feed */}
        <div className="flex flex-col gap-3.5">
          <MonoLabel className="text-[10px]" style={{ color: "var(--muted)" }}>
            Recommended for you
          </MonoLabel>
          {FALLBACK_RECS_UG.map((rec) => (
            <Card key={rec.name}>
              <div className="flex gap-3.5">
                <div
                  className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[11px]"
                  style={{ background: "var(--aBsoft)", color: "var(--aB)" }}
                >
                  <Sparkle size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <MonoLabel className="text-[9.5px]" style={{ color: "var(--aB)" }}>
                      College match
                    </MonoLabel>
                    <BandBadge band={rec.band} color={rec.bandColor as BandColor} />
                  </div>
                  <button
                    onClick={() => rec.id && openCollege(rec.id)}
                    className="text-left font-serif text-[19px] text-ink hover:underline"
                    style={{ fontWeight: 500 }}
                  >
                    {rec.name}
                  </button>
                  <p className="mt-1 text-[13.5px] leading-[1.5] text-ink2">{rec.reason}</p>
                  <div className="mt-2.5 flex items-center gap-2 text-[11.5px] text-muted">
                    <span>Impact: research + fit</span>
                    <span>·</span>
                    <span>{rec.location}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => rec.id && openCollege(rec.id)}
                      className="rounded-[8px] px-3 py-1.5 text-[12.5px] font-semibold text-white"
                      style={{ background: "var(--aB)" }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Plus size={14} /> Add to plan
                      </span>
                    </button>
                    <button
                      onClick={() => rec.id && toggleSaved(rec.id)}
                      className="rounded-[8px] border border-line px-3 py-1.5 text-[12.5px] font-semibold text-ink2"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Bookmark size={14} />
                        {rec.id && isSaved(rec.id) ? "Saved" : "Save"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Right column: path + agents */}
        <div className="flex flex-col gap-4">
          <Card>
            <MonoLabel className="mb-3.5 text-[10px]" style={{ color: "var(--muted)" }}>
              Four-year path
            </MonoLabel>
            <div className="flex items-center justify-between">
              {YEARS.map((y, i) => (
                <div key={y} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${i === 0 ? "animate-cosPulse" : ""}`}
                    style={{ background: i === 0 ? "var(--aB)" : "var(--line)" }}
                  />
                  <span
                    className="text-[11px]"
                    style={{ color: i === 0 ? "var(--ink)" : "var(--muted)", fontWeight: i === 0 ? 600 : 400 }}
                  >
                    {y}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setScreen("planner")}
              className="mt-3.5 w-full rounded-[8px] border border-line py-2 text-[12.5px] font-semibold text-ink2"
            >
              Open Four-Year Planner
            </button>
          </Card>

          <Card>
            <MonoLabel className="mb-3 text-[10px]" style={{ color: "var(--muted)" }}>
              Agents at work
            </MonoLabel>
            <div className="flex flex-col gap-3">
              {AGENTS_AT_WORK.map((a) => (
                <div key={a.agent} className="flex gap-2.5">
                  <span
                    className="mt-1 h-2 w-2 flex-shrink-0 animate-cosPulse rounded-full"
                    style={{ background: "var(--aA)" }}
                  />
                  <div>
                    <MonoLabel className="text-[9.5px]" style={{ color: "var(--aB)" }}>
                      {a.agent}
                    </MonoLabel>
                    <div className="text-[12.5px] leading-[1.45] text-ink2">{a.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
