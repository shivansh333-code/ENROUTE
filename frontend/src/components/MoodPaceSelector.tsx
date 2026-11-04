import React, { useState } from 'react';
import { PaceMode, RouteId } from '../types';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

interface MoodPaceSelectorProps {
  onRecommendationSelect: (routeId: RouteId) => void;
  onPaceChange: (pace: PaceMode) => void;
  currentPace: PaceMode;
}

export const MoodPaceSelector: React.FC<MoodPaceSelectorProps> = ({
  onRecommendationSelect,
  onPaceChange,
  currentPace,
}) => {
  const [escapingFrom, setEscapingFrom] = useState<string>('Noise');
  const [seeking, setSeeking] = useState<string>('Silence');

  const escapeOptions = ['Noise', 'Crowds', 'Deadlines', 'Heat', 'Routine', 'Everything'];
  const seekingOptions = ['Mountains', 'Snow', 'Forests', 'Food', 'Silence', 'Culture', 'Adventure', 'Nothingness'];

  // Smart non-hallucinated journey match logic based on feelings
  let recommendedRouteId: RouteId = 'upper-shimla';
  let recommendationReason = 'Upper Shimla Apple Country & Pabbar silence';

  if (seeking === 'Snow' || seeking === 'Adventure' || escapingFrom === 'Everything') {
    recommendedRouteId = 'great-himachal-loop';
    recommendationReason = 'The Great Himachal Loop · 14-Day Signature Expedition';
  } else if (seeking === 'Forests' || seeking === 'Food' || escapingFrom === 'Heat') {
    recommendedRouteId = 'kullu-manali';
    recommendationReason = 'Tirthan & Old Manali · Rivers Before Mountains';
  } else {
    recommendedRouteId = 'upper-shimla';
    recommendationReason = 'Beyond Shimla · Kotgarh Orchard Sanctuary';
  }

  return (
    <div className="w-full rounded-2xl bg-[#121C16] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A3B899]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intuitive Travel Curation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2]">
          What is calling you to the road?
        </h2>
        <p className="text-xs text-[#8E9A92]">
          Select what you are leaving behind and what you wish to immerse yourself in.
        </p>
      </div>

      {/* Question 1: What are you escaping from? */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-[#D5CEBF]">
          01 · What are you escaping from?
        </div>
        <div className="flex flex-wrap gap-2">
          {escapeOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setEscapingFrom(opt)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                escapingFrom === opt
                  ? 'bg-[#FAF8F2] text-[#111A15] shadow-md font-semibold'
                  : 'bg-white/5 text-[#D5CEBF] hover:bg-white/10 border border-white/5'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Question 2: What do you want more of? */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-[#D5CEBF]">
          02 · What do you want more of?
        </div>
        <div className="flex flex-wrap gap-2">
          {seekingOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSeeking(opt)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                seeking === opt
                  ? 'bg-[#A3B899] text-[#111A15] shadow-md font-semibold'
                  : 'bg-white/5 text-[#D5CEBF] hover:bg-white/10 border border-white/5'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Pace Modes: Section 25 */}
      <div className="space-y-3 pt-2 border-t border-white/5">
        <div className="text-xs font-mono uppercase tracking-wider text-[#D5CEBF]">
          03 · Choose Your Pace
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => onPaceChange('wander')}
            className={`p-4 rounded-xl text-left border transition-all ${
              currentPace === 'wander'
                ? 'bg-white/10 border-[#FAF8F2] shadow-lg'
                : 'bg-white/5 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-mono text-[#A3B899]">Wander</span>
              {currentPace === 'wander' && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <div className="text-sm font-serif text-white mt-1">Few Plans</div>
            <p className="text-[11px] text-[#8E9A92] mt-1">
              Spontaneous stops, taking whichever fork looks quieter, lingering by rivers.
            </p>
          </button>

          <button
            onClick={() => onPaceChange('flow')}
            className={`p-4 rounded-xl text-left border transition-all ${
              currentPace === 'flow'
                ? 'bg-white/10 border-[#FAF8F2] shadow-lg'
                : 'bg-white/5 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-mono text-[#A3B899]">Flow</span>
              {currentPace === 'flow' && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <div className="text-sm font-serif text-white mt-1">Thoughtfully Curated</div>
            <p className="text-[11px] text-[#8E9A92] mt-1">
              Handpicked homesteads, optimal drive hours, local meals booked in advance.
            </p>
          </button>

          <button
            onClick={() => onPaceChange('disappear')}
            className={`p-4 rounded-xl text-left border transition-all ${
              currentPace === 'disappear'
                ? 'bg-white/10 border-[#FAF8F2] shadow-lg'
                : 'bg-white/5 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-mono text-[#A3B899]">Disappear</span>
              {currentPace === 'disappear' && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <div className="text-sm font-serif text-white mt-1">Slow & Secluded</div>
            <p className="text-[11px] text-[#8E9A92] mt-1">
              Deep remote valleys, zero tourist buses, phone off, days with no checklist.
            </p>
          </button>
        </div>
      </div>

      {/* Curated Recommendation Output */}
      <div className="p-4 sm:p-5 bg-[#0C140F] rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#8E9A92]">
            Recommended Himalayan Belt for Escaping <span className="text-white font-medium">{escapingFrom}</span> + Seeking <span className="text-[#A3B899] font-medium">{seeking}</span>
          </div>
          <div className="text-lg font-serif text-[#FAF8F2] mt-0.5">
            {recommendationReason}
          </div>
        </div>

        <button
          onClick={() => onRecommendationSelect(recommendedRouteId)}
          className="px-5 py-2.5 bg-[#FAF8F2] text-[#111A15] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#E8DFC5] transition-all flex items-center gap-2 shrink-0 shadow-md"
        >
          <span>View Belt</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
