
import { prisma } from '@/src/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, context: { params: Promise<Record<string, string>> }) {

  const { type } = await context.params;

  try {
    const pokemons = await prisma.pokemon.findMany({
      where: {
        types: {
          has: type,
        },
      },
      orderBy: [
        //Critério de desempate é o menor id.
        { votes: 'desc' },
        { id: 'asc' }
      ],
      take: 10,
    });
    return NextResponse.json(pokemons);
  } catch (error) {
    return NextResponse.json({ message: `Erro ao buscar o ranking para o tipo ${type}` }, { status: 500 });
  }
}