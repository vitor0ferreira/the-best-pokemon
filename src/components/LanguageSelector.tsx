'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES, Language } from '../locales';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-200/80 hover:bg-slate-300/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-300/60 dark:border-white/10 hover:border-slate-400/60 dark:hover:border-white/20 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-poke-red/50 shadow-sm"
        aria-label="Select Language"
        title="Change language / Mudar idioma"
      >
        <span className="text-base leading-none select-none">{currentLang.flag}</span>
        <span className="uppercase font-mono text-[11px] tracking-wider">{currentLang.code}</span>
        <ChevronDown
          className={`w-3 h-3 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-44 glass-panel rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl p-1.5 z-50 overflow-hidden text-slate-800 dark:text-slate-200"
          >
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-white/10 mb-1 flex items-center gap-1.5">
              <Globe className="w-3 h-3" /> Language / Idioma
            </div>

            <div className="flex flex-col gap-1">
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-poke-red/20 text-poke-red dark:text-white font-bold border border-poke-red/30'
                        : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base select-none">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-poke-red" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
