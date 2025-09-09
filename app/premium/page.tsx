export const metadata = { title: "Premium" };

import Image from "next/image";
import PremiumTiers from '@/components/PremiumTiers';
import PageHeader from "@/components/layout/PageHeader";



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
    <>
      <PageHeader title="Unlock Premium Features" subtitle="24/7 Music, Higher Queue Limits, Exclusive Filters, Priority Support." right={<Image src="/prime.png" alt="Swelly Premium" width={96} height={96} className="drop-shadow-[0_0_22px_rgba(239,68,68,0.35)]" />} />
      <div className="container py-10">
        <PremiumTiers tiers={tiers} />
        <div className="text-center mt-10">
          <button className="btn btn-primary">Get Premium</button>
          <div className="mt-3">
            <a href="/premium/compare" className="text-sm text-white/60 hover:text-white">Compare plans</a>
          </div>
        </div>
      </div>
    </>
  );
}
