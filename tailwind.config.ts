import type { Config } from "tailwindcss";

/**
 * Design tokens are exposed as CSS custom properties (see globals.css) so the
 * light/dark themes can be swapped at runtime by re-setting variables on :root.
 * Tailwind maps them here so utilities like `bg-surface` or `text-ink2` work.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface2)",
        ink: "var(--ink)",
        ink2: "var(--ink2)",
        muted: "var(--muted)",
        line: "var(--line)",
        hair: "var(--hair)",
        aA: "var(--aA)",
        aAsoft: "var(--aAsoft)",
        aB: "var(--aB)",
        aBsoft: "var(--aBsoft)",
        gold: "var(--gold)",
        goldsoft: "var(--goldsoft)",
        rose: "var(--rose)",
        rosesoft: "var(--rosesoft)",
      },
      fontFamily: {
        serif: ["var(--font-newsreader)", "Newsreader", "serif"],
        sans: ["var(--font-hanken)", "Hanken Grotesk", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        cos: "var(--shadow)",
      },
      keyframes: {
        cosPulse: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        cosSpin: {
          to: { transform: "rotate(360deg)" },
        },
        cosRise: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        cosPulse: "cosPulse 1.8s infinite",
        cosSpin: "cosSpin 0.7s linear infinite",
        cosRise: "cosRise 0.4s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
