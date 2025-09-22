import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servers",
  description: "Manage your Discord servers with Swelly. View all servers where you have permissions, configure music settings, and access advanced bot management features.",
  openGraph: {
    title: "Manage Your Discord Servers with Swelly",
    description: "Configure Swelly settings across all your Discord servers with advanced management tools.",
    images: [
      {
        url: "/swellyG1.png",
        width: 1200,
        height: 630,
        alt: "Swelly Server Management"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Manage Your Discord Servers with Swelly",
    description: "Configure Swelly settings across all your Discord servers with advanced management tools.",
    images: ["/swellyG1.png"]
  }
};

export default function ServersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}