"use client";

import { useStore } from "@/lib/store";
import { COLLEGES } from "@/lib/data";
import { AiCard, Card, MonoLabel, PageHeader } from "../ui";

const BUDGET = [
  { label: "Cost of attendance", value: 28, color: "var(--rose)" },
  { label: "Grants & scholarships", value: 15, color: "var(--aA)" },
  { label: "Family + savings", value: 10, color: "var(--aB)" },
  { label: "Work / earn", value: 2, color: "var(--gold)" },
];

export default function Financials() {
  const { isSaved } = useStore();
  const savedColleges = COLLEGES.filter((c) => isSaved(c.id));
  const compare = (savedColleges.length ? savedColleges : COLLEGES).slice(0, 4);

  return (
    <div className="animate-cosRise mx-auto max-w-[980px] px-8 pb-12 pt-7">
      <PageHeader
        kicker="Financials"
        title="Plan for cost, not just admission"
        sub="AI models net price against your in-state advantage and aid eligibility."
      />

      <div className="mb-5">
        <AiCard label="AI affordability read">
          <p className="text-[14.5px] leading-[1.55] text-ink2">
            Your biggest financial lever is <strong className="text-ink">North Carolina residency</strong>.
            In-state publics like UNC and NC State land near <strong className="text-ink">$11–12K/yr</strong>{" "}
            after aid — a fraction of out-of-state options. The private reaches (Duke, Harvard) can be
            cheaper still <em>if</em> admitted, thanks to no-loan aid. Anchor your budget on the in-state
            publics and treat everything else as upside.
          </p>
        </AiCard>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.2fr]">
        <Card>
          <MonoLabel className="mb-4 text-[10px]" style={{ color: "var(--muted)" }}>
            Estimated annual budget (in-state)
          </MonoLabel>
          <div className="flex flex-col gap-3">
            {BUDGET.map((b) => (
              <div key={b.label}>
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-[13px] text-ink2">{b.label}</span>
                  <span className="font-serif text-[15px] text-ink">${b.value}K</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(b.value / 28) * 100}%`, background: b.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-[10px] bg-surface2 p-3 text-[13px] text-ink2">
            Estimated gap to cover:{" "}
            <strong className="text-ink">~$1K/yr</strong> — well within reach with one mid-size
            scholarship.
          </div>
        </Card>

        <Card>
          <MonoLabel className="mb-4 text-[10px]" style={{ color: "var(--muted)" }}>
            Net price comparison
          </MonoLabel>
          <div className="flex flex-col gap-2.5">
            {compare.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-3 rounded-[10px] bg-surface2 px-3.5 py-2.5"
              >
                <div>
                  <div className="text-[13.5px] font-semibold text-ink">{c.name}</div>
                  <div className="text-[11.5px] text-muted">{c.aid}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-[16px]" style={{ color: "var(--aA)" }}>
                    {c.net.replace(/~|\s*est\..*/g, "").trim()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11.5px] text-muted">
            Estimates only — always run each school&apos;s official net price calculator.
          </p>
        </Card>
      </div>
    </div>
  );
}
