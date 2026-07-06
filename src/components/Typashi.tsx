import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trophy, 
  Rocket, 
  Car, 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Play, 
  Flag,
  Gauge,
  AlertTriangle,
  Flame,
  Globe,
  Award
} from 'lucide-react';

interface TypashiProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TypingHistory {
  wpm: number;
  accuracy: number;
  errors: number;
  vehicle: string;
  lang: 'mn' | 'en';
  date: string;
}

// Sample typing texts in Mongolian and English
const TYPING_TEXTS = {
  mn: [
    "Эх дэлхийн царцдас давхарга нь сая сая жилийн түүх болон геологийн өөрчлөлтийг өөртөө хадгалан байдаг.",
    "Тайпаши бол хурууны хурд болон анхаарал төвлөрөлтийг шалгах хамгийн сонирхолтой бичих уралдаан юм.",
    "Монгол орны үзэсгэлэнт уул нурууд, говь хангай хосолсон нутагт эртний үлэг гүрвэлийн олон олдвор байдаг.",
    "Амжилтанд хүрэхийн тулд өдөр бүр тууштай суралцаж, өөрийнхөө хил хязгаарыг давж урагшлах хэрэгтэй.",
    "Хадан дээр сийлсэн эртний сүг зураг, олдворууд нь хүн төрөлхтний соёл иргэншлийн үнэт өв билээ.",
    "Уралдааны замд таны хөлөглөсөн хурдан морь эсвэл хүчирхэг пуужин барианы шугам руу хурдлан одно."
  ],
  en: [
    "The geological layers of the Earth record billions of years of history and profound crustal changes.",
    "Typashi is a fast-paced speed typing race designed to test your finger dexterity and absolute focus.",
    "Ancient tectonic plates are constantly moving beneath our feet, shaping mountains and deep oceanic trenches.",
    "Consistent practice and dedication are the true secrets to mastering any skill and breaking records.",
    "Sedimentary rocks form slowly over millions of years by the accumulation of minerals and organic particles.",
    "May your fingers fly across the keys like a rocket soaring through the cosmos to reach the final finish line."
  ]
};

export function Typashi({ isOpen, onClose }: TypashiProps) {
  const [lang, setLang] = useState<'mn' | 'en'>('mn');
  const [vehicle, setVehicle] = useState<'car' | 'rocket' | 'horse'>('car');
  
  // Game states: 'lobby' | 'playing' | 'results'
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'results'>('lobby');
  
  const [targetText, setTargetText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [errorsCount, setErrorsCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Leaderboard / Local History state
  const [history, setHistory] = useState<TypingHistory[]>([]);
  
  // Audio context reference
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Load History from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('typashi_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse Typashi history:', e);
      }
    }
  }, []);

  // Sync elapsed timer when game is active
  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        if (startTime) {
          setElapsedTime(Math.max(1, Math.floor((Date.now() - startTime) / 1000)));
        }
      }, 1000);
      timerIntervalRef.current = interval;
      return () => clearInterval(interval);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  }, [gameState, startTime]);

  // Focus input on game start
  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [gameState]);

  // Sound Engine
  const playSound = (type: 'keypress' | 'error' | 'finish' | 'countdown') => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      if (type === 'keypress') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'error') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(80, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'finish') {
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        gain.connect(ctx.destination);

        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major scale arpeggio
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          osc.connect(gain);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.2);
        });
      } else if (type === 'countdown') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      console.warn('AudioContext failed:', e);
    }
  };

  const selectRandomText = (language: 'mn' | 'en') => {
    const list = TYPING_TEXTS[language];
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  };

  const startRace = () => {
    const text = selectRandomText(lang);
    setTargetText(text);
    setInputValue('');
    setElapsedTime(0);
    setErrorsCount(0);
    setCorrectCount(0);
    setTypedChars(0);
    setStartTime(Date.now());
    setGameState('playing');
  };

  // Main typing handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const currentLength = val.length;
    
    // Check key feedback and typos
    if (currentLength > inputValue.length) {
      // User typed a character
      const typedChar = val[currentLength - 1];
      const targetChar = targetText[currentLength - 1];
      
      if (typedChar === targetChar) {
        playSound('keypress');
        setCorrectCount(prev => prev + 1);
      } else {
        playSound('error');
        setErrorsCount(prev => prev + 1);
      }
    }
    
    setTypedChars(Math.max(val.length, typedChars));
    setInputValue(val);

    // Check if finished
    if (val === targetText) {
      finishRace();
    }
  };

  const finishRace = () => {
    playSound('finish');
    const endTime = Date.now();
    const durationMs = endTime - (startTime || endTime);
    const durationSeconds = Math.max(1, Math.round(durationMs / 1000));
    
    // Calculate final WPM (standard definition: (correct chars / 5) / minutes)
    const minutes = durationSeconds / 60;
    const finalWPM = Math.round((targetText.length / 5) / minutes) || 12; // fallback at least 12
    const finalAccuracy = Math.max(0, Math.min(100, Math.round(((targetText.length - errorsCount) / targetText.length) * 100)));

    const newRecord: TypingHistory = {
      wpm: finalWPM,
      accuracy: finalAccuracy,
      errors: errorsCount,
      vehicle: vehicle,
      lang: lang,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [newRecord, ...history].slice(0, 15);
    setHistory(updatedHistory);
    localStorage.setItem('typashi_history', JSON.stringify(updatedHistory));
    
    setElapsedTime(durationSeconds);
    setGameState('results');
  };

  const resetToLobby = () => {
    setGameState('lobby');
  };

  // Progress percentage (how far the horse/rocket/car has moved)
  const currentProgress = targetText.length > 0 ? (inputValue.length / targetText.length) * 100 : 0;

  // Render character colored spans
  const renderTextSpans = () => {
    return targetText.split('').map((char, index) => {
      let colorClass = 'text-zinc-500';
      let bgClass = '';
      
      if (index < inputValue.length) {
        if (inputValue[index] === char) {
          colorClass = 'text-emerald-400 font-semibold';
        } else {
          colorClass = 'text-red-500 font-bold';
          bgClass = 'bg-red-500/20 underline decoration-red-500';
        }
      } else if (index === inputValue.length) {
        bgClass = 'bg-zinc-800 border-b-2 border-[#e8702a] text-white animate-pulse';
      }

      return (
        <span key={index} className={`${colorClass} ${bgClass} transition-colors duration-100 text-lg sm:text-xl font-mono`}>
          {char}
        </span>
      );
    });
  };

  // Icon for racing
  const getVehicleIcon = (type: 'car' | 'rocket' | 'horse', sizeClass = "w-10 h-10") => {
    switch (type) {
      case 'car':
        return <span className={`${sizeClass} text-2xl flex items-center justify-center`}>🏎️</span>;
      case 'rocket':
        return <span className={`${sizeClass} text-2xl flex items-center justify-center`}>🚀</span>;
      case 'horse':
        return <span className={`${sizeClass} text-2xl flex items-center justify-center`}>🐎</span>;
    }
  };

  const getVehicleLabel = (type: 'car' | 'rocket' | 'horse') => {
    switch (type) {
      case 'car': return lang === 'mn' ? 'Машин' : 'Race Car';
      case 'rocket': return lang === 'mn' ? 'Пуужин' : 'Rocket';
      case 'horse': return lang === 'mn' ? 'Хурдан Морь' : 'Steed';
    }
  };

  // Calc live metrics for dynamic display during racing
  const liveMinutes = Math.max(1, elapsedTime) / 60;
  const liveWpm = Math.round((inputValue.length / 5) / liveMinutes);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6" id="typashi-root-modal">
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-zinc-950 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[700px] max-h-[92vh] z-10 text-white"
          >
            {/* Glowing neon top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-[#e8702a]" />

            {/* Header */}
            <div className="p-5 border-b border-zinc-900 bg-zinc-900/40 flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shadow-md">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-playfair italic text-2xl font-bold flex items-center gap-2">
                    Typashi <span className="not-italic text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-mono font-bold tracking-wider uppercase">SPEED RACER</span>
                  </h3>
                  <p className="text-xs text-zinc-400">Хурууны хурд уралдуулах талбар</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Sound Toggle */}
                <button
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    playSound('keypress');
                  }}
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors rounded-full border border-zinc-800 cursor-pointer"
                  title={soundEnabled ? "Дуу асаалттай" : "Дуугүй"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
                </button>
                
                {/* Exit Button */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-900 bg-zinc-900/50 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Game Panel Screens */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col justify-between relative">
              
              <AnimatePresence mode="wait">
                {/* SCREEN 1: LOBBY */}
                {gameState === 'lobby' && (
                  <motion.div
                    key="lobby"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex-1 flex flex-col justify-between h-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Selection Box: 7 cols */}
                      <div className="md:col-span-7 space-y-5">
                        <div>
                          <h4 className="text-xl font-bold text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-400" />
                            Уралдаанд бэлдэх үе
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-1">
                            Уралдах хэл болон хурдны унаагаа сонгоод эхлэх товчийг дарна уу. Алдаагүй хурдан бичих тусам таны сонгосон унаа урагшилна!
                          </p>
                        </div>

                        {/* Language Selector */}
                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">1. Хэл сонгох (Select Language)</label>
                          <div className="flex gap-2 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
                            <button
                              onClick={() => setLang('mn')}
                              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                lang === 'mn'
                                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                              }`}
                            >
                              🇲🇳 Монгол Хэл
                            </button>
                            <button
                              onClick={() => setLang('en')}
                              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                lang === 'en'
                                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                              }`}
                            >
                              🇺🇸 English Text
                            </button>
                          </div>
                        </div>

                        {/* Vehicle Selector */}
                        <div className="space-y-2">
                          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">2. Унаа сонгох (Select Vehicle)</label>
                          <div className="grid grid-cols-3 gap-3">
                            {(['car', 'rocket', 'horse'] as const).map((v) => (
                              <button
                                key={v}
                                onClick={() => {
                                  setVehicle(v);
                                  playSound('keypress');
                                }}
                                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer ${
                                  vehicle === v
                                    ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/5'
                                    : 'bg-zinc-900/40 border-zinc-900 text-zinc-400 hover:bg-zinc-900/80 hover:border-zinc-800'
                                }`}
                              >
                                {getVehicleIcon(v, "w-12 h-12")}
                                <span className="text-xs font-semibold">{getVehicleLabel(v)}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Leaderboard / Run History: 5 cols */}
                      <div className="md:col-span-5 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-4 flex flex-col h-[350px]">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 border-b border-zinc-800 pb-2 mb-3">
                          <Trophy className="w-4 h-4 text-amber-400" /> Миний Амжилтууд
                        </span>

                        {history.length === 0 ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-zinc-600 font-mono text-xs">
                            <Award className="w-8 h-8 opacity-25 mb-2" />
                            <p>Одоогоор уралдааны түүх байхгүй байна. Анхны уралдаанаа эхлүүлээрэй!</p>
                          </div>
                        ) : (
                          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar text-xs font-mono">
                            {history.slice(0, 5).map((entry, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/60 border border-zinc-900"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{getVehicleIcon(entry.vehicle as any, "w-6 h-6")}</span>
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-white font-bold">{entry.wpm} WPM</span>
                                      <span className="text-[9px] bg-zinc-900 text-zinc-400 px-1 py-0.2 rounded font-sans">
                                        {entry.lang === 'mn' ? 'МН' : 'EN'}
                                      </span>
                                    </div>
                                    <span className="text-[9px] text-zinc-500 block">{entry.date}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-emerald-400 font-semibold">{entry.accuracy}% зөв</div>
                                  <div className="text-[10px] text-red-400">{entry.errors} алдаа</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-900">
                      <button
                        onClick={startRace}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-101 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-99 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span className="uppercase tracking-wider">Уралдааныг эхлүүлэх</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* SCREEN 2: ACTIVE RACING */}
                {gameState === 'playing' && (
                  <motion.div
                    key="playing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-between h-full"
                  >
                    {/* Live track card: beautiful progress meter */}
                    <div className="bg-zinc-900/50 border border-zinc-900 rounded-2xl p-5 mb-5 relative overflow-hidden select-none">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                        <Flag className="w-3.5 h-3.5 text-[#e8702a]" /> Уралдааны Зам
                      </span>

                      {/* Race Track Line */}
                      <div className="h-16 relative flex items-center mt-3">
                        {/* Background track lane */}
                        <div className="absolute left-0 right-0 h-1 bg-zinc-800 rounded-full" />
                        {/* Finished track lane highlighter */}
                        <div 
                          className="absolute left-0 h-1 bg-emerald-500 rounded-full transition-all duration-150"
                          style={{ width: `${currentProgress}%` }}
                        />

                        {/* Finish Flag banner */}
                        <div className="absolute right-0 flex flex-col items-center">
                          <span className="text-xl select-none">🏁</span>
                          <span className="text-[9px] font-mono text-zinc-500">FINISH</span>
                        </div>

                        {/* Moving Vehicle */}
                        <motion.div
                          className="absolute transition-all duration-150"
                          style={{ left: `calc(${currentProgress}% - 20px)` }}
                        >
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ y: [-1, 2, -1] }}
                              transition={{ repeat: Infinity, duration: 0.6 }}
                            >
                              {getVehicleIcon(vehicle, "w-10 h-10")}
                            </motion.div>
                            <span className="text-[8px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-1 py-0.2 rounded shadow">
                              Та
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Scrolling Display Text Box */}
                    <div className="flex-1 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 flex items-center justify-center text-center relative overflow-hidden">
                      <div className="absolute top-2 left-3 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        Зорилтот текст (Target text)
                      </div>
                      <div className="leading-relaxed select-none max-w-2xl">
                        {renderTextSpans()}
                      </div>
                    </div>

                    {/* Inputs and Live Stats */}
                    <div className="mt-5 space-y-4">
                      {/* Stats bar */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                        <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80">
                          <span className="text-zinc-500 block text-[10px] uppercase">Хурд (Live WPM)</span>
                          <span className="text-white text-lg font-bold">{liveWpm || 0}</span>
                        </div>
                        <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80">
                          <span className="text-zinc-500 block text-[10px] uppercase">Алдаа (Errors)</span>
                          <span className="text-red-400 text-lg font-bold">{errorsCount}</span>
                        </div>
                        <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80">
                          <span className="text-zinc-500 block text-[10px] uppercase">Хугацаа (Time)</span>
                          <span className="text-amber-400 text-lg font-bold">{elapsedTime}с</span>
                        </div>
                      </div>

                      {/* Main input for typing */}
                      <div className="relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={inputValue}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900 border-2 border-zinc-800 hover:border-emerald-500/50 focus:border-emerald-500 rounded-xl px-5 py-3.5 text-base text-white placeholder-zinc-600 focus:outline-none transition-colors font-mono"
                          placeholder="Текстийг яг ижилхэн хуулж бичнэ үү..."
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                        />
                        {/* Interactive floating indicator */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-500">
                          {inputValue.length} / {targetText.length}
                        </div>
                      </div>

                      {/* Reset/Cancel row */}
                      <div className="flex justify-between items-center text-xs font-mono pt-1 text-zinc-500">
                        <span>Алдаа гарвал ухрахгүй, зөв бичиж үргэлжлүүлнэ үү.</span>
                        <button
                          onClick={resetToLobby}
                          className="text-[#e8702a] hover:text-orange-400 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Хөгжлийг цуцлах
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SCREEN 3: RESULTS SCREEN */}
                {gameState === 'results' && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex-1 flex flex-col justify-between h-full"
                  >
                    <div className="space-y-5 text-center">
                      <div className="inline-flex w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 items-center justify-center text-emerald-400 text-3xl shadow-xl shadow-emerald-500/10">
                        🏁
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold tracking-tight text-white font-playfair italic">
                          Барианд амжилттай орлоо! 🎉
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                          Уралдаан дуусч дүн гарлаа. Та дараах үзүүлэлттэй уралдсан байна:
                        </p>
                      </div>

                      {/* Stats Bento Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2 select-none">
                        {/* WPM */}
                        <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 text-center relative overflow-hidden group">
                          <div className="absolute -right-2 -bottom-2 opacity-5 text-emerald-400 text-5xl">⚡</div>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider">Минут дахь үг (WPM)</span>
                          <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 block mt-1">
                            {Math.round((targetText.length / 5) / (elapsedTime / 60)) || 12}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-400">үг / минут</span>
                        </div>

                        {/* ACCURACY */}
                        <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 text-center relative overflow-hidden">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider">Нарийвчлал (Accuracy)</span>
                          <span className="text-3xl sm:text-4xl font-extrabold text-teal-400 block mt-1">
                            {Math.max(0, Math.min(100, Math.round(((targetText.length - errorsCount) / targetText.length) * 100)))}%
                          </span>
                          <span className="text-[9px] font-mono text-zinc-400">зөв тэмдэгтүүд</span>
                        </div>

                        {/* TOTAL ERRORS */}
                        <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 text-center relative overflow-hidden">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider">Алдааны Тоо (Errors)</span>
                          <span className="text-3xl sm:text-4xl font-extrabold text-red-400 block mt-1">
                            {errorsCount}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-400">удаа буруу дарсан</span>
                        </div>

                        {/* TIMING */}
                        <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 text-center relative overflow-hidden">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider">Нийт хугацаа (Duration)</span>
                          <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 block mt-1">
                            {elapsedTime}с
                          </span>
                          <span className="text-[9px] font-mono text-zinc-400">секунд</span>
                        </div>
                      </div>

                      {/* Display comparison with average */}
                      <div className="max-w-md mx-auto bg-zinc-900/30 border border-zinc-900 rounded-xl p-3 text-xs text-zinc-400 font-mono">
                        {errorsCount === 0 ? (
                          <span className="text-emerald-400 flex items-center justify-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> Гайхалтай! Та ямар ч алдаа гаргалгүй төгс бичлээ!
                          </span>
                        ) : errorsCount < 4 ? (
                          <span className="text-teal-400">Маш цэвэрхэн бичлээ! Алдаа маш бага байна.</span>
                        ) : (
                          <span>Сайн байна, гэхдээ алдааг багасгавал хурд илүү нэмэгдэнэ шүү!</span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-zinc-900 pt-5">
                      <button
                        onClick={resetToLobby}
                        className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 rounded-xl border border-zinc-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4 text-emerald-400" />
                        <span>Лобби руу буцах</span>
                      </button>

                      <button
                        onClick={startRace}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-all hover:scale-101 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-99 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Дахин тоглох</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
