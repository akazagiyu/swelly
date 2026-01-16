"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import BotStatsCards from "@/components/dashboard/BotStatsCards";
import UptimeChart from "@/components/dashboard/UptimeChart";
import Activity24hChart from "@/components/dashboard/Activity24hChart";
import PopularCommandsChart from "@/components/dashboard/PopularCommandsChart";

export const dynamic = 'force-dynamic';

type Shard = { id: number; status: "operational" | "partial" | "outage"; guilds: number; ping: number };
type Status = {
  online: boolean;
  uptime: string;
  uptimePercent: number;
  latencyMs: number;
  shardsCount: number;
  shards: Shard[];
  totals?: { guilds: number; users: number; ramMB: number };
  dashboard?: {
    uptimePercent: number;
    latencyMs: number;
    commandsExecuted24h: number;
    topCommands: Array<{ name: string; usage: number; trend: number }>;
  };
};

function StatusPageInner() {
  const [data, setData] = useState<Status | null>(null);
  const [autoRefresh, setAutoRefresh] = useLocalStorage<boolean>("status:autoRefresh", true);
  const [filter, setFilter] = useLocalStorage<"all" | "issues">("status:filter", "all");
  const [sortBy, setSortBy] = useLocalStorage<"id" | "status">("status:sort", "id");
  const [cbSafe, setCbSafe] = useLocalStorage<boolean>("status:cb", true);
  const prevRef = useRef<Status | null>(null);
  const [flashIds, setFlashIds] = useState<Set<number>>(new Set());
  const timersRef = useRef<number[]>([]);
  const refreshTimerRef = useRef<number | null>(null);
  const [displayShards, setDisplayShards] = useState<Shard[] | null>(null);
  const displayRef = useRef<Shard[] | null>(null);
  
  useEffect(() => { displayRef.current = displayShards; }, [displayShards]);
  
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [, setClock] = useState(0);
  
  useEffect(() => { 
    const i = window.setInterval(() => setClock(c => (c + 1) % 1_000_000), 1000); 
    return () => clearInterval(i); 
  }, []);
  
  const lastUpdatedText = (() => {
    if (!lastUpdated) return "—";
    const diff = Math.max(0, Math.floor((Date.now() - lastUpdated) / 1000));
    if (diff < 60) return `${diff}s ago`;
    const m = Math.floor(diff / 60), s = diff % 60;
    return `${m}m ${s}s ago`;
  })();

  const shardPingHistory = useRef<Map<number, number[]>>(new Map());
  const shardGuildHistory = useRef<Map<number, number[]>>(new Map());
  const totalsRamHistory = useRef<number[]>([]);
  const totalsLatencyHistory = useRef<number[]>([]);
  
  const pushHistory = (id: number, map: Map<number, number[]>, val: number) => {
    const arr = map.get(id) ?? [];
    arr.push(val); 
    if (arr.length > 20) arr.shift();
    map.set(id, arr);
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const f = searchParams.get("filter");
    const s = searchParams.get("sort");
    const cb = searchParams.get("cb");
    const ar = searchParams.get("auto");
    if (f === "issues" || f === "all") setFilter(f);
    if (s === "status" || s === "id") setSortBy(s);
    if (cb === "1" || cb === "0") setCbSafe(cb === "1");
    if (ar === "1" || ar === "0") setAutoRefresh(ar === "1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", filter);
    params.set("sort", sortBy);
    params.set("cb", cbSafe ? "1" : "0");
    params.set("auto", autoRefresh ? "1" : "0");
    router.replace(`${pathname}?${params.toString()}`);
  }, [filter, sortBy, cbSafe, autoRefresh, pathname, router, searchParams]);

  useEffect(() => {
    let timer: number | null = null;
    const load = async () => {
      try {
        const r = await fetch("/api/status", { cache: "no-store" });
        const j: Status = await r.json();
        prevRef.current = j;
        setData(j);
        if (!displayRef.current) setDisplayShards(j.shards);
        setLastUpdated(Date.now());
        
        for (const s of j.shards) {
          pushHistory(s.id, shardPingHistory.current, s.ping);
          pushHistory(s.id, shardGuildHistory.current, s.guilds);
        }
        totalsLatencyHistory.current.push(j.latencyMs);
        if (totalsLatencyHistory.current.length > 20) totalsLatencyHistory.current.shift();
        if (j.totals?.ramMB != null) {
          totalsRamHistory.current.push(j.totals.ramMB);
          if (totalsRamHistory.current.length > 20) totalsRamHistory.current.shift();
        }
        
        timersRef.current.forEach((id) => clearTimeout(id));
        timersRef.current = [];
        setFlashIds(new Set());
        
        for (const s of j.shards) {
          const delay = Math.floor(Math.random() * 1400);
          const updateTimer = window.setTimeout(() => {
            setDisplayShards((prev) => {
              const base = prev ? [...prev] : [];
              const idx = base.findIndex((x) => x.id === s.id);
              if (idx >= 0) base[idx] = s; else base.push(s);
              base.sort((a, b) => a.id - b.id);
              return base;
            });
            setFlashIds((prev) => {
              const ns = new Set(prev); ns.add(s.id); return ns;
            });
            const removeTimer = window.setTimeout(() => {
              setFlashIds((prev) => {
                const ns = new Set(prev); ns.delete(s.id); return ns;
              });
            }, 1100);
            timersRef.current.push(removeTimer);
          }, delay);
          timersRef.current.push(updateTimer);
        }
      } finally {
        const jitter = Math.floor(Math.random() * 800);
        if (autoRefresh) timer = window.setTimeout(load, 5_000 + jitter);
        refreshTimerRef.current = timer;
      }
    };
    load();
    return () => {
      if (timer) window.clearTimeout(timer);
      refreshTimerRef.current = null;
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    };
  }, [autoRefresh]);

  const toggleAutoRefresh = () => {
    setAutoRefresh((v) => {
      const nv = !v;
      if (!nv) {
        timersRef.current.forEach((id) => clearTimeout(id));
        timersRef.current = [];
        if (refreshTimerRef.current) {
          clearTimeout(refreshTimerRef.current);
          refreshTimerRef.current = null;
        }
      }
      return nv;
    });
  };

  useEffect(() => {
    if (!autoRefresh) return;
    (async () => {
      try {
        const r = await fetch("/api/status", { cache: "no-store" });
        const j: Status = await r.json();
        prevRef.current = j;
        setData(j);
        if (!displayRef.current) setDisplayShards(j.shards);
        setLastUpdated(Date.now());
      } catch {}
    })();
  }, [autoRefresh]);

  const totals = data?.totals;

  const palette = useMemo(() => {
    if (!cbSafe) {
      return {
        operational: { border: 'border-green-500/20', bg: 'bg-green-500/5', text: 'text-green-400', dot: 'bg-green-500' },
        partial: { border: 'border-orange-500/20', bg: 'bg-orange-500/5', text: 'text-orange-300', dot: 'bg-orange-500' },
        outage: { border: 'border-red-500/20', bg: 'bg-red-500/5', text: 'text-red-300', dot: 'bg-red-500' },
      } as const;
    }
    return {
      operational: { border: 'border-sky-500/20', bg: 'bg-sky-500/5', text: 'text-sky-300', dot: 'bg-sky-500' },
      partial: { border: 'border-amber-500/20', bg: 'bg-amber-500/5', text: 'text-amber-300', dot: 'bg-amber-500' },
      outage: { border: 'border-fuchsia-500/20', bg: 'bg-fuchsia-500/5', text: 'text-fuchsia-300', dot: 'bg-fuchsia-500' },
    } as const;
  }, [cbSafe]);

  const legend = useMemo(() => ([
    { key: 'operational', label: 'Operational', color: palette.operational.dot },
    { key: 'partial', label: 'Partial Outage', color: palette.partial.dot },
    { key: 'outage', label: 'Major Outage', color: palette.outage.dot },
  ] as const), [palette]);

  const sortedFilteredShards = useMemo(() => {
    const list = (displayShards ?? data?.shards ?? []).filter(s => filter === 'all' ? true : s.status !== 'operational');
    if (sortBy === 'id') return list.sort((a, b) => a.id - b.id);
    const rank = (s: Shard) => s.status === 'outage' ? 0 : s.status === 'partial' ? 1 : 2;
    return list.sort((a, b) => rank(a) - rank(b) || a.id - b.id);
  }, [displayShards, data, filter, sortBy]);

  function Sparkline({ data, color = '#9ca3af' }: { data: number[]; color?: string }) {
    const width = 120, height = 36, pad = 2;
    const points = useMemo(() => {
      const d = data.length ? data : [0];
      const min = Math.min(...d), max = Math.max(...d);
      const range = Math.max(1, max - min);
      return d.map((v, i) => {
        const x = pad + (i * (width - pad * 2)) / Math.max(1, d.length - 1);
        const y = height - pad - ((v - min) * (height - pad * 2)) / range;
        return `${x},${y}`;
      }).join(' ');
    }, [data]);
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
      </svg>
    );
  }

  const [selected, setSelected] = useState<Shard | null>(null);
  const openShard = (s: Shard) => setSelected(s);
  const closeShard = () => setSelected(null);

  const dashboardMetrics = data?.dashboard ? {
    guilds: totals?.guilds ?? 0,
    users: totals?.users ?? 0,
    ramMB: totals?.ramMB ?? 0,
    shards: data.shardsCount,
    uptimePercent: data.dashboard.uptimePercent,
  } : null;

  return (
    <div className="min-h-screen">
      {dashboardMetrics && (
        <div className="bg-gradient-to-br from-slate-900 via-blurple/10 to-slate-900 py-16 border-b border-blurple/30 shadow-lg shadow-blurple/10">
          <div className="container space-y-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider mb-3 text-blurple">Bot Statistics Dashboard</h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">Real-time metrics and performance analytics for Swelly</p>
            </div>
            <div>
              <BotStatsCards stats={dashboardMetrics} loading={!data} />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {data?.dashboard && (
                <>
                  <UptimeChart uptimePercent={data.dashboard.uptimePercent} loading={!data} />
                  <Activity24hChart loading={!data} />
                </>
              )}
            </div>

            {data?.dashboard && (
              <div>
                <PopularCommandsChart commands={data.dashboard.topCommands} loading={!data} />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="container py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-wider leading-tight md:leading-snug" style={{ fontFamily: 'var(--font-display)' }}>SHARD STATUS</h2>
          <p className="text-white/70 mt-2 leading-relaxed">Detailed view of all Swelly shards and their real-time status.</p>
          <p className="text-white/60 text-xs mt-1 leading-relaxed flex items-center gap-2" aria-live="polite">
            <span className="inline-flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${autoRefresh ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
              <span>Last update: {lastUpdatedText}</span>
            </span>
            <span className="text-white/60">•</span>
            <span className="text-white/60">Auto-refresh</span>
            <span className={`ml-1 text-xs font-medium ${autoRefresh ? 'text-emerald-300' : 'text-rose-300'}`}>{autoRefresh ? 'on' : 'paused'}</span>
            {!autoRefresh && (
              <span className="ml-3 inline-flex items-center gap-2 px-2 py-1 rounded-md bg-rose-600 text-white text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 4h4v16H6zM14 4h4v16h-4z" />
                </svg>
                Paused
              </span>
            )}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 items-center justify-center">
          <button
            onClick={toggleAutoRefresh}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs ${autoRefresh ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white' : 'border-rose-400 bg-rose-600 text-white hover:opacity-95'}`}
            aria-pressed={autoRefresh}
            title="Pause/resume auto-refresh"
          >
            {autoRefresh ? 'Pause' : 'Resume'}
          </button>
          <div className="inline-flex items-center gap-1 text-xs">
            <span className="text-white/50">Filter:</span>
            <button onClick={() => setFilter("all")} className={`px-2 py-1 rounded border text-xs ${filter === 'all' ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 hover:border-white/20 text-white/80'}`}>All</button>
            <button onClick={() => setFilter("issues")} className={`px-2 py-1 rounded border text-xs ${filter === 'issues' ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 hover:border-white/20 text-white/80'}`}>Issues</button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-sm">
          {legend.map(l => (
            <span key={l.key} className="inline-flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${l.color}`} />
              <span className="text-white/70">{l.label}</span>
            </span>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr,280px] gap-6 items-start mt-8">
          <div className="space-y-6">
            <div className="card">
              <div className="font-semibold mb-2">Discord Incidents</div>
              <div className="text-white/60 text-sm">No current Discord incidents.</div>
            </div>

            <div className="space-y-3">
              <div className="text-xl font-semibold">Swelly&rsquo;s Status</div>
              {!data && !displayShards ? (
                <div className="card"><div className="flex justify-center"><LoadingSpinner /></div></div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-3">
                  {sortedFilteredShards.map((s) => (
                    <div
                      key={s.id}
                      className={`rounded-md border p-2 text-center leading-relaxed h-20 overflow-hidden flex flex-col items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 ring-offset-0 ring-white/20 ${
                        s.status === 'operational' ? `${palette.operational.border} ${palette.operational.bg}` :
                        s.status === 'partial' ? `${palette.partial.border} ${palette.partial.bg}` :
                        `${palette.outage.border} ${palette.outage.bg}`
                      } ${flashIds.has(s.id) ? 'animate-flash-ring shadow-[0_0_0_6px_rgba(147,197,253,0.12)]' : ''}`}
                      role="button"
                      tabIndex={0}
                      aria-label={`Shard ${s.id}, status ${s.status}, ping ${s.ping} ms`}
                      onClick={() => openShard(s)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openShard(s);} }}
                    >
                      <div className={`text-xs mb-1 w-full truncate ${s.status === 'operational' ? palette.operational.text : s.status === 'partial' ? palette.partial.text : palette.outage.text}`}>#{s.id}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="card">
            <div className="space-y-3 text-sm leading-relaxed">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Guilds:</span>
                <span className="text-white">{totals ? totals.guilds.toLocaleString() : '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Users:</span>
                <span className="text-white">{totals ? totals.users.toLocaleString() : '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Ram:</span>
                <span className="text-white">{totals ? `${totals.ramMB.toLocaleString()}MB` : '—'}</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="text-white/60 text-xs">Overall ping</div>
                <Sparkline data={totalsLatencyHistory.current} color="#60a5fa" />
                <div className="text-white/60 text-xs mt-2">RAM usage</div>
                <Sparkline data={totalsRamHistory.current} color="#fb7185" />
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 items-center justify-center text-xs">
          <div className="inline-flex items-center gap-1">
            <span className="text-white/50">Sort:</span>
            <button onClick={() => setSortBy('id')} className={`px-2 py-1 rounded border ${sortBy === 'id' ? 'border-white/30 bg-white/10' : 'border-white/10 hover:border-white/20'}`}>ID</button>
            <button onClick={() => setSortBy('status')} className={`px-2 py-1 rounded border ${sortBy === 'status' ? 'border-white/30 bg-white/10' : 'border-white/10 hover:border-white/20'}`}>Issues first</button>
          </div>
          <div className="inline-flex items-center gap-2">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="accent-rose-400" checked={cbSafe} onChange={(e) => setCbSafe(e.target.checked)} />
              <span className="text-white/60">Color‑blind safe</span>
            </label>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" role="dialog" aria-modal="true" aria-label={`Details for shard ${selected.id}`} onClick={closeShard}>
          <div className="card max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-white/60">Shard</div>
                <div className="text-xl font-semibold">#{selected.id}</div>
              </div>
              <button onClick={closeShard} className="px-2 py-1 rounded border border-white/10 hover:border-white/20 text-xs">Close</button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
              <div><div className="text-white/60 text-xs">Status</div><div className="capitalize">{selected.status}</div></div>
              <div><div className="text-white/60 text-xs">Ping</div><div>{selected.ping} ms</div></div>
              <div><div className="text-white/60 text-xs">Guilds</div><div>{selected.guilds.toLocaleString()}</div></div>
            </div>
            <div className="mt-4">
              <div className="text-white/60 text-xs mb-1">Ping history</div>
              <Sparkline data={shardPingHistory.current.get(selected.id) ?? []} color="#34d399" />
            </div>
            <div className="mt-4">
              <div className="text-white/60 text-xs mb-1">Guilds history</div>
              <Sparkline data={shardGuildHistory.current.get(selected.id) ?? []} color="#fbbf24" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StatusPage() {
  return (
    <Suspense fallback={<div className="container py-12"><div className="card"><div className="flex justify-center"><LoadingSpinner /></div></div></div>}>
      <StatusPageInner />
    </Suspense>
  );
}
