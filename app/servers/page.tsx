"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import SkeletonGuildCard from "@/components/SkeletonGuildCard";
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
      .catch(() => setError("fetch_failed"));
  }, [status]);

  if (status === "loading") {
    return (
      <div className="container py-12">
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
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
      <div className="relative mb-8">
  <div className="rounded-xl overflow-hidden bg-white/4 backdrop-blur-md p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="min-w-0">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">My Servers</h1>
            <p className="mt-2 text-white/70">Manage and configure the servers you own or help run.</p>
          </div>

          <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
            <div className="text-sm text-white/70 mr-2 hidden sm:block">Logged in as</div>
            <div className="inline-flex items-center gap-3 bg-white/5 p-2 rounded-md border border-white/6 flex-shrink-0">
              {session.user?.image ? (
                <Image src={session.user.image} alt={session.user.name ?? 'avatar'} width={36} height={36} className="rounded-full" />
              ) : (
                <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-sm">{(session.user?.name ?? 'E')[0]}</div>
              )}
              <div className="text-sm font-medium max-w-[9rem] truncate">{session.user?.name ?? 'edithdb'}</div>
            </div>
          </div>
        </div>

        <Image src="/swellyG1.png" alt="decor" width={220} height={120} className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 opacity-10 fill-none hidden md:block" />
      </div>
      {error && (
        <div className="card border-red-600/40 text-red-300 mb-4" role="alert" aria-live="polite">
          <div className="font-semibold text-red-200">We couldn&apos;t load your servers</div>
          <p className="text-sm text-red-200/80 mt-1">
            Please relogin again or contact in our <Link href="/support" className="underline decoration-red-300/40 hover:decoration-red-300">support server</Link>.
          </p>
        </div>
      )}
      {!guilds ? (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <SkeletonGuildCard key={i} />
    ))}
  </div>
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
                className="card flex items-center justify-between gap-4"
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
                <a href="/dashboard" className="btn btn-primary whitespace-nowrap">Configure</a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
