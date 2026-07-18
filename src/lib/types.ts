export type Band = "Reach" | "Target" | "Likely" | "Safety";

export type BandColor = "aA" | "aB" | "gold" | "rose";

export interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  size: string;
  accept: string;
  sat: string;
  deadline: string;
  match: number;
  band: Band;
  bandColor: BandColor;
  summary: string;
  tuition: string;
  net: string;
  aid: string;
  admitScore: number;
  affordScore: number;
  academicScore: number;
  campusScore: number;
  careerScore: number;
  majors: string[];
  research: string;
  gradRate: string;
  salary: string;
  employers: string[];
  pros: string[];
  cons: string[];
  risks: string[];
  actions: string[];
}

export interface GradProgram {
  id: string;
  name: string;
  location: string;
  type: string;
  size: string;
  accept: string;
  match: number;
  band: Band;
  bandColor: BandColor;
  affordScore: number;
  academicScore: number;
  careerScore: number;
}

export interface Scholarship {
  id: string;
  name: string;
  amount: string;
  deadline: string;
  match: number;
  tag: string;
  soon: boolean;
  note: string;
}

export interface Prediction {
  key: string;
  label: string;
  value: string;
  confidence: string;
  trend: string;
  reason: string;
}

export interface SearchResult {
  type: string;
  name: string;
  meta: string;
  match: number | string;
  note: string;
}

export interface SearchPayload {
  summary: string;
  results: SearchResult[];
  actions: string[];
}

export interface NbMessage {
  role: "user" | "ai";
  text: string;
}

export type Mode = "undergrad" | "grad";

export type Screen =
  | "home"
  | "search"
  | "explore"
  | "colleges"
  | "planner"
  | "scholarships"
  | "notebook"
  | "analytics"
  | "settings"
  | "binder"
  | "financials"
  | "health"
  | "essays"
  | "deadlines"
  | "family";
