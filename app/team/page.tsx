import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/motion/ScrollReveal";

type Member = { name: string; role: string; bio: string; image: string };

const TEAM: Member[] = [
  { name: "Ayush Edith", role: "Founder & Lead", bio: "Building fast, reliable music experiences for communities.", image: "/swelly1.png" },
  { name: "Rin Park", role: "Frontend Engineer", bio: "Designing beautiful UIs and delightful interactions.", image: "/swellyG1.png" },
  { name: "Mia Santos", role: "Backend Engineer", bio: "Scaling the bot and keeping playback rock-solid.", image: "/swellyG2.png" },
  { name: "Alex Chen", role: "Community Manager", bio: "Helping communities get the most out of Swelly.", image: "/mascot.png" },
];

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
              <div className="card flex flex-col items-center text-center p-6">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                  <Image src={m.image} alt={m.name} width={112} height={112} className="object-cover" />
                </div>
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <div className="flex items-center gap-2 text-sm mb-3">
                  <span className={badgeClasses(m.role)}>{m.role}</span>
                </div>
                <p className="text-white/70 text-sm">{m.bio}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
