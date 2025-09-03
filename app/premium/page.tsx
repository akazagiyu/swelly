export const metadata = { title: "Premium" };

import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";

export default function PremiumPage() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Core music commands",
        "Play from Spotify/YouTube/SoundCloud",
        "Basic queue",
      ],
      cta: "Current Plan",
    },
    {
      name: "Premium",
      price: "$4.99/mo",
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
      price: "$9.99/mo",
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
    <>
      <PageHeader title="Unlock Premium Features" subtitle="24/7 Music, Higher Queue Limits, Exclusive Filters, Priority Support." right={<Image src="/prime.png" alt="Swelly Premium" width={96} height={96} className="drop-shadow-[0_0_20px_rgba(239,68,68,0.35)]" />} />
      <div className="container py-10">
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div key={t.name} className={`card relative ${t.highlight ? "border-primary/40" : ""}`}>
            {t.highlight && (
              <div className="absolute -top-3 right-4 text-xs bg-primary text-white px-2 py-1 rounded">Most Popular</div>
            )}
            <h3 className="text-xl font-semibold">{t.name}</h3>
            <div className="text-3xl font-extrabold mt-2">{t.price}</div>
            <ul className="mt-4 space-y-2 text-white/80 text-sm">
              {t.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <button className={`btn w-full mt-6 ${t.highlight ? "btn-primary" : "btn-outline"}`}>{t.cta}</button>
          </div>
        ))}
      </div>
        <div className="text-center mt-10">
          <button className="btn btn-primary">Get Premium</button>
        </div>
      </div>
    </>
  );
}
