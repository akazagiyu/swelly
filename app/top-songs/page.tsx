import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Songs",
  description: "Discover the most popular music tracks played on Swelly Discord bot. See trending songs, top artists, and what the community is listening to across thousands of servers.",
  openGraph: {
    title: "Top Songs on Swelly - Trending Music",
    description: "Discover the most popular tracks and trending music played across Swelly Discord servers.",
    images: [
      {
        url: "/swelly1.png",
        width: 1200,
        height: 630,
        alt: "Swelly Top Songs"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Songs on Swelly - Trending Music",
    description: "Discover the most popular tracks and trending music played across Swelly Discord servers.",
    images: ["/swelly1.png"]
  }
};

const songs = [
  { id: 1, title: "Echoes of Night", artist: "Lunaria", plays: 125432, thumb: "/swelly1.png" },
  { id: 2, title: "Neon Drift", artist: "VaporVox", plays: 110221, thumb: "/swelly3.png" },
  { id: 3, title: "Crystal Waves", artist: "Auralux", plays: 102334, thumb: "/prime.png" },
];

export default function TopSongsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Top Songs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((s) => (
          <div key={s.id} className="card flex items-center gap-4">
            <Image src={s.thumb} alt={s.title} width={72} height={72} className="rounded" />
            <div className="min-w-0">
              <div className="font-semibold truncate">{s.title}</div>
              <div className="text-white/60 text-sm truncate">{s.artist}</div>
              <div className="text-white/50 text-xs">{s.plays.toLocaleString()} plays</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
