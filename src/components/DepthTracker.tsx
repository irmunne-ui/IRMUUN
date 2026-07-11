import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Thermometer, Layers, Compass, Activity, ShieldAlert, ChevronUp, ChevronDown, Maximize2, Minimize2, Map, CircleDot } from 'lucide-react';
import { LITHOSPHERE_PALETTES } from './palettesData';

interface DepthTrackerProps {
  cursorX: number;
  cursorY: number;
  windowHeight: number;
  shakeAmount?: number;
  activePaletteId?: string;
}

export function DepthTracker({ cursorX, cursorY, windowHeight, shakeAmount = 0, activePaletteId = 'sedimentary' }: DepthTrackerProps) {
  const isCursorActive = cursorX !== -999 && cursorY !== -999;
  const [isExpanded, setIsExpanded] = useState(true);
  const seismographCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dataPoints = useRef<number[]>(Array(50).fill(22)); // baseline center

  useEffect(() => {
    if (!isCursorActive || !isExpanded) return;

    const canvas = seismographCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const updateAndDraw = () => {
      dataPoints.current.shift();

      let nextVal = 22 + (Math.random() - 0.5) * 2;
      
      if (shakeAmount > 0.5) {
        const spike = (Math.random() - 0.5) * shakeAmount * 3.5;
        nextVal += spike;
      }

      nextVal = Math.max(2, Math.min(42, nextVal));
      dataPoints.current.push(nextVal);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(63, 63, 70, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 22);
      ctx.lineTo(canvas.width, 22);
      ctx.stroke();

      for (let x = 20; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.lineWidth = 1.5;
      
      if (shakeAmount > 4) {
        ctx.strokeStyle = '#ef4444';
      } else if (shakeAmount > 1) {
        ctx.strokeStyle = '#f97316';
      } else {
        ctx.strokeStyle = '#10b981';
      }

      for (let i = 0; i < dataPoints.current.length; i++) {
        const xCoord = (i / (dataPoints.current.length - 1)) * canvas.width;
        const yCoord = dataPoints.current[i];
        if (i === 0) {
          ctx.moveTo(xCoord, yCoord);
        } else {
          ctx.lineTo(xCoord, yCoord);
        }
      }
      ctx.stroke();

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (shakeAmount > 4) {
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.15)');
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
      } else if (shakeAmount > 1) {
        gradient.addColorStop(0, 'rgba(249, 115, 22, 0.12)');
        gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.1)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
      }
      ctx.fillStyle = gradient;
      ctx.fill();

      animId = requestAnimationFrame(updateAndDraw);
    };

    animId = requestAnimationFrame(updateAndDraw);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isCursorActive, shakeAmount, isExpanded]);

  if (!isCursorActive) return null;

  const ratioY = Math.max(0, Math.min(1, cursorY / (windowHeight || 800)));
  const depth = Math.round(ratioY * 120);

  let layerName = 'Lithosphere Surface';
  let temp = '20°C';
  let pressure = '1.0 atm';
  let composition = 'Granite, Clay, Feldspar';
  let chemical = 'SiO₂, Al₂O₃';
  let seismicSpeed = '5.8 km/s';

  let activeLayerIndex = 0;
  if (depth <= 15) {
    layerName = 'Upper Continental Crust';
    temp = `${20 + Math.round(ratioY * 15 * 15)}°C`;
    pressure = `${(ratioY * 4).toFixed(1)} kbar`;
    composition = 'Granite, Sedimentary Silt, Shales';
    chemical = 'SiO₂, Al₂O₃, KAlSi₃O₈';
    seismicSpeed = '6.0 km/s';
    activeLayerIndex = 0;
  } else if (depth <= 35) {
    layerName = 'Lower Oceanic & Shield Crust';
    temp = `${250 + Math.round(((ratioY - 0.12) * 400))}°C`;
    pressure = `${(4 + (ratioY - 0.12) * 18).toFixed(1)} kbar`;
    composition = 'Basaltic Rocks, Anorthosite, Gabbro';
    chemical = 'CaAl₂Si₂O₈, (Mg,Fe)₂SiO₄';
    seismicSpeed = '6.7 km/s';
    activeLayerIndex = 1;
  } else if (depth <= 50) {
    layerName = 'Mohorovičić Discontinuity';
    temp = `${600 + Math.round(((ratioY - 0.3) * 600))}°C`;
    pressure = `${(10 + (ratioY - 0.3) * 15).toFixed(1)} kbar`;
    composition = 'Seismic Velocity Boundary (Moho)';
    chemical = 'Transition Zone: Crust to Mantle';
    seismicSpeed = '8.1 km/s';
    activeLayerIndex = 2;
  } else {
    layerName = 'Upper Lithospheric Mantle';
    temp = `${900 + Math.round(((ratioY - 0.42) * 500))}°C`;
    pressure = `${(15 + (ratioY - 0.42) * 45).toFixed(1)} kbar`;
    composition = 'Peridotite, Dunite, Dense Eclogite';
    chemical = 'Mg₂SiO₄, Fe₂SiO₄, Pyroxene';
    seismicSpeed = '8.3 km/s';
    activeLayerIndex = 3;
  }

  const palette = LITHOSPHERE_PALETTES.find((p) => p.id === activePaletteId) || LITHOSPHERE_PALETTES[0];
  const activeLayerColor = palette.layers[activeLayerIndex];

  // Interactive Stratigraphy layers for the expanded legend visualization
  const strataLayers = [
    { 
      name: 'Upper Crust', 
      range: '0-15 km', 
      comp: 'Granite, Clay', 
      borderColor: palette.layers[0].border,
      bgColor: palette.layers[0].start,
      textColor: palette.layers[0].border,
      active: depth <= 15 
    },
    { 
      name: 'Lower Crust', 
      range: '15-35 km', 
      comp: 'Basalt, Gabbro', 
      borderColor: palette.layers[1].border,
      bgColor: palette.layers[1].start,
      textColor: palette.layers[1].border,
      active: depth > 15 && depth <= 35 
    },
    { 
      name: 'Moho Zone', 
      range: '35-50 km', 
      comp: 'Transition zone', 
      borderColor: palette.layers[2].border,
      bgColor: palette.layers[2].start,
      textColor: palette.layers[2].border,
      active: depth > 35 && depth <= 50 
    },
    { 
      name: 'Upper Mantle', 
      range: '50-120 km', 
      comp: 'Peridotite, Dunite', 
      borderColor: palette.layers[3].border,
      bgColor: palette.layers[3].start,
      textColor: palette.layers[3].border,
      active: depth > 50 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      layout
      className={`fixed bottom-8 left-4 sm:left-10 md:left-14 z-[90] ${isExpanded ? 'w-[310px]' : 'w-[260px]'} backdrop-blur-md bg-black/85 rounded-2xl border p-4 text-white shadow-2xl overflow-hidden transition-all duration-300`}
      style={{ borderColor: activeLayerColor.border }}
    >
      {/* Background radial gradient corresponding to the layer */}
      <div 
        className="absolute -right-12 -top-12 w-28 h-28 rounded-full blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${activeLayerColor.glow} 0%, transparent 70%)`
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2 mb-3 select-none">
        <div className="flex items-center gap-2">
          <Layers 
            className="w-4 h-4 animate-pulse" 
            style={{ color: activeLayerColor.border }}
          />
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            LITHOSPHERE LEGEND
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
            <span className={`w-1.5 h-1.5 rounded-full ${shakeAmount > 4 ? 'bg-red-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
            <span className={`text-[8px] font-mono ${shakeAmount > 4 ? 'text-red-400 font-bold' : 'text-emerald-400'}`}>
              {shakeAmount > 4 ? 'SHAKE' : 'STABLE'}
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title={isExpanded ? "Collapse Legend" : "Expand Legend"}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase block">Active Layer</span>
              <span className="text-sm font-bold tracking-tight text-white block truncate">{layerName}</span>
            </div>

            {/* Two-Column Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-zinc-900/40 p-2 rounded-lg border border-zinc-800/40">
                <span className="text-[8px] text-zinc-500 block uppercase">Est. Depth</span>
                <span 
                  className="text-sm font-bold"
                  style={{ color: activeLayerColor.border }}
                >
                  {depth} km
                </span>
              </div>
              <div className="bg-zinc-900/40 p-2 rounded-lg border border-zinc-800/40">
                <span className="text-[8px] text-zinc-500 block uppercase flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-red-400" /> Temp
                </span>
                <span className="text-xs font-bold text-white block mt-0.5">{temp}</span>
              </div>
            </div>

            {/* Stratigraphy Column & Interactive Legend */}
            <div className="space-y-1.5 bg-zinc-950/40 p-2.5 rounded-xl border border-zinc-900/50">
              <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>STRATIGRAPHIC SECTION</span>
                <span className="text-zinc-400 font-semibold">{depth} / 120 km</span>
              </div>
              
              <div className="space-y-1 relative pl-4">
                {/* Visual vertical scale path */}
                <div className="absolute left-1.5 top-2 bottom-2 w-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="w-full transition-all duration-150"
                    style={{ 
                      height: `${(depth / 120) * 100}%`,
                      backgroundImage: `linear-gradient(to bottom, ${palette.layers[0].border}, ${palette.layers[1].border}, ${palette.layers[3].border})`
                    }}
                  />
                </div>

                {strataLayers.map((layer, index) => (
                  <div
                    key={index}
                    className={`relative p-1.5 rounded-lg border text-left transition-all ${
                      layer.active 
                        ? 'shadow-md ring-1' 
                        : 'border-zinc-900 bg-zinc-950/20 opacity-40'
                    }`}
                    style={layer.active ? {
                      borderColor: layer.borderColor,
                      backgroundColor: layer.bgColor,
                      boxShadow: `0 0 10px ${layer.borderColor}20`,
                    } : {}}
                  >
                    {/* Active target cursor pointer */}
                    {layer.active && (
                      <div className="absolute left-[-16px] top-1/2 -translate-y-1/2">
                        <CircleDot 
                          className="w-3.5 h-3.5 animate-pulse" 
                          style={{ color: layer.textColor }}
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-center text-[10px] font-semibold">
                      <span style={layer.active ? { color: layer.textColor } : {}} className={layer.active ? '' : 'text-zinc-300'}>
                        {layer.name}
                      </span>
                      <span className="text-[8px] font-mono text-zinc-500">{layer.range}</span>
                    </div>
                    {layer.active && (
                      <p className="text-[8px] font-mono text-zinc-400 mt-0.5 line-clamp-1">
                        Comp: {layer.comp}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Lithic Formulae */}
            <div className="space-y-1 font-mono text-[9px] bg-zinc-950/40 p-2 rounded-xl border border-zinc-900/50">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Lithic Formula</span>
                <span className="text-zinc-300 font-semibold truncate max-w-[150px]">{chemical}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Seismic (P-Wave)</span>
                <span className="text-teal-400 font-semibold flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5" /> {seismicSpeed}
                </span>
              </div>
            </div>

            {/* Rolling Seismograph Module */}
            <div className="bg-zinc-950/60 p-2 rounded-xl border border-zinc-900 space-y-1">
              <div className="flex justify-between items-center text-[9px] font-mono">
                <span className="text-zinc-500">REAL-TIME WAVEFORM</span>
                {shakeAmount > 4 ? (
                  <span className="text-red-400 font-bold animate-pulse">COLLISION</span>
                ) : (
                  <span className="text-zinc-500">STABLE</span>
                )}
              </div>
              <canvas
                ref={seismographCanvasRef}
                width={270}
                height={34}
                className="w-full bg-zinc-950/90 rounded border border-zinc-900/80"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-between text-xs font-mono select-none"
          >
            <div>
              <span className="text-[8px] text-zinc-500 block uppercase">Explore Depth</span>
              <span 
                className="text-sm font-bold"
                style={{ color: activeLayerColor.border }}
              >
                {depth} km
              </span>
            </div>
            <div className="text-right">
              <span className="text-[8px] text-zinc-500 block uppercase">Active Zone</span>
              <span className="text-xs font-bold text-white truncate max-w-[120px] block">{layerName}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Core bottom miniature indicator bar */}
      <div className="mt-2.5 h-1 bg-zinc-900/60 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r from-teal-400 via-[#e8702a] to-amber-500`}
          style={{ width: `${ratioY * 100}%` }}
        />
      </div>
    </motion.div>
  );
}