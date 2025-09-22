import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stay updated with the latest Swelly features, updates, and announcements. Read about new filters, maintenance schedules, and exciting improvements to your Discord music experience.",
  openGraph: {
    title: "Swelly Blog - Latest Updates & Features",
    description: "Stay updated with the latest Swelly features, updates, and announcements.",
    images: [
      {
        url: "/swellyG2.png",
        width: 1200,
        height: 630,
        alt: "Swelly Blog Updates"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly Blog - Latest Updates & Features",
    description: "Stay updated with the latest Swelly features, updates, and announcements.",
    images: ["/swellyG2.png"]
  }
};

const posts = [
  { id: 1, title: "Swelly v2.1: New Filters", date: "2025-08-10", excerpt: "We added chorus and phaser filters…" },
  { id: 2, title: "Maintenance 8/15", date: "2025-08-15", excerpt: "Short downtime for database upgrades." },
];

export default function BlogPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Updates</h1>
      <div className="space-y-4">
        {posts.map((p) => (
          <article key={p.id} className="card">
            <div className="text-white/50 text-sm">{p.date}</div>
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-white/70">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
