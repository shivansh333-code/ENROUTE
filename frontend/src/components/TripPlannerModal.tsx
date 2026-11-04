import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Send } from 'lucide-react';
import { RouteId, PaceMode } from '../types';

interface TripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoute?: RouteId;
}

export const TripPlannerModal: React.FC<TripPlannerModalProps> = ({
  isOpen,
  onClose,
  initialRoute,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedRoute, setSelectedRoute] = useState<RouteId>(initialRoute || 'upper-shimla');
  const [duration, setDuration] = useState<string>('5–7 Nights');
  const [travelParty, setTravelParty] = useState<string>('Solo / Quiet Escape');
  const [season, setSeason] = useState<string>('Autumn Harvest (Oct–Nov)');
  const [pace, setPace] = useState<PaceMode>('flow');
  const [priority, setPriority] = useState<string>('Silence & Empty Valleys');
  const [stayPref, setStayPref] = useState<string>('Inside an Apple Orchard');
  const [notes, setNotes] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalSteps = 8;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121B16] border border-white/10 rounded-2xl w-full max-w-xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 min-h-[500px]">
        {/* Top Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#16221C]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
              Step {step} of {totalSteps}
            </span>
            <span className="text-white/20">/</span>
            <span className="text-xs text-[#FAF8F2] font-serif">Curate Your Enroute</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#8E9A92] hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body: One Question Per Screen */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
          {!isSubmitted ? (
            <>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#A3B899]">Question 01</div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2]">
                    Where do you feel like disappearing to?
                  </h3>
                  <p className="text-xs text-[#8E9A92]">
                    Choose the mountain travel belt that calls you.
                  </p>
                  <div className="space-y-2.5 pt-2">
                    {[
                      { id: 'upper-shimla', label: 'Route 01 · The Upper Shimla Route', desc: 'Misty orchards, deodar forests, Pabbar trout streams, Chanshal' },
                      { id: 'kullu-manali', label: 'Route 02 · The Kullu-Manali Route', desc: 'Tirthan river, ancient Naggar castle, Atal Tunnel, Sissu snow valleys' },
                      { id: 'great-himachal-loop', label: 'Route 03 · The Great Himachal Loop', desc: 'Flagship circuit: Kinnaur, Spiti moonscapes, Kunzum pass, Lahaul' },
                    ].map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRoute(r.id as RouteId)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          selectedRoute === r.id
                            ? 'bg-white/10 border-[#FAF8F2] shadow-md'
                            : 'bg-white/5 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-serif text-white">{r.label}</span>
                          {selectedRoute === r.id && <Check className="w-4 h-4 text-[#A3B899]" />}
                        </div>
                        <p className="text-xs text-[#8E9A92] mt-1">{r.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#A3B899]">Question 02</div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2]">
                    How many days do you have?
                  </h3>
                  <p className="text-xs text-[#8E9A92]">
                    In slow travel, more time means deeper pauses rather than more stops.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {['3–4 Nights (Short Break)', '5–7 Nights (Classic)', '8–12 Nights (Deep Journey)', '14–21 Days (Full Loop)'].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`p-4 rounded-xl border text-left text-xs transition-all ${
                          duration === d
                            ? 'bg-white/10 border-white text-white font-semibold'
                            : 'bg-white/5 border-white/5 text-[#D5CEBF] hover:border-white/20'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#A3B899]">Question 03</div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2]">
                    Who is travelling?
                  </h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {['Solo Traveller', 'Couple / Partners', 'Family with Children', 'Elderly Parents / Multi-gen', 'Close Friends (2-4 people)'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setTravelParty(p)}
                        className={`p-4 rounded-xl border text-left text-xs transition-all ${
                          travelParty === p
                            ? 'bg-white/10 border-white text-white font-semibold'
                            : 'bg-white/5 border-white/5 text-[#D5CEBF] hover:border-white/20'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#A3B899]">Question 04</div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2]">
                    When do you wish to take the road?
                  </h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      'Spring Apple Blossom (April–May)',
                      'Monsoon Mist & Rivers (July–Aug)',
                      'Autumn Golden Harvest (Sept–Nov)',
                      'Winter Snow & Fireplace (Dec–Feb)',
                      'Flexible / Best Seasonal Timing'
                    ].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSeason(s)}
                        className={`p-4 rounded-xl border text-left text-xs transition-all ${
                          season === s
                            ? 'bg-white/10 border-white text-white font-semibold'
                            : 'bg-white/5 border-white/5 text-[#D5CEBF] hover:border-white/20'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#A3B899]">Question 05</div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2]">
                    What matters most on this road?
                  </h3>
                  <div className="space-y-2.5 pt-2">
                    {[
                      'Silence & empty valleys (no commercial crowds)',
                      'Scenic unpaved forest trails & hidden viewpoints',
                      'Local food, village kitchens, and authentic conversations',
                      'Quiet luxury, wood fireplaces, and panoramic mountain balconies'
                    ].map((pr) => (
                      <button
                        key={pr}
                        onClick={() => setPriority(pr)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all ${
                          priority === pr
                            ? 'bg-white/10 border-white text-white font-semibold'
                            : 'bg-white/5 border-white/5 text-[#D5CEBF] hover:border-white/20'
                        }`}
                      >
                        {pr}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#A3B899]">Question 06</div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2]">
                    Where do you like to wake up?
                  </h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      'Inside An Apple Orchard',
                      'Beside A Rushing River',
                      'Old Kath-Kuni Homestead',
                      'High Forest Hideaway',
                      'Secluded Stone Chalet',
                      'Nothing Around For Miles'
                    ].map((st) => (
                      <button
                        key={st}
                        onClick={() => setStayPref(st)}
                        className={`p-4 rounded-xl border text-left text-xs transition-all ${
                          stayPref === st
                            ? 'bg-white/10 border-white text-white font-semibold'
                            : 'bg-white/5 border-white/5 text-[#D5CEBF] hover:border-white/20'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#A3B899]">Question 07</div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2]">
                    Anything we should know?
                  </h3>
                  <p className="text-xs text-[#8E9A92]">
                    Dietary preferences, pace limits, vehicle preferences, or moments you are celebrating.
                  </p>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Celebrating an anniversary; prefer slower mountain drivers; love local vegetarian cooking..."
                    className="w-full bg-[#0B130F] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#5E6962] focus:outline-none focus:border-[#A3B899]"
                  />
                </div>
              )}

              {step === 8 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#A3B899]">Final Step</div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F2]">
                    We’ll take it from here.
                  </h3>
                  <p className="text-xs text-[#8E9A92]">
                    Our mountain route curators will assemble your unhurried journey and connect via WhatsApp or email.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#D5CEBF] block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Vikramaditya Sharma"
                        className="w-full bg-[#0B130F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#A3B899]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#D5CEBF] block mb-1">Email or WhatsApp Number</label>
                      <input
                        type="text"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. vikram@example.com or +91 98..."
                        className="w-full bg-[#0B130F] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#A3B899]"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#0C1510] rounded-xl border border-white/5 text-[11px] text-[#A3B899] font-mono">
                    Summary: {selectedRoute} · {duration} · {travelParty} · {season}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FAF8F2] text-[#111A15] text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-[#E8DFC5] transition-colors flex items-center justify-center gap-2 shadow-xl"
                  >
                    <span>Plan My Enroute</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* Navigation Controls */}
              {step < 8 && (
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      onClick={handlePrev}
                      className="flex items-center gap-1.5 text-xs text-[#8E9A92] hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>
                  ) : <div />}

                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-[#FAF8F2] text-[#111A15] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#E8DFC5] transition-all flex items-center gap-1.5 shadow"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#24362C] border border-[#A3B899]/40 flex items-center justify-center mx-auto text-[#A3B899]">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-serif text-[#FAF8F2]">The road is waiting.</h3>
              <p className="text-xs text-[#D5CEBF] max-w-sm mx-auto leading-relaxed">
                Thank you, {contactName || 'traveller'}. We have received your journey preferences. An Enroute road curator will assemble your tailored itinerary without any generic tourist packages.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#FAF8F2] text-[#111A15] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#E8DFC5] transition-colors"
                >
                  Return to Exploration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
