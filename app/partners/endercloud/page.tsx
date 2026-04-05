import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/motion/ScrollReveal";
import PageHeader from "@/components/layout/PageHeader";
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
      <PageHeader 
        title="Swelly x Endercloud" 
        subtitle="Endercloud is a featured partner for builders who want dependable hosting for Discord bots and related projects. This page explains why we recommend checking them out." 
      />

      <section className="relative overflow-hidden pt-12 pb-14">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent-violet/10" />

        <div className="container relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                <div className="flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-md hover:shadow-glow transition-shadow">
                  <Image
                    src="/mascot.png"
                    alt="Swelly mascot"
                    width={80}
                    height={80}
                    className="object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                    priority
                  />
                </div>
                
                <div className="text-white/30 text-2xl font-bold">
                  ✕
                </div>
                
                <div className="flex h-24 sm:h-28 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 sm:px-8 sm:py-6 backdrop-blur-md hover:shadow-glow transition-shadow">
                  <Image
                    src="/Endercloud.png"
                    alt="Endercloud logo"
                    width={180}
                    height={60}
                    className="h-8 sm:h-10 w-auto object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://Endercloud.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  Visit Endercloud
                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                </a>
                <Link href="/support" className="btn btn-outline w-full sm:w-auto">
                  Talk to Swelly Support
                </Link>
              </div>

              <div className="mt-6 text-sm text-white/55">
                For latest plans, locations, and pricing, refer to Endercloud directly.
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mx-auto mt-14 max-w-4xl">
              <div className="card flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl">
                <div className="text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-2 mb-3 text-primary">
                    <FaGift className="w-4 h-4" />
                    <span className="font-semibold tracking-wide uppercase text-sm">Exclusive Offer</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Save on your deployment</h3>
                  <p className="text-white/70 text-sm md:text-base mb-0">
                    Use our partner promo code at checkout for a special discount on your first Endercloud invoice.
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-3 p-5 rounded-xl border border-white/10 bg-black/40 min-w-[220px] shrink-0">
                  <span className="text-xs text-white/50 uppercase tracking-widest font-medium">Promo Code</span>
                  <span className="font-mono text-3xl font-bold tracking-wider text-white">SWELLY12</span>
                  <CopyButton text="SWELLY12" className="btn btn-primary w-full mt-1" />
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