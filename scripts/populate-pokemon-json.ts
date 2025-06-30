
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

// ... (interfaces e constantes permanecem as mesmas)
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const TOTAL_POKEMON = 1025;

interface PokemonData { 
  id: number;
  name: string;
  types: string[];
  sprite: string;
 }

interface PokemonListResult { 
  name: string;
  url: string;
 }

async function main() {
  console.log('Iniciando a busca de dados...');

  try {
    console.log(`Buscando a lista de ${TOTAL_POKEMON} Pokémon...`);
    const listResponse = await axios.get<{ results: PokemonListResult[] }>(
      `${POKEAPI_BASE_URL}/pokemon?limit=${TOTAL_POKEMON}`
    );
    const pokemonList = listResponse.data.results;
    console.log('Lista de Pokémon obtida.');

    const allPokemonData: PokemonData[] = [];
    const BATCH_SIZE = 50; // Processar em lotes de 50

    console.log(`Iniciando busca de detalhes em lotes de ${BATCH_SIZE}...`);

    for (let i = 0; i < pokemonList.length; i += BATCH_SIZE) {
      const batch = pokemonList.slice(i, i + BATCH_SIZE);
      console.log(`Processando lote ${i / BATCH_SIZE + 1}...`);

      const detailPromises = batch.map((pokemon) => axios.get(pokemon.url));
      const detailResponses = await Promise.all(detailPromises);

      const batchData = detailResponses.map((response) => {
        // ... (lógica de formatação do Pokémon, igual à anterior)
        const data = response.data;
        return {
          id: data.id,
          name: data.name,
          types: data.types.map((typeInfo: any) => typeInfo.type.name),
          sprite: data.sprites.other['official-artwork'].front_default,
        };
      });
      
      allPokemonData.push(...batchData);
      
      // Opcional: uma pequena pausa para ser ainda mais gentil com a API
      await new Promise(res => setTimeout(res, 200)); 
    }

    const outputPath = path.resolve(__dirname, '../prisma/pokemon.json');
    await fs.writeFile(outputPath, JSON.stringify(allPokemonData, null, 2));

    console.log(`\nSucesso! 🎉 Arquivo "pokemon.json" criado.`);

  } catch (error) {
    console.error('Ocorreu um erro durante o processo:', error);
  }
}

main();