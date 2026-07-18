"use client";

import { useStore } from "@/lib/store";
import { Card, MonoLabel, PageHeader } from "../ui";
import { Check } from "@/lib/icons";

const DEADLINES = [
  { id: "d_unc_ea", label: "UNC Chapel Hill — Early Action", date: "Oct 15, 2029", kind: "Application", color: "var(--aB)" },
  { id: "d_ncstate_ea", label: "NC State — Early Action", date: "Nov 1, 2029", kind: "Application", color: "var(--aB)" },
  { id: "d_gleaf", label: "Golden LEAF Scholarship", date: "Feb 2030", kind: "Scholarship", color: "var(--gold)" },
  { id: "d_fafsa", label: "FAFSA opens", date: "Oct 1, 2029", kind: "Financial aid", color: "var(--aA)" },
  { id: "d_psat", label: "PSAT/NMSQT", date: "Oct 2028", kind: "Testing", color: "var(--rose)" },
  { id: "d_summer", label: "Summer research program apps", date: "Feb 2027", kind: "Research", color: "var(--aA)" },
];

const AUTO_JOBS = [
  { key: "track", label: "Track new deadlines automatically" },
  { key: "reqs", label: "Detect missing application requirements" },
  { key: "readiness", label: "Recompute readiness as deadlines approach" },
];

export default function DeadlineRadar() {
  const { plannedDeadlines, togglePlannedDeadline } = useStore();

  return (
    <div className="animate-cosRise mx-auto max-w-[900px] px-8 pb-12 pt-7">
      <PageHeader
        kicker="Deadline Radar"
        title="Every deadline, tracked ahead of time"
        sub="AI watches your timeline and surfaces what's next. Add any item to your plan."
      />

      <Card className="mb-5">
        <MonoLabel className="mb-3 text-[10px]" style={{ color: "var(--aB)" }}>
          Automation
        </MonoLabel>
        <div className="flex flex-col gap-2.5">
          {AUTO_JOBS.map((j) => (
            <div key={j.key} className="flex items-center gap-2.5 text-[13.5px] text-ink2">
              <span
                className="flex h-[18px] w-[18px] items-center justify-center rounded-full"
                style={{ background: "var(--aAsoft)", color: "var(--aA)" }}
              >
                <Check size={12} />
              </span>
              {j.label}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-2.5">
        {DEADLINES.map((d) => {
          const planned = !!plannedDeadlines[d.id];
          return (
            <Card key={d.id}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-1 rounded-full" style={{ background: d.color }} />
                  <div>
                    <div className="text-[14.5px] font-semibold text-ink">{d.label}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-[12px] text-muted">
                      <MonoLabel className="text-[9.5px]" style={{ color: d.color }}>
                        {d.kind}
                      </MonoLabel>
                      <span>·</span>
                      <span>{d.date}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => togglePlannedDeadline(d.id)}
                  className="rounded-[8px] px-3 py-1.5 text-[12.5px] font-semibold"
                  style={
                    planned
                      ? { background: "var(--aA)", color: "#fff" }
                      : { border: "1px solid var(--line)", color: "var(--ink2)" }
                  }
                >
                  {planned ? "In plan" : "Add to plan"}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
