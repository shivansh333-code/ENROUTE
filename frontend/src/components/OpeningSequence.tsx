import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Volume2, VolumeX, ArrowDown } from 'lucide-react';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Synthesize natural mountain wind ambiance using Web Audio API
  useEffect(() => {
    let ctx: AudioContext | null = null;
    let noiseNode: AudioNode | null = null;
    let gainNode: GainNode | null = null;

    if (soundEnabled) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctx = new AudioContextClass();
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 1.5;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();

        noiseNode = whiteNoise;
        setAudioCtx(ctx);
      } catch {
        // Audio policy ignore
      }
    }

    return () => {
      if (ctx && ctx.state !== 'closed') {
        try { ctx.close(); } catch { /* ignore */ }
      }
    };
  }, [soundEnabled]);

  useEffect(() => {
    // Step timeline:
    // 0: Darkness, tiny light appears
    // 1: Road line curves and extends
    // 2: Contour lines appear
    // 3: ENROUTE title and philosophy
    // 4: "Where will the road take you?" + Begin ↓
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 2400);
    const timer3 = setTimeout(() => setStep(3), 4200);
    const timer4 = setTimeout(() => setStep(4), 5800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 bg-[#0A100D] text-[#FAF8F2] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Top Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs tracking-widest text-[#8E9A92] uppercase z-20">
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-[#A3B899] animate-spin" style={{ animationDuration: '18s' }} />
          <span>Himachal Pradesh · 31.1048° N, 77.1734° E</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 rounded-full hover:border-white/30 transition-colors text-xs text-[#FAF8F2]/70 hover:text-white"
            title={soundEnabled ? 'Mute Mountain Wind' : 'Enable Mountain Ambiance'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#A3B899]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Wind Ambiance: Active' : 'Sound'}</span>
          </button>

          <button
            onClick={onComplete}
            className="px-3 py-1.5 text-xs text-[#FAF8F2]/60 hover:text-white transition-colors"
          >
            Skip Intro →
          </button>
        </div>
      </div>

      {/* SVG Canvas for Aerial Winding Mountain Road & Contour Lines */}
      <div className="relative w-full max-w-4xl h-[420px] flex items-center justify-center">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full stroke-current"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Topographic Elevation Contour Lines */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.18 }}
                transition={{ duration: 1.8 }}
                className="stroke-[#9EADA2]"
                strokeWidth="0.8"
                strokeDasharray="3 3"
              >
                <path d="M 50,220 C 180,180 320,280 480,210 C 620,150 780,240 950,190" />
                <path d="M 30,260 C 190,220 340,320 510,250 C 660,190 820,290 980,240" />
                <path d="M 80,180 C 210,140 360,240 520,170 C 680,110 810,210 930,160" />
                <path d="M 60,310 C 220,270 380,370 560,300 C 720,240 850,330 960,290" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* The Mountain Road Path */}
          <path
            id="himalayan-road"
            d="M 50,420 C 180,410 240,320 310,340 C 400,365 430,260 520,240 C 620,220 670,140 760,160 C 850,180 890,90 970,80"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Animated Light Headlight tracing the road */}
          {step >= 1 && (
            <motion.path
              d="M 50,420 C 180,410 240,320 310,340 C 400,365 430,260 520,240 C 620,220 670,140 760,160 C 850,180 890,90 970,80"
              stroke="#E8DFC5"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3.4, ease: [0.25, 1, 0.5, 1] }}
            />
          )}

          {/* The Traveling Vehicle Light Point */}
          {step >= 1 && (
            <motion.circle
              r="4.5"
              fill="#FAF8F2"
              className="drop-shadow-[0_0_12px_rgba(250,248,242,0.9)]"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              style={{
                offsetPath: 'path("M 50,420 C 180,410 240,320 310,340 C 400,365 430,260 520,240 C 620,220 670,140 760,160 C 850,180 890,90 970,80")',
              }}
              transition={{ duration: 3.4, ease: [0.25, 1, 0.5, 1] }}
            />
          )}
        </svg>

        {/* Central Reveal Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3"
              >
                <div className="text-xs uppercase tracking-[0.35em] text-[#A3B899] font-medium">
                  Slow Travel Curations · Himachal
                </div>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-normal tracking-[0.18em] text-[#FAF8F2]">
                  ENROUTE
                </h1>
                <p className="text-sm sm:text-base italic text-[#D5CEBF] font-serif max-w-md mx-auto">
                  “The Journey is the Destination.”
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Step 4: Where will the road take you? & Begin CTA */}
      <div className="h-24 flex flex-col items-center justify-center">
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="text-xs sm:text-sm text-[#8E9A92] tracking-wider">
                Where will the road take you?
              </p>
              <button
                onClick={onComplete}
                className="group flex items-center gap-2 px-6 py-2.5 bg-[#FAF8F2] text-[#111A15] text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-[#E8DFC5] transition-all transform hover:scale-105 shadow-xl"
              >
                <span>Begin The Journey</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Subtle Mountain Soul Note */}
      <div className="absolute bottom-6 text-[11px] text-[#5E6962] tracking-wider text-center px-4">
        Mountains have curved roads, but straight people.
      </div>
    </motion.div>
  );
};
