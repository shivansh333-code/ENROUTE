
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

import { ActivePage, RouteId, PaceMode } from './types';

import { OpeningSequence } from './components/OpeningSequence';
import { Navigation } from './components/Navigation';
import { InteractiveMap } from './components/InteractiveMap';
import { JourneyScrubber } from './components/JourneyScrubber';
import { MoodPaceSelector } from './components/MoodPaceSelector';
import { SeasonalIntelligence } from './components/SeasonalIntelligence';
import { SecretsShowcase } from './components/SecretsShowcase';
import { WhyEnroute } from './components/WhyEnroute';
import { QuietSection } from './components/QuietSection';
import { SocialFilmFeed } from './components/SocialFilmFeed';
import { Footer } from './components/Footer';
import { TripPlannerModal } from './components/TripPlannerModal';
import { AskPahadiModal } from './components/AskPahadiModal';

import { RouteDetailView } from './views/RouteDetailView';
import { ExperiencesView } from './views/ExperiencesView';
import { AboutView } from './views/AboutView';

import { ENROUTE_ROUTES, HERO_IMAGE } from './data/enrouteData';

import {
  ArrowRight,
  Compass,
  Sparkles,
} from 'lucide-react';

function HomePage() {

  const { user, loading } = useAuth();

  const [showOpening, setShowOpening] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<ActivePage>('home');

  const [selectedRouteId, setSelectedRouteId] = useState<RouteId>('upper-shimla');

  const [currentPace, setCurrentPace] = useState<PaceMode>('flow');

  const [isPlannerOpen, setIsPlannerOpen] = useState<boolean>(false);

  const [plannerRoutePref, setPlannerRoutePref] = useState<RouteId>('upper-shimla');

  const [isPahadiModalOpen, setIsPahadiModalOpen] = useState<boolean>(false);


  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);


  // Open Trip Planner
  const handleOpenPlanner = (routeId?: RouteId) => {

    if (routeId) {
      setPlannerRoutePref(routeId);
    }

    setIsPlannerOpen(true);
  };


  // Handle route selection
  const handleRouteSelect = (id: RouteId) => {

    setSelectedRouteId(id);

    if (id === 'upper-shimla') {
      setCurrentPage('route-upper-shimla');
    }

    if (id === 'kullu-manali') {
      setCurrentPage('route-kullu-manali');
    }

    if (id === 'great-himachal-loop') {
      setCurrentPage('route-great-himachal-loop');
    }
  };


  return (

    <div
      className={`min-h-screen bg-[#111A15] text-[#FAF8F2] selection:bg-[#7B242C] selection:text-white transition-opacity duration-1000 ${
        currentPace === 'disappear' ? 'duration-1000' : 'duration-500'
      }`}
    >

      {/* 1. Opening Animation */}

      {!loading && !user && showOpening && (
        <OpeningSequence
          onComplete={() => setShowOpening(false)}
        />
      )}


      {/* 2. Navigation */}

      <Navigation
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        onOpenPlanner={() => handleOpenPlanner()}
      />


      {/* Floating Ask Pahadi Button */}

      <div className="fixed bottom-6 right-6 z-30">

        <button
          onClick={() => setIsPahadiModalOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-[#1B2921]/90 backdrop-blur-md text-[#FAF8F2] rounded-full border border-white/20 hover:border-white/40 shadow-2xl transition-all hover:scale-105 group"
        >

          <div className="w-6 h-6 rounded-full bg-[#FAF8F2] text-[#111A15] flex items-center justify-center font-bold text-xs">
            P
          </div>

          <div className="text-left hidden sm:block">

            <div className="text-[11px] font-semibold leading-tight flex items-center gap-1">
              <span>Ask Pahadi</span>
              <Sparkles className="w-2.5 h-2.5 text-[#A3B899]" />
            </div>

            <div className="text-[9px] text-[#8E9A92]">
              Mountain Guide
            </div>

          </div>

        </button>

      </div>


      {/* 3. Main Views */}

      <main className="pt-24 px-4 sm:px-8 max-w-7xl mx-auto">


        {/* HOME PAGE */}

        {currentPage === 'home' && (

          <div className="space-y-24 pb-16">


            {/* HERO SECTION */}

            <section className="relative w-full h-[620px] sm:h-[720px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-end p-6 sm:p-14">

              <img
                src={HERO_IMAGE}
                alt="Winding road through misty Himalayan mountains photographed from windshield"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8] contrast-105 scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#111A15] via-black/35 to-black/50" />


              <div className="relative z-10 max-w-3xl space-y-4">

                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#A3B899] font-mono">

                  <Compass
                    className="w-3.5 h-3.5 animate-spin"
                    style={{ animationDuration: '30s' }}
                  />

                  <span>
                    Himachal Pradesh · Slow Travel Curations
                  </span>

                </div>


                <div className="space-y-1">

                  <h2 className="text-xs uppercase tracking-[0.25em] text-[#D5CEBF] font-mono">
                    Don't Just Go.
                  </h2>

                  <h1 className="text-4xl sm:text-7xl font-serif font-normal text-[#FAF8F2] tracking-wide leading-none">
                    GO ENROUTE.
                  </h1>

                </div>


                <p className="text-sm sm:text-lg text-[#D5CEBF] font-serif italic max-w-xl leading-relaxed">
                  “A journey should be experienced, not completed. The destination is only one chapter. The road is the story.”
                </p>


                <div className="flex flex-wrap items-center gap-4 pt-3">

                  <button
                    onClick={() => {
                      const el = document.getElementById('three-worlds');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 bg-[#FAF8F2] text-[#111A15] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#E8DFC5] transition-all transform hover:scale-105 shadow-xl flex items-center gap-2"
                  >

                    <span>Choose Your Road</span>

                    <ArrowRight className="w-3.5 h-3.5" />

                  </button>


                  <button
                    onClick={() => setIsPahadiModalOpen(true)}
                    className="px-5 py-3.5 bg-black/40 backdrop-blur-md text-[#FAF8F2] text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-black/60 transition-colors border border-white/10"
                  >
                    Ask Pahadi Advice
                  </button>

                </div>

              </div>


              <div className="absolute bottom-6 right-6 text-right hidden md:block text-[11px] font-mono text-[#8E9A92]">

                <span>
                  Windshield Series · 35mm Analogue Tone
                </span>

              </div>

            </section>



            {/* THREE ENROUTE WORLDS */}

            <section
              id="three-worlds"
              className="space-y-8 scroll-mt-28"
            >

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-4">

                <div>

                  <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
                    Three Travel Belts · Not Mere Packages
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-serif text-[#FAF8F2] mt-1">
                    Three Enroute Worlds
                  </h2>

                </div>


                <p className="text-xs text-[#8E9A92] max-w-sm">
                  Each route represents an entire interconnected ecosystem of valleys, forgotten tracks, and seasonal passes.
                </p>

              </div>



              {/* Route Cards */}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {ENROUTE_ROUTES.map((route) => (

                  <div
                    key={route.id}
                    onClick={() => handleRouteSelect(route.id)}
                    className="group cursor-pointer rounded-3xl overflow-hidden bg-[#141E18] border border-white/10 hover:border-white/30 transition-all duration-500 shadow-xl flex flex-col justify-between h-[480px] p-6 relative"
                  >

                    <img
                      src={route.heroImage}
                      alt={route.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.75]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />


                    <div className="relative z-10 flex items-center justify-between text-xs text-[#E8DFC5] font-mono">

                      <span>
                        Route {route.number}
                      </span>

                      <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#A3B899] border border-white/10">
                        {route.itineraries[0]?.duration} – {route.itineraries[route.itineraries.length - 1]?.duration}
                      </span>

                    </div>


                    <div className="relative z-10 space-y-2">

                      <div className="text-xs text-[#A3B899] uppercase tracking-wider font-mono">
                        {route.tagline}
                      </div>

                      <h3 className="text-2xl font-serif text-[#FAF8F2] group-hover:text-[#E8DFC5] transition-colors leading-tight">
                        {route.name}
                      </h3>

                      <p className="text-xs text-[#D5CEBF] font-serif italic line-clamp-2">
                        {route.span}
                      </p>


                      <div className="pt-3 flex items-center justify-between text-xs text-[#FAF8F2] font-semibold border-t border-white/10">

                        <span>
                          Explore Belt & Itineraries
                        </span>

                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </section>



            {/* INTERACTIVE MAP */}

            <section className="space-y-4">

              <InteractiveMap
                selectedRouteId={selectedRouteId}
                onSelectRoute={(id) => setSelectedRouteId(id)}
                onExploreRoute={(id) => handleRouteSelect(id)}
              />

            </section>



            {/* JOURNEY SCRUBBER */}

            <section className="space-y-4">

              <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
                Interactive Sensory Timeline
              </div>

              <JourneyScrubber />

            </section>



            {/* MOOD AND PACE SELECTOR */}

            <section>

              <MoodPaceSelector
                onRecommendationSelect={(id) => handleRouteSelect(id)}
                onPaceChange={(p) => setCurrentPace(p)}
                currentPace={currentPace}
              />

            </section>



            {/* SEASONAL INTELLIGENCE */}

            <section>

              <SeasonalIntelligence />

            </section>



            {/* ENROUTE SECRETS */}

            <section className="space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-4">

                <div>

                  <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
                    Insider Knowledge · Protected Detours
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-serif text-[#FAF8F2] mt-1">
                    Enroute Secrets
                  </h2>

                </div>


                <p className="text-xs text-[#8E9A92] max-w-sm">
                  Curiosity teasers of forgotten turns, family kitchens, and hours when valleys belong only to silence.
                </p>

              </div>

              <SecretsShowcase />

            </section>



            {/* WHY ENROUTE */}

            <section>

              <WhyEnroute />

            </section>



            {/* QUIET SECTION */}

            <section>

              <QuietSection />

            </section>



            {/* SOCIAL FILM FEED */}

            <section>

              <SocialFilmFeed />

            </section>

          </div>

        )}



        {/* ROUTE DETAIL: UPPER SHIMLA */}

        {currentPage === 'route-upper-shimla' && (

          <RouteDetailView
            routeId="upper-shimla"
            onOpenPlannerForRoute={(id) => handleOpenPlanner(id)}
            onSwitchRoute={(id) => handleRouteSelect(id)}
          />

        )}



        {/* ROUTE DETAIL: KULLU MANALI */}

        {currentPage === 'route-kullu-manali' && (

          <RouteDetailView
            routeId="kullu-manali"
            onOpenPlannerForRoute={(id) => handleOpenPlanner(id)}
            onSwitchRoute={(id) => handleRouteSelect(id)}
          />

        )}



        {/* ROUTE DETAIL: GREAT HIMACHAL LOOP */}

        {currentPage === 'route-great-himachal-loop' && (

          <RouteDetailView
            routeId="great-himachal-loop"
            onOpenPlannerForRoute={(id) => handleOpenPlanner(id)}
            onSwitchRoute={(id) => handleRouteSelect(id)}
          />

        )}



        {/* ALL ROUTES DIRECTORY */}

        {currentPage === 'routes' && (

          <div className="space-y-12 pb-20">

            <div className="border-b border-white/5 pb-6">

              <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
                The Three Corridors
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif text-[#FAF8F2] mt-1">
                Curated Himalayan Travel Belts
              </h1>

              <p className="text-xs text-[#8E9A92] mt-1">
                Select a belt to explore detailed itineraries, deep branches, stays, and seasonal access.
              </p>

            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {ENROUTE_ROUTES.map((route) => (

                <div
                  key={route.id}
                  onClick={() => handleRouteSelect(route.id)}
                  className="group cursor-pointer rounded-3xl overflow-hidden bg-[#141E18] border border-white/10 hover:border-white/30 transition-all duration-500 shadow-xl flex flex-col justify-between h-[480px] p-6 relative"
                >

                  <img
                    src={route.heroImage}
                    alt={route.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.75]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />


                  <div className="relative z-10 flex items-center justify-between text-xs text-[#E8DFC5] font-mono">

                    <span>
                      Route {route.number}
                    </span>

                    <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#A3B899] border border-white/10">
                      {route.itineraries[0]?.duration} – {route.itineraries[route.itineraries.length - 1]?.duration}
                    </span>

                  </div>


                  <div className="relative z-10 space-y-2">

                    <div className="text-xs text-[#A3B899] uppercase tracking-wider font-mono">
                      {route.tagline}
                    </div>

                    <h3 className="text-2xl font-serif text-[#FAF8F2] group-hover:text-[#E8DFC5] transition-colors leading-tight">
                      {route.name}
                    </h3>

                    <p className="text-xs text-[#D5CEBF] font-serif italic line-clamp-2">
                      {route.span}
                    </p>


                    <div className="pt-3 flex items-center justify-between text-xs text-[#FAF8F2] font-semibold border-t border-white/10">

                      <span>
                        Explore Belt & Itineraries
                      </span>

                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />

                    </div>

                  </div>

                </div>

              ))}

            </div>


            <InteractiveMap
              selectedRouteId={selectedRouteId}
              onSelectRoute={(id) => setSelectedRouteId(id)}
              onExploreRoute={(id) => handleRouteSelect(id)}
            />

          </div>

        )}



        {/* EXPERIENCES */}

        {currentPage === 'experiences' && (

          <ExperiencesView
            onOpenPlanner={() => handleOpenPlanner()}
          />

        )}



        {/* SECRETS DIRECTORY */}

        {currentPage === 'secrets' && (

          <div className="space-y-10 pb-20">

            <div className="border-b border-white/5 pb-4">

              <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
                Unhurried Discoveries
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif text-[#FAF8F2] mt-1">
                Enroute Secrets
              </h1>

              <p className="text-xs text-[#8E9A92] mt-1">
                Hidden turns, woodfire siddu hearths, and silent viewpoints we share only with slow travellers.
              </p>

            </div>

            <SecretsShowcase />

          </div>

        )}



        {/* STORIES AND PAHADI */}

        {currentPage === 'stories' && (

          <div className="space-y-12 pb-20">

            <div className="border-b border-white/5 pb-4">

              <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
                Mountain People & Perspectives
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif text-[#FAF8F2] mt-1">
                Pahadi The Wanderer
              </h1>

              <p className="text-xs text-[#8E9A92] mt-1">
                He is not a mascot. He is the quiet person who knows the road because his grandfather walked it.
              </p>

            </div>

            <WhyEnroute />

          </div>

        )}



        {/* ENROUTE FILMS */}

        {currentPage === 'films' && (

          <div className="space-y-12 pb-20">

            <div className="border-b border-white/5 pb-4">

              <div className="text-xs uppercase tracking-widest text-[#A3B899] font-mono">
                Documentary & Visual Media
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif text-[#FAF8F2] mt-1">
                Enroute Films & Reels
              </h1>

              <p className="text-xs text-[#8E9A92] mt-1">
                Captured on the road without artificial studio staging.
              </p>

            </div>

            <SocialFilmFeed />

          </div>

        )}



        {/* ABOUT AND RESPONSIBLE TRAVEL */}

        {(currentPage === 'about' || currentPage === 'responsible-travel') && (

          <AboutView
            onOpenPlanner={() => handleOpenPlanner()}
          />

        )}

      </main>



      {/* FOOTER */}

      <Footer
        onNavigate={(page) => setCurrentPage(page)}
        onOpenPlanner={() => handleOpenPlanner()}
      />



      {/* TRIP PLANNER MODAL */}

      <TripPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        initialRoute={plannerRoutePref}
      />



      {/* ASK PAHADI MODAL */}

      <AskPahadiModal
        isOpen={isPahadiModalOpen}
        onClose={() => setIsPahadiModalOpen(false)}
        onSelectRoute={(id) => {
          handleRouteSelect(id);
          setIsPahadiModalOpen(false);
        }}
      />

    </div>

  );
}

export default HomePage;
