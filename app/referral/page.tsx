import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral",
  description: "Join the Swelly referral program and earn premium perks by inviting friends. Get rewards for bringing new users to the ultimate Discord music bot community.",
  openGraph: {
    title: "Swelly Referral Program - Earn Premium Perks",
    description: "Invite friends to Swelly and earn premium rewards and perks for growing our music community.",
    images: [
      {
        url: "/prime.png",
        width: 1200,
        height: 630,
        alt: "Swelly Referral Program"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly Referral Program - Earn Premium Perks",
    description: "Invite friends to Swelly and earn premium rewards and perks for growing our music community.",
    images: ["/prime.png"]
  }
};

export default function ReferralPage() {
  const invite = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || "#";
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Referral Program</h1>
      <p className="text-white/70 mb-4">Invite Swelly and earn perks or premium trials.</p>
      <div className="flex gap-3">
        <a href={invite} target="_blank" rel="noreferrer" className="btn btn-primary">Invite Swelly</a>
        <button className="btn btn-outline">Copy Referral Link</button>
      </div>
      <div className="card mt-6 text-white/70">Referral stats placeholder.</div>
    </div>
  );
}
