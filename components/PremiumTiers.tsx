"use client";
import React, { useEffect, useState } from 'react';
import PricingCard from './PricingCard';

type Tier = {
  name: string;
  price: { monthly: string; yearly: string } | string;
  features: string[];
  highlight?: boolean;
  cta?: string;
  href?: string | { monthly: string; yearly: string };
  badge?: string;
  subtitle?: string;
};

export default function PremiumTiers({ tiers, initial = 'monthly' }: { tiers: Tier[]; initial?: 'monthly' | 'yearly' }) {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>(initial);
  const allTiered = tiers.every((t) => typeof t.price !== 'string');

  // Persist selection in localStorage for nicer UX
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('pricing-period');
      if (saved === 'monthly' || saved === 'yearly') {
        setPeriod(saved);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('pricing-period', period);
    } catch {}
  }, [period]);

  return (
    <div>
      {allTiered && (
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex rounded-full bg-white/6 p-1 backdrop-blur-sm border border-white/6">
            <button
              onClick={() => setPeriod('monthly')}
              aria-pressed={period === 'monthly'}
              className={`px-4 py-2 rounded-full transition-all ${period === 'monthly' ? 'bg-white text-primary shadow-sm' : 'text-white/80'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('yearly')}
              aria-pressed={period === 'yearly'}
              className={`px-4 py-2 rounded-full transition-all ${period === 'yearly' ? 'bg-white text-primary shadow-sm' : 'text-white/80'}`}
            >
              Yearly
            </button>
          </div>
          <span className="ml-3 text-xs text-white/70 hidden md:inline">Yearly: 10% OFF</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
        {tiers.map((t) => {
          // Handle both string and object href types
          const currentHref = typeof t.href === 'object' && t.href !== null 
            ? t.href[period] 
            : t.href;
            
          return (
            <div key={t.name} className="transition hover:-translate-y-1 duration-300">
              <PricingCard
                name={t.name}
                subtitle={t.subtitle}
                price={t.price}
                features={t.features}
                highlight={t.highlight}
                cta={t.cta}
                href={currentHref}
                badge={t.badge}
                period={period}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
