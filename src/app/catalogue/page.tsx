'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { ALL_POKEMON_LIST } from '@/src/constants/allPokemonList';
import PokemonCard from './components/PokemonCard';
import { Search, BookOpen, Filter, ArrowUpDown } from 'lucide-react';
import { POKEMON_TYPES, ALL_TYPE_KEYS } from '@/src/constants/pokemonTypesInfo';

interface PokemonItem {
  name: string;
  url: string;
}

export default function Catalogue() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'id-asc' | 'id-desc' | 'name-asc'>('id-asc');

  const PAGE_SIZE = 36;
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Helper to extract Pokemon ID from URL
  const getPokemonId = (url: string) => {
    const parts = url.split('/');
    return Number(parts[parts.length - 2]);
  };

  // Filter & Sort Pokemon
  const processedPokemons = useMemo(() => {
    let list = ALL_POKEMON_LIST.map((p: PokemonItem) => ({
      name: p.name,
      url: p.url,
      id: getPokemonId(p.url),
    }));

    // Search filter
    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.id.toString().includes(q)
      );
    }

    // Sort
    if (sortOrder === 'id-asc') {
      list.sort((a, b) => a.id - b.id);
    } else if (sortOrder === 'id-desc') {
      list.sort((a, b) => b.id - a.id);
    } else if (sortOrder === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [searchValue, sortOrder]);

  const displayedList = useMemo(() => {
    return processedPokemons.slice(0, visibleCount);
  }, [processedPokemons, visibleCount]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchValue, selectedType, sortOrder]);

  // Infinite Scroll Observer (Silent, no alerts!)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          if (visibleCount < processedPokemons.length) {
            setIsLoadingMore(true);
            setTimeout(() => {
              setVisibleCount((prev) => prev + PAGE_SIZE);
              setIsLoadingMore(false);
            }, 200);
          }
        }
      },
      { threshold: 0.5 }
    );

    const current = observerTarget.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [isLoadingMore, visibleCount, processedPokemons.length]);

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-poke-cyan/10 border border-poke-cyan/20 text-poke-cyan text-xs font-bold uppercase tracking-wider mb-3 shadow-glow-cyan">
          <BookOpen className="w-4 h-4" /> Enciclopédia de Espécies
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          POKÉDEX <span className="text-gradient-cyan">NACIONAL</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Explore todas as espécies cadastradas, consulte estatísticas base e vote nas suas favoritas.
        </p>
      </div>

      {/* Controls: Search & Sort Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar Pokémon por nome ou ID..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl glass-panel border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-poke-cyan transition-colors"
          />
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl glass-panel border border-white/10 text-sm font-semibold text-slate-200 focus:outline-none focus:border-poke-cyan transition-colors cursor-pointer bg-obsidian-surface"
          >
            <option value="id-asc">Número Dex (#1 - #1025)</option>
            <option value="id-desc">Número Dex (#1025 - #1)</option>
            <option value="name-asc">Nome (A - Z)</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="w-full flex items-center justify-between px-2 mb-4 text-xs font-mono text-slate-400">
        <span>Exibindo <strong>{displayedList.length}</strong> de <strong>{processedPokemons.length}</strong> espécies</span>
      </div>

      {/* Grid of Pokemon Cards */}
      {displayedList.length === 0 ? (
        <div className="w-full py-16 text-center glass-panel rounded-3xl border border-white/10 my-8">
          <p className="text-slate-400 text-base">Nenhum Pokémon encontrado para &quot;{searchValue}&quot;.</p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayedList.map((pokemon) => (
            <PokemonCard key={pokemon.id} name={pokemon.name} id={pokemon.id} />
          ))}
        </div>
      )}

      {/* Silent Infinite Scroll Trigger */}
      {visibleCount < processedPokemons.length && (
        <div ref={observerTarget} className="w-full py-8 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-poke-cyan/30 border-t-poke-cyan rounded-full animate-spin" />
        </div>
      )}

      {/* End of results footer message */}
      {visibleCount >= processedPokemons.length && processedPokemons.length > 0 && (
        <p className="text-xs font-mono text-slate-500 my-8 text-center">
          ✓ Todos os {processedPokemons.length} Pokémon desta busca foram carregados.
        </p>
      )}
    </main>
  );
}