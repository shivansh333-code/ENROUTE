import React, { useState } from 'react';
import { Play, Instagram, Youtube, Film, Camera, Heart, UploadCloud, Check } from 'lucide-react';
import { HERO_IMAGE, KULLU_MANALI_IMAGE, SPITI_LOOP_IMAGE, UPPER_SHIMLA_IMAGE, SECLUDED_STAY_IMAGE } from '../data/enrouteData';

interface ReelItem {
  id: string;
  category: string;
  title: string;
  location: string;
  duration: string;
  image: string;
  quote: string;
}

const REELS: ReelItem[] = [
  {
    id: 'r1',
    category: 'Road Diaries',
    title: 'Rain on the Kotgarh Windshield',
    location: 'Upper Shimla',
    duration: '0:42',
    image: UPPER_SHIMLA_IMAGE,
    quote: 'Wipers moving slowly, smell of wet cedar.',
  },
  {
    id: 'r2',
    category: 'Pahadi Says',
    title: 'Why we never pack 5 places in 1 day',
    location: 'Jalori Pass',
    duration: '0:58',
    image: KULLU_MANALI_IMAGE,
    quote: '“Itna kya bhaagna? Pahaad to yahin rahenge.”',
  },
  {
    id: 'r3',
    category: '60 Seconds From Himachal',
    title: 'The Baspa River at Dawn',
    location: 'Chitkul, Kinnaur',
    duration: '1:00',
    image: SECLUDED_STAY_IMAGE,
    quote: 'Only the glacial water and the first sunlight.',
  },
  {
    id: 'r4',
    category: 'Secret Stops',
    title: 'The unlisted mud monastery above Dhankar',
    location: 'Spiti Valley',
    duration: '0:48',
    image: SPITI_LOOP_IMAGE,
    quote: '300 meters above the canyon floor.',
  },
];

const FILMS = [
  {
    title: 'One Road. Many Himachals.',
    category: 'The Great Himachal Loop · Full Documentary',
    runtime: '28 Min',
    image: SPITI_LOOP_IMAGE,
    description: 'An unbroken journey from the colonial deodars of Shimla to the frozen Tibetan desert of Spiti and the waterfalls of Lahaul.',
  },
  {
    title: 'The Apple Country Byways',
    category: 'Route 01: Upper Shimla',
    runtime: '14 Min',
    image: UPPER_SHIMLA_IMAGE,
    description: 'A quiet exploration of centuries-old apple orchards in Thanedar, Kotgarh, and the forgotten trout streams of Pabbar Valley.',
  },
  {
    title: 'Rivers Before Mountains',
    category: 'Route 02: Kullu & Tirthan',
    runtime: '18 Min',
    image: KULLU_MANALI_IMAGE,
    description: 'Following the emerald waters of Tirthan into ancient Naggar timber craft and through the Atal Tunnel.',
  },
];

export const SocialFilmFeed: React.FC = () => {
  const [activeFilmModal, setActiveFilmModal] = useState<string | null>(null);
  const [showUgcModal, setShowUgcModal] = useState<boolean>(false);
  const [ugcSubmitted, setUgcSubmitted] = useState<boolean>(false);

  return (
    <div className="space-y-20 py-8">
      {/* 1. On The Road (Instagram Editorial Wall) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A3B899] font-mono">
              <Instagram className="w-3.5 h-3.5" />
              <span>@enroute · Instagram Stories & Diaries</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#FAF8F2] mt-1">
              On The Road
            </h2>
            <p className="text-xs text-[#8E9A92] mt-0.5">
              Unfiltered moments photographed and filmed from our moving cars.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FAF8F2] hover:text-[#A3B899] transition-colors font-mono"
          >
            <span>Follow The Journey (@enroute)</span>
            <span>→</span>
          </a>
        </div>

        {/* Vertical Reel Wall */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {REELS.map((reel) => (
            <div
              key={reel.id}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#16221C] border border-white/10 flex flex-col justify-between p-4 transition-all duration-300 hover:border-white/30 hover:scale-[1.02] shadow-xl"
            >
              <img
                src={reel.image}
                alt={reel.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

              <div className="relative z-10 flex items-center justify-between text-[11px] text-[#FAF8F2]">
                <span className="font-mono text-[#A3B899] uppercase tracking-wider">{reel.category}</span>
                <span className="font-mono text-[10px] bg-black/50 px-2 py-0.5 rounded-full">{reel.duration}</span>
              </div>

              <div className="relative z-10 space-y-1">
                <div className="text-[10px] text-[#D5CEBF] font-mono">{reel.location}</div>
                <h3 className="text-sm font-serif text-[#FAF8F2] leading-snug">
                  {reel.title}
                </h3>
                <p className="text-[11px] italic text-[#8E9A92] line-clamp-2">
                  “{reel.quote}”
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Enroute Films (YouTube Section) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A3B899] font-mono">
              <Youtube className="w-3.5 h-3.5 text-rose-400" />
              <span>Cinema & Long-Form Travel Documents</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#FAF8F2] mt-1">
              Enroute Films
            </h2>
            <p className="text-xs text-[#8E9A92] mt-0.5">
              Shot on vintage lenses across thousands of Himalayan kilometers.
            </p>
          </div>

          <button
            onClick={() => setShowUgcModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-xs text-[#FAF8F2] rounded-full border border-white/10 transition-colors uppercase tracking-widest font-mono"
          >
            <Camera className="w-3.5 h-3.5 text-[#A3B899]" />
            <span>Share Your Road (#MyEnroute)</span>
          </button>
        </div>

        {/* 16:9 Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FILMS.map((film) => (
            <div
              key={film.title}
              className="group rounded-2xl bg-[#141E18] border border-white/10 overflow-hidden space-y-3 hover:border-white/25 transition-all shadow-xl"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={film.image}
                  alt={film.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F2]/90 text-[#111A15] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur rounded text-[10px] text-white font-mono">
                  {film.runtime}
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <div className="text-[10px] uppercase tracking-widest text-[#A3B899] font-mono">
                  {film.category}
                </div>
                <h3 className="text-lg font-serif text-[#FAF8F2]">
                  {film.title}
                </h3>
                <p className="text-xs text-[#8E9A92] leading-relaxed line-clamp-2">
                  {film.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UGC Modal */}
      {showUgcModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121B16] border border-white/10 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <h3 className="text-xl font-serif text-[#FAF8F2]">#MyEnroute</h3>
                <p className="text-xs text-[#8E9A92]">Submit your road stories, photos, and quiet moments</p>
              </div>
              <button onClick={() => setShowUgcModal(false)} className="text-[#8E9A92] hover:text-white">✕</button>
            </div>

            {!ugcSubmitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setUgcSubmitted(true); }} className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] text-[#D5CEBF] uppercase block mb-1">Your Name & Instagram handle</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen (@ananya_travels)"
                    className="w-full bg-[#0A110D] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#D5CEBF] uppercase block mb-1">Himalayan Location or Road</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pabbar river bank near Hatkoti"
                    className="w-full bg-[#0A110D] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#D5CEBF] uppercase block mb-1">Your Road Moment / Story</label>
                  <textarea
                    rows={3}
                    placeholder="What happened when you slowed down?"
                    className="w-full bg-[#0A110D] border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>
                <div className="p-4 border border-dashed border-white/20 rounded-xl text-center space-y-1">
                  <UploadCloud className="w-5 h-5 mx-auto text-[#A3B899]" />
                  <p className="text-[11px] text-[#D5CEBF]">Upload photo or film clips (up to 50MB)</p>
                  <p className="text-[10px] text-[#5E6962]">Raw, unedited, candid moments welcomed</p>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#FAF8F2] text-[#111A15] font-semibold uppercase tracking-widest rounded-full hover:bg-[#E8DFC5] transition-colors"
                >
                  Submit To Enroute Curators
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <Check className="w-8 h-8 mx-auto text-[#A3B899]" />
                <h4 className="text-lg font-serif text-white">Thank you for sharing the road.</h4>
                <p className="text-xs text-[#8E9A92]">We celebrate unhurried travellers. Selected moments are featured in our print dispatch and digital reels.</p>
                <button
                  onClick={() => { setShowUgcModal(false); setUgcSubmitted(false); }}
                  className="px-4 py-2 bg-white/10 rounded-full text-xs text-white"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
