"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { complete } from "@/lib/ai";
import { PROFILE, FALLBACK_INSIGHT } from "@/lib/data";
import type { College } from "@/lib/types";
import { AiCard, Card, MonoLabel, ScoreBar, Spinner, BandBadge } from "../ui";
import { ArrowLeft, Sparkle, Bookmark, Check } from "@/lib/icons";

const SCORE_ROWS = (c: College) => [
  { label: "Admit odds", value: c.admitScore, color: "var(--rose)" },
  { label: "Affordability", value: c.affordScore, color: "var(--aA)" },
  { label: "Academic fit", value: c.academicScore, color: "var(--aB)" },
  { label: "Campus fit", value: c.campusScore, color: "var(--gold)" },
  { label: "Career", value: c.careerScore, color: "var(--aB)" },
];

export default function CollegeProfile({ college: c }: { college: College }) {
  const { openCollege, goHome, setScreen, isSaved, toggleSaved, insights, insightLoading, setInsight, setInsightLoading } =
    useStore();
  const key = `col_${c.id}`;
  const [localOpen, setLocalOpen] = useState(false);

  async function askWhy() {
    setLocalOpen(true);
    if (insights[key] || insightLoading[key]) return;
    setInsightLoading(key, true);
    const prompt = `You are AI-COS, an AI college strategist. ${PROFILE}\n\nExplain in concise plain prose why ${c.name} (${c.location}, ${c.band}) is or isn't a smart fit for this specific student, given affordability, their genetics + AI goal, and admit odds. 3-4 sentences. Respond in concise plain prose.`;
    const raw = await complete(prompt);
    setInsight(key, raw || FALLBACK_INSIGHT);
    setInsightLoading(key, false);
  }

  const bandVar = { aA: "var(--aA)", aB: "var(--aB)", gold: "var(--gold)", rose: "var(--rose)" }[c.bandColor];

  return (
    <div className="animate-cosRise mx-auto max-w-[1000px] px-8 pb-12 pt-7">
      <button
        onClick={() => setScreen("colleges")}
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted hover:text-ink"
      >
        <ArrowLeft size={16} /> Back to colleges
      </button>

      {/* Header */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <BandBadge band={c.band} color={c.bandColor} />
          <h2 className="mt-2 font-serif text-[32px] leading-tight text-ink" style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>
            {c.name}
          </h2>
          <div className="mt-1 text-[13.5px] text-muted">
            {c.location} · {c.type} · {c.size}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <MonoLabel className="text-[9.5px]" style={{ color: "var(--muted)" }}>
              AI-FIT
            </MonoLabel>
            <div className="flex items-center gap-1 font-serif text-[30px]" style={{ color: bandVar }}>
              <Sparkle size={20} />
              {c.match}%
            </div>
          </div>
          <button
            onClick={() => toggleSaved(c.id)}
            className="inline-flex items-center gap-1.5 rounded-[9px] px-4 py-2.5 text-[13px] font-semibold text-white"
            style={{ background: "var(--aB)" }}
          >
            <Bookmark size={15} />
            {isSaved(c.id) ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* AI overview */}
      <div className="mb-5">
        <AiCard label="AI overview">
          <p className="text-[14.5px] leading-[1.55] text-ink2">{c.summary}</p>
        </AiCard>
      </div>

      {/* Score bars */}
      <Card className="mb-5">
        <MonoLabel className="mb-4 text-[10px]" style={{ color: "var(--muted)" }}>
          AI fit breakdown
        </MonoLabel>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SCORE_ROWS(c).map((r) => (
            <ScoreBar key={r.label} label={r.label} value={r.value} color={r.color} />
          ))}
        </div>
      </Card>

      {/* Intelligence sections 2x2 */}
      <div className="mb-5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <Card>
          <MonoLabel className="mb-3 text-[10px]" style={{ color: "var(--aB)" }}>
            Admissions
          </MonoLabel>
          <Row label="Acceptance" value={c.accept} />
          <Row label="SAT range" value={c.sat} />
          <Row label="Deadline" value={c.deadline} />
        </Card>
        <Card>
          <MonoLabel className="mb-3 text-[10px]" style={{ color: "var(--aA)" }}>
            Financial
          </MonoLabel>
          <Row label="Tuition" value={c.tuition} />
          <Row label="Net price" value={c.net} />
          <Row label="Aid" value={c.aid} />
        </Card>
        <Card>
          <MonoLabel className="mb-3 text-[10px]" style={{ color: "var(--gold)" }}>
            Academic &amp; Research
          </MonoLabel>
          <p className="mb-3 text-[13px] leading-[1.5] text-ink2">{c.research}</p>
          <div className="flex flex-wrap gap-1.5">
            {c.majors.map((m) => (
              <span
                key={m}
                className="rounded-full px-2.5 py-1 text-[11.5px]"
                style={{ background: "var(--aBsoft)", color: "var(--aB)" }}
              >
                {m}
              </span>
            ))}
          </div>
        </Card>
        <Card>
          <MonoLabel className="mb-3 text-[10px]" style={{ color: "var(--rose)" }}>
            Career
          </MonoLabel>
          <Row label="Grad rate" value={c.gradRate} />
          <Row label="Median salary" value={c.salary} />
          <div className="mt-2">
            <MonoLabel className="mb-1.5 text-[9px]" style={{ color: "var(--muted)" }}>
              Top employers
            </MonoLabel>
            <div className="flex flex-wrap gap-1.5">
              {c.employers.map((e) => (
                <span key={e} className="rounded-full bg-surface2 px-2.5 py-1 text-[11.5px] text-ink2">
                  {e}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* AI insight columns */}
      <div className="mb-5 grid grid-cols-1 gap-3.5 md:grid-cols-3">
        <InsightCol title="Strengths" items={c.pros} bg="var(--aAsoft)" accent="var(--aA)" />
        <InsightCol title="Trade-offs" items={c.cons} bg="var(--surface)" accent="var(--ink2)" bordered />
        <InsightCol title="Risk factors" items={c.risks} bg="var(--rosesoft)" accent="var(--rose)" />
      </div>

      {/* Personalized AI analysis */}
      <div className="mb-5">
        <AiCard label="Personalized AI analysis">
          {!localOpen ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[14px] text-ink2">
                Want a read tailored to your profile — affordability, goal fit, and admit odds?
              </p>
              <button
                onClick={askWhy}
                className="inline-flex items-center gap-1.5 rounded-[9px] px-4 py-2 text-[13px] font-semibold text-white"
                style={{ background: "var(--aB)" }}
              >
                <Sparkle size={15} /> Ask AI: why for me?
              </button>
            </div>
          ) : insightLoading[key] ? (
            <div className="flex items-center gap-2.5 text-[13.5px] text-muted">
              <Spinner /> Analyzing fit for your profile…
            </div>
          ) : (
            <p className="text-[14.5px] leading-[1.55] text-ink2">{insights[key]}</p>
          )}
        </AiCard>
      </div>

      {/* Next steps */}
      <Card>
        <MonoLabel className="mb-3 text-[10px]" style={{ color: "var(--aB)" }}>
          AI-suggested next steps
        </MonoLabel>
        <div className="flex flex-col gap-2">
          {c.actions.map((a, i) => (
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
      </Card>

      {/* subtle secondary nav helpers */}
      <div className="mt-6 flex gap-2 text-[12.5px]">
        <button onClick={goHome} className="text-muted hover:text-ink">
          ← Home
        </button>
        <span className="text-line">·</span>
        <button
          onClick={() => {
            const next = OTHER_IDS.find((id) => id !== c.id);
            if (next) openCollege(next);
          }}
          className="text-muted hover:text-ink"
        >
          Compare another college →
        </button>
      </div>
    </div>
  );
}

const OTHER_IDS = ["unc", "ncstate", "ucsd", "berkeley", "duke"];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line py-1.5 last:border-0">
      <span className="text-[12.5px] text-muted">{label}</span>
      <span className="text-right text-[13px] text-ink2">{value}</span>
    </div>
  );
}

function InsightCol({
  title,
  items,
  bg,
  accent,
  bordered,
}: {
  title: string;
  items: string[];
  bg: string;
  accent: string;
  bordered?: boolean;
}) {
  return (
    <div
      className="rounded-[14px] p-[15px]"
      style={{ background: bg, border: bordered ? "1px solid var(--line)" : "none" }}
    >
      <MonoLabel className="mb-2.5 text-[10px]" style={{ color: accent }}>
        {title}
      </MonoLabel>
      <ul className="flex flex-col gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-[13px] leading-[1.45] text-ink2">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: accent }} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
