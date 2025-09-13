"use client";
import { useMemo, useRef, useState } from "react";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { FaSearch, FaTimes } from 'react-icons/fa';

export type Command = {
  name: string;
  description: string;
  category: "Music" | "Filters" | "Utility" | "Premium";
  usage?: string;
};

export default function CommandSearch({ commands }: { commands: Command[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = ["All", "Music", "Filters", "Utility", "Premium"];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return commands.filter((c) => {
      const inCat = category === "All" || c.category === (category as Command["category"]);
      const inText =
        c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
      return inCat && inText;
    });
  }, [commands, query, category]);

  const groups = useMemo(() => {
    const cats = ["Music", "Filters", "Utility", "Premium"] as const;
    const map: Record<(typeof cats)[number], Command[]> = {
      Music: [], Filters: [], Utility: [], Premium: [],
    };
    for (const c of filtered) map[c.category].push(c);
    return { cats, map };
  }, [filtered]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <label htmlFor="cmd-search" className="sr-only">Search commands</label>
        <div className="w-full sm:flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"><FaSearch /></div>
          <input
            id="cmd-search"
            ref={inputRef}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/6 rounded-md px-10 py-2 outline-none text-sm text-white transition focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search commands"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/90 focus:outline-none"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <label htmlFor="cmd-category" className="sr-only">Filter category</label>
        <select
          id="cmd-category"
          className="sm:w-48 bg-white/5 backdrop-blur-sm border border-white/6 rounded-md px-3 py-2 text-sm text-white transition focus:ring-2 focus:ring-primary focus:border-transparent"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((c) => (
            <option key={c} value={c} className="text-black bg-white">{c}</option>
          ))}
        </select>
      </div>
      {groups.cats.map((cat) => (
        groups.map[cat].length === 0 ? null : (
          <section key={cat} className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{cat}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map[cat].map((cmd, i) => (
                <ScrollCard key={cmd.name} index={i} href={`/commands/${cmd.name}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">/{cmd.name}</h3>
                    <span className="text-xs text-white/50">{cmd.category}</span>
                  </div>
                  <p className="text-white/80 text-sm">{cmd.description}</p>
                  {cmd.usage && (
                    <p className="text-xs text-white/50 mt-2">Usage: {cmd.usage}</p>
                  )}
                </ScrollCard>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
}

function ScrollCard({ href, children, index }: { href: string; children: React.ReactNode; index: number }) {
  // Lazy import to avoid top-level client boundary if this file is server by default
  // This component is client-only by nature due to use of motion wrapper below.
  // eslint-disable-next-line @next/next/no-html-link-for-pages
  return (
    <ScrollReveal delay={index * 0.03}>
      <a href={href} className="block" aria-label={`Open command ${href.split('/').pop()}`}>
        <div className="card hover:-translate-y-0.5 transition-transform" data-reveal-card>
          {children}
        </div>
      </a>
    </ScrollReveal>
  );
}
