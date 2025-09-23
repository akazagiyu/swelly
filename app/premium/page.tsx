import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium",
  description: "Unlock premium Swelly features with exclusive perks, advanced filters, priority support, and enhanced music quality. Choose from flexible premium tiers that fit your community's needs.",
  openGraph: {
    title: "Swelly Premium - Unlock Advanced Music Features",
    description: "Get exclusive premium features, advanced filters, and priority support for your Discord server.",
    images: [
      {
        url: "/prime.png",
        width: 1200,
        height: 630,
        alt: "Swelly Premium Features"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly Premium - Unlock Advanced Music Features",
    description: "Get exclusive premium features, advanced filters, and priority support for your Discord server.",
    images: ["/prime.png"]
  }
};

import Image from "next/image";
import PremiumTiers from '@/components/PremiumTiers';
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function PremiumPage() {
  const tiers = [
    // {
    //   name: "Free",
    //   price: { monthly: "$0", yearly: "$0" },
    //   features: [
    //     "Core music commands",
    //     "Play from Spotify and SoundCloud",
    //     "Basic queue",
    //   ],
    //   cta: "Current Plan",
    //   badge: "Start here",
    // },
    {
      name: "Plan A",
      subtitle: "Activate premium in 1 server",
      price: { monthly: "$3", yearly: "$30" },
      features: [
        "24/7 mode",
        "Autoplay mode",
        "Unique audio effects",
        "No vote requirement",
        "Premium role (community server)",
        "Create 100 playlists",
        "Access to 3 premium bots",
        "Add 10,000+ songs per playlist",
      ],
      cta: "Buy plan A",
      href: "https://www.patreon.com/checkout/Swelly?rid=9953630&vanity=Swelly",
      badge: "Great start",
      
    },
    {
      name: "Plan B",
      subtitle: "Activate premium in 3 servers",
      price: { monthly: "$5.49", yearly: "$54.90" },
      features: [
        "24/7 mode",
        "Access to 3 premium bots",
        "Unlimited tracks in queue",
        "Unlimited queue length",
        "Create 500 playlists",
        "Amazing audio filters",
        "Volume command",
        "Unlimited Spotify links",
        "Unlimited YouTube links",
        "Priority support (all times)",
      ],
      cta: "Buy plan B",
      href: "https://paypal.me/aj23112001",
      badge: "Most Popular",
      highlight: true,
    },
    {
      name: "Plan C",
      subtitle: "Activate premium in 5 servers",
      price: { monthly: "$7.59", yearly: "$75.90" },
      features: ["Includes all benefits of Plan B"],
      cta: "Buy plan C",
      href: "https://paypal.me/aj23112001",
      badge: "Multi-server",
    },
    {
      name: "Plan D",
      subtitle: "Activate premium in 7 servers",
      price: { monthly: "$15.99", yearly: "$159.90" },
      features: ["Includes all benefits of Plan B"],
      cta: "Buy plan D",
      href: "https://paypal.me/aj23112001",
      badge: "Best for larger",
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
                  <a href="https://paypal.me/aj23112001" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Buy Premium</a>
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
              <p className="text-white/70 text-sm mt-1">See what you get with Free and Plans A–D.</p>
            </div>
            <div className="flex gap-3">
              <a href="/premium/compare" className="btn btn-outline">View full comparison</a>
              <a href="https://paypal.me/aj23112001" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Buy a plan</a>
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
            <a href="https://paypal.me/aj23112001" target="_blank" rel="noopener noreferrer" className="flex-1 text-center rounded-lg py-3 text-sm font-medium text-white bg-gradient-to-r from-primary via-accent-violet to-primary-light shadow-glow">Buy a plan</a>
          </div>
        </div>
      </div>
      <div className="h-20 md:h-0" aria-hidden="true" />
    </div>
  );
}
