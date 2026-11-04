import React from 'react';
import { SECLUDED_STAY_IMAGE } from '../data/enrouteData';

export const QuietSection: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] sm:h-[700px] rounded-3xl overflow-hidden my-16 select-none border border-white/5 shadow-2xl">
      {/* Static Atmospheric Himalayan Mountain Landscape */}
      <img
        src={SECLUDED_STAY_IMAGE}
        alt="Solitary Himalayan valley at dusk"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-[1.05]"
      />

      {/* Gentle drifting mist overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111A15] via-transparent to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-[#1B2B23]/20 mist-drift pointer-events-none" />

      {/* Deliberately minimal breathing typography - No CTA, No cards */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-[#D5CEBF]/70 mb-3">
          A Moment of Himalayan Silence
        </span>
        <h2 className="text-3xl sm:text-6xl font-serif font-normal text-[#FAF8F2] tracking-wider drop-shadow-lg">
          Stay a little longer.
        </h2>
        <p className="text-xs sm:text-sm text-[#D5CEBF]/80 italic mt-3 font-serif max-w-sm">
          The mountains are not in a hurry. You don’t need to be either.
        </p>
      </div>
    </div>
  );
};
