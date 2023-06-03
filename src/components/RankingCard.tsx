import { useState, useEffect } from "react"

export default function RankingCard(props:any) {

  const [pokemon, setPokemon] = useState<Object | any>({});
  const [pokemonImage, setPokemonImage] = useState<string>('');
  
  const pokemonFetch = async (pokemon:string) => {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await pokemonResponse.json();
    setPokemon(data);
  }

  useEffect(()=>{
    let randomPokemon = (Math.round(Math.random()*600))
    pokemonFetch('' + randomPokemon);
  }, []);

  return (
    <div className="w-full min-h-8 h-16 outline outline-black outline-2 cursor-pointer hover:opacity-80 flex">
      <div className="h-full w-20 bg-black text-white flex items-center justify-center text-4xl font-bold">
        {props.rank}
      </div>
      <div className="flex-1 flex items-start justify-start pl-3 font-bold text-white text-[2.5rem] bg-red-600 h-full overflow-hidden">
        <abbr title={(pokemon.name ? pokemon.name.toUpperCase() : null)} className="no-underline">
          {pokemon.name ? pokemon.name.toUpperCase() : null}
        </abbr>
      </div>
      <div className="h-full w-20 p-1 flex items-center justify-center">
        {pokemon.name ? (
          <img src={pokemon.sprites.front_default} alt="pokemon photo" />
        ) : null}
      </div>
    </div>
  );
}