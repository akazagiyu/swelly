export const dynamic = 'force-static';

import type { Metadata } from "next";
import { FaDiscord, FaEnvelope, FaTicketAlt, FaTwitter } from "react-icons/fa";
import ScrollReveal from "@/components/motion/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Swelly team. Contact us through Discord, email, or submit a support ticket. We're here to help with any questions about our Discord music bot.",
  openGraph: {
    title: "Contact Swelly - Get in Touch with Our Team",
    description: "Contact the Swelly team through Discord, email, or support tickets. We're here to help!",
    images: [
      {
        url: "/mascot.png",
        width: 1200,
        height: 630,
        alt: "Contact Swelly"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Swelly - Get in Touch with Our Team",
    description: "Contact the Swelly team through Discord, email, or support tickets. We're here to help!",
    images: ["/mascot.png"]
  }
};

const contactMethods = [
  {
    title: "Discord Server",
    description: "Join our community and get instant support from our team and other users",
    icon: <FaDiscord className="w-8 h-8" />,
    action: "Join Discord",
    href: process.env.NEXT_PUBLIC_DISCORD_SUPPORT_URL || "https://discord.gg/swelly",
    color: "bg-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2]/30"
  },
  {
    title: "Support Tickets",
    description: "Submit a detailed support ticket for technical issues or account-related questions",
    icon: <FaTicketAlt className="w-8 h-8" />,
    action: "Create Ticket",
    href: "/support",
    color: "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
  },
  {
    title: "Email Support",
    description: "Send us an email for business inquiries or detailed support requests",
    icon: <FaEnvelope className="w-8 h-8" />,
    action: "Send Email",
    href: "mailto:support@swellybot.xyz",
    color: "bg-green-500/20 text-green-400 hover:bg-green-500/30"
  },
  {
    title: "Twitter/X",
    description: "Follow us for updates, announcements, and quick responses to questions",
    icon: <FaTwitter className="w-8 h-8" />,
    action: "Follow Us",
    href: "https://twitter.com/swellybot",
    color: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
  }
];

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-widest mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Have a question, suggestion, or need help? We're here for you! Choose your preferred 
              way to get in touch with the Swelly team.
            </p>
          </ScrollReveal>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <ScrollReveal key={method.title} delay={index * 0.1}>
              <a
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`card p-6 flex flex-col items-start transition-all duration-300 hover:scale-105 group`}
              >
                <div className={`p-4 rounded-xl ${method.color} mb-4 transition-all duration-300`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-white/70 mb-4 flex-grow">{method.description}</p>
                <span className="text-primary font-semibold group-hover:underline">
                  {method.action} →
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <article className="card p-8 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
              Business Information
            </h2>
            <div className="prose prose-invert max-w-none text-white/90 leading-relaxed space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p>
                  General inquiries: <a href="mailto:support@swellybot.xyz" className="text-primary hover:underline">support@swellybot.xyz</a><br />
                  Business inquiries: <a href="mailto:business@swellybot.xyz" className="text-primary hover:underline">business@swellybot.xyz</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Response Time</h3>
                <p>
                  We typically respond to support tickets and emails within 24-48 hours during business days. 
                  For immediate assistance, we recommend joining our Discord server where our community 
                  and moderators are often available to help.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
                <p>
                  Our support team operates Monday through Friday, 9:00 AM - 6:00 PM (UTC). 
                  However, our Discord community is active 24/7.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Before Contacting</h3>
                <p>Please check our resources that might already answer your question:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><a href="/faq" className="text-primary hover:underline">Frequently Asked Questions</a></li>
                  <li><a href="/commands" className="text-primary hover:underline">Commands Documentation</a></li>
                  <li><a href="/support" className="text-primary hover:underline">Support Center</a></li>
                </ul>
              </div>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </div>
  );
}
