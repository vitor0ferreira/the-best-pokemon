import PokemonCard from "./components/PokemonCard";

export default async function Catalogue () {

  const pokemonsFetch = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
  const pokemons = await pokemonsFetch.json();

  interface Pokemon {
    name: string;
    url: string
  }

  return (
    <main className="bg-red-600 min-h-screen flex flex-wrap justify-center pt-4 pb-4">
      {pokemons.results.map((pokemon:Pokemon)=>{
        return <PokemonCard name={pokemon.name} key={pokemon.name} />
      })}
    </main>
  )
}