import Link from "next/link";
import Image from "next/image";
import ParallaxOrbs from "@/components/motion/ParallaxOrbs";
import ScrollReveal from "@/components/motion/ScrollReveal";
import HomeStats from "@/components/HomeStats";
import { getAllCommands } from "@/lib/commands";

export default async function Home() {
  // Fetch bot status (shard/totals) from our internal API route.
  // Use an absolute URL (NEXT_PUBLIC_SITE_URL) to avoid origin issues during dev.
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${process.env.PORT || 3000}`;
  let totals: { guilds: number; users: number } | null = null;
  try {
    const url = new URL('/api/status', siteOrigin).toString();
    // Add a short timeout so build/prerender phases don't hang or fail loudly
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    let res: Response | null = null;
    try {
      res = await fetch(url, { signal: controller.signal, next: { revalidate: 10 } });
    } finally {
      clearTimeout(timeout);
    }

    if (!res) {
      // fetch was aborted or failed to return a response
      // eslint-disable-next-line no-console
      console.warn('[home] /api/status fetch returned no response (timed out or aborted)');
    } else if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error(`[home] /api/status returned ${res.status}`);
    } else {
      const json = await res.json();
      const guilds = json?.totals?.guilds ?? json?.guilds ?? json?.guildsTotal ?? null;
      const users = json?.totals?.users ?? json?.users ?? json?.usersTotal ?? null;
      if (typeof guilds === 'number' || typeof users === 'number') {
        totals = { guilds: typeof guilds === 'number' ? guilds : 0, users: typeof users === 'number' ? users : 0 };
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[home] Failed to fetch /api/status', err);
  }

  const commands = getAllCommands().slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <ParallaxOrbs />
        <div className="container py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ScrollReveal>
                <span className="inline-block mb-4 rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 bg-white/5 backdrop-blur-sm">
                  New • Premium sound, zero lag
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                  The <span className="text-gradient">ultimate</span> Discord music bot
                </h1>
                <p className="mt-4 text-white/70 max-w-xl">
                  Crystal-clear audio, powerful queues and filters, and buttery-smooth playback from Spotify, YouTube, Apple Music, and more.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center gap-3">
                  <Link href="/invite" className="btn btn-primary w-full sm:w-auto">Invite Swelly</Link>
                  <Link href="/servers" className="btn btn-outline w-full sm:w-auto">Configure servers</Link>
                  <a href={process.env.NEXT_PUBLIC_DISCORD_SUPPORT_URL || "#"} className="btn btn-outline w-full sm:w-auto" target="_blank" rel="noreferrer">Join Support</a>
                </div>
              </ScrollReveal>

              <div className="mt-10">
                <ScrollReveal>
                  <HomeStats initial={totals ?? null} />
                </ScrollReveal>
              </div>
            </div>
            <div className="relative hidden md:block">
              <ScrollReveal>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <div className="flex items-center justify-center gap-4">
                    <Image src="/mascot.png" alt="Swelly mascot" width={120} height={120} className="drop-shadow-[0_0_22px_rgba(239,68,68,0.35)]" priority />
                    <Image src="/swellyG2.png" alt="Swelly hero" width={520} height={520} className="w-[360px] h-auto drop-shadow-2xl" priority />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="container py-14">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold mb-6 text-center">Why Swelly</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-4 gap-6 items-stretch">
          {[
            { i: "🎵", t: "High-Quality Music", d: "Crystal-clear audio powered by robust infrastructure." },
            { i: "�", t: "Playlist Support", d: "Load full playlists from your favorite services." },
            { i: "�️", t: "Filters & Effects", d: "Bass boost, nightcore, vaporwave, and more." },
            { i: "🌐", t: "Multi-Source", d: "Spotify, YouTube, Apple Music, SoundCloud." },
          ].map((f, i) => (
            <ScrollReveal key={f.t} delay={i * 0.04}>
              <div className="card rounded-2xl p-6 flex flex-col justify-center hover:shadow-glow transition-all hover:-translate-y-0.5">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{f.i}</div>
                  <h3 className="font-semibold text-lg">{f.t}</h3>
                </div>
                <p className="text-white/70 mt-3">{f.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Commands preview */}
      <section className="container py-12">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-3 mb-4">
            <h2 className="text-2xl font-semibold">Popular commands</h2>
            <Link href="/commands" className="text-sm text-white/70 hover:text-white">View all →</Link>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commands.map((cmd, i) => (
            <ScrollReveal key={cmd.name} delay={i * 0.03}>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href={`/commands/${cmd.name}`} className="block">
                <div className="card hover:-translate-y-0.5 transition-transform">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">/{cmd.name}</h3>
                    <span className="text-xs text-white/50">{cmd.category}</span>
                  </div>
                  <p className="text-white/80 text-sm">{cmd.description}</p>
                  {cmd.usage && (
                    <p className="text-xs text-white/50 mt-2">Usage: {cmd.usage}</p>
                  )}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Premium teaser */}
      <section className="container py-12">
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Go Premium for more power</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Unlock higher quality, priority queueing, more filters, and early access features.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <Link href="/premium" className="btn btn-primary">Compare plans</Link>
              <Link href="/premium/compare" className="btn btn-outline">See details</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      {/* <section className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold mb-6 text-center">Trusted by communities</h2>
        </ScrollReveal>
        <div className="flex justify-start">
          <ScrollReveal>
            <HomeStats initial={totals ?? null} />
          </ScrollReveal>
        </div>
      </section> */}

      {/* Final CTA */}
      <section className="container py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-accent-violet/20 to-rose-500/20 border border-white/10 p-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-extrabold">Bring better music to your server</h2>
            <p className="text-white/70 mt-2">Invite Swelly now and start listening in seconds.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/invite" className="btn btn-primary">Invite Swelly</Link>
              <Link href="/support" className="btn btn-outline">Get help</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}