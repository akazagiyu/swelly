import React from "react";
import Link from "next/link";
import Sparkles from './Sparkles';

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
  // If the price object exists, and both monthly and yearly are strings like "$4.99", we can hint savings visually.
  // We won't parse/compute exact savings here; just show a tasteful badge when on yearly.

  return (
    <div className="relative">
      {(highlight || badge) && (
        <div className="absolute -top-4 right-4 text-[10px] px-3 py-1 rounded-full shadow-lg z-10 bg-primary text-white tracking-wide uppercase ring-1 ring-white/20">
          {badge || 'Most Popular'}
        </div>
      )}

      {/* Gradient border wrapper */}
      <div
        className={`rounded-2xl p-[1.2px] transition-transform duration-300 ${
          highlight
            ? 'bg-gradient-to-br from-primary/45 via-accent-violet/35 to-primary/45 hover:scale-[1.02]'
            : 'bg-white/10 hover:scale-[1.01]'
        }`}
      >
  <div className={`rounded-2xl overflow-hidden p-6 md:p-8 relative bg-white/10 backdrop-blur-md ${highlight ? 'ring-1 ring-white/10 shadow-glow' : 'ring-1 ring-white/10 shadow-xl'}`}>
          {/* aurora / subtle gradient overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top_left,_rgba(88,101,242,0.12),_transparent_32%),radial-gradient(ellipse_at_bottom_right,_rgba(167,139,250,0.10),_transparent_32%)]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <h3 className="text-lg md:text-xl font-extrabold tracking-tight uppercase text-white/90">{name}</h3>
              {highlight && <Sparkles className="-translate-y-1" size={14} />}
            </div>
            {subtitle && <div className="mt-1 text-white/70 text-sm">{subtitle}</div>}

            <div className="mt-4 border-t border-white/10" />

            <ul className="mt-4 space-y-3 text-white/80 text-sm">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className={`mt-0.5 inline-flex items-center justify-center rounded-full ${
                    highlight ? 'bg-primary/25 text-white' : 'bg-white/10 text-primary'
                  } w-5 h-5 shrink-0`} aria-hidden="true">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="leading-tight">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-white/10" />

            {/* Price block */}
            {isTieredPrice ? (
              <div className="mt-4 flex items-baseline gap-3">
                <div className={`text-2xl md:text-4xl font-extrabold ${
                  highlight ? 'text-white drop-shadow-[0_1px_6px_rgba(255,255,255,0.12)]' : 'text-white/90'
                }`}>
                  {displayPrice}
                </div>
                <div className="text-sm text-white/70">/ {period === 'monthly' ? 'month' : 'year'}</div>
              </div>
            ) : (
              <div className="mt-4">
                <div className={`text-2xl md:text-4xl font-extrabold ${
                  highlight ? 'text-white drop-shadow-[0_1px_6px_rgba(255,255,255,0.12)]' : 'text-white/90'
                }`}>
                  {displayPrice}
                </div>
                <div className="text-xs text-white/70 mt-1">USD</div>
                <div className="text-xs text-white/60">Per Month</div>
              </div>
            )}

            {/* Yearly hint */}
            {isTieredPrice && period === 'yearly' && (
              <div className="mt-2 inline-flex items-center gap-2 text-[11px] text-white/70">
                <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-primary/15 text-primary ring-1 ring-white/10">Save with yearly</span>
                <span>Best value</span>
              </div>
            )}

            <div className="mt-6">
              {href ? (
                <Link
                  href={href}
                  aria-label={`${cta} ${name} plan`}
                  className={`${
                    highlight
                      ? 'block w-full text-center rounded-lg py-3 font-medium text-white bg-gradient-to-r from-primary via-accent-violet to-primary-light hover:opacity-95 shadow-glow'
                      : 'block w-full text-center rounded-lg py-3 font-medium text-white bg-white/10 border border-white/20 hover:bg-white/15'
                  }`}
                >
                  {cta}
                </Link>
              ) : (
                <button
                  aria-label={`${cta} ${name} plan`}
                  className={`${
                    highlight
                      ? 'block w-full text-center rounded-lg py-3 font-medium text-white bg-gradient-to-r from-primary via-accent-violet to-primary-light hover:opacity-95 shadow-glow'
                      : 'block w-full text-center rounded-lg py-3 font-medium text-white bg-white/10 border border-white/20'
                  } ${cta.toLowerCase().includes('current') ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white/15'}`}
                >
                  {cta}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
