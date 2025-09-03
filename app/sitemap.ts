import { getAllCommands } from "@/lib/commands";

export default function sitemap() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticRoutes = [
    "",
    "/commands",
    "/premium",
    "/premium/compare",
    "/invite",
    "/status",
    "/servers",
    "/dashboard",
    "/leaderboard",
    "/profile",
    "/faq",
    "/top-songs",
    "/support",
    "/blog",
  ].map((p) => ({ url: `${site}${p}`, lastModified: new Date() }));

  const commandRoutes = getAllCommands().map((c) => ({
    url: `${site}/commands/${c.name}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...commandRoutes];
}
