import React, { useState } from 'react';
import { RouteId, RouteData } from '../types';
import { ENROUTE_ROUTES, HIGH_PASSES } from '../data/enrouteData';
import { Mountain, MapPin, Compass, Clock, Sparkles, AlertCircle, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { TunnelExperience } from '../components/TunnelExperience';
import { SecretsShowcase } from '../components/SecretsShowcase';

interface RouteDetailViewProps {
  routeId: RouteId;
  onOpenPlannerForRoute: (routeId: RouteId) => void;
  onSwitchRoute: (routeId: RouteId) => void;
}

export const RouteDetailView: React.FC<RouteDetailViewProps> = ({
  routeId,
  onOpenPlannerForRoute,
  onSwitchRoute,
}) => {
  const route = ENROUTE_ROUTES.find((r) => r.id === routeId) || ENROUTE_ROUTES[0];
  const [selectedItineraryIdx, setSelectedItineraryIdx] = useState<number>(0);
  const currentItinerary = route.itineraries[selectedItineraryIdx] || route.itineraries[0];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Belt Banner */}
      <div className="relative w-full h-[540px] sm:h-[640px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-end p-6 sm:p-14">
        <img
          src={route.heroImage}
          alt={route.name}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111A15] via-black/40 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#A3B899] font-mono">
            <span>Route {route.number}</span>
            <span className="text-white/30">·</span>
            <span>{route.tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-serif text-[#FAF8F2] leading-tight">
            {route.name}
          </h1>

          <p className="text-sm sm:text-base text-[#D5CEBF] font-serif italic max-w-2xl leading-relaxed">
            “{route.summary}”
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenPlannerForRoute(route.id)}
              className="px-6 py-3 bg-[#FAF8F2] text-[#111A15] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#E8DFC5] transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
            >
              <span>Curate This Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Other routes quick jump */}
            <div className="flex items-center gap-2 text-xs text-[#8E9A92]">
              <span>Or explore:</span>
              {ENROUTE_ROUTES.filter((r) => r.id !== route.id).map((other) => (
                <button
                  key={other.id}
                  onClick={() => onSwitchRoute(other.id)}
                  className="underline hover:text-white transition-colors"
                >
                  Route {other.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Landscape Evolution (Visual Strip) */}
      <div className="bg-[#141E18] rounded-2xl border border-white/5 p-6 sm:p-8 space-y-3">
        <div className="text-[11px] uppercase tracking-widest text-[#A3B899] font-mono">
          The Changing Topography
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs text-[#D5CEBF]">
          {route.landscapeEvolution.map((phase, idx) => (
            <React.Fragment key={phase}>
              <span className="px-3 py-1.5 rounded-lg bg-black/30 border border-white/5 whitespace-nowrap shrink-0">
                {phase}
              </span>
              {idx < route.landscapeEvolution.length - 1 && (
                <span className="text-[#5E6962] shrink-0 font-mono">↓</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 3. Selectable Itinerary Styles (Section 12, 15, 18) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/5 pb-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
              Travel Ecosystem · Non-Compulsory Combinations
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2] mt-0.5">
              Selectable Itinerary Styles
            </h2>
          </div>
          <p className="text-xs text-[#8E9A92]">
            Different paces for different travel personalities
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {route.itineraries.map((itinerary, idx) => (
            <button
              key={itinerary.duration}
              onClick={() => setSelectedItineraryIdx(idx)}
              className={`p-6 rounded-2xl border text-left transition-all ${
                selectedItineraryIdx === idx
                  ? 'bg-[#18261F] border-[#FAF8F2] shadow-xl'
                  : 'bg-[#111A15] border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-[#A3B899] font-mono">
                <span>{itinerary.duration}</span>
                {itinerary.isSignature && (
                  <span className="bg-[#7B242C] text-white px-2 py-0.5 rounded text-[10px] uppercase">
                    Recommended
                  </span>
                )}
              </div>
              <h3 className="text-lg font-serif text-[#FAF8F2] mt-2">
                {itinerary.title}
              </h3>
              <p className="text-xs text-[#8E9A92] mt-1">{itinerary.subtitle}</p>

              <div className="pt-4 border-t border-white/5 mt-4 space-y-1 text-xs text-[#D5CEBF]">
                <div className="text-[11px] text-[#A3B899] font-mono">Focus Points:</div>
                {itinerary.focus.map((f) => (
                  <div key={f} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#A3B899]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Active Itinerary Route Flow Strip */}
        <div className="p-6 bg-[#0E1612] rounded-2xl border border-white/5 space-y-3">
          <div className="text-[11px] uppercase tracking-widest text-[#8E9A92] font-mono">
            Journey Stops Progression ({currentItinerary.duration})
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#D5CEBF]">
            {currentItinerary.stopsSummary.map((stop, i) => (
              <React.Fragment key={stop}>
                <span className="px-3 py-1 bg-white/5 rounded-md border border-white/5 font-semibold text-white">
                  {stop}
                </span>
                {i < currentItinerary.stopsSummary.length - 1 && (
                  <span className="text-[#5E6962]">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-xs text-[#8E9A92] pt-2">
            Best suited for: <span className="text-[#FAF8F2]">{currentItinerary.bestFor}</span>
          </div>
        </div>
      </div>

      {/* 4. The Signature Atal Tunnel Rebirth (Only shown for Great Loop or highlighted) */}
      {route.id === 'great-himachal-loop' && (
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
            Interactive Sequence · Section 19
          </div>
          <TunnelExperience />
        </div>
      )}

      {/* 5. Route Stops Geography & Altitude Profile */}
      <div className="space-y-6">
        <div className="border-b border-white/5 pb-4">
          <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
            Topographic Waypoints
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2] mt-0.5">
            The Geography & Deeper Branches
          </h2>
          <p className="text-xs text-[#8E9A92]">
            Optional detours and hidden sanctuaries we combine based on your personality and the season.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {route.stops.map((stop, idx) => (
            <div
              key={stop.id}
              className={`p-5 rounded-2xl border ${
                stop.isOptionalBranch
                  ? 'bg-[#15201A] border-amber-500/20'
                  : 'bg-[#121B16] border-white/5'
              } space-y-2.5`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[#A3B899]">
                  Stop 0{idx + 1} {stop.isOptionalBranch && '· Optional Deep Branch'}
                </span>
                <span className="font-mono text-[11px] text-[#E8DFC5] flex items-center gap-1">
                  <Mountain className="w-3 h-3" />
                  {stop.elevation}
                </span>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[#8E9A92]">{stop.tagline}</div>
                <h3 className="text-lg font-serif text-[#FAF8F2]">{stop.name}</h3>
              </div>

              <p className="text-xs text-[#D5CEBF] leading-relaxed">
                {stop.description}
              </p>

              <div className="pt-2 text-[11px] text-[#A3B899] font-mono border-t border-white/5 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>Curated: {stop.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Curated Mountain Stay in this Belt */}
      <div className="space-y-6">
        <div className="border-b border-white/5 pb-4">
          <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
            Sanctuary & Slumber
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2] mt-0.5">
            Editorial Stays in {route.name}
          </h2>
          <p className="text-xs text-[#8E9A92]">
            Never hotel-booking portals. Handcrafted properties built of stone, cedar, and solitude.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {route.stays.map((stay) => (
            <div
              key={stay.id}
              className="rounded-2xl bg-[#141E18] border border-white/10 overflow-hidden space-y-4 shadow-xl"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={stay.image}
                  alt={stay.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-[#FAF8F2] border border-white/10 font-mono">
                  {stay.category}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-[#E8DFC5] font-mono flex items-center gap-1">
                  <Mountain className="w-3 h-3" />
                  {stay.elevation}
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <div className="text-xs font-mono uppercase text-[#A3B899]">{stay.valley}</div>
                <h3 className="text-xl font-serif text-[#FAF8F2]">{stay.name}</h3>
                <p className="text-xs text-[#D5CEBF] leading-relaxed italic font-serif">
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

      {/* 7. Mountain Food Experience: "Sometimes the best landmark is lunch." */}
      <div className="p-8 bg-[#15221B] rounded-3xl border border-white/10 space-y-4">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
            Himalayan Table
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2]">
            Sometimes the best landmark is lunch.
          </h3>
          <p className="text-xs text-[#8E9A92]">
            Prepared fresh on woodfire kitchens with stone-ground flours, ghee, and wild mountain herbs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {route.foods.map((food) => (
            <div key={food.id} className="p-5 bg-black/20 rounded-2xl border border-white/5 space-y-2">
              <h4 className="text-base font-serif text-[#FAF8F2]">{food.dishName}</h4>
              <div className="text-[11px] text-[#A3B899] font-mono">{food.setting}</div>
              <p className="text-xs text-[#D5CEBF] leading-relaxed">{food.description}</p>
              <div className="text-[11px] text-[#8E9A92] italic pt-2 border-t border-white/5">
                <span className="font-semibold text-white/90">Pahadi tip: </span>
                {food.pahadiTip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Pahadi Encounter Box */}
      <div className="p-6 bg-[#0E1612] rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono text-[#A3B899] uppercase tracking-wider">
            {route.pahadiDialogue.situation}
          </div>
          <p className="text-base font-serif italic text-[#FAF8F2]">
            {route.pahadiDialogue.quote}
          </p>
        </div>

        <button
          onClick={() => onOpenPlannerForRoute(route.id)}
          className="px-6 py-3 bg-[#FAF8F2] text-[#111A15] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#E8DFC5] transition-colors shrink-0 shadow-lg"
        >
          Plan This Road
        </button>
      </div>
    </div>
  );
};
