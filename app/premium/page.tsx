export const metadata = { title: "Premium" };

import Image from "next/image";
import PremiumTiers from '@/components/PremiumTiers';
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function PremiumPage() {
  const tiers = [
    {
      name: "Free",
      price: { monthly: "$0", yearly: "$0" },
      features: [
        "Core music commands",
        "Play from Spotify/YouTube/SoundCloud",
        "Basic queue",
      ],
      cta: "Current Plan",
      badge: "Start here",
    },
    {
      name: "Premium",
      price: { monthly: "$4.99", yearly: "$49.99" },
      features: [
        "24/7 mode",
        "Autoplay mode",
        "Unique audio effects",
        "No vote requirement",
        "Premium role (community server)",
        "Create up to 100 playlists",
        "Access to 3 premium bots",
        "Up to 10,000 songs per playlist",
      ],
      highlight: true,
      cta: "Buy Premium",
      badge: "Most Popular",
    },
    {
      name: "Guild Pro",
      price: { monthly: "$9.99", yearly: "$99.99" },
      features: [
        "24/7 mode",
        "Access to 3 premium bots",
        "Unlimited queue length",
        "Create up to 500 playlists",
        "Amazing audio filters",
        "Volume command",
        "Unlimited Spotify links",
        "Unlimited YouTube links",
        "Priority support (all times)",
      ],
      cta: "Contact Sales",
      badge: "For big servers",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <div className="container py-16 md:py-20 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ScrollReveal>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Unlock Premium</h1>
                <p className="mt-3 text-white/70 max-w-xl">24/7 music, higher queue limits, exclusive filters, priority support — everything you need for the best experience.</p>
                <div className="mt-6 flex items-center gap-3">
                  <a href="#buy" className="btn btn-primary">Buy Premium</a>
                  <a href="#compare" className="btn btn-outline">Compare plans</a>
                </div>
              </ScrollReveal>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Image src="/prime.png" alt="Swelly Premium" width={200} height={200} className="drop-shadow-[0_0_24px_rgba(239,68,68,0.35]" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container py-12">
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { i: "⏱️", t: "24/7 Mode", d: "Keep music running around the clock." },
            { i: "▶️", t: "Autoplay Mode", d: "Smart autoplay when the queue ends." },
            { i: "✨", t: "Unique Effects", d: "Signature filters to shape your sound." },
            { i: "🏷️", t: "Premium Role", d: "Get a shiny role in our community server." },
          ].map((b, i) => (
            <ScrollReveal key={b.t} delay={i * 0.04}>
              <div className="card p-5">
                <div className="text-2xl">{b.i}</div>
                <div className="font-semibold mt-2">{b.t}</div>
                <div className="text-white/70 text-sm mt-1">{b.d}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Compare (anchor) */}
      <section id="compare" className="container pt-4 pb-6">
        <ScrollReveal>
          <div className="card p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Compare plans</h2>
              <p className="text-white/70 text-sm mt-1">See what you get with Free, Premium, and Guild Pro.</p>
            </div>
            <div className="flex gap-3">
              <a href="/premium/compare" className="btn btn-outline">View full comparison</a>
              <a href="#buy" className="btn btn-primary">Buy Premium</a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Pricing */}
      <section id="buy" className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-center mb-6">Choose your plan</h2>
        </ScrollReveal>
        <PremiumTiers tiers={tiers} />
        <div className="text-center mt-10">
          <a href="#compare" className="text-sm text-white/60 hover:text-white">Compare plans →</a>
        </div>
      </section>

      {/* Sticky mobile CTA bar */}
      <div className="fixed bottom-4 left-0 right-0 z-30 px-4 md:hidden">
        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md shadow-glow">
          <div className="flex items-center gap-3 p-3">
            <a href="#compare" className="flex-1 text-center rounded-lg py-3 text-sm font-medium text-white bg-white/10 border border-white/15 hover:bg-white/15">Compare</a>
            <a href="#buy" className="flex-1 text-center rounded-lg py-3 text-sm font-medium text-white bg-gradient-to-r from-primary via-accent-violet to-primary-light shadow-glow">Buy Premium</a>
          </div>
        </div>
      </div>
      <div className="h-20 md:h-0" aria-hidden="true" />
    </div>
  );
}
