/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Globe, Sparkles, Search, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onSignUpClick?: () => void;
  onTabChange?: (tabId: string) => void;
  userProfile?: { name: string; email: string } | null;
  currentLang?: 'en' | 'mn';
  onLangToggle?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;

  // HUD Config Props
  spotlightStyle?: 'heatmap' | 'laser';
  setSpotlightStyle?: (style: 'heatmap' | 'laser') => void;
  showLegend?: boolean;
  setShowLegend?: (show: boolean) => void;
  viewingMode?: 'default' | 'seismic' | 'oceanic';
  setViewingMode?: (mode: 'default' | 'seismic' | 'oceanic') => void;
  cursorColor?: 'tectonic' | 'emerald' | 'magma' | 'abyssal' | 'cosmic' | 'aurora' | 'solar' | 'nebula' | 'neon_pink' | 'amber_gold' | 'deep_forest' | 'hyper_blue' | 'mint_fresh' | 'crystal_white' | 'obsidian_black' | 'bronze' | 'lavender' | 'iridescent_rainbow';
  setCursorColor?: (color: 'tectonic' | 'emerald' | 'magma' | 'abyssal' | 'cosmic' | 'aurora' | 'solar' | 'nebula' | 'neon_pink' | 'amber_gold' | 'deep_forest' | 'hyper_blue' | 'mint_fresh' | 'crystal_white' | 'obsidian_black' | 'bronze' | 'lavender' | 'iridescent_rainbow') => void;
  cursorShape?: 'line' | 'dots' | 'ring' | 'crosshair' | 'triangle' | 'square' | 'star' | 'hexagon' | 'diamond' | 'swirl' | 'pulsing_radar' | 'brackets' | 'gear' | 'atom' | 'flower_of_life' | 'dna' | 'meteor_shower';
  setCursorShape?: (shape: 'line' | 'dots' | 'ring' | 'crosshair' | 'triangle' | 'square' | 'star' | 'hexagon' | 'diamond' | 'swirl' | 'pulsing_radar' | 'brackets' | 'gear' | 'atom' | 'flower_of_life' | 'dna' | 'meteor_shower') => void;
}

export function Navbar({
  onSignUpClick,
  onTabChange,
  userProfile,
  currentLang = 'en',
  onLangToggle,
  searchQuery,
  onSearchChange,

  // HUD Config props destructuring
  spotlightStyle = 'heatmap',
  setSpotlightStyle,
  showLegend = true,
  setShowLegend,
  viewingMode = 'default',
  setViewingMode,
  cursorColor = 'tectonic',
  setCursorColor,
  cursorShape = 'line',
  setCursorShape,
}: NavbarProps) {
  const [activeTab, setActiveTab] = useState<string>('Course');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isHUDOpen, setIsHUDOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'Course', label: currentLang === 'en' ? 'Course' : 'Хичээл' },
    { id: 'Guides', label: currentLang === 'en' ? 'Field Guides' : 'Гарын авлага' },
    { id: 'Geology', label: currentLang === 'en' ? 'Geology' : 'Геологи' },
    { id: 'Plans', label: currentLang === 'en' ? 'Plans' : 'Төлөвлөгөө' },
    { id: 'Tour', label: currentLang === 'en' ? 'Live Tour' : 'Шууд аялал' },
    { id: 'Idol', label: currentLang === 'en' ? '🤖 My Idol' : '🤖 Миний шүтээн' },
    { id: 'Game', label: currentLang === 'en' ? '🎮 Anime Guesser' : '🎮 Анимэ таагч' },
    { id: 'Typashi', label: currentLang === 'en' ? '🏎️ Typashi' : '🏎️ Типаши' },
    { id: 'Quiz', label: currentLang === 'en' ? '🔬 Geology Quiz' : '🔬 Геологийн сорил' },
    { id: 'Typeracer', label: currentLang === 'en' ? '⌨️ Typeracer' : '⌨️ Шивэлтийн уралдаан' },
  ];

  const mainTabs = tabs.slice(0, 5);
  const interactiveTabs = tabs.slice(5);

  const handleTabClick = (tabId: string) => {
    if (tabId === 'Typeracer') {
      if (!userProfile) {
        alert('You must sign up with a nickname and email to play Typeracer!');
        if (onSignUpClick) onSignUpClick();
        return;
      }
      window.open('https://irmuun-togloom.vercel.app/', '_blank', 'noopener,noreferrer');
      return;
    }
    if (tabId === 'Idol' || tabId === 'Game' || tabId === 'Typashi' || tabId === 'Quiz') {
      if (!userProfile) {
        alert(`You must sign up with a nickname and email to access ${tabId === 'Idol' ? 'My Idol' : tabId}!`);
        if (onSignUpClick) onSignUpClick();
        return;
      }
      if (onTabChange) {
        onTabChange(tabId);
      }
      return;
    }
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 select-none transition-all duration-300 ${
        isScrolled ? 'bg-black/75 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}>
        {/* Left Brand Area */}
        <div className="flex items-center gap-4 lg:gap-6 z-[110]">
          <div className="flex items-center gap-3">
            <svg
              width="26"
              height="26"
              viewBox="0 0 256 256"
              className="w-6 h-6 shrink-0 transition-transform duration-500 hover:rotate-18"
              style={{ fill: '#ffffff' }}
            >
              <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
            </svg>
            <span className="text-white text-2xl font-playfair italic font-medium tracking-tight">
              Lithos
            </span>
          </div>

          {/* Desktop Search Input */}
          <div className="hidden xl:flex items-center relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={currentLang === 'en' ? "Search 100 deep facts..." : "100 гүн баримтаас хайх..."}
              className="bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-[#e8702a]/60 text-white placeholder-white/50 text-xs rounded-full py-1.5 pl-8 pr-8 w-44 xl:w-56 transition-all focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-white/50 absolute left-3 pointer-events-none" />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')} 
                className="absolute right-3 text-white/50 hover:text-white p-0.5 rounded-full cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Center Pill Menu (desktop) */}
        <div className="hidden xl:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-1 items-center gap-1 z-[120]">
          {mainTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-white bg-white/20 shadow-sm'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}

          {/* Elegant Interactive Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>{currentLang === 'en' ? 'Interactive ▾' : 'Интерактив ▾'}</span>
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/15 rounded-2xl p-1.5 shadow-2xl flex flex-col gap-0.5 z-[150]"
                >
                  {interactiveTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        handleTabClick(tab.id);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                    >
                      {tab.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Action Button (desktop) */}
        <div className="hidden xl:flex items-center gap-3 z-[110]">
          {/* HUD Config Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsHUDOpen(!isHUDOpen)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-4.5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm select-none"
              title={currentLang === 'en' ? 'HUD Config' : 'HUD Тохиргоо'}
            >
              <Settings className={`w-3.5 h-3.5 text-[#e8702a] ${isHUDOpen ? 'animate-spin-slow' : ''}`} />
              <span className="font-mono uppercase text-xs">HUD</span>
            </button>

            <AnimatePresence>
              {isHUDOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 bg-zinc-950/95 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl flex flex-col gap-3.5 z-[150] text-left"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-semibold">
                      {currentLang === 'en' ? 'Spotlight Style' : 'Гэрлийн загвар'}
                    </span>
                    <div className="grid grid-cols-2 gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
                      <button
                        onClick={() => setSpotlightStyle && setSpotlightStyle('heatmap')}
                        className={`py-1 px-1 rounded text-[9px] font-semibold transition-all cursor-pointer ${
                          spotlightStyle === 'heatmap'
                            ? 'bg-[#e8702a] text-white shadow-sm'
                            : 'text-zinc-500 hover:text-white'
                        }`}
                      >
                        {currentLang === 'en' ? 'Heatmap' : 'Дулаан'}
                      </button>
                      <button
                        onClick={() => setSpotlightStyle && setSpotlightStyle('laser')}
                        className={`py-1 px-1 rounded text-[9px] font-semibold transition-all cursor-pointer ${
                          spotlightStyle === 'laser'
                            ? 'bg-[#e8702a] text-white shadow-sm'
                            : 'text-zinc-500 hover:text-white'
                        }`}
                      >
                        {currentLang === 'en' ? 'Laser' : 'Лазер'}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-semibold">
                      {currentLang === 'en' ? 'Lithosphere Legend' : 'Литосферийн Домог'}
                    </span>
                    <div className="grid grid-cols-2 gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
                      <button
                        onClick={() => setShowLegend && setShowLegend(true)}
                        className={`py-1 px-1 rounded text-[9px] font-semibold transition-all cursor-pointer ${
                          showLegend
                            ? 'bg-[#e8702a] text-white shadow-sm'
                            : 'text-zinc-500 hover:text-white'
                        }`}
                      >
                        {currentLang === 'en' ? 'Show' : 'Харуулах'}
                      </button>
                      <button
                        onClick={() => setShowLegend && setShowLegend(false)}
                        className={`py-1 px-1 rounded text-[9px] font-semibold transition-all cursor-pointer ${
                          !showLegend
                            ? 'bg-[#e8702a] text-white shadow-sm'
                            : 'text-zinc-500 hover:text-white'
                        }`}
                      >
                        {currentLang === 'en' ? 'Hide' : 'Нуух'}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-semibold">
                      {currentLang === 'en' ? 'Viewing Mode' : 'Харах горим'}
                    </span>
                    <select
                      value={viewingMode}
                      onChange={(e) => setViewingMode && setViewingMode(e.target.value as any)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg py-1.5 px-2 text-[9px] font-semibold text-white focus:outline-none focus:border-[#e8702a] cursor-pointer"
                    >
                      <option value="default" className="bg-zinc-950">{currentLang === 'en' ? 'Default Crust' : 'Үндсэн царцдас'}</option>
                      <option value="seismic" className="bg-zinc-950">{currentLang === 'en' ? 'Seismic Tectonic' : 'Сейсмик тектоник'}</option>
                      <option value="oceanic" className="bg-zinc-950">{currentLang === 'en' ? 'Deep Ocean Abyssal' : 'Далайн гүний геод'}</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-semibold">
                      {currentLang === 'en' ? 'Cursor Color' : 'Курсорын өнгө'}
                    </span>
                    <div className="grid grid-cols-6 gap-1 bg-white/5 p-1 rounded-lg border border-white/5 animate-none">
                      {[
                        { id: 'tectonic', color: '#e8702a', nameEn: 'Tectonic', nameMn: 'Тектоник' },
                        { id: 'emerald', color: '#10b981', nameEn: 'Emerald', nameMn: 'Эмералд' },
                        { id: 'magma', color: '#ef4444', nameEn: 'Magma', nameMn: 'Магма' },
                        { id: 'abyssal', color: '#06b6d4', nameEn: 'Abyssal', nameMn: 'Абиссал' },
                        { id: 'cosmic', color: '#a855f7', nameEn: 'Cosmic', nameMn: 'Космик' },
                        { id: 'aurora', color: '#22d3ee', nameEn: 'Aurora', nameMn: 'Аврора' },
                        { id: 'solar', color: '#eab308', nameEn: 'Solar', nameMn: 'Нарны' },
                        { id: 'nebula', color: '#f43f5e', nameEn: 'Nebula', nameMn: 'Небула' },
                        { id: 'neon_pink', color: '#ff007f', nameEn: 'Neon Pink', nameMn: 'Неон ягаан' },
                        { id: 'amber_gold', color: '#f59e0b', nameEn: 'Amber Gold', nameMn: 'Хув шар' },
                        { id: 'deep_forest', color: '#059669', nameEn: 'Jade Forest', nameMn: 'Ойн хаш' },
                        { id: 'hyper_blue', color: '#2563eb', nameEn: 'Hyper Blue', nameMn: 'Хэт хөх' },
                        { id: 'mint_fresh', color: '#34d399', nameEn: 'Mint Fresh', nameMn: 'Сэрүүн гаа' },
                        { id: 'crystal_white', color: '#ffffff', nameEn: 'Crystal White', nameMn: 'Болор цагаан' },
                        { id: 'obsidian_black', color: '#3b0764', nameEn: 'Obsidian Deep', nameMn: 'Обсидиан гүн' },
                        { id: 'bronze', color: '#b45309', nameEn: 'Bronze', nameMn: 'Хүрэн хүрэл' },
                        { id: 'lavender', color: '#c084fc', nameEn: 'Lavender', nameMn: 'Лаванда' },
                        { id: 'iridescent_rainbow', color: '#3b82f6', gradient: 'linear-gradient(45deg, #ff007f, #3b82f6, #10b981, #f59e0b)', nameEn: 'Chameleon', nameMn: 'Солонгон хамелеон' }
                      ].map((swatch) => (
                        <button
                          key={swatch.id}
                          onClick={() => setCursorColor && setCursorColor(swatch.id as any)}
                          className={`w-4.5 h-4.5 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                            cursorColor === swatch.id
                              ? 'border-white scale-110 shadow-[0_0_6px_rgba(255,255,255,0.6)]'
                              : 'border-white/15 hover:border-white/50 hover:scale-105'
                          }`}
                          style={{ background: swatch.gradient || swatch.color }}
                          title={currentLang === 'en' ? swatch.nameEn : swatch.nameMn}
                        >
                          {cursorColor === swatch.id && (
                            <span className="w-1 h-1 bg-black rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-semibold">
                      {currentLang === 'en' ? 'Cursor Shape' : 'Курсорын хэлбэр'}
                    </span>
                    <select
                      value={cursorShape}
                      onChange={(e) => setCursorShape && setCursorShape(e.target.value as any)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg py-1.5 px-2 text-[9px] font-semibold text-white focus:outline-none focus:border-[#e8702a] cursor-pointer"
                    >
                      <option value="line" className="bg-zinc-950">{currentLang === 'en' ? 'Fluid Line Trail' : 'Урсах шугам'}</option>
                      <option value="dots" className="bg-zinc-950">{currentLang === 'en' ? 'Glowing Particles' : 'Гэрэлтэгч ширхгүүд'}</option>
                      <option value="ring" className="bg-zinc-950">{currentLang === 'en' ? 'Concentric Ring' : 'Концентрик цагираг'}</option>
                      <option value="crosshair" className="bg-zinc-950">{currentLang === 'en' ? 'Strategic HUD Reticle' : 'Хувьсах HUD систем'}</option>
                      <option value="triangle" className="bg-zinc-950">{currentLang === 'en' ? 'Rotating HUD Triangle' : 'Эргэлдэх гурвалжин'}</option>
                      <option value="square" className="bg-zinc-950">{currentLang === 'en' ? 'Holographic Precision Square' : 'Нарийвчлалын дөрвөлжин'}</option>
                      <option value="star" className="bg-zinc-950">{currentLang === 'en' ? 'Starburst Glowing Star' : 'Гэрэлтэгч од'}</option>
                      <option value="hexagon" className="bg-zinc-950">{currentLang === 'en' ? 'Rotating Hexagon' : 'Эргэлдэх зургаан өнцөгт'}</option>
                      <option value="diamond" className="bg-zinc-950">{currentLang === 'en' ? 'Diamond Reticle' : 'Ромбо хараа'}</option>
                      <option value="swirl" className="bg-zinc-950">{currentLang === 'en' ? 'Tectonic Vortex' : 'Тектоник хуйлрал'}</option>
                      <option value="pulsing_radar" className="bg-zinc-950">{currentLang === 'en' ? 'Pulsing Radar Sweep' : 'Радар долгион'}</option>
                      <option value="brackets" className="bg-zinc-950">{currentLang === 'en' ? 'Cyberpunk Brackets' : 'Хаалтан хүрээ'}</option>
                      <option value="gear" className="bg-zinc-950">{currentLang === 'en' ? 'Mechanical Cog' : 'Араат дугуй'}</option>
                      <option value="atom" className="bg-zinc-950">{currentLang === 'en' ? 'Atomic Orbitals' : 'Атомын тойрог'}</option>
                      <option value="flower_of_life" className="bg-zinc-950">{currentLang === 'en' ? 'Sacred Mandala' : 'Мандала хээ'}</option>
                      <option value="dna" className="bg-zinc-950">{currentLang === 'en' ? 'Double Helix DNA' : 'ДНХ мушгиа'}</option>
                      <option value="meteor_shower" className="bg-zinc-950">{currentLang === 'en' ? 'Meteor Spark Shower' : 'Солирын оч'}</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {onLangToggle && (
            <button
              onClick={onLangToggle}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-4.5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm select-none"
              title="Toggle language / Хэл солих"
            >
              <Globe className="w-3.5 h-3.5 text-[#e8702a]" />
              <span className="font-mono uppercase text-xs">{currentLang === 'en' ? 'EN' : 'МН'}</span>
            </button>
          )}

          <a
            href="https://aistudio.google.com/apps/4bb9f5d8-c40e-4f7e-abe7-89f3e795c9e9?showPreview=true&showAssistant=true"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-4.5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm select-none"
            title="Open AI Studio Workspace"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e8702a] animate-pulse" />
            <span className="font-mono uppercase text-xs">AI Studio</span>
          </a>

          {userProfile ? (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-white/90">{userProfile.name}</span>
            </div>
          ) : (
            <button
              onClick={onSignUpClick}
              className="bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:bg-gray-100 hover:scale-[1.03] active:scale-95 shadow-sm cursor-pointer"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="xl:hidden z-[110] flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white/90 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay - Made Scrollable and properly styled */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[105] bg-black/98 backdrop-blur-2xl flex flex-col justify-start overflow-y-auto py-24 px-8 sm:px-12"
          >
            <div className="flex flex-col gap-6 text-left max-w-lg mx-auto w-full">
              <span className="text-white/45 text-xs font-mono tracking-widest uppercase mb-1">
                Discovery Navigation
              </span>

              {/* Mobile Search Input */}
              <div className="relative w-full mb-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={currentLang === 'en' ? "Search 100 deep facts..." : "100 гүн баримтаас хайх..."}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#e8702a]/60 text-white placeholder-white/40 text-sm rounded-xl py-2.5 pl-10 pr-10 transition-all focus:outline-none"
                />
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button 
                    onClick={() => onSearchChange('')} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1 rounded-full cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {tabs.map((tab, idx) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    key={tab.id}
                    onClick={() => {
                      handleTabClick(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-2xl sm:text-3xl font-medium text-left transition-colors flex items-center py-1 ${
                      isActive ? 'text-[#e8702a]' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span className="font-playfair italic text-white/30 mr-4 text-lg sm:text-2xl">
                      0{idx + 1}.
                    </span>
                    {tab.label}
                  </motion.button>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="h-px bg-white/10 my-4"
              />

              {onLangToggle && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 }}
                  onClick={onLangToggle}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-center text-sm font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Globe className="w-4 h-4 text-[#e8702a]" />
                  <span>Language: {currentLang === 'en' ? 'ENGLISH' : 'МОНГОЛ ХЭЛ'}</span>
                </motion.button>
              )}

              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
                href="https://aistudio.google.com/apps/4bb9f5d8-c40e-4f7e-abe7-89f3e795c9e9?showPreview=true&showAssistant=true"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#e8702a]/10 hover:bg-[#e8702a]/20 border border-[#e8702a]/30 text-white text-center text-sm font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Sparkles className="w-4 h-4 text-[#e8702a] animate-pulse" />
                <span>AI Studio App</span>
              </motion.a>

              {userProfile ? (
                <div className="bg-white/10 border border-white/10 text-white text-center text-sm font-medium py-4 rounded-full font-mono">
                  Signed in as <span className="text-[#e8702a] font-bold">{userProfile.name}</span>
                </div>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => {
                    if (onSignUpClick) onSignUpClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white text-center text-base font-semibold py-4 rounded-full transition-all cursor-pointer"
                >
                  Sign Up
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
