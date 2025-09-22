import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with Swelly Discord music bot. Submit tickets, join our Discord community, browse FAQ, or read documentation. Our support team is here to help with setup and troubleshooting.",
  openGraph: {
    title: "Swelly Support - Get Help & Submit Tickets",
    description: "Get help with Swelly Discord music bot. Submit tickets, join Discord, or browse our FAQ.",
    images: [
      {
        url: "/mascot.png",
        width: 1200,
        height: 630,
        alt: "Swelly Support"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Swelly Support - Get Help & Submit Tickets",
    description: "Get help with Swelly Discord music bot. Submit tickets, join Discord, or browse our FAQ.",
    images: ["/mascot.png"]
  }
};

import TicketSystem from "@/components/TicketSystem";
import { FaDiscord, FaQuestionCircle, FaBook, FaTicketAlt } from "react-icons/fa";
import ScrollReveal from "@/components/motion/ScrollReveal";

const supportOptions = [
  {
    title: "Discord Server",
    description: "Get quick help from our community and moderators",
    icon: <FaDiscord className="w-6 h-6" />,
    action: "Join Server",
    href: process.env.NEXT_PUBLIC_DISCORD_SUPPORT_URL || "#",
    color: "bg-[#5865F2]/20 text-[#5865F2]"
  },
  {
    title: "FAQ",
    description: "Find answers to common questions",
    icon: <FaQuestionCircle className="w-6 h-6" />,
    action: "View FAQ",
    href: "/faq",
    color: "bg-green-500/20 text-green-400"
  },
  {
    title: "Documentation",
    description: "Learn how to use Swelly with detailed guides",
    icon: <FaBook className="w-6 h-6" />,
    action: "Read Docs",
    href: "/commands",
    color: "bg-blue-500/20 text-blue-400"
  }
];

export default function SupportPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16">
        <div className="container">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                <FaTicketAlt className="w-4 h-4" />
                Get Help
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Need Help with 
                <span className="bg-gradient-to-r from-primary to-accent-violet bg-clip-text text-transparent"> Swelly</span>?
              </h1>
              <p className="text-xl text-white/70">
                Our support team is here to help! Choose the best way to get assistance with your questions or issues.
              </p>
            </div>
          </ScrollReveal>

          {/* Quick Access */}
          <div className="text-center mb-8">
            <a 
              href="/ticket-status" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <FaTicketAlt className="w-4 h-4" />
              Check Existing Ticket Status
            </a>
          </div>

          {/* Support Options */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {supportOptions.map((option, index) => (
              <ScrollReveal key={option.title} delay={index * 0.1}>
                <div className="card p-6 text-center hover:scale-105 transition-transform">
                  <div className={`inline-flex p-3 rounded-lg ${option.color} mb-4`}>
                    {option.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{option.description}</p>
                  <a 
                    href={option.href}
                    target={option.href.startsWith('http') ? "_blank" : undefined}
                    rel={option.href.startsWith('http') ? "noreferrer" : undefined}
                    className="btn btn-outline"
                  >
                    {option.action}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Quick Stats */}
          <ScrollReveal delay={0.4}>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center mb-12">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">&lt; 2hrs</div>
                <div className="text-white/60 text-sm">Average Response Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                <div className="text-white/60 text-sm">Community Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">99%</div>
                <div className="text-white/60 text-sm">Issue Resolution Rate</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ticket System */}
      <section className="py-16 bg-white/5">
        <div className="container">
          <ScrollReveal delay={0.5}>
            <TicketSystem />
          </ScrollReveal>
        </div>
      </section>

      {/* Support Tips */}
      <section className="py-16">
        <div className="container">
          <ScrollReveal delay={0.6}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Before You Submit a Ticket</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-3 text-green-400">✅ Do This</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Check our FAQ for common solutions</li>
                    <li>• Include specific error messages</li>
                    <li>• Mention the command you were using</li>
                    <li>• Provide your server ID if relevant</li>
                    <li>• Describe the steps to reproduce the issue</li>
                  </ul>
                </div>
                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-3 text-red-400">❌ Avoid This</h3>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>• Submitting duplicate tickets</li>
                    <li>• Using vague descriptions like &quot;it&apos;s broken&quot;</li>
                    <li>• Sharing sensitive information publicly</li>
                    <li>• Demanding immediate responses</li>
                    <li>• Using inappropriate language</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
