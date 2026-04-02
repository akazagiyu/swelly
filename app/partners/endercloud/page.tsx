import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/motion/ScrollReveal";
import {
  FaBolt,
  FaCheckCircle,
  FaCloud,
  FaExternalLinkAlt,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "EnderCloud Partner",
  description:
    "Swelly partner page for EnderCloud. Learn why we recommend EnderCloud for hosting Discord music bots and related community projects.",
  openGraph: {
    title: "Swelly x EnderCloud Partner Page",
    description:
      "Discover our EnderCloud partnership and why it is a strong fit for performance-focused Discord bot hosting.",
    images: [
      {
        url: "/mascot.png",
        width: 1200,
        height: 630,
        alt: "Swelly x EnderCloud",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly x EnderCloud Partner Page",
    description:
      "Discover our EnderCloud partnership and why it is a strong fit for performance-focused Discord bot hosting.",
    images: ["/mascot.png"],
  },
};

const pillars = [
  {
    title: "Performance Mindset",
    description:
      "Music bots need low-latency responses and consistent resource behavior. EnderCloud aligns with that performance-first approach.",
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
      "When your community grows, clear communication and practical support become essential. EnderCloud is a good fit for that journey.",
    icon: <FaHeadset className="h-6 w-6" />,
  },
];

const useCases = [
  "Running a Discord music bot with steady playback",
  "Hosting side services like dashboards, APIs, and webhooks",
  "Scaling from a small community to larger multi-guild usage",
  "Keeping operations simple while maintaining quality",
];

export default function EnderCloudPartnerPage() {
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
                Swelly x <span className="text-gradient">EnderCloud</span>
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-lg text-white/75 md:text-xl">
                EnderCloud is a featured partner for builders who want dependable hosting for Discord bots and related projects.
                This page explains why we recommend checking them out.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://endercloud.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  Visit EnderCloud
                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                </a>
                <Link href="/support" className="btn btn-outline w-full sm:w-auto">
                  Talk to Swelly Support
                </Link>
              </div>

              <div className="mt-4 text-sm text-white/55">
                For latest plans, locations, and pricing, refer to EnderCloud directly.
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
                EnderCloud is highlighted as a partner.
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
                  href="https://endercloud.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  Explore EnderCloud
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