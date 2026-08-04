import { prisma } from '@/src/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<Record<string, string>> }
) {
  const params = await context.params;
  const rawType = params.type || '';
  const type = rawType.toLowerCase();

  try {
    const pokemons = await prisma.pokemon.findMany({
      where: {
        types: {
          has: type,
        },
      },
      orderBy: [
        { votes: 'desc' },
        { id: 'asc' },
      ],
      take: 20,
    });
    return NextResponse.json(pokemons);
  } catch (error) {
    console.error(`Erro ao buscar ranking para o tipo ${type}:`, error);
    return NextResponse.json(
      { message: `Erro ao buscar o ranking para o tipo ${type}` },
      { status: 500 }
    );
  }
}