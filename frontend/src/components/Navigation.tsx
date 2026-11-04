
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ActivePage, RouteId } from "../types";
import {
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import { useAuth } from "../AuthContext";

interface NavigationProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onOpenPlanner: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  onOpenPlanner,
}) => {
  const [routesMenuOpen, setRoutesMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleRouteSelect = (routeId: RouteId) => {
    setRoutesMenuOpen(false);
    setMobileMenuOpen(false);

    if (routeId === "upper-shimla") {
      onNavigate("route-upper-shimla");
    }

    if (routeId === "kullu-manali") {
      onNavigate("route-kullu-manali");
    }

    if (routeId === "great-himachal-loop") {
      onNavigate("route-great-himachal-loop");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#111A15]/85 backdrop-blur-md border-b border-white/5 transition-all">

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">

          {/* Brand */}
          <button
            onClick={() => {
              onNavigate("home");
              setMobileMenuOpen(false);
            }}
            className="text-xl sm:text-2xl font-serif font-normal tracking-[0.2em] text-[#FAF8F2] hover:text-[#E8DFC5] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            ENROUTE
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest text-[#FAF8F2]/75">

            {/* Routes Dropdown */}
            <div className="relative">

              <button
                onClick={() => setRoutesMenuOpen(!routesMenuOpen)}
                onMouseEnter={() => setRoutesMenuOpen(true)}
                className={`flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 py-2 ${
                  currentPage.startsWith("route")
                    ? "text-white font-medium"
                    : ""
                }`}
              >
                <span>Routes</span>
                <ChevronDown className="w-3 h-3 text-[#A3B899]" />
              </button>

              {routesMenuOpen && (
                <div
                  onMouseLeave={() => setRoutesMenuOpen(false)}
                  className="absolute top-full left-0 w-72 bg-[#16221C] border border-white/10 rounded-xl p-3 shadow-2xl space-y-1.5 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
                >

                  <button
                    onClick={() => handleRouteSelect("upper-shimla")}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#FAF8F2] group-hover:text-[#A3B899]">
                        Route 01
                      </span>
                      <span className="text-[10px] text-[#8E9A92]">
                        3–7+ Nights
                      </span>
                    </div>

                    <div className="text-xs text-[#D5CEBF] font-serif font-normal">
                      The Upper Shimla Route
                    </div>

                    <p className="text-[11px] text-[#8E9A92] line-clamp-1">
                      Apple country, quiet forests, Chanshal
                    </p>
                  </button>

                  <button
                    onClick={() => handleRouteSelect("kullu-manali")}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#FAF8F2] group-hover:text-[#A3B899]">
                        Route 02
                      </span>
                      <span className="text-[10px] text-[#8E9A92]">
                        4–8+ Nights
                      </span>
                    </div>

                    <div className="text-xs text-[#D5CEBF] font-serif font-normal">
                      The Kullu-Manali Route
                    </div>

                    <p className="text-[11px] text-[#8E9A92] line-clamp-1">
                      Tirthan river, Naggar, Atal Tunnel, Sissu
                    </p>
                  </button>

                  <button
                    onClick={() => handleRouteSelect("great-himachal-loop")}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#FAF8F2] group-hover:text-[#A3B899]">
                        Route 03
                      </span>
                      <span className="text-[10px] text-[#8E9A92]">
                        12–21 Days
                      </span>
                    </div>

                    <div className="text-xs text-[#D5CEBF] font-serif font-normal">
                      The Great Himachal Loop
                    </div>

                    <p className="text-[11px] text-[#8E9A92] line-clamp-1">
                      Kinnaur, Spiti desert, Kunzum pass
                    </p>
                  </button>

                </div>
              )}
            </div>

            {/* Experiences */}
            <button
              onClick={() => onNavigate("experiences")}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentPage === "experiences" ? "text-white font-medium" : ""
              }`}
            >
              Experiences
            </button>

            {/* Secrets */}
            <button
              onClick={() => onNavigate("secrets")}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentPage === "secrets" ? "text-white font-medium" : ""
              }`}
            >
              Secrets
            </button>

            {/* Stories */}
            <button
              onClick={() => onNavigate("stories")}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentPage === "stories" ? "text-white font-medium" : ""
              }`}
            >
              Pahadi Stories
            </button>

            {/* Films */}
            <button
              onClick={() => onNavigate("films")}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentPage === "films" ? "text-white font-medium" : ""
              }`}
            >
              Films
            </button>

            {/* Philosophy */}
            <button
              onClick={() => onNavigate("about")}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                currentPage === "about" ? "text-white font-medium" : ""
              }`}
            >
              Philosophy
            </button>

          </nav>

          {/* Authentication and Planner */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Desktop Authentication */}
            <div className="hidden lg:flex items-center gap-4 text-xs uppercase tracking-widest">

              {loading ? null : user ? (
                <>
                  <span className="text-[#A3B899] normal-case tracking-normal">
                    Welcome, {user.name}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="text-[#FAF8F2]/75 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[#FAF8F2]/75 hover:text-white transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-full border border-[#A3B899]/60 text-[#A3B899] hover:bg-[#A3B899] hover:text-[#111A15] transition-all"
                  >
                    Register
                  </Link>
                </>
              )}

            </div>

            {/* Planner Button */}
            <button
              onClick={onOpenPlanner}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#111A15] bg-[#FAF8F2] rounded-full hover:bg-[#E8DFC5] transition-all transform hover:scale-[1.02] shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Take The Road</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#FAF8F2] hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0F1713]/98 pt-24 px-6 flex flex-col justify-between pb-8 lg:hidden animate-in fade-in duration-200">

          <div className="space-y-6">

            <div className="text-xs uppercase tracking-widest text-[#8E9A92] pb-2 border-b border-white/10">
              Navigation
            </div>

            <div className="space-y-4">

              {/* Mobile Routes */}
              <div className="space-y-2">

                <div className="text-xs uppercase tracking-wider text-[#A3B899] font-medium">
                  Three Travel Belts
                </div>

                <button
                  onClick={() => handleRouteSelect("upper-shimla")}
                  className="block text-lg font-serif text-[#FAF8F2] hover:text-[#A3B899] py-1 text-left w-full"
                >
                  Route 01 · Upper Shimla
                </button>

                <button
                  onClick={() => handleRouteSelect("kullu-manali")}
                  className="block text-lg font-serif text-[#FAF8F2] hover:text-[#A3B899] py-1 text-left w-full"
                >
                  Route 02 · Kullu-Manali & Beyond
                </button>

                <button
                  onClick={() => handleRouteSelect("great-himachal-loop")}
                  className="block text-lg font-serif text-[#FAF8F2] hover:text-[#A3B899] py-1 text-left w-full"
                >
                  Route 03 · The Great Himachal Loop
                </button>

              </div>

              {/* Other Mobile Links */}
              <div className="pt-4 border-t border-white/5 space-y-3">

                <button
                  onClick={() => {
                    onNavigate("experiences");
                    setMobileMenuOpen(false);
                  }}
                  className="block text-base text-[#D5CEBF] hover:text-white text-left w-full"
                >
                  Stay & Food Experiences
                </button>

                <button
                  onClick={() => {
                    onNavigate("secrets");
                    setMobileMenuOpen(false);
                  }}
                  className="block text-base text-[#D5CEBF] hover:text-white text-left w-full"
                >
                  Enroute Secrets
                </button>

                <button
                  onClick={() => {
                    onNavigate("stories");
                    setMobileMenuOpen(false);
                  }}
                  className="block text-base text-[#D5CEBF] hover:text-white text-left w-full"
                >
                  Pahadi The Wanderer
                </button>

                <button
                  onClick={() => {
                    onNavigate("films");
                    setMobileMenuOpen(false);
                  }}
                  className="block text-base text-[#D5CEBF] hover:text-white text-left w-full"
                >
                  Enroute Films & Reels
                </button>

                <button
                  onClick={() => {
                    onNavigate("about");
                    setMobileMenuOpen(false);
                  }}
                  className="block text-base text-[#D5CEBF] hover:text-white text-left w-full"
                >
                  Our Philosophy
                </button>

                <button
                  onClick={() => {
                    onNavigate("responsible-travel");
                    setMobileMenuOpen(false);
                  }}
                  className="block text-base text-[#D5CEBF] hover:text-white text-left w-full"
                >
                  Responsible Travel
                </button>

              </div>

              {/* Mobile Authentication */}
              <div className="border-t border-white/10 pt-5 space-y-4">

                {loading ? null : user ? (
                  <>
                    <p className="text-base text-[#A3B899]">
                      Welcome, {user.name}
                    </p>

                    <button
                      onClick={handleLogout}
                      className="block text-base text-[#FAF8F2] hover:text-[#A3B899]"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base text-[#FAF8F2] hover:text-[#A3B899]"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base text-[#A3B899] hover:text-white"
                    >
                      Create an Account
                    </Link>
                  </>
                )}

              </div>

            </div>
          </div>

          {/* Mobile Planner */}
          <div className="pt-6 border-t border-white/10 space-y-3">

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanner();
              }}
              className="w-full py-3 text-center bg-[#FAF8F2] text-[#111A15] text-xs uppercase tracking-widest font-semibold rounded-full"
            >
              Plan Your Journey
            </button>

            <p className="text-[11px] text-center text-[#8E9A92] italic">
              “Mountains have curved roads, but straight people.”
            </p>

          </div>
        </div>
      )}
    </>
  );
};
