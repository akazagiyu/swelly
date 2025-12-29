import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Compare",
  description: "Compare Swelly premium plans and features. See detailed breakdown of servers included, advanced audio effects, playlist limits, queue sizes, and exclusive premium bot access across all tiers.",
  openGraph: {
    title: "Compare Swelly Premium Plans - Features & Pricing",
    description: "Compare all Swelly premium tiers with detailed feature breakdown and pricing options.",
    images: [
      {
        url: "/prime.png",
        width: 1200,
        height: 630,
        alt: "Swelly Premium Plans Comparison"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Swelly Premium Plans - Features & Pricing",
    description: "Compare all Swelly premium tiers with detailed feature breakdown and pricing options.",
    images: ["/prime.png"]
  }
};

// Columns: Feature | Free | Swelly Bronze | Swelly Plus | Swelly Pro | Swelly Gold | Swelly Diamond | Swelly Ultimate
const rows = [
  { k: "Servers included", free: "-", a: "1", b: "3", c: "5", d: "7", e: "8", f: "10" },
  { k: "24/7 Mode", free: "-", a: "✓", b: "✓", c: "✓", d: "✓", e: "✓", f: "✓" },
  { k: "Autoplay Mode", free: "-", a: "✓", b: "✓", c: "✓", d: "✓", e: "✓", f: "✓" },
  { k: "Unique/Advanced Audio Effects", free: "-", a: "✓", b: "✓", c: "✓", d: "✓", e: "✓", f: "✓" },
  { k: "No Vote Requirement", free: "-", a: "✓", b: "✓", c: "✓", d: "✓", e: "✓", f: "✓" },
  { k: "Premium Role (Community Server)", free: "-", a: "✓", b: "✓", c: "✓", d: "✓", e: "✓", f: "✓" },
  { k: "Premium Bots Access", free: "-", a: "3 bots", b: "3 bots", c: "3 bots", d: "3 bots", e: "3 bots", f: "3 bots" },
  { k: "Create Playlists", free: "10", a: "100", b: "500", c: "500", d: "500", e: "500", f: "500" },
  { k: "Songs per Playlist", free: "1,000", a: "10,000+", b: "Unlimited", c: "Unlimited", d: "Unlimited", e: "Unlimited", f: "Unlimited" },
  { k: "Queue Length", free: "5,000", a: "25,000", b: "Unlimited", c: "Unlimited", d: "Unlimited", e: "Unlimited", f: "Unlimited" },
  { k: "Volume Command", free: "-", a: "-", b: "✓", c: "✓", d: "✓", e: "✓", f: "✓" },
  { k: "Spotify Links", free: "Limited", a: "Unlimited", b: "Unlimited", c: "Unlimited", d: "Unlimited", e: "Unlimited", f: "Unlimited" },
  { k: "YouTube Links", free: "Limited", a: "Unlimited", b: "Unlimited", c: "Unlimited", d: "Unlimited", e: "Unlimited", f: "Unlimited" },
  { k: "Priority Support", free: "Community", a: "-", b: "All-times priority", c: "All-times priority", d: "All-times priority", e: "High priority", f: "Direct dev support" },
  { k: "Zero Lag Nodes", free: "-", a: "-", b: "-", c: "-", d: "-", e: "✓", f: "✓" },
  { k: "Beta & Experimental Features", free: "-", a: "-", b: "-", c: "-", d: "-", e: "-", f: "✓" },
];

export default function PremiumComparePage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-2">Compare plans</h1>
      <p className="text-white/70 mb-6">Free vs Swelly tiers — pick what fits your server.</p>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead className="text-white/60">
            <tr>
              <th className="text-left py-3 px-2 sticky left-0 bg-transparent backdrop-blur-md">Feature</th>
              <th className="text-left py-3 px-2">Free</th>
              <th className="text-left py-3 px-2">Swelly Bronze</th>
              <th className="text-left py-3 px-2">Swelly Plus <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-primary/20 text-white/90">Popular</span></th>
              <th className="text-left py-3 px-2">Swelly Pro</th>
              <th className="text-left py-3 px-2">Swelly Gold</th>
              <th className="text-left py-3 px-2">Swelly Diamond</th>
              <th className="text-left py-3 px-2">Swelly Ultimate</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.k} className="border-t border-white/5">
                <td className="py-3 px-2 sticky left-0 bg-background/60 backdrop-blur-md">{r.k}</td>
                <td className="py-3 px-2">{r.free}</td>
                <td className="py-3 px-2">{r.a}</td>
                <td className="py-3 px-2">{r.b}</td>
                <td className="py-3 px-2">{r.c}</td>
                <td className="py-3 px-2">{r.d}</td>
                <td className="py-3 px-2">{r.e}</td>
                <td className="py-3 px-2">{r.f}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-3 text-xs text-white/50 md:hidden">Swipe horizontally to see all plans →</div>

      <div className="text-center mt-8">
        <a href="/premium" className="btn btn-primary">Choose a plan</a>
      </div>
    </div>
  );
}
