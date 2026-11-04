import React from 'react';
import { ActivePage } from '../types';
import { ArrowUpRight, Compass, Heart } from 'lucide-react';
import { HERO_IMAGE } from '../data/enrouteData';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onOpenPlanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPlanner }) => {
  return (
    <footer className="relative bg-[#0A100D] border-t border-white/10 text-[#FAF8F2] overflow-hidden">
      {/* 1. Final Road Disappearing Callout: "Maybe the road is calling." */}
      <div className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <img
          src={HERO_IMAGE}
          alt="Road disappearing into distant Himalayan mountains"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A100D] via-black/40 to-black/60" />

        <div className="relative z-10 text-center max-w-xl px-6 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#A3B899] font-mono">
            Safar Hi Manzil Hai
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif font-normal text-[#FAF8F2] tracking-wide drop-shadow-lg">
            Maybe the road is calling.
          </h2>
          <p className="text-xs sm:text-sm text-[#D5CEBF] font-serif italic drop-shadow">
            Leave the city behind. The mountain curves and straight people are waiting.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenPlanner}
              className="px-8 py-3.5 bg-[#FAF8F2] text-[#111A15] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#E8DFC5] transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-2"
            >
              <span>Take An Enroute</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-2xl font-serif tracking-[0.2em] text-[#FAF8F2]">
              ENROUTE
            </div>
            <p className="text-xs sm:text-sm text-[#D5CEBF] font-serif italic">
              “The Journey is the Destination.”
            </p>
            <p className="text-xs text-[#8E9A92] leading-relaxed max-w-sm">
              Enroute is a slow travel experience company curating the forgotten roads, valleys, secluded stays, and quiet moments between destinations across Himachal Pradesh.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#A3B899] font-mono pt-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Headquartered in Himachal & Chandigarh</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
              Journeys & Soul
            </div>
            <ul className="space-y-2 text-xs text-[#D5CEBF]">
              <li>
                <button onClick={() => onNavigate('routes')} className="hover:text-white transition-colors">
                  All Travel Belts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('route-upper-shimla')} className="hover:text-white transition-colors">
                  Route 01: Upper Shimla
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('route-kullu-manali')} className="hover:text-white transition-colors">
                  Route 02: Kullu-Manali Valleys
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('route-great-himachal-loop')} className="hover:text-white transition-colors">
                  Route 03: The Great Himachal Loop
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('experiences')} className="hover:text-white transition-colors">
                  Stays & Food Culture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('secrets')} className="hover:text-white transition-colors">
                  Enroute Secrets
                </button>
              </li>
            </ul>
          </div>

          {/* Social Channels (Editable placeholders) */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
              Dispatches
            </div>
            <ul className="space-y-2 text-xs text-[#D5CEBF]">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Instagram</span>
                  <span className="text-[10px] text-[#5E6962]">@enroute</span>
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>YouTube</span>
                  <span className="text-[10px] text-[#5E6962]">@enroute</span>
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Facebook</span>
                  <span className="text-[10px] text-[#5E6962]">@enroute</span>
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>X / Twitter</span>
                  <span className="text-[10px] text-[#5E6962]">@enroute</span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>LinkedIn</span>
                  <span className="text-[10px] text-[#5E6962]">Enroute</span>
                </a>
              </li>
              <li>
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-emerald-400">
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Care */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
              Care & Ethics
            </div>
            <ul className="space-y-2 text-xs text-[#D5CEBF]">
              <li>
                <button onClick={() => onNavigate('responsible-travel')} className="hover:text-white transition-colors text-left">
                  Responsible Travel
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <span className="text-[#8E9A92] cursor-not-allowed">Terms & Bookings</span>
              </li>
              <li>
                <span className="text-[#8E9A92] cursor-not-allowed">Himalayan Permitting</span>
              </li>
              <li>
                <span className="text-[#8E9A92] cursor-not-allowed">Privacy Notice</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E9A92]">
          <div>
            © {new Date().getFullYear()} ENROUTE Experiences Pvt. Ltd. All rights reserved.
          </div>
          <div className="italic font-serif text-[#D5CEBF]">
            “Mountains have curved roads, but straight people.”
          </div>
        </div>
      </div>
    </footer>
  );
};
