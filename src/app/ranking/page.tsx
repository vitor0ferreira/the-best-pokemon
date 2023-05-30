'use client'
import { useState } from "react"

export default function Ranking() {
  const [pokemon, setPokemon] = useState('charizard');

  const pokemonFetch:Object = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response)=>{response.json})


  return(
    <main className="bg-gradient-to-b from-red-600 to-red-900 flex flex-col min-h-screen min-w-full">
      <span className="text-[8rem] text-center text-white font-bold block">TOP RANKING</span>
      <section id="rankings" className="flex w-full justify-around">
        <article className="bg-white h-[700px] w-[30rem] rounded-2xl overflow-hidden border-[3px] border-black">
          <div className="w-full min-h-8 h-16 outline outline-black outline-2 cursor-pointer hover:opacity-80 flex">
            <div className="h-full w-20 bg-black text-white flex items-center justify-center text-4xl font-bold">
              1º
            </div>
            <div className="flex-1 bg-red-600 h-full"></div>
            <div className="h-full w-20">
              
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}