import React, { useState } from 'react';
import { StaySpot, FoodSpot } from '../types';
import { ENROUTE_ROUTES, SECLUDED_STAY_IMAGE, UPPER_SHIMLA_IMAGE, KULLU_MANALI_IMAGE, SPITI_LOOP_IMAGE } from '../data/enrouteData';
import { Mountain, Utensils, Home, Compass, Coffee, Heart } from 'lucide-react';

interface ExperiencesViewProps {
  onOpenPlanner: () => void;
}

export const ExperiencesView: React.FC<ExperiencesViewProps> = ({ onOpenPlanner }) => {
  const [activeTab, setActiveTab] = useState<'stays' | 'food'>('stays');
  const [stayFilter, setStayFilter] = useState<string>('All');

  const allStays: StaySpot[] = ENROUTE_ROUTES.flatMap((r) => r.stays);
  const allFoods: FoodSpot[] = ENROUTE_ROUTES.flatMap((r) => r.foods);

  const stayCategories = ['All', 'Inside The Orchard', 'Beside The River', 'Forest Hideaway', 'Nothing Around For Miles'];

  const filteredStays = stayFilter === 'All'
    ? allStays
    : allStays.filter((s) => s.category === stayFilter);

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <div className="relative w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-end p-6 sm:p-12">
        <img
          src={SECLUDED_STAY_IMAGE}
          alt="Secluded mountain stay in Himachal"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111A15] via-black/40 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
            Living & Dining · Mountain Culture
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#FAF8F2]">
            Where You Wake. What You Taste.
          </h1>
          <p className="text-xs sm:text-sm text-[#D5CEBF] font-serif italic">
            “Enroute luxury means a breakfast that doesn’t end at 10 AM, a fire at night, and a local meal cooked with wild herbs.”
          </p>
        </div>
      </div>

      {/* Experience Switcher */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 p-1 bg-[#15201A] rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('stays')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'stays'
                ? 'bg-[#FAF8F2] text-[#111A15] shadow-md'
                : 'text-[#D5CEBF] hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Secluded Stays</span>
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'food'
                ? 'bg-[#FAF8F2] text-[#111A15] shadow-md'
                : 'text-[#D5CEBF] hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Mountain Food</span>
          </button>
        </div>

        <button
          onClick={onOpenPlanner}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs text-[#FAF8F2] rounded-full border border-white/10 uppercase tracking-widest font-mono"
        >
          Book Experiences
        </button>
      </div>

      {/* Content: Stays */}
      {activeTab === 'stays' && (
        <div className="space-y-8">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {stayCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setStayFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                  stayFilter === cat
                    ? 'bg-[#A3B899] text-[#111A15] font-semibold'
                    : 'bg-white/5 text-[#D5CEBF] hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStays.map((stay) => (
              <div
                key={stay.id}
                className="rounded-2xl bg-[#131D17] border border-white/10 overflow-hidden space-y-4 hover:border-white/25 transition-all shadow-xl group"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-[#FAF8F2] font-mono border border-white/10">
                    {stay.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#E8DFC5] font-mono flex items-center gap-1">
                    <Mountain className="w-3 h-3" />
                    {stay.elevation}
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-2">
                  <div className="text-[11px] font-mono uppercase text-[#A3B899]">{stay.valley}</div>
                  <h3 className="text-lg font-serif text-[#FAF8F2]">{stay.name}</h3>
                  <p className="text-xs text-[#D5CEBF] italic font-serif leading-relaxed">
                    “{stay.atmosphere}”
                  </p>
                  <p className="text-xs text-[#8E9A92] leading-relaxed pt-2 border-t border-white/5">
                    {stay.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content: Food */}
      {activeTab === 'food' && (
        <div className="space-y-8">
          <div className="p-6 bg-[#16221C] rounded-2xl border border-white/5 max-w-3xl space-y-2">
            <h3 className="text-2xl font-serif text-[#FAF8F2]">
              “Sometimes the best landmark is lunch.”
            </h3>
            <p className="text-xs text-[#8E9A92] leading-relaxed">
              We reject sterile tourist buffets. Enroute stops at roadside stone hearths, orchard family kitchens, and remote mountain dhabas where food has been cooked slowly for generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allFoods.map((food) => (
              <div
                key={food.id}
                className="p-6 rounded-2xl bg-[#131D17] border border-white/10 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between text-xs text-[#A3B899] font-mono">
                  <span>{food.route}</span>
                  <span>{food.bestTime}</span>
                </div>

                <div>
                  <h4 className="text-xl font-serif text-[#FAF8F2]">{food.dishName}</h4>
                  <div className="text-xs text-[#8E9A92] font-mono mt-0.5">{food.setting}</div>
                </div>

                <p className="text-xs sm:text-sm text-[#D5CEBF] leading-relaxed font-serif italic">
                  {food.description}
                </p>

                <div className="p-3 bg-black/30 rounded-xl border border-white/5 text-xs text-[#A3B899]">
                  <span className="font-semibold text-white/90">Pahadi note: </span>
                  {food.pahadiTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
