
import { prisma } from '@/src/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const pokemons = await prisma.pokemon.findMany({
      orderBy: [
        { votes: 'desc' },
        { id: 'asc' }
      ],
      take: 20,
    });
    return NextResponse.json(pokemons);
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao buscar o ranking geral' }, { status: 500 });
  }
}