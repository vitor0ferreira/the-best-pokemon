import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { auth } from '@/auth';
import { getBrasiliaDateKey, getThemeForDateKey, resolveEndedBattles } from '@/src/lib/dailyBattleService';

export async function GET() {
  try {
    const session = await auth();
    const { dateKey, secondsRemaining } = getBrasiliaDateKey();

    // Auto-resolve any past unclosed battles
    await resolveEndedBattles(dateKey);

    // Get or create current battle
    let battle = await prisma.dailyBattle.findUnique({
      where: { dateKey },
      include: {
        votes: true,
      },
    });

    if (!battle) {
      const theme = getThemeForDateKey(dateKey);
      battle = await prisma.dailyBattle.create({
        data: {
          dateKey,
          topic: theme.topic,
          pokemonIds: theme.pokemonIds,
        },
        include: {
          votes: true,
        },
      });
    }

    // Fetch candidate Pokemon records
    const candidatePokemons = await prisma.pokemon.findMany({
      where: {
        id: { in: battle.pokemonIds },
      },
    });

    // Map candidates in the order specified by pokemonIds
    const candidatesMap = new Map(candidatePokemons.map((p) => [p.id, p]));
    const candidatesData = battle.pokemonIds.map((id) => {
      const p = candidatesMap.get(id);
      return {
        id,
        name: p?.name || `Pokemon #${id}`,
        types: p?.types || [],
        dailyBattleWins: p?.dailyBattleWins || 0,
      };
    });

    // Calculate vote counts per candidate
    const voteCounts: Record<number, number> = {};
    battle.pokemonIds.forEach((id) => (voteCounts[id] = 0));

    battle.votes.forEach((v) => {
      if (voteCounts[v.pokemonId] !== undefined) {
        voteCounts[v.pokemonId] += 1;
      }
    });

    const totalVotes = battle.votes.length;

    // Determine if logged-in user has voted in this battle
    let userVotedPokemonId: number | null = null;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (user) {
        const userVote = battle.votes.find((v) => v.userId === user.id);
        if (userVote) {
          userVotedPokemonId = userVote.pokemonId;
        }
      }
    }

    // Prepare percentages and candidate standings
    const candidateStandings = candidatesData.map((c) => {
      const votes = voteCounts[c.id] || 0;
      const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
      return {
        ...c,
        votes,
        percentage,
      };
    });

    return NextResponse.json({
      battle: {
        id: battle.id,
        dateKey: battle.dateKey,
        topic: battle.topic,
        createdAt: battle.createdAt,
      },
      candidates: candidateStandings,
      totalVotes,
      userVotedPokemonId,
      secondsRemaining,
    });
  } catch (error) {
    console.error('Error fetching current daily battle:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar batalha do dia' },
      { status: 500 }
    );
  }
}
