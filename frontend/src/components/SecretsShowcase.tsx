import React, { useState } from 'react';
import { ALL_SECRETS, UPPER_SHIMLA_IMAGE } from '../data/enrouteData';
import { EnrouteSecret } from '../types';
import { Lock, Unlock, Eye, Sparkles, MapPin } from 'lucide-react';

interface SecretsShowcaseProps {
  onPlanTripForSecret?: (secret: EnrouteSecret) => void;
}

export const SecretsShowcase: React.FC<SecretsShowcaseProps> = ({ onPlanTripForSecret }) => {
  const [unlockedId, setUnlockedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Take This Turn', 'Eat Here', 'Best Hour', 'Secret View', 'Don\'t Rush This', 'Skip The Crowd', 'Ask For This'];

  const filteredSecrets = activeCategory === 'All'
    ? ALL_SECRETS
    : ALL_SECRETS.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 ${
              activeCategory === cat
                ? 'bg-[#FAF8F2] text-[#111A15] shadow-sm font-semibold'
                : 'bg-white/5 text-[#D5CEBF] hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Secret Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSecrets.map((sec) => {
          const isRevealed = unlockedId === sec.id;

          return (
            <div
              key={sec.id}
              className="group relative rounded-2xl bg-[#131D17] border border-white/10 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-white/25 hover:shadow-2xl min-h-[320px]"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A3B899]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#A3B899] uppercase tracking-wider">
                    {sec.category}
                  </span>
                  <span className="text-[11px] text-[#8E9A92] font-mono flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {sec.location}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-[#FAF8F2] group-hover:text-[#E8DFC5] transition-colors">
                    {sec.teaserTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D5CEBF] italic mt-2 leading-relaxed font-serif">
                    “{sec.teaserQuote}”
                  </p>
                </div>

                {isRevealed && (
                  <div className="pt-3 border-t border-white/10 space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p className="text-xs text-[#FAF8F2] leading-relaxed">
                      {sec.revealedInsight}
                    </p>
                    <div className="p-2.5 bg-black/40 rounded-lg text-[11px] text-[#A3B899] font-mono border border-white/5">
                      <span className="font-bold">Pahadi says: </span>
                      {sec.pahadiNote}
                    </div>
                  </div>
                )}
              </div>

              {/* Reveal / Protect Action */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className="text-[10px] text-[#5E6962] font-mono uppercase tracking-wider">
                  {sec.coordinatesHint}
                </span>

                <button
                  onClick={() => setUnlockedId(isRevealed ? null : sec.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-[#FAF8F2] transition-colors border border-white/10"
                >
                  {isRevealed ? (
                    <>
                      <Lock className="w-3 h-3 text-[#A3B899]" />
                      <span>Conceal</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3 h-3 text-[#E8DFC5]" />
                      <span>Take Me There</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
