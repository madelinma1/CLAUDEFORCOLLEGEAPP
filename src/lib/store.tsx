"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Mode, Screen, NbMessage } from "./types";

const STORAGE_KEY = "cos_appstate_v1";

/** The persisted slice of app state. Ephemeral UI state (loading flags, live
 * search results, ⌘K open) is intentionally left out of persistence. */
interface PersistState {
  dark: boolean;
  mode: Mode;
  savedUG: Record<string, boolean>;
  savedGrad: Record<string, boolean>;
  tracker: Record<string, boolean>;
  insights: Record<string, string>;
  nbMessages: NbMessage[];
  sophomoreTasks: string[] | null;
  plannedDeadlines: Record<string, boolean>;
}

const DEFAULTS: PersistState = {
  dark: false,
  mode: "undergrad",
  savedUG: {},
  savedGrad: {},
  tracker: {},
  insights: {},
  nbMessages: [],
  sophomoreTasks: null,
  plannedDeadlines: {},
};

interface StoreValue extends PersistState {
  // ephemeral navigation
  screen: Screen;
  selectedCollege: string | null;
  cmdkOpen: boolean;
  // insight loading cache (not persisted)
  insightLoading: Record<string, boolean>;
  // actions
  setScreen: (s: Screen) => void;
  openCollege: (id: string) => void;
  goHome: () => void;
  setMode: (m: Mode) => void;
  toggleTheme: () => void;
  toggleSaved: (id: string) => void; // uses current mode
  isSaved: (id: string) => boolean;
  toggleTracker: (id: string) => void;
  setInsight: (key: string, text: string) => void;
  setInsightLoading: (key: string, v: boolean) => void;
  setCmdkOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  setNbMessages: (m: NbMessage[] | ((p: NbMessage[]) => NbMessage[])) => void;
  setSophomoreTasks: (t: string[] | null) => void;
  togglePlannedDeadline: (id: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistState>(DEFAULTS);
  const [screen, setScreenState] = useState<Screen>("home");
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [insightLoading, setInsightLoadingState] = useState<Record<string, boolean>>({});
  const loaded = useRef(false);

  // Load persisted state once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PersistState>;
        setState((s) => ({ ...s, ...parsed }));
      }
    } catch {
      /* ignore corrupt state */
    }
    loaded.current = true;
  }, []);

  // Persist whenever the durable slice changes (after initial load).
  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full / unavailable */
    }
  }, [state]);

  // Reflect theme onto <html data-theme>.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.dark ? "dark" : "light");
  }, [state.dark]);

  // Global ⌘K / Esc handling.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdkOpen((v) => !v);
      }
      if (e.key === "Escape") setCmdkOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const setScreen = useCallback((s: Screen) => {
    setScreenState(s);
    setSelectedCollege(null);
  }, []);

  const openCollege = useCallback((id: string) => {
    setScreenState("colleges");
    setSelectedCollege(id);
  }, []);

  const goHome = useCallback(() => {
    setScreenState("home");
    setSelectedCollege(null);
  }, []);

  const setMode = useCallback((m: Mode) => setState((s) => ({ ...s, mode: m })), []);
  const toggleTheme = useCallback(() => setState((s) => ({ ...s, dark: !s.dark })), []);

  const toggleSaved = useCallback((id: string) => {
    setState((s) => {
      const key = s.mode === "grad" ? "savedGrad" : "savedUG";
      const cur = s[key];
      return { ...s, [key]: { ...cur, [id]: !cur[id] } } as PersistState;
    });
  }, []);

  const isSaved = useCallback(
    (id: string) => {
      const map = state.mode === "grad" ? state.savedGrad : state.savedUG;
      return !!map[id];
    },
    [state.mode, state.savedGrad, state.savedUG],
  );

  const toggleTracker = useCallback((id: string) => {
    setState((s) => ({ ...s, tracker: { ...s.tracker, [id]: !s.tracker[id] } }));
  }, []);

  const setInsight = useCallback((key: string, text: string) => {
    setState((s) => ({ ...s, insights: { ...s.insights, [key]: text } }));
  }, []);

  const setInsightLoading = useCallback((key: string, v: boolean) => {
    setInsightLoadingState((s) => ({ ...s, [key]: v }));
  }, []);

  const setNbMessages = useCallback(
    (m: NbMessage[] | ((p: NbMessage[]) => NbMessage[])) => {
      setState((s) => ({
        ...s,
        nbMessages: typeof m === "function" ? m(s.nbMessages) : m,
      }));
    },
    [],
  );

  const setSophomoreTasks = useCallback((t: string[] | null) => {
    setState((s) => ({ ...s, sophomoreTasks: t }));
  }, []);

  const togglePlannedDeadline = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      plannedDeadlines: { ...s.plannedDeadlines, [id]: !s.plannedDeadlines[id] },
    }));
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      screen,
      selectedCollege,
      cmdkOpen,
      insightLoading,
      setScreen,
      openCollege,
      goHome,
      setMode,
      toggleTheme,
      toggleSaved,
      isSaved,
      toggleTracker,
      setInsight,
      setInsightLoading,
      setCmdkOpen,
      setNbMessages,
      setSophomoreTasks,
      togglePlannedDeadline,
    }),
    [
      state,
      screen,
      selectedCollege,
      cmdkOpen,
      insightLoading,
      setScreen,
      openCollege,
      goHome,
      setMode,
      toggleTheme,
      toggleSaved,
      isSaved,
      toggleTracker,
      setInsight,
      setInsightLoading,
      setNbMessages,
      setSophomoreTasks,
      togglePlannedDeadline,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
