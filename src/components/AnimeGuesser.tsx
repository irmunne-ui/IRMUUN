import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Flame, Heart, Timer, RotateCcw, CheckCircle2, XCircle, Sparkles, HelpCircle, Volume2, VolumeX, Swords, BookOpen, ArrowLeft, Trash2, Calendar, Globe } from 'lucide-react';
import QUESTIONS_DATA from '../data.json';

interface Question {
  id: number;
  question: {
    mn: string;
    en: string;
    ja: string;
  };
  options: {
    mn: string[];
    en: string[];
    ja: string[];
  };
  answerIndex: number;
  hint?: {
    mn: string;
    en: string;
    ja: string;
  };
  image?: string;
}

interface LeaderboardEntry {
  score: number;
  maxStreak: number;
  mode: 'trivia' | 'heroes';
  lang: 'mn' | 'en' | 'ja';
  date: string;
}

interface AnimeGuesserProps {
  isOpen: boolean;
  onClose: () => void;
}

const UI_TEXT = {
  mn: {
    title: "Anime Guesser",
    subtitle: "Аниме сонирхогчдын сорилт",
    beta: "Хувилбар v2.5",
    menu: "Цэс",
    newGame: "Шинээр",
    soundOn: "Дуутай",
    soundOff: "Дуугүй",
    score: "Оноо",
    combo: "Цуврал",
    question: "Асуулт",
    hint: "Санамж",
    correct: "Тийм ээ, зөв хариуллаа! 🎉 +15 оноо",
    incorrect: "Буруу хариуллаа! 😢 Зөв хариулт: ",
    timeUp: "Хугацаа дууслаа! ⏳",
    startTitle: "Аниме Таагч Тоглоом",
    startDesc: "Аниме ертөнцийн мэдлэгээ сорих горимыг сонгон тоглоорой!",
    triviaMode: "Асуулт Хариулт",
    triviaDesc: "Аниме зохиол, сонирхолтой түүхүүдийн талаар асуултууд.",
    heroesMode: "Баатрын Дүр Таах",
    heroesDesc: "Luffy, Naruto, Tanjiro, Goku зэрэг алдарт баатруудын зургийг хараад таах.",
    rulesTitle: "ТОГЛООМЫН ДҮРЭМ:",
    rulesTime: "Асуултын хугацаа",
    rulesTimeVal: "15 секунд",
    rulesLives: "Тоглогчийн амь",
    rulesLivesVal: "5 амь ❤️",
    rulesCorrect: "Зөв хариулт",
    rulesCorrectVal: "+15 оноо",
    rulesCombo: "3 дараалж зөв хариулбал",
    rulesComboVal: "+10 BONUS 🔥",
    btnStart: "ТОГЛООМЫГ ЭХЛЭХ",
    gameOverTitle: "Тоглоом дууслаа! 💔",
    gameOverDesc: "Та амиа бүгдийг алдлаа. Өөр горим туршиж эсвэл дахин үзээрэй!",
    totalScore: "Нийт оноо",
    maxStreak: "Хамгийн урт цуврал",
    btnPlayAgain: "ДАХИН ТОГЛОХ",
    btnGoMenu: "ТОГЛООМЫН ЦЭС",
    btnGoLobby: "ЛОББИ РҮҮ БУЦАХ",
    victoryTitle: "Ялалт! Баяр хүргэе! 🏆🎉",
    victoryDesc: "Та манай бүх асуултад амжилттай хариулж, аниме таагч аваргын цолыг хүртлээ!",
    leaderboardTitle: "Шилдэг Амжилтууд (Leaderboard)",
    noLeaderboard: "Одоогоор бүртгэгдсэн амжилт байхгүй байна.",
    colRank: "Байр",
    colScore: "Оноо",
    colMode: "Горим",
    colLang: "Хэл",
    colDate: "Огноо",
    clearLeaderboard: "Түүх устгах",
    langSelect: "Хэл сонгох"
  },
  en: {
    title: "Anime Guesser",
    subtitle: "The Ultimate Anime Trivia",
    beta: "Version v2.5",
    menu: "Menu",
    newGame: "Restart",
    soundOn: "Sound On",
    soundOff: "Muted",
    score: "Score",
    combo: "Streak",
    question: "Question",
    hint: "Hint",
    correct: "Yes, correct answer! 🎉 +15 pts",
    incorrect: "Wrong answer! 😢 Correct was: ",
    timeUp: "Time's up! ⏳",
    startTitle: "Anime Guesser Game",
    startDesc: "Choose a game mode to test your anime knowledge!",
    triviaMode: "Anime Trivia",
    triviaDesc: "Questions about anime lore, plots, and trivia facts.",
    heroesMode: "Character Guesser",
    heroesDesc: "Identify famous heroes like Luffy, Naruto, Tanjiro, Goku from their portraits.",
    rulesTitle: "GAME RULES:",
    rulesTime: "Time per question",
    rulesTimeVal: "15 seconds",
    rulesLives: "Starting lives",
    rulesLivesVal: "5 lives ❤️",
    rulesCorrect: "Correct answer",
    rulesCorrectVal: "+15 pts",
    rulesCombo: "3 consecutive correct",
    rulesComboVal: "+10 BONUS 🔥",
    btnStart: "START GAME",
    gameOverTitle: "Game Over! 💔",
    gameOverDesc: "You lost all your lives. Try another mode or test again!",
    totalScore: "Total Score",
    maxStreak: "Max Streak",
    btnPlayAgain: "PLAY AGAIN",
    btnGoMenu: "GAME MENU",
    btnGoLobby: "EXIT TO LOBBY",
    victoryTitle: "Victory! Congratulations! 🏆🎉",
    victoryDesc: "You answered all questions correctly and achieved the Ultimate Anime Master title!",
    leaderboardTitle: "Leaderboard",
    noLeaderboard: "No high scores recorded yet.",
    colRank: "Rank",
    colScore: "Score",
    colMode: "Mode",
    colLang: "Lang",
    colDate: "Date",
    clearLeaderboard: "Clear Scores",
    langSelect: "Select Language"
  },
  ja: {
    title: "アニメゲッサー",
    subtitle: "究極のアニメクイズ",
    beta: "バージョン v2.5",
    menu: "メニュー",
    newGame: "リスタート",
    soundOn: "音量オン",
    soundOff: "ミュート",
    score: "スコア",
    combo: "コンボ",
    question: "問題",
    hint: "ヒント",
    correct: "正解です！🎉 +15点",
    incorrect: "残念、不正解です！😢 正解は: ",
    timeUp: "時間切れです！⏳",
    startTitle: "アニメゲッサーゲーム",
    startDesc: "ゲームモードを選択して、アニメの知識をテストしましょう！",
    triviaMode: "アニメクイズ",
    triviaDesc: "アニメの世界観、ストーリー、豆知識に関する問題。",
    heroesMode: "キャラクター当て",
    heroesDesc: "ルフィ、ナルト、炭治郎、悟空などの有名なヒーローを画像から当てます。",
    rulesTitle: "ゲームのルール:",
    rulesTime: "制限時間",
    rulesTimeVal: "15秒",
    rulesLives: "持ちライフ",
    rulesLivesVal: "5ライフ ❤️",
    rulesCorrect: "正解",
    rulesCorrectVal: "+15点",
    rulesCombo: "3回連続正解で",
    rulesComboVal: "+10 ボーナス 🔥",
    btnStart: "ゲームスタート",
    gameOverTitle: "ゲームオーバー！💔",
    gameOverDesc: "すべてのライフを失いました。再挑戦するか、他のモードをお試しください！",
    totalScore: "合計スコア",
    maxStreak: "最大コンボ",
    btnPlayAgain: "もう一度プレイ",
    btnGoMenu: "ゲームメニュー",
    btnGoLobby: "ロビーに戻る",
    victoryTitle: "完全勝利！おめでとうございます！🏆🎉",
    victoryDesc: "すべてのクイズに見事正解し、究極のアニメマスターの称号を獲得しました！",
    leaderboardTitle: "リーダーボード",
    noLeaderboard: "まだ記録はありません。",
    colRank: "順位",
    colScore: "スコア",
    colMode: "モード",
    colLang: "言語",
    colDate: "日付",
    clearLeaderboard: "記録をクリア",
    langSelect: "言語選択"
  }
};

export function AnimeGuesser({ isOpen, onClose }: AnimeGuesserProps) {
  const [lang, setLang] = useState<'mn' | 'en' | 'ja'>('mn');
  const [gameMode, setGameMode] = useState<'trivia' | 'heroes'>('trivia');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  
  // Game state: 'start' | 'playing' | 'gameover' | 'victory'
  const [gameStatus, setGameStatus] = useState<'start' | 'playing' | 'gameover' | 'victory'>('start');
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showComboAnimation, setShowComboAnimation] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shakeButton, setShakeButton] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [unlockedHintsCount, setUnlockedHintsCount] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset hints whenever the question index changes
  useEffect(() => {
    setUnlockedHintsCount(0);
  }, [currentIdx]);

  // Unique emoji helper mapping for Anime Guesser questions
  const getQuestionEmojis = (id: number): string => {
    const emojiMap: Record<number, string> = {
      1: "🏴‍☠️👒🍖 (Straw Hat pirates, seas, treasure)",
      2: "📓🍎✍️💀 (Death book, apple, shinigami)",
      3: "🍥🐸⚡🥋 (Scrolls, toad, ramen bowl)",
      4: "⚔️🐗⚡🎋 (Nezuko bamboo, demon horns, slashes)",
      5: "🐉🐷⛩️🏮 (Spirit bathhouse, dragon river, soot)",
      6: "🤞🧿👹🐼 (Cursed fingers, domain expansion, blindfold)",
      7: "👊🦲🦸👔 (Red gloves, shiny bald head, one hit)",
      8: "🧱🧗🥩🩸 (Giant wall, steam, flesh titan)",
      9: "🐉🐉🐵☄️ (Senzu bean, monkey tail, energy blast)",
      10: "🎣⚡🐜🎴 (Fishing rod, lightning, assassin cards)",
      11: "🦾🤖⚙️⚗️ (Metal arm, automail, red elixir stone)",
      12: "🦸🏫🥦💥 (Green hair, smash punches, academy heroes)",
      13: "☕🎭🩸🥩 (Coffee mug, white mask, kagune wing)",
      14: "🤖📐🧬😇 (Eva cockpit, angel halos, mech entry)",
      15: "⚔️👘🍓💀 (Soul sword, hollow mask, strawberry name)",
      
      // Character Heroes mode
      101: "🏴‍☠️👒🍖 (Gum-Gum captain, meat, red vest)",
      102: "🍥🐸⚡ (Leaf village forehead protector, orange track jacket)",
      103: "🎋⚔️🔥 (Checkered kimono, scar, water slashes)",
      104: "🐉🐵☄️ (Orange Gi, spikey black hair, kamehameha)",
      105: "🤞🧿👹 (Round sunglasses, infinite void, white hair)",
      106: "👊🦲🦸 (Yellow spandex, bald superhero, grocery bag)",
      107: "⚡🔌🛹 (Silver hair, lightning speed, assassin claws)",
      108: "⚔️🧱💚 (調査兵団, dual swords, high speed ODM gear)",
      109: "🍓👘💀 (Giant broadsword, orange hair, spiritual energy)",
      110: "🎭☕👁️ (One-eyed red eye, black hair, ghoul mask)",
      111: "🦾⚙️⚗️ (Red coat, mechanical arm, pocket watch)",
      112: "🥦🥦💥 (Green curly hair, metal mouth guard, dynamic kicks)",
      113: "🎋🎀🌸 (Pink kimono, bamboo muzzle, cute demon form)",
      114: "⚔️⚔️⚔️ (Three katanas, green haramaki, bandana)",
      115: "⚡👁️💜 (Purple lightning, Sharingan, dark hair)"
    };
    return emojiMap[id] || "🎮🔮✨ (Anime mystery box)";
  };

  const t = UI_TEXT[lang];

  // Cast raw JSON data into localized Question structure
  const currentQuestions: Question[] = (gameMode === 'trivia' ? QUESTIONS_DATA.trivia : QUESTIONS_DATA.heroes) as unknown as Question[];

  // Load Leaderboard from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('anime_guesser_leaderboard');
    if (saved) {
      try {
        setLeaderboard(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse leaderboard:", e);
      }
    }
  }, []);

  const saveLeaderboardEntry = (finalScore: number, finalMaxStreak: number) => {
    const newEntry: LeaderboardEntry = {
      score: finalScore,
      maxStreak: finalMaxStreak,
      mode: gameMode,
      lang: lang,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newEntry, ...leaderboard]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Keep top 10 scores
    setLeaderboard(updated);
    localStorage.setItem('anime_guesser_leaderboard', JSON.stringify(updated));
  };

  const clearLeaderboard = () => {
    setLeaderboard([]);
    localStorage.removeItem('anime_guesser_leaderboard');
  };

  // Web Audio synth engine for lag-free retro sounds
  const playSound = (type: 'ding' | 'buzz' | 'bonus' | 'gameover' | 'win') => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      if (type === 'ding') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'buzz') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.linearRampToValueAtTime(85, now + 0.25);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'bonus') {
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        gain.connect(ctx.destination);

        const freqs = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
        freqs.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + index * 0.07);
          osc.connect(gain);
          osc.start(now + index * 0.07);
          osc.stop(now + 0.5);
        });
      } else if (type === 'gameover') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.6);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'win') {
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        gain.connect(ctx.destination);

        const notes = [523.25, 523.25, 523.25, 659.25, 523.25, 659.25, 783.99];
        const times = [0, 0.12, 0.24, 0.36, 0.48, 0.60, 0.72];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + times[idx]);
          osc.connect(gain);
          osc.start(now + times[idx]);
          osc.stop(now + times[idx] + 0.15);
        });
      }
    } catch (e) {
      console.warn("AudioContext blocked or uninitialized:", e);
    }
  };

  // Timer runner
  useEffect(() => {
    if (gameStatus !== 'playing' || selectedOption !== null) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimeLeft(15);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus, currentIdx, selectedOption, gameMode]);

  const handleTimeout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    playSound('buzz');
    setIsCorrect(false);
    setSelectedOption(""); // empty is incorrect
    const nextLives = lives - 1;
    setLives(nextLives);
    
    const finalStreak = streak;
    setStreak(0);

    if (nextLives <= 0) {
      setTimeout(() => {
        playSound('gameover');
        const finalMax = finalStreak > maxStreak ? finalStreak : maxStreak;
        setMaxStreak(finalMax);
        saveLeaderboardEntry(score, finalMax);
        setGameStatus('gameover');
      }, 1500);
    } else {
      scheduleNextQuestion();
    }
  };

  const startNewGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setLives(5);
    setStreak(0);
    setMaxStreak(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setGameStatus('playing');
  };

  const resetToMenu = () => {
    setGameStatus('start');
  };

  const handleOptionClick = (option: string, optionIndex: number) => {
    if (selectedOption !== null || gameStatus !== 'playing') return;

    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(option);
    const correctIndex = currentQuestions[currentIdx].answerIndex;
    const answerIsCorrect = optionIndex === correctIndex;

    setIsCorrect(answerIsCorrect);

    if (answerIsCorrect) {
      playSound('ding');
      const earnedScore = 15;
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);

      let bonusScore = 0;
      // Bonus of +10 points on 3 consecutive correct answers
      if (nextStreak > 0 && nextStreak % 3 === 0) {
        bonusScore = 10;
        playSound('bonus');
        setShowComboAnimation(true);
        setTimeout(() => setShowComboAnimation(false), 2000);
      }

      setScore((prev) => prev + earnedScore + bonusScore);
      scheduleNextQuestion();
    } else {
      playSound('buzz');
      setShakeButton(option);
      setTimeout(() => setShakeButton(null), 500);
      const nextLives = lives - 1;
      setLives(nextLives);
      
      const finalStreak = streak;
      setStreak(0);

      if (nextLives <= 0) {
        setTimeout(() => {
          playSound('gameover');
          const finalMax = finalStreak > maxStreak ? finalStreak : maxStreak;
          setMaxStreak(finalMax);
          saveLeaderboardEntry(score, finalMax);
          setGameStatus('gameover');
        }, 1500);
      } else {
        scheduleNextQuestion();
      }
    }
  };

  const scheduleNextQuestion = () => {
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        if (currentIdx + 1 < currentQuestions.length) {
          setCurrentIdx((prev) => prev + 1);
          setSelectedOption(null);
          setIsCorrect(null);
          setIsTransitioning(false);
        } else {
          playSound('win');
          const finalMax = streak > maxStreak ? streak : maxStreak;
          setMaxStreak(finalMax);
          saveLeaderboardEntry(score, finalMax);
          setGameStatus('victory');
          setIsTransitioning(false);
        }
      }, 300);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6" id="anime-guesser-root">
          {/* Blur backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-zinc-950 border border-orange-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[740px] max-h-[95vh] z-10 text-white"
          >
            {/* Glowing orange/red accent line on top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-[#e8702a] to-amber-500" />

            {/* Header */}
            <div className="p-5 border-b border-zinc-900 bg-zinc-900/40 flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold shadow-md">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-playfair italic text-xl font-bold flex items-center gap-2">
                    {t.title} <span className="not-italic text-[10px] bg-orange-500/20 text-[#e8702a] px-2 py-0.5 rounded-full font-mono font-bold tracking-wider uppercase">{t.beta}</span>
                  </h3>
                  <p className="text-xs text-zinc-400">{t.subtitle}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Back to Menu (only during active game) */}
                {gameStatus === 'playing' && (
                  <button
                    onClick={resetToMenu}
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors rounded-full border border-zinc-800 flex items-center justify-center gap-1 px-3 cursor-pointer"
                    title={t.btnGoMenu}
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
                    <span className="text-xs font-mono">{t.menu}</span>
                  </button>
                )}

                {/* Restart Button (only during active game) */}
                {gameStatus === 'playing' && (
                  <button
                    onClick={startNewGame}
                    className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors rounded-full border border-zinc-800 flex items-center justify-center gap-1.5 px-3 cursor-pointer"
                    title={t.newGame}
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-orange-400 animate-spin-slow" />
                    <span className="text-xs font-mono font-bold">{t.newGame}</span>
                  </button>
                )}

                {/* Sound Toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors rounded-full border border-zinc-800 cursor-pointer"
                  title={soundEnabled ? t.soundOn : t.soundOff}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-900 bg-zinc-900/50 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Interactive Screen */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col justify-between relative">
              <AnimatePresence mode="wait">
                {/* Combo/Streak Bonus Pop-up */}
                {showComboAnimation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1.3, y: -20 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-x-0 top-1/3 mx-auto z-50 flex flex-col items-center justify-center pointer-events-none"
                  >
                    <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-amber-400 animate-bounce">
                      <Flame className="w-6 h-6 text-yellow-300 animate-pulse" />
                      <span className="font-mono font-black text-xl tracking-wider">COMBO BONUS +10!! 🔥</span>
                    </div>
                  </motion.div>
                )}

                {/* 1. START SCREEN & MODE SELECTION */}
                {gameStatus === 'start' && (
                  <motion.div
                    key="start"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex-1 flex flex-col justify-start relative py-1"
                  >
                    {/* Top Row: Language Picker and Close */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b border-zinc-900/60 pb-3">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-orange-400 shrink-0" />
                        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wide">{t.langSelect}:</span>
                      </div>
                      <div className="flex gap-1 bg-zinc-900/80 p-0.5 rounded-xl border border-zinc-800">
                        {(['mn', 'en', 'ja'] as const).map((l) => (
                          <button
                            key={l}
                            onClick={() => setLang(l)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                              lang === l
                                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-105'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                            }`}
                          >
                            <span>{l === 'mn' ? '🇲🇳 MN' : l === 'en' ? '🇺🇸 EN' : '🇯🇵 JA'}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                      {/* Left: Settings & Game Options */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="text-left">
                          <h4 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-1 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                            {t.startTitle}
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                            {t.startDesc}
                          </p>
                        </div>

                        {/* Mode Selector Cards */}
                        <div className="grid grid-cols-1 gap-3 w-full">
                          {/* Mode 1: Trivia */}
                          <button
                            onClick={() => setGameMode('trivia')}
                            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col gap-2 group cursor-pointer ${
                              gameMode === 'trivia'
                                ? 'bg-orange-500/10 border-orange-500 text-white shadow-lg shadow-orange-500/5'
                                : 'bg-zinc-900/40 border-zinc-900 text-zinc-300 hover:bg-zinc-900/75 hover:border-zinc-800'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className={`p-2 rounded-xl ${gameMode === 'trivia' ? 'bg-orange-500/20 text-orange-400' : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-200'}`}>
                                <BookOpen className="w-5 h-5" />
                              </div>
                              {gameMode === 'trivia' && (
                                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping absolute top-4 right-4" />
                              )}
                            </div>
                            <span className="font-semibold text-sm">{t.triviaMode}</span>
                            <span className="text-xs text-zinc-400 leading-relaxed">
                              {t.triviaDesc}
                            </span>
                          </button>

                          {/* Mode 2: Character Guesser */}
                          <button
                            onClick={() => setGameMode('heroes')}
                            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col gap-2 group cursor-pointer ${
                              gameMode === 'heroes'
                                ? 'bg-orange-500/10 border-orange-500 text-white shadow-lg shadow-orange-500/5'
                                : 'bg-zinc-900/40 border-zinc-900 text-zinc-300 hover:bg-zinc-900/75 hover:border-zinc-800'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className={`p-2 rounded-xl ${gameMode === 'heroes' ? 'bg-orange-500/20 text-orange-400' : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-200'}`}>
                                <Swords className="w-5 h-5" />
                              </div>
                              {gameMode === 'heroes' && (
                                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping absolute top-4 right-4" />
                              )}
                            </div>
                            <span className="font-semibold text-sm flex items-center gap-1.5">
                              {t.heroesMode}
                            </span>
                            <span className="text-xs text-zinc-400 leading-relaxed">
                              {t.heroesDesc}
                            </span>
                          </button>
                        </div>

                        {/* Rules Summary Card */}
                        <div className="w-full bg-zinc-900/40 border border-zinc-900 rounded-2xl p-3.5 space-y-2 text-xs font-mono">
                          <div className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold pb-1 border-b border-zinc-800/80">{t.rulesTitle}</div>
                          <div className="flex items-center justify-between text-zinc-300">
                            <span className="flex items-center gap-1.5"><Timer className="w-3.5 h-3.5 text-orange-400" /> {t.rulesTime}</span>
                            <span className="text-white font-bold">{t.rulesTimeVal}</span>
                          </div>
                          <div className="flex items-center justify-between text-zinc-300">
                            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-red-500" /> {t.rulesLives}</span>
                            <span className="text-white font-bold">{t.rulesLivesVal}</span>
                          </div>
                          <div className="flex items-center justify-between text-zinc-300">
                            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-yellow-400" /> {t.rulesCorrect}</span>
                            <span className="text-white font-bold">{t.rulesCorrectVal}</span>
                          </div>
                          <div className="flex items-center justify-between text-zinc-300">
                            <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-orange-500" /> {t.rulesCombo}</span>
                            <span className="text-white font-bold">{t.rulesComboVal}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Leaderboard High Scores */}
                      <div className="md:col-span-5 bg-zinc-900/30 border border-zinc-900 rounded-2xl p-4 flex flex-col h-[380px] sm:h-[420px]">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                            <Trophy className="w-4 h-4" /> {t.leaderboardTitle}
                          </span>
                          {leaderboard.length > 0 && (
                            <button
                              onClick={clearLeaderboard}
                              className="text-[10px] text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                              title={t.clearLeaderboard}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        {leaderboard.length === 0 ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-zinc-600 font-mono text-xs">
                            <Trophy className="w-8 h-8 opacity-25 mb-2" />
                            <p>{t.noLeaderboard}</p>
                          </div>
                        ) : (
                          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                            {leaderboard.map((entry, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/60 border border-zinc-900 hover:border-orange-500/10 transition-colors text-xs font-mono"
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                                    idx === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                    idx === 1 ? 'bg-zinc-400/20 text-zinc-300 border border-zinc-400/30' :
                                    idx === 2 ? 'bg-amber-700/20 text-amber-500 border border-amber-700/30' :
                                    'bg-zinc-900 text-zinc-500'
                                  }`}>
                                    {idx + 1}
                                  </span>
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-white font-bold">{entry.score} {t.score}</span>
                                      <span className="text-[9px] px-1.5 py-0.2 bg-zinc-800 text-zinc-400 rounded lowercase">
                                        {entry.mode}
                                      </span>
                                    </div>
                                    <div className="text-[9px] text-zinc-500 flex items-center gap-1">
                                      <Calendar className="w-2.5 h-2.5" />
                                      <span>{entry.date}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-[10px] text-orange-400 flex items-center gap-0.5 justify-end">
                                    <Flame className="w-3 h-3 fill-orange-500/10" />
                                    <span>{entry.maxStreak}</span>
                                  </div>
                                  <span className="text-[9px] text-zinc-500 uppercase">{entry.lang}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-5">
                      <button
                        onClick={startNewGame}
                        className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-101 hover:shadow-lg hover:shadow-orange-500/20 active:scale-99 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                        <span className="uppercase tracking-wider">{t.btnStart}</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 2. PLAYING SCREEN */}
                {gameStatus === 'playing' && (
                  <motion.div
                    key="playing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    {/* Status Bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-900 text-xs font-mono">
                      {/* Score Tracker */}
                      <div className="flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span className="text-zinc-400">{t.score}:</span>
                        <span className="text-white font-bold text-sm">{score}</span>
                      </div>

                      {/* Combo / Streak Tracker */}
                      <div className="flex items-center gap-1 bg-zinc-900/60 border border-zinc-800 rounded-full px-2.5 py-1">
                        <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-orange-500 animate-pulse' : 'text-zinc-600'}`} />
                        <span className="text-[10px] text-zinc-400">{t.combo}:</span>
                        <span className={`font-bold ${streak > 0 ? 'text-orange-400' : 'text-zinc-500'}`}>{streak}</span>
                      </div>

                      {/* Lives Tracker */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <Heart
                             key={idx}
                             className={`w-4 h-4 transition-all ${
                               idx < lives ? 'text-red-500 fill-red-500 scale-100' : 'text-zinc-700 scale-90'
                             }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Progress Time Bar */}
                    <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mt-2 relative">
                      <motion.div
                        className={`h-full ${
                          timeLeft > 5 ? 'bg-orange-500' : 'bg-red-500 animate-pulse'
                        }`}
                        initial={{ width: '100%' }}
                        animate={{ width: `${(timeLeft / 15) * 100}%` }}
                        transition={{ duration: selectedOption === null ? 1 : 0.2, ease: 'linear' }}
                      />
                    </div>

                    {/* Question Card */}
                    <div className="flex-1 flex flex-col justify-center py-3 select-none">
                      <div className="text-center mb-1">
                        <span className="text-xs font-mono text-orange-400 tracking-widest uppercase">
                          {t.question} {currentIdx + 1} / {currentQuestions.length}
                        </span>
                      </div>

                      {/* Hero Image Container for Character Mode */}
                      {currentQuestions[currentIdx].image && !isTransitioning && (
                        <div className="flex justify-center my-2">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-orange-500/40 shadow-xl shadow-orange-500/10 bg-zinc-900"
                          >
                            <img
                              src={currentQuestions[currentIdx].image}
                              alt="Guess the hero"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                          </motion.div>
                        </div>
                      )}

                      {/* Question Text wrapper */}
                      <div className="min-h-[50px] flex items-center justify-center text-center px-2">
                        <AnimatePresence mode="wait">
                          {!isTransitioning ? (
                            <motion.h4
                              key={currentIdx}
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                              className="text-sm sm:text-base font-semibold leading-relaxed max-w-xl text-white"
                            >
                              {currentQuestions[currentIdx].question[lang]}
                            </motion.h4>
                          ) : (
                            <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Interactive 3-Hint Panel */}
                      {selectedOption === null && (
                        <div className="mt-3 bg-zinc-900/30 rounded-2xl p-3 border border-zinc-900/60 font-mono text-[11px] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500 uppercase tracking-widest text-[9px] font-bold flex items-center gap-1">
                              <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
                              HINTS USED: {unlockedHintsCount} / 3
                            </span>

                            {unlockedHintsCount < 3 && (
                              <button
                                onClick={() => {
                                  setUnlockedHintsCount(prev => Math.min(3, prev + 1));
                                  playSound('ding');
                                }}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-2.5 py-1 rounded-lg text-[9px] transition-all hover:scale-[1.02] cursor-pointer"
                              >
                                💡 UNLOCK HINT {unlockedHintsCount + 1}
                              </button>
                            )}
                          </div>

                          {/* Progress pills */}
                          <div className="grid grid-cols-3 gap-1.5">
                            {[1, 2, 3].map((num) => (
                              <div
                                key={num}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  unlockedHintsCount >= num 
                                    ? 'bg-gradient-to-r from-orange-500 to-amber-500' 
                                    : 'bg-zinc-800'
                                }`}
                              />
                            ))}
                          </div>

                          {/* Clue Output Area */}
                          {unlockedHintsCount === 0 ? (
                            <p className="text-center text-zinc-500 text-[10px] py-1">
                              Stuck? Unlock hints step-by-step using the lightbulb button above!
                            </p>
                          ) : (
                            <div className="space-y-1 text-zinc-300">
                              {unlockedHintsCount >= 1 && (
                                <div className="p-1.5 bg-zinc-950/40 rounded border border-zinc-900 flex gap-2 items-start">
                                  <span className="text-orange-400 font-bold shrink-0">H1 (Emoji):</span>
                                  <span className="text-white text-xs">{getQuestionEmojis(currentQuestions[currentIdx].id)}</span>
                                </div>
                              )}
                              {unlockedHintsCount >= 2 && currentQuestions[currentIdx].hint && (
                                <div className="p-1.5 bg-zinc-950/40 rounded border border-zinc-900 flex gap-2 items-start">
                                  <span className="text-orange-400 font-bold shrink-0">H2 (Lore):</span>
                                  <span>{currentQuestions[currentIdx].hint[lang]}</span>
                                </div>
                              )}
                              {unlockedHintsCount >= 3 && (
                                <div className="p-1.5 bg-zinc-950/40 rounded border border-zinc-900 flex gap-2 items-start animate-pulse">
                                  <span className="text-emerald-400 font-bold shrink-0">H3 (Assist):</span>
                                  <span className="text-emerald-300 font-semibold">
                                    The correct choice starts with the character: "
                                    {
                                      currentQuestions[currentIdx].options[lang][
                                        currentQuestions[currentIdx].answerIndex
                                      ]?.trim().charAt(0).toUpperCase()
                                    }
                                    "
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Option Buttons Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pb-2 select-none">
                      {currentQuestions[currentIdx].options[lang].map((option, idx) => {
                        const isThisSelected = selectedOption === option;
                        const isThisCorrect = idx === currentQuestions[currentIdx].answerIndex;
                        const hasSelected = selectedOption !== null;

                        // Styling states
                        let btnStyle = "bg-zinc-900/40 border-zinc-800/80 text-zinc-200 hover:border-orange-500/50 hover:bg-orange-500/5";

                        if (hasSelected) {
                          if (isThisCorrect) {
                            btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/30";
                          } else if (isThisSelected) {
                            btnStyle = "bg-red-950/40 border-red-500 text-red-200 shadow-md shadow-red-950/30";
                          } else {
                            btnStyle = "bg-zinc-900/20 border-zinc-900 text-zinc-600 opacity-60";
                          }
                        }

                        const isShaking = shakeButton === option;

                        return (
                          <motion.button
                            key={option}
                            onClick={() => handleOptionClick(option, idx)}
                            disabled={hasSelected}
                            whileHover={!hasSelected ? { scale: 1.01, boxShadow: "0 0 10px rgba(232,112,42,0.12)" } : {}}
                            whileTap={!hasSelected ? { scale: 0.99 } : {}}
                            animate={isShaking ? {
                              x: [-5, 5, -5, 5, -3, 3, 0],
                              transition: { duration: 0.4 }
                            } : {}}
                            className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition-all duration-150 flex items-center justify-between font-medium cursor-pointer ${btnStyle}`}
                          >
                            <span>{option}</span>
                            {hasSelected && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                            {hasSelected && isThisSelected && !isThisCorrect && (
                              <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-2" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Feedback Status */}
                    <div className="h-6 text-center text-xs font-mono mt-2">
                      {selectedOption !== null && (
                        <motion.span
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={isCorrect ? "text-emerald-400 animate-pulse" : "text-red-400"}
                        >
                          {isCorrect ? t.correct : `${t.incorrect} ${currentQuestions[currentIdx].options[lang][currentQuestions[currentIdx].answerIndex]}`}
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 3. GAME OVER SCREEN */}
                {gameStatus === 'gameover' && (
                  <motion.div
                    key="gameover"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-6"
                  >
                    <div className="relative mb-5">
                      <div className="absolute inset-0 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
                      <XCircle className="w-16 h-16 text-red-500 relative z-10" />
                    </div>

                    <h4 className="text-xl sm:text-2xl font-semibold mb-2 tracking-tight">{t.gameOverTitle}</h4>
                    <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                      {t.gameOverDesc}
                    </p>

                    {/* Score Summary Box */}
                    <div className="w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 mb-8 grid grid-cols-2 gap-4 font-mono">
                      <div className="border-r border-zinc-800/80 pr-2">
                        <span className="text-zinc-500 text-[10px] block uppercase tracking-wider">{t.totalScore}</span>
                        <span className="text-2xl sm:text-3xl font-black text-white">{score}</span>
                      </div>
                      <div className="pl-2">
                        <span className="text-zinc-500 text-[10px] block uppercase tracking-wider">{t.maxStreak}</span>
                        <span className="text-2xl sm:text-3xl font-black text-orange-400 flex items-center justify-center gap-1">
                          {maxStreak} <Flame className="w-5 h-5 text-orange-500 inline fill-orange-500/20" />
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5 w-full">
                      <button
                        onClick={startNewGame}
                        className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white font-semibold py-3 rounded-xl transition-all hover:scale-102 hover:shadow-lg hover:shadow-orange-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>{t.btnPlayAgain}</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2.5 w-full">
                        <button
                          onClick={resetToMenu}
                          className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold py-3 rounded-xl transition-all hover:scale-102 border border-zinc-800 active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 text-xs sm:text-sm"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>{t.btnGoMenu}</span>
                        </button>
                        <button
                          onClick={onClose}
                          className="bg-zinc-950 hover:bg-zinc-900 text-orange-400 hover:text-orange-300 font-semibold py-3 rounded-xl transition-all hover:scale-102 border border-orange-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 text-xs sm:text-sm"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>{t.btnGoLobby}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4. VICTORY / WIN SCREEN */}
                {gameStatus === 'victory' && (
                  <motion.div
                    key="victory"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-6"
                  >
                    <div className="relative mb-5">
                      <div className="absolute inset-0 bg-yellow-500/15 rounded-full blur-3xl animate-pulse" />
                      <Trophy className="w-16 h-16 text-yellow-400 relative z-10 animate-bounce" />
                    </div>

                    <h4 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-2 tracking-tight">{t.victoryTitle}</h4>
                    <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                      {t.victoryDesc}
                    </p>

                    {/* Score Summary Box */}
                    <div className="w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 mb-8 grid grid-cols-2 gap-4 font-mono">
                      <div className="border-r border-zinc-800/80 pr-2">
                        <span className="text-zinc-500 text-[10px] block uppercase tracking-wider">{t.totalScore}</span>
                        <span className="text-2xl sm:text-3xl font-black text-white">{score}</span>
                      </div>
                      <div className="pl-2">
                        <span className="text-zinc-500 text-[10px] block uppercase tracking-wider">{t.maxStreak}</span>
                        <span className="text-2xl sm:text-3xl font-black text-orange-400 flex items-center justify-center gap-1">
                          {maxStreak} <Flame className="w-5 h-5 text-orange-500 inline fill-orange-500/20" />
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5 w-full">
                      <button
                        onClick={startNewGame}
                        className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white font-semibold py-3 rounded-xl transition-all hover:scale-102 hover:shadow-lg hover:shadow-orange-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>{t.btnPlayAgain}</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2.5 w-full">
                        <button
                          onClick={resetToMenu}
                          className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold py-3 rounded-xl transition-all hover:scale-102 border border-zinc-800 active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 text-xs sm:text-sm"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>{t.btnGoMenu}</span>
                        </button>
                        <button
                          onClick={onClose}
                          className="bg-zinc-950 hover:bg-zinc-900 text-orange-400 hover:text-orange-300 font-semibold py-3 rounded-xl transition-all hover:scale-102 border border-orange-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 text-xs sm:text-sm"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>{t.btnGoLobby}</span>
                        </button>
                      </div>
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
