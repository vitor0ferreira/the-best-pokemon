'use client'

import { ALL_POKEMON_LIST } from "@/constants/allPokemonList";
import { useState } from "react";
import PokemonCard from "./components/PokemonCard";

interface Pokemon {
  name: string;
  url: string
}

export default function Catalogue () {
  
  const [searchValue, setSearchValue] = useState('')
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([])
  const [offset, setOffset] = useState<number>(20)

  const pokemonList = ALL_POKEMON_LIST.slice(0, offset);


  return (
    <main className="bg-red-600 min-h-screen flex flex-col items-center justify-start p-4 gap-10">

      <input
        type="text"
        placeholder="Type a pokemon name..."
        className="p-2 text-lg mt-4 rounded-sm focus:outline-none focus:placeholder:invisible"
        value={searchValue}
        onChange={(e)=>setSearchValue(e.target.value)}
      />

      <section className="flex flex-wrap w-full justify-center items-center gap-2 z-10">
        
        {pokemonList.filter((pokemon:Pokemon)=>{

            const pokemonName = pokemon.name.toLowerCase();
            const searchedPokemon = searchValue.toLowerCase();
            

            return pokemonName.includes(searchedPokemon)
          }).map((pokemon:Pokemon)=>{
            const pokemonURLparts = pokemon.url.split('/')
            const pokemonID = Number(pokemonURLparts[pokemonURLparts.length - 2])

            return (<PokemonCard name={pokemon.name} key={pokemon.name} />)
          })}

      </section>
      <button className="bg-white flex p-2 text-lg font-bold rounded-md cursor-pointer hover:scale-105 mb-6" 
      onClick={() => {setOffset((prevOffset)=> prevOffset + 20)
        if(offset >= 1299){
          alert('All pokemons showed up on the display')
        }
      }}>Load more</button>
    </main>
  )
}