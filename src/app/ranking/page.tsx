// src/app/ranking/page.tsx
'use client'
import { VotesContext } from "@/contexts/RankingContext";
import { useEffect, useState, useMemo } from "react";
import RankingArticle from "./components/RankingArticle";
import Heading from "./components/Heading";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Definindo um tipo para os nossos Pokémon vindos da API
interface RankedPokemon {
  id: number;
  name: string;
  votes: number;
  // adicione outros campos se necessário
}

export default function Ranking() {
  const [remainingVotes, setRemainingVotes] = useState(10);
  const { data: session, status } = useSession();

  // Estados para cada lista de ranking
  const [generalPokemons, setGeneralPokemons] = useState<RankedPokemon[]>([])
  const [firePokemons, setFirePokemons] = useState<RankedPokemon[]>([]);
  const [waterPokemons, setWaterPokemons] = useState<RankedPokemon[]>([]);
  const [flyingPokemons, setFlyingPokemons] = useState<RankedPokemon[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const contextValue = useMemo(() => ({
    remainingVotes,
    setRemainingVotes
  }), [remainingVotes]);

  useEffect(() => {
    // Função para buscar os dados de um endpoint específico
    const fetchRanking = async (endpoint: string, setter: React.Dispatch<React.SetStateAction<RankedPokemon[]>>) => {
      try {
        const response = await fetch(`/api/ranking/${endpoint}`);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(`Erro ao buscar ranking para ${endpoint}:`, error);
      }
    };

    const fetchAllRankings = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchRanking('general', setGeneralPokemons),
        fetchRanking('fire', setFirePokemons),
        fetchRanking('water', setWaterPokemons),
        fetchRanking('flying', setFlyingPokemons),
      ]);
      setIsLoading(false);
    };

    fetchAllRankings();

    // Buscar os votos restantes do usuário se ele estiver logado
    const fetchUserStatus = async () => {
      if (status === 'authenticated') {
        const res = await fetch('/api/user/status'); // Você precisará criar esta API
        if (res.ok) {
          const data = await res.json();
          setRemainingVotes(data.remainingVotes);
        }
      }
    }
    fetchUserStatus();

  }, [status]);

  return(
    <main className="bg-gradient-to-b from-red-500 to-red-800 flex flex-col items-center
    justify-around min-h-screen h-max min-w-full gap-5 py-10">
      <VotesContext.Provider value={contextValue}>
        <Heading/>
        <section id="rankings" className="flex w-full gap-8 justify-center flex-wrap">
          {isLoading ? (
            <p className="text-white text-2xl">Carregando rankings...</p>
          ) : (
            <>
              <RankingArticle title="Ranking Geral" pokemonsList={generalPokemons} color="bg-gray-700" />
              <RankingArticle title="Fire Pokemons" pokemonsList={firePokemons} color="bg-red-800" />
              <RankingArticle title="Water Pokemons" pokemonsList={waterPokemons} color="bg-blue-700" />
              <RankingArticle title="Flying Pokemons" pokemonsList={flyingPokemons} color="bg-sky-500" />
            </>
          )}
        </section>
        <Link
          href='/'
          className='h-14 w-max p-4 my-10 cursor-pointer flex items-center text-3xl font-bold rounded-md bg-white hover:scale-105 shadow-md'
          target='_self'
        >
          Back {'<-'}
        </Link>
      </VotesContext.Provider>
    </main>
  )
}