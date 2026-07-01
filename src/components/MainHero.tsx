/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, Layers, Milestone, ShieldAlert, Sparkles, X } from 'lucide-react';
import { Navbar } from './Navbar';
import { RevealLayer } from './RevealLayer';
import { AmbientPlayer } from './AmbientPlayer';
import { IdolModal } from './IdolModal';
import { MessengerPopup } from './MessengerPopup';
import { AnimeGuesser } from './AnimeGuesser';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

const SPOTLIGHT_R = 260;

export function MainHero() {
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);

  // Modals state
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isDiggingOpen, setIsDiggingOpen] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<string>('crust');
  const [isIdolOpen, setIsIdolOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);

  // Tracking mouse with smoothing (Lerp)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // If first movement, initialize smooth position directly to avoid jump from offscreen
      if (smooth.current.x === -999) {
        smooth.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.current = { x: touch.clientX, y: touch.clientY };
        if (smooth.current.x === -999) {
          smooth.current = { x: touch.clientX, y: touch.clientY };
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const updatePosition = () => {
      if (mouse.current.x !== -999) {
        if (smooth.current.x === -999) {
          smooth.current = { x: mouse.current.x, y: mouse.current.y };
        } else {
          // Lerps: smooth.x += (mouse.x - smooth.x) * 0.1
          smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
          smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
        }
        setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      }
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em] select-none text-white overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
      id="lithos-app-root"
    >
      {/* Premium fixed navigation */}
      <Navbar
        onSignUpClick={() => setIsSignUpOpen(true)}
        onTabChange={(tabId) => {
          // When users click navigation options, provide quick contextual feedback or trigger actions!
          if (tabId === 'Geology') {
            setIsDiggingOpen(true);
          } else if (tabId === 'Idol') {
            setIsIdolOpen(true);
          } else if (tabId === 'Game') {
            setIsGameOpen(true);
          }
        }}
      />

      {/* Ambient Soundtrack Player */}
      <AmbientPlayer />

      {/* Main Section */}
      <section
        id="geology-hero-section"
        className="relative w-full overflow-hidden h-screen bg-black"
        style={{ height: '100dvh' }}
      >
        {/* Base Layer: Zooming Image */}
        <div
          id="hero-base-image"
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom pointer-events-none"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* Transition Overlay (adds a gorgeous vignette & depth over base layer) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 z-20 pointer-events-none" />

        {/* Reveal Layer (z-30) */}
        <RevealLayer
          image={BG_IMAGE_2}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
          spotlightRadius={SPOTLIGHT_R}
        />

        {/* Outer vignette to restrict the mask glow boundaries neatly */}
        <div className="absolute inset-0 pointer-events-none z-40 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%]" />

        {/* Heading Container (z-50) */}
        <div
          id="hero-title-container"
          className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50"
        >
          <h1 className="text-white leading-[0.95]" id="hero-main-title">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
              id="hero-title-line-1"
            >
              davharguud tsag hugatsaanii
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
              id="hero-title-line-2"
            >
              tuhai tuuhuudiig hadgaldag
            </span>
          </h1>

          {/* Interactive feedback hint showing when cursor hasn't moved yet */}
          {cursorPos.x === -999 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute top-44 text-xs font-mono tracking-widest text-white/50 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 animate-spin-slow text-[#e8702a]" />
              SWIPE OR MOVE MOUSE TO PEEL BACK THE CRUST
            </motion.div>
          )}
        </div>

        {/* Bottom-left Paragraph Block (z-50) */}
        <div
          id="hero-bottom-left-block"
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-sm text-white/80 leading-relaxed" id="sediment-paragraph">
            Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us.
          </p>
        </div>

        {/* Bottom-right Block (z-50) */}
        <div
          id="hero-bottom-right-block"
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed" id="interactive-paragraph">
            Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet.
          </p>
          <button
            id="start-digging-button"
            onClick={() => setIsDiggingOpen(true)}
            className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 flex items-center gap-2 group cursor-pointer"
          >
            <span>Start Digging</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Start Digging Exploration Panel (Premium Modal overlay) */}
      <AnimatePresence>
        {isDiggingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="digging-modal-backdrop"
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              id="digging-modal-card"
              className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e8702a]/20 flex items-center justify-center text-[#e8702a]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Geological Cross-Section</h3>
                    <p className="text-xs text-zinc-400">Interactive Stratigraphic Column</p>
                  </div>
                </div>
                <button
                  id="close-digging-modal"
                  onClick={() => setIsDiggingOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Stratigraphic Visual (md:col-span-5) */}
                <div className="md:col-span-5 flex flex-col gap-2">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Sedimentation Layers</span>
                  
                  <div className="flex flex-col gap-1.5 h-64 justify-between">
                    {/* Layer 1: Crust */}
                    <button
                      id="select-layer-crust"
                      onClick={() => setSelectedLayer('crust')}
                      className={`h-1/4 rounded-xl border flex flex-col justify-center px-4 transition-all text-left ${
                        selectedLayer === 'crust'
                          ? 'bg-[#e8702a]/20 border-[#e8702a] text-[#e8702a]'
                          : 'bg-zinc-900/30 border-zinc-800 text-zinc-300 hover:bg-zinc-900/80'
                      }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider">I. Soil & Sandstone</span>
                      <span className="text-[10px] opacity-70">0 - 50m Depth</span>
                    </button>

                    {/* Layer 2: Basalt */}
                    <button
                      id="select-layer-basalt"
                      onClick={() => setSelectedLayer('basalt')}
                      className={`h-1/4 rounded-xl border flex flex-col justify-center px-4 transition-all text-left ${
                        selectedLayer === 'basalt'
                          ? 'bg-[#e8702a]/20 border-[#e8702a] text-[#e8702a]'
                          : 'bg-zinc-900/30 border-zinc-800 text-zinc-300 hover:bg-zinc-900/80'
                      }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider">II. Basalt Columns</span>
                      <span className="text-[10px] opacity-70">50m - 400m Depth</span>
                    </button>

                    {/* Layer 3: Metamorphic */}
                    <button
                      id="select-layer-metamorphic"
                      onClick={() => setSelectedLayer('metamorphic')}
                      className={`h-1/4 rounded-xl border flex flex-col justify-center px-4 transition-all text-left ${
                        selectedLayer === 'metamorphic'
                          ? 'bg-[#e8702a]/20 border-[#e8702a] text-[#e8702a]'
                          : 'bg-zinc-900/30 border-zinc-800 text-zinc-300 hover:bg-zinc-900/80'
                      }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider">III. Quartzite Granites</span>
                      <span className="text-[10px] opacity-70">400m - 1200m Depth</span>
                    </button>

                    {/* Layer 4: Mantle Edge */}
                    <button
                      id="select-layer-mantle"
                      onClick={() => setSelectedLayer('mantle')}
                      className={`h-1/4 rounded-xl border flex flex-col justify-center px-4 transition-all text-left ${
                        selectedLayer === 'mantle'
                          ? 'bg-[#e8702a]/20 border-[#e8702a] text-[#e8702a]'
                          : 'bg-zinc-900/30 border-zinc-800 text-zinc-300 hover:bg-zinc-900/80'
                      }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider">IV. Peridotite Crust</span>
                      <span className="text-[10px] opacity-70">1200m+ Depth</span>
                    </button>
                  </div>
                </div>

                {/* Layer Description (md:col-span-7) */}
                <div className="md:col-span-7 flex flex-col justify-between bg-zinc-900/30 rounded-2xl border border-zinc-800/80 p-5">
                  <AnimatePresence mode="wait">
                    {selectedLayer === 'crust' && (
                      <motion.div
                        key="crust"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2 text-[#e8702a]">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs font-mono font-medium uppercase tracking-widest">Upper Stratum</span>
                        </div>
                        <h4 className="text-lg font-semibold text-white">Soil & Holocene Sandstone</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          This surface veneer records the recent epoch of human existence, agriculture, and rapid weather shifts. Beneath the humus lies consolidated sandstone, packed with silica deposits from ancient shores.
                        </p>
                        <div className="mt-2 text-xs font-mono bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400">
                          Primary minerals: Quartz, Feldspar, Calcite
                        </div>
                      </motion.div>
                    )}

                    {selectedLayer === 'basalt' && (
                      <motion.div
                        key="basalt"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2 text-[#e8702a]">
                          <Milestone className="w-4 h-4" />
                          <span className="text-xs font-mono font-medium uppercase tracking-widest">Igneous Flow</span>
                        </div>
                        <h4 className="text-lg font-semibold text-white">Columnar Basalt Layers</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          Formed during massive volcanic eruptions millions of years ago. As the rich, iron-heavy lava cooled slowly and contracted, it cracked into stunning hexagonal columns of dense dark rock.
                        </p>
                        <div className="mt-2 text-xs font-mono bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400">
                          Primary minerals: Pyroxene, Plagioclase, Olivine
                        </div>
                      </motion.div>
                    )}

                    {selectedLayer === 'metamorphic' && (
                      <motion.div
                        key="metamorphic"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2 text-[#e8702a]">
                          <Layers className="w-4 h-4" />
                          <span className="text-xs font-mono font-medium uppercase tracking-widest">Tectonic Pressure</span>
                        </div>
                        <h4 className="text-lg font-semibold text-white">Quartzite Granites</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          Subjected to high tectonic stress and heat, sandstone metamorphosed into quartzite. Here pressure folds the bedrock, displaying gorgeous wavy lines that register prehistoric mountain-building.
                        </p>
                        <div className="mt-2 text-xs font-mono bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400">
                          Primary minerals: Quartz grains, Muscovite Mica
                        </div>
                      </motion.div>
                    )}

                    {selectedLayer === 'mantle' && (
                      <motion.div
                        key="mantle"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2 text-[#e8702a]">
                          <ShieldAlert className="w-4 h-4" />
                          <span className="text-xs font-mono font-medium uppercase tracking-widest">Deep Lithosphere</span>
                        </div>
                        <h4 className="text-lg font-semibold text-white">Peridotite Crustal Base</h4>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          The deep base of the earth's crust transitioning into the mantle. This dense rock contains crystals generated under extreme crushing weight and radiant core warmth, rarely seen at the surface.
                        </p>
                        <div className="mt-2 text-xs font-mono bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400">
                          Primary minerals: Chromium Diopside, Pyrope
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-4 flex justify-between items-center text-[11px] text-zinc-500 font-mono">
                    <span>Moho Transition Zone</span>
                    <span className="text-[#e8702a]">by irmuun geology</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-zinc-900/40 border-t border-zinc-800 flex justify-end gap-3 px-6">
                <button
                  id="digging-learn-more"
                  onClick={() => {
                    setIsDiggingOpen(false);
                    setIsSignUpOpen(true);
                  }}
                  className="bg-white hover:bg-zinc-100 text-zinc-900 text-xs font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-102 cursor-pointer"
                >
                  Join Field Course
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Sleek Registration Modal (Sign Up) */}
      <AnimatePresence>
        {isSignUpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="signup-modal-backdrop"
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              id="signup-modal-card"
              className="bg-zinc-950 border border-zinc-800/80 rounded-3xl w-full max-w-md p-6 sm:p-8 relative shadow-2xl overflow-hidden"
            >
              {/* Abs decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e8702a]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                    <span className="font-playfair italic text-3xl text-zinc-400">Join</span> Lithos
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">Peel back time and explore the world with us.</p>
                </div>
                <button
                  id="close-signup-modal"
                  onClick={() => setIsSignUpOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form
                id="signup-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for registering! You are now part of Lithos.');
                  setIsSignUpOpen(false);
                }}
                className="flex flex-col gap-4 mt-2"
              >
                <div>
                  <label htmlFor="user-name" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    id="user-name"
                    placeholder="Irmuun Bold"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#e8702a] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="user-email" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    id="user-email"
                    placeholder="irmuun@geology.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#e8702a] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="user-interest" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                    Primary Interest
                  </label>
                  <select
                    id="user-interest"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8702a] transition-colors appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                  >
                    <option value="enthusiast">Sedimentology & Stratigraphy</option>
                    <option value="cartography">Interactive Tectonic Mapping</option>
                    <option value="fieldwork">Active Volcanism & Field Guides</option>
                    <option value="general">Gemstone mineralogy</option>
                  </select>
                </div>

                <div className="flex items-center gap-2.5 mt-2">
                  <input
                    required
                    type="checkbox"
                    id="terms-checkbox"
                    className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-[#e8702a] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="terms-checkbox" className="text-xs text-zinc-400 cursor-pointer select-none">
                    I agree to the Lithos terms and geology privacy updates
                  </label>
                </div>

                <button
                  id="submit-signup-button"
                  type="submit"
                  className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-semibold py-3.5 rounded-xl mt-4 transition-all hover:scale-[1.01] active:scale-99 shadow-lg shadow-[#e8702a]/10 cursor-pointer text-center"
                >
                  Create Free Account
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <IdolModal isOpen={isIdolOpen} onClose={() => setIsIdolOpen(false)} />
      <AnimeGuesser isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
      <MessengerPopup />
    </div>
  );
}
