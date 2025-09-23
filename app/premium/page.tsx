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
      href: {
        monthly: "https://www.patreon.com/checkout/Swelly?rid=9953630&vanity=Swelly",
        yearly: "https://www.patreon.com/checkout/Swelly?rid=9953630&vanity=Swelly&cadence=12"
      },
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
      href: {
        monthly: "https://www.patreon.com/checkout/Swelly?rid=9953631&vanity=Swelly",
        yearly: "https://www.patreon.com/checkout/Swelly?rid=9953631&vanity=Swelly&cadence=12"
      },
      badge: "Most Popular",
      highlight: true,
    },
    {
      name: "Plan C",
      subtitle: "Activate premium in 5 servers",
      price: { monthly: "$7.59", yearly: "$75.90" },
      features: ["Includes all benefits of Plan B"],
      cta: "Buy plan C",
      href: {
        monthly: "https://www.patreon.com/checkout/Swelly?rid=26236976&vanity=Swelly",
        yearly: "https://www.patreon.com/checkout/Swelly?rid=26236976&vanity=Swelly&cadence=12"
      },
      badge: "Multi-server",
    },
    {
      name: "Plan D",
      subtitle: "Activate premium in 7 servers",
      price: { monthly: "$15.99", yearly: "$159.90" },
      features: ["Includes all benefits of Plan B"],
      cta: "Buy plan D",
      href: {
        monthly: "https://www.patreon.com/checkout/Swelly?rid=21760348&vanity=Swelly",
        yearly: "https://www.patreon.com/checkout/Swelly?rid=21760348&vanity=Swelly&cadence=12"
      },
      badge: "Best for larger",
    },
    {
      name: "Elite Supporter",
      subtitle: "Activate premium in 30 servers",
      price: { monthly: "$269.10", yearly: "$3229.20" },
      features: [
        "Includes all features of Plan B",
        "Access to 5 more premium bots with better quality",
        "Can activate premium in 30 Discord Servers",
        "Priority Access: Your feedback shapes the bot! Direct input on feature updates and enhancements",
        "Custom Voice & Text Channels: Tailored to your server needs for optimal bot performance and enjoyment",
        "Exclusive Elite-Only Commands: Unlock unique, high-power commands only available to Elite Supporters"
      ],
      cta: "Join Elite",
      href: {
        monthly: "https://www.patreon.com/checkout/Swelly?rid=ELITE_MONTHLY&vanity=Swelly",
        yearly: "https://www.patreon.com/checkout/Swelly?rid=ELITE_YEARLY&vanity=Swelly&cadence=12"
      },
      badge: "Ultimate Experience",
    },
    {
      name: "God Supporters",
      subtitle: "Swelly x Flute - Divine Power",
      price: { monthly: "$449.10", yearly: "$5389.20" },
      features: [
        "Includes all features of Plan B",
        "Priority Access: Your feedback shapes the bot! Direct input on feature updates and enhancements",
        "Access to 3 more premium bots with better quality",
        "Can activate premium in 10 Discord Servers",
        "Exclusive God-Only Commands: Unlock unique, high-power commands only available to God Supporters",
        "Custom Voice & Text Channels: Tailored to your server needs for optimal bot performance and enjoyment",
        "Recognition in the Community: Special acknowledgment and thanks in our community channels",
        "Early Access to New Features: Be the first to experience cutting-edge updates and improvements"
      ],
      cta: "Join God Tier",
      href: {
        monthly: "https://www.patreon.com/checkout/Swelly?cadence=1&is_free_trial=false",
        yearly: "https://www.patreon.com/checkout/Swelly?cadence=12&is_free_trial=false"
      },
      badge: "Divine Power",
      highlight: true,
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
              <p className="text-white/70 text-sm mt-1">See what you get with Free and Plans A–D.</p>
            </div>
            <div className="flex gap-3">
              <a href="/premium/compare" className="btn btn-outline">View full comparison</a>
              <a href="#buy" className="btn btn-primary">Buy a plan</a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Elite Supporter Highlight */}
      <section className="container py-8">
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Elite & God Supporter Tiers
              </span>
            </h2>
            <p className="text-white/80 text-lg mb-6">
              Unlock the ultimate Swelly experience with our premium supporter tiers. Get exclusive access to advanced features, 
              priority support, and help shape the future of Swelly with your feedback.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="card p-4">
                <h3 className="font-semibold text-yellow-400 mb-2">✨ Elite Supporter Benefits</h3>
                <ul className="text-white/70 space-y-1">
                  <li>• 30 server premium activation</li>
                  <li>• 5 additional premium bots</li>
                  <li>• Direct input on feature development</li>
                  <li>• Custom voice & text channels</li>
                </ul>
              </div>
              <div className="card p-4">
                <h3 className="font-semibold text-red-400 mb-2">🔥 God Supporter Benefits</h3>
                <ul className="text-white/70 space-y-1">
                  <li>• Divine power of Swelly x Flute</li>
                  <li>• Exclusive God-only commands</li>
                  <li>• Community recognition</li>
                  <li>• Early access to new features</li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Pricing */}
      <section id="buy" className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-center mb-2">Choose your plan</h2>
          <p className="text-white/70 text-center mb-8">From basic premium to divine supporter tiers</p>
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
            <a href="#buy" className="flex-1 text-center rounded-lg py-3 text-sm font-medium text-white bg-gradient-to-r from-primary via-accent-violet to-primary-light shadow-glow">Buy a plan</a>
          </div>
        </div>
      </div>
      <div className="h-20 md:h-0" aria-hidden="true" />
    </div>
  );
}
