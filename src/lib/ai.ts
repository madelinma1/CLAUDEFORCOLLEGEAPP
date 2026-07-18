/**
 * Client-side AI helpers. `complete()` mirrors the prototype's
 * `window.claude.complete(prompt)` — it returns the model's text, or null when
 * the AI is unavailable, so every caller can fall back to a deterministic
 * built-in answer.
 */
export async function complete(prompt: string): Promise<string | null> {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { text: string | null };
    return data.text ?? null;
  } catch {
    return null;
  }
}

/** Lenient JSON extraction for structured-output prompts (search, plan regen). */
export function parseJson<T = unknown>(text: string | null): T | null {
  if (!text) return null;
  try {
    let s = String(text).trim();
    s = s.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    const a = s.indexOf("{");
    const b = s.lastIndexOf("}");
    if (a >= 0 && b > a) s = s.slice(a, b + 1);
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}
