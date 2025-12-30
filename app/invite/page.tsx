'use client';

import { useState } from "react";

import ScrollReveal from "@/components/motion/ScrollReveal";
import DiscordAvatar from "@/components/DiscordAvatar";
import Link from "next/link";
import BotPersonalityCard from "@/components/BotPersonalityCard";
import BotComboCard from "@/components/BotComboCard";
import dynamic from "next/dynamic";

// Lazy load modal component to reduce bundle size
const PermissionsExplainedModal = dynamic(() => import("@/components/PermissionsExplainedModal"), {
  loading: () => null,
  ssr: false
});

interface BotUpdate {
  date: string;
  version: string;
  changes: string[];
  type: "feature" | "bugfix" | "improvement" | "performance";
}

interface BotPermission {
  name: string;
  description: string;
  icon: string;
  category: "audio" | "moderation" | "utility" | "data" | "admin";
}

interface BotPersonality {
  emoji: string;
  vibe: string;
  tagline: string;
  personality: string;
  bestFor: string[];
  complexity: "simple" | "moderate" | "advanced";
}

interface BotCombo {
  id: string;
  name: string;
  description: string;
  emoji: string;
  bots: string[];
  combinedFeatures: string[];
  price: {
    monthlyUSD: number;
    yearlyUSD: number;
  };
  savings: number;
  useCase: string;
  setupTime: string;
  difficulty: "easy" | "moderate" | "advanced";
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
  personality: BotPersonality;
  permissions: BotPermission[];
}

export type { BotUpdate, BotPermission, BotPersonality, BotCombo, BotConfig };

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
    personality: {
      emoji: "🎺",
      vibe: "The Minimalist",
      tagline: "Clean, simple, and essential",
      personality: "Straightforward and reliable. Does the job without unnecessary bells and whistles.",
      bestFor: ["Small communities", "Just starting out", "Minimal setup needed"],
      complexity: "simple"
    },
    permissions: [
      {
        name: "Send Messages",
        description: "Allows the bot to send messages in channels where it has access",
        icon: "💬",
        category: "utility"
      },
      {
        name: "Connect to Voice",
        description: "Required to join voice channels and stream audio",
        icon: "🎧",
        category: "audio"
      },
      {
        name: "Read Message History",
        description: "Allows bot to see previous messages for context commands",
        icon: "📜",
        category: "data"
      }
    ],
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
    personality: {
      emoji: "🎵",
      vibe: "The Versatile Performer",
      tagline: "All-around excellence with style",
      personality: "Balanced and capable. Great at everything, master of audio quality and user experience.",
      bestFor: ["Growing communities", "Music enthusiasts", "All-purpose use"],
      complexity: "moderate"
    },
    permissions: [
      {
        name: "Send Messages",
        description: "Core messaging functionality for bot responses",
        icon: "💬",
        category: "utility"
      },
      {
        name: "Connect to Voice",
        description: "Joins voice channels and streams audio content",
        icon: "🎧",
        category: "audio"
      },
      {
        name: "Embed Links",
        description: "Creates rich embeds for advanced music information displays",
        icon: "🎨",
        category: "utility"
      },
      {
        name: "Read Reactions",
        description: "Interprets reactions for interactive music controls",
        icon: "⭐",
        category: "utility"
      }
    ],
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
    personality: {
      emoji: "🚀",
      vibe: "The Power User",
      tagline: "Advanced power for serious musicians",
      personality: "Sophisticated and feature-rich. Designed for creators and enthusiasts who demand the best.",
      bestFor: ["Music servers", "Content creators", "Power users"],
      complexity: "advanced"
    },
    permissions: [
      {
        name: "Send Messages",
        description: "Sends messages and responses in all channels",
        icon: "💬",
        category: "utility"
      },
      {
        name: "Connect to Voice",
        description: "Advanced voice connectivity with priority processing",
        icon: "🎧",
        category: "audio"
      },
      {
        name: "Embed Links",
        description: "Creates rich embeds with advanced music metadata",
        icon: "🎨",
        category: "utility"
      },
      {
        name: "Manage Messages",
        description: "Required for advanced queue management features",
        icon: "⚙️",
        category: "admin"
      },
      {
        name: "Administrator",
        description: "Enables exclusive premium features and server-wide controls",
        icon: "👑",
        category: "admin"
      }
    ],
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
    personality: {
      emoji: "🎛️",
      vibe: "The Studio Master",
      tagline: "Professional production tools at your fingertips",
      personality: "Technical and creative. Built by producers for producers who want studio-quality control.",
      bestFor: ["Producers", "Music communities", "Creators & artists"],
      complexity: "advanced"
    },
    permissions: [
      {
        name: "Send Messages",
        description: "Sends production tools and beat information",
        icon: "💬",
        category: "utility"
      },
      {
        name: "Connect to Voice",
        description: "Streams beats and production samples",
        icon: "🎧",
        category: "audio"
      },
      {
        name: "Manage Channels",
        description: "Creates production rooms and collaboration spaces",
        icon: "🏗️",
        category: "admin"
      },
      {
        name: "Read Reactions",
        description: "Controls beat selection via interactive reactions",
        icon: "⭐",
        category: "utility"
      },
      {
        name: "Administrator",
        description: "Full server control for production environments",
        icon: "👑",
        category: "admin"
      }
    ],
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
    personality: {
      emoji: "👑",
      vibe: "The Enterprise Boss",
      tagline: "Ultimate power and control",
      personality: "Professional and comprehensive. Everything you could need, built for scale and reliability.",
      bestFor: ["Large communities", "Enterprise", "Everything"],
      complexity: "advanced"
    },
    permissions: [
      {
        name: "Send Messages",
        description: "Full messaging capabilities across all channels",
        icon: "💬",
        category: "utility"
      },
      {
        name: "Connect to Voice",
        description: "Enterprise-grade voice connectivity",
        icon: "🎧",
        category: "audio"
      },
      {
        name: "Administrator",
        description: "Full server permissions for complete control",
        icon: "👑",
        category: "admin"
      },
      {
        name: "Manage Webhooks",
        description: "Advanced integration and automation capabilities",
        icon: "🔗",
        category: "admin"
      },
      {
        name: "View Audit Log",
        description: "Access to comprehensive server activity logs",
        icon: "📊",
        category: "data"
      }
    ],
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

// Bot Combos Data
const botCombos: BotCombo[] = [
  {
    id: "music-studio",
    name: "🎛️ Music Studio Bundle",
    emoji: "🎛️",
    description: "Complete music production and playback ecosystem",
    bots: ["Swelly 2", "Swelly Beats"],
    combinedFeatures: [
      "320kbps audio quality",
      "500+ beat samples",
      "Advanced equalizer & effects",
      "Collaboration tools",
      "Priority support",
      "Studio-grade reverb processing"
    ],
    price: {
      monthlyUSD: 19.99,
      yearlyUSD: 199.99
    },
    savings: 4,
    useCase: "Perfect for music communities, producers, and serious audio enthusiasts",
    setupTime: "5-10 minutes",
    difficulty: "moderate"
  },
  {
    id: "gaming-server",
    name: "🎮 Gaming Server Bundle",
    emoji: "🎮",
    description: "Music and entertainment for gaming communities",
    bots: ["Swelly", "Flute"],
    combinedFeatures: [
      "Dual music bot redundancy",
      "Seamless playback switching",
      "Queue management",
      "24/7 uptime",
      "Playlist support",
      "Low latency (<100ms)"
    ],
    price: {
      monthlyUSD: 0,
      yearlyUSD: 0
    },
    savings: 0,
    useCase: "Ideal for gaming communities that want reliable music without premium",
    setupTime: "2-3 minutes",
    difficulty: "easy"
  },
  {
    id: "everything-bundle",
    name: "👑 Everything Bundle",
    emoji: "👑",
    description: "Ultimate all-in-one solution with every feature unlocked",
    bots: ["Swelly Prime", "Swelly Beats", "Swelly 2"],
    combinedFeatures: [
      "All premium features unlocked",
      "Priority 24/7 support",
      "Enterprise API access",
      "Custom webhooks & integrations",
      "Advanced analytics",
      "White-label options",
      "Music production suite",
      "Admin dashboard",
      "Custom feature requests"
    ],
    price: {
      monthlyUSD: 49.99,
      yearlyUSD: 499.99
    },
    savings: 10,
    useCase: "For large communities, content creators, and enterprises needing complete control",
    setupTime: "15-20 minutes",
    difficulty: "advanced"
  }
];

export default function InviteBotsPage() {
  const [openModalBot, setOpenModalBot] = useState<string | null>(null);
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
                  {/* Glass Morphism Card - Premium has stronger gradient background */}
                  <div className={`relative rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl ${bot.colorScheme.glass} ring-2 ${bot.colorScheme.ring}`}
                    style={bot.isPremium ? { background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(${bot.colorScheme.gradient.includes('green') ? '34,197,94' : bot.colorScheme.gradient.includes('yellow') ? '217,119,6' : '59,130,246'},0.08) 100%), ${bot.colorScheme.glass}` } : undefined}>
                    
                    {/* Premium color gradient accent - top border */}
                    {bot.isPremium && (
                      <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${bot.colorScheme.gradient}`} />
                    )}
                    
                    {/* Gradient border effect */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none bg-gradient-to-br ${bot.colorScheme.gradient}`} />
                    
                    {/* Premium shimmer effect */}
                    {bot.isPremium && (
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s infinite'
                      }} />
                    )}
                    
                    <div className="relative p-6 md:p-8 h-full flex flex-col">
                      {/* Badge - Premium animated */}
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

                        {/* Permissions Button */}
                        <button
                          onClick={() => setOpenModalBot(bot.botId)}
                          className={`w-full text-center rounded-lg py-2.5 font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300 text-sm`}
                          aria-label={`View ${bot.name} permissions`}
                        >
                          Why these permissions?
                        </button>

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

      {/* Bot Personality Section */}
      <section className="container py-20">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Get to Know Each Bot
              </span>
            </h2>
            <p className="text-white/70 text-lg">
              Each Swelly bot has its own personality and strengths. Choose the one that fits your community&apos;s needs.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot, idx) => (
            <BotPersonalityCard
              key={bot.botId}
              bot={bot}
              personality={bot.personality}
              index={idx}
            />
          ))}
        </div>
      </section>

      {/* Bot Combos Section */}
      <section className="container py-20">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Pre-Made Bot Bundles
              </span>
            </h2>
            <p className="text-white/70 text-lg">
              Can&apos;t decide which bots to invite? Choose a pre-made bundle tailored to your server&apos;s needs.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {botCombos.map((combo, idx) => (
            <BotComboCard
              key={combo.id}
              combo={combo}
              index={idx}
            />
          ))}
        </div>

        {/* Info Box */}
        <ScrollReveal>
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <p className="text-white/80 text-center">
              <span className="font-semibold">📦 Bundle Tip:</span> Mix and match any bots to create your perfect setup. Bundles are just recommendations!
            </p>
          </div>
        </ScrollReveal>
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

      {/* Permissions Modal */}
      {openModalBot && (
        <PermissionsExplainedModal
          isOpen={!!openModalBot}
          botName={bots.find(b => b.botId === openModalBot)?.name || "Bot"}
          permissions={bots.find(b => b.botId === openModalBot)?.permissions || []}
          onClose={() => setOpenModalBot(null)}
        />
      )}
    </div>
  );
}
