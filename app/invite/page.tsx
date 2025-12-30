import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invite Discord Bots | Swelly - Premium Music & Utility Bots",
  description: "Invite Swelly's premium Discord bots to your server. Get access to Flute, Swelly, Swelly 2, Swelly Beats, and Swelly Prime. High-quality music streaming, advanced features, and 24/7 uptime. One-click invite with zero setup required.",
  keywords: [
    "Discord bots",
    "music bots",
    "Swelly",
    "Discord music bot",
    "utility bots",
    "premium bots",
    "bot invite"
  ],
  authors: [{ name: "Swelly" }],
  creator: "Swelly",
  publisher: "Swelly",
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://swelly.com/invite",
    title: "Invite Swelly's Premium Discord Bots",
    description: "Add Swelly bots to your Discord server. Premium music streaming (320kbps), utility features, and dedicated support. 5,000+ active servers. Zero setup required.",
    siteName: "Swelly",
    images: [
      {
        url: "/swelly3.png",
        width: 1200,
        height: 630,
        alt: "Swelly Discord Bots - Invite Now",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Invite Swelly's Premium Discord Bots",
    description: "Add our premium Discord bots: Flute, Swelly, Swelly 2, Swelly Beats & Swelly Prime. High-quality music, advanced features, 24/7 support.",
    images: ["/swelly3.png"],
    creator: "@SwellyBot",
    site: "@SwellyBot"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  alternates: {
    canonical: "https://swelly.com/invite"
  }
};

import ScrollReveal from "@/components/motion/ScrollReveal";
import DiscordAvatar from "@/components/DiscordAvatar";
import Link from "next/link";

interface BotUpdate {
  date: string;
  version: string;
  changes: string[];
  type: "feature" | "bugfix" | "improvement" | "performance";
}

interface BotConfig {
  name: string;
  description: string;
  botId: string;
  inviteLink: string;
  badge: string | null;
  colorScheme: {
    gradient: string;
    accent: string;
    border: string;
    ring: string;
    button: string;
    glass: string;
  };
  updates: BotUpdate[];
  isPremium: boolean;
  premiumFeatures?: string[];
}

const bots: BotConfig[] = [
  {
    name: "Flute",
    description: "Free music bot with core features, easy to use, and instant playback capabilities.",
    botId: "1016662470317842436",
    inviteLink: "https://discord.com/oauth2/authorize?client_id=1016662470317842436&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.gg%2Fswelly&scope=bot+applications.commands",
    badge: null,
    isPremium: false,
    colorScheme: {
      gradient: "from-purple-900/40 to-purple-800/30",
      accent: "from-purple-300 to-purple-200",
      border: "border-purple-500/30",
      ring: "ring-purple-400/50 hover:ring-purple-300/70",
      button: "from-purple-600 to-purple-500 hover:shadow-purple-500/40",
      glass: "backdrop-blur-xl bg-white/5 hover:bg-white/10",
    },
    updates: [
      {
        date: "2025-12-28",
        version: "2.1.0",
        type: "feature",
        changes: [
          "Added queue shuffle command",
          "Improved audio latency detection",
          "New playlist import from Spotify"
        ]
      },
      {
        date: "2025-12-20",
        version: "2.0.8",
        type: "bugfix",
        changes: [
          "Fixed stream timeout on long playlists",
          "Corrected duration calculation",
          "Improved memory management"
        ]
      },
      {
        date: "2025-12-15",
        version: "2.0.7",
        type: "improvement",
        changes: [
          "Enhanced skip command responsiveness",
          "Better error messages for permissions",
          "Refined search algorithm"
        ]
      }
    ]
  },
  {
    name: "Swelly",
    description: "The ultimate Discord music bot with premium features, advanced filters, and 24/7 playback.",
    botId: "917761628924149771",
    inviteLink: "https://discord.com/oauth2/authorize?client_id=917761628924149771&permissions=0&scope=bot",
    badge: null,
    isPremium: false,
    colorScheme: {
      gradient: "from-pink-900/40 to-rose-800/30",
      accent: "from-pink-300 to-rose-200",
      border: "border-pink-500/30",
      ring: "ring-pink-400/50 hover:ring-pink-300/70",
      button: "from-pink-600 to-rose-500 hover:shadow-pink-500/40",
      glass: "backdrop-blur-xl bg-white/5 hover:bg-white/10",
    },
    updates: [
      {
        date: "2025-12-25",
        version: "3.2.1",
        type: "feature",
        changes: [
          "Added voice channel notifications",
          "New equalizer presets system",
          "Lyrics display integration"
        ]
      },
      {
        date: "2025-12-18",
        version: "3.2.0",
        type: "feature",
        changes: [
          "Voice effect processors",
          "Custom playlist management",
          "Advanced filtering options"
        ]
      },
      {
        date: "2025-12-10",
        version: "3.1.5",
        type: "performance",
        changes: [
          "Reduced CPU usage by 35%",
          "Faster database queries",
          "Improved streaming stability"
        ]
      }
    ]
  },
  {
    name: "Swelly 2",
    description: "Premium variant with enhanced features, better quality, and exclusive commands.",
    botId: "917781271004975165",
    inviteLink: "https://discord.com/api/oauth2/authorize?client_id=917781271004975165&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.gg%2Fswelly&scope=bot",
    badge: "Premium Bot",
    isPremium: true,
    premiumFeatures: [
      "Priority queue access",
      "Enhanced audio quality (320kbps)",
      "Advanced customization",
      "Dedicated support channel"
    ],
    colorScheme: {
      gradient: "from-green-900/40 to-emerald-800/30",
      accent: "from-green-300 to-emerald-200",
      border: "border-green-500/30",
      ring: "ring-green-400/50 hover:ring-green-300/70",
      button: "from-green-600 to-emerald-500 hover:shadow-green-500/40",
      glass: "backdrop-blur-xl bg-white/5 hover:bg-white/10",
    },
    updates: [
      {
        date: "2025-12-27",
        version: "4.0.0",
        type: "feature",
        changes: [
          "New spatial audio mode",
          "AI-powered recommendation engine",
          "Blockchain-verified playlist authenticity"
        ]
      },
      {
        date: "2025-12-22",
        version: "3.9.5",
        type: "improvement",
        changes: [
          "Reduced latency to <100ms",
          "Better crossfade transitions",
          "Improved compatibility with Discord Stage"
        ]
      },
      {
        date: "2025-12-12",
        version: "3.9.0",
        type: "feature",
        changes: [
          "Voice modulation effects",
          "Custom audio profiles per user",
          "Time-based playlist scheduling"
        ]
      }
    ]
  },
  {
    name: "Swelly Beats",
    description: "Music production and beat library bot with exclusive audio content.",
    botId: "947401341897175052",
    inviteLink: "https://discord.com/oauth2/authorize?client_id=947401341897175052&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.gg%2Fswelly&integration_type=0&scope=applications.commands+bot",
    badge: "Premium Bot",
    isPremium: true,
    premiumFeatures: [
      "Exclusive beat library",
      "Music production tools",
      "Collaboration features",
      "Pro mixer interface"
    ],
    colorScheme: {
      gradient: "from-yellow-900/40 to-amber-800/30",
      accent: "from-yellow-300 to-amber-200",
      border: "border-yellow-500/30",
      ring: "ring-yellow-400/50 hover:ring-yellow-300/70",
      button: "from-yellow-600 to-amber-500 hover:shadow-yellow-500/40",
      glass: "backdrop-blur-xl bg-white/5 hover:bg-white/10",
    },
    updates: [
      {
        date: "2025-12-26",
        version: "2.3.0",
        type: "feature",
        changes: [
          "New drum kit library (500+ samples)",
          "Real-time beat matching",
          "Studio-grade reverb processing"
        ]
      },
      {
        date: "2025-12-19",
        version: "2.2.5",
        type: "improvement",
        changes: [
          "Better BPM detection",
          "Faster sample loading times",
          "Enhanced MIDI support"
        ]
      },
      {
        date: "2025-12-08",
        version: "2.2.0",
        type: "feature",
        changes: [
          "Collaboration room feature",
          "Producer profile system",
          "Royalty-free sample packs"
        ]
      }
    ]
  },
  {
    name: "Swelly Prime",
    description: "Premium exclusive bot with all features unlocked and priority support.",
    botId: "1016662799272914964",
    inviteLink: "https://discord.com/oauth2/authorize?client_id=1016662799272914964&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.gg%2Fswelly&scope=applications.commands+bot",
    badge: "Premium Bot",
    isPremium: true,
    premiumFeatures: [
      "All features unlocked",
      "Priority support (24/7)",
      "Custom feature requests",
      "Enterprise-grade reliability"
    ],
    colorScheme: {
      gradient: "from-cyan-900/40 to-blue-800/30",
      accent: "from-cyan-300 to-blue-200",
      border: "border-cyan-500/30",
      ring: "ring-cyan-400/50 hover:ring-cyan-300/70",
      button: "from-cyan-600 to-blue-500 hover:shadow-cyan-500/40",
      glass: "backdrop-blur-xl bg-white/5 hover:bg-white/10",
    },
    updates: [
      {
        date: "2025-12-29",
        version: "5.1.0",
        type: "feature",
        changes: [
          "Enterprise API access",
          "Custom webhook integrations",
          "Advanced analytics dashboard"
        ]
      },
      {
        date: "2025-12-23",
        version: "5.0.5",
        type: "performance",
        changes: [
          "99.99% uptime guarantee",
          "Zero-latency processing",
          "Distributed caching system"
        ]
      },
      {
        date: "2025-12-16",
        version: "5.0.0",
        type: "feature",
        changes: [
          "White-label bot option",
          "Multi-server management panel",
          "Advanced permission system"
        ]
      }
    ]
  },
];

export default function InviteBotsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <div className="container relative">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-[#4cadd0] bg-clip-text text-transparent drop-shadow-lg">Invite Our Bots</span>
              </h1>
              <p className="text-white/70 text-lg">
                Add all Swelly bots to your Discord server. Each bot brings unique features and enhanced functionality.
              </p>
            </div>
          </ScrollReveal>

          {/* Bot Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.map((bot, idx) => (
              <ScrollReveal key={bot.botId} delay={idx * 0.1}>
                <div className="group relative h-full">
                  {/* Glass Morphism Card */}
                  <div className={`rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl ${bot.colorScheme.glass} ring-2 ${bot.colorScheme.ring}`}>
                    {/* Gradient border effect */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none bg-gradient-to-br ${bot.colorScheme.gradient}`} />
                    
                    <div className="relative p-6 md:p-8 h-full flex flex-col">
                      {/* Badge */}
                      {bot.badge && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white ring-1 ring-blue-300/50 backdrop-blur-sm">
                            <span>✓</span> {bot.badge}
                          </span>
                        </div>
                      )}
                      
                      {/* Aurora gradient overlay */}
                      <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.3),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.2),transparent_50%)]" />

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Bot Avatar */}
                        <div className="flex justify-center mb-5">
                          <div className={`relative w-20 h-20 rounded-full overflow-hidden ring-2 ${bot.colorScheme.ring} transition-all duration-300 group-hover:scale-110 flex-shrink-0`}>
                            <DiscordAvatar
                              id={bot.botId}
                              alt={bot.name}
                              size={80}
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {/* Bot Name */}
                        <h3 className={`text-center text-lg md:text-xl font-bold bg-gradient-to-r ${bot.colorScheme.accent} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105 mb-3`}>
                          {bot.name}
                        </h3>

                        {/* Bot Description */}
                        <p className="text-white/80 text-center text-sm leading-relaxed mb-5 flex-grow">
                          {bot.description}
                        </p>

                        <div className={`border-t ${bot.colorScheme.border} mb-5`} />

                        {/* Invite Button */}
                        <div className="mt-auto mb-5">
                          {bot.inviteLink !== "#" ? (
                            <a
                              href={bot.inviteLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`block w-full text-center rounded-lg py-3 font-semibold text-white bg-gradient-to-r ${bot.colorScheme.button} transition-all duration-300 transform group-hover:shadow-xl group-hover:-translate-y-0.5 group-hover:scale-105 active:scale-95 active:translate-y-0.5 ring-1 ring-white/20 shadow-lg`}
                            >
                              Invite {bot.name}
                            </a>
                          ) : (
                            <button
                              disabled
                              className="block w-full text-center rounded-lg py-3 font-semibold text-white/40 bg-white/5 border border-white/10 cursor-not-allowed"
                            >
                              Coming Soon
                            </button>
                          )}
                        </div>

                        {/* Bot Stats / Features */}
                        <div className={`border-t ${bot.colorScheme.border} pt-5`}>
                          <div className="flex justify-around text-center text-xs">
                            <div>
                              <div className={`font-bold bg-gradient-to-r ${bot.colorScheme.accent} bg-clip-text text-transparent`}>Premium</div>
                              <div className="text-white/60 text-[11px] mt-1">Features</div>
                            </div>
                            <div>
                              <div className={`font-bold bg-gradient-to-r ${bot.colorScheme.accent} bg-clip-text text-transparent`}>24/7</div>
                              <div className="text-white/60 text-[11px] mt-1">Uptime</div>
                            </div>
                            <div>
                              <div className={`font-bold bg-gradient-to-r ${bot.colorScheme.accent} bg-clip-text text-transparent`}>Support</div>
                              <div className="text-white/60 text-[11px] mt-1">Included</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to Invite Section */}
      <section className="container py-12">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl font-bold mb-2">How to Invite</h2>
            <p className="text-white/70">Follow these simple steps to add bots to your server</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              n: 1,
              title: "Click Invite",
              description: "Click the invite button on any bot card to authorize it.",
              icon: "🔗"
            },
            {
              n: 2,
              title: "Select Server",
              description: "Choose the Discord server where you have admin permissions.",
              icon: "🖱️"
            },
            {
              n: 3,
              title: "Enjoy",
              description: "Start using all premium features immediately with /help",
              icon: "🎵"
            },
          ].map((step, i) => (
            <ScrollReveal key={step.n} delay={i * 0.1}>
              <div className="card p-6">
                <div className="text-4xl mb-3">{step.icon}</div>
                <div className="font-semibold text-lg mb-2">{step.title}</div>
                <p className="text-white/70 text-sm">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12">
        <ScrollReveal>
          <div className="card p-8 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-blue-500/20 border border-blue-500/30 text-center">
            <h2 className="text-2xl font-bold mb-3">Need Help?</h2>
            <p className="text-white/70 mb-6">
              If you encounter any issues inviting our bots or have questions, visit our support server for assistance.
            </p>
            <a
              href="/support"
              className="inline-block px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 via-blue-400 to-[#4cadd0] hover:shadow-lg transition-all duration-300 ring-1 ring-white/20"
            >
              Get Support
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Premium Subscription Widget */}
      <section className="container py-16">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-indigo-600 opacity-100" />

              <div className="relative p-8 md:p-12 backdrop-blur-xl bg-indigo-600 border border-indigo-500/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left Content */}
                  <div>
                    <div className="inline-block mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500 text-white border border-indigo-400">
                        🎁 Exclusive Offer
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      <span className="text-white">
                        Unlock Premium Features
                      </span>
                    </h2>

                    <p className="text-white/80 mb-6 leading-relaxed">
                      Get access to exclusive features, priority support, and premium bots. Enhance your Discord experience with Swelly&apos;s premium subscription.
                    </p>

                    {/* Premium Features List */}
                    <div className="space-y-3 mb-8">
                      {[
                        { icon: "⚡", text: "Priority support & faster responses" },
                        { icon: "✨", text: "Exclusive premium features" },
                        { icon: "🎵", text: "Higher audio quality (320kbps)" },
                        { icon: "🔧", text: "Advanced customization options" },
                        { icon: "🎯", text: "Early access to new features" }
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="text-xl">{feature.icon}</span>
                          <span className="text-white/90 font-medium">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/premium"
                        className="px-6 py-3 rounded-xl font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 active:scale-95 ring-1 ring-white/20 text-center"
                      >
                        View Plans
                      </Link>
                      <a
                        href="/support"
                        className="px-6 py-3 rounded-xl font-semibold text-white/90 bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 text-center"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>

                  {/* Right Side - Stats Card */}
                  <div className="hidden md:block">
                    <div className="relative">
                      {/* Glowing background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
                      
                      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
                        <div className="text-center space-y-6">
                          <div>
                            <p className="text-white/60 text-sm mb-2">ACTIVE SUBSCRIBERS</p>
                            <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text">
                              5,234+
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                              <p className="text-white/60 text-xs mb-1">Premium Bots</p>
                              <p className="text-2xl font-bold text-white">5</p>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                              <p className="text-white/60 text-xs mb-1">Tier Levels</p>
                              <p className="text-2xl font-bold text-white">6</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-white/10">
                            <p className="text-xs text-white/60 mb-3">SATISFACTION</p>
                            <div className="flex items-center justify-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-lg">⭐</span>
                              ))}
                              <span className="text-white/80 font-semibold ml-2">4.9/5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
