import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Undo, Redo, Trash2, Download, Palette, Sliders, Eraser, Paintbrush, Grid, FileText, Square, RefreshCw, Check, Sparkles } from 'lucide-react';

interface PaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'en' | 'mn';
}

type BrushStyle = 'standard' | 'laser' | 'chalk' | 'seismic' | 'ribbon';
type BgStyle = 'blueprint' | 'parchment' | 'midnight' | 'overlay';

export function PaintModal({ isOpen, onClose, currentLang }: PaintModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#e8702a'); // default tectonic orange
  const [brushSize, setBrushSize] = useState(6);
  const [brushOpacity, setBrushOpacity] = useState(100);
  const [brushStyle, setBrushStyle] = useState<BrushStyle>('standard');
  const [bgStyle, setBgStyle] = useState<BgStyle>('blueprint');
  const [isEraser, setIsEraser] = useState(false);

  // Undo/Redo Stacks (Images)
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Quick preset colors matching Lithos geological theme
  const colors = [
    { name: 'Tectonic', hex: '#e8702a' },
    { name: 'Magma', hex: '#ef4444' },
    { name: 'Basalt', hex: '#f59e0b' },
    { name: 'Jade', hex: '#10b981' },
    { name: 'Abyssal', hex: '#06b6d4' },
    { name: 'Cosmic', hex: '#a855f7' },
    { name: 'Crystal', hex: '#ff007f' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Obsidian', hex: '#18181b' },
    { name: 'Bronze', hex: '#b45309' },
    { name: 'Lavender', hex: '#c084fc' }
  ];

  // Initialize and scale canvas for high DPI
  useEffect(() => {
    if (!isOpen) return;

    // Small timeout to ensure container is fully rendered and has correct dimensions
    const timer = setTimeout(() => {
      initCanvas();
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, bgStyle]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    // Get exact bounding box of the parent container
    const rect = parent.getBoundingClientRect();
    const width = rect.width || 800;
    const height = rect.height || 500;

    // Support High-DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    contextRef.current = ctx;

    // Apply selected background fill
    applyBackground(ctx, width, height);

    // Save initial blank canvas state to history
    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialData]);
    setHistoryIndex(0);
  };

  const applyBackground = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.save();
    if (bgStyle === 'blueprint') {
      // Sleek dark grid blueprint
      ctx.fillStyle = '#09090b'; // zinc-950
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(232, 112, 42, 0.05)'; // faint tectonic grid lines
      ctx.lineWidth = 1;
      const gridSize = 30;

      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    } else if (bgStyle === 'parchment') {
      // Antique cream field-notes paper
      ctx.fillStyle = '#faf6eb';
      ctx.fillRect(0, 0, w, h);

      // Subtle horizontal lined paper pattern
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.08)'; // faint brown
      ctx.lineWidth = 1;
      for (let y = 40; y < h; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      // Left vertical margin line
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)'; // red line
      ctx.beginPath();
      ctx.moveTo(50, 0);
      ctx.lineTo(50, h);
      ctx.stroke();
    } else if (bgStyle === 'midnight') {
      // Deep basalt/midnight dark slate
      ctx.fillStyle = '#030712'; // gray-950
      ctx.fillRect(0, 0, w, h);
    } else if (bgStyle === 'overlay') {
      // Transparent overlay: clear canvas so the app background shines through beautifully
      ctx.clearRect(0, 0, w, h);
    }
    ctx.restore();
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const currentImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const updatedHistory = history.slice(0, historyIndex + 1);
    
    setHistory([...updatedHistory, currentImgData]);
    setHistoryIndex(updatedHistory.length);
  };

  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const prevIndex = historyIndex - 1;
    ctx.putImageData(history[prevIndex], 0, 0);
    setHistoryIndex(prevIndex);
    playSketchSound('action');
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const nextIndex = historyIndex + 1;
    ctx.putImageData(history[nextIndex], 0, 0);
    setHistoryIndex(nextIndex);
    playSketchSound('action');
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    // Get scaled size
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.clearRect(0, 0, w, h);
    applyBackground(ctx, w, h);
    saveToHistory();
    playSketchSound('clear');
  };

  // Drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    let clientX: number;
    let clientY: number;

    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);

    // Setup brush properties based on selected options
    ctx.strokeStyle = isEraser ? (bgStyle === 'blueprint' ? '#09090b' : bgStyle === 'parchment' ? '#faf6eb' : bgStyle === 'midnight' ? '#030712' : 'rgba(0,0,0,0)') : brushColor;
    ctx.lineWidth = brushSize;
    ctx.globalAlpha = isEraser ? 1.0 : brushOpacity / 100;

    // Apply special brush styles
    if (!isEraser) {
      if (brushStyle === 'laser') {
        ctx.shadowBlur = brushSize * 1.5;
        ctx.shadowColor = brushColor;
      } else if (brushStyle === 'chalk') {
        ctx.shadowBlur = 1;
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
      } else {
        ctx.shadowBlur = 0;
      }
    } else {
      ctx.shadowBlur = 0;
    }

    setIsDrawing(true);
    playSketchSound('draw');
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    let clientX: number;
    let clientY: number;

    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      // Prevent default scrolling behaviour on mobile touches
      if (e.cancelable) e.preventDefault();
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (brushStyle === 'seismic' && !isEraser) {
      // Draws a jagged seismic/fault-line style jagged vibration line
      const jitterX = (Math.random() - 0.5) * brushSize * 1.2;
      const jitterY = (Math.random() - 0.5) * brushSize * 1.2;
      ctx.lineTo(x + jitterX, y + jitterY);
      ctx.stroke();
    } else if (brushStyle === 'ribbon' && !isEraser) {
      // Multi-line parallel strokes mimicking sedimentary bands
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.save();
      ctx.strokeStyle = brushColor;
      ctx.globalAlpha = (brushOpacity / 100) * 0.4;
      ctx.lineWidth = brushSize * 0.4;
      
      ctx.beginPath();
      ctx.moveTo(x - brushSize * 1.5, y - brushSize * 1.5);
      ctx.lineTo(x - brushSize * 1.5, y - brushSize * 1.5);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + brushSize * 1.5, y + brushSize * 1.5);
      ctx.lineTo(x + brushSize * 1.5, y + brushSize * 1.5);
      ctx.stroke();
      ctx.restore();
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary canvas to apply watermark
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // Draw main drawing
    tempCtx.drawImage(canvas, 0, 0);

    // Apply elegant signature/watermark
    tempCtx.save();
    tempCtx.font = 'bold 24px "Playfair Display", Georgia, serif';
    tempCtx.fillStyle = bgStyle === 'parchment' ? 'rgba(115, 115, 115, 0.25)' : 'rgba(255, 255, 255, 0.25)';
    tempCtx.textAlign = 'right';
    tempCtx.fillText('Lithos Sketchbook', tempCanvas.width - 30, tempCanvas.height - 50);

    tempCtx.font = '14px monospace';
    tempCtx.fillStyle = bgStyle === 'parchment' ? 'rgba(115, 115, 115, 0.18)' : 'rgba(255, 255, 255, 0.18)';
    tempCtx.fillText('LITHOSPHERE EXPLORATION RECORD • STATISTICAL BLUEPRINT', tempCanvas.width - 30, tempCanvas.height - 25);
    tempCtx.restore();

    const link = document.createElement('a');
    link.download = `lithos-field-sketch-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
    playSketchSound('download');
  };

  // Synthesize realistic drawing/action sounds to make the drawing interface alive
  const playSketchSound = (type: 'draw' | 'action' | 'clear' | 'download') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      if (type === 'action') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.setValueAtTime(440, now + 0.05);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'clear') {
        // Soft sweep representing erasing/clearing the slate
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.3);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'download') {
        // High-tech ding
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, now); // C5
        osc.frequency.setValueAtTime(1046, now + 0.1); // C6
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'draw') {
        // Subtle dry chalk noise
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120 + Math.random() * 80, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {
      // Sound fail-safe
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 select-none">
          {/* Deep blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Core Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="relative w-full max-w-5xl h-[85vh] bg-zinc-950 border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-2xl z-10"
          >
            {/* Header */}
            <div className="px-6 py-4.5 bg-zinc-900/60 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#e8702a] to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/15">
                  <Paintbrush className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-playfair font-semibold text-lg flex items-center gap-2">
                    {currentLang === 'en' ? 'Lithos Field Sketchbook' : 'Литос хээрийн зургийн дэвтэр'}
                    <span className="text-[10px] font-mono tracking-widest bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/15 uppercase">
                      PRO TOOL
                    </span>
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                    {currentLang === 'en' 
                      ? 'Interactive geological sketching & structural fault-line diagram design suite' 
                      : 'Интерактив геологийн зураглал ба хагарлын бүтцийн зураг төслийн иж бүрдэл'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Application Interface (Split Toolbar & Canvas Grid) */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Left Settings & Controls Sidebar */}
              <div className="w-full md:w-72 bg-zinc-950/50 border-r border-white/5 p-5 flex flex-col gap-5 overflow-y-auto">
                
                {/* 1. Brush Style Mode */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-orange-500" />
                    {currentLang === 'en' ? 'Brush Style' : 'Бийрийн загвар'}
                  </span>
                  <div className="grid grid-cols-1 gap-1">
                    {[
                      { id: 'standard', name: currentLang === 'en' ? 'Geological Pen' : 'Геологийн үзгэн', icon: Paintbrush, desc: 'Sharp, solid and authentic lines' },
                      { id: 'laser', name: currentLang === 'en' ? 'Laser Core Glow' : 'Гэрэлтэгч лазер', icon: Sparkles, desc: 'Highly fluorescent glowing trace' },
                      { id: 'chalk', name: currentLang === 'en' ? 'Sedimentary Chalk' : 'Тунамал шохойн', icon: FileText, desc: 'Rough natural stone chalk feel' },
                      { id: 'seismic', name: currentLang === 'en' ? 'Seismic Fault' : 'Сейсмик хагарал', icon: RefreshCw, desc: 'Jagged, tectonic shift simulator' },
                      { id: 'ribbon', name: currentLang === 'en' ? 'Strata Ribbon' : 'Давхаргат тууз', icon: Square, desc: 'Parallel multi-layer geological bands' }
                    ].map((style) => {
                      const Icon = style.icon;
                      return (
                        <button
                          key={style.id}
                          onClick={() => {
                            setBrushStyle(style.id as BrushStyle);
                            setIsEraser(false);
                          }}
                          className={`flex flex-col text-left px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer ${
                            brushStyle === style.id && !isEraser
                              ? 'bg-orange-500/10 border-orange-500/30 text-white'
                              : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-3.5 h-3.5 ${brushStyle === style.id && !isEraser ? 'text-orange-500' : 'text-zinc-500'}`} />
                            <span className="text-xs font-semibold">{style.name}</span>
                          </div>
                          <span className="text-[9px] text-zinc-500 mt-1 pl-5 leading-normal">{style.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Color Palette */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-orange-500" />
                    {currentLang === 'en' ? 'Geological Palette' : 'Геологийн палитр'}
                  </span>
                  <div className="grid grid-cols-4 gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setBrushColor(c.hex);
                          setIsEraser(false);
                        }}
                        className={`w-10 h-10 rounded-xl border relative transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {brushColor === c.hex && !isEraser && (
                          <div className="w-5 h-5 rounded-lg bg-black/45 flex items-center justify-center border border-white/15">
                            <Check className="w-3.5 h-3.5 text-white font-bold" />
                          </div>
                        )}
                      </button>
                    ))}
                    
                    {/* Custom Color Input */}
                    <div className="relative w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden flex items-center justify-center cursor-pointer hover:border-white/30">
                      <input
                        type="color"
                        value={brushColor}
                        onChange={(e) => {
                          setBrushColor(e.target.value);
                          setIsEraser(false);
                        }}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      />
                      <Palette className="w-4 h-4 text-zinc-400" />
                    </div>
                  </div>
                </div>

                {/* 3. Sliders for Brush Size & Opacity */}
                <div className="flex flex-col gap-4">
                  {/* Size */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      <span>{currentLang === 'en' ? 'Brush Size' : 'Хэмжээ'}</span>
                      <span className="text-orange-400 font-bold">{brushSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={brushSize}
                      onChange={(e) => setBrushSize(parseInt(e.target.value))}
                      className="w-full accent-orange-500 bg-zinc-800 rounded-lg appearance-none h-1 cursor-pointer"
                    />
                  </div>

                  {/* Opacity */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      <span>{currentLang === 'en' ? 'Brush Opacity' : 'Үл үзэгдэх байдал'}</span>
                      <span className="text-orange-400 font-bold">{brushOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={brushOpacity}
                      onChange={(e) => setBrushOpacity(parseInt(e.target.value))}
                      className="w-full accent-orange-500 bg-zinc-800 rounded-lg appearance-none h-1 cursor-pointer"
                    />
                  </div>
                </div>

                {/* 4. Canvas Background Preset Selection */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Grid className="w-3.5 h-3.5 text-orange-500" />
                    {currentLang === 'en' ? 'Field Canvas Background' : 'Зургийн арын дэвсгэр'}
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'blueprint', name: 'Blueprint', icon: Grid },
                      { id: 'parchment', name: 'Field Diary', icon: FileText },
                      { id: 'midnight', name: 'Deep Basalt', icon: Square },
                      { id: 'overlay', name: 'Transparent', icon: Trash2 }
                    ].map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => setBgStyle(bg.id as BgStyle)}
                        className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                          bgStyle === bg.id
                            ? 'bg-orange-500/10 border-orange-500/30 text-white'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <bg.icon className="w-3.5 h-3.5 opacity-60" />
                        <span>{bg.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Center Sketch Canvas Workspace */}
              <div className="flex-1 bg-zinc-900 flex flex-col relative overflow-hidden">
                
                {/* Upper Active Actions Strip */}
                <div className="px-4 py-3 bg-zinc-950/60 border-b border-white/5 flex items-center justify-between z-10 flex-wrap gap-2.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEraser(!isEraser)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                        isEraser
                          ? 'bg-red-500/10 border-red-500/30 text-red-400 shadow-sm shadow-red-500/5'
                          : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                      }`}
                      title={currentLang === 'en' ? 'Eraser Tool' : 'Баллуур'}
                    >
                      <Eraser className="w-3.5 h-3.5" />
                      <span>{currentLang === 'en' ? 'Eraser' : 'Баллуур'}</span>
                    </button>

                    <button
                      onClick={handleClear}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 text-zinc-400 text-xs font-semibold transition-all cursor-pointer"
                      title={currentLang === 'en' ? 'Wipe Slate Clean' : 'Зургийг бүрэн арилгах'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{currentLang === 'en' ? 'Clear Canvas' : 'Цэвэрлэх'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleUndo}
                      disabled={historyIndex <= 0}
                      className={`w-8.5 h-8.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                        historyIndex <= 0
                          ? 'bg-zinc-800/20 border-zinc-800 text-zinc-600 cursor-not-allowed'
                          : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                      }`}
                      title="Undo (Ctrl+Z)"
                    >
                      <Undo className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleRedo}
                      disabled={historyIndex >= history.length - 1}
                      className={`w-8.5 h-8.5 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                        historyIndex >= history.length - 1
                          ? 'bg-zinc-800/20 border-zinc-800 text-zinc-600 cursor-not-allowed'
                          : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                      }`}
                      title="Redo (Ctrl+Y)"
                    >
                      <Redo className="w-3.5 h-3.5" />
                    </button>

                    <div className="h-5 w-[1px] bg-white/10 mx-1" />

                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-1.5 bg-[#e8702a] hover:bg-[#d2611f] text-white border border-[#e8702a]/10 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02] cursor-pointer shadow-md shadow-orange-500/10"
                      title={currentLang === 'en' ? 'Export field drawing as image' : 'Зургийг татаж авах'}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{currentLang === 'en' ? 'Export Diagram' : 'Экспортлох'}</span>
                    </button>
                  </div>
                </div>

                {/* The drawing canvas container */}
                <div className="flex-1 w-full h-full relative cursor-crosshair">
                  {bgStyle === 'overlay' && (
                    <div className="absolute inset-0 bg-transparent pointer-events-none flex items-center justify-center text-center px-6">
                      <div className="bg-zinc-950/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-sm">
                        <p className="text-xs text-zinc-300 font-medium">
                          {currentLang === 'en' 
                            ? '✏️ Drawing directly over the Lithosphere layout! Click and drag to create sketches.' 
                            : '✏️ Литосфер арын хэсэг дээр шууд зурж байна! Хүссэнээрээ зурж тэмдэглэл үлдээгээрэй.'}
                        </p>
                      </div>
                    </div>
                  )}
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="absolute inset-0 z-0 touch-none block"
                  />
                </div>

                {/* Bottom Stats/Tips Bar */}
                <div className="px-5 py-2.5 bg-zinc-950/40 border-t border-white/5 text-[10px] font-mono text-zinc-400 flex justify-between items-center select-none flex-wrap gap-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {currentLang === 'en' ? 'CANVAS RESOLUTION: FULL HD DETECTED' : 'КАНВАС: БҮРЭН HD ТОДОРХОЙЛОВ'}
                  </span>
                  <span>
                    {currentLang === 'en' 
                      ? 'Tip: Switch background to Parchment for realistic geological diary diagrams!' 
                      : 'Зөвлөгөө: Илүү бодит геологийн тэмдэглэл хөтлөхийг хүсвэл Хээрийн дэвтэр арын дэвсгэрийг сонгоорой.'}
                  </span>
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
