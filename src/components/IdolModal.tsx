import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, Trophy, Bot, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface IdolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IdolModal({ isOpen, onClose }: IdolModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Siuuu! I am Penaldo (Cristiano Ronaldo AI), your friendly Idol Coach on this portfolio website! Are you ready to work hard and achieve greatness today? Ask me anything about football, mindset, or projects!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', text: query }];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botType: 'idol',
          message: query,
          history: messages.slice(1) // exclude initial greeting
        })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: data.error || "Siuuu! Sorry, had a quick tactical timeout. Try again!" }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Network issue! Even the GOAT misses a pass sometimes. Try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "How do I train like the GOAT?",
    "What is your dream?",
    "Tell me about this website",
    "Say Siuuu!"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 select-none" id="idol-modal-root">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-gradient-to-b from-gray-900 to-black border border-[#e8702a]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[85vh] z-10 text-white"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-[#e8702a] flex items-center justify-center text-black font-bold shadow-md">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-playfair italic text-xl font-bold flex items-center gap-2">
                    🤖 Idol Coach <span className="not-italic text-xs bg-[#e8702a]/20 text-[#e8702a] px-2 py-0.5 rounded-full font-mono font-semibold">GOAT AI</span>
                  </h3>
                  <p className="text-xs text-white/60">Cristiano Ronaldo (Penaldo) Persona</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-[#e8702a]/20 border border-[#e8702a]/40 flex items-center justify-center shrink-0 mt-1 text-[#e8702a]">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#e8702a] text-white rounded-tr-none font-medium shadow-md'
                        : 'bg-white/10 border border-white/10 text-white/90 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-8 h-8 rounded-full bg-[#e8702a]/20 border border-[#e8702a]/40 flex items-center justify-center shrink-0 text-[#e8702a]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white/60 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#e8702a] animate-pulse" />
                    Penaldo is warming up a Siuuu response...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            {messages.length === 1 && (
              <div className="px-4 sm:px-6 pb-2 flex flex-wrap gap-2">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="text-xs bg-white/5 hover:bg-[#e8702a]/20 border border-white/10 hover:border-[#e8702a]/40 text-white/80 hover:text-white px-3 py-1.5 rounded-full transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 bg-white/5 border-t border-white/10 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Idol Coach Penaldo..."
                className="flex-1 bg-black/40 border border-white/15 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#e8702a] transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-12 h-12 rounded-full bg-[#e8702a] hover:bg-[#d2611f] disabled:opacity-40 disabled:hover:bg-[#e8702a] flex items-center justify-center text-white transition-all shadow-md active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
