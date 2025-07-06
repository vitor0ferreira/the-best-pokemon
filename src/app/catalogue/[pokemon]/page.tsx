
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
    <main className="w-full h-full flex flex-grow items-center justify-center bg-slate-50 p-4">
      <VotingModals />
      <div className="w-full max-w-4xl bg-slate-100 drop-shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-sm aspect-square">
            <Image
              src={`https://img.pokemondb.net/artwork/large/${pokemon}.jpg`}
              alt={`Imagem do ${pokemonData.name}`}
              fill
              className="object-contain mix-blend-multiply saturate-[125%]"
              priority
            />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <span className="text-3xl lg:text-4xl font-bold">
              #{pokemonData.id}{" "}
              {pokemonData.name[0].toLocaleUpperCase() +
                pokemonData.name.slice(1)}
            </span>
            <span className="font-semibold text-gray-600">
              Peso: {pokemonData.weight / 10} kg | Altura:{" "}
              {pokemonData.height / 10} m
            </span>
            <button
              className="w-full max-w-xs mt-4 py-3 px-4 rounded-lg font-semibold text-xl text-white bg-green-600 hover:bg-green-700 transition-colors shadow-lg"
              onClick={() =>
                initiateVote({ id: pokemonData.id, name: pokemonData.name })
              }
            >
              Vote em{" "}
              {pokemonData.name[0].toLocaleUpperCase() +
                pokemonData.name.slice(1)}
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-6 mt-4 md:mt-0">
          {/* Seção de Status */}
          <div className="w-full text-center">
            <span className="font-bold text-2xl lg:text-3xl">Stats</span>
            <div className="flex flex-wrap items-center justify-center w-full gap-2 mt-2 px-2">
              {pokemonData.stats.map((stat) => {
                return (
                  <div
                    key={stat.stat.url}
                    className="px-3 py-1.5 bg-sky-700 w-fit h-max rounded-md text-white text-lg font-semibold shadow"
                  >
                    {stat.stat.name.replace("-", " ").toLocaleUpperCase()}: {stat.base_stat}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Seção de Habilidades */}
          <div className="w-full text-center">
            <span className="font-bold text-2xl lg:text-3xl">Abilities</span>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {pokemonData.abilities.map((ability) => {
                return (
                  <div
                    key={ability.ability.url}
                    className="px-3 py-1.5 bg-amber-600 w-max h-max rounded-md text-white text-lg font-semibold shadow"
                  >
                    {ability.ability.name.replace("-", " ").toLocaleUpperCase()}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}