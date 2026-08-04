'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Vote, ChevronRight } from 'lucide-react';
import { useVoteContext } from '@/src/contexts/VoteContext';
import Badge from '@/src/components/ui/Badge';

interface RankingItemProps {
  id: number;
  pokemon: string;
  rank: number;
  votes: number;
  types?: string[];
  maxVotes?: number;
  onVoteSuccess?: () => void;
}

function RankingItem({ id, pokemon, rank, votes, types = [], maxVotes = 100, onVoteSuccess }: RankingItemProps) {
  const { initiateVote } = useVoteContext();

  const votePercentage = maxVotes > 0 ? Math.min(100, Math.round((votes / maxVotes) * 100)) : 0;

  return (
    <div className="w-full glass-panel glass-panel-hover rounded-2xl p-3 sm:p-4 border border-white/10 flex items-center justify-between gap-3 sm:gap-4 relative overflow-hidden group">
      {/* Background Vote Progress Fill Bar */}
      <div
        className="absolute top-0 left-0 bottom-0 bg-poke-red/5 transition-all duration-500 pointer-events-none -z-10"
        style={{ width: `${votePercentage}%` }}
      />

      {/* Left: Rank & Artwork */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <span className="w-8 sm:w-10 text-center font-mono font-black text-base sm:text-xl text-slate-400 group-hover:text-amber-400 transition-colors">
          #{rank}
        </span>

        <Link
          href={`/catalogue/${pokemon}`}
          className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-slate-900/60 p-1 border border-white/10 overflow-hidden flex items-center justify-center shrink-0 group-hover:border-poke-cyan/50 transition-colors"
        >
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt={pokemon}
            fill
            className="object-contain p-1 group-hover:scale-110 transition-transform"
            sizes="64px"
          />
        </Link>
      </div>

      {/* Middle: Pokemon Info & Progress */}
      <div className="flex flex-col flex-grow min-w-0">
        <div className="flex items-center gap-2">
          <Link
            href={`/catalogue/${pokemon}`}
            className="font-extrabold text-white text-base sm:text-lg capitalize truncate hover:text-poke-cyan transition-colors"
          >
            {pokemon}
          </Link>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-500">
            #{id.toString().padStart(4, '0')}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {types.map((t) => (
            <Badge key={t} type={t} size="sm" />
          ))}
        </div>
      </div>

      {/* Right: Votes & Vote Button */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex flex-col items-end">
          <span className="font-mono font-bold text-white text-sm sm:text-base tabular-nums">
            {votes}
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-mono">votos</span>
        </div>

        <button
          onClick={() => initiateVote({ id, name: pokemon }, onVoteSuccess)}
          className="px-3 py-2 rounded-xl bg-poke-red/20 hover:bg-poke-red text-poke-red hover:text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <Vote className="w-4 h-4" />
          <span className="hidden sm:inline">Votar</span>
        </button>
      </div>
    </div>
  );
}

export default React.memo(RankingItem);