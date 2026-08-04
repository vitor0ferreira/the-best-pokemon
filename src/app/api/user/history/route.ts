import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        accounts: true,
        votes: {
          take: 20,
          orderBy: { createdAt: 'desc' },
          include: {
            pokemon: true,
          },
        },
        dailyBattleVotes: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            pokemon: true,
            battle: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
    }

    // Calculate total ranking votes + total battle votes
    const totalRankingVotes = await prisma.vote.count({
      where: { userId: user.id },
    });

    const totalBattleVotes = await prisma.dailyBattleVote.count({
      where: { userId: user.id },
    });

    const totalVotes = totalRankingVotes + totalBattleVotes;

    // Calculate most voted pokemon by this user
    const mostVotedPokemonGroup = await prisma.vote.groupBy({
      by: ['pokemonId'],
      where: { userId: user.id },
      _count: { pokemonId: true },
      orderBy: { _count: { pokemonId: 'desc' } },
      take: 1,
    });

    let favoritePokemon = null;
    if (mostVotedPokemonGroup.length > 0) {
      const pId = mostVotedPokemonGroup[0].pokemonId;
      favoritePokemon = await prisma.pokemon.findUnique({
        where: { id: pId },
      });
    }

    // Calculate votes today reset status
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let votesToday = user.votesToday;
    if (user.lastVoteDate && new Date(user.lastVoteDate) < today) {
      votesToday = 0;
    }

    const providerName = user.accounts[0]?.provider || 'OAuth / Direct';

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        provider: providerName,
        votesToday,
        remainingVotes: Math.max(0, 10 - votesToday),
        totalVotes,
        totalBattleVotes,
      },
      favoritePokemon,
      recentVotes: user.votes.map((v) => ({
        id: v.id,
        pokemonId: v.pokemonId,
        pokemonName: v.pokemon.name,
        pokemonTypes: v.pokemon.types,
        createdAt: v.createdAt,
      })),
      recentBattleVotes: user.dailyBattleVotes.map((bv) => ({
        id: bv.id,
        battleTopic: bv.battle.topic,
        pokemonId: bv.pokemonId,
        pokemonName: bv.pokemon.name,
        pokemonTypes: bv.pokemon.types,
        createdAt: bv.createdAt,
      })),
    });
  } catch (err) {
    console.error('Error fetching user history:', err);
    return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
  }
}
