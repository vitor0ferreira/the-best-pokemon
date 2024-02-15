'use client'

import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

export default function Catalogue () {
  
  const [searchValue, setSearchValue] = useState('')
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
    <main className="bg-red-600 min-h-screen flex flex-col items-center justify-start p-4 gap-10">

      <input
        type="text"
        placeholder="Type a pokemon name..."
        className="p-2 text-lg mt-4 rounded-sm focus:outline-none focus:placeholder:invisible"
        value={searchValue}
        onChange={(e)=>setSearchValue(e.target.value)}
      />

      <section className="flex flex-wrap w-full justify-center items-center gap-2">
        {pokemons.filter((pokemon:Pokemon)=>{
            const pokemonName = pokemon.name.toLowerCase();
            const searchedPokemon = searchValue.toLowerCase();
            return pokemonName.includes(searchedPokemon)
          }).map((pokemon:Pokemon)=>{
            return (<PokemonCard name={pokemon.name} key={pokemon.name} />)
          })}
      </section>
      <button className="bg-white flex p-2 text-lg font-bold rounded-md cursor-pointer hover:scale-105 mb-6" 
      onClick={() => {setOffset((prevOffset)=> prevOffset + 100)
        if(offset >= 1299){
          alert('All pokemons showed up on the display')
        }
      }}>Load more</button>
    </main>
  )
}