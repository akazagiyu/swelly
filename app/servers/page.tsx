"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import LoginInline from "@/components/auth/LoginInline";

type Guild = {
  id: string;
  name: string;
  icon: string | null;
  owner?: boolean;
  permissions?: number;
};

export default function ServersPage() {
  const { data: session, status } = useSession();
  const [guilds, setGuilds] = useState<Guild[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/me/guilds")
      .then(async (r) => {
        if (!r.ok) throw new Error("Failed to fetch guilds");
        return r.json();
      })
      .then((g) => setGuilds(g))
      .catch((e) => setError(e.message));
  }, [status]);

  if (status === "loading") {
    return <div className="container py-12">Loading…</div>;
  }

  if (status !== "authenticated") {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">My Servers</h1>
        <p className="text-white/70 mb-6">Login with Discord to view servers you own/manage.</p>
        <LoginInline />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Servers</h1>
        <div className="text-white/60 text-sm">Logged in as {session.user?.name}</div>
      </div>
      {error && <div className="card border-red-600/40 text-red-300 mb-4">{error}</div>}
      {!guilds ? (
        <div>Loading your servers…</div>
      ) : guilds.length === 0 ? (
        <div className="text-white/70">No servers found.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {guilds.map((g, i) => {
            const iconUrl = g.icon
              ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=128`
              : null;
            return (
              <div
                key={g.id}
                className="card flex items-center justify-between gap-4 opacity-0 translate-y-2"
                style={{ transitionDelay: `${i * 40}ms` }}
                data-reveal-card
              >
                <div className="flex items-center gap-4 min-w-0">
                  {iconUrl ? (
                    <Image src={iconUrl} alt={g.name} width={48} height={48} className="rounded-md" />
                  ) : (
                    <div className="h-12 w-12 rounded-md bg-[#222] flex items-center justify-center text-white/50">
                      {g.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{g.name}</div>
                    <div className="text-xs text-white/50 flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${g.owner ? "bg-primary/20 text-primary-light" : "bg-white/10 text-white/70"}`}>
                        {g.owner ? "Owner" : "Member"}
                      </span>
                      <span className="truncate">ID: {g.id}</span>
                    </div>
                  </div>
                </div>
                <a href={`/dashboard/${g.id}`} className="btn btn-primary whitespace-nowrap">Configure</a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
