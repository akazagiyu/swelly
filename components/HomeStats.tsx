"use client";
import { useEffect, useState } from "react";
import CountUp from "./CountUp";
import SkeletonCard from "./SkeletonCard";

type Totals = { guilds: number; users: number } | null;

export default function HomeStats({ initial }: { initial?: Totals }) {
  const [totals, setTotals] = useState<Totals>(initial ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const r = await fetch("/api/status");
        if (!r.ok) throw new Error(`status ${r.status}`);
        const j = await r.json();
        const guilds = j?.totals?.guilds ?? j?.guilds ?? j?.guildsTotal ?? null;
        const users = j?.totals?.users ?? j?.users ?? j?.usersTotal ?? null;
        if (mounted)
          setTotals({ guilds: Number(guilds ?? 0), users: Number(users ?? 0) });
      } catch (e) {
        // swallow - keep initial or fallback
        // eslint-disable-next-line no-console
        console.warn("HomeStats: failed to fetch /api/status", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const guilds = totals?.guilds ?? 310000;
  const users = totals?.users ?? 1005221;
  const commands = 120;

  if (loading && !totals) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
        <SkeletonCard className="h-28" />
        <SkeletonCard className="h-28" />
        <SkeletonCard className="h-28" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
      <div className="card rounded-2xl p-6 w-full h-28 flex flex-col items-center justify-center text-center">
        <div className="text-3xl font-bold text-primary leading-none">
          <CountUp to={guilds} />
        </div>
        <div className="text-white/70 mt-2">Servers</div>
      </div>
      <div className="card rounded-2xl p-6 w-full h-28 flex flex-col items-center justify-center text-center">
        <div className="text-3xl font-bold text-primary leading-none">
          <CountUp to={users} />
        </div>
        <div className="text-white/70 mt-2">Users</div>
      </div>
      <div className="card rounded-2xl p-6 w-full h-28 flex flex-col items-center justify-center text-center">
        <div className="text-3xl font-bold text-primary leading-none">
          <CountUp to={commands} />
        </div>
        <div className="text-white/70 mt-2">Commands</div>
      </div>
    </div>
  );
}
