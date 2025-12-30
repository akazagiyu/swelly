import React from 'react';
import type { BotPersonality } from '@/app/invite/page';
import ScrollReveal from '@/components/motion/ScrollReveal';

interface BotPersonalityCardProps {
  bot: {
    name: string;
    colorScheme: {
      gradient: string;
      accent: string;
      ring: string;
      glass: string;
    };
  };
  personality: BotPersonality;
  index: number;
}

export default function BotPersonalityCard({
  bot,
  personality,
  index
}: BotPersonalityCardProps) {
  const complexityColor = {
    simple: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    moderate: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    advanced: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
  };

  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="group relative h-full">
        <div className={`relative rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl ${bot.colorScheme.glass} ring-2 ${bot.colorScheme.ring} p-6 md:p-8 flex flex-col h-full`}>
          
          {/* Gradient accent line at top */}
          <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${bot.colorScheme.gradient}`} />

          {/* Content */}
          <div className="relative z-10 space-y-6 flex flex-col h-full">
            
          {/* Vibe Header */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="text-5xl">{personality.emoji}</div>
                <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 text-blue-300">
                  {bot.name}
                </span>
              </div>
              <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${bot.colorScheme.accent} bg-clip-text text-transparent`}>
                {personality.vibe}
              </h3>
              <p className="text-white/80 font-medium">
                {personality.tagline}
              </p>
            </div>

            {/* Divider */}
            <div className={`border-t border-white/10`} />

            {/* Personality Description */}
            <div>
              <h4 className="text-white/60 text-xs uppercase font-semibold tracking-wider mb-2">
                What it means
              </h4>
              <p className="text-white/80 leading-relaxed">
                {personality.personality}
              </p>
            </div>

            {/* Best For */}
            <div className="flex-grow">
              <h4 className="text-white/60 text-xs uppercase font-semibold tracking-wider mb-3">
                Best for
              </h4>
              <div className="flex flex-wrap gap-2">
                {personality.bestFor.map((useCase, idx) => (
                  <span
                    key={`${useCase}-${idx}`}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${bot.colorScheme.accent} bg-clip-text text-transparent border border-white/10 bg-white/5`}
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>

            {/* Complexity Badge */}
            <div className="pt-2">
              <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold border ${complexityColor[personality.complexity]}`}>
                {personality.complexity.charAt(0).toUpperCase() + personality.complexity.slice(1)} Setup
              </span>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
