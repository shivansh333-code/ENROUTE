import React, { useState } from 'react';
import { Mountain, Compass, Wind, Thermometer, Volume2 } from 'lucide-react';
import { HERO_IMAGE, KULLU_MANALI_IMAGE, SPITI_LOOP_IMAGE, UPPER_SHIMLA_IMAGE } from '../data/enrouteData';

interface JourneyStage {
  progress: number;
  location: string;
  altitude: string;
  temperature: string;
  feeling: string;
  sensoryDescription: string;
  image: string;
  colorGrade: string; // CSS overlay style
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    progress: 0,
    location: 'Chandigarh Plains (06:00 AM)',
    altitude: '321 m',
    temperature: '19°C',
    feeling: 'Urban Silence · First Ignition',
    sensoryDescription: 'Empty avenues of Sector 17. The smell of early morning diesel and wet asphalt. Coffee in a stainless steel flask. The horizon still flat, but cool Shivalik air begins cutting through the car vent.',
    image: HERO_IMAGE,
    colorGrade: 'rgba(15, 23, 42, 0.4)',
  },
  {
    progress: 25,
    location: 'Shivalik Ascent & Timber Curves',
    altitude: '1,420 m',
    temperature: '15°C',
    feeling: 'Windows Down · The First Pine Fragrance',
    sensoryDescription: 'The road starts snaking. Brick houses disappear, replaced by steep terraced slopes. The air shifts from humid plain to sharp mountain chill. You turn off the car AC and roll down every window.',
    image: UPPER_SHIMLA_IMAGE,
    colorGrade: 'rgba(21, 34, 27, 0.45)',
  },
  {
    progress: 50,
    location: 'Beas & Tirthan River Valley',
    altitude: '1,890 m',
    temperature: '12°C',
    feeling: 'Glacial Roar · River Stone Shadows',
    sensoryDescription: 'The road drops beside turquoise rushing water. Mist clings to colossal deodar branches 100 feet tall. Steaming roadside chai stops in cracked glass tumblers. No hurry to be anywhere.',
    image: KULLU_MANALI_IMAGE,
    colorGrade: 'rgba(13, 31, 38, 0.45)',
  },
  {
    progress: 75,
    location: 'Deodar Canopy & Solang Snowline',
    altitude: '2,680 m',
    temperature: '7°C',
    feeling: 'Dense Cedar Silence · Granite Walls',
    sensoryDescription: 'Massive alpine walls block the sun. The forest is quiet except for the crunch of gravel beneath tires. Slate-roofed wooden villages cling to cliff ledges above the tree line.',
    image: HERO_IMAGE,
    colorGrade: 'rgba(25, 20, 30, 0.45)',
  },
  {
    progress: 100,
    location: 'Trans-Himalayan Alpine Crest (Lahaul / Spiti)',
    altitude: '3,850 m',
    temperature: '2°C',
    feeling: 'Vast Sky · The Horizon Has No End',
    sensoryDescription: 'The trees fall behind completely. Naked ochre and snow peaks stretch for hundreds of miles. Wind snaps prayer flags on a mountain cairn. You turn off the engine and listen to complete silence.',
    image: SPITI_LOOP_IMAGE,
    colorGrade: 'rgba(40, 25, 15, 0.45)',
  },
];

export const JourneyScrubber: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(35);

  // Find the closest or interpolated stage
  const currentStageIndex = Math.min(
    JOURNEY_STAGES.length - 1,
    Math.floor((sliderValue / 100) * (JOURNEY_STAGES.length - 1))
  );
  const currentStage = JOURNEY_STAGES[currentStageIndex];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B120E]">
      {/* Background Cinematic Visual that transforms with scrubber */}
      <div className="relative h-[480px] sm:h-[540px] w-full overflow-hidden transition-all duration-700">
        <img
          src={currentStage.image}
          alt={currentStage.location}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-700 transform scale-105"
        />

        {/* Dynamic Atmospheric Scrim & Color Grading */}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{ backgroundColor: currentStage.colorGrade }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B120E] via-transparent to-black/60" />

        {/* Top Floating Sensor Data */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs text-[#FAF8F2]/90 z-10">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <Compass className="w-3.5 h-3.5 text-[#A3B899]" />
            <span className="font-mono">{currentStage.location}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-mono text-[11px]">
              <Mountain className="w-3 h-3 text-[#E8DFC5]" />
              <span>{currentStage.altitude}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-mono text-[11px]">
              <Thermometer className="w-3 h-3 text-[#A3B899]" />
              <span>{currentStage.temperature}</span>
            </div>
          </div>
        </div>

        {/* Central Road Mood Statement */}
        <div className="absolute inset-x-6 bottom-28 md:bottom-24 max-w-2xl mx-auto text-center space-y-2 z-10">
          <div className="text-xs uppercase tracking-[0.25em] text-[#A3B899] font-medium">
            {currentStage.feeling}
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif text-[#FAF8F2] leading-tight drop-shadow-md">
            “What does the road feel like?”
          </h3>
          <p className="text-xs sm:text-sm text-[#D5CEBF] leading-relaxed max-w-xl mx-auto drop-shadow">
            {currentStage.sensoryDescription}
          </p>
        </div>

        {/* The Scrubber Bar at Bottom */}
        <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-[11px] text-[#8E9A92] uppercase tracking-wider mb-2 font-mono">
            <span>Chandigarh Plains</span>
            <span className="text-[#A3B899] font-sans font-medium">Drag to travel forward in elevation</span>
            <span>Himalayan High Crest</span>
          </div>

          {/* Range Slider */}
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-ew-resize accent-[#FAF8F2] focus:outline-none"
              aria-label="Journey Scrubber Timeline"
            />
          </div>

          {/* Waypoints */}
          <div className="flex justify-between items-center text-[10px] text-[#FAF8F2]/60 mt-2 font-mono">
            <button onClick={() => setSliderValue(0)} className="hover:text-white">0% Urban</button>
            <button onClick={() => setSliderValue(25)} className="hover:text-white">25% Foothills</button>
            <button onClick={() => setSliderValue(50)} className="hover:text-white">50% River Tirthan</button>
            <button onClick={() => setSliderValue(75)} className="hover:text-white">75% Deodars</button>
            <button onClick={() => setSliderValue(100)} className="hover:text-white">100% Alpine</button>
          </div>
        </div>
      </div>
    </div>
  );
};
