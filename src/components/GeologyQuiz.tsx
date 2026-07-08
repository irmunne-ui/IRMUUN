import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Sparkles, HelpCircle, AlertCircle, RefreshCw, ChevronRight, CheckCircle2, XCircle, Brain, Lightbulb } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  answerIndex: number;
  hint: string;
}

interface GeologyQuizProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'en' | 'mn';
}

export function GeologyQuiz({ isOpen, onClose, currentLang }: GeologyQuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: currentLang }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate quiz questions');
      }
      const data = await response.json();
      if (data.questions && Array.isArray(data.questions)) {
        setQuestions(data.questions);
      } else {
        throw new Error('Invalid quiz response structure');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(currentLang === 'en' ? 'Unable to load dynamic questions from Gemini API. Please try again.' : 'Gemini API-аас асуултууд ачаалахад алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchQuestions();
      // Reset state
      setCurrentIdx(0);
      setScore(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      setGameFinished(false);
    }
  }, [isOpen, currentLang]);

  const playQuizSound = (type: 'correct' | 'wrong' | 'complete') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      if (type === 'correct') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'wrong') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now); // A3
        osc.frequency.setValueAtTime(147, now + 0.15); // D3
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'complete') {
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        gain.connect(ctx.destination);

        const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          osc.connect(gain);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.12);
        });
      }
    } catch (e) {
      console.warn('Audio play blocked:', e);
    }
  };

  const handleOptionSelect = (optIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optIndex);
    setIsAnswered(true);
    const correctIdx = questions[currentIdx].answerIndex;
    if (optIndex === correctIdx) {
      setScore((prev) => prev + 20);
      playQuizSound('correct');
    } else {
      playQuizSound('wrong');
    }
  };

  const handleNext = () => {
    setShowHint(false);
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setGameFinished(true);
      playQuizSound('complete');
    }
  };

  const currentQuestion = questions[currentIdx];

  const t = {
    en: {
      title: "Gemini Geology Quiz",
      subtitle: "Challenge your lithospheric knowledge",
      loadingText: "AI is crafting your geological quest...",
      score: "Score",
      question: "Question",
      next: "Next Question",
      finish: "Finish Quiz",
      correctText: "Spot on! Perfect analysis! +20 XP",
      incorrectText: "Seismic mismatch! Correct answer is:",
      hintBtn: "Unveil Geological Hint",
      retry: "Restart Quiz",
      completed: "Quest Accomplished!",
      completedDesc: "You have traversed the deep lithospheric realms and completed the geological test.",
      rankMaster: "Lithosphere Grandmaster",
      rankNovice: "Hobbyist Geologist",
      rankExplorer: "Tectonic Explorer"
    },
    mn: {
      title: "Геологийн Асуулт Хариулт",
      subtitle: "Литосферийн мэдлэгээ сорих аялал",
      loadingText: "Хиймэл оюун ухаан асуултуудыг бэлдэж байна...",
      score: "Оноо",
      question: "Асуулт",
      next: "Дараагийн асуулт",
      finish: "Дуусгах",
      correctText: "Яг зөв! Маш сайн шинжилгээ! +20 оноо",
      incorrectText: "Алдаатай! Зөв хариулт нь:",
      hintBtn: "Геологийн санамж харах",
      retry: "Дахин эхлүүлэх",
      completed: "Сорилт Амжилттай Дууслаа!",
      completedDesc: "Та дэлхийн литосферийн гүнээр аялж, геологийн мэдлэгийн сорилтыг бүрэн дуусгалаа.",
      rankMaster: "Литосферийн Их Магистр",
      rankNovice: "Сонирхогч Геологич",
      rankExplorer: "Тектоник Судлаач"
    }
  }[currentLang];

  const getRank = (finalScore: number) => {
    if (finalScore >= 80) return t.rankMaster;
    if (finalScore >= 50) return t.rankExplorer;
    return t.rankNovice;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" id="geology-quiz-root">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-zinc-950 border border-[#e8702a]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] z-10 text-white"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e8702a] via-amber-500 to-[#e8702a]" />

            {/* Header */}
            <div className="p-5 border-b border-zinc-900 bg-zinc-900/40 flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e8702a]/10 border border-[#e8702a]/20 flex items-center justify-center text-[#e8702a]">
                  <Brain className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-playfair italic text-lg font-bold flex items-center gap-2">
                    {t.title}
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-sans">{t.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {questions.length > 0 && !gameFinished && (
                  <div className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs font-mono text-[#e8702a] font-bold">
                    {t.score}: {score}
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-900 bg-zinc-900/50 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-[#e8702a]/20 border-t-[#e8702a] animate-spin" />
                    <div className="absolute inset-2 bg-[#e8702a]/10 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#e8702a] animate-pulse" />
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 font-mono animate-pulse">{t.loadingText}</p>
                </div>
              ) : errorMsg ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <AlertCircle className="w-12 h-12 text-red-500 animate-bounce" />
                  <p className="text-sm text-zinc-300 font-mono max-w-sm">{errorMsg}</p>
                  <button
                    onClick={fetchQuestions}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#e8702a] hover:bg-[#d2611f] rounded-full text-xs font-semibold font-mono text-white transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> {t.retry}
                  </button>
                </div>
              ) : gameFinished ? (
                /* Celebration finished screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#e8702a]/10 border border-[#e8702a]/20 flex items-center justify-center text-[#e8702a] mb-4">
                    <Trophy className="w-8 h-8 animate-bounce" />
                  </div>
                  <h4 className="text-xl font-playfair font-bold text-white mb-2">{t.completed}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-md mb-6">{t.completedDesc}</p>

                  <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 w-full max-w-sm flex items-center justify-between mb-6">
                    <div className="text-left font-mono">
                      <span className="text-[10px] text-zinc-500 block uppercase">Traversed Rank</span>
                      <span className="text-sm font-bold text-[#e8702a]">{getRank(score)}</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-[10px] text-zinc-500 block uppercase">Final Score</span>
                      <span className="text-xl font-bold text-white">{score} / 100</span>
                    </div>
                  </div>

                  <button
                    onClick={fetchQuestions}
                    className="flex items-center gap-2 px-6 py-3 bg-[#e8702a] hover:bg-[#d2611f] rounded-full text-xs font-bold text-white uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-500/20 hover:scale-102 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> {t.retry}
                  </button>
                </motion.div>
              ) : (
                /* Core interactive quiz step */
                <div className="flex-1 flex flex-col justify-between">
                  {/* Question and Step tracker */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase mb-2">
                      <span>{t.question} {currentIdx + 1} / {questions.length}</span>
                      <span className="text-[#e8702a] font-bold">20 XP</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold leading-relaxed text-white">
                      {currentQuestion.question}
                    </h4>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2.5 my-4">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrectAnswer = idx === currentQuestion.answerIndex;
                      
                      let optStyle = "bg-zinc-900/40 border-zinc-800 text-zinc-300 hover:border-[#e8702a]/50 hover:bg-[#e8702a]/5";
                      if (isAnswered) {
                        if (isCorrectAnswer) {
                          optStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/20";
                        } else if (isSelected) {
                          optStyle = "bg-red-950/40 border-red-500 text-red-200 shadow-md shadow-red-950/20";
                        } else {
                          optStyle = "bg-zinc-900/10 border-zinc-900 text-zinc-600 opacity-55";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(idx)}
                          disabled={isAnswered}
                          className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-left font-medium transition-all duration-200 flex items-center justify-between cursor-pointer ${optStyle}`}
                        >
                          <span>{option}</span>
                          {isAnswered && isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                          {isAnswered && isSelected && !isCorrectAnswer && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Hint and Status row */}
                  <div className="space-y-3">
                    <AnimatePresence mode="wait">
                      {!isAnswered ? (
                        <motion.div
                          key="hint-section"
                          className="flex flex-col gap-1 items-start"
                        >
                          {showHint ? (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="w-full bg-[#e8702a]/10 border border-[#e8702a]/20 rounded-xl p-3 text-xs text-zinc-300 flex items-start gap-2"
                            >
                              <Lightbulb className="w-4 h-4 text-[#e8702a] shrink-0 mt-0.5 animate-pulse" />
                              <p className="leading-relaxed">{currentQuestion.hint}</p>
                            </motion.div>
                          ) : (
                            <button
                              onClick={() => setShowHint(true)}
                              className="text-[10px] font-mono text-[#e8702a] hover:text-white flex items-center gap-1 transition-colors hover:underline cursor-pointer"
                            >
                              <HelpCircle className="w-3.5 h-3.5" />
                              <span>{t.hintBtn}</span>
                            </button>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="feedback-section"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between"
                        >
                          <div className="text-xs font-mono">
                            {selectedOption === currentQuestion.answerIndex ? (
                              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4" /> {t.correctText}
                              </span>
                            ) : (
                              <span className="text-red-400 font-bold flex items-center gap-1.5">
                                <AlertCircle className="w-4 h-4" /> {t.incorrectText}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={handleNext}
                            className="flex items-center gap-1 px-4 py-2 bg-white text-zinc-950 hover:bg-zinc-100 rounded-full text-xs font-bold font-mono transition-all hover:translate-x-0.5 cursor-pointer"
                          >
                            <span>{currentIdx + 1 < questions.length ? t.next : t.finish}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
