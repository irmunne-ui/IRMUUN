/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc, SkipForward, Plus, Upload, Link as LinkIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string | null;
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

export function AmbientPlayer() {
  const [tracks, setTracks] = useState<Track[]>(DEFAULT_TRACKS);
  const [currentTrackIdx, setCurrentTrackIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // Auto play first song
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customUrl, setCustomUrl] = useState<string>('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    gain: GainNode;
    filter: BiquadFilterNode;
  } | null>(null);

  const currentTrack = tracks[currentTrackIdx] || tracks[0];

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

      const targetGain = isMuted ? 0 : 0.25;
      synthNodesRef.current.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.5);
    }
  }, [isPlaying, currentTrackIdx, currentTrack]);

  // Handle mute change dynamically
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
    if (synthNodesRef.current && audioCtxRef.current) {
      const targetGain = isMuted ? 0 : 0.25;
      synthNodesRef.current.gain.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.1);
    }
  }, [isMuted]);

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
      <div className="absolute top-20 right-5 sm:right-10 md:right-14 z-50 pointer-events-auto select-none flex flex-col items-end gap-1.5">
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
          className="bg-zinc-950/80 backdrop-blur-xl border border-white/15 rounded-full p-2 text-white shadow-2xl flex items-center gap-2 overflow-hidden"
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
                  onClick={() => setIsAddModalOpen(true)}
                  className="p-1.5 text-[#e8702a] hover:text-white hover:bg-[#e8702a] rounded-full transition-colors cursor-pointer"
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
