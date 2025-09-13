import fs from "node:fs";
import path from "node:path";

export type FAQItem = { q: string; a: string };

const fallback: FAQItem[] = [
  { q: "How do I invite Swelly?", a: "Go to the Invite page and click 'Invite'." },
];

export function getFAQ(): FAQItem[] {
  try {
    const p = path.join(process.cwd(), "public", "faq.json");
    const raw = fs.readFileSync(p, "utf-8");
    const data = JSON.parse(raw) as FAQItem[];
    if (Array.isArray(data)) {
      return data.filter((i) => i && typeof i.q === "string" && typeof i.a === "string");
    }
  } catch {
    // ignore
  }
  return fallback;
}
