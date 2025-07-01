
import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { auth } from "@/auth"

const VOTES_LIMIT = 10;

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ loggedIn: false, remainingVotes: 0 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as NonNullable<string> },
    });

    if (!user) {
      // Caso raro em que a sessão existe mas o usuário não está no DB.
      return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let remainingVotes = VOTES_LIMIT;

    // Verifica se o último voto do usuário foi antes de hoje.
    if (user.lastVoteDate && new Date(user.lastVoteDate) >= today) {
      // Se o último voto foi hoje, calcula os votos restantes.
      remainingVotes = VOTES_LIMIT - user.votesToday;
    } 
    
    return NextResponse.json({ 
      loggedIn: true, 
      remainingVotes: remainingVotes < 0 ? 0 : remainingVotes
    });

  } catch (error) {
    console.error("Erro ao buscar status do usuário:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}