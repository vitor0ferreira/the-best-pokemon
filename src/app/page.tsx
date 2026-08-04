'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Trophy, BookOpen, Sparkles, ArrowRight, ShieldCheck, Swords } from 'lucide-react';
import { useVoteContext } from '@/src/contexts/VoteContext';
import DailyBattleSection from '@/src/components/home-ui/DailyBattleSection';

interface RankedPokemon {
  id: number;
  name: string;
  votes: number;
  types: string[];
}

export default function Home() {
  const { data: session } = useSession();
  const { remainingVotes } = useVoteContext();
  const [topPokemons, setTopPokemons] = useState<RankedPokemon[]>([]);

  useEffect(() => {
    async function loadGeneralRanking() {
      try {
        const res = await fetch('/api/ranking/general');
        if (res.ok) {
          const data = await res.json();
          setTopPokemons(data);
        }
      } catch (err) {
        console.error('Erro ao carregar top pokemons:', err);
      }
    }
    loadGeneralRanking();
  }, []);

  return (
    <main className="w-full max-w-full overflow-x-hidden flex flex-col items-center">
      {/* HERO SECTION */}
      <section className="relative w-full pt-14 pb-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center overflow-hidden bg-hero-glow">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-poke-red/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Live Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-semibold text-slate-300 mb-4 backdrop-blur-md shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Votação Democrática em Tempo Real
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl leading-[1.08] uppercase"
        >
          O RANKING DEFINITIVO DOS <span className="text-gradient-red">MELHORES POKÉMON</span> DE TODOS OS TEMPOS
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed"
        >
          Participe das Batalhas Diárias, vote em suas espécies favoritas e dispute posições no Hall da Fama Oficial.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4 w-full max-w-md"
        >
          <Link
            href="/ranking"
            className="flex-1 sm:flex-initial px-6 py-3.5 rounded-2xl bg-gradient-to-r from-poke-red to-rose-600 hover:from-rose-600 hover:to-poke-red text-white font-bold text-base shadow-glow-red hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            Ver Rankings
          </Link>
          <Link
            href="/catalogue"
            className="flex-1 sm:flex-initial px-6 py-3.5 rounded-2xl glass-panel glass-panel-hover text-white font-bold text-base border border-white/15 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-poke-cyan" />
            Pokédex
          </Link>
        </motion.div>
      </section>

      {/* FEATURE SPOTLIGHT #1: BATALHA DO DIA (DAILY BATTLE) */}
      <DailyBattleSection />

      {/* TOP VOTED MARQUEE TICKER */}
      {topPokemons.length > 0 && (
        <section className="w-full py-8 border-y border-white/5 bg-obsidian-surface overflow-hidden my-4">
          <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
            <h3 className="text-sm uppercase tracking-widest font-mono font-bold text-slate-400 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-poke-gold" /> Líderes Atuais do Ranking Geral
            </h3>
            <Link href="/ranking" className="text-xs text-poke-cyan font-bold hover:underline flex items-center gap-1">
              Ver Todos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex gap-4 animate-marquee whitespace-nowrap">
            {[...topPokemons, ...topPokemons].map((pokemon, idx) => (
              <Link
                key={`${pokemon.id}-${idx}`}
                href={`/catalogue/${pokemon.name}`}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel border border-white/10 hover:border-white/20 cursor-pointer hover:scale-105 transition-all shrink-0"
              >
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400">
                  #{idx % topPokemons.length + 1}
                </span>
                <div className="relative w-10 h-10">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white capitalize">{pokemon.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{pokemon.votes} votos</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* BENTO GRID FEATURES SECTION */}
      <section className="w-full max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            RECURSOS & <span className="text-gradient-cyan">FUNCIONALIDADES</span>
          </h2>
          <p className="text-slate-400 text-base mt-2 max-w-xl mx-auto">
            Tudo o que você precisa para eleger, analisar e explorar as melhores espécies Pokémon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-poke-red/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-poke-red/10 border border-poke-red/20 text-poke-red flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Swords className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Batalhas Diárias de 24 Horas</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Um duelo temático renovado diariamente às 12:00. O Pokémon vencedor acumula vitórias no seu perfil oficial.
              </p>
            </div>
            <Link
              href="/"
              className="mt-8 text-sm font-bold text-poke-red flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              Votar no Duelo de Hoje <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-poke-cyan/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-poke-cyan/10 border border-poke-cyan/20 text-poke-cyan flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Rankings por Tipagem Elementar</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Rankings individuais para todas as 18 tipagens elementares (Fogo, Água, Planta, Elétrico, Dragão, Fantasma e mais).
              </p>
            </div>
            <Link
              href="/ranking"
              className="mt-8 text-sm font-bold text-poke-cyan flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              Explorar Categorias <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Pokédex & Áudios Oficiais</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Busca em tempo real, estatísticas base, habilidades, gritos de áudio em HD e sprites brilhantes (Shiny).
              </p>
            </div>
            <Link
              href="/catalogue"
              className="mt-8 text-sm font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              Abrir Pokédex <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
