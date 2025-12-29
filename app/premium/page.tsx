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
      name: "Swelly Bronze",
      subtitle: "Activate premium in 1 server",
      price: { monthly: "$2.19", yearly: "$21.90" },
      features: [
        "🎁 7 Days Free Trial - No credit card required",
        "24/7 & Autoplay Mode",
        "Exclusive Audio Filters & Effects",
        "Higher song queue limit (ec: 100 → 300)",
        "Early access to announcements & polls",
        "Expanded Playlist Limits",
        "No Voting Required",
        "Valid for 1 Server (Without Premium Bots)",
        "General Support",
        "Discord access",
      ],
      cta: "🎁 Start Free Trial",
      href: {
        monthly: "https://www.patreon.com/checkout/Swelly?rid=27583127&is_free_trial=true",
        yearly: "https://www.patreon.com/checkout/Swelly?rid=27583127&cadence=12"
      },
      badge: "Great start",
      
    },
    {
      name: "Swelly Plus",
      subtitle: "Activate premium in 3 servers",
      price: { monthly: "$3.99", yearly: "$39.90" },
      features: [
        "Everything from Bronze",
        "Higher audio quality",
        "3 Bonus High-Quality Bots",
        "Reduced command cooldowns",
        "Access to basic audio filters (bass boost, nightcore, 8D)",
        "Valid for 1 Server (With Premium Bots)",
        "General Support",
        "Discord access",
      ],
      cta: "Buy Swelly Plus",
      href: {
        monthly: "https://www.patreon.com/checkout/Swelly?rid=9953630",
        yearly: "https://www.patreon.com/checkout/Swelly?rid=9953630&cadence=12"
      },
      badge: "Most Popular",
      highlight: true,
    },
    {
      name: "Swelly Pro",
      subtitle: "Activate premium in 5 servers",
      price: { monthly: "$5.99", yearly: "$59.90" },
      features: [
        "Everything from Plus",
        "Faster track load speed",
        "Unlimited queue size",
        "Unlimited Links any Platforms",
        "Valid for 3 Servers",
        "Early access to new features",
        "Discord access",
      ],
      cta: "Buy Swelly Pro",
      href: {
        monthly: "https://www.patreon.com/checkout/Swelly?rid=9953631",
        yearly: "https://www.patreon.com/checkout/Swelly?rid=9953631&cadence=12"
      },
      badge: "Multi-server",
    },
    {
      name: "Swelly Gold",
      subtitle: "Activate premium in 7 servers",
      price: { monthly: "$7.99", yearly: "$79.90" },
      features: [
        "Includes all features of Pro",
        "Premium bot instance",
        "Smart autoplay (AI recommendations)",
        "Valid for 5 Servers",
        "General Support",
        "Early access",
        "Discord access",
      ],
      cta: "Buy Swelly Gold",
      href: {
        monthly: "https://www.patreon.com/checkout/Swelly?rid=26236976",
        yearly: "https://www.patreon.com/checkout/Swelly?rid=26236976&cadence=12"
      },
      badge: "Best for larger",
    },
    {
      name: "Swelly Diamond",
      subtitle: "Activate premium in 8 servers",
      price: { monthly: "$11.49", yearly: "$114.90" },
      features: [
        "Includes all features of Swelly Gold",
        "Highest priority nodes (zero lag)",
        "Unlimited 24/7 servers",
        "Valid for 8 servers",
        "General support",
        "Early access to new features",
        "Discord access",
      ],
      cta: "Buy Swelly Diamond",
      href: {
        monthly: "https://www.patreon.com/checkout/Swelly?rid=27429031",
        yearly: "https://www.patreon.com/checkout/Swelly?rid=27429031&cadence=12"
      },
      badge: "Premium Performance",
    },
    {
      name: "Swelly Ultimate",
      subtitle: "Activate premium in 10 servers",
      price: { monthly: "$15.99", yearly: "$159.90" },
      features: [
        "Everything Unlocked",
        "Direct dev support (DM / ticket priority)",
        "Beta & experimental features access",
        "Custom bot coming soon",
        "Valid for 10 servers",
        "General support",
        "Early access to new features",
        "Discord access",
      ],
      cta: "Buy Swelly Ultimate",
      href: {
        monthly: "https://www.patreon.com/checkout/Swelly?rid=21760348",
        yearly: "https://www.patreon.com/checkout/Swelly?rid=21760348&cadence=12"
      },
      badge: "Ultimate Experience",
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
                  <a href="#features" className="btn btn-outline">See features</a>
                </div>
              </ScrollReveal>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Image src="/prime.png" alt="Swelly Premium" width={200} height={200} className="drop-shadow-[0_0_24px_rgba(239,68,68,0.35]" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards - FIRST PRIORITY */}
      <section id="buy" className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-center mb-2">Choose your plan</h2>
          <p className="text-white/70 text-center mb-8">From basic premium to divine supporter tiers</p>
        </ScrollReveal>
        <PremiumTiers tiers={tiers} />
        <div className="text-center mt-10">
          <a href="#features" className="text-sm text-white/60 hover:text-white">See all features →</a>
        </div>
      </section>

      {/* Why Choose Swelly Premium */}
      <section className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-center mb-2">Why Choose Swelly Premium?</h2>
          <p className="text-white/70 text-center mb-12">Experience the difference with premium features</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-4">
                <span className="text-3xl">🎧</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Superior Audio Quality</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Crystal-clear sound with advanced audio filters and effects. Experience music the way it was meant to be heard.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Instant song loading, no buffering, and seamless playback across multiple platforms and sources.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Reliable & Secure</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                99.9% uptime guarantee with dedicated premium servers and priority support whenever you need it.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-12">
        <div className="card p-8 bg-gradient-to-br from-primary/10 via-accent-violet/10 to-purple-900/10">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-center mb-8">Trusted by Thousands</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-white/70 text-sm">Active Servers</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-violet mb-2">10M+</div>
                <div className="text-white/70 text-sm">Songs Played Daily</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-light mb-2">99.9%</div>
                <div className="text-white/70 text-sm">Uptime</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-white/70 text-sm">Premium Support</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="features" className="container py-12">
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

      {/* Advanced Features Showcase */}
      <section className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-center mb-2">Premium Features</h2>
          <p className="text-white/70 text-center mb-8">Advanced capabilities for the ultimate music experience</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { i: "🎵", t: "Unlimited Playlists", d: "Create up to 500 custom playlists with 10,000+ songs each" },
            { i: "🔊", t: "Audio Filters", d: "Bassboost, nightcore, vaporwave, and more amazing effects" },
            { i: "📊", t: "Queue Management", d: "Unlimited queue length with advanced controls" },
            { i: "🎯", t: "Priority Support", d: "Get help faster with dedicated premium support" },
            { i: "🤖", t: "Premium Bots", d: "Access to 3-5 additional premium music bots" },
            { i: "🌐", t: "Multi-Platform", d: "Play from Spotify, YouTube, SoundCloud seamlessly" },
            { i: "⚡", t: "No Vote Skip", d: "Skip songs instantly without community votes" },
            { i: "🎪", t: "Volume Control", d: "Adjust bot volume to your server's preference" },
          ].map((feature, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="card p-4 text-center">
                <div className="text-3xl mb-3">{feature.i}</div>
                <div className="font-semibold text-sm mb-2">{feature.t}</div>
                <div className="text-white/60 text-xs leading-relaxed">{feature.d}</div>
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

      {/* Testimonials */}
      <section className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-center mb-2">What our users say</h2>
          <p className="text-white/70 text-center mb-8">Join thousands of satisfied Discord communities</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              name: "Alex M.",
              role: "Swelly Gold User",
              content: "The 24/7 mode is a game changer! Our community never stops jamming. Worth every penny for the premium experience.",
              rating: 5
            },
            {
              name: "Sarah K.",
              role: "Swelly Plus User",
              content: "Amazing audio filters and unlimited queue length. Swelly Premium transformed our Discord server's music experience completely.",
              rating: 5
            },
            {
              name: "Discord Server Owner",
              role: "Swelly Pro User",
              content: "Incredible features and support! The premium features make it easy to manage music across multiple servers.",
              rating: 5
            }
          ].map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="card p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-white/60 text-xs">{testimonial.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-center mb-2">Frequently Asked Questions</h2>
          <p className="text-white/70 text-center mb-8">Everything you need to know about Swelly Premium</p>
        </ScrollReveal>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "How does billing work?",
              a: "You can choose between monthly or yearly billing. Yearly plans offer significant savings compared to monthly payments."
            },
            {
              q: "Can I upgrade or downgrade my plan?",
              a: "Yes! You can change your plan anytime through your Patreon dashboard. Changes take effect immediately."
            },
            {
              q: "What happens if I cancel my subscription?",
              a: "Your premium features will remain active until the end of your current billing period. After that, you'll revert to the free plan."
            },
            {
              q: "How many servers can I activate premium on?",
              a: "It depends on your plan: Swelly Bronze (1 server), Swelly Plus (3 servers), Swelly Pro (5 servers), Swelly Gold (7 servers), Swelly Diamond (8 servers), Swelly Ultimate (10 servers)."
            },
            {
              q: "Do you offer refunds?",
              a: "We offer refunds within 7 days of purchase if you're not satisfied with the premium features."
            }
          ].map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <details className="card p-5 group">
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <span className="text-white/50 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-white/70 mt-3 text-sm leading-relaxed">{faq.a}</p>
              </details>
            </ScrollReveal>
          ))}
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
