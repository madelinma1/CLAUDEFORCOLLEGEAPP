"use client";

import { useStore } from "@/lib/store";
import type { Screen } from "@/lib/types";
import { STUDENT } from "@/lib/data";
import {
  Home,
  Binder,
  Search,
  Explore,
  Colleges,
  Planner,
  Financials,
  Scholarships,
  Health,
  Essays,
  Deadlines,
  Family,
  Settings,
  Sun,
  Moon,
} from "@/lib/icons";

type IconCmp = (p: { size?: number }) => React.JSX.Element;

// Analytics rail icon (bar chart) — inline to keep the icon set lean.
const Analytics: IconCmp = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6" />
  </svg>
);

const NAV: { id: Screen; label: string; Icon: IconCmp }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "binder", label: "Road to College", Icon: Binder },
  { id: "search", label: "AI Search", Icon: Search },
  { id: "explore", label: "Ask Anything", Icon: Explore },
  { id: "colleges", label: "Colleges", Icon: Colleges },
  { id: "planner", label: "Four-Year Planner", Icon: Planner },
  { id: "analytics", label: "Analytics", Icon: Analytics },
  { id: "financials", label: "Financials", Icon: Financials },
  { id: "scholarships", label: "Scholarships", Icon: Scholarships },
  { id: "health", label: "Health Center", Icon: Health },
  { id: "essays", label: "Writing Coach", Icon: Essays },
  { id: "deadlines", label: "Deadline Radar", Icon: Deadlines },
];

export default function Rail() {
  const { screen, setScreen, goHome, dark, toggleTheme } = useStore();

  function railStyle(active: boolean) {
    return {
      background: active ? "var(--aBsoft)" : "transparent",
      color: active ? "var(--aB)" : "var(--muted)",
    };
  }

  return (
    <div
      className="z-10 flex w-[194px] flex-shrink-0 flex-col border-r border-line px-3 py-4"
      style={{ background: "var(--surface2)" }}
    >
      {/* Logo */}
      <button
        onClick={goHome}
        className="mb-[18px] flex items-center gap-2.5 px-1.5 py-0.5"
      >
        <div
          className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[11px] font-serif text-[20px] text-white"
          style={{ background: "var(--aB)" }}
        >
          C
        </div>
        <div className="font-serif text-[19px] text-ink" style={{ letterSpacing: "-0.01em" }}>
          AI-COS
        </div>
      </button>

      {/* Nav */}
      <div className="rail-nav flex min-h-0 flex-1 flex-col gap-[3px] overflow-y-auto py-0.5">
        {NAV.map(({ id, label, Icon }) => {
          const active = screen === id;
          return (
            <button
              key={id}
              onClick={() => setScreen(id)}
              title={label}
              className="flex h-[42px] w-full flex-shrink-0 items-center gap-[11px] rounded-[11px] px-3 text-left text-[13.5px] font-semibold transition"
              style={railStyle(active)}
            >
              <span className="flex w-[22px] flex-shrink-0 items-center justify-center">
                <Icon size={20} />
              </span>
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom controls */}
      <div className="mt-2 flex flex-col gap-[3px]">
        <button
          onClick={() => setScreen("family")}
          title="Parent & counselor view"
          className="flex h-[42px] w-full items-center gap-[11px] rounded-[11px] px-3 text-left text-[13.5px] font-semibold transition"
          style={railStyle(screen === "family")}
        >
          <span className="flex w-[22px] flex-shrink-0 items-center justify-center">
            <Family size={20} />
          </span>
          <span className="truncate">Parent &amp; Counselor</span>
        </button>
        <button
          onClick={() => setScreen("settings")}
          title="Settings"
          className="flex h-[42px] w-full items-center gap-[11px] rounded-[11px] px-3 text-left text-[13.5px] font-semibold transition"
          style={railStyle(screen === "settings")}
        >
          <span className="flex w-[22px] flex-shrink-0 items-center justify-center">
            <Settings size={20} />
          </span>
          <span className="truncate">Settings</span>
        </button>
        <button
          onClick={toggleTheme}
          title="Toggle theme"
          className="flex h-[42px] w-full items-center gap-[11px] rounded-[11px] px-3 text-left text-[13.5px] font-semibold"
          style={{ background: "var(--surface)", color: "var(--ink2)" }}
        >
          <span className="flex w-[22px] flex-shrink-0 items-center justify-center">
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </span>
          <span className="truncate">Theme</span>
        </button>
      </div>

      {/* Avatar */}
      <div className="mt-2 flex items-center gap-2.5 border-t border-line px-2 pb-0.5 pt-3">
        <div
          className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full text-[12.5px] font-semibold text-white"
          style={{ background: "var(--aA)" }}
        >
          {STUDENT.initials}
        </div>
        <div className="min-w-0">
          <div className="truncate text-[13px] font-semibold text-ink">{STUDENT.fullName}</div>
          <div className="text-[10.5px] text-muted">Student</div>
        </div>
      </div>
    </div>
  );
}
