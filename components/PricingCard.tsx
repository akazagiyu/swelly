import React from "react";
import Link from "next/link";
import Sparkles from './Sparkles';

// Add styles for animations
const animationStyles = `
  @keyframes float-pulse {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.15); }
    50% { box-shadow: 0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.25); }
  }
  
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  
  .float-pulse {
    animation: float-pulse 3s ease-in-out infinite;
  }
  
  .glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
  }
  
  .shimmer-animation {
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.1) 50%,
      rgba(255,255,255,0) 100%
    );
    background-size: 1000px 100%;
    animation: shimmer 3s infinite;
  }
`;

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16.704 5.296a1 1 0 0 1 0 1.414l-7.5 7.5a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414l2.293 2.293 6.793-6.793a1 1 0 0 1 1.414 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

type Props = {
  name: string;
  price: string | { monthly: string; yearly: string };
  features: string[];
  highlight?: boolean;
  cta?: string;
  period?: 'monthly' | 'yearly';
  href?: string;
  badge?: string;
  subtitle?: string;
};

export default function PricingCard({ name, subtitle, price, features, highlight, cta = "Buy", href, period = 'monthly', badge }: Props) {
  const isTieredPrice = typeof price !== 'string';
  const displayPrice = typeof price === 'string' ? price : price[period];
  
  // Color mapping for each plan - soft, hierarchical colors
  const colorMap: { [key: string]: { gradient: string; accent: string; border: string; badgeBg: string; badgeText: string } } = {
    "Swelly Bronze": { 
      gradient: "from-orange-500/15 via-amber-500/10 to-orange-400/10", 
      accent: "from-orange-400 to-amber-400",
      border: "border-orange-500/20",
      badgeBg: "bg-orange-500/30",
      badgeText: "text-orange-100"
    },
    "Swelly Plus": { 
      gradient: "from-cyan-500/15 via-teal-500/10 to-cyan-400/10", 
      accent: "from-cyan-400 to-teal-400",
      border: "border-cyan-500/20",
      badgeBg: "bg-cyan-500/30",
      badgeText: "text-cyan-100"
    },
    "Swelly Pro": { 
      gradient: "from-emerald-500/15 via-green-500/10 to-emerald-400/10", 
      accent: "from-emerald-400 to-green-400",
      border: "border-emerald-500/20",
      badgeBg: "bg-emerald-500/30",
      badgeText: "text-emerald-100"
    },
    "Swelly Gold": { 
      gradient: "from-yellow-500/15 via-amber-500/10 to-yellow-400/10", 
      accent: "from-yellow-400 to-amber-400",
      border: "border-yellow-500/20",
      badgeBg: "bg-yellow-500/30",
      badgeText: "text-yellow-100"
    },
    "Swelly Diamond": { 
      gradient: "from-purple-500/15 via-violet-500/10 to-purple-400/10", 
      accent: "from-purple-400 to-violet-400",
      border: "border-purple-500/20",
      badgeBg: "bg-purple-500/30",
      badgeText: "text-purple-100"
    },
    "Swelly Ultimate": { 
      gradient: "from-pink-500/15 via-rose-500/10 to-pink-400/10", 
      accent: "from-pink-400 to-rose-400",
      border: "border-pink-500/20",
      badgeBg: "bg-pink-500/30",
      badgeText: "text-pink-100"
    },
  };

  const colors = colorMap[name] || colorMap["Swelly Bronze"];

  return (
    <>
      <style>{animationStyles}</style>
      <div className={`relative group ${highlight ? 'float-pulse' : ''}`}>
        {(highlight || badge) && (
          <div className={`absolute -top-4 right-4 text-[10px] px-3 py-1 rounded-full shadow-lg z-10 ${colors.badgeBg} ${colors.badgeText} tracking-wide uppercase ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105 ${highlight ? 'animate-pulse' : ''}`}>
            {badge || 'Most Popular'}
          </div>
        )}

        {/* Gradient border wrapper */}
        <div
          className={`rounded-2xl p-[1.2px] transition-all duration-300 ${
            highlight
              ? `bg-gradient-to-br ${colors.gradient} group-hover:scale-[1.02] group-hover:shadow-2xl glow-pulse relative`
              : `bg-white/10 ${colors.border} group-hover:scale-[1.01] group-hover:shadow-xl`
          }`}
        >
          {/* Animated shine effect for highlighted card */}
          {highlight && (
            <div className="absolute inset-0 rounded-2xl shimmer-animation pointer-events-none" />
          )}
          
          <div className={`rounded-2xl overflow-hidden p-6 md:p-8 relative bg-gradient-to-br ${colors.gradient} backdrop-blur-md transition-all duration-300 ${colors.border} ring-1 ${highlight ? 'shadow-glow' : 'shadow-xl'}`}>
            {/* aurora / subtle gradient overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_left,_rgba(88,101,242,0.12),_transparent_32%),radial-gradient(ellipse_at_bottom_right,_rgba(167,139,250,0.10),_transparent_32%)]" />

            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <h3 className={`text-lg md:text-xl font-extrabold tracking-tight uppercase bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105 origin-left ${highlight ? 'animate-pulse' : ''}`}>{name}</h3>
                {highlight && <Sparkles className="-translate-y-1 transition-transform duration-300 group-hover:animate-pulse animate-bounce" size={14} />}
              </div>
              {subtitle && <div className="mt-1 text-white/70 text-sm transition-colors duration-300 group-hover:text-white/80">{subtitle}</div>}

              <div className={`mt-4 border-t transition-colors duration-300 ${colors.border}`} />

              <ul className="mt-4 space-y-3 text-white/80 text-sm">
                {features.map((f, idx) => (
                  <li key={f} className="flex items-start gap-3 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/90" style={{transitionDelay: `${idx * 30}ms`}}>
                    <span className={`mt-0.5 inline-flex items-center justify-center rounded-full bg-gradient-to-br ${colors.accent} text-white w-5 h-5 shrink-0 transition-all duration-300 group-hover:scale-110`} aria-hidden="true">
                      <CheckIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="leading-tight">{f}</span>
                  </li>
                ))}
              </ul>

              <div className={`mt-5 border-t transition-colors duration-300 ${colors.border}`} />

              {/* Price block */}
              {isTieredPrice ? (
                <div className="mt-4 flex items-baseline gap-3">
                  <div className={`text-2xl md:text-4xl font-extrabold bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110 origin-left drop-shadow-[0_1px_6px_rgba(255,255,255,0.12)] ${highlight ? 'animate-pulse' : ''}`}>
                    {displayPrice}
                  </div>
                  <div className="text-sm text-white/70 transition-colors duration-300 group-hover:text-white/80">/ {period === 'monthly' ? 'month' : 'year'}</div>
                </div>
              ) : (
                <div className="mt-4">
                  <div className={`text-2xl md:text-4xl font-extrabold bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110 origin-left drop-shadow-[0_1px_6px_rgba(255,255,255,0.12)] ${highlight ? 'animate-pulse' : ''}`}>
                    {displayPrice}
                  </div>
                  <div className="text-xs text-white/70 mt-1 transition-colors duration-300 group-hover:text-white/80">USD</div>
                  <div className="text-xs text-white/60 transition-colors duration-300 group-hover:text-white/70">Per Month</div>
                </div>
              )}

              {/* Yearly perks */}
              {isTieredPrice && period === 'yearly' && (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 ${colors.badgeBg} ${colors.badgeText} ring-1 ring-white/10 transition-all duration-300 group-hover:scale-105`}>10% OFF</span>
                  <span className="text-white/60 transition-colors duration-300 group-hover:text-white/70">Best value</span>
                </div>
              )}

              <div className="mt-6">
                {href ? (
                  <Link
                    href={href}
                    aria-label={`${cta} ${name} plan`}
                    className={`block w-full text-center rounded-lg py-3 font-medium text-white bg-gradient-to-r ${colors.accent} transition-all duration-300 transform group-hover:shadow-xl group-hover:-translate-y-0.5 group-hover:scale-105 active:scale-95 active:translate-y-0.5 ring-1 ring-white/20 ${highlight ? 'shadow-lg' : ''}`}
                  >
                    {cta}
                  </Link>
                ) : (
                  <button
                    aria-label={`${cta} ${name} plan`}
                    className={`block w-full text-center rounded-lg py-3 font-medium text-white bg-gradient-to-r ${colors.accent} transition-all duration-300 transform group-hover:shadow-xl group-hover:-translate-y-0.5 group-hover:scale-105 active:scale-95 active:translate-y-0.5 ring-1 ring-white/20 ${cta.toLowerCase().includes('current') ? 'opacity-60 cursor-not-allowed' : ''} ${highlight ? 'shadow-lg' : ''}`}
                  >
                    {cta}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
