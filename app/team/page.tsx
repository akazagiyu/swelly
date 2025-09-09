import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { TEAM, slugify } from "./data";

function modFromString(numStr: string, m: number) {
  let r = 0;
  for (let i = 0; i < numStr.length; i++) {
    const c = numStr.charCodeAt(i) - 48; // '0' => 48
    if (c >= 0 && c <= 9) r = (r * 10 + c) % m;
  }
  return r;
}

function getAvatarUrl(m: any) {
  if (m.discordId) {
    if (m.discordAvatar) {
      const fmt = String(m.discordAvatar).startsWith('a_') ? 'gif' : 'png';
      return `https://cdn.discordapp.com/avatars/${m.discordId}/${m.discordAvatar}.${fmt}?size=256`;
    }
    // Default avatar index = user identifier modulo 5
    const idx = modFromString(String(m.discordId), 5);
    return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
  }
  return m.image;
}

export const metadata = {
  title: "Team — Swelly",
};

function badgeClasses(role: string) {
  if (/Founder|Lead/i.test(role)) return "px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/20 text-rose-300";
  if (/Frontend|Backend|Engineer/i.test(role)) return "px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300";
  if (/Community|Manager/i.test(role)) return "px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300";
  return "px-2.5 py-0.5 rounded-full bg-white/6 text-xs text-white/80";
}

export default function TeamPage() {
  return (
    <div>
      <PageHeader title="Team" subtitle="Meet the people behind Swelly" />

      <section className="container py-12">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {TEAM.map((m) => (
            <ScrollReveal key={m.name}>
              <Link href={`/team/${m.slug}`} className="block">
                <div className="card flex flex-col items-center text-center p-6">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                  <Image src={getAvatarUrl(m)} alt={m.name} width={112} height={112} className="object-cover" />
                </div>
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <div className="flex items-center gap-2 text-sm mb-3">
                  <span className={badgeClasses(m.role)}>{m.role}</span>
                </div>
                <p className="text-white/70 text-sm">{m.bio}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
