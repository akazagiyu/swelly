import CommandSearch, { Command } from "@/components/CommandSearch";
import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { getAllCommands } from "@/lib/commands";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commands",
  description: "Explore all Swelly Discord bot commands. Search through music controls, queue management, filters, playlists, and more. Complete command reference with examples and usage guides.",
  openGraph: {
    title: "Swelly Commands - Complete Bot Command Reference",
    description: "Explore all Swelly Discord bot commands. Music controls, queue management, filters, and more.",
    images: [
      {
        url: "/swellyG1.png",
        width: 1200,
        height: 630,
        alt: "Swelly Bot Commands"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly Commands - Complete Bot Command Reference",
    description: "Explore all Swelly Discord bot commands. Music controls, queue management, filters, and more.",
    images: ["/swellyG1.png"]
  }
};

export default async function CommandsPage() {
  const commands: Command[] = getAllCommands();
  return (
    <>
      <PageHeader title="Commands" subtitle="Search and filter Swelly commands. Click a command to see example usage." />
      <div className="container py-8">
        <Suspense fallback={<div className="text-white/70">Loading commands…</div>}>
          <CommandSearch commands={commands} />
        </Suspense>
      </div>
    </>
  );
}
