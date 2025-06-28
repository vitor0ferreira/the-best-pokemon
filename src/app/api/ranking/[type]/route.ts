
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 2. Ajuste a assinatura da função GET
export async function GET(request: NextRequest, { params }: { params: { type: string } }) {
  const { type } = params;

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