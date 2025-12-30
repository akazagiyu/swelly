import React from 'react';
import Link from 'next/link';
import type { BotCombo } from '@/app/invite/page';
import ScrollReveal from '@/components/motion/ScrollReveal';

interface BotComboCardProps {
  combo: BotCombo;
  index: number;
}

export default function BotComboCard({
  combo,
  index
}: BotComboCardProps) {
  const isFreeTier = combo.price.monthlyUSD === 0;
  const monthlyPrice = combo.price.monthlyUSD;
  const yearlyPrice = combo.price.yearlyUSD;
  const yearlySavings = monthlyPrice > 0 ? Math.round((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12) * 100) : 0;

  const difficultyColor = {
    easy: 'from-emerald-400 to-emerald-300',
    moderate: 'from-amber-400 to-amber-300',
    advanced: 'from-rose-400 to-rose-300'
  };

  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="group relative h-full">
        <div className="relative rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
          
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10" />
          
          {/* Animated background gradient on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />

          {/* Premium glow for non-free tiers */}
          {!isFreeTier && (
            <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-blue-500 to-purple-500" />
          )}

          <div className="relative p-6 md:p-8 h-full flex flex-col">
            
            {/* Top badge section */}
            <div className="flex items-start justify-between mb-6">
              <div className="text-5xl">{combo.emoji}</div>
              {combo.savings > 0 && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 border border-green-500/50 text-green-300">
                  Save {combo.savings}%
                </span>
              )}
            </div>

            {/* Title and Description */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {combo.name}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {combo.description}
              </p>
            </div>

            {/* Included Bots */}
            <div className="mb-6">
              <h4 className="text-white/60 text-xs uppercase font-semibold tracking-wider mb-3">
                Includes
              </h4>
              <div className="flex flex-wrap gap-2">
                {combo.bots.map((botName) => (
                  <span
                    key={botName}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-200"
                  >
                    {botName}
                  </span>
                ))}
              </div>
            </div>

            {/* Combined Features */}
            <div className="mb-6 flex-grow">
              <h4 className="text-white/60 text-xs uppercase font-semibold tracking-wider mb-3">
                Combined Features
              </h4>
              <ul className="space-y-2.5">
                {combo.combinedFeatures.map((feature, idx) => (
                  <li key={`${feature}-${idx}`} className="flex items-start gap-2 text-white/80 text-sm">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 mb-6" />

            {/* Setup Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white/60 text-xs uppercase font-semibold mb-1">Setup Time</p>
                <p className="text-white font-semibold text-sm">{combo.setupTime}</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white/60 text-xs uppercase font-semibold mb-1">Difficulty</p>
                <p className={`font-semibold text-sm bg-gradient-to-r ${difficultyColor[combo.difficulty]} bg-clip-text text-transparent`}>
                  {combo.difficulty.charAt(0).toUpperCase() + combo.difficulty.slice(1)}
                </p>
              </div>
            </div>

            {/* Use Case */}
            <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-blue-200 text-xs leading-relaxed">
                <span className="font-semibold block mb-1">💡 Use Case:</span>
                {combo.useCase}
              </p>
            </div>

            {/* Pricing - Only show if not free */}
            {!isFreeTier && (
              <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/30">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-white/60 text-xs mb-1">Monthly</p>
                    <p className="text-2xl font-bold text-white">
                      ${monthlyPrice.toFixed(2)}
                      <span className="text-sm text-white/60 ml-1">/mo</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-xs mb-1">Annual</p>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        ${(yearlyPrice / 12).toFixed(2)}
                        <span className="text-sm text-white/60 ml-1">/mo</span>
                      </p>
                      {yearlySavings > 0 && (
                        <p className="text-emerald-400 text-xs mt-1 font-semibold">Save {yearlySavings}% annually</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mt-auto pt-4">
              {isFreeTier ? (
                <>
                  <Link
                    href="/invite"
                    className="w-full text-center px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 active:scale-95 ring-1 ring-white/20 shadow-lg"
                  >
                    Get Started Free
                  </Link>
                  <p className="text-center text-xs text-white/60">No credit card required</p>
                </>
              ) : (
                <>
                  <Link
                    href="/premium"
                    className="w-full text-center px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 active:scale-95 ring-1 ring-white/20 shadow-lg"
                  >
                    Subscribe Now
                  </Link>
                  <Link
                    href="/invite"
                    className="w-full text-center px-4 py-3 rounded-lg font-semibold text-white/90 bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
                  >
                    View Details
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
