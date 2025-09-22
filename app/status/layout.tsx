import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status",
  description: "Check Swelly Discord bot status, server uptime, and shard information. Monitor bot performance, latency, and operational status across all Discord servers in real-time.",
  openGraph: {
    title: "Swelly Bot Status - Real-time Monitoring",
    description: "Check bot uptime, server status, and performance metrics in real-time.",
    images: [
      {
        url: "/swellyG1.png",
        width: 1200,
        height: 630,
        alt: "Swelly Bot Status"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly Bot Status - Real-time Monitoring",
    description: "Check bot uptime, server status, and performance metrics in real-time.",
    images: ["/swellyG1.png"]
  }
};

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}