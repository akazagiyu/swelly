import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { TEAM } from "./data";
import DiscordAvatar from "@/components/DiscordAvatar";
import DiscordUserButton from "@/components/DiscordUserButton";

export const metadata = {
  title: "Team",
};

function badgeClasses(defaultRole: string, custom?: string) {
  if (custom) return custom;
  if (/(Founder|Lead|Owner|Co-Owner)/i.test(defaultRole))
    return "px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/20 text-rose-300";
  if (/(Frontend|Backend|Engineer|Developer)/i.test(defaultRole))
    return "px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300";
  if (/(Community|Manager|Moderator)/i.test(defaultRole))
    return "px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300";
  return "px-2.5 py-0.5 rounded-full bg-white/6 text-xs text-white/80";
}

export default function TeamPage() {
  return (
    <div>
      <PageHeader title="Team" subtitle="Meet the people behind Swelly" />

      <section className="container py-12">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 items-stretch">
          {TEAM.map((m) => (
            <ScrollReveal key={m.name}>
              <div className="card h-full min-h-[320px] flex flex-col p-6">
                <Link href={`/team/${m.slug}`} className="block">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                      {m.discordId ? (
                        <DiscordAvatar id={m.discordId} alt={m.name} size={112} className="object-cover" fallbackSrc={m.image} avatarHashHint={m.discordAvatar ?? null} />
                      ) : (
                        <Image src={m.image} alt={m.name} width={112} height={112} className="object-cover" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg">{m.name}</h3>
                    <div className="flex items-center gap-2 text-sm mb-3">
                      <span className={badgeClasses(m.role, m.badgeClass)}>{m.role}</span>
                    </div>
                    <p className="text-white/70 text-sm min-h-[40px]">{m.bio}</p>
                  </div>
                </Link>
                <div className="mt-auto">
                  {m.discordId ? (
                    <DiscordUserButton id={m.discordId} className="btn btn-outline w-full" />
                  ) : (
                    (() => {
                      const discordSocial = m.socials?.find((s) => /discord/i.test(s.label));
                      return discordSocial ? (
                        <a
                          href={discordSocial.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-outline w-full"
                        >
                          Discord
                        </a>
                      ) : null;
                    })()
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
