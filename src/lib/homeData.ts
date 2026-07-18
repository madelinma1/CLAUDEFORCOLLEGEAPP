import type { BandColor } from "./types";

export { AGENTS_AT_WORK } from "./data";

/** Home recommendation feed — ids map to COLLEGES so cards route to profiles. */
export const FALLBACK_RECS_UG: {
  id?: string;
  name: string;
  location: string;
  band: string;
  bandColor: BandColor;
  fit: number;
  reason: string;
}[] = [
  {
    id: "unc",
    name: "UNC Chapel Hill",
    location: "Chapel Hill, NC",
    band: "Target",
    bandColor: "aB",
    fit: 90,
    reason:
      "Top-tier genetics program with generous in-state aid and undergrads placed in labs early — a sharp match for your genomics + AI goal.",
  },
  {
    id: "ncstate",
    name: "NC State",
    location: "Raleigh, NC",
    band: "Likely",
    bandColor: "aA",
    fit: 88,
    reason:
      "Your most affordable in-state pick: a rare standalone Genetics B.S. plus a top bioinformatics center at the resident price.",
  },
  {
    id: "ucsd",
    name: "UC San Diego",
    location: "La Jolla, CA",
    band: "Target",
    bandColor: "aB",
    fit: 84,
    reason:
      "A bioinformatics powerhouse with deep CS-and-biology crossover, ideal for fusing machine learning with genetics.",
  },
];
