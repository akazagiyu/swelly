import fs from "node:fs";
import path from "node:path";
import type { Command } from "@/components/CommandSearch";

export interface CommandPermissions {
  user?: string[];
  bot?: string[];
  voice?: string[];
}

export interface CommandData extends Command {
  aliases?: string[];
  cooldown?: number;
  premiumOnly?: boolean;
  voteOnly?: boolean;
  djMode?: boolean;
  permissions?: CommandPermissions;
}

const fallback: Command[] = [
  { name: "play", description: "Play a song or playlist by URL or query.", category: "Music", usage: "/play <query>" },
];

export function getAllCommands(): Command[] {
  try {
    const p = path.join(process.cwd(), "public", "commands.json");
    const raw = fs.readFileSync(p, "utf-8");
    const data = JSON.parse(raw) as CommandData[];
    if (!Array.isArray(data)) throw new Error("Invalid commands.json shape");

    // Basic shape validation and deduplication by name (case-insensitive)
    const seen = new Set<string>();
    const cleaned: Command[] = [];
    for (const c of data) {
      if (!c || typeof c.name !== "string" || typeof c.description !== "string" || typeof c.category !== "string") continue;
      const key = c.name.trim().toLowerCase();
      if (key.length === 0 || seen.has(key)) continue;
      seen.add(key);
      
      const command: Command = {
        name: c.name.trim(),
        description: c.description.trim(),
        category: c.category.trim(),
        usage: typeof c.usage === "string" ? c.usage.trim() : undefined,
      };
      
      // Attach optional metadata
      if (c.aliases && Array.isArray(c.aliases)) {
        (command as CommandData).aliases = c.aliases.filter(a => typeof a === 'string');
      }
      if (typeof c.cooldown === 'number') {
        (command as CommandData).cooldown = c.cooldown;
      }
      if (typeof c.premiumOnly === 'boolean') {
        (command as CommandData).premiumOnly = c.premiumOnly;
      }
      if (typeof c.voteOnly === 'boolean') {
        (command as CommandData).voteOnly = c.voteOnly;
      }
      if (typeof c.djMode === 'boolean') {
        (command as CommandData).djMode = c.djMode;
      }
      if (c.permissions && typeof c.permissions === 'object') {
        (command as CommandData).permissions = c.permissions;
      }
      
      cleaned.push(command);
    }
    return cleaned.length ? cleaned : fallback;
  } catch {
    // ignore and use fallback
    return fallback;
  }
}
