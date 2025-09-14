export type Social = { label: string; url: string };
// discordId and discordAvatar are optional — if provided we will render the
// avatar from Discord's CDN (preferred). Otherwise fall back to `image`.
export type Member = {
  name: string;
  role: string;
  bio: string;
  about?: string;
  socials?: Social[];
  image: string;
  slug: string;
  discordId?: string;
  discordAvatar?: string | null;
  badgeClass?: string;
  // Optional banner image (e.g., "/banners/ayush.jpg" in public/ or a remote URL allowed by next.config)
  bannerImage?: string;
};

// Centralized badge styles by role keyword to keep visual consistency.
// Falls back to a neutral indigo style if there’s no match.
export const ROLE_BADGES: Record<string, string> = {
  owner: "px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/20 text-rose-300",
  coowner: "px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300",
  developer: "px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300",
  moderator: "px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300",
  community: "px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300",
};

export const TEAM: Member[] = [
  {
    name: "Ashis",
    role: "Developer",
    bio: "Full‑stack developer shipping features and performance improvements across the bot.",
    about:
      "Ashis focuses on core features, stability, and developer experience. Loves clean code, fast builds, and smooth UX for both users and contributors.",
    socials: [
      { label: "Instagram", url: "https://instagram.com/ashis" },
      { label: "Discord", url: "https://discord.gg/swelly" },
      { label: "Portfolio", url: "https://ashis.dev" },
    ],
    image: "/swellyG1.png",
    bannerImage: "/banners/ashis.jpg",
    slug: "ashis",
    discordId: "742984554729570415",
    discordAvatar: null,
  badgeClass: "px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300",
  },
  {
    name: "EDiTH",
    role: "Owner & Website Manager",
    bio: "Building fast, reliable music experiences for communities and maintaining the Swelly website.",
    about:
      "Edith leads product and web experience for Swelly — focusing on low‑latency audio, robust scaling, and delightful UI. Previously worked on media platforms and enjoys optimizing for reliability.",
    socials: [
      { label: "Website", url: "https://meayush.xyz" },
      { label: "GitHub", url: "https://github.com/ayushedith" },
      { label: "Twitter", url: "https://twitter.com/ayushedith" },
    ],
    image: "/swelly1.png",
    slug: "ayush-edith",
    bannerImage: "/banners/edith.jpg",
    discordId: "581525444424368131",
    discordAvatar: null,
  badgeClass: "px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/20 text-rose-300",
  },
  {
    name: "ROS",
    role: "Co-Owner",
    bio: "Co‑owner focusing on operations, partnerships, and product direction.",
    about:
      "ROS keeps the wheels turning — aligning roadmap, partnerships, and community needs to deliver a reliable music experience.",
    socials: [
      { label: "Instagram", url: "https://instagram.com/ros" },
      { label: "Discord", url: "https://discord.gg/swelly" },
      { label: "Twitter", url: "https://twitter.com/ros" },
    ],
    image: "/swellyG2.png",
    slug: "ros",
    discordId: "641258822714785822",
    discordAvatar: null,
  badgeClass: "px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300",
  },
  {
    name: "Aron",
    role: "Community Moderator",
    bio: "Moderating the community and helping users get the most out of Swelly.",
    about:
      "Aron supports users, enforces guidelines, and surfaces feedback to improve the product. Passionate about helpful docs and friendly support.",
    socials: [
      { label: "Discord", url: "https://discord.gg/swelly" },
      { label: "Instagram", url: "https://instagram.com/aron" },
    ],
    image: "/mascot.png",
    slug: "aron",
    discordId: "1074336035783331841",
    discordAvatar: null,
  badgeClass: "px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300",
  },
];
export function findMemberBySlug(slug?: string) {
  if (!slug) return null;
  return TEAM_ENRICHED.find((m) => m.slug === slug) ?? null;
}

export function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Apply sensible defaults for missing fields when adding members.
export function withDefaults(m: Member): Member {
  const key = m.role.toLowerCase().replace(/[^a-z]/g, '');
  const fallback = "px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300";
  return {
    ...m,
    slug: m.slug && m.slug.trim().length ? m.slug : slugify(m.name),
    badgeClass: m.badgeClass ?? ROLE_BADGES[key] ?? fallback,
  };
}

// Enriched list with defaults applied, leaving original TEAM untouched for backwards-compat.
export const TEAM_ENRICHED: Member[] = TEAM.map(withDefaults);

/**
 * Quick template for adding a new member:
 *
 * {
 *   name: "Full Name",
 *   role: "Developer", // influences badge color automatically
 *   bio: "One-line bio for cards",
 *   about: "Optional longer about text",
 *   socials: [ { label: "GitHub", url: "https://github.com/user" } ],
 *   image: "/path/in/public.png",
 *   // slug: slugify(name), // optional; will be auto-generated from name if omitted
 *   // discordId: "1234567890",
 *   // discordAvatar: null,
 *   // bannerImage: "/banners/user.jpg",
 *   // badgeClass: "..." // optional; otherwise derived from role
 * }
 */
