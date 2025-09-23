import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support Swelly Discord bot development with a donation. Help us maintain servers, develop new features, and keep Swelly free for everyone. Every contribution makes a difference.",
  openGraph: {
    title: "Donate to Swelly - Support Discord Music Bot Development",
    description: "Help us maintain servers, develop new features, and keep Swelly free for everyone.",
    images: [
      {
        url: "/prime.png",
        width: 1200,
        height: 630,
        alt: "Support Swelly"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate to Swelly - Support Discord Music Bot Development",
    description: "Help us maintain servers, develop new features, and keep Swelly free for everyone.",
    images: ["/prime.png"]
  }
};

import ScrollReveal from "@/components/motion/ScrollReveal";
import { FaHeart, FaCode, FaServer, FaUsers, FaCoffee, FaPizzaSlice } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

const donationTiers = [
  {
    name: "Coffee",
    amount: "$3",
    icon: <FaCoffee className="w-6 h-6" />,
    description: "Buy the team a coffee to keep us coding!",
    benefits: ["Our gratitude", "Supporter badge on Discord"],
    popular: false,
  },
  {
    name: "Pizza",
    amount: "$10",
    icon: <FaPizzaSlice className="w-6 h-6" />,
    description: "Fuel our late-night development sessions",
    benefits: ["Coffee tier benefits", "Early feature previews", "Special thanks in updates"],
    popular: true,
  },
  {
    name: "Server",
    amount: "$25",
    icon: <FaServer className="w-6 h-6" />,
    description: "Help us keep the servers running smoothly",
    benefits: ["Pizza tier benefits", "Exclusive supporter role", "Priority support"],
    popular: false,
  },
  {
    name: "Custom",
    amount: "Any amount",
    icon: <FaHeart className="w-6 h-6" />,
    description: "Choose your own amount to support us",
    benefits: ["All previous benefits", "Personal thank you message"],
    popular: false,
  },
];

const impactAreas = [
  {
    icon: <FaServer className="w-8 h-8" />,
    title: "Server Costs",
    description: "Keep Swelly running 24/7 with reliable hosting and infrastructure",
  },
  {
    icon: <FaCode className="w-8 h-8" />,
    title: "Development",
    description: "Fund new features, bug fixes, and performance improvements",
  },
  {
    icon: <FaUsers className="w-8 h-8" />,
    title: "Community",
    description: "Support community events, contests, and engagement initiatives",
  },
];

function DonationCard({ tier, index }: { tier: typeof donationTiers[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className={`relative rounded-2xl p-[1.2px] transition-transform duration-300 hover:scale-[1.02] ${
        tier.popular 
          ? "bg-gradient-to-br from-primary/45 via-accent-violet/35 to-primary/45" 
          : "bg-white/6"
      }`}>
        {tier.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[10px] px-3 py-1 rounded-full shadow-lg z-10 bg-primary text-white tracking-wide uppercase ring-1 ring-white/20">
            Most Popular
          </div>
        )}
        
        <div className="relative rounded-2xl bg-black/40 backdrop-blur-md p-6 h-full">
          {/* Aurora effect for popular tier */}
          {tier.popular && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent-violet/5 pointer-events-none" />
          )}
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/20 text-primary">
                {tier.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                <div className="text-2xl font-bold text-white">{tier.amount}</div>
              </div>
            </div>
            
            <p className="text-white/70 text-sm mb-6">{tier.description}</p>
            
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-medium text-white/90">What you get:</h4>
              {tier.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                  <IoSparkles className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            
            <a 
              href="https://paypal.me/aj23112001"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all text-center block ${
                tier.popular
                  ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              }`}
            >
              Donate {tier.amount !== "Any amount" ? tier.amount : ""}
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

function ImpactCard({ impact, index }: { impact: typeof impactAreas[0]; index: number }) {
  return (
    <ScrollReveal delay={0.4 + index * 0.1}>
      <div className="card p-6 text-center">
        <div className="inline-flex p-3 rounded-lg bg-primary/20 text-primary mb-4">
          {impact.icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{impact.title}</h3>
        <p className="text-white/70 text-sm">{impact.description}</p>
      </div>
    </ScrollReveal>
  );
}

export default function DonatePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent-violet/10" />
        
        <div className="container relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                <FaHeart className="w-4 h-4" />
                Support Swelly
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Help Keep Swelly
                <span className="bg-gradient-to-r from-primary to-accent-violet bg-clip-text text-transparent"> Amazing</span>
              </h1>
              
              <p className="text-xl text-white/70 mb-8">
                Your donations help us maintain servers, develop new features, and keep Swelly free for everyone.
                Every contribution makes a difference! 💜
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-white/60">
                  <FaUsers className="w-4 h-4" />
                  <span>Trusted by 30,000+ servers</span>
                </div>
                {/* <div className="flex items-center gap-2 text-white/60">
                  <IoSparkles className="w-4 h-4" />
                  <span>100% open source</span>
                </div> */}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-16">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Support Level</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Select a donation tier that works for you. All contributions help us improve Swelly for the community.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {donationTiers.map((tier, index) => (
              <DonationCard key={tier.name} tier={tier} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white/5">
        <div className="container">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Where Your Money Goes</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                We&apos;re transparent about how donations are used to improve Swelly and support the community.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {impactAreas.map((impact, index) => (
              <ImpactCard key={impact.title} impact={impact} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-16">
        <div className="container">
          <ScrollReveal delay={0.3}>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex p-4 rounded-full bg-primary/20 text-primary mb-6">
                <FaHeart className="w-8 h-8" />
              </div>
              
              <h2 className="text-3xl font-bold mb-6">Thank You for Your Support!</h2>
              <p className="text-white/70 text-lg mb-8">
                Thanks to our amazing community, Swelly continues to grow and improve. 
                Your donations directly contribute to new features, better performance, and 24/7 reliability.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                  <div className="text-white/60 text-sm">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">30K+</div>
                  <div className="text-white/60 text-sm">Servers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-white/60 text-sm">Support</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/premium" className="btn btn-outline">
                  View Premium Plans
                </a>
                <a href="/support" className="btn btn-ghost">
                  Join Support Server
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Alternative Support Methods */}
      <section className="py-16 bg-white/5">
        <div className="container">
          <ScrollReveal delay={0.4}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Other Ways to Support</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Can&apos;t donate? No problem! Here are other ways you can help Swelly grow.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <ScrollReveal delay={0.5}>
              <div className="card p-6 text-center">
                <div className="text-3xl mb-4">⭐</div>
                <h3 className="font-semibold mb-2">Leave a Review</h3>
                <p className="text-white/70 text-sm">Rate us on bot listing sites</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.6}>
              <div className="card p-6 text-center">
                <div className="text-3xl mb-4">📢</div>
                <h3 className="font-semibold mb-2">Share with Friends</h3>
                <p className="text-white/70 text-sm">Invite Swelly to more servers</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.7}>
              <div className="card p-6 text-center">
                <div className="text-3xl mb-4">🐛</div>
                <h3 className="font-semibold mb-2">Report Bugs</h3>
                <p className="text-white/70 text-sm">Help us fix issues and improve</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.8}>
              <div className="card p-6 text-center">
                <div className="text-3xl mb-4">💡</div>
                <h3 className="font-semibold mb-2">Suggest Features</h3>
                <p className="text-white/70 text-sm">Share your ideas with us</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}