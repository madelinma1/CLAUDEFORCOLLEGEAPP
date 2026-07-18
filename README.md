# AI-COS — AI College Operating System

An AI-first web app that acts as a student's personal college strategist,
admissions consultant, academic advisor, scholarship expert, career coach, and
research mentor — from middle school through college. The defining principle:
**AI performs the planning workload**; the human sets goals, reviews
recommendations, and approves actions. The product feels like an *operating
system* with AI woven into every surface.

This repository is a faithful implementation of the **"Mission Control"** design
direction from the design handoff, built in the target production stack.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmadelinma1%2Fclaudeforcollegeapp&env=ANTHROPIC_API_KEY&envDescription=Optional%20%E2%80%94%20enables%20live%20Claude%20answers.%20Leave%20blank%20to%20use%20built-in%20offline%20fallbacks.&project-name=ai-cos&repository-name=ai-cos)

One click deploys AI-COS to Vercel (any Vercel account works — it's independent
of the repo owner). Framework auto-detects as Next.js; no extra config needed.

- **`ANTHROPIC_API_KEY`** is optional. Set it for live Claude responses; leave it
  blank and every AI surface falls back to its built-in offline answer.
- The button deploys the repository's **default branch**, so merge this work to
  the default branch first — or use [vercel.com/new](https://vercel.com/new)
  → *Import* and pick the `claude/design-implementation-tv44c8` branch manually.

## Stack

- **Framework:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS with design tokens exposed as CSS custom properties
  (full light + dark palettes from the handoff)
- **Fonts:** Newsreader (display), Hanken Grotesk (UI), IBM Plex Mono (system/AI labels)
- **AI layer:** a single `/api/ai` route that forwards to Anthropic's Claude.
  This is the seam where a production multi-agent orchestrator + RAG + vector
  store would live.

## Getting started

```bash
npm install
cp .env.example .env        # add ANTHROPIC_API_KEY to enable live AI (optional)
npm run dev                 # http://localhost:3000
```

The app is fully usable **without** an API key: every AI surface ships with a
deterministic fallback, so the UI degrades gracefully when the model is offline.
Add `ANTHROPIC_API_KEY` to `.env` to wire in live Claude responses.

## What's implemented

**App shell (persistent chrome)**
- Left rail navigation, topbar with a click-to-search field + "Ask AI" button
- Global **⌘K / Ctrl+K** command assistant (idle suggestions → spinner → answer)
- Light/dark theme toggle, persisted to `localStorage`
- `cosRise` entrance animation and `cosPulse` live-status dots

**Screens**
1. **Home** — AI morning briefing, four readiness rings, recommendation feed,
   four-year path, and live "agents at work" panel
2. **AI Search** — natural-language query → AI summary + ranked results + next
   actions (strict-JSON prompt with a deterministic fallback)
3. **Ask Anything / Notebook** — chat command center that turns conversation
   into plans (persisted message history)
4. **Colleges** — Undergrad ↔ Grad tabs with **separate saved lists per mode**,
   the non-dismissible undergrad value callout, college cards, and a full
   **College Intelligence Profile** (AI overview, 5 score bars, 2×2 intelligence
   sections, strengths/trade-offs/risks, "Ask AI: why for me?", next steps)
5. **Four-Year Planner** — AI-managed roadmap with a live **Regenerate** action
   for the current year
6. **Scholarships** — functional filters, Track toggle, and live "Why I match"
7. **Analytics** — six prediction cards with donuts and "Ask AI to explain"
8. **Settings** — the Undergrad/Grad **mode toggle** (persisted to `localStorage`)
9. Additional surfaces: **Financials**, **Writing Coach** (live essay feedback +
   brainstorming), **Deadline Radar**, **Road to College Binder**, **Health
   Center**, and **Parent & Counselor** view

## Architecture notes

- `src/lib/store.tsx` — a persisted React context holding durable state (theme,
  mode, saved lists per mode, scholarship tracker, insight cache, notebook
  history, planner tasks). Ephemeral UI state stays local to each screen.
- `src/lib/data.ts` — sample data (colleges, grad programs, scholarships,
  predictions, profile, fallbacks). In production these become DB/RAG-backed
  records.
- `src/lib/ai.ts` + `src/app/api/ai/route.ts` — the AI seam. Prompts and JSON
  shapes mirror the design handoff exactly; each call site keeps a fallback.
- `src/lib/icons.tsx` — inline SVG icon set (no emoji); the 4-point Sparkle
  marks AI moments throughout.

## Production roadmap (per spec, not yet built)

- Multi-agent AI layer (Admissions Advisor, Academic Planner, Scholarship
  Strategist, Career Coach, Research Assistant, Writing Coach, Success
  Predictor) behind an orchestrator
- RAG grounding over a vector store, returning sources alongside summaries
- Postgres + Prisma persistence (replacing `localStorage`) and Next.js
  per-screen routes (`/`, `/search`, `/colleges/[id]`, …)
- Background automation for deadlines, readiness recomputation, and the daily
  briefing
