import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invite Discord Bots | Swelly - Premium Music & Utility Bots",
  description: "Invite Swelly's premium Discord bots to your server. Get access to Flute, Swelly, Swelly 2, Swelly Beats, and Swelly Prime. High-quality music streaming, advanced features, and 24/7 uptime. One-click invite with zero setup required.",
  keywords: [
    "Discord bots",
    "music bots",
    "Swelly",
    "Discord music bot",
    "utility bots",
    "premium bots",
    "bot invite"
  ],
  authors: [{ name: "Swelly" }],
  creator: "Swelly",
  publisher: "Swelly",
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://swelly.com/invite",
    title: "Invite Swelly's Premium Discord Bots",
    description: "Add Swelly bots to your Discord server. Premium music streaming (320kbps), utility features, and dedicated support. 5,000+ active servers. Zero setup required.",
    siteName: "Swelly",
    images: [
      {
        url: "/swelly3.png",
        width: 1200,
        height: 630,
        alt: "Swelly Discord Bots - Invite Now",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Invite Swelly's Premium Discord Bots",
    description: "Add our premium Discord bots: Flute, Swelly, Swelly 2, Swelly Beats & Swelly Prime. High-quality music, advanced features, 24/7 support.",
    images: ["/swelly3.png"],
    creator: "@SwellyBot",
    site: "@SwellyBot"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  alternates: {
    canonical: "https://swelly.com/invite"
  }
};

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
