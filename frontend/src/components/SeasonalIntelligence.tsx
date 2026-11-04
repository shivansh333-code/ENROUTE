import React from 'react';
import { HIGH_PASSES } from '../data/enrouteData';
import { SeasonalStatus } from '../types';
import { ShieldAlert, CheckCircle2, Clock, CloudSnow, Info } from 'lucide-react';

export const SeasonalIntelligence: React.FC = () => {
  const getBadge = (status: SeasonalStatus) => {
    switch (status) {
      case 'OPEN':
        return (
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>OPEN & VERIFIED</span>
          </span>
        );
      case 'SEASONAL':
        return (
          <span className="flex items-center gap-1.5 text-xs text-amber-300 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>SEASONAL ACCESS ONLY</span>
          </span>
        );
      case 'WINTER_ROUTE':
        return (
          <span className="flex items-center gap-1.5 text-xs text-cyan-300 font-mono">
            <CloudSnow className="w-3.5 h-3.5" />
            <span>WINTER DETOUR APPLIED</span>
          </span>
        );
      case 'CHECKING_ROAD':
        return (
          <span className="flex items-center gap-1.5 text-xs text-orange-400 font-mono">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CONFIRMATION REQUIRED</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#0F1713] border border-white/10 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A3B899]">
            <CloudSnow className="w-3.5 h-3.5" />
            <span>Real Mountain Safety & Topography</span>
          </div>
          <h2 className="text-2xl font-serif text-[#FAF8F2] mt-0.5">
            Seasonal High Pass Intelligence
          </h2>
          <p className="text-xs text-[#8E9A92] mt-0.5">
            Himalayan passes are governed by snow, not calendars. We monitor access daily.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#D5CEBF] bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
          <Info className="w-3.5 h-3.5 text-[#A3B899] shrink-0" />
          <span>Dynamic CMS Statuses · Never Assumes Year-Round Transit</span>
        </div>
      </div>

      {/* Grid of high passes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {HIGH_PASSES.map((pass) => (
          <div
            key={pass.name}
            className="p-4 rounded-xl bg-[#141E18] border border-white/5 space-y-3 hover:border-white/15 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-serif text-[#FAF8F2]">{pass.name}</h3>
                <div className="text-[11px] text-[#8E9A92] font-mono">{pass.altitude}</div>
              </div>
              <div className="shrink-0">{getBadge(pass.status)}</div>
            </div>

            <div className="text-xs text-[#A3B899] font-mono">
              Operational Window: {pass.seasonWindow}
            </div>

            <p className="text-xs text-[#D5CEBF] leading-relaxed">
              {pass.operationalNote}
            </p>

            <div className="text-[10px] text-[#5E6962] font-mono pt-1 border-t border-white/5">
              Source: {pass.lastUpdated}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
