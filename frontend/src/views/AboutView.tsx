import React from 'react';
import { Shield, Compass, Heart, AlertTriangle, Trees, Footprints } from 'lucide-react';
import { HERO_IMAGE, SECLUDED_STAY_IMAGE } from '../data/enrouteData';

interface AboutViewProps {
  onOpenPlanner: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenPlanner }) => {
  return (
    <div className="space-y-16 pb-20">
      {/* 1. Philosophy Hero */}
      <div className="relative w-full h-[480px] sm:h-[560px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-end p-6 sm:p-14">
        <img
          src={HERO_IMAGE}
          alt="Enroute road journey through mist"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111A15] via-black/40 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
            Origin & Conviction
          </div>
          <h1 className="text-3xl sm:text-6xl font-serif text-[#FAF8F2] leading-tight">
            We remembered the roads more than the destinations.
          </h1>
          <p className="text-xs sm:text-sm text-[#D5CEBF] font-serif italic">
            “We’re not here to get you there faster. We’re here to make getting there unforgettable.”
          </p>
        </div>
      </div>

      {/* 2. The Philosophy of Unhurried Luxury */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
            The Definition of Mountain Luxury
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#FAF8F2]">
            Luxury = Time + Space + Access + Thoughtfulness.
          </h2>
          <p className="text-xs sm:text-sm text-[#D5CEBF] leading-relaxed">
            Modern travel has turned into a frantic checklist: land, check-in, photograph, move on. Enroute exists to quiet that noise.
          </p>
          <p className="text-xs sm:text-sm text-[#8E9A92] leading-relaxed">
            To us, luxury is a cedar room facing an empty valley where nobody speaks above a whisper. It is a warm meal cooked by a grandmother in Kotgarh, a driver who knows exactly which unmapped dirt track leads to the clearest sunset, and a calendar with nothing marked down for the afternoon.
          </p>
        </div>

        <div className="p-8 bg-[#141F19] rounded-2xl border border-white/10 space-y-4 shadow-xl">
          <div className="text-xs font-mono uppercase tracking-widest text-[#A3B899]">
            The Enroute Creed
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-[#FAF8F2] font-serif">
            <li className="flex items-start gap-2">
              <span className="text-[#A3B899]">01.</span>
              <span>A journey should be experienced, not completed.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A3B899]">02.</span>
              <span>Mountains have curved roads, but straight people.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A3B899]">03.</span>
              <span>The destination is only one chapter. The road is the story.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#A3B899]">04.</span>
              <span>Leave places better than you found them.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Responsible Travel: Some Secrets Deserve Protecting (Section 40) */}
      <div className="p-8 sm:p-12 bg-[#0F1713] rounded-3xl border border-white/10 space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A3B899] font-mono">
            <Trees className="w-4 h-4" />
            <span>Ecological & Cultural Stewardship</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif text-[#FAF8F2]">
            Some secrets deserve protecting.
          </h3>
          <p className="text-xs text-[#8E9A92] leading-relaxed">
            The Himalayas are fragile. We do not geotag sensitive, sacred springs, and we refuse to bring loud tourist convoys into serene villages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#D5CEBF]">
          <div className="p-5 bg-black/20 rounded-xl border border-white/5 space-y-2">
            <div className="text-white font-semibold font-serif text-sm">No Geotagging Fragile Valleys</div>
            <p className="leading-relaxed text-[#8E9A92]">
              We encourage travellers to keep coordinates off social platforms to prevent over-tourism from ruining remote settlements.
            </p>
          </div>

          <div className="p-5 bg-black/20 rounded-xl border border-white/5 space-y-2">
            <div className="text-white font-semibold font-serif text-sm">Support Local Families</div>
            <p className="leading-relaxed text-[#8E9A92]">
              100% of our homestays, cooks, guides, and route helpers are local mountain residents paid fairly and with deep dignity.
            </p>
          </div>

          <div className="p-5 bg-black/20 rounded-xl border border-white/5 space-y-2">
            <div className="text-white font-semibold font-serif text-sm">Zero Plastic on Mountain Trails</div>
            <p className="leading-relaxed text-[#8E9A92]">
              Every Enroute vehicle carries reusable steel water flasks and a bag to bring all waste back down to municipal facilities.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Before You Take The Road (Section 35: Safety Without Killing The Magic) */}
      <div className="p-8 bg-[#141E18] rounded-2xl border border-white/10 space-y-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-mono">
          <Shield className="w-4 h-4" />
          <span>Before You Take The Road · Essential Intelligence</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-[#D5CEBF]">
          <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-1">
            <div className="text-white font-semibold">Acclimatization</div>
            <p className="text-[#8E9A92]">Above 3,000m (Kinnaur/Spiti), we schedule slow ascent profiles with mandatory rest days to prevent AMS.</p>
          </div>
          <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-1">
            <div className="text-white font-semibold">High Pass Permits</div>
            <p className="text-[#8E9A92]">Rohtang Pass permits and Inner Line Permits for non-Indian nationals along Tibet border are arranged seamlessly.</p>
          </div>
          <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-1">
            <div className="text-white font-semibold">Road Suitability</div>
            <p className="text-[#8E9A92]">High ground clearance 4x4 or seasoned commercial 4WD vehicles piloted exclusively by mountain natives.</p>
          </div>
          <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-1">
            <div className="text-white font-semibold">Connectivity Detours</div>
            <p className="text-[#8E9A92]">Cell networks fade beyond Kalpa until Kaza. We provide emergency satellite coordinate checkpoints.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
