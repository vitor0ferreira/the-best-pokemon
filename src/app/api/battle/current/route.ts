import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { auth } from '@/auth';
import { getBrasiliaDateKey, getThemeForDateKey, resolveEndedBattles } from '@/src/lib/dailyBattleService';
import pokemonDataJson from '@/prisma/pokemon.json';

interface CachedPublicBattle {
  dateKey: string;
  cachedAt: number;
  battle: {
    id: string;
    dateKey: string;
    topic: { pt: string; en: string };
    createdAt: string;
  };
  candidatesData: Array<{
    id: number;
    name: string;
    types: string[];
    dailyBattleWins: number;
  }>;
  voteCounts: Record<number, number>;
  totalVotes: number;
  votesList: Array<{ pokemonId: number; userId: string }>;
}

let publicBattleCache: CachedPublicBattle | null = null;
const CACHE_TTL_MS = 8000; // 8 seconds cache for public battle data

const POKEMON_JSON_MAP = new Map(
  (pokemonDataJson as Array<{ id: number; name: string; types: string[] }>).map((p) => [p.id, p])
);

export async function GET() {
  try {
    const { dateKey, secondsRemaining } = getBrasiliaDateKey();
    const now = Date.now();

    // Check if cache is still valid
    const isCacheValid =
      publicBattleCache &&
      publicBattleCache.dateKey === dateKey &&
      now - publicBattleCache.cachedAt < CACHE_TTL_MS;

    const [session] = await Promise.all([
      auth(),
      // Auto-resolve any past unclosed battles (memoized internally)
      resolveEndedBattles(dateKey),
    ]);

    let cached: CachedPublicBattle;

    if (isCacheValid && publicBattleCache) {
      cached = publicBattleCache;
    } else {
      const theme = getThemeForDateKey(dateKey);

      // Get or create current battle
      let battle = await prisma.dailyBattle.findUnique({
        where: { dateKey },
        include: {
          votes: true,
        },
      });

      if (!battle) {
        battle = await prisma.dailyBattle.create({
          data: {
            dateKey,
            topic: theme.topic.pt,
            pokemonIds: theme.pokemonIds,
          },
          include: {
            votes: true,
          },
        });
      }

      // Fetch candidate Pokemon wins in parallel
      const candidateWins = await prisma.pokemon.findMany({
        where: {
          id: { in: battle.pokemonIds },
        },
        select: {
          id: true,
          dailyBattleWins: true,
        },
      });

      const winsMap = new Map(candidateWins.map((p) => [p.id, p.dailyBattleWins]));

      const candidatesData = battle.pokemonIds.map((id) => {
        const jsonInfo = POKEMON_JSON_MAP.get(id);
        return {
          id,
          name: jsonInfo?.name || `Pokemon #${id}`,
          types: jsonInfo?.types || [],
          dailyBattleWins: winsMap.get(id) || 0,
        };
      });

      const voteCounts: Record<number, number> = {};
      battle.pokemonIds.forEach((id) => (voteCounts[id] = 0));

      battle.votes.forEach((v) => {
        if (voteCounts[v.pokemonId] !== undefined) {
          voteCounts[v.pokemonId] += 1;
        }
      });

      const totalVotes = battle.votes.length;

      cached = {
        dateKey,
        cachedAt: now,
        battle: {
          id: battle.id,
          dateKey: battle.dateKey,
          topic: theme.topic,
          createdAt: battle.createdAt.toISOString(),
        },
        candidatesData,
        voteCounts,
        totalVotes,
        votesList: battle.votes.map((v) => ({ pokemonId: v.pokemonId, userId: v.userId })),
      };

      publicBattleCache = cached;
    }

    // Determine user voted candidate if authenticated
    let userVotedPokemonId: number | null = null;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      if (user) {
        const userVote = cached.votesList.find((v) => v.userId === user.id);
        if (userVote) {
          userVotedPokemonId = userVote.pokemonId;
        }
      }
    }

    const candidateStandings = cached.candidatesData.map((c) => {
      const votes = cached.voteCounts[c.id] || 0;
      const percentage = cached.totalVotes > 0 ? Math.round((votes / cached.totalVotes) * 100) : 0;
      return {
        ...c,
        votes,
        percentage,
      };
    });

    return NextResponse.json(
      {
        battle: cached.battle,
        candidates: candidateStandings,
        totalVotes: cached.totalVotes,
        userVotedPokemonId,
        secondsRemaining,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=15',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching current daily battle:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar batalha do dia' },
      { status: 500 }
    );
  }
}
