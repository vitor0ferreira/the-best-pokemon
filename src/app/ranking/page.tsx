'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Heading from './components/Heading';
import GeneralRanking from './components/GeneralRanking';
import RankingArticle from './components/RankingArticle';
import { POKEMON_TYPES, ALL_TYPE_KEYS } from '@/src/constants/pokemonTypesInfo';
import { Search, Trophy, RefreshCw } from 'lucide-react';

interface RankedPokemon {
  id: number;
  name: string;
  votes: number;
  types: string[];
}

export default function Ranking() {
  const [selectedType, setSelectedType] = useState<string>('general');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pokemons, setPokemons] = useState<RankedPokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchRankings = useCallback(async (type: string) => {
    setIsLoading(true);
    try {
      const endpoint = type === 'general' ? '/api/ranking/general' : `/api/ranking/${type}`;
      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        setPokemons(data);
      } else {
        setPokemons([]);
      }
    } catch (error) {
      console.error(`Erro ao carregar ranking (${type}):`, error);
      setPokemons([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRankings(selectedType);
  }, [selectedType, fetchRankings]);

  const handleVoteSuccess = useCallback(() => {
    fetchRankings(selectedType);
  }, [fetchRankings, selectedType]);

  const filteredPokemons = useMemo(() => {
    if (!searchQuery.trim()) return pokemons;
    const query = searchQuery.toLowerCase();
    return pokemons.filter(
      (p) => p.name.toLowerCase().includes(query) || p.id.toString().includes(query)
    );
  }, [pokemons, searchQuery]);

  const showPodium = !searchQuery && filteredPokemons.length >= 3;

  return (
    <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Heading & Remaining Votes Banner */}
      <Heading />

      {/* Type Filter Tabs */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-none mb-6">
        <div className="flex items-center gap-2 min-w-max px-2">
          {/* General Tab */}
          <button
            onClick={() => setSelectedType('general')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
              selectedType === 'general'
                ? 'bg-poke-red text-white border-poke-red shadow-glow-red'
                : 'glass-panel text-slate-300 border-white/10 hover:border-white/20'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            Ranking Geral
          </button>

          {/* 18 Type Tabs */}
          {ALL_TYPE_KEYS.map((key) => {
            const typeInfo = POKEMON_TYPES[key];
            const isSelected = selectedType === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedType(key)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? `${typeInfo.badgeBg} font-bold shadow-lg scale-105 border-current`
                    : 'glass-panel text-slate-400 border-white/5 hover:text-slate-200 hover:border-white/15'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: typeInfo.color }}
                />
                {typeInfo.nameEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Refresh Bar */}
      <div className="w-full max-w-4xl flex items-center gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filtrar por nome ou ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl glass-panel border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-poke-cyan transition-colors"
          />
        </div>

        <button
          onClick={() => fetchRankings(selectedType)}
          className="p-3 rounded-2xl glass-panel border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-colors"
          title="Atualizar ranking"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="w-full max-w-4xl space-y-3 my-8">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="w-full h-16 rounded-2xl glass-panel border border-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="w-full">
          {/* Top 3 Podium (Shown when not filtering search) */}
          {showPodium && (
            <GeneralRanking
              pokemonsList={filteredPokemons.slice(0, 3)}
              onVoteSuccess={handleVoteSuccess}
            />
          )}

          {/* List Article for ranks #4+ or full search results */}
          <RankingArticle
            title={
              selectedType === 'general'
                ? 'Hall da Fama (Demais Posições)'
                : `Top Pokémon do Tipo ${POKEMON_TYPES[selectedType]?.nameEn || selectedType}`
            }
            typeKey={selectedType === 'general' ? '' : selectedType}
            pokemonsList={showPodium ? filteredPokemons.slice(3) : filteredPokemons}
            startRank={showPodium ? 4 : 1}
            onVoteSuccess={handleVoteSuccess}
          />
        </div>
      )}
    </main>
  );
}