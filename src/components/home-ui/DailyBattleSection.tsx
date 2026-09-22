'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Flame, Clock, Swords, Trophy, CheckCircle2, Vote, Sparkles, AlertCircle } from 'lucide-react';
import Badge from '@/src/components/ui/Badge';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { getBrasiliaDateKey, getThemeForDateKey } from '@/src/lib/dailyBattleService';
import pokemonDataJson from '@/prisma/pokemon.json';

interface Candidate {
  id: number;
  name: string;
  types: string[];
  dailyBattleWins: number;
  votes: number;
  percentage: number;
}

interface BattleData {
  battle: {
    id: string;
    dateKey: string;
    topic: { pt: string; en: string } | string;
    createdAt: string;
  };
  candidates: Candidate[];
  totalVotes: number;
  userVotedPokemonId: number | null;
  secondsRemaining: number;
}

const CANDIDATE_COLORS = [
  {
    bg: 'from-poke-red/20 to-rose-600/10 border-poke-red/40 hover:border-poke-red',
    badge: 'bg-poke-red text-white',
    bar: 'bg-gradient-to-r from-poke-red to-rose-500',
    text: 'text-poke-red',
    glow: 'shadow-glow-red',
  },
  {
    bg: 'from-poke-cyan/20 to-sky-600/10 border-poke-cyan/40 hover:border-poke-cyan',
    badge: 'bg-poke-cyan text-slate-950',
    bar: 'bg-gradient-to-r from-poke-cyan to-sky-400',
    text: 'text-poke-cyan',
    glow: 'shadow-glow-cyan',
  },
  {
    bg: 'from-amber-400/20 to-amber-600/10 border-amber-400/40 hover:border-amber-400',
    badge: 'bg-amber-400 text-obsidian',
    bar: 'bg-gradient-to-r from-amber-400 to-amber-500',
    text: 'text-amber-400',
    glow: 'shadow-glow-gold',
  },
];

const POKEMON_JSON_MAP = new Map(
  (pokemonDataJson as Array<{ id: number; name: string; types: string[] }>).map((p) => [p.id, p])
);

// Synchronously compute initial battle state so the arena appears in 0ms without delay
function getInitialBattleState(): BattleData {
  const { dateKey, secondsRemaining } = getBrasiliaDateKey();
  const theme = getThemeForDateKey(dateKey);

  const candidates: Candidate[] = theme.pokemonIds.map((id) => {
    const info = POKEMON_JSON_MAP.get(id);
    return {
      id,
      name: info?.name || `Pokemon #${id}`,
      types: info?.types || [],
      dailyBattleWins: 0,
      votes: 0,
      percentage: 0,
    };
  });

  return {
    battle: {
      id: '',
      dateKey,
      topic: theme.topic,
      createdAt: '',
    },
    candidates,
    totalVotes: 0,
    userVotedPokemonId: null,
    secondsRemaining,
  };
}

export default function DailyBattleSection() {
  const { data: session } = useSession();
  const router = useRouter();
  const { t, language } = useLanguage();

  const [isMounted, setIsMounted] = useState(false);
  // Instant initial data — never null, renders on frame 1
  const [battleData, setBattleData] = useState<BattleData>(getInitialBattleState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(battleData.secondsRemaining);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchDailyBattle = useCallback(async () => {
    try {
      const res = await fetch('/api/battle/current', { cache: 'no-store' });
      if (res.ok) {
        const data: BattleData = await res.json();
        setBattleData(data);
        setTimerSeconds(data.secondsRemaining);
      }
    } catch (err) {
      console.error('Error loading daily battle:', err);
    }
  }, []);

  useEffect(() => {
    fetchDailyBattle();
  }, [fetchDailyBattle]);

  // Live countdown timer ticker (runs only on client after mount)
  useEffect(() => {
    if (!isMounted || timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          fetchDailyBattle();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isMounted, timerSeconds, fetchDailyBattle]);

  const formatCountdown = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  const handleVote = async (pokemonId: number) => {
    if (!session) {
      router.push('/login');
      return;
    }

    if (isSubmitting) return;

    // If battle id is not yet populated from network, fetch first
    let currentBattleId = battleData.battle.id;
    if (!currentBattleId) {
      setIsSubmitting(true);
      try {
        const res = await fetch('/api/battle/current');
        if (res.ok) {
          const freshData: BattleData = await res.json();
          setBattleData(freshData);
          currentBattleId = freshData.battle.id;
        }
      } catch (err) {
        console.error('Failed to get battle id:', err);
      }
    }

    if (!currentBattleId) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/battle/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          battleId: currentBattleId,
          pokemonId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ff3366', '#00f2fe', '#f59e0b'],
        });
        await fetchDailyBattle();
      } else {
        setErrorMessage(data.message || 'Erro ao registrar voto.');
      }
    } catch (err) {
      console.error('Daily battle vote error:', err);
      setErrorMessage('Erro de conexão ao enviar seu voto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { battle, candidates, totalVotes, userVotedPokemonId } = battleData;

  const topicText = useMemo(() => {
    if (typeof battle.topic === 'object' && battle.topic !== null) {
      return battle.topic[language] || battle.topic.pt || battle.topic.en;
    }
    return battle.topic;
  }, [battle.topic, language]);

  return (
    <section className="w-full max-w-6xl px-4 py-8 mx-auto my-6">
      {/* Main Glass Arena Box */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border-2 border-poke-red/30 shadow-2xl overflow-hidden bg-gradient-to-b from-poke-red/10 via-obsidian-surface/90 to-obsidian">
        {/* Background Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-poke-red/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/60 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-poke-red/20 border border-poke-red/40 text-poke-red flex items-center justify-center shadow-glow-red animate-pulse">
              <Swords className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase font-mono font-bold text-poke-red tracking-widest flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-poke-red" /> {t('battle.badge')}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{t('battle.subBadge')}</span>
            </div>
          </div>

          {/* Countdown Clock Badge */}
          <div className="px-4 py-2 rounded-2xl bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300/60 dark:border-white/10 font-mono text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-300 flex items-center gap-2 shadow-sm">
            <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-spin-slow" />
            <span suppressHydrationWarning>
              {t('battle.endsIn')}{' '}
              <strong className="text-slate-900 dark:text-white" suppressHydrationWarning>
                {formatCountdown(timerSeconds)}
              </strong>
            </span>
          </div>
        </div>

        {/* Theme Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-slate-500 dark:text-slate-400 font-bold">
            {t('battle.themeTopic')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            {topicText}
          </h2>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="max-w-md mx-auto mb-6 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 text-xs text-center flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Candidate Cards Grid */}
        <div
          className={`grid grid-cols-1 ${
            candidates.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
          } gap-6 max-w-5xl mx-auto mb-10`}
        >
          {candidates.map((candidate, idx) => {
            const colorScheme = CANDIDATE_COLORS[idx % CANDIDATE_COLORS.length];
            const isUserVoted = userVotedPokemonId === candidate.id;
            const hasVotedOther = userVotedPokemonId !== null && !isUserVoted;

            const winLabel = candidate.dailyBattleWins === 1 ? t('battle.winSingle') : t('battle.winPlural');
            const voteLabel = candidate.votes === 1 ? t('battle.voteSingle') : t('battle.votePlural');

            return (
              <div
                key={candidate.id}
                className={`relative glass-panel rounded-3xl p-6 border bg-gradient-to-b ${colorScheme.bg} flex flex-col items-center text-center transition-all hover:scale-[1.02] shadow-xl overflow-hidden group`}
              >
                {/* Wins Badge */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-slate-200/90 dark:bg-slate-900/80 border border-slate-300/60 dark:border-white/10 text-[11px] font-mono font-bold text-amber-600 dark:text-amber-300 flex items-center gap-1 shadow-sm">
                  <Trophy className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                  <span>{candidate.dailyBattleWins} {winLabel}</span>
                </div>

                {/* Candidate Image */}
                <Link
                  href={`/catalogue/${candidate.name}`}
                  className="relative w-36 h-36 sm:w-44 sm:h-44 my-4 flex items-center justify-center"
                >
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${candidate.id}.png`}
                    alt={candidate.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>

                {/* Candidate Name & Types */}
                <Link
                  href={`/catalogue/${candidate.name}`}
                  className="font-black text-slate-900 dark:text-white text-xl sm:text-2xl capitalize hover:text-poke-cyan transition-colors"
                >
                  {candidate.name}
                </Link>

                <div className="flex gap-1.5 mt-2">
                  {candidate.types.map((t) => (
                    <Badge key={t} type={t} size="sm" />
                  ))}
                </div>

                {/* Votes & Percentage Tally */}
                <div className="mt-4 mb-6 flex flex-col items-center">
                  <span className="text-3xl font-black text-slate-900 dark:text-white font-mono tabular-nums">
                    {candidate.percentage}%
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {candidate.votes} {voteLabel}
                  </span>
                </div>

                {/* Vote CTA Button */}
                <button
                  disabled={userVotedPokemonId !== null || isSubmitting}
                  onClick={() => handleVote(candidate.id)}
                  className={`mt-auto w-full py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    isUserVoted
                      ? 'bg-emerald-500 text-white shadow-lg border border-emerald-400'
                      : hasVotedOther
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-300/40 dark:border-white/5 cursor-not-allowed'
                      : `${colorScheme.badge} hover:scale-[1.02] ${colorScheme.glow}`
                  }`}
                >
                  {isUserVoted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> {t('battle.yourVoteRecorded')}
                    </>
                  ) : hasVotedOther ? (
                    <span>{t('battle.votedInOther')}</span>
                  ) : (
                    <>
                      <Vote className="w-4 h-4" /> {t('battle.voteForPokemon')}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* MULTI-SEGMENTED LIVE PROGRESS BAR */}
        <div className="max-w-4xl mx-auto glass-panel p-5 rounded-2xl border border-slate-200/60 dark:border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-poke-cyan" /> {t('battle.standingsTitle')}
            </span>
            <span>
              {t('battle.totalVotes')} <strong className="text-slate-900 dark:text-white">{totalVotes}</strong>{' '}
              {totalVotes === 1 ? t('battle.voteSingle') : t('battle.votePlural')}
            </span>
          </div>

          {/* Segmented Bar */}
          <div className="w-full h-4 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300/60 dark:border-white/10 overflow-hidden flex p-0.5 relative">
            {candidates.map((candidate, idx) => {
              const colorScheme = CANDIDATE_COLORS[idx % CANDIDATE_COLORS.length];
              return (
                <div
                  key={candidate.id}
                  className={`h-full ${colorScheme.bar} transition-all duration-500 relative group`}
                  style={{ width: `${candidate.percentage}%` }}
                  title={`${candidate.name}: ${candidate.percentage}% (${candidate.votes})`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-around gap-4 mt-3 text-xs font-mono">
            {candidates.map((candidate, idx) => {
              const colorScheme = CANDIDATE_COLORS[idx % CANDIDATE_COLORS.length];
              return (
                <div key={candidate.id} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${colorScheme.badge}`} />
                  <span className="font-bold text-slate-900 dark:text-white capitalize">{candidate.name}:</span>
                  <span className={colorScheme.text}>
                    {candidate.percentage}% ({candidate.votes})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
