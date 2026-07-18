"use client";

import { useStore } from "@/lib/store";
import { complete, parseJson } from "@/lib/ai";
import {
  PROFILE,
  DEFAULT_SOPH,
  FRESHMAN_DONE,
  JUNIOR_PLANNED,
  SENIOR_PLANNED,
} from "@/lib/data";
import { Card, MonoLabel, PageHeader, Spinner } from "../ui";
import { Sparkle, Lock, Check } from "@/lib/icons";
import { useState } from "react";

export default function Planner() {
  const { sophomoreTasks, setSophomoreTasks } = useStore();
  const [loading, setLoading] = useState(false);
  const tasks = sophomoreTasks ?? DEFAULT_SOPH;

  async function regen() {
    setLoading(true);
    const raw = await complete(
      `You are AI-COS. Produce an updated freshman-year action plan for this student as JSON ONLY: {"tasks":["","",...]} with exactly 6 short concrete items spanning courses, research, competitions, and skill-building. ${PROFILE}`,
    );
    const j = parseJson<{ tasks?: string[] }>(raw);
    const next = j && Array.isArray(j.tasks) && j.tasks.length ? j.tasks.slice(0, 8) : DEFAULT_SOPH;
    setSophomoreTasks(next);
    setLoading(false);
  }

  return (
    <div className="animate-cosRise mx-auto max-w-[1000px] px-8 pb-12 pt-7">
      <PageHeader
        kicker="Four-Year Strategic Planner"
        title="Your AI-maintained roadmap"
        sub="AI keeps this plan current. You review and approve; strategic steps stay AI-managed."
        right={
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase"
            style={{ color: "var(--aB)", background: "var(--aBsoft)", letterSpacing: "0.06em" }}
          >
            <Lock size={13} /> AI-managed
          </div>
        }
      />

      <div className="flex flex-col gap-4">
        <YearBlock year="Freshman" state="done" tasks={FRESHMAN_DONE} />

        {/* Sophomore — current, AI-generated with regenerate */}
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-[140px_1fr]">
          <div className="pt-1">
            <div className="font-serif text-[20px] text-ink" style={{ fontWeight: 500 }}>
              Sophomore
            </div>
            <MonoLabel className="mt-1 text-[9.5px]" style={{ color: "var(--aB)" }}>
              Current year
            </MonoLabel>
          </div>
          <Card style={{ border: "1.5px solid var(--aB)" }}>
            <div className="mb-3 flex items-center justify-between">
              <MonoLabel className="text-[10px]" style={{ color: "var(--aB)" }}>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkle size={13} /> AI-generated checklist
                </span>
              </MonoLabel>
              <button
                onClick={regen}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-[8px] border border-line px-3 py-1.5 text-[12px] font-semibold text-ink2 disabled:opacity-60"
              >
                {loading ? <Spinner size={13} /> : <Sparkle size={13} />}
                {loading ? "Regenerating…" : "Regenerate"}
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {tasks.map((t, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-[9px] bg-surface2 px-3 py-2.5 text-[13.5px] text-ink2">
                  <span
                    className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border"
                    style={{ borderColor: "var(--aB)", color: "var(--aB)" }}
                  >
                    <Check size={11} />
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <YearBlock year="Junior" state="planned" tasks={JUNIOR_PLANNED} />
        <YearBlock year="Senior" state="planned" tasks={SENIOR_PLANNED} />
      </div>
    </div>
  );
}

function YearBlock({
  year,
  state,
  tasks,
}: {
  year: string;
  state: "done" | "planned";
  tasks: string[];
}) {
  const done = state === "done";
  return (
    <div className="grid grid-cols-1 gap-3.5 md:grid-cols-[140px_1fr]">
      <div className="pt-1">
        <div
          className="font-serif text-[20px]"
          style={{ fontWeight: 500, color: done ? "var(--muted)" : "var(--ink)" }}
        >
          {year}
        </div>
        <MonoLabel className="mt-1 text-[9.5px]" style={{ color: "var(--muted)" }}>
          {done ? "Complete" : "Planned"}
        </MonoLabel>
      </div>
      <Card style={done ? { opacity: 0.7 } : undefined}>
        <div className="flex flex-wrap gap-2">
          {tasks.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px]"
              style={{
                background: done ? "var(--surface2)" : "var(--aBsoft)",
                color: done ? "var(--muted)" : "var(--aB)",
              }}
            >
              {done && <Check size={12} />}
              {t}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
