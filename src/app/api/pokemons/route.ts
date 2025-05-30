// app/api/pokemons/route.ts

import { NextResponse, NextRequest } from 'next/server';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';

export async function GET(request: NextRequest) {

  try {

    const searchParams = request.nextUrl.searchParams;
    const apiUrl = POKEMON_API_URL + searchParams.get('pokemon');

    console.log(`Fazendo requisição para: ${apiUrl}`);

    const externalApiResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }
    });


    if (!externalApiResponse.ok) {

      console.error(`Erro da API externa: ${externalApiResponse.status} ${externalApiResponse.statusText}`);
      return NextResponse.json(
        { message: 'Erro ao buscar dados da API externa de Pokémon', details: await externalApiResponse.text() },
        { status: externalApiResponse.status }
      );
    }

    const data = await externalApiResponse.json();

    return NextResponse.json(data, { status: 200 });

  } catch (error) {

    console.error('Erro interno no servidor:', error);
    let errorMessage = 'Ocorreu um erro interno no servidor.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: 'Erro ao processar a sua requisição', details: errorMessage },
      { status: 500 }
    );
  }
}