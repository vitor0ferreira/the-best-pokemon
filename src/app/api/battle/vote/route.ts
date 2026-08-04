import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Não autorizado. Faça login para votar na Batalha do Dia.' }, { status: 401 });
  }

  try {
    const { battleId, pokemonId } = await request.json();

    if (!battleId || !pokemonId) {
      return NextResponse.json({ message: 'ID da batalha e do Pokémon são obrigatórios.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
    }

    const battle = await prisma.dailyBattle.findUnique({
      where: { id: battleId },
    });

    if (!battle || battle.ended) {
      return NextResponse.json({ message: 'Batalha do dia não encontrada ou já encerrada.' }, { status: 404 });
    }

    if (!battle.pokemonIds.includes(pokemonId)) {
      return NextResponse.json({ message: 'Este Pokémon não faz parte desta batalha.' }, { status: 400 });
    }

    // Check if user already voted in this battle
    const existingVote = await prisma.dailyBattleVote.findUnique({
      where: {
        battleId_userId: {
          battleId,
          userId: user.id,
        },
      },
    });

    if (existingVote) {
      return NextResponse.json({ message: 'Você já registrou seu voto nesta Batalha do Dia!' }, { status: 400 });
    }

    // Create vote entry
    await prisma.dailyBattleVote.create({
      data: {
        battleId,
        userId: user.id,
        pokemonId,
      },
    });

    return NextResponse.json({ success: true, votedPokemonId: pokemonId }, { status: 200 });
  } catch (error: any) {
    console.error('Error submitting daily battle vote:', error);
    if (error?.code === 'P2002') {
      return NextResponse.json({ message: 'Você já votou nesta batalha.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Erro ao registrar voto na Batalha do Dia.' }, { status: 500 });
  }
}
