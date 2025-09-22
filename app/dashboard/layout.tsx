import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your Discord servers with Swelly. Configure music settings, view server statistics, customize bot permissions, and control playback preferences for your communities.",
  openGraph: {
    title: "Swelly Dashboard - Manage Your Discord Servers",
    description: "Manage your Discord servers with Swelly. Configure music settings and view server statistics.",
    images: [
      {
        url: "/prime.png",
        width: 1200,
        height: 630,
        alt: "Swelly Dashboard"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly Dashboard - Manage Your Discord Servers",
    description: "Manage your Discord servers with Swelly. Configure music settings and view server statistics.",
    images: ["/prime.png"]
  }
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}