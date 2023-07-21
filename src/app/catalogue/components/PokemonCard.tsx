'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'

export default function PokemonCard ({name}:any) {

  interface Pokemon {
    id: number,
    name: string,
    sprites: {front_default: string}
  }

  const [pokemonData, SetPokemonData] = useState<Pokemon>({id:0, name:'', sprites:{front_default:''}})

  async function fetchPokemonData() {

    const fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const result = await fetchData.json();
    SetPokemonData(result)
  }

  useEffect(()=>{
    fetchPokemonData()
  })


  return (
    <div className="min-h-[80px] min-w-[80px] h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 xl:h-36 xl:w-36 flex items-center justify-center m-1 cursor-pointer p-2 rounded-md shadow-md bg-gradient-to-b from-rose-100 to-teal-100 hover:scale-105">
      <abbr title={pokemonData?.name.toUpperCase()}>
        {pokemonData.sprites.front_default ? <Image 
          src={pokemonData.sprites.front_default}
          width={150}
          height={150}
          alt='pokemon photo'
        /> : null}
      </abbr>
    </div>
  )
}