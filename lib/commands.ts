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
    // basic shape validation
    if (Array.isArray(data)) {
      return data.filter(
        (c) => c && typeof c.name === "string" && typeof c.description === "string" && typeof c.category === "string"
      ) as Command[];
    }
  } catch {
    // ignore and use fallback
  }
  return fallback;
}
