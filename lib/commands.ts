import fs from "node:fs";
import path from "node:path";
import type { Command } from "@/components/CommandSearch";

const fallback: Command[] = [
  { name: "play", description: "Play a song or playlist by URL or query.", category: "Music", usage: "/play <query>" },
];

export function getAllCommands(): Command[] {
  try {
    const p = path.join(process.cwd(), "public", "commands.json");
    const raw = fs.readFileSync(p, "utf-8");
    const data = JSON.parse(raw) as Command[];
    if (!Array.isArray(data)) throw new Error("Invalid commands.json shape");

    // Basic shape validation and deduplication by name (case-insensitive)
    const seen = new Set<string>();
    const cleaned: Command[] = [];
    for (const c of data) {
      if (!c || typeof c.name !== "string" || typeof c.description !== "string" || typeof c.category !== "string") continue;
      const key = c.name.trim().toLowerCase();
      if (key.length === 0 || seen.has(key)) continue;
      seen.add(key);
      cleaned.push({
        name: c.name.trim(),
        description: c.description.trim(),
        category: c.category.trim(),
        usage: typeof c.usage === "string" ? c.usage.trim() : undefined,
      });
    }
    return cleaned.length ? cleaned : fallback;
  } catch {
    // ignore and use fallback
    return fallback;
  }
}
