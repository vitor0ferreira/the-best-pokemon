// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import pokemonData from './pokemon.json'; // Importa os dados do JSON que criamos

const prisma = new PrismaClient();

async function main() {
  console.log(`Iniciando o processo de seed...`);

  const pokemons = pokemonData.map(p => ({
    id: p.id,
    name: p.name,
    types: p.types,
    // O campo 'votes' já tem um @default(0) no schema, então não precisamos incluí-lo aqui
  }));

  // Usar 'createMany' é muito mais eficiente para inserir múltiplos registros
  await prisma.pokemon.createMany({
    data: pokemons,
    skipDuplicates: true, // Ignora se o Pokémon com aquele ID já existe
  });

  console.log(`Seed finalizado. ${pokemons.length} Pokémon foram processados e inseridos no banco de dados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });