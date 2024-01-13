'use client'

import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

export default function Catalogue () {
  
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([])
  const [offset, setOffset] = useState<number>(0)
  
  async function FetchPokemons () {
    const pokemonsDynamicFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=100`);
    const response = await pokemonsDynamicFetch.json();
    setPokemons((previousPokemons) => [...previousPokemons, ...response.results])
  }


  useEffect(()=>{
    FetchPokemons()
  },[offset])

  interface Pokemon {
    name: string;
    url: string
  }

  return (
    <main className="bg-red-600 min-h-screen flex flex-col items-center p-4 gap-10">
      <section className="flex flex-wrap w-full justify-center items-center gap-2">
        {pokemons.map((pokemon:Pokemon)=>{
          return <PokemonCard name={pokemon.name} key={pokemon.name} />
        })}
      </section>
      <button className="bg-white flex p-2 text-lg font-bold m-2 rounded-md cursor-pointer hover:scale-105" 
      onClick={() => {setOffset((prevOffset)=> prevOffset + 100)
        if(offset >= 1299){
          alert('All pokemons showed up on the display')
        }
      }}>Load more</button>
    </main>
  )
}