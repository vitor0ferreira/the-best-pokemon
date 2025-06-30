
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();
const VOTES_LIMIT = 10; // Limite de votos diário

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Não autorizado. Faça login para votar.' }, { status: 401 });
  }

  const { pokemonId } = await request.json();

  if (!pokemonId) {
    return NextResponse.json({ message: 'ID do Pokémon não fornecido.' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
  }

  // Lógica para verificar o limite de votos diário
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Se o último voto não foi hoje, reseta o contador
  if (!user.lastVoteDate || new Date(user.lastVoteDate) < today) {
    await prisma.user.update({
      where: { id: user.id },
      data: { votesToday: 0 },
    });
    user.votesToday = 0; // Atualiza o objeto local do usuário
  }

  if (user.votesToday >= VOTES_LIMIT) {
    return NextResponse.json({ message: 'Você já atingiu seu limite de 10 votos por hoje.' }, { status: 429 });
  }

  try {
    // Transação para garantir que ambas as operações ocorram com sucesso
    const [, updatedUser] = await prisma.$transaction([
      prisma.pokemon.update({
        where: { id: pokemonId },
        data: { votes: { increment: 1 } },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {
          votesToday: { increment: 1 },
          lastVoteDate: new Date(),
        },
      }),
      prisma.vote.create({
        data: {
          userId: user.id,
          pokemonId: pokemonId,
        }
      })
    ]);

    // Revalida a página de ranking
    revalidatePath('/ranking');

    const remainingVotes = VOTES_LIMIT - updatedUser.votesToday;
    return NextResponse.json({ success: true, remainingVotes }, { status: 200 });

  } catch (error) {
    console.error("Erro ao registrar voto:", error);
    return NextResponse.json({ message: 'Erro ao registrar o voto.' }, { status: 500 });
  }
}