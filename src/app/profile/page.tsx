'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { User, Sparkles, Trophy, History, Heart, Shield, LogIn, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '@/src/components/ui/Badge';

interface UserHistoryData {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    provider: string;
    votesToday: number;
    remainingVotes: number;
    totalVotes: number;
  };
  favoritePokemon: {
    id: number;
    name: string;
    votes: number;
    types: string[];
  } | null;
  recentVotes: Array<{
    id: string;
    pokemonId: number;
    pokemonName: string;
    pokemonTypes: string[];
    createdAt: string;
  }>;
}

export default function Profile() {
  const { data: session, status } = useSession();
  const [historyData, setHistoryData] = useState<UserHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (status === 'authenticated') {
        try {
          const res = await fetch('/api/user/history');
          if (res.ok) {
            const data = await res.json();
            setHistoryData(data);
          }
        } catch (err) {
          console.error('Failed to load user history:', err);
        } finally {
          setIsLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setIsLoading(false);
      }
    }
    loadHistory();
  }, [status]);

  if (status === 'loading' || isLoading) {
    return (
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-poke-red/30 border-t-poke-red rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-mono text-sm">Carregando perfil do treinador...</p>
      </main>
    );
  }

  if (status === 'unauthenticated' || !session) {
    return (
      <main className="flex-grow w-full max-w-md mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="glass-panel rounded-3xl p-8 border border-white/10 text-slate-100 w-full">
          <div className="w-16 h-16 rounded-2xl bg-poke-red/10 border border-poke-red/20 text-poke-red flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h2>
          <p className="text-sm text-slate-400 mb-6">
            Você precisa estar logado para acessar seu painel de perfil e histórico de votos.
          </p>
          <Link
            href="/login"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-poke-red to-rose-600 text-white font-bold text-sm shadow-glow-red flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Entrar na sua Conta
          </Link>
        </div>
      </main>
    );
  }

  const u = historyData?.user || {
    name: session.user?.name || 'Treinador',
    email: session.user?.email || '',
    image: session.user?.image || '',
    provider: 'OAuth',
    votesToday: 0,
    remainingVotes: 10,
    totalVotes: 0,
  };

  const favorite = historyData?.favoritePokemon;
  const recentVotes = historyData?.recentVotes || [];

  return (
    <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Profile Header Banner */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-poke-cyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* User Image */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-xl shrink-0 bg-slate-900 flex items-center justify-center">
          {u.image ? (
            <Image src={u.image} fill alt={u.name} className="object-cover" />
          ) : (
            <User className="w-12 h-12 text-slate-400" />
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-grow">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-poke-cyan/10 border border-poke-cyan/20 text-poke-cyan text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" /> Treinador Oficial
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white">{u.name}</h1>
          <p className="text-sm text-slate-400 font-mono mt-0.5">{u.email}</p>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-white/5">
              Conexão via <strong>{u.provider}</strong>
            </span>
          </div>
        </div>

        {/* Remaining Votes Card */}
        <div className="w-full sm:w-auto glass-panel p-5 rounded-2xl border border-amber-400/30 text-center flex flex-col items-center shrink-0 bg-gradient-to-b from-amber-500/10 to-transparent">
          <span className="text-xs uppercase font-mono text-amber-400 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Votos Diários
          </span>
          <span className="text-3xl font-black text-white font-mono my-1">
            {u.remainingVotes} <span className="text-sm font-normal text-slate-400">/ 10</span>
          </span>
          <span className="text-[11px] text-slate-400">Renova a cada 24 horas</span>
        </div>
      </div>

      {/* Grid: Favorite & Stats */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Votes Card */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-poke-red/10 border border-poke-red/20 text-poke-red flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Total de Votos</p>
              <h3 className="text-2xl font-black text-white font-mono">{u.totalVotes}</h3>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4">Votos totais computados nesta conta desde a criação.</p>
        </div>

        {/* Favorite Pokemon Card */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-xs font-mono uppercase text-poke-gold font-bold flex items-center justify-center sm:justify-start gap-1 mb-1">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Pokémon Mais Votado Por Você
            </span>

            {favorite ? (
              <>
                <h3 className="text-2xl font-black text-white capitalize">{favorite.name}</h3>
                <div className="flex gap-1.5 mt-2 justify-center sm:justify-start">
                  {favorite.types?.map((t) => (
                    <Badge key={t} type={t} size="sm" />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-400 mt-2">Você ainda não registrou nenhum voto nesta conta.</p>
            )}
          </div>

          {favorite && (
            <Link
              href={`/catalogue/${favorite.name}`}
              className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 group"
            >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${favorite.id}.png`}
                alt={favorite.name}
                fill
                className="object-contain drop-shadow-md group-hover:scale-110 transition-transform"
              />
            </Link>
          )}
        </div>
      </div>

      {/* Recent Votes Timeline */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3">
          <History className="w-5 h-5 text-poke-cyan" />
          <h2 className="text-xl font-bold text-white">Histórico Recente de Votos</h2>
        </div>

        {recentVotes.length === 0 ? (
          <p className="text-center py-8 text-slate-500 text-sm">
            Nenhum voto recente encontrado. Explore a Pokédex ou os Rankings e vote!
          </p>
        ) : (
          <div className="space-y-3">
            {recentVotes.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl bg-slate-800 p-1 shrink-0 overflow-hidden">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${v.pokemonId}.png`}
                      alt={v.pokemonName}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Link
                      href={`/catalogue/${v.pokemonName}`}
                      className="font-bold text-white text-sm capitalize hover:text-poke-cyan transition-colors"
                    >
                      {v.pokemonName}
                    </Link>
                    <div className="flex gap-1 mt-0.5">
                      {v.pokemonTypes?.map((t) => (
                        <Badge key={t} type={t} size="sm" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{new Date(v.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}