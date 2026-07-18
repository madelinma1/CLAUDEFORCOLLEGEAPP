"use client";

import { useState } from "react";
import { complete, parseJson } from "@/lib/ai";
import { PROFILE } from "@/lib/data";
import { AiCard, Card, MonoLabel, PageHeader, Spinner } from "../ui";
import { Sparkle } from "@/lib/icons";

const ESSAYS = [
  { id: "ps", prompt: "The Common App personal statement — a story only you can tell.", target: 650 },
  { id: "why", prompt: "Why this college? What will you do with what you learn here?", target: 300 },
  { id: "activity", prompt: "Elaborate on an activity, experience, or achievement.", target: 150 },
];

export default function WritingCoach() {
  const [activeId, setActiveId] = useState("ps");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");
  const [fbLoading, setFbLoading] = useState(false);
  const [ideas, setIdeas] = useState<string[]>([]);
  const [ideasLoading, setIdeasLoading] = useState(false);

  const essay = ESSAYS.find((e) => e.id === activeId)!;
  const draft = drafts[activeId] || "";
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;

  async function getFeedback() {
    if (!draft.trim()) {
      setFeedback("Write a few sentences first, then I'll give you specific, encouraging feedback.");
      return;
    }
    setFbLoading(true);
    setFeedback("");
    setIdeas([]);
    const prompt = `You are AI-COS, a warm, specific college-essay coach for a HIGH SCHOOL student. ${PROFILE}\n\nEssay prompt: "${essay.prompt}" (target ~${essay.target} words).\nStudent draft:\n"""${draft.slice(0, 2000)}"""\n\nGive concise coaching in this shape, plain text, no markdown headers: 1) one sentence on what's working, 2) 3 specific, actionable suggestions as short bullets starting with "•", 3) one line on the strongest next revision to make. Be kind and concrete.`;
    const ans = await complete(prompt);
    setFbLoading(false);
    setFeedback(
      ans ||
        "What's working: your curiosity comes through clearly.\n• Anchor the opening in one concrete moment instead of a general statement.\n• Show the genetics + AI spark through a specific detail (a book, an experiment, a question).\n• Trim throat-clearing sentences so your voice arrives faster.\nStrongest next revision: rewrite the first two sentences as a single vivid scene.",
    );
  }

  async function brainstorm() {
    setIdeasLoading(true);
    setIdeas([]);
    setFeedback("");
    const prompt = `You are AI-COS helping a high school student brainstorm. ${PROFILE}\n\nEssay prompt: "${essay.prompt}". Suggest 4 distinct, personal angles this specific student could write about. Return ONLY minified JSON: {"ideas":["angle 1","angle 2","angle 3","angle 4"]}. Each angle one vivid sentence.`;
    const raw = await complete(prompt);
    const j = parseJson<{ ideas?: string[] }>(raw);
    setIdeasLoading(false);
    setIdeas(
      j && Array.isArray(j.ideas) && j.ideas.length
        ? j.ideas
        : [
            "The first time you realized biology could be read like code.",
            "A Scouting project that taught you to lead a team toward a hard goal.",
            "How CrossFit reframed failure as data you iterate on.",
            "A genetics question you couldn't stop thinking about — and what you did about it.",
          ],
    );
  }

  return (
    <div className="animate-cosRise mx-auto max-w-[900px] px-8 pb-12 pt-7">
      <PageHeader
        kicker="Writing Coach"
        title="Draft essays with an AI coach"
        sub="Pick a prompt, draft freely, and get specific, encouraging feedback."
      />

      {/* Prompt tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {ESSAYS.map((e) => (
          <button
            key={e.id}
            onClick={() => {
              setActiveId(e.id);
              setFeedback("");
              setIdeas([]);
            }}
            className="rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition"
            style={
              activeId === e.id
                ? { background: "var(--aB)", color: "#fff" }
                : { background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--line)" }
            }
          >
            {e.id === "ps" ? "Personal statement" : e.id === "why" ? "Why this college" : "Activity"}
          </button>
        ))}
      </div>

      <Card className="mb-4">
        <p className="mb-3 text-[13.5px] italic text-ink2">{essay.prompt}</p>
        <textarea
          value={draft}
          onChange={(e) => setDrafts((d) => ({ ...d, [activeId]: e.target.value }))}
          placeholder="Start writing…"
          rows={9}
          className="w-full resize-y rounded-[10px] border border-line bg-bg p-3.5 text-[14px] leading-[1.6] text-ink placeholder:text-muted"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[12px] text-muted">
            {words} / ~{essay.target} words
          </span>
          <div className="flex gap-2">
            <button
              onClick={brainstorm}
              className="inline-flex items-center gap-1.5 rounded-[8px] border border-line px-3 py-1.5 text-[12.5px] font-semibold text-ink2"
            >
              <Sparkle size={14} /> Brainstorm angles
            </button>
            <button
              onClick={getFeedback}
              className="inline-flex items-center gap-1.5 rounded-[8px] px-3.5 py-1.5 text-[12.5px] font-semibold text-white"
              style={{ background: "var(--aB)" }}
            >
              <Sparkle size={14} /> Get feedback
            </button>
          </div>
        </div>
      </Card>

      {ideasLoading && (
        <Card className="mb-4">
          <div className="flex items-center gap-2.5 text-[13px] text-muted">
            <Spinner size={14} /> Brainstorming angles for you…
          </div>
        </Card>
      )}
      {ideas.length > 0 && (
        <div className="mb-4">
          <AiCard label="Brainstormed angles">
            <ul className="flex flex-col gap-2">
              {ideas.map((it, i) => (
                <li key={i} className="flex gap-2 text-[13.5px] leading-[1.5] text-ink2">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: "var(--aB)" }} />
                  {it}
                </li>
              ))}
            </ul>
          </AiCard>
        </div>
      )}

      {fbLoading && (
        <Card>
          <div className="flex items-center gap-2.5 text-[13px] text-muted">
            <Spinner size={14} /> Reading your draft…
          </div>
        </Card>
      )}
      {feedback && !fbLoading && (
        <AiCard label="Coach feedback">
          <p className="whitespace-pre-wrap text-[14px] leading-[1.6] text-ink2">{feedback}</p>
        </AiCard>
      )}

      <MonoLabel className="mt-6 text-[9.5px]" style={{ color: "var(--muted)" }}>
        Drafts stay on this device. AI feedback is guidance, not a rewrite.
      </MonoLabel>
    </div>
  );
}
