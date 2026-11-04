import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Eye } from 'lucide-react';
import { KULLU_MANALI_IMAGE, SPITI_LOOP_IMAGE } from '../data/enrouteData';

export const TunnelExperience: React.FC = () => {
  // Phase: 0 = Lahaul/Sissu Approach, 1 = Inside Atal Tunnel (Pitch Darkness + Road Markers), 2 = Manali Green Valley Rebirth
  const [phase, setPhase] = useState<number>(0);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black min-h-[520px] flex flex-col justify-between">
      <AnimatePresence mode="wait">
        {/* PHASE 0: North Portal (Lahaul / Cold Stark Majesty) */}
        {phase === 0 && (
          <motion.div
            key="phase-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="relative w-full h-[520px] flex flex-col justify-between p-8"
          >
            <img
              src={SPITI_LOOP_IMAGE}
              alt="Lahaul Valley approach"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="relative z-10 flex items-center justify-between text-xs text-[#E8DFC5] uppercase tracking-widest font-mono">
              <span>Atal Tunnel · North Portal (Lahaul)</span>
              <span>Elevation 3,048 m · 0°C</span>
            </div>

            <div className="relative z-10 max-w-xl space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#A3B899] font-medium">
                Chapter IV · The Great Himachal Loop
              </span>
              <h3 className="text-3xl sm:text-5xl font-serif text-[#FAF8F2] leading-tight">
                Into The 9-Kilometer Granite Dark
              </h3>
              <p className="text-xs sm:text-sm text-[#D5CEBF] leading-relaxed">
                Behind you lies the stark moonscape of Lahaul and the dry Himalayan rain shadow. Ahead, 9,020 meters of solid mountain rock drilled beneath the Rohtang crest.
              </p>

              <button
                onClick={() => setPhase(1)}
                className="mt-4 px-6 py-3 bg-[#FAF8F2] text-[#111A15] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#E8DFC5] transition-all flex items-center gap-2 group shadow-xl"
              >
                <span>Enter The Tunnel</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 1: Inside The Tunnel (The Screen Goes Dark, Only Amber Road Cat Eyes) */}
        {phase === 1 && (
          <motion.div
            key="phase-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-[520px] bg-[#050505] flex flex-col items-center justify-center p-8 overflow-hidden select-none"
          >
            {/* Dark Tunnel Perspective Lines */}
            <svg
              viewBox="0 0 800 500"
              className="absolute inset-0 w-full h-full stroke-yellow-500/30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tunnel Arch */}
              <path d="M 100,500 C 100,200 700,200 700,500" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
              <path d="M 200,500 C 200,260 600,260 600,500" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <path d="M 300,500 C 300,320 500,320 500,500" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />

              {/* Road Cat Eyes / Center Line */}
              <motion.line
                x1="400"
                y1="340"
                x2="400"
                y2="500"
                stroke="#F59E0B"
                strokeWidth="4"
                strokeDasharray="16 24"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -200 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              />

              {/* Distant Pinprick of Light Emerging */}
              <circle cx="400" cy="335" r="3" fill="#FAF8F2" className="animate-ping" style={{ animationDuration: '2.5s' }} />
              <circle cx="400" cy="335" r="5" fill="#FAF8F2" className="opacity-80" />
            </svg>

            {/* In-tunnel Sensory Copy */}
            <div className="relative z-10 text-center max-w-md space-y-4">
              <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-yellow-500/80">
                Depth: 1,900 m beneath the Pir Panjal
              </div>
              <h4 className="text-xl sm:text-2xl font-serif text-[#FAF8F2]">
                Silence. Concrete echo. The cold rock wall.
              </h4>
              <p className="text-xs text-[#8E9A92] leading-relaxed">
                Nine minutes under the earth. Then, without warning, the headlights hit morning moisture.
              </p>

              <button
                onClick={() => setPhase(2)}
                className="px-6 py-2.5 bg-yellow-500/20 border border-yellow-500/40 text-yellow-200 text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-yellow-500/30 transition-all flex items-center gap-2 mx-auto"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Exit Into Manali Light →</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: South Portal (Manali Green Explodes Onto Screen) */}
        {phase === 2 && (
          <motion.div
            key="phase-2"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0 }}
            className="relative w-full h-[520px] flex flex-col justify-between p-8"
          >
            <img
              src={KULLU_MANALI_IMAGE}
              alt="South Portal Manali valley explosion"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="relative z-10 flex items-center justify-between text-xs text-[#A3B899] uppercase tracking-widest font-mono">
              <span>South Portal · Solang / Manali</span>
              <span>Elevation 2,050 m · 16°C · Pine Mist</span>
            </div>

            <div className="relative z-10 max-w-xl space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E8DFC5]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Climatic Metamorphosis</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-serif text-[#FAF8F2] leading-tight">
                Green Explodes Onto The Horizon.
              </h3>
              <p className="text-xs sm:text-sm text-[#D5CEBF] leading-relaxed">
                From desert to dense pine forest in four seconds. The smell of cedar, rain, and blooming wild mint fills the car cabin. You have returned to the living valleys of Kullu.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setPhase(0)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-[#FAF8F2] text-xs uppercase tracking-widest rounded-full transition-colors font-medium border border-white/10"
                >
                  Replay Passage
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
