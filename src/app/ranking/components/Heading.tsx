'use client';

import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import { useVoteContext } from '@/src/contexts/VoteContext';
import { useLanguage } from '@/src/contexts/LanguageContext';

export default function Heading() {
  const { remainingVotes } = useVoteContext();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-poke-gold/10 border border-poke-gold/20 text-poke-gold text-xs font-bold uppercase tracking-wider mb-3 shadow-glow-gold">
        <Trophy className="w-4 h-4" /> {t('rankings.badge')}
      </div>

      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
        {t('rankings.title')} <span className="text-gradient-gold">{t('rankings.titleHighlight')}</span>
      </h1>

      <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
        {t('rankings.subtitle')}
      </p>

      {remainingVotes !== null && (
        <div className="mt-4 px-4 py-2 rounded-2xl glass-panel border border-amber-400/30 text-amber-600 dark:text-amber-300 text-sm font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span>{t('rankings.availableVotes')} <strong className="text-slate-900 dark:text-white text-base font-bold font-mono">{remainingVotes}</strong> / 10</span>
        </div>
      )}
    </div>
  );
}