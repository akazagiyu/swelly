import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/motion/ScrollReveal";
import CopyButton from "@/components/CopyButton";
import {
  FaBolt,
  FaCheckCircle,
  FaCloud,
  FaExternalLinkAlt,
  FaGift,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Endercloud Partner",
  description:
    "Swelly partner page for Endercloud. Learn why we recommend Endercloud for hosting Discord music bots and related community projects.",
  openGraph: {
    title: "Swelly x Endercloud Partner Page",
    description:
      "Discover our Endercloud partnership and why it is a strong fit for performance-focused Discord bot hosting.",
    images: [
      {
        url: "/mascot.png",
        width: 1200,
        height: 630,
        alt: "Swelly x Endercloud",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly x Endercloud Partner Page",
    description:
      "Discover our Endercloud partnership and why it is a strong fit for performance-focused Discord bot hosting.",
    images: ["/mascot.png"],
  },
};

const pillars = [
  {
    title: "Performance Mindset",
    description:
      "Music bots need low-latency responses and consistent resource behavior. Endercloud aligns with that performance-first approach.",
    icon: <FaBolt className="h-6 w-6" />,
  },
  {
    title: "Reliable Foundation",
    description:
      "Stable infrastructure is critical for uninterrupted playback and queue handling. Reliability is a key reason we value this partner.",
    icon: <FaCloud className="h-6 w-6" />,
  },
  {
    title: "Support That Matters",
    description:
      "When your community grows, clear communication and practical support become essential. Endercloud is a good fit for that journey.",
    icon: <FaHeadset className="h-6 w-6" />,
  },
];

const useCases = [
  "Running a Discord music bot with steady playback",
  "Hosting side services like dashboards, APIs, and webhooks",
  "Scaling from a small community to larger multi-guild usage",
  "Keeping operations simple while maintaining quality",
];

export default function EndercloudPartnerPage() {
  return (
    <div>
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent-violet/15" />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />

        <div className="container relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-4 py-2 text-sm text-white/85 backdrop-blur-sm">
                <FaCheckCircle className="h-4 w-4 text-primary" />
                Official Partner Spotlight
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
                <span className="text-red-500">Swelly</span> x <span className="text-[#2f6dff]">Endercloud</span>
              </h1>

              <div className="mt-6 flex justify-center">
                <div className="rounded-2xl border border-white/12 bg-black/25 px-5 py-4 backdrop-blur-sm">
                  <Image
                    src="/Endercloud.png"
                    alt="Endercloud logo"
                    width={260}
                    height={80}
                    className="h-12 w-auto object-contain"
                    priority
                  />
                </div>
              </div>

              <p className="mx-auto mt-5 max-w-3xl text-lg text-white/75 md:text-xl">
                Endercloud is a featured partner for builders who want dependable hosting for Discord bots and related projects.
                This page explains why we recommend checking them out.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="https://Endercloud.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto relative overflow-hidden group shadow-[0_0_20px_rgba(47,109,255,0.4)] hover:shadow-[0_0_30px_rgba(47,109,255,0.6)] border border-[#2f6dff]/50 bg-[#2f6dff]/20 hover:bg-[#2f6dff]/40 text-white transition-all backdrop-blur-sm"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  Visit Endercloud
                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                </a>
                <Link href="/support" className="btn btn-outline w-full sm:w-auto hover:bg-white/5">
                  Talk to Swelly Support
                </Link>
              </div>

              <div className="mt-6 text-sm text-white/55">
                For latest plans, locations, and pricing, refer to Endercloud directly.
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="mx-auto mt-16 max-w-5xl rounded-3xl overflow-hidden border border-white/10 bg-black/20 shadow-[0_0_50px_-15px_rgba(47,109,255,0.5)] relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />
              <Image
                src="/partnerImage.png"
                alt="Swelly x Endercloud Infrastructure"
                width={1200}
                height={600}
                className="w-full h-[300px] sm:h-[450px] object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                priority
              />
              <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-20 flex flex-col gap-2 pointer-events-none">
                 <div className="inline-flex items-center gap-2 rounded-full bg-[#2f6dff]/20 backdrop-blur-md px-3 py-1.5 border border-[#2f6dff]/30 text-white text-xs font-semibold uppercase tracking-wider w-fit">
                    <FaCloud className="text-[#2f6dff]" /> Powering The Future
                 </div>
                 <h3 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-xl mt-1 tracking-tight">High-Performance Hosting</h3>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mx-auto mt-12 max-w-4xl relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#2f6dff] to-primary opacity-30 blur block"></div>
              <div className="relative rounded-2xl border border-white/10 bg-black/60 p-1 backdrop-blur-xl">
                <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-white/5 bg-gradient-to-r from-black/80 to-[#2f6dff]/10 p-6 sm:flex-row sm:p-8">
                   <div className="text-center sm:text-left flex-1">
                     <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#2f6dff]/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#2f6dff] border border-[#2f6dff]/30">
                       <FaGift className="h-3.5 w-3.5" />
                       Exclusive Offer
                     </div>
                     <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Save on your deployment!</h3>
                     <p className="mt-2 text-white/75 text-sm sm:text-base leading-relaxed">
                       Use our exclusive partner promo code at checkout to get a special discount on your first Endercloud invoice.
                     </p>
                   </div>
                   <div className="flex items-center justify-center shrink-0 w-full sm:w-auto">
                      <div className="relative flex flex-col items-center gap-3 rounded-xl border border-dashed border-[#2f6dff]/50 bg-[#2f6dff]/5 p-5 transition-colors hover:bg-[#2f6dff]/10 hover:border-[#2f6dff] w-full sm:w-auto">
                        <span className="text-xs font-medium text-white/50 uppercase tracking-widest">PROMO CODE</span>
                        <div className="flex items-center gap-3">
                           <span className="text-2xl sm:text-4xl font-mono font-black tracking-widest text-[#2f6dff] drop-shadow-[0_0_15px_rgba(47,109,255,0.4)]">SWELLY12</span>
                        </div>
                        <CopyButton text="SWELLY12" className="mt-2 w-full bg-[#2f6dff] hover:bg-[#2f6dff]/80 text-white font-semibold py-2.5 px-6 rounded-lg transition-all shadow-[0_0_15px_rgba(47,109,255,0.3)] hover:shadow-[0_0_25px_rgba(47,109,255,0.5)] border border-transparent hover:border-white/20" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-14">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="text-3xl font-bold">Why This Partnership Works</h2>
              <p className="mt-3 text-white/70">
                We focus on quality music experiences, and that depends on dependable infrastructure. These are the core reasons
                Endercloud is highlighted as a partner.
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <ScrollReveal key={pillar.title} delay={index * 0.08}>
                <div className="card h-full">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/20 p-3 text-primary">{pillar.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{pillar.title}</h3>
                  <p className="text-sm text-white/70">{pillar.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md md:p-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
                <FaShieldAlt className="h-3.5 w-3.5" />
                Best Fit For
              </div>

              <h2 className="text-2xl font-bold md:text-3xl">Teams Building Serious Bot Projects</h2>
              <p className="mt-3 text-white/70">
                If your community depends on smooth playback and fast command responses, infrastructure quality has a direct impact
                on user experience.
              </p>

              <ul className="mt-6 grid gap-3 text-white/80 md:grid-cols-2">
                {useCases.map((item) => (
                  <li key={item} className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-3">
                    <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://Endercloud.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  Explore Endercloud
                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                </a>
                <Link href="/invite" className="btn btn-outline w-full sm:w-auto">
                  Invite Swelly
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}