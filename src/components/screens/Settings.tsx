"use client";

import { useStore } from "@/lib/store";
import { STUDENT } from "@/lib/data";
import { Card, MonoLabel, PageHeader } from "../ui";

export default function SettingsScreen() {
  const { mode, setMode, dark, toggleTheme } = useStore();

  return (
    <div className="animate-cosRise mx-auto max-w-[820px] px-8 pb-12 pt-7">
      <PageHeader kicker="Settings" title="Preferences" sub="Your profile, mode, and appearance." />

      {/* Mode toggle — persisted to localStorage; swaps mode-aware screens */}
      <Card className="mb-4">
        <MonoLabel className="mb-1 text-[10px]" style={{ color: "var(--aB)" }}>
          Application mode
        </MonoLabel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-[420px] text-[13px] text-ink2">
            One account serves both undergraduate and graduate-school journeys. Switching modes
            swaps mode-aware screens and keeps a separate saved list for each — your data in either
            mode is never lost.
          </p>
          <div className="inline-flex rounded-full border border-line bg-surface2 p-1">
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
                {m === "undergrad" ? "Undergrad" : "Grad"}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card className="mb-4">
        <MonoLabel className="mb-1 text-[10px]" style={{ color: "var(--muted)" }}>
          Appearance
        </MonoLabel>
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-ink2">Theme</p>
          <button
            onClick={toggleTheme}
            className="rounded-full border border-line px-4 py-1.5 text-[13px] font-semibold text-ink2"
          >
            {dark ? "Dark" : "Light"} — switch to {dark ? "light" : "dark"}
          </button>
        </div>
      </Card>

      {/* Profile (read-only summary) */}
      <Card>
        <MonoLabel className="mb-3 text-[10px]" style={{ color: "var(--muted)" }}>
          Profile
        </MonoLabel>
        <Row label="Name" value={STUDENT.fullName} />
        <Row label="Class" value={STUDENT.classLine} />
        <Row label="Home state" value="North Carolina (in-state)" />
        <Row label="Goal" value="Biomedical AI researcher (genetics + machine learning)" />
        <Row label="Activities" value="Volleyball · Scouting America · CrossFit" />
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2 last:border-0">
      <span className="text-[12.5px] text-muted">{label}</span>
      <span className="text-right text-[13px] text-ink2">{value}</span>
    </div>
  );
}
