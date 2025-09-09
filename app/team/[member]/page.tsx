import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { findMemberBySlug } from "../data";

function modFromString(numStr: string, m: number) {
  let r = 0;
  for (let i = 0; i < numStr.length; i++) {
    const c = numStr.charCodeAt(i) - 48;
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
    const idx = modFromString(String(m.discordId), 5);
    return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
  }
  return m.image;
}

type Props = { params: { member: string } };

export default function MemberPage({ params }: Props) {
  const member = findMemberBySlug(params.member);

    if (!member) {
    return (
      <div>
        <PageHeader title="Team member not found" backHref="/team" />
        <section className="container py-12">
          <p className="text-white/70">We couldn't find that team member.</p>
          <Link href="/team" className="btn btn-outline mt-4">Back to team</Link>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={member.name} subtitle={member.role} backHref="/team" />
      <section className="container py-8">
        <div className="card p-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full overflow-hidden">
              <Image src={getAvatarUrl(member)} alt={member.name} width={112} height={112} className="object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <div className="mt-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/6 text-white/80">{member.role}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-white/80">
            <p className="mb-3">{member.bio}</p>
            {member.about && <p className="text-sm text-white/70">{member.about}</p>}
          </div>

          {member.socials && member.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {member.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="btn btn-outline text-sm">
                  {s.label}
                </a>
              ))}
            </div>
          )}

          <div className="mt-6">
            <Link href="/team" className="btn btn-outline">Back to team</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
