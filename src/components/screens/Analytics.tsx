"use client";

import { useStore } from "@/lib/store";
import { complete } from "@/lib/ai";
import { PROFILE, PREDICTIONS, FALLBACK_INSIGHT } from "@/lib/data";
import { Card, Donut, MonoLabel, PageHeader, Spinner } from "../ui";
import { Sparkle } from "@/lib/icons";

const COLORS = ["var(--aB)", "var(--gold)", "var(--aA)", "var(--rose)", "var(--aB)", "var(--gold)"];

export default function Analytics() {
  const { insights, insightLoading, setInsight, setInsightLoading } = useStore();

  async function explain(key: string, label: string, reason: string) {
    const k = `pred_${key}`;
    if (insights[k] || insightLoading[k]) return;
    setInsightLoading(k, true);
    const raw = await complete(
      `You are AI-COS, a success predictor. ${PROFILE}\n\nExplain in 2-3 concise sentences the "${label}" prediction (current reasoning: ${reason}) and the single highest-leverage action to raise it. Respond in plain prose.`,
    );
    setInsight(k, raw || FALLBACK_INSIGHT);
    setInsightLoading(k, false);
  }

  return (
    <div className="animate-cosRise mx-auto max-w-[1000px] px-8 pb-12 pt-7">
      <PageHeader
        kicker="Predictive Analytics"
        title="Success predictor"
        sub="Model-based readiness across admission, scholarships, research, and career."
      />

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        {PREDICTIONS.map((p, i) => {
          const k = `pred_${p.key}`;
          const pct = parseInt(p.value, 10) || 0;
          return (
            <Card key={p.key}>
              <div className="flex items-start gap-3.5">
                <Donut pct={pct} color={COLORS[i % COLORS.length]} size={76} label={p.value} />
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-[17px] text-ink" style={{ fontWeight: 500 }}>
                    {p.label}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11.5px] text-muted">
                    <span>Confidence {p.confidence}</span>
                    <span style={{ color: "var(--aA)" }}>{p.trend}</span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-[1.45] text-ink2">{p.reason}</p>
                </div>
              </div>

              <button
                onClick={() => explain(p.key, p.label, p.reason)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-[8px] border border-line px-3 py-1.5 text-[12px] font-semibold text-ink2"
              >
                <Sparkle size={13} /> Ask AI to explain
              </button>

              {(insightLoading[k] || insights[k]) && (
                <div
                  className="mt-3 rounded-[10px] p-3"
                  style={{ background: "var(--aBsoft)", borderLeft: "3px solid var(--aB)" }}
                >
                  {insightLoading[k] ? (
                    <div className="flex items-center gap-2.5 text-[13px] text-muted">
                      <Spinner size={14} /> Explaining the model…
                    </div>
                  ) : (
                    <>
                      <MonoLabel className="mb-1 text-[9.5px]" style={{ color: "var(--aB)" }}>
                        AI explanation
                      </MonoLabel>
                      <p className="text-[13px] leading-[1.5] text-ink2">{insights[k]}</p>
                    </>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
