import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Thermometer, Layers, Search, Eye } from 'lucide-react';

interface MagnifyingLensProps {
  isActive: boolean;
  cursorX: number;
  cursorY: number;
  zoom: number;
  size: number;
  image: string;
  windowSize: { width: number; height: number };
  currentLang: 'en' | 'mn';
}

export function MagnifyingLens({
  isActive,
  cursorX,
  cursorY,
  zoom,
  size,
  image,
  windowSize,
  currentLang
}: MagnifyingLensProps) {
  const isCursorActive = cursorX !== -999 && cursorY !== -999;
  const showLens = isActive && isCursorActive;

  // Sound effects on activating/changing magnification
  useEffect(() => {
    if (isActive) {
      playLensSound('activate');
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      playLensSound('zoom-change');
    }
  }, [zoom, size]);

  const playLensSound = (type: 'activate' | 'zoom-change') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      if (type === 'activate') {
        // Futuristic camera lens shutter/whirr
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.15);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'zoom-change') {
        // High-tech beep click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.setValueAtTime(1200, now + 0.04);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      // Sound fail-safe
    }
  };

  if (!showLens) return null;

  const radius = size / 2;

  // Calculate current simulated depth and geological metrics
  const ratioY = Math.max(0, Math.min(1, cursorY / (windowSize.height || 800)));
  const depth = Math.round(ratioY * 120);

  let layerName = currentLang === 'en' ? 'Upper Continental Crust' : 'Дээд эх газрын царцдас';
  let temp = `${20 + Math.round(ratioY * 15 * 15)}°C`;
  let composite = 'SiO₂, Al₂O₃';

  if (depth > 15 && depth <= 35) {
    layerName = currentLang === 'en' ? 'Lower Oceanic Crust' : 'Доод далайн царцдас';
    temp = `${250 + Math.round(((ratioY - 0.12) * 400))}°C`;
    composite = 'CaAl₂Si₂O₈, (Mg,Fe)₂SiO₄';
  } else if (depth > 35 && depth <= 50) {
    layerName = currentLang === 'en' ? 'Moho Discontinuity' : 'Мохогийн зааг зааглал';
    temp = `${600 + Math.round(((ratioY - 0.3) * 600))}°C`;
    composite = 'Transition silicate zones';
  } else if (depth > 50) {
    layerName = currentLang === 'en' ? 'Lithospheric Mantle' : 'Литосферийн манти';
    temp = `${900 + Math.round(((ratioY - 0.42) * 500))}°C`;
    composite = 'Mg₂SiO₄, Fe₂SiO₄, Pyroxene';
  }

  // Create an offset so the magnified inner view aligns with the exact pixel below it
  // dx = radius - cursorX, dy = radius - cursorY
  // transform-origin is set at cursorX cursorY
  const innerWidth = windowSize.width;
  const innerHeight = windowSize.height;

  return (
    <div
      className="fixed pointer-events-none z-[100] select-none"
      style={{
        left: cursorX - radius,
        top: cursorY - radius,
        width: size,
        height: size,
      }}
    >
      <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-[#e8702a] shadow-[0_0_35px_rgba(232,112,42,0.4),0_0_0_2px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(0,0,0,0.6)]">
        {/* The scaled magnified texture */}
        <div
          className="absolute bg-center bg-cover bg-no-repeat pointer-events-none"
          style={{
            width: innerWidth,
            height: innerHeight,
            backgroundImage: `url(${image})`,
            transformOrigin: `${cursorX}px ${cursorY}px`,
            transform: `translate(${-cursorX + radius}px, ${-cursorY + radius}px) scale(${zoom})`,
          }}
        />

        {/* Tactical HUD Overlays */}
        {/* Holographic scanning grids */}
        <div className="absolute inset-0 bg-radial-[circle,transparent_70%,rgba(0,0,0,0.45)_100%] pointer-events-none" />
        <div className="absolute inset-0 border border-white/5 rounded-full pointer-events-none" />

        {/* Circular Compass-style HUD scale indicators / crosshairs */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none text-[#e8702a]/45 animate-spin-slow">
          <circle cx="50%" cy="50%" r={radius - 8} fill="transparent" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="50%" cy="50%" r={radius - 16} fill="transparent" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 15" />
        </svg>

        {/* Fixed Center HUD Reticle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-4 h-4 border border-white/40 rounded-full relative">
            <div className="absolute w-[1px] h-3 bg-white/40 left-1/2 -translate-x-1/2 -top-1" />
            <div className="absolute w-[1px] h-3 bg-white/40 left-1/2 -translate-x-1/2 -bottom-1" />
            <div className="absolute h-[1px] w-3 bg-white/40 top-1/2 -translate-y-1/2 -left-1" />
            <div className="absolute h-[1px] w-3 bg-white/40 top-1/2 -translate-y-1/2 -right-1" />
          </div>
        </div>

        {/* Small scanning glare reflex sweeps across */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-pulse pointer-events-none" />
      </div>

      {/* Floating Tactical Data Readout Banner attached underneath the physical lens */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] bg-zinc-950/95 border border-[#e8702a]/30 backdrop-blur-md px-3.5 py-2.5 rounded-xl flex flex-col gap-1 w-52 text-left shadow-2xl shadow-black"
      >
        <div className="flex items-center justify-between text-[8px] font-mono tracking-widest text-[#e8702a] font-bold">
          <span className="flex items-center gap-1">
            <Search className="w-2.5 h-2.5" />
            {currentLang === 'en' ? 'PHYSICAL LENS' : 'ОПТИК ӨСГӨГЧ'}
          </span>
          <span>{zoom.toFixed(1)}X MAG</span>
        </div>

        <div className="text-[10px] text-white font-bold tracking-tight truncate border-b border-white/5 pb-1 mt-0.5">
          {layerName}
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[8px] font-mono text-zinc-400 mt-1">
          <div className="flex flex-col">
            <span className="text-[7px] text-zinc-500 uppercase">{currentLang === 'en' ? 'DEPTH' : 'ГҮН'}</span>
            <span className="font-semibold text-zinc-200">{depth} km</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] text-zinc-500 uppercase">{currentLang === 'en' ? 'EST TEMP' : 'ДУЛААН'}</span>
            <span className="font-semibold text-red-400">{temp}</span>
          </div>
        </div>

        <div className="text-[7px] font-mono text-zinc-500 tracking-wide mt-1 truncate">
          {composite}
        </div>
      </motion.div>
    </div>
  );
}
