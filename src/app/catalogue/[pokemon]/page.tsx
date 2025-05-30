'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PokemonData } from "@/types/pokemonTypes";


export default function PokemonDetailsPage (){

    const { pokemon: pokemon } = useParams()
    const [pokemonData, setPokemonData] = useState<PokemonData>()

    

    useEffect(()=>{

        const getPokemonData = async () => {
          try {
            const response = await fetch(`/api/pokemons?pokemon=${pokemon}`);

            if (!response.ok)
              throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setPokemonData(data);
          } catch (error) {
            console.error("Could fetch data: ", error);
          }
        };

        getPokemonData()
        
    },[pokemon])



    return (
        <main className="w-full min-h-screen h-max text-sm flex items-center justify-center">
            {pokemonData && 
                <div className="min-w-[400px] w-max min-h-[700px] h-max bg-slate-100 drop-shadow-md grid grid-cols-1 gap-2 py-8 px-2">
                    <div className="relative border-2 border-white flex items-center flex-col gap-4">
                        <Image 
                            src={`https://img.pokemondb.net/artwork/large/${pokemon}.jpg`} 
                            alt="pokemon image"
                            height={500} width={500} 
                            className="mix-blend-multiply saturate-[125%] object-contain aspect-square"
                        />
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold">#{pokemonData.id} {pokemonData.name[0].toLocaleUpperCase()+pokemonData.name.slice(1)}</span>
                            <span className="font-thin text-base">Weight: {pokemonData.weight} | Height: {pokemonData.height}</span>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-2">

                        <span className="font-semibold text-2xl">Stats: </span>
                        <div className="flex flex-wrap items-center justify-center w-full gap-2 px-2">
                            {pokemonData.stats.map((stat)=>{
                                return (
                                    <div key={stat.stat.url} className="px-2 py-1 bg-emerald-800 w-fit h-max rounded-sm text-white text-lg font-semibold">
                                        {stat.stat.name[0].toLocaleUpperCase()+stat.stat.name.slice(1)}: {stat.base_stat}
                                    </div>
                                )
                            })}
                        </div>

                        <span className="font-semibold text-2xl">Abilities: </span>
                        <div className="flex flex-wrap justify-center gap-2">
                            {pokemonData.abilities.map((ability)=>{
                                return (
                                    <div key={ability.ability.url} className="px-2 py-1 bg-green-800 w-max h-max rounded-sm text-white text-lg font-semibold">
                                        {ability.ability.name[0].toLocaleUpperCase()+ability.ability.name.slice(1)}
                                    </div>
                                )
                            })}
                        </div>
                        
                        
                        
                    </div>
                </div>
            }
        </main>
    )
}