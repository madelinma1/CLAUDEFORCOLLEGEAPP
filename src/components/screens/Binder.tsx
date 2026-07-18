"use client";

import { useState } from "react";
import { Card, MonoLabel, PageHeader } from "../ui";
import { ArrowLeft } from "@/lib/icons";

const BINDER = [
  {
    id: "notebook",
    emoji: "🔬",
    title: "Scientist's Notebook",
    color: "var(--aA)",
    soft: "var(--aAsoft)",
    desc: "Your personal knowledge base — research, ideas, and curiosity captured over four years.",
    subs: ["Book Notes", "Research Paper Summaries", "Topic Journal", "Questions I Want to Answer", "Technologies I'm Following", "Career Research"],
  },
  {
    id: "academics",
    emoji: "📚",
    title: "Academics",
    color: "var(--aB)",
    soft: "var(--aBsoft)",
    desc: "Track your academic progress, courses, and goals throughout high school.",
    subs: ["Report Cards & Transcript", "GPA Tracker", "Course Planning", "Honors / AP / IB", "Academic Goals", "Study Plans"],
  },
  {
    id: "leadership",
    emoji: "🌟",
    title: "Leadership & Impact",
    color: "var(--gold)",
    soft: "var(--goldsoft)",
    desc: "Extracurricular growth, leadership, service, and the impact you make.",
    subs: ["Clubs & Activities", "Sports", "Volunteer Hours", "Leadership Roles", "Awards & Certifications"],
  },
  {
    id: "testing",
    emoji: "📝",
    title: "Testing & Readiness",
    color: "var(--rose)",
    soft: "var(--rosesoft)",
    desc: "Standardized testing, practice, scores, and your readiness timeline.",
    subs: ["PSAT", "SAT", "ACT", "AP Exams", "Practice Tests", "Testing Timeline"],
  },
  {
    id: "portfolio",
    emoji: "🏛️",
    title: "College Portfolio",
    color: "var(--aB)",
    soft: "var(--aBsoft)",
    desc: "Everything for your applications — research notes, essays, resume, and checklists.",
    subs: ["College Research Notes", "Resume", "Recommendation Letters", "Personal Statement", "Application Checklists"],
  },
  {
    id: "decisions",
    emoji: "💰",
    title: "Scholarships & Decisions",
    color: "var(--gold)",
    soft: "var(--goldsoft)",
    desc: "Financial planning, aid, cost comparisons, and your final college decision.",
    subs: ["Scholarship Tracker", "FAFSA & CSS Profile", "Award Letters", "Cost Comparison", "Decision Matrix"],
  },
];

export default function Binder() {
  const [openId, setOpenId] = useState<string | null>(null);
  const section = BINDER.find((b) => b.id === openId);

  if (section) {
    return (
      <div className="animate-cosRise mx-auto max-w-[900px] px-8 pb-12 pt-7">
        <button
          onClick={() => setOpenId(null)}
          className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted hover:text-ink"
        >
          <ArrowLeft size={16} /> Back to binder
        </button>
        <div className="mb-5 flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-[13px] text-[22px]"
            style={{ background: section.soft }}
          >
            {section.emoji}
          </div>
          <div>
            <h2 className="font-serif text-[26px] text-ink" style={{ fontWeight: 500 }}>
              {section.title}
            </h2>
            <p className="text-[13px] text-muted">{section.desc}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {section.subs.map((s) => (
            <Card key={s} className="flex items-center justify-between">
              <span className="text-[14px] text-ink2">{s}</span>
              <span className="text-[11.5px] text-muted">Open →</span>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-cosRise mx-auto max-w-[1000px] px-8 pb-12 pt-7">
      <PageHeader
        kicker="Road to College Binder"
        title="Everything, in one organized place"
        sub="Six living sections that grow with you from middle school through college."
      />
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
        {BINDER.map((b) => (
          <Card key={b.id} onClick={() => setOpenId(b.id)}>
            <div
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-[13px] text-[22px]"
              style={{ background: b.soft }}
            >
              {b.emoji}
            </div>
            <div className="font-serif text-[18px] text-ink" style={{ fontWeight: 500, color: b.color }}>
              {b.title}
            </div>
            <p className="mt-1 text-[12.5px] leading-[1.5] text-ink2">{b.desc}</p>
            <MonoLabel className="mt-3 text-[9.5px]" style={{ color: "var(--muted)" }}>
              {b.subs.length} sections
            </MonoLabel>
          </Card>
        ))}
      </div>
    </div>
  );
}
