'use client';

import React from 'react';
import { Trophy, Sparkles, Flame } from 'lucide-react';
import { useVoteContext } from '@/src/contexts/VoteContext';

export default function Heading() {
  const { remainingVotes } = useVoteContext();

  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-poke-gold/10 border border-poke-gold/20 text-poke-gold text-xs font-bold uppercase tracking-wider mb-3 shadow-glow-gold">
        <Trophy className="w-4 h-4" /> Hall da Fama Pokémon
      </div>

      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
        RANKING <span className="text-gradient-gold">OFICIAL DE VOTOS</span>
      </h1>

      <p className="text-slate-400 text-sm sm:text-base mt-2">
        Acompanhe a classificação em tempo real dos Pokémon mais votados pela comunidade.
      </p>

      {remainingVotes !== null && (
        <div className="mt-4 px-4 py-2 rounded-2xl glass-panel border border-amber-400/30 text-amber-300 text-sm font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Votos disponíveis hoje: <strong className="text-white text-base font-bold font-mono">{remainingVotes}</strong> / 10</span>
        </div>
      )}
    </div>
  );
}