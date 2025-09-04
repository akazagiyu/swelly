import Link from "next/link";
import Image from "next/image";
import LoginInline from "@/components/auth/LoginInline";
import FadeIn from "@/components/motion/FadeIn";
import ParallaxOrbs from "@/components/motion/ParallaxOrbs";
import ScrollReveal from "@/components/motion/ScrollReveal";
// ...existing imports...
import CountUp from "@/components/CountUp";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.15]" />
        <ParallaxOrbs />
        <div className="container py-20 md:py-28 text-center aurora relative">
          <FadeIn>
            <span className="inline-block mx-auto mb-6 rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 bg-white/5 backdrop-blur-sm">
              New • Premium sound, zero lag
            </span>
            <div className="mx-auto mb-8 flex items-center justify-center gap-4">
              <Image src="/mascot.png" alt="Swelly mascot" width={96} height={96} className="drop-shadow-[0_0_22px_rgba(239,68,68,0.35)]" priority />
              <Image src="/swellyG2.png" alt="Swelly hero" width={520} height={520} className="w-[240px] md:w-[400px] h-auto drop-shadow-2xl" priority />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              The <span className="text-gradient">ultimate</span> Discord music bot
            </h1>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              Crystal-clear audio, powerful queues and filters, and buttery-smooth playback from Spotify, YouTube, Apple Music, and more.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
              <Link href="/invite" className="btn btn-primary w-full sm:w-auto">Invite Swelly</Link>
              <a href={process.env.NEXT_PUBLIC_DISCORD_SUPPORT_URL || "#"} className="btn btn-outline w-full sm:w-auto" target="_blank" rel="noreferrer">Join Support Server</a>
              <a href={process.env.NEXT_PUBLIC_TOPGG_URL || "#"} className="btn btn-outline w-full sm:w-auto" target="_blank" rel="noreferrer">Vote on Top.gg</a>
              <LoginInline />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-8">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-xl font-semibold">Stay in the loop</h3>
          <p className="text-white/70 mt-2">Get product updates, new filters, and special offers — once a month.</p>
          <NewsletterForm />
        </div>
      </section>

      {/* How it works */}
      <section className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold mb-6 text-center">How it works</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-4">
          <ScrollReveal delay={0.02}>
            <div className="card text-center">
              <div className="text-3xl">🔌</div>
              <h4 className="font-semibold mt-3">Invite the bot</h4>
              <p className="text-white/70 mt-2">Add Swelly to your server with a single click and grant required permissions.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.04}>
            <div className="card text-center">
              <div className="text-3xl">🎶</div>
              <h4 className="font-semibold mt-3">Play music</h4>
              <p className="text-white/70 mt-2">Use simple commands or the dashboard to queue tracks from Spotify, YouTube and more.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <div className="card text-center">
              <div className="text-3xl">⚙️</div>
              <h4 className="font-semibold mt-3">Customize</h4>
              <p className="text-white/70 mt-2">Enable filters, set defaults, and personalize playback for your community.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Integrations */}
      <section className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold mb-6 text-center">Integrations</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { t: 'Spotify', d: 'Seamless playback from playlists and tracks.' },
            { t: 'YouTube', d: 'Search and queue videos with ease.' },
            { t: 'Apple Music', d: 'High quality streaming support.' },
            { t: 'SoundCloud', d: 'Community uploads and more.' },
          ].map((i) => (
            <ScrollReveal key={i.t}>
              <div className="card text-center">
                <div className="text-xl font-bold mb-2">{i.t}</div>
                <div className="text-white/70 text-sm">{i.d}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Getting started */}
      <section className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold mb-6 text-center">Getting started</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-4">
          <ScrollReveal>
            <div className="card text-center">
              <div className="text-3xl">1</div>
              <h4 className="font-semibold mt-3">Invite Swelly</h4>
              <p className="text-white/70 mt-2">Add the bot to your server via the invite link and grant recommended permissions.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.04}>
            <div className="card text-center">
              <div className="text-3xl">2</div>
              <h4 className="font-semibold mt-3">Configure</h4>
              <p className="text-white/70 mt-2">Use the dashboard to set defaults, enable filters, and customize the bot.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="card text-center">
              <div className="text-3xl">3</div>
              <h4 className="font-semibold mt-3">Play music</h4>
              <p className="text-white/70 mt-2">Use simple commands or the UI to queue songs and enjoy high-quality playback.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold mb-6 text-center">Features</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { t: "🎵 High-Quality Music", d: "Crystal-clear audio powered by robust infrastructure." },
            { t: "📀 Playlist Support", d: "Load full playlists from your favorite services." },
            { t: "🎚️ Filters & Effects", d: "Bass boost, nightcore, vaporwave, and more." },
            { t: "🌐 Multi-Source Streaming", d: "Spotify, YouTube, Apple Music, SoundCloud." },
          ].map((f, i) => (
            <ScrollReveal key={f.t} delay={i * 0.05}>
              <div className="card hover:shadow-glow transition-all hover:-translate-y-0.5">
              <h3 className="text-lg font-semibold">{f.t}</h3>
              <p className="text-white/70 mt-1">{f.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold mb-6 text-center">Trusted by communities</h2>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-3">
          <ScrollReveal>
            <div className="card text-center">
            <div className="text-3xl font-bold text-primary"><CountUp to={12340} /></div>
            <div className="text-white/70 mt-1">Servers</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="card text-center">
            <div className="text-3xl font-bold text-primary"><CountUp to={1005221} /></div>
            <div className="text-white/70 mt-1">Users</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="card text-center">
            <div className="text-3xl font-bold text-primary">120+</div>
            <div className="text-white/70 mt-1">Commands</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold mb-6 text-center">What users are saying</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { u: "Alex", q: "Swelly made our community nights so much better!" },
            { u: "Rin", q: "The filters are insane. Nightcore all day!" },
            { u: "Mia", q: "Reliable, fast, and sounds amazing." },
          ].map((t, i) => (
            <ScrollReveal key={t.u} delay={i * 0.06}>
              <div className="card h-full flex flex-col">
                <p className="text-white/80 flex-1">“{t.q}”</p>
                <div className="text-white/60 text-sm mt-4">— {t.u}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
