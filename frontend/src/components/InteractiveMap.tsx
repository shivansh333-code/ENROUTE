import React, { useState } from 'react';
import { RouteId } from '../types';
import { ENROUTE_ROUTES } from '../data/enrouteData';
import { Compass, MapPin, Mountain, ArrowRight } from 'lucide-react';

interface InteractiveMapProps {
  selectedRouteId: RouteId;
  onSelectRoute: (id: RouteId) => void;
  onExploreRoute: (id: RouteId) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedRouteId,
  onSelectRoute,
  onExploreRoute,
}) => {
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const currentRoute = ENROUTE_ROUTES.find((r) => r.id === selectedRouteId) || ENROUTE_ROUTES[0];

  // Route vector definitions matching Himachal geography
  // Map coordinate bounds approx: Longitude 75.5 - 79.0 E, Latitude 30.5 - 33.2 N
  const routePaths = {
    'upper-shimla': 'M 180,420 Q 230,360 270,330 T 320,290 T 370,260 T 430,230 T 480,210',
    'kullu-manali': 'M 180,420 Q 220,320 250,260 T 290,200 T 310,150 T 340,110 T 380,80',
    'great-himachal-loop': 'M 180,420 Q 270,330 370,260 T 470,240 T 540,210 T 570,160 T 530,110 T 440,90 T 340,110 T 280,210 T 220,320 Z',
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#0D1511] border border-white/10 overflow-hidden shadow-2xl p-6 lg:p-8">
      {/* Top Header & Belt Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A3B899]">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '24s' }} />
            <span>Interactive Topographic Canvas · Himachal Pradesh</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2] mt-1">
            Three Mountain Belts
          </h2>
          <p className="text-xs text-[#8E9A92] mt-0.5">
            Hover or select a route to animate its terrain corridor and key stops
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-[#15201A] border border-white/5 rounded-xl">
          {ENROUTE_ROUTES.map((route) => (
            <button
              key={route.id}
              onClick={() => {
                onSelectRoute(route.id);
                setActiveStopIndex(0);
              }}
              className={`px-3 sm:px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedRouteId === route.id
                  ? 'bg-[#FAF8F2] text-[#111A15] shadow-md font-semibold'
                  : 'text-[#D5CEBF]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="hidden sm:inline mr-1 text-[10px] opacity-60">Route {route.number} ·</span>
              {route.id === 'upper-shimla' && 'Upper Shimla'}
              {route.id === 'kullu-manali' && 'Kullu-Manali'}
              {route.id === 'great-himachal-loop' && 'The Great Loop'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* SVG Topographic & Route Canvas */}
        <div className="lg:col-span-8 relative aspect-[16/10] bg-[#0A100D] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center p-4">
          {/* Subtle Mountain Relief Grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Topographic Relief SVG */}
          <svg
            viewBox="0 0 640 460"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Mountain Contour Silhouettes */}
            <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
              {/* Shivalik foothills */}
              <path d="M 50,440 Q 150,380 250,410 T 450,420 T 600,430" />
              <path d="M 40,410 Q 170,350 290,380 T 480,380 T 610,390" />
              {/* Mid Himalayas / Shimla ridge */}
              <path d="M 120,350 Q 240,280 360,310 T 520,300 T 620,320" />
              <path d="M 160,300 Q 290,230 420,250 T 560,240 T 630,260" />
              {/* Pir Panjal & Great Himalayas */}
              <path d="M 210,220 Q 340,160 480,180 T 590,170 T 640,190" />
              <path d="M 260,150 Q 380,90 510,120 T 620,110" />
              {/* Zanskar & Spiti Plateau */}
              <path d="M 330,80 Q 440,40 550,60 T 630,50" />
            </g>

            {/* Geographical Regional Labels */}
            <text x="70" y="440" fill="#5E6962" fontSize="10" letterSpacing="2">SHIVALIK FOOTHILLS</text>
            <text x="440" y="320" fill="#5E6962" fontSize="10" letterSpacing="2">KINNAUR BASIN</text>
            <text x="450" y="80" fill="#5E6962" fontSize="10" letterSpacing="2">SPITI COLD DESERT</text>
            <text x="210" y="110" fill="#5E6962" fontSize="10" letterSpacing="2">LAHAUL VALLEY</text>

            {/* Inactive Route Ghosts */}
            {ENROUTE_ROUTES.map((r) => {
              if (r.id === selectedRouteId) return null;
              return (
                <path
                  key={r.id}
                  d={routePaths[r.id]}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                  className="cursor-pointer hover:stroke-white/30 transition-colors"
                  onClick={() => onSelectRoute(r.id)}
                />
              );
            })}

            {/* Active Highlighted Route with Glow */}
            <path
              d={routePaths[selectedRouteId]}
              stroke="#D5CEBF"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              className="drop-shadow-[0_0_10px_rgba(232,223,197,0.5)] animate-pulse"
              style={{ animationDuration: '4s' }}
            />

            {/* Route Stops as Interactive Pins */}
            {currentRoute.stops.map((stop, idx) => {
              // Interpolate pin positions roughly along path
              const progress = idx / Math.max(1, currentRoute.stops.length - 1);
              let px = 180;
              let py = 420;

              if (selectedRouteId === 'upper-shimla') {
                px = 180 + progress * 300;
                py = 420 - progress * 210;
              } else if (selectedRouteId === 'kullu-manali') {
                px = 180 + Math.sin(progress * Math.PI) * 120 + progress * 190;
                py = 420 - progress * 340;
              } else {
                // Great Loop circle
                const angle = progress * 2 * Math.PI - Math.PI / 2;
                px = 370 + Math.cos(angle) * 170;
                py = 240 + Math.sin(angle) * 150;
              }

              const isActive = activeStopIndex === idx;

              return (
                <g
                  key={stop.id}
                  className="cursor-pointer group"
                  onClick={() => setActiveStopIndex(idx)}
                >
                  <circle
                    cx={px}
                    cy={py}
                    r={isActive ? 6 : 4}
                    fill={isActive ? '#FAF8F2' : '#7B242C'}
                    stroke="#111A15"
                    strokeWidth="1.5"
                    className="transition-all"
                  />
                  {isActive && (
                    <circle
                      cx={px}
                      cy={py}
                      r="12"
                      stroke="#FAF8F2"
                      strokeWidth="1"
                      fill="none"
                      className="animate-ping"
                      style={{ animationDuration: '2s' }}
                    />
                  )}
                  {/* Stop label */}
                  <text
                    x={px + 8}
                    y={py + 3}
                    fill={isActive ? '#FAF8F2' : '#8E9A92'}
                    fontSize={isActive ? '11' : '9'}
                    fontWeight={isActive ? '600' : '400'}
                    className="transition-colors pointer-events-none"
                  >
                    {stop.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive instruction watermark */}
          <div className="absolute bottom-3 left-4 text-[10px] text-[#8E9A92] uppercase tracking-wider">
            Click pins to inspect altitude & road soul
          </div>
        </div>

        {/* Selected Stop Details Sidebar */}
        <div className="lg:col-span-4 bg-[#141E18] rounded-xl p-5 border border-white/5 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#A3B899] border-b border-white/5 pb-2">
            <span className="uppercase tracking-widest font-mono">
              Stop {activeStopIndex + 1} of {currentRoute.stops.length}
            </span>
            <div className="flex items-center gap-1 font-mono tabular-nums">
              <Mountain className="w-3.5 h-3.5" />
              <span>{currentRoute.stops[activeStopIndex]?.elevation}</span>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-[#8E9A92]">
              {currentRoute.stops[activeStopIndex]?.tagline}
            </div>
            <h3 className="text-xl font-serif text-[#FAF8F2] mt-0.5">
              {currentRoute.stops[activeStopIndex]?.name}
            </h3>
            <p className="text-xs text-[#D5CEBF] leading-relaxed mt-2">
              {currentRoute.stops[activeStopIndex]?.description}
            </p>
          </div>

          <div className="p-3 bg-black/20 rounded-lg border border-white/5 text-xs text-[#A3B899]">
            <span className="font-semibold text-white/90">Curated Moment: </span>
            {currentRoute.stops[activeStopIndex]?.highlight}
          </div>

          {/* Pahadi Note */}
          <div className="text-[11px] italic text-[#8E9A92] border-t border-white/5 pt-3">
            {currentRoute.pahadiDialogue.quote}
          </div>

          <button
            onClick={() => onExploreRoute(selectedRouteId)}
            className="w-full py-2.5 px-4 bg-[#FAF8F2] text-[#111A15] text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#E8DFC5] transition-colors flex items-center justify-center gap-2 group mt-2"
          >
            <span>Explore {currentRoute.name}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
