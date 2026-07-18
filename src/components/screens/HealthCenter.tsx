"use client";

import { Card, MonoLabel, PageHeader } from "../ui";
import { Lock } from "@/lib/icons";

const ITEMS = [
  { title: "Immunization records", note: "Most colleges require proof before move-in.", color: "var(--aA)" },
  { title: "Health insurance card", note: "Keep a copy for the campus health center.", color: "var(--aB)" },
  { title: "Physical / medical summary", note: "Upload once; share with schools as needed.", color: "var(--gold)" },
  { title: "Prescriptions & allergies", note: "So the right info is there in an emergency.", color: "var(--rose)" },
];

export default function HealthCenter() {
  return (
    <div className="animate-cosRise mx-auto max-w-[900px] px-8 pb-12 pt-7">
      <PageHeader
        kicker="Health Center"
        title="Your health paperwork, ready for college"
        sub="A private, passcode-protected place for the records colleges ask for."
      />

      <Card className="mb-5">
        <div className="flex items-center gap-2.5 text-[13.5px] text-ink2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: "var(--aBsoft)", color: "var(--aB)" }}
          >
            <Lock size={16} />
          </span>
          This section is private and stays on your device. Set a passcode in a future update to lock it.
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {ITEMS.map((i) => (
          <Card key={i.title}>
            <span className="mb-2 block h-1 w-8 rounded-full" style={{ background: i.color }} />
            <div className="font-serif text-[17px] text-ink" style={{ fontWeight: 500 }}>
              {i.title}
            </div>
            <p className="mt-1 text-[12.5px] leading-[1.5] text-ink2">{i.note}</p>
            <MonoLabel className="mt-3 text-[9.5px]" style={{ color: "var(--muted)" }}>
              No files yet
            </MonoLabel>
          </Card>
        ))}
      </div>
    </div>
  );
}
