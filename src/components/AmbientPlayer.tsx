/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc, SkipForward, Plus, Upload, Link as LinkIcon, X, Settings, Wind, Sliders, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string | null;
}

interface AmbientPlayerProps {
  shakeAmt?: number;
  cursorPos?: { x: number; y: number };
}

const DEFAULT_TRACKS: Track[] = [
  {
    id: 'suno_anthem',
    title: 'Suno AI Soundtrack',
    artist: 'Suno Generative Audio',
    url: 'https://cdn1.suno.ai/dEKgXTzZgHrG1dOB.mp3',
  },
  {
    id: 'gothic_time',
    title: 'Echoes of Deep Time',
    artist: 'Lithos Cinematic Anthem',
    url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c8/Kevin_MacLeod_-_Impact_Prelude.ogg/Kevin_MacLeod_-_Impact_Prelude.ogg.mp3',
  },
  {
    id: 'synth',
    title: 'Lithos Resonance',
    artist: 'Deep Earth Generative Drone',
    url: null, // Uses Web Audio API
  },
  {
    id: 'haze',
    title: 'Stratigraphic Flow',
    artist: 'Ambient Field Recording',
    url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Kevin_MacLeod_-_Deep_Haze.ogg/Kevin_MacLeod_-_Deep_Haze.ogg.mp3',
  },
  {
    id: 'fluid',
    title: 'Magma Chamber Drift',
    artist: 'Deep Time Soundscape',
    url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7b/Kevin_MacLeod_-_Fluidscape.ogg/Kevin_MacLeod_-_Fluidscape.ogg.mp3',
  },
];

export function AmbientPlayer({ shakeAmt = 0, cursorPos }: AmbientPlayerProps) {
  const [tracks, setTracks] = useState<Track[]>(DEFAULT_TRACKS);
  const [currentTrackIdx, setCurrentTrackIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // Auto play first song
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customUrl, setCustomUrl] = useState<string>('');

  // Audio settings control states
  const [musicVolume, setMusicVolume] = useState<number>(0.5);
  const [rumbleVolume, setRumbleVolume] = useState<number>(0.6);
  const [grindVolume, setGrindVolume] = useState<number>(0.5);
  const [windVolume, setWindVolume] = useState<number>(0.4);

  const [isMusicEnabled, setIsMusicEnabled] = useState<boolean>(true);
  const [isRumbleEnabled, setIsRumbleEnabled] = useState<boolean>(true);
  const [isGrindEnabled, setIsGrindEnabled] = useState<boolean>(true);
  const [isWindEnabled, setIsWindEnabled] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    gain: GainNode;
    filter: BiquadFilterNode;
  } | null>(null);

  // Dedicated nodes for ground rumble, mouse grinding, and whistling winds
  const rumbleOscRef = useRef<OscillatorNode | null>(null);
  const rumbleGainNodeRef = useRef<GainNode | null>(null);
  const grindGainNodeRef = useRef<GainNode | null>(null);
  const windGainNodeRef = useRef<GainNode | null>(null);
  const windFilterNodeRef = useRef<BiquadFilterNode | null>(null);

  const prevCursor = useRef({ x: -999, y: -999 });
  const currentTrack = tracks[currentTrackIdx] || tracks[0];

  // Helper to initialize tectonic & wind audio effects
  const initTectonicAudio = (ctx: AudioContext) => {
    if (rumbleGainNodeRef.current && grindGainNodeRef.current && windGainNodeRef.current) return;

    try {
      // 1. Ground Rumble (Sub-bass triangle wave filter sweep)
      if (!rumbleGainNodeRef.current) {
        const rumbleOsc = ctx.createOscillator();
        const rumbleFilter = ctx.createBiquadFilter();
        const rumbleGain = ctx.createGain();

        rumbleOsc.type = 'triangle';
        rumbleOsc.frequency.setValueAtTime(32, ctx.currentTime); // Low 32Hz rumble

        rumbleFilter.type = 'lowpass';
        rumbleFilter.frequency.setValueAtTime(80, ctx.currentTime);
        rumbleFilter.Q.setValueAtTime(4, ctx.currentTime);

        rumbleGain.gain.setValueAtTime(0, ctx.currentTime);

        rumbleOsc.connect(rumbleFilter);
        rumbleFilter.connect(rumbleGain);
        rumbleGain.connect(ctx.destination);
        rumbleOsc.start();

        rumbleOscRef.current = rumbleOsc;
        rumbleGainNodeRef.current = rumbleGain;
      }

      // 2. Grinding stones (Bandpassed white noise loop)
      if (!grindGainNodeRef.current) {
        const bufferSize = ctx.sampleRate * 1.5;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        const grindFilter = ctx.createBiquadFilter();
        const grindGain = ctx.createGain();

        grindFilter.type = 'bandpass';
        grindFilter.frequency.setValueAtTime(450, ctx.currentTime);
        grindFilter.Q.setValueAtTime(2.5, ctx.currentTime);

        grindGain.gain.setValueAtTime(0, ctx.currentTime);

        noiseSource.connect(grindFilter);
        grindFilter.connect(grindGain);
        grindGain.connect(ctx.destination);
        noiseSource.start();

        grindGainNodeRef.current = grindGain;
      }

      // 3. Subterranean Whistling Cave Wind (Dynamic bandpass filter noise sweep)
      if (!windGainNodeRef.current) {
        const windBufferSize = ctx.sampleRate * 2.0;
        const windBuffer = ctx.createBuffer(1, windBufferSize, ctx.sampleRate);
        const windData = windBuffer.getChannelData(0);
        for (let i = 0; i < windBufferSize; i++) {
          windData[i] = Math.random() * 2 - 1;
        }

        const windSource = ctx.createBufferSource();
        windSource.buffer = windBuffer;
        windSource.loop = true;

        const windFilter = ctx.createBiquadFilter();
        const windGain = ctx.createGain();

        windFilter.type = 'bandpass';
        windFilter.frequency.setValueAtTime(320, ctx.currentTime);
        windFilter.Q.setValueAtTime(6.0, ctx.currentTime); // high Q whistling howl

        windGain.gain.setValueAtTime(0, ctx.currentTime);

        windSource.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(ctx.destination);
        windSource.start();

        windFilterNodeRef.current = windFilter;
        windGainNodeRef.current = windGain;
      }
    } catch (err) {
      console.warn('Failed to initialize tectonic/wind audio nodes', err);
    }
  };

  // Slowly and organically sweep/modulate whistling cave wind frequency
  useEffect(() => {
    let animId: number;
    const modulateWind = () => {
      if (windFilterNodeRef.current && audioCtxRef.current) {
        const t = audioCtxRef.current.currentTime;
        // Gust sweep frequency oscillates organically
        const freq = 320 + Math.sin(t * 0.35) * 140 + Math.cos(t * 0.8) * 50;
        windFilterNodeRef.current.frequency.setValueAtTime(freq, t);
      }
      animId = requestAnimationFrame(modulateWind);
    };
    animId = requestAnimationFrame(modulateWind);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Synchronize environmental sounds with real-time variables & settings panel
  useEffect(() => {
    const hasActivity = (shakeAmt && shakeAmt > 0.1) || (cursorPos && cursorPos.x !== -999) || isWindEnabled;
    
    if (hasActivity && !isMuted) {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      initTectonicAudio(ctx);
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // A. Handle Soundtrack / Synth drone volume
    if (audioRef.current) {
      audioRef.current.volume = isMusicEnabled && !isMuted ? musicVolume : 0;
    }
    if (synthNodesRef.current) {
      const targetSynthGain = isMusicEnabled && !isMuted ? (musicVolume * 0.25) : 0;
      synthNodesRef.current.gain.gain.setTargetAtTime(targetSynthGain, ctx.currentTime, 0.1);
    }

    // B. Handle Tectonic Rumble Volume & Frequency based on screen shake & settings
    if (rumbleGainNodeRef.current && rumbleOscRef.current) {
      const targetRumbleVal = isRumbleEnabled && !isMuted ? Math.min(0.75, (0.05 + shakeAmt * 0.045) * rumbleVolume) : 0;
      rumbleGainNodeRef.current.gain.setTargetAtTime(targetRumbleVal, ctx.currentTime, 0.08);

      const targetFreq = 32 + shakeAmt * 0.9;
      rumbleOscRef.current.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.1);
    }

    // C. Handle Stone Grinding Volume based on mouse speed & settings
    if (grindGainNodeRef.current && cursorPos) {
      let speed = 0;
      if (prevCursor.current.x !== -999) {
        const dx = cursorPos.x - prevCursor.current.x;
        const dy = cursorPos.y - prevCursor.current.y;
        speed = Math.sqrt(dx * dx + dy * dy);
      }
      prevCursor.current = { x: cursorPos.x, y: cursorPos.y };

      const targetGrindVal = isGrindEnabled && !isMuted ? Math.min(0.4, speed * 0.0035 * grindVolume) : 0;
      grindGainNodeRef.current.gain.setTargetAtTime(targetGrindVal, ctx.currentTime, 0.12);
    }

    // D. Handle Cave Wind volume & sweep based on settings
    if (windGainNodeRef.current) {
      // Wind is always blowing softly in background, slightly modulated by screen shake
      const extraWind = shakeAmt * 0.008;
      const targetWindVal = isWindEnabled && !isMuted ? ((0.12 + extraWind) * windVolume) : 0;
      windGainNodeRef.current.gain.setTargetAtTime(targetWindVal, ctx.currentTime, 0.15);
    }
  }, [shakeAmt, cursorPos, isMuted, musicVolume, rumbleVolume, grindVolume, windVolume, isMusicEnabled, isRumbleEnabled, isGrindEnabled, isWindEnabled]);

  // Handle Web Audio Synth vs HTML Audio
  useEffect(() => {
    if (!isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthNodesRef.current) {
        try {
          synthNodesRef.current.gain.gain.setTargetAtTime(0, audioCtxRef.current!.currentTime, 0.1);
        } catch {}
      }
      return;
    }

    if (currentTrack.url) {
      if (synthNodesRef.current) {
        try {
          synthNodesRef.current.gain.gain.setTargetAtTime(0, audioCtxRef.current!.currentTime, 0.1);
        } catch {}
      }
      if (audioRef.current) {
        audioRef.current.src = currentTrack.url;
        audioRef.current.muted = isMuted;
        audioRef.current.volume = isMusicEnabled ? musicVolume : 0;
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!synthNodesRef.current) {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, ctx.currentTime);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(55.4, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        synthNodesRef.current = { osc1, osc2, gain, filter };
      }

      const targetGain = isMuted || !isMusicEnabled ? 0 : musicVolume * 0.25;
      synthNodesRef.current.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.5);
    }
  }, [isPlaying, currentTrackIdx, currentTrack]);

  // Handle mute change dynamically
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
    if (synthNodesRef.current && audioCtxRef.current) {
      const targetGain = isMuted || !isMusicEnabled ? 0 : musicVolume * 0.25;
      synthNodesRef.current.gain.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.1);
    }
  }, [isMuted, isMusicEnabled, musicVolume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIdx((prev) => (prev + 1) % tracks.length);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const newTrack: Track = {
      id: `custom_${Date.now()}`,
      title: file.name.replace(/\.[^/.]+$/, ''),
      artist: 'Uploaded Audio File',
      url: fileUrl,
    };

    setTracks((prev) => [newTrack, ...prev]);
    setCurrentTrackIdx(0);
    setIsPlaying(true);
    setIsAddModalOpen(false);
  };

  const handleAddUrl = (e: FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    const newTrack: Track = {
      id: `custom_url_${Date.now()}`,
      title: customTitle.trim() || 'Custom Soundtrack',
      artist: 'Added via URL Link',
      url: customUrl.trim(),
    };

    setTracks((prev) => [newTrack, ...prev]);
    setCurrentTrackIdx(0);
    setIsPlaying(true);
    setCustomTitle('');
    setCustomUrl('');
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div className="absolute top-20 right-5 sm:right-10 md:right-14 z-50 pointer-events-auto select-none flex flex-col items-end gap-1.5 font-sans">
        <audio ref={audioRef} loop onEnded={nextTrack} />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="audio/*"
          className="hidden"
        />

        <motion.div
          layout
          className="bg-zinc-950/90 backdrop-blur-xl border border-white/15 rounded-full p-2 text-white shadow-2xl flex items-center gap-2 overflow-hidden"
        >
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#e8702a] text-white shadow-lg shadow-[#e8702a]/30 scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            aria-label={isPlaying ? 'Pause ambient soundtrack' : 'Play ambient soundtrack'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Track Title / Pill Trigger */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-2 cursor-pointer group py-1"
          >
            <Disc className={`w-4 h-4 text-[#e8702a] shrink-0 ${isPlaying ? 'animate-spin' : 'opacity-60'}`} />
            <div className="flex flex-col text-left max-w-[130px] sm:max-w-[160px]">
              <span className="text-xs font-medium truncate tracking-tight text-white/90 group-hover:text-white">
                {currentTrack.title}
              </span>
              <span className="text-[10px] text-white/50 truncate font-mono">
                {currentTrack.artist}
              </span>
            </div>
          </div>

          {/* Expandable Controls */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex items-center gap-1.5 border-l border-white/10 pl-2 pr-1"
              >
                <button
                  onClick={() => setIsAudioSettingsOpen(true)}
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
                  title="Environmental Soundboard Settings"
                >
                  <Sliders className="w-4 h-4 text-[#e8702a]" />
                </button>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title="Add Custom Song (File or URL)"
                >
                  <Plus className="w-4 h-4" />
                </button>

                <button
                  onClick={nextTrack}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title="Next Soundscape"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mini Music indicator when collapsed & playing */}
          {!isExpanded && isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-0.5 pr-2 pl-1"
            >
              <motion.span
                animate={{ height: ['4px', '12px', '6px'] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-0.5 bg-[#e8702a] rounded-full"
              />
              <motion.span
                animate={{ height: ['10px', '4px', '14px'] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="w-0.5 bg-[#e8702a] rounded-full"
              />
              <motion.span
                animate={{ height: ['6px', '14px', '4px'] }}
                transition={{ repeat: Infinity, duration: 0.9 }}
                className="w-0.5 bg-[#e8702a] rounded-full"
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Environmental Soundscape Studio Settings Modal */}
      <AnimatePresence>
        {isAudioSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[200] flex items-center justify-center p-4 pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative text-white"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#e8702a] animate-spin-slow" />
                  <h3 className="font-semibold text-lg">Soundscape Control Studio</h3>
                </div>
                <button
                  onClick={() => setIsAudioSettingsOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-zinc-400 mb-5 leading-relaxed font-mono uppercase tracking-wide">
                Adjust subterranean sound channels and synthesized environment loops.
              </p>

              <div className="space-y-4">
                {/* Channel 1: Soundtrack / Music */}
                <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold flex items-center gap-2 text-white/90">
                      <Music className="w-4 h-4 text-[#e8702a]" /> Soundtrack & Synthesizers
                    </span>
                    <input
                      type="checkbox"
                      checked={isMusicEnabled}
                      onChange={(e) => setIsMusicEnabled(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-[#e8702a] focus:ring-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-3.5 h-3.5 text-zinc-600" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={musicVolume}
                      disabled={!isMusicEnabled}
                      onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                      className="flex-1 accent-[#e8702a] h-1 bg-zinc-800 rounded-lg cursor-pointer disabled:opacity-20"
                    />
                    <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] font-mono text-zinc-400 w-8 text-right">
                      {Math.round(musicVolume * 100)}%
                    </span>
                  </div>
                </div>

                {/* Channel 2: Tectonic Rumbles */}
                <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold flex items-center gap-2 text-white/90">
                      <Activity className="w-4 h-4 text-amber-500" /> Tectonic Plate Rumbles
                    </span>
                    <input
                      type="checkbox"
                      checked={isRumbleEnabled}
                      onChange={(e) => setIsRumbleEnabled(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-amber-500 focus:ring-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-3.5 h-3.5 text-zinc-600" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={rumbleVolume}
                      disabled={!isRumbleEnabled}
                      onChange={(e) => setRumbleVolume(parseFloat(e.target.value))}
                      className="flex-1 accent-amber-500 h-1 bg-zinc-800 rounded-lg cursor-pointer disabled:opacity-20"
                    />
                    <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] font-mono text-zinc-400 w-8 text-right">
                      {Math.round(rumbleVolume * 100)}%
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 block leading-none">
                    Generates low sub-bass (32Hz) sweeps synced to screen shaking.
                  </span>
                </div>

                {/* Channel 3: Cave Winds */}
                <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold flex items-center gap-2 text-white/90">
                      <Wind className="w-4 h-4 text-sky-400" /> Whistling Cave Winds
                    </span>
                    <input
                      type="checkbox"
                      checked={isWindEnabled}
                      onChange={(e) => setIsWindEnabled(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-sky-400 focus:ring-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-3.5 h-3.5 text-zinc-600" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={windVolume}
                      disabled={!isWindEnabled}
                      onChange={(e) => setWindVolume(parseFloat(e.target.value))}
                      className="flex-1 accent-sky-400 h-1 bg-zinc-800 rounded-lg cursor-pointer disabled:opacity-20"
                    />
                    <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] font-mono text-zinc-400 w-8 text-right">
                      {Math.round(windVolume * 100)}%
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 block leading-none">
                    Synthesizes organic bandpassed gusts modulated in real-time.
                  </span>
                </div>

                {/* Channel 4: Tectonic Grinding */}
                <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold flex items-center gap-2 text-white/90">
                      <Sliders className="w-4 h-4 text-emerald-400" /> Tectonic Friction Grinds
                    </span>
                    <input
                      type="checkbox"
                      checked={isGrindEnabled}
                      onChange={(e) => setIsGrindEnabled(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-emerald-400 focus:ring-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-3.5 h-3.5 text-zinc-600" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={grindVolume}
                      disabled={!isGrindEnabled}
                      onChange={(e) => setGrindVolume(parseFloat(e.target.value))}
                      className="flex-1 accent-emerald-400 h-1 bg-zinc-800 rounded-lg cursor-pointer disabled:opacity-20"
                    />
                    <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] font-mono text-zinc-400 w-8 text-right">
                      {Math.round(grindVolume * 100)}%
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 block leading-none">
                    Creates dry stone scraping noises mapped to cursor velocity.
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsAudioSettingsOpen(false)}
                className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-semibold py-3 rounded-2xl mt-5 transition-all active:scale-98 cursor-pointer"
              >
                Apply Studio Configurations
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Custom Song Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4 pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative text-white"
            >
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <Music className="w-5 h-5 text-[#e8702a]" />
                  <h3 className="font-semibold text-lg">Add Soundtrack</h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {/* Upload local file */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-zinc-900 hover:bg-zinc-800/80 border border-dashed border-zinc-700 hover:border-[#e8702a] rounded-2xl p-5 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#e8702a]/10 group-hover:bg-[#e8702a]/20 flex items-center justify-center text-[#e8702a] transition-colors">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">Upload Audio File</span>
                  <span className="text-[11px] text-zinc-500 font-mono">MP3, OGG, WAV supported</span>
                </button>

                <div className="flex items-center gap-3 my-1 text-xs text-zinc-600 font-mono">
                  <div className="h-px bg-zinc-800 flex-1" />
                  <span>OR PASTE STREAM URL</span>
                  <div className="h-px bg-zinc-800 flex-1" />
                </div>

                {/* Paste audio link */}
                <form onSubmit={handleAddUrl} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Song Title (e.g. My Gothic Theme)"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#e8702a]"
                  />
                  <div className="relative">
                    <LinkIcon className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="url"
                      required
                      placeholder="https://example.com/audio.mp3"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#e8702a]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#e8702a] hover:bg-[#d2611f] text-white font-semibold text-sm py-3 rounded-xl transition-all hover:scale-[1.01] active:scale-99 cursor-pointer mt-1"
                  >
                    Load Song Link
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
