// src/app/api/ranking/general/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pokemons = await prisma.pokemon.findMany({
      orderBy: { votes: 'desc' },
      take: 20,
    });
    return NextResponse.json(pokemons);
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao buscar o ranking geral' }, { status: 500 });
  }
}