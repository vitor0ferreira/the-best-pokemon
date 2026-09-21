'use client';

import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-white/10 bg-obsidian-surface py-10 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <span className="font-extrabold text-lg text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-poke-gold" />
            THE BEST <span className="text-gradient-red">POKÉMON</span>
          </span>
          <p className="text-xs text-slate-400 max-w-md">
            {t('footer.tagline')}
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
          <Link href="/ranking" className="hover:text-white transition-colors">{t('nav.rankings')}</Link>
          <Link href="/catalogue" className="hover:text-white transition-colors">{t('nav.pokedex')}</Link>
          <Link href="/profile" className="hover:text-white transition-colors">{t('nav.profile')}</Link>
        </div>

        <div className="text-xs text-slate-500 text-center md:text-right">
          <p>{t('footer.builtWith')}</p>
          <p className="mt-0.5">{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
