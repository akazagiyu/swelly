"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { FaSearch, FaTimes } from 'react-icons/fa';

export type Command = {
  name: string;
  description: string;
  category: string; // dynamic categories (General, Configuration, Music, Playlist, Audio Effects, Spotify, etc.)
  usage?: string;
};

export default function CommandSearch({ commands }: { commands: Command[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const router = useRouter();
  const searchParams = useSearchParams();

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return commands.filter((c) => {
      const inCat = category === "All" || c.category === category;
      const inText =
        c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || (c.usage ?? "").toLowerCase().includes(q);
      return inCat && inText;
    });
  }, [commands, query, category]);

  const allCats = useMemo(() => Array.from(new Set(commands.map((c) => c.category))), [commands]);
  const categories = useMemo(() => ["All", ...allCats], [allCats]);

  const groups = useMemo(() => {
    const map = new Map<string, Command[]>();
    for (const c of filtered) {
      if (!map.has(c.category)) map.set(c.category, []);
      map.get(c.category)!.push(c);
    }
    const cats = Array.from(map.keys());
    return { cats, map };
  }, [filtered]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize from URL params
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const cat = searchParams.get("cat") ?? "All";
    if (q) setQuery(q);
    const allowed = new Set(["All", ...Array.from(new Set(commands.map((c) => c.category)))]);
    if (allowed.has(cat)) setCategory(cat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync to URL (shallow replace)
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "All") params.set("cat", category);
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "?");
  }, [query, category, router]);

  // Keyboard shortcut to focus search with '/'
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const isTyping = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || (t as any).isContentEditable);
      if (!isTyping && e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    inputRef.current?.focus();
  };

  const highlight = (text: string, q: string) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length);
    return (
      <>
        {before}
        <mark className="bg-yellow-500/30 text-white rounded px-0.5">{match}</mark>
        {after}
      </>
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6 sticky top-16 z-20 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5 p-3 rounded-md border border-white/6">
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

        {(query || category !== 'All') && (
          <button type="button" onClick={clearFilters} className="sm:ml-auto btn btn-outline">
            Clear filters
          </button>
        )}
      </div>

      <div className="text-sm text-white/60 mb-4" aria-live="polite">
        Showing {filtered.length} {filtered.length === 1 ? 'command' : 'commands'}
      </div>

      {filtered.length === 0 && (
        <div className="card">
          <div className="font-semibold">No commands found</div>
          <p className="text-sm text-white/70 mt-1">Try a different search or clear filters.</p>
          <div className="mt-3"><button className="btn btn-outline" onClick={clearFilters}>Clear filters</button></div>
        </div>
      )}
      {groups.cats.map((cat) => (
        (groups.map.get(cat)?.length ?? 0) === 0 ? null : (
          <section key={cat} className="mb-8" aria-labelledby={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}>
            <h2 id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`} className="text-xl font-semibold mb-3 flex items-center gap-2">
              {cat}
              <span className="text-xs text-white/50">({groups.map.get(cat)?.length})</span>
              {cat === 'Premium' && (
                <span className="text-[10px] uppercase tracking-wide bg-yellow-500/20 text-yellow-200 px-2 py-0.5 rounded">Premium</span>
              )}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map.get(cat)!.map((cmd, i) => (
                <ScrollCard key={cmd.name} index={i} href={`/commands/${cmd.name}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">/{highlight(cmd.name, query)}</h3>
                    <span className="text-xs text-white/50">{cmd.category}</span>
                  </div>
                  <p className="text-white/80 text-sm">{highlight(cmd.description, query)}</p>
                  {cmd.usage && (
                    <p className="text-xs text-white/50 mt-2">Usage: {highlight(cmd.usage, query)}</p>
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
  return (
    <ScrollReveal delay={index * 0.03}>
      <Link href={href} className="block" aria-label={`Open command ${href.split('/').pop()}`}>
        <div className="card hover:-translate-y-0.5 transition-transform" data-reveal-card>
          {children}
        </div>
      </Link>
    </ScrollReveal>
  );
}
