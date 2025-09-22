import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invite",
  description: "Add Swelly to your Discord server for free! Get premium music features, crystal-clear audio, and powerful queue management. Simple 3-step setup process.",
  openGraph: {
    title: "Invite Swelly to Your Discord Server",
    description: "Add the ultimate Discord music bot to your server. Free premium features and crystal-clear audio.",
    images: [
      {
        url: "/swelly3.png",
        width: 1200,
        height: 630,
        alt: "Invite Swelly Bot"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Invite Swelly to Your Discord Server",
    description: "Add the ultimate Discord music bot to your server. Free premium features and crystal-clear audio.",
    images: ["/swelly3.png"]
  }
};

import Image from "next/image";

export default function InvitePage() {
  const inviteUrl = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || "#";
  const steps = [
    { n: 1, t: "Click Invite", d: "Open the Discord authorization page." },
    { n: 2, t: "Choose Your Server", d: "Pick the server where you have Manage Server permission." },
    { n: 3, t: "Enjoy Music", d: "Use /play to start your first track!" },
  ];
  return (
    <div className="container py-12 text-center">
      <Image src="/swelly3.png" alt="Swelly invite" width={160} height={160} className="mx-auto mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.35)]" />
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Add Swelly to Your Server</h1>
      <p className="text-white/70 mb-8">Bring premium music features to your community.</p>
      <a href={inviteUrl} target="_blank" rel="noreferrer" className="btn btn-primary text-lg px-6 py-3">
        Invite Now
      </a>
      <div className="grid sm:grid-cols-3 gap-4 mt-10 text-left">
        {steps.map((s) => (
          <div key={s.n} className="card">
            <div className="text-primary text-2xl font-extrabold">{s.n}</div>
            <div className="mt-1 font-semibold">{s.t}</div>
            <div className="text-white/70 text-sm mt-1">{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
