import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { findMemberBySlug } from "../data";
import DiscordAvatar from "@/components/DiscordAvatar";

function bannerClasses(role: string) {
  if (/(Founder|Lead|Owner|Co-Owner)/i.test(role))
    return "bg-gradient-to-r from-rose-600/30 via-fuchsia-600/25 to-violet-600/30";
  if (/(Frontend|Backend|Engineer|Developer)/i.test(role))
    return "bg-gradient-to-r from-indigo-600/30 via-sky-600/25 to-cyan-600/30";
  if (/(Community|Manager|Moderator)/i.test(role))
    return "bg-gradient-to-r from-emerald-600/30 via-teal-600/25 to-green-600/30";
  return "bg-gradient-to-r from-primary/30 to-accent-violet/30";
}

type Props = { params: { member: string } };

export default function MemberPage({ params }: Props) {
  const member = findMemberBySlug(params.member);

    if (!member) {
    return (
      <div>
        <PageHeader title="Team member not found" backHref="/team" />
        <section className="container py-12">
          <p className="text-white/70">We couldn&apos;t find that team member.</p>
          <Link href="/team" className="btn btn-outline mt-4">Back to team</Link>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={member.name} subtitle={member.role} backHref="/team" />
      <section className="container py-8">
        <div className="card p-0 max-w-3xl mx-auto overflow-hidden rounded-2xl">
          {/* Banner */}
          <div className={`relative h-36 md:h-40 ring-1 ring-white/10 ${member.bannerImage ? '' : bannerClasses(member.role)} rounded-t-2xl`}>
            {/* Inner mask keeps banner rounded without clipping the overlapping avatar */}
            <div className="absolute inset-0 rounded-t-2xl overflow-hidden">
              {/* ambient glow */}
              <div className={`absolute inset-0 ${member.bannerImage ? 'bg-gradient-to-r from-white/5 to-white/0' : bannerClasses(member.role)} blur-2xl opacity-40`} />
              {member.bannerImage ? (
                <Image
                  src={member.bannerImage}
                  alt="Banner"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover object-center opacity-90 relative z-10"
                  priority
                />
              ) : null}
              {/* subtle overlay grid */}
              <div className="absolute inset-0 bg-grid opacity-[0.12] z-20" />
            </div>
            {/* Avatar overlapping the banner */}
            <div className="absolute left-6 -bottom-10 w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/20 bg-black/30 z-30">
              {member.discordId ? (
                <DiscordAvatar id={member.discordId} alt={member.name} size={96} className="object-cover" fallbackSrc={member.image} avatarHashHint={member.discordAvatar ?? null} />
              ) : (
                <Image src={member.image} alt={member.name} width={96} height={96} className="object-cover" />
              )}
            </div>
          </div>

          {/* Body */}
          <div className="px-6 pt-14 pb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">{member.name}</h2>
                <div className="mt-2">
                  <span className={member.badgeClass || "px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/6 text-white/80"}>{member.role}</span>
                </div>
              </div>
              {member.socials && member.socials.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {member.socials.map((s) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="btn btn-outline text-xs md:text-sm">
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 text-white/80">
              <p className="mb-3">{member.bio}</p>
              {member.about && <p className="text-sm text-white/70">{member.about}</p>}
            </div>

            <div className="mt-6">
              <Link href="/team" className="btn btn-outline">Go back</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
