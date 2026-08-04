'use client';

import React from 'react';
import Image from 'next/image';
import { Crown, Trophy, Award, Vote } from 'lucide-react';
import { useVoteContext } from '@/src/contexts/VoteContext';
import Badge from '@/src/components/ui/Badge';

interface RankedPokemon {
  id: number;
  name: string;
  votes: number;
  types: string[];
}

export default function GeneralRanking({ pokemonsList, onVoteSuccess }: { pokemonsList: RankedPokemon[]; onVoteSuccess?: () => void }) {
  const { initiateVote } = useVoteContext();

  if (!pokemonsList || pokemonsList.length === 0) {
    return null;
  }

  const first = pokemonsList[0];
  const second = pokemonsList[1];
  const third = pokemonsList[2];

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <h2 className="text-center text-xs uppercase tracking-widest font-mono font-bold text-poke-gold mb-6 flex items-center justify-center gap-2">
        <Crown className="w-4 h-4" /> Pódio dos 3 Melhores Pokémon
      </h2>

      <div className="flex items-end justify-center gap-3 sm:gap-6 px-2">
        {/* #2 SECOND PLACE (SILVER) */}
        {second && (
          <div className="flex flex-col items-center flex-1 max-w-[200px]">
            {/* Pokemon Card */}
            <div
              onClick={() => initiateVote({ id: second.id, name: second.name }, onVoteSuccess)}
              className="group cursor-pointer w-full glass-panel border border-slate-400/30 hover:border-slate-300 rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center transition-all hover:scale-105 shadow-lg relative overflow-hidden"
            >
              <span className="absolute top-2 left-2 w-7 h-7 rounded-full bg-slate-400/20 text-slate-300 font-black text-xs flex items-center justify-center border border-slate-400/40">
                #2
              </span>

              <div className="relative w-20 h-20 sm:w-28 sm:h-28 my-2">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${second.id}.png`}
                  alt={second.name}
                  fill
                  className="object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                />
              </div>

              <h3 className="font-extrabold text-white text-sm sm:text-base capitalize truncate w-full mt-1">
                {second.name}
              </h3>

              <div className="flex gap-1 my-1">
                {second.types?.map((t) => (
                  <Badge key={t} type={t} size="sm" />
                ))}
              </div>

              <span className="text-xs font-mono font-bold text-slate-300 mt-1">
                {second.votes} Votos
              </span>

              <button className="mt-3 w-full py-1 rounded-xl bg-slate-400/20 text-slate-200 group-hover:bg-slate-300 group-hover:text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1">
                <Vote className="w-3.5 h-3.5" /> Votar
              </button>
            </div>

            {/* Podium Base */}
            <div className="w-full h-20 sm:h-28 bg-silver-podium border-t-2 border-slate-400/40 rounded-t-xl flex items-center justify-center text-slate-400 font-black text-2xl sm:text-3xl mt-2">
              <Award className="w-8 h-8 text-slate-300" />
            </div>
          </div>
        )}

        {/* #1 FIRST PLACE (GOLD CHAMPION) */}
        {first && (
          <div className="flex flex-col items-center flex-1 max-w-[240px] -translate-y-4">
            <div className="flex items-center gap-1 text-amber-400 font-bold text-xs uppercase mb-1 animate-bounce">
              <Crown className="w-4 h-4" /> Campeão
            </div>

            <div
              onClick={() => initiateVote({ id: first.id, name: first.name }, onVoteSuccess)}
              className="group cursor-pointer w-full glass-panel border-2 border-amber-400/50 hover:border-amber-300 rounded-3xl p-4 sm:p-5 flex flex-col items-center text-center transition-all hover:scale-105 shadow-glow-gold relative overflow-hidden bg-gradient-to-b from-amber-500/10 to-obsidian-surface"
            >
              <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-amber-400 text-obsidian font-black text-sm flex items-center justify-center shadow-lg">
                #1
              </span>

              <div className="relative w-24 h-24 sm:w-36 sm:h-36 my-2">
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl animate-pulse" />
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${first.id}.png`}
                  alt={first.name}
                  fill
                  className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform"
                />
              </div>

              <h3 className="font-black text-white text-base sm:text-xl capitalize truncate w-full mt-1">
                {first.name}
              </h3>

              <div className="flex gap-1 my-1">
                {first.types?.map((t) => (
                  <Badge key={t} type={t} size="sm" />
                ))}
              </div>

              <span className="text-sm font-mono font-bold text-amber-400 mt-1">
                {first.votes} Votos
              </span>

              <button className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-obsidian font-black text-xs sm:text-sm transition-transform shadow-md flex items-center justify-center gap-1.5">
                <Vote className="w-4 h-4" /> Votar no Campeão
              </button>
            </div>

            {/* Podium Base */}
            <div className="w-full h-28 sm:h-36 bg-gold-podium border-t-2 border-amber-400/60 rounded-t-2xl flex items-center justify-center text-amber-400 font-black text-3xl sm:text-4xl mt-2">
              <Trophy className="w-10 h-10 text-amber-400" />
            </div>
          </div>
        )}

        {/* #3 THIRD PLACE (BRONZE) */}
        {third && (
          <div className="flex flex-col items-center flex-1 max-w-[200px]">
            <div
              onClick={() => initiateVote({ id: third.id, name: third.name }, onVoteSuccess)}
              className="group cursor-pointer w-full glass-panel border border-amber-700/30 hover:border-amber-600 rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center transition-all hover:scale-105 shadow-lg relative overflow-hidden"
            >
              <span className="absolute top-2 left-2 w-7 h-7 rounded-full bg-amber-700/20 text-amber-500 font-black text-xs flex items-center justify-center border border-amber-700/40">
                #3
              </span>

              <div className="relative w-20 h-20 sm:w-28 sm:h-28 my-2">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${third.id}.png`}
                  alt={third.name}
                  fill
                  className="object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                />
              </div>

              <h3 className="font-extrabold text-white text-sm sm:text-base capitalize truncate w-full mt-1">
                {third.name}
              </h3>

              <div className="flex gap-1 my-1">
                {third.types?.map((t) => (
                  <Badge key={t} type={t} size="sm" />
                ))}
              </div>

              <span className="text-xs font-mono font-bold text-amber-600 mt-1">
                {third.votes} Votos
              </span>

              <button className="mt-3 w-full py-1 rounded-xl bg-amber-700/20 text-amber-400 group-hover:bg-amber-600 group-hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1">
                <Vote className="w-3.5 h-3.5" /> Votar
              </button>
            </div>

            {/* Podium Base */}
            <div className="w-full h-16 sm:h-24 bg-bronze-podium border-t-2 border-amber-700/40 rounded-t-xl flex items-center justify-center text-amber-600 font-black text-xl sm:text-2xl mt-2">
              <Award className="w-7 h-7 text-amber-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}