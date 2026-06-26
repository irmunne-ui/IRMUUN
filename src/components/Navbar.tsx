/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onSignUpClick?: () => void;
  onTabChange?: (tabId: string) => void;
}

export function Navbar({ onSignUpClick, onTabChange }: NavbarProps) {
  const [activeTab, setActiveTab] = useState<string>('Course');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const tabs = [
    { id: 'Course', label: 'Course' },
    { id: 'Guides', label: 'Field Guides' },
    { id: 'Geology', label: 'Geology' },
    { id: 'Plans', label: 'Plans' },
    { id: 'Tour', label: 'Live Tour' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 select-none">
        {/* Left Brand Area */}
        <div className="flex items-center gap-3 z-[110]">
          <svg
            width="26"
            height="26"
            viewBox="0 0 256 256"
            className="w-6 h-6 shrink-0 transition-transform duration-500 hover:rotate-18"
            style={{ fill: '#ffffff' }}
          >
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-2xl font-playfair italic font-medium tracking-tight">
            Lithos
          </span>
        </div>

        {/* Center Pill Menu (desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-1 items-center gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-white bg-white/20 shadow-sm'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Action Button (desktop) */}
        <div className="hidden md:block z-[110]">
          <button
            onClick={onSignUpClick}
            className="bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:bg-gray-100 hover:scale-[1.03] active:scale-95 shadow-sm"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="md:hidden z-[110] flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white/90 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex flex-col justify-center px-8 sm:px-12"
          >
            <div className="flex flex-col gap-6 text-left">
              <span className="text-white/45 text-xs font-mono tracking-widest uppercase mb-2">
                Discovery Navigation
              </span>
              {tabs.map((tab, idx) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={tab.id}
                    onClick={() => {
                      handleTabClick(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-3xl font-medium text-left transition-colors ${
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span className="font-playfair italic text-white/40 mr-3 text-2xl">
                      0{idx + 1}.
                    </span>
                    {tab.label}
                  </motion.button>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="h-px bg-white/10 my-4"
              />

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => {
                  if (onSignUpClick) onSignUpClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white text-center text-base font-semibold py-4 rounded-full transition-all"
              >
                Sign Up
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
