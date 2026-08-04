'use client';

import React from 'react';
import RankingItem from './RankingItem';
import { POKEMON_TYPES } from '@/src/constants/pokemonTypesInfo';
import { Trophy } from 'lucide-react';

interface ArticleProps {
  title: string;
  typeKey?: string;
  pokemonsList: any[];
  startRank?: number;
  onVoteSuccess?: () => void;
}

export default function RankingArticle({
  title,
  typeKey = '',
  pokemonsList,
  startRank = 1,
  onVoteSuccess,
}: ArticleProps) {
  const typeInfo = POKEMON_TYPES[typeKey.toLowerCase()];
  const maxVotes = pokemonsList.length > 0 ? pokemonsList[0].votes : 100;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-3 my-6">
      {/* Category Header Bar */}
      <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          {typeInfo ? (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: typeInfo.color }}
            />
          ) : (
            <Trophy className="w-4 h-4 text-poke-gold" />
          )}
          <h2 className="text-xl sm:text-2xl font-black text-white capitalize tracking-tight">
            {title}
          </h2>
        </div>

        <span className="text-xs font-mono text-slate-400">
          {pokemonsList.length} Pokémon listados
        </span>
      </div>

      {/* List items */}
      <div className="flex flex-col gap-2">
        {pokemonsList.length === 0 ? (
          <p className="text-center py-8 text-slate-500 text-sm glass-panel rounded-2xl">
            Nenhum voto registrado nesta categoria ainda. Seja o primeiro a votar!
          </p>
        ) : (
          pokemonsList.map((pokemon, idx) => (
            <RankingItem
              key={pokemon.id}
              id={pokemon.id}
              pokemon={pokemon.name}
              rank={startRank + idx}
              votes={pokemon.votes}
              types={pokemon.types || (typeKey ? [typeKey] : [])}
              maxVotes={maxVotes}
              onVoteSuccess={onVoteSuccess}
            />
          ))
        )}
      </div>
    </div>
  );
}