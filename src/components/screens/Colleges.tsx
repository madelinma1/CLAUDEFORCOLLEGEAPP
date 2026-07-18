"use client";

import { useStore } from "@/lib/store";
import { COLLEGES, GRAD_PROGRAMS } from "@/lib/data";
import { Card, MonoLabel, PageHeader, BandBadge } from "../ui";
import { Sparkle, Bookmark } from "@/lib/icons";
import CollegeProfile from "./CollegeProfile";

export default function Colleges() {
  const { mode, setMode, selectedCollege, openCollege, isSaved, toggleSaved } = useStore();

  // Profile view (undergrad colleges only carry full intelligence profiles).
  if (selectedCollege && mode === "undergrad") {
    const college = COLLEGES.find((c) => c.id === selectedCollege);
    if (college) return <CollegeProfile college={college} />;
  }

  const savedCount = mode === "grad"
    ? GRAD_PROGRAMS.filter((p) => isSaved(p.id)).length
    : COLLEGES.filter((c) => isSaved(c.id)).length;

  return (
    <div className="animate-cosRise mx-auto max-w-[1100px] px-8 pb-12 pt-7">
      <PageHeader
        kicker="College Intelligence"
        title={mode === "grad" ? "Grad Programs" : "Undergrad Colleges"}
        sub={`${savedCount} saved · AI-ranked against your genetics + AI goal`}
      />

      {/* Tabs */}
      <div className="mb-5 inline-flex rounded-full border border-line bg-surface p-1">
        {(["undergrad", "grad"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="rounded-full px-4 py-1.5 text-[13px] font-semibold transition"
            style={
              mode === m
                ? { background: "var(--aB)", color: "#fff" }
                : { background: "transparent", color: "var(--muted)" }
            }
          >
            {m === "undergrad" ? "Undergrad Colleges" : "Grad Programs"}
          </button>
        ))}
      </div>

      {/* Undergrad callout — non-dismissible, always shown in undergrad mode */}
      {mode === "undergrad" && (
        <div
          className="mb-5 flex items-start gap-3.5 rounded-[14px] p-[16px_18px]"
          style={{ background: "var(--aBsoft)" }}
        >
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
            style={{ background: "var(--aB)", color: "#fff", letterSpacing: "0.04em" }}
          >
            AI
          </div>
          <p className="text-[14px] leading-[1.5] text-ink2">
            <strong className="text-ink">
              It doesn&apos;t matter where you go to undergrad, it matters where you go to grad.
            </strong>{" "}
            Save your money — anchor your undergrad search on value and affordability, and start
            building the record that gets you into a great graduate program.
          </p>
        </div>
      )}

      {/* List */}
      {mode === "undergrad" ? (
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {COLLEGES.map((c) => (
            <Card key={c.id} onClick={() => openCollege(c.id)}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-serif text-[19px] text-ink" style={{ fontWeight: 500 }}>
                    {c.name}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-muted">
                    {c.location} · {c.type}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex items-center gap-1 font-serif text-[22px]" style={{ color: "var(--aB)" }}>
                    <Sparkle size={15} />
                    {c.match}
                  </div>
                  <BandBadge band={c.band} color={c.bandColor} />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-ink2">
                <span>Accept: {c.accept}</span>
                <span>Size: {c.size}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { label: "Afford", v: c.affordScore, color: "var(--aA)" },
                  { label: "Academic", v: c.academicScore, color: "var(--aB)" },
                  { label: "Career", v: c.careerScore, color: "var(--gold)" },
                ].map((s) => (
                  <div key={s.label} className="rounded-[9px] bg-surface2 px-2.5 py-2">
                    <MonoLabel className="text-[9px]" style={{ color: "var(--muted)" }}>
                      {s.label}
                    </MonoLabel>
                    <div className="mt-0.5 font-serif text-[16px]" style={{ color: s.color }}>
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaved(c.id);
                }}
                className="mt-3 inline-flex items-center gap-1.5 rounded-[8px] border border-line px-3 py-1.5 text-[12.5px] font-semibold text-ink2"
              >
                <Bookmark size={14} />
                {isSaved(c.id) ? "Saved" : "Save"}
              </button>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {GRAD_PROGRAMS.map((p) => (
            <Card key={p.id}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-serif text-[17px] leading-tight text-ink" style={{ fontWeight: 500 }}>
                    {p.name}
                  </div>
                  <div className="mt-1 text-[12.5px] text-muted">
                    {p.location} · {p.type}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex items-center gap-1 font-serif text-[20px]" style={{ color: "var(--aB)" }}>
                    <Sparkle size={14} />
                    {p.match}
                  </div>
                  <BandBadge band={p.band} color={p.bandColor} />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-ink2">
                <span>Accept: {p.accept}</span>
                <span>Cohort: {p.size}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { label: "Afford", v: p.affordScore, color: "var(--aA)" },
                  { label: "Academic", v: p.academicScore, color: "var(--aB)" },
                  { label: "Career", v: p.careerScore, color: "var(--gold)" },
                ].map((s) => (
                  <div key={s.label} className="rounded-[9px] bg-surface2 px-2.5 py-2">
                    <MonoLabel className="text-[9px]" style={{ color: "var(--muted)" }}>
                      {s.label}
                    </MonoLabel>
                    <div className="mt-0.5 font-serif text-[16px]" style={{ color: s.color }}>
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => toggleSaved(p.id)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-[8px] border border-line px-3 py-1.5 text-[12.5px] font-semibold text-ink2"
              >
                <Bookmark size={14} />
                {isSaved(p.id) ? "Saved" : "Save"}
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
