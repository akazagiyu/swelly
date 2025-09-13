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
    },
    {
      name: "Premium",
      price: { monthly: "$4.99", yearly: "$49.99" },
      features: [
        "High-quality audio",
        "All audio filters",
        "24/7 mode",
        "Global volume",
      ],
      highlight: true,
      cta: "Buy Premium",
    },
    {
      name: "Guild Pro",
      price: { monthly: "$9.99", yearly: "$99.99" },
      features: [
        "Priority queue",
        "Multiple filters combined",
        "Bigger autoplay list",
        "Priority support",
      ],
      cta: "Contact Sales",
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
                  <a href="#pricing" className="btn btn-primary">Get Premium</a>
                  <a href="/premium/compare" className="btn btn-outline">Compare plans</a>
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
            { i: "⏱️", t: "24/7 Uptime", d: "Keep music running around the clock." },
            { i: "🎚️", t: "All Filters", d: "Bass boost, nightcore, vaporwave, and more." },
            { i: "🚀", t: "Priority Queue", d: "Skip the line with premium queue access." },
            { i: "🧰", t: "Advanced Controls", d: "Global volume, autoplay tuning, and more." },
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

      {/* Pricing */}
      <section id="pricing" className="container py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-center mb-6">Choose your plan</h2>
        </ScrollReveal>
        <PremiumTiers tiers={tiers} />
        <div className="text-center mt-10">
          <a href="/premium/compare" className="text-sm text-white/60 hover:text-white">Compare plans →</a>
        </div>
      </section>
    </div>
  );
}
