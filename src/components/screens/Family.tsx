"use client";

import { useState } from "react";
import { STUDENT } from "@/lib/data";
import { AiCard, Card, MonoLabel, PageHeader } from "../ui";

const HIGHLIGHTS = [
  { label: "On-track this year", value: "4 of 6 foundations complete", color: "var(--aA)" },
  { label: "Colleges shortlisted", value: "9 saved · in-state anchors set", color: "var(--aB)" },
  { label: "Scholarships tracked", value: "$148K potential in the pipeline", color: "var(--gold)" },
  { label: "Next deadline", value: "UNC Early Action · Oct 15, 2029", color: "var(--rose)" },
];

export default function Family() {
  const [shared, setShared] = useState(false);

  return (
    <div className="animate-cosRise mx-auto max-w-[900px] px-8 pb-12 pt-7">
      <PageHeader
        kicker="Parent & Counselor"
        title="A shared view of the plan"
        sub="Give a parent or counselor a clear, read-only picture — no account required."
      />

      <div className="mb-5">
        <AiCard label="AI summary for family">
          <p className="text-[14.5px] leading-[1.55] text-ink2">
            {STUDENT.firstName} is a rising freshman building strong foundations toward a genetics +
            AI research goal. The plan is anchored on affordable in-state options (UNC, NC State) with
            a few well-chosen reaches. The single highest-leverage step this year is early lab
            exposure — everything else supports that.
          </p>
        </AiCard>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {HIGHLIGHTS.map((h) => (
          <Card key={h.label}>
            <MonoLabel className="mb-1 text-[9.5px]" style={{ color: h.color }}>
              {h.label}
            </MonoLabel>
            <div className="text-[14.5px] text-ink2">{h.value}</div>
          </Card>
        ))}
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[14px] font-semibold text-ink">Share a read-only link</div>
          <p className="text-[12.5px] text-muted">
            {shared ? "Sharing is on — anyone with the link can view this summary." : "Sharing is off."}
          </p>
        </div>
        <button
          onClick={() => setShared((v) => !v)}
          className="rounded-[9px] px-4 py-2 text-[13px] font-semibold"
          style={
            shared
              ? { background: "var(--aA)", color: "#fff" }
              : { background: "var(--aB)", color: "#fff" }
          }
        >
          {shared ? "Sharing on" : "Turn on sharing"}
        </button>
      </Card>
    </div>
  );
}
