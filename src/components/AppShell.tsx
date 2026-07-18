"use client";

import { StoreProvider, useStore } from "@/lib/store";
import Rail from "./Rail";
import Topbar from "./Topbar";
import CmdK from "./CmdK";
import Home from "./screens/Home";
import SearchScreen from "./screens/Search";
import Colleges from "./screens/Colleges";
import Planner from "./screens/Planner";
import ScholarshipsScreen from "./screens/Scholarships";
import Notebook from "./screens/Notebook";
import Analytics from "./screens/Analytics";
import SettingsScreen from "./screens/Settings";
import Financials from "./screens/Financials";
import WritingCoach from "./screens/WritingCoach";
import DeadlineRadar from "./screens/DeadlineRadar";
import Binder from "./screens/Binder";
import HealthCenter from "./screens/HealthCenter";
import Family from "./screens/Family";

function ActiveScreen() {
  const { screen } = useStore();
  switch (screen) {
    case "home":
      return <Home />;
    case "search":
      return <SearchScreen />;
    case "explore":
      return <Notebook />;
    case "colleges":
      return <Colleges />;
    case "planner":
      return <Planner />;
    case "scholarships":
      return <ScholarshipsScreen />;
    case "notebook":
      return <Notebook />;
    case "analytics":
      return <Analytics />;
    case "settings":
      return <SettingsScreen />;
    case "financials":
      return <Financials />;
    case "essays":
      return <WritingCoach />;
    case "deadlines":
      return <DeadlineRadar />;
    case "binder":
      return <Binder />;
    case "health":
      return <HealthCenter />;
    case "family":
      return <Family />;
    default:
      return <Home />;
  }
}

function Shell() {
  return (
    <div className="flex h-screen min-h-[640px] overflow-hidden bg-bg text-ink">
      <Rail />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <div className="cos-scroll flex-1 overflow-y-auto overflow-x-hidden">
          <ActiveScreen />
        </div>
      </div>
      <CmdK />
    </div>
  );
}

export default function AppShell() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
