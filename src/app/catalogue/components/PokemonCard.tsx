'use client'
import {useState, useEffect} from 'react'
import Image from 'next/image'

export default function PokemonCard ({name}:any) {

  interface pokemon {
    id: Number,
    name: String,
    sprites: {front_default: string}
  }

  const [pokemonData, SetPokemonData] = useState<pokemon>({id:0, name:'', sprites:{front_default:''}})

  async function fetchPokemonData() {

    const fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const result = await fetchData.json();
    SetPokemonData(result)
  }

  useEffect(()=>{
    fetchPokemonData()
  },[])


  return (
    <div className="min-h-[6rem] min-w-[6rem] h-max w-max flex items-center justify-center bg-white m-2 cursor-pointer p-2 rounded-md shadow-md">
      {pokemonData.sprites.front_default ? <Image 
        src={pokemonData.sprites?.front_default}
        width={150}
        height={150}
        alt='pokemon photo'
        className=''
      /> : null}
      
    </div>
  )
}