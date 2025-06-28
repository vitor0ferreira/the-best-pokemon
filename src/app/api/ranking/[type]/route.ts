// src/app/api/ranking/[type]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { type: string } }) {
  const type = params.type;

  try {
    const pokemons = await prisma.pokemon.findMany({
      where: {
        types: {
          has: type, // Usando o parâmetro da URL na query
        },
      },
      orderBy: {
        votes: 'desc',
      },
      take: 10,
    });
    return NextResponse.json(pokemons);
  } catch (error) {
    return NextResponse.json({ message: `Erro ao buscar o ranking para o tipo ${type}` }, { status: 500 });
  }
}