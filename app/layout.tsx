import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/providers/Providers";
import dynamic from "next/dynamic";
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false });
const FloatingSupportButton = dynamic(() => import("@/components/FloatingSupportButton"), { ssr: false });
import MobileCta from "@/components/MobileCta";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-display" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Swelly",
    template: "%s • Swelly",
  },
  description:
    "Swelly is a free, high-quality Discord music bot with Spotify, Apple Music, SoundCloud support, filters, and more.",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Swelly — Free High-Quality Discord Music Bot",
    description:
      "Crystal-clear audio, powerful queues and filters, buttery-smooth playback.",
    url: siteUrl,
    siteName: "Swelly",
    images: [
      { url: "/swellyMascot.png", width: 1200, height: 630, alt: "Swelly" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly — Free High-Quality Discord Music Bot",
    description:
      "Crystal-clear audio, powerful queues and filters, buttery-smooth playback.",
    images: ["/swellyMascot.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
  <html lang="en">
      <body
        className={`${inter.variable} ${rubik.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
          {/* Skip link for keyboard users */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-white focus:text-black"
          >
            Skip to content
          </a>
          <Providers>
            <Navbar />
            <main id="main-content" className="min-h-[calc(100vh-160px)]" role="main">
              {children}
            </main>
            <MobileCta />
            <Footer />
            <CookieConsent />
            <FloatingSupportButton />
          </Providers>
      </body>
    </html>
  );
}
