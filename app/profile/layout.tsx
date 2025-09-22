import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your Swelly Discord profile. See your music statistics, server preferences, premium status, and account settings. Customize your music bot experience.",
  openGraph: {
    title: "Your Swelly Profile - Music Stats & Settings",
    description: "View your music statistics, premium status, and customize your Swelly experience.",
    images: [
      {
        url: "/mascot.png",
        width: 1200,
        height: 630,
        alt: "Swelly Profile"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Swelly Profile - Music Stats & Settings",
    description: "View your music statistics, premium status, and customize your Swelly experience.",
    images: ["/mascot.png"]
  }
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}