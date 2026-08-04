'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PokemonData } from '@/src/types/pokemonTypes';
import { useVoteContext } from '@/src/contexts/VoteContext';
import Badge from '@/src/components/ui/Badge';
import StatBar from '@/src/components/ui/StatBar';
import { Volume2, Sparkles, Trophy, ArrowLeft, RefreshCw, Zap, Shield, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PokemonDetailsPage() {
  const { pokemon } = useParams();
  const pokemonParam = Array.isArray(pokemon) ? pokemon[0] : pokemon;

  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isShiny, setIsShiny] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const { initiateVote } = useVoteContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getPokemonData = useCallback(async () => {
    if (!pokemonParam) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/pokemons?pokemon=${pokemonParam.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Erro da API: ${response.statusText}`);
      }
      const data = await response.json();
      setPokemonData(data);
    } catch (err: any) {
      console.error('Falha ao buscar dados do Pokémon:', err);
      setError(err.message || 'Não foi possível carregar os dados.');
    } finally {
      setIsLoading(false);
    }
  }, [pokemonParam]);

  useEffect(() => {
    getPokemonData();
  }, [getPokemonData]);

  const playCryAudio = () => {
    if (!pokemonData) return;
    try {
      const audioUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonData.id}.ogg`;
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const newAudio = new Audio(audioUrl);
      audioRef.current = newAudio;
      setIsPlayingAudio(true);
      newAudio.play();
      newAudio.onended = () => setIsPlayingAudio(false);
      newAudio.onerror = () => {
        setIsPlayingAudio(false);
        console.log('Cry audio not available for this ID');
      };
    } catch (err) {
      console.error('Audio playback error:', err);
      setIsPlayingAudio(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-poke-red/30 border-t-poke-red rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-mono text-sm">Carregando dados da Pokédex...</p>
      </main>
    );
  }

  if (error || !pokemonData) {
    return (
      <main className="flex-grow w-full max-w-lg mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="glass-panel rounded-3xl p-8 border border-red-500/30 text-slate-200">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Pokémon Não Encontrado</h2>
          <p className="text-sm text-slate-400 mb-6">
            Não foi possível recuperar as informações detalhadas para este Pokémon.
          </p>
          <button
            onClick={getPokemonData}
            className="px-6 py-3 rounded-2xl bg-poke-red text-white font-bold text-sm shadow-glow-red hover:scale-105 transition-transform flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" /> Tentar Novamente
          </button>
        </div>
      </main>
    );
  }

  const normalImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`;
  const shinyImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonData.id}.png`;
  const displayImage = isShiny ? shinyImage : normalImage;

  const totalBaseStats = pokemonData.stats.reduce((acc, curr) => acc + curr.base_stat, 0);

  return (
    <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Back button */}
      <div className="w-full flex items-center justify-between mb-6">
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors glass-panel px-4 py-2 rounded-xl border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para Pokédex
        </Link>

        <span className="font-mono text-sm font-bold text-slate-400">
          #{pokemonData.id.toString().padStart(4, '0')}
        </span>
      </div>

      {/* Main Details Card */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-poke-red/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Column: Image, Audio & Vote CTA */}
        <div className="md:col-span-5 flex flex-col items-center text-center">
          <div className="relative w-full max-w-xs aspect-square my-2 flex items-center justify-center">
            <Image
              src={displayImage}
              alt={pokemonData.name}
              fill
              priority
              className="object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Controls: Shiny Toggle & Cry Sound */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setIsShiny(!isShiny)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                isShiny
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 shadow-glow-gold'
                  : 'bg-slate-800 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isShiny ? 'Sprite Shiny ✨' : 'Ver Shiny ✨'}
            </button>

            <button
              onClick={playCryAudio}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                isPlayingAudio
                  ? 'bg-poke-cyan/20 text-poke-cyan border-poke-cyan/40 animate-pulse'
                  : 'bg-slate-800 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              Grito
            </button>
          </div>

          {/* Title & Types */}
          <h1 className="text-3xl sm:text-4xl font-black text-white capitalize tracking-tight mt-6">
            {pokemonData.name}
          </h1>

          <div className="flex items-center justify-center gap-2 mt-2">
            {pokemonData.types.map((t) => (
              <Badge key={t.type.name} type={t.type.name} size="md" />
            ))}
          </div>

          {/* Physical Traits */}
          <div className="grid grid-cols-2 gap-3 w-full mt-6 text-xs font-mono text-slate-300">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col items-center">
              <span className="text-slate-500 uppercase">Altura</span>
              <span className="font-bold text-white text-base mt-0.5">
                {(pokemonData.height / 10).toFixed(1)} m
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col items-center">
              <span className="text-slate-500 uppercase">Peso</span>
              <span className="font-bold text-white text-base mt-0.5">
                {(pokemonData.weight / 10).toFixed(1)} kg
              </span>
            </div>
          </div>

          {/* Big Vote Button CTA */}
          <button
            onClick={() => initiateVote({ id: pokemonData.id, name: pokemonData.name })}
            className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-poke-red to-rose-600 hover:from-rose-600 hover:to-poke-red text-white font-black text-lg shadow-glow-red hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5" /> Votar em {pokemonData.name}
          </button>
        </div>

        {/* Right Column: Base Stats & Abilities */}
        <div className="md:col-span-7 flex flex-col justify-between">
          {/* Base Stats Section */}
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" /> Estatísticas Base
              </h2>
              <span className="text-xs font-mono font-bold text-slate-400">
                Total: <strong className="text-amber-400">{totalBaseStats}</strong>
              </span>
            </div>

            <div className="space-y-3">
              {pokemonData.stats.map((st) => (
                <StatBar
                  key={st.stat.name}
                  label={st.stat.name}
                  value={st.base_stat}
                />
              ))}
            </div>
          </div>

          {/* Abilities Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
              <Shield className="w-5 h-5 text-poke-cyan" /> Habilidades
            </h2>

            <div className="flex flex-wrap gap-2">
              {pokemonData.abilities.map((ab) => (
                <div
                  key={ab.ability.name}
                  className="px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm font-semibold text-slate-200 capitalize flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-poke-cyan" />
                  {ab.ability.name.replace('-', ' ')}
                  {ab.is_hidden && (
                    <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      Oculta
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}