import React, { useState } from 'react';
import { BRAND_PEOPLE } from '../data/enrouteData';
import { Heart, Compass, Sparkles } from 'lucide-react';

export const WhyEnroute: React.FC = () => {
  const [activePersonIndex, setActivePersonIndex] = useState<number>(0);

  return (
    <div className="space-y-20 py-12">
      {/* Part 1: Animated Contrast (Typical Tourism vs Enroute) */}
      <div className="relative rounded-3xl bg-[#0F1713] border border-white/10 p-8 sm:p-14 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Typical tourism rhythm */}
          <div className="space-y-3 opacity-60">
            <div className="text-[11px] uppercase tracking-widest font-mono text-[#8E9A92]">
              The Conventional Tourism Rush
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-lg font-mono text-[#D5CEBF]/60 line-through decoration-rose-500/60">
              <span>Reach</span>
              <span>→</span>
              <span>See</span>
              <span>→</span>
              <span>Click</span>
              <span>→</span>
              <span>Upload</span>
              <span>→</span>
              <span>Leave</span>
            </div>
            <p className="text-xs text-[#8E9A92] italic">
              A checklist of monuments, hotel lobbies, and crowded viewpoints.
            </p>
          </div>

          <div className="w-full h-px bg-white/10" />

          {/* Enroute rhythm */}
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-[#A3B899] font-medium">
              The Enroute Experience
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xl sm:text-3xl font-serif text-[#FAF8F2]">
              <span className="hover:text-[#A3B899] transition-colors">Drive</span>
              <span className="text-[#8E9A92]">·</span>
              <span className="hover:text-[#A3B899] transition-colors">Pause</span>
              <span className="text-[#8E9A92]">·</span>
              <span className="hover:text-[#A3B899] transition-colors">Taste</span>
              <span className="text-[#8E9A92]">·</span>
              <span className="hover:text-[#A3B899] transition-colors">Talk</span>
              <span className="text-[#8E9A92]">·</span>
              <span className="hover:text-[#A3B899] transition-colors">Wander</span>
              <span className="text-[#8E9A92]">·</span>
              <span className="hover:text-[#A3B899] transition-colors">Stay</span>
              <span className="text-[#8E9A92]">·</span>
              <span className="hover:text-[#A3B899] transition-colors">Feel</span>
              <span className="text-[#8E9A92]">·</span>
              <span className="text-[#E8DFC5] italic">Then arrive.</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <h3 className="text-3xl sm:text-5xl font-serif text-[#FAF8F2]">
                Same mountains. <br />
                <span className="text-[#A3B899] italic">Different journey.</span>
              </h3>
              <p className="text-xs text-[#8E9A92] max-w-sm">
                Luxury isn’t a chandelier in a hill station hotel. Luxury is having time to stop for chai with no one waiting behind you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: “Mountains have curved roads, but straight people.” */}
      <div className="relative rounded-3xl bg-[#141F19] border border-white/10 p-8 sm:p-14 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#A3B899]">
              The Soul of Himachal
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#FAF8F2] leading-tight">
              “Mountains have curved roads, <br />
              <span className="italic text-[#E8DFC5]">but straight people.”</span>
            </h2>
            <div className="text-xs uppercase tracking-widest text-[#8E9A92] pt-1">
              Simple · Warm · Honest · Real
            </div>
          </div>

          {/* Interactive Road Curves with Local People Portraits */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
            {BRAND_PEOPLE.map((person, idx) => (
              <button
                key={person.role}
                onClick={() => setActivePersonIndex(idx)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  activePersonIndex === idx
                    ? 'bg-[#1D2C24] border-[#FAF8F2] shadow-xl'
                    : 'bg-[#101813] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#A3B899]">
                  {person.location}
                </div>
                <div className="text-lg font-serif text-[#FAF8F2] mt-1">
                  {person.role}
                </div>
                <p className="text-xs text-[#D5CEBF] italic mt-2.5 font-serif line-clamp-3">
                  {person.quote}
                </p>
              </button>
            ))}
          </div>

          {/* Featured Quote Highlight */}
          <div className="p-6 bg-[#0E1612] rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-white/10 shrink-0">
              <img
                src={BRAND_PEOPLE[activePersonIndex].image}
                alt={BRAND_PEOPLE[activePersonIndex].role}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
                {BRAND_PEOPLE[activePersonIndex].role} · {BRAND_PEOPLE[activePersonIndex].location}
              </div>
              <p className="text-base sm:text-lg font-serif text-[#FAF8F2] italic">
                {BRAND_PEOPLE[activePersonIndex].quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
