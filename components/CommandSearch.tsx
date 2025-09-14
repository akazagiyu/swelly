"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { FaSearch, FaTimes } from 'react-icons/fa';
import Fuse from "fuse.js";

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

  // Debounce query for smoother typing
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 150);
    return () => clearTimeout(id);
  }, [query]);

  type MatchRanges = { name?: [number, number][]; description?: [number, number][]; usage?: [number, number][] };
  const { filtered, matchMap } = useMemo(() => {
    const inCategory = (c: Command) => category === "All" || c.category === category;
    const q = debouncedQuery.trim();
    if (!q) {
      return { filtered: commands.filter(inCategory), matchMap: new Map<string, MatchRanges>() };
    }
    const fuse = new Fuse(commands, {
      keys: [
        { name: 'name', weight: 0.6 },
        { name: 'description', weight: 0.3 },
        { name: 'usage', weight: 0.1 },
      ],
      threshold: 0.38,
      ignoreLocation: true,
      minMatchCharLength: 2,
      includeMatches: true,
    });
    const results = fuse.search(q);
    const m = new Map<string, MatchRanges>();
    for (const r of results) {
      const name = r.item.name;
      if (r.matches) {
        const store: MatchRanges = {};
        for (const mt of r.matches) {
          const key = mt.key as 'name' | 'description' | 'usage';
          const ranges = (mt.indices as [number, number][]) ?? [];
          if (ranges.length) {
            (store as Record<'name' | 'description' | 'usage', [number, number][] | undefined>)[key] = ranges;
          }
        }
        if (Object.keys(store).length) m.set(name, store);
      }
    }
    const items = results.map(r => r.item).filter(inCategory);
    return { filtered: items, matchMap: m };
  }, [commands, debouncedQuery, category]);

  const allCats = useMemo(() => {
    const desiredOrder = ["General", "Configuration", "Music", "Playlist", "Audio Effects", "Spotify", "Utility", "Premium"];
    const uniq = Array.from(new Set(commands.map((c) => c.category)));
    const rank = (x: string) => {
      const i = desiredOrder.indexOf(x);
      return i === -1 ? 1000 : i;
    };
    return uniq.sort((a, b) => {
      const ra = rank(a), rb = rank(b);
      if (ra !== rb) return ra - rb;
      return a.localeCompare(b);
    });
  }, [commands]);
  const categories = useMemo(() => ["All", ...allCats], [allCats]);

  const catCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of commands) m.set(c.category, (m.get(c.category) ?? 0) + 1);
    return m;
  }, [commands]);

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

  // Sync to URL (shallow replace) using debounced query
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (category !== "All") params.set("cat", category);
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "?");
  }, [debouncedQuery, category, router]);

  // Keyboard shortcut to focus search with '/'
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
  const isTyping = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || (typeof (t as HTMLElement).isContentEditable === 'boolean' && (t as HTMLElement).isContentEditable));
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

  // Render highlighting using Fuse match ranges; fallback to naive highlighting with debounced query
  const renderHighlighted = (text: string, ranges?: [number, number][]) => {
    if (ranges && ranges.length) {
      // merge and render
      const merged = [...ranges].sort((a, b) => a[0] - b[0]);
      const out: React.ReactNode[] = [];
      let last = 0;
      for (const [start, end] of merged) {
        if (start > last) out.push(text.slice(last, start));
        out.push(<mark key={`${start}-${end}`} className="bg-yellow-500/30 text-white rounded px-0.5">{text.slice(start, end + 1)}</mark>);
        last = end + 1;
      }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
    }
    const q = debouncedQuery.trim();
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-yellow-500/30 text-white rounded px-0.5">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6 sticky top-16 z-20 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5 p-3 rounded-md border border-white/6">
        <label htmlFor="cmd-search" className="sr-only">Search commands</label>
        <div className="w-full sm:flex-1 relative group">
          {/* subtle gradient glow on focus */}
          <div aria-hidden className="pointer-events-none absolute -inset-[1px] rounded-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(99,102,241,0.25),rgba(168,85,247,0.18),transparent_60%)]"></div>
          {/* swelly logo */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-80">
            <Image src="/swelly1.png" alt="Swelly logo" width={18} height={18} className="rounded-sm" />
          </div>
          {/* search icon */}
          <div className="absolute left-9 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"><FaSearch /></div>
          <input
            id="cmd-search"
            ref={inputRef}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/6 rounded-md pl-14 pr-10 py-2 outline-none text-sm text-white transition focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Search commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search commands"
          />
          {/* keyboard hint when empty */}
          {!query && (
            <span aria-hidden className="hidden sm:inline-flex items-center absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white/60">
              /
            </span>
          )}
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
            <option key={c} value={c} className="text-black bg-white">
              {c} ({c === 'All' ? commands.length : (catCounts.get(c) ?? 0)})
            </option>
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
                    <h3 className="font-semibold">/{renderHighlighted(cmd.name, matchMap.get(cmd.name)?.name)}</h3>
                    <span className="text-xs text-white/50">{cmd.category}</span>
                  </div>
                  <p className="text-white/80 text-sm">{renderHighlighted(cmd.description, matchMap.get(cmd.name)?.description)}</p>
                  {cmd.usage && (
                    <p className="text-xs text-white/50 mt-2">Usage: {renderHighlighted(cmd.usage, matchMap.get(cmd.name)?.usage)}</p>
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
