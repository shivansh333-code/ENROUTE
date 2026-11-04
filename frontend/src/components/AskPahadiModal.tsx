import React, { useState } from 'react';
import { X, Send, Sparkles, AlertCircle, Compass, Mountain } from 'lucide-react';
import { RouteId } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'pahadi';
  text: string;
  recommendedRoute?: RouteId;
  disclaimer?: string;
}

interface AskPahadiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoute: (id: RouteId) => void;
}

const PRESET_QUERIES = [
  'I have six days in October.',
  'I’ve already seen Manali. Where next?',
  'Take me somewhere quiet with no crowds.',
  'Travelling with my elderly parents.',
  'I want snow but not commercial resorts.',
  'I just want to drive on empty mountain roads.',
];

export const AskPahadiModal: React.FC<AskPahadiModalProps> = ({
  isOpen,
  onClose,
  onSelectRoute,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'pahadi',
      text: 'Namaste. Main Pahadi hoon. I don’t recommend tourist spots; I know where the mountains still breathe quietly. Tell me your dates, who is travelling, or what you wish to leave behind.',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let targetRoute: RouteId | undefined = undefined;
      const lower = queryText.toLowerCase();

      if (lower.includes('six days') || lower.includes('6 days') || lower.includes('october')) {
        reply = 'October in Upper Shimla is golden. The apple orchards around Kotgarh and Thanedar are harvest-ripe, and the central Himalayan snowline from Hatu Peak is crystal sharp. Skip the Shimla mall road and spend three nights in a cedar orchard homestay.';
        targetRoute = 'upper-shimla';
      } else if (lower.includes('already seen manali') || lower.includes('quiet') || lower.includes('crowd')) {
        reply = 'If Manali left you tired, don’t enter the town at all. Branch into Tirthan Valley first. The river has wild trout, wood-and-slate chalets, and zero horn-blowing. From there, cross through the Atal Tunnel to Sissu for massive glacial waterfalls.';
        targetRoute = 'kullu-manali';
      } else if (lower.includes('parent') || lower.includes('elderly') || lower.includes('family')) {
        reply = 'For parents, avoid sudden extreme altitude like Spiti. Choose Upper Shimla (Mashobra and Kotgarh). The roads are gentler, elevation stays under 2,400 meters, healthcare access is nearby, and forest walks are flat and deeply peaceful.';
        targetRoute = 'upper-shimla';
      } else if (lower.includes('snow') || lower.includes('drive') || lower.includes('empty')) {
        reply = 'Take The Great Himachal Loop. Over 1,200 km across Kinnaur and Spiti into Lahaul. The roads through Spiti canyon feel like driving on another planet. Keep 14 days minimum so your body acclimatizes gracefully.';
        targetRoute = 'great-himachal-loop';
      } else {
        reply = 'Mountain roads shouldn’t be rushed. Based on your thoughts, our slow travel belt through the valleys will give you space to breathe. Let’s look at Route 01 or 02.';
        targetRoute = 'upper-shimla';
      }

      const pahadiReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'pahadi',
        text: reply,
        recommendedRoute: targetRoute,
        disclaimer: 'Note: Real-time high-pass accessibility (Kunzum, Chanshal) and legal Green Tribunal permits require verification prior to departure.',
      };

      setMessages((prev) => [...prev, pahadiReply]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121B16] border border-white/10 rounded-2xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#16221C]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#24362C] border border-[#A3B899]/30 flex items-center justify-center text-white">
              <Mountain className="w-5 h-5 text-[#A3B899]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif text-[#FAF8F2]">Ask Pahadi</h3>
                <span className="text-[10px] text-[#A3B899] font-mono uppercase bg-[#24362C] px-2 py-0.5 rounded">
                  Mountain Insider
                </span>
              </div>
              <p className="text-[11px] text-[#8E9A92]">
                Curated travel guidance grounded in mountain geography
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#8E9A92] hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#FAF8F2] text-[#111A15] font-medium'
                    : 'bg-[#18261F] text-[#FAF8F2] border border-white/5'
                }`}
              >
                {m.text}

                {m.recommendedRoute && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-[#A3B899] font-mono">
                      Suggested Journey Match
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectRoute(m.recommendedRoute!);
                      }}
                      className="px-3 py-1 bg-[#FAF8F2] text-[#111A15] text-xs font-semibold rounded-md hover:bg-[#E8DFC5] transition-colors"
                    >
                      View Suggested Belt →
                    </button>
                  </div>
                )}
              </div>

              {m.disclaimer && (
                <div className="flex items-center gap-1.5 text-[10px] text-[#8E9A92] mt-1.5 max-w-[85%] px-1 font-mono">
                  <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{m.disclaimer}</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#8E9A92] italic font-serif">
              <Compass className="w-3.5 h-3.5 animate-spin" />
              <span>Pahadi is reflecting on the road...</span>
            </div>
          )}
        </div>

        {/* Presets */}
        <div className="p-3 bg-[#0E1612] border-t border-white/5 overflow-x-auto flex gap-2 no-scrollbar">
          {PRESET_QUERIES.map((preset) => (
            <button
              key={preset}
              onClick={() => handleSend(preset)}
              className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#D5CEBF] whitespace-nowrap shrink-0 border border-white/5 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputText);
          }}
          className="p-4 bg-[#141F19] border-t border-white/10 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Pahadi about roads, seasons, or quiet valleys..."
            className="flex-1 bg-[#0A110D] border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder-[#5E6962] focus:outline-none focus:border-[#A3B899]"
          />
          <button
            type="submit"
            className="p-2.5 rounded-full bg-[#FAF8F2] text-[#111A15] hover:bg-[#E8DFC5] transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
