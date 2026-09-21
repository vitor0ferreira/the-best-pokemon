'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import rawPokemonList from '@/prisma/pokemon.json';
import PokemonCard from './components/PokemonCard';
import { Search, BookOpen, ArrowUpDown, Filter, RotateCcw, X, Layers, Sparkles } from 'lucide-react';
import { POKEMON_TYPES, ALL_TYPE_KEYS } from '@/src/constants/pokemonTypesInfo';
import { GENERATIONS } from '@/src/constants/pokemonGenerations';
import { useLanguage } from '@/src/contexts/LanguageContext';

interface PokemonItem {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

const ALL_POKEMONS: PokemonItem[] = rawPokemonList as PokemonItem[];

export default function Catalogue() {
  const { t, language } = useLanguage();

  const [searchValue, setSearchValue] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedGen, setSelectedGen] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'id-asc' | 'id-desc' | 'name-asc' | 'name-desc'>('id-asc');

  const PAGE_SIZE = 36;
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Determine active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchValue.trim()) count++;
    if (selectedType !== 'all') count++;
    if (selectedGen !== 'all') count++;
    return count;
  }, [searchValue, selectedType, selectedGen]);

  const handleClearFilters = useCallback(() => {
    setSearchValue('');
    setSelectedType('all');
    setSelectedGen('all');
    setSortOrder('id-asc');
  }, []);

  // Filter & Sort Pokemon in-memory (< 2ms)
  const filteredPokemons = useMemo(() => {
    let list = ALL_POKEMONS;

    // Search filter (Name or Dex ID)
    if (searchValue.trim()) {
      const q = searchValue.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.id.toString().includes(q)
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      list = list.filter((p) => p.types.includes(selectedType));
    }

    // Generation filter
    if (selectedGen !== 'all') {
      const genId = parseInt(selectedGen, 10);
      const genInfo = GENERATIONS.find((g) => g.id === genId);
      if (genInfo) {
        list = list.filter((p) => p.id >= genInfo.start && p.id <= genInfo.end);
      }
    }

    // Sort
    const sorted = [...list];
    if (sortOrder === 'id-asc') {
      sorted.sort((a, b) => a.id - b.id);
    } else if (sortOrder === 'id-desc') {
      sorted.sort((a, b) => b.id - a.id);
    } else if (sortOrder === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

    return sorted;
  }, [searchValue, selectedType, selectedGen, sortOrder]);

  // Sliced items for windowed rendering
  const displayedList = useMemo(() => {
    return filteredPokemons.slice(0, visibleCount);
  }, [filteredPokemons, visibleCount]);

  // Reset pagination when any filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchValue, selectedType, selectedGen, sortOrder]);

  // Silent infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          if (visibleCount < filteredPokemons.length) {
            setIsLoadingMore(true);
            setTimeout(() => {
              setVisibleCount((prev) => prev + PAGE_SIZE);
              setIsLoadingMore(false);
            }, 180);
          }
        }
      },
      { threshold: 0.4 }
    );

    const current = observerTarget.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [isLoadingMore, visibleCount, filteredPokemons.length]);

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-poke-cyan/10 border border-poke-cyan/20 text-poke-cyan text-xs font-bold uppercase tracking-wider mb-3 shadow-glow-cyan">
          <BookOpen className="w-4 h-4" /> {t('pokedex.badge')}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          {t('pokedex.title')} <span className="text-gradient-cyan">{t('pokedex.titleHighlight')}</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
          {t('pokedex.subtitle')}
        </p>
      </div>

      {/* Advanced Filter Control Box */}
      <div className="w-full glass-panel rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-white/10 shadow-xl mb-8 space-y-4">
        {/* Row 1: Search Bar & Clear Filters Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('pokedex.searchPlaceholder')}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-300/60 dark:border-white/10 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-poke-cyan transition-colors"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg transition-colors"
                title="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Reset Filters CTA Button */}
          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-400 border border-red-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('pokedex.clearFilters')}</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-500/20 text-[10px]">
                {activeFiltersCount}
              </span>
            </button>
          )}
        </div>

        {/* Row 2: Filters Grid (Type, Generation, Sort) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-1 border-t border-slate-200 dark:border-white/5">
          {/* 1. Elemental Type Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-poke-red" />
              {t('pokedex.typeFilter')}
            </label>
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-300/60 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-poke-red transition-colors cursor-pointer appearance-none"
              >
                <option value="all">{t('pokedex.allTypes')}</option>
                {ALL_TYPE_KEYS.map((key) => {
                  const info = POKEMON_TYPES[key];
                  const typeLabel = language === 'pt' ? info.namePt : info.nameEn;
                  return (
                    <option key={key} value={key}>
                      {typeLabel}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* 2. Generation Filter */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              {t('pokedex.genFilter')}
            </label>
            <div className="relative">
              <select
                value={selectedGen}
                onChange={(e) => setSelectedGen(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-300/60 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer appearance-none"
              >
                <option value="all">{t('pokedex.allGens')}</option>
                {GENERATIONS.map((gen) => {
                  const genLabel = language === 'pt' ? gen.namePt : gen.nameEn;
                  return (
                    <option key={gen.id} value={gen.id.toString()}>
                      {genLabel} ({gen.region}) — #{gen.start} - #{gen.end}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* 3. Sort Order */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-poke-cyan" />
              {t('pokedex.sortBy')}
            </label>
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-300/60 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-poke-cyan transition-colors cursor-pointer appearance-none"
              >
                <option value="id-asc">{t('pokedex.sortDexAsc')}</option>
                <option value="id-desc">{t('pokedex.sortDexDesc')}</option>
                <option value="name-asc">{t('pokedex.sortNameAsc')}</option>
                <option value="name-desc">{t('pokedex.sortNameDesc')}</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Active Filter Chips Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-200 dark:border-white/5 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] font-semibold">
              {t('pokedex.activeFilters', { count: activeFiltersCount })}:
            </span>

            {/* Type Chip */}
            {selectedType !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-poke-red/20 border border-poke-red/40 text-poke-red font-bold text-xs">
                <span>
                  {language === 'pt'
                    ? POKEMON_TYPES[selectedType]?.namePt
                    : POKEMON_TYPES[selectedType]?.nameEn}
                </span>
                <button
                  onClick={() => setSelectedType('all')}
                  className="hover:text-poke-red/70 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Generation Chip */}
            {selectedGen !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-300 font-bold text-xs">
                <span>
                  {GENERATIONS.find((g) => g.id.toString() === selectedGen)?.roman} (
                  {GENERATIONS.find((g) => g.id.toString() === selectedGen)?.region})
                </span>
                <button
                  onClick={() => setSelectedGen('all')}
                  className="hover:text-amber-600/70 dark:hover:text-amber-300/70 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Search Query Chip */}
            {searchValue.trim() && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-poke-cyan/20 border border-poke-cyan/40 text-poke-cyan font-bold text-xs">
                <span>&quot;{searchValue}&quot;</span>
                <button
                  onClick={() => setSearchValue('')}
                  className="hover:text-poke-cyan/70 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Count Bar */}
      <div className="w-full flex items-center justify-between px-2 mb-4 text-xs font-mono text-slate-500 dark:text-slate-400">
        <span>
          {t('pokedex.displayingCount', {
            shown: displayedList.length,
            total: filteredPokemons.length,
          })}
        </span>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          Total Dex: 1025
        </span>
      </div>

      {/* Grid of Pokemon Cards */}
      {displayedList.length === 0 ? (
        <div className="w-full py-16 text-center glass-panel rounded-3xl border border-slate-200 dark:border-white/10 my-8 flex flex-col items-center">
          <p className="text-slate-600 dark:text-slate-400 text-base mb-4">{t('pokedex.notFound')}</p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t('pokedex.clearFilters')}
          </button>
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayedList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              id={pokemon.id}
              types={pokemon.types}
            />
          ))}
        </div>
      )}

      {/* Silent Infinite Scroll Trigger */}
      {visibleCount < filteredPokemons.length && (
        <div ref={observerTarget} className="w-full py-8 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-poke-cyan/30 border-t-poke-cyan rounded-full animate-spin" />
        </div>
      )}

      {/* End of results message */}
      {visibleCount >= filteredPokemons.length && filteredPokemons.length > 0 && (
        <p className="text-xs font-mono text-slate-500 my-8 text-center">
          {t('pokedex.allLoaded', { count: filteredPokemons.length })}
        </p>
      )}
    </main>
  );
}