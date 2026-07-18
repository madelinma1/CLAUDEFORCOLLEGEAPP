"use client";

import { useStore } from "@/lib/store";
import { Search, Bell, Sparkle } from "@/lib/icons";

export default function Topbar() {
  const { setScreen, setCmdkOpen } = useStore();

  return (
    <div
      className="flex flex-shrink-0 items-center gap-4 border-b border-line px-7 py-[15px]"
      style={{ background: "var(--surface)" }}
    >
      <button
        onClick={() => setScreen("search")}
        className="flex max-w-[560px] flex-1 cursor-text items-center gap-[11px] rounded-[11px] border border-line px-[15px] py-[11px] text-left"
        style={{ background: "var(--bg)" }}
      >
        <Search size={18} style={{ stroke: "var(--aB)" }} strokeWidth={1.8} />
        <span className="truncate text-[14px] text-muted">
          Ask AI-COS anything about your college journey…
        </span>
        <span className="ml-auto flex-shrink-0 rounded-[5px] border border-line px-[7px] py-[3px] font-mono text-[10px] text-muted">
          ⌘K
        </span>
      </button>

      <div className="ml-auto flex items-center gap-3.5">
        <button
          title="Inbox"
          className="relative flex h-10 w-10 items-center justify-center rounded-[10px] border border-line text-ink2"
          style={{ background: "var(--surface)" }}
        >
          <Bell size={19} />
          <span
            className="absolute right-[9px] top-2 h-2 w-2 rounded-full border-[1.5px]"
            style={{ background: "var(--rose)", borderColor: "var(--surface)" }}
          />
        </button>

        <div
          className="flex items-center gap-[7px] rounded-full px-3 py-[7px] font-mono text-[10.5px] uppercase"
          style={{ color: "var(--gold)", background: "var(--goldsoft)", letterSpacing: "0.06em" }}
        >
          <span className="h-[7px] w-[7px] rounded-full" style={{ background: "var(--gold)" }} />
          14-day streak
        </div>

        <button
          onClick={() => setCmdkOpen(true)}
          className="flex items-center gap-2 rounded-[10px] px-[15px] py-[9px] text-[13px] font-semibold text-white"
          style={{ background: "var(--aB)" }}
        >
          <Sparkle size={15} strokeWidth={1.8} />
          Ask AI
        </button>
      </div>
    </div>
  );
}
