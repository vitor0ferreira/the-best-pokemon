
'use client'
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { PokemonData } from "@/src/types/pokemonTypes";
import { useVoting } from "@/src/hooks/useVoting";


function ApiErrorDisplay({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-red-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-2xl">
        <h2 className="text-4xl font-bold text-red-600 mb-4">Falha na Conexão</h2>
        <p className="text-lg text-gray-700 mb-6">
          Não foi possível conectar à API de Pokémon. O serviço pode estar temporariamente indisponível.
        </p>
        <button
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={onRetry}
        >
          Tentar Novamente
        </button>
      </div>
    </main>
  );
}

export default function PokemonDetailsPage() {

  const { pokemon } = useParams();
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { VotingModals, initiateVote } = useVoting({});

  const getPokemonData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/pokemons?pokemon=${pokemon}`);
      if (!response.ok) {
        throw new Error(`A API retornou um erro: ${response.statusText}`);
      }
      const data = await response.json();
      setPokemonData(data);
    } catch (err: any) {
      console.error("Falha ao buscar dados do Pokémon:", err);  
      setError(err.message || "Não foi possível carregar os dados.");
    } finally {
      setIsLoading(false);
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemon) {
      getPokemonData();
    }
  }, [pokemon, getPokemonData]);

  if (isLoading) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <p className="text-2xl font-bold animate-pulse">Carregando dados do Pokémon...</p>
      </main>
    );
  }

  if (error) {
    return <ApiErrorDisplay onRetry={getPokemonData} />;
  }

  if (!pokemonData) {
    return <ApiErrorDisplay onRetry={getPokemonData} />;
  }

  return (
    <main className="w-full min-h-screen h-max text-sm flex items-center justify-center">
        <VotingModals />
        <div className="min-w-[400px] w-max min-h-[700px] h-max bg-slate-100 drop-shadow-md grid grid-cols-1 gap-2 py-8 px-2">
            <button 
                className="py-2 px-3 mx-auto rounded-md font-semibold text-2xl bg-green-700 hover:bg-red-500 text-white"
                onClick={() => initiateVote({ id: pokemonData.id, name: pokemonData.name })}
            >
                Vote em {pokemonData.name[0].toLocaleUpperCase()+pokemonData.name.slice(1)}
            </button>
            <div className="relative flex items-center flex-col gap-4">
                <Image 
                    src={`https://img.pokemondb.net/artwork/large/${pokemon}.jpg`} 
                    alt="pokemon image"
                    height={500} width={500} 
                    className="mix-blend-multiply saturate-[125%]"
                    priority 
                />
                <div className="flex flex-col gap-1 text-center">
                    <span className="text-3xl font-bold">#{pokemonData.id} {pokemonData.name[0].toLocaleUpperCase()+pokemonData.name.slice(1)}</span>
                    <span className="font-thin text-base">Peso: {pokemonData.weight} | Altura: {pokemonData.height}</span>
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
    </main>
  );
}