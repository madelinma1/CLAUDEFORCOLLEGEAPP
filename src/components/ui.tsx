import type { ReactNode } from "react";
import type { BandColor } from "@/lib/types";
import { Sparkle } from "@/lib/icons";

/** Maps a band color token to its CSS variable + soft background. */
export const BAND_VARS: Record<BandColor, { fg: string; soft: string }> = {
  aA: { fg: "var(--aA)", soft: "var(--aAsoft)" },
  aB: { fg: "var(--aB)", soft: "var(--aBsoft)" },
  gold: { fg: "var(--gold)", soft: "var(--goldsoft)" },
  rose: { fg: "var(--rose)", soft: "var(--rosesoft)" },
};

/** Loading spinner using the cosSpin animation. */
export function Spinner({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-block animate-cosSpin rounded-full"
      style={{
        width: size,
        height: size,
        border: "2px solid var(--line)",
        borderTopColor: "var(--aB)",
      }}
      aria-label="Loading"
    />
  );
}

/** A descriptive AI loading row: spinner + copy. */
export function AiLoading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[13.5px] text-muted">
      <Spinner />
      <span>{label}</span>
    </div>
  );
}

/** ALL-CAPS IBM Plex Mono kicker/agent label. */
export function MonoLabel({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`font-mono uppercase ${className}`}
      style={{ letterSpacing: "0.1em", ...style }}
    >
      {children}
    </div>
  );
}

/** Rounded pill/chip. */
export function Pill({
  children,
  color = "var(--muted)",
  bg = "transparent",
  className = "",
}: {
  children: ReactNode;
  color?: string;
  bg?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] ${className}`}
      style={{ color, background: bg }}
    >
      {children}
    </span>
  );
}

/** The signature AI card: surface bg, 3px aB left border, "AI ✦" mono label. */
export function AiCard({
  label = "AI",
  children,
  className = "",
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex gap-3.5 rounded-[14px] border border-line bg-surface p-[18px_20px] shadow-cos ${className}`}
      style={{ borderLeft: "3px solid var(--aB)" }}
    >
      <div
        className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px]"
        style={{ background: "var(--aBsoft)", color: "var(--aB)" }}
      >
        <Sparkle size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <MonoLabel
          className="mb-1.5 text-[10px]"
          style={{ color: "var(--aB)", letterSpacing: "0.12em" }}
        >
          {label}
        </MonoLabel>
        {children}
      </div>
    </div>
  );
}

/** SVG donut ring. r=34, dasharray = pct/100 * 213.6 (per handoff). */
export function Donut({
  pct,
  color = "var(--aB)",
  size = 84,
  label,
}: {
  pct: number;
  color?: string;
  size?: number;
  label?: string;
}) {
  const r = 34;
  const circ = 2 * Math.PI * r; // ≈ 213.6
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 84 84">
      <circle cx="42" cy="42" r={r} fill="none" stroke="var(--line)" strokeWidth="7" />
      <circle
        cx="42"
        cy="42"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        transform="rotate(-90 42 42)"
      />
      <text
        x="42"
        y="42"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontFamily: "var(--font-newsreader), serif", fontSize: 21, fontWeight: 500, fill: "var(--ink)" }}
      >
        {label ?? `${pct}%`}
      </text>
    </svg>
  );
}

/** Horizontal 0–100 score bar with a colored fill. */
export function ScoreBar({
  label,
  value,
  color = "var(--aB)",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[13px] text-ink2">{label}</span>
        <span
          className="font-serif text-[15px]"
          style={{ color: "var(--ink)" }}
        >
          {value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

/** Reusable card container. */
export function Card({
  children,
  className = "",
  onClick,
  style,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-[14px] border border-line bg-surface p-[17px] shadow-cos ${
        onClick ? "cursor-pointer transition hover:-translate-y-0.5" : ""
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/** Band badge — Reach/Target/Likely/Safety pill in the band color. */
export function BandBadge({ band, color }: { band: string; color: BandColor }) {
  const v = BAND_VARS[color];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{ color: v.fg, background: v.soft }}
    >
      {band}
    </span>
  );
}

/** Page title kicker + serif heading block. */
export function PageHeader({
  kicker,
  title,
  sub,
  right,
}: {
  kicker?: string;
  title: string;
  sub?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3.5">
      <div>
        {kicker && (
          <MonoLabel className="mb-2 text-[10px]" style={{ color: "var(--muted)" }}>
            {kicker}
          </MonoLabel>
        )}
        <h2
          className="font-serif text-[30px] leading-[1.1] text-ink"
          style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
        >
          {title}
        </h2>
        {sub && <div className="mt-1.5 text-[13.5px] text-muted">{sub}</div>}
      </div>
      {right}
    </div>
  );
}
