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
  // Optional banner image (e.g., "/banners/ayush.jpg" in public/ or a remote URL allowed by next.config)
  bannerImage?: string;
};

export const TEAM: Member[] = [
  {
    name: "Ayush Edith",
    role: "Founder & Lead",
    bio: "Building fast, reliable music experiences for communities.",
    about:
      "Ayush leads product and engineering for Swelly — focusing on low-latency audio, robust scaling, and delightful UX. He previously worked on media-heavy platforms and enjoys optimizing for reliability.",
    socials: [
      { label: "Website", url: "https://meayush.xyz" },
      { label: "GitHub", url: "https://github.com/ayushedith" },
      { label: "Twitter", url: "https://twitter.com/ayushedith" },
    ],
    image: "/swelly1.png",
    slug: "ayush-edith",
    bannerImage: "/banners/ayush.jpg",
  
  discordId: "581525444424368131",
  discordAvatar: "b5b9c5ff013d0247144930cfac1297b9",
  },
  {
    name: "Rin Park",
    role: "Frontend Engineer",
    bio: "Designing beautiful UIs and delightful interactions.",
    about:
      "Rin crafts responsive, accessible interfaces and loves micro-interactions. She enjoys experimenting with motion and bringing pixel-perfect interfaces to life.",
    socials: [
      { label: "Portfolio", url: "https://rin.design" },
      { label: "GitHub", url: "https://github.com/rinpark" },
    ],
    image: "/swellyG1.png",
    slug: "rin-park",
    
    discordId: "641258822714785822",
    discordAvatar: null,
  },
  {
    name: "Mia Santos",
    role: "Backend Engineer",
    bio: "Scaling the bot and keeping playback rock-solid.",
    about:
      "Mia designs resilient systems, focusing on observability and performance. She builds infrastructure that keeps the music flowing under load.",
    socials: [
      { label: "GitHub", url: "https://github.com/miasantos" },
      { label: "LinkedIn", url: "https://linkedin.com/in/mia-santos" },
    ],
    image: "/swellyG2.png",
    slug: "mia-santos",
    discordId: "742984554729570415",
    discordAvatar: null,
  },
  {
    name: "Alex Chen",
    role: "Community Manager",
    bio: "Helping communities get the most out of Swelly.",
    about:
      "Alex runs community programs, creates guides, and organizes events. He loves helping server owners get the most value from Swelly.",
    socials: [
      { label: "Discord", url: "https://discord.gg/swelly" },
      { label: "Twitter", url: "https://twitter.com/alexchen" },
    ],
    image: "/mascot.png",
    slug: "alex-chen",
    discordId: "1074336035783331841",
    discordAvatar: null,
  },
];

export function findMemberBySlug(slug?: string) {
  if (!slug) return null;
  return TEAM.find((m) => m.slug === slug) ?? null;
}

export function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
