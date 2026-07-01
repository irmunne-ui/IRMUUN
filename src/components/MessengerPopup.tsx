import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Bot, Smile, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function MessengerPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Yo, what's up! I'm irmuun's AI twin, super chill and taivan. Sike! Just playing on my mobile phone and playing volleyball. I dream to be a hacker one day! Ask me about the goy heseg (beautiful parts) or sonirholtoi heseg (interesting parts) of my portfolio, nibba!"
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
          botType: 'me',
          message: query,
          history: messages.slice(1) // exclude greeting
        })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: data.error || "Zail! Quick glitch. Try again, nibba!" }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Zail, my connection is lagging! Try again, brochacho." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Explain the 'goy heseg' of this site",
    "Explain the 'sonirholtoi heseg'",
    "What are your hobbies?",
    "What is your dream?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[150] select-none pointer-events-auto" id="messenger-popup-container">
      {/* Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="absolute bottom-16 right-0 w-[320px] sm:w-[360px] bg-gray-950/95 border border-white/15 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[460px] text-white"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-sm border border-white/30">
                    <Smile className="w-5 h-5" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-blue-600 rounded-full" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm leading-tight">Me-AI (Irmuun)</h4>
                  <p className="text-[11px] text-blue-100 opacity-90">Portfolio Twin Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                aria-label="Close messenger popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-black/40">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'model' && (
                    <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0 mt-1 text-blue-400">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none font-medium shadow-sm'
                        : 'bg-white/10 border border-white/10 text-white/90 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 justify-start items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0 text-blue-400">
                    <Loader2 className="w-3 h-3 animate-spin" />
                  </div>
                  <div className="bg-white/10 border border-white/10 rounded-2xl px-3.5 py-2 text-[11px] text-white/50 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                    Irmuun twin is typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5 bg-black/40">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="text-[11px] bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-500/40 text-white/80 hover:text-white px-2.5 py-1 rounded-full transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Footer Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-2.5 bg-gray-900 border-t border-white/10 flex gap-1.5 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Irmuun AI..."
                className="flex-1 bg-black/50 border border-white/15 rounded-full px-4 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 flex items-center justify-center text-white transition-all shadow shrink-0 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Icon Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-2xl border-2 border-white/30 group"
        aria-label="Open Messenger Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7 fill-white/20" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-black"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
