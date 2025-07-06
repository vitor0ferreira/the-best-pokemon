
'use client'
import { VotesContext } from "@/src/contexts/RankingContext";
import { useEffect, useState, useMemo, useCallback } from "react";
import RankingArticle from "./components/RankingArticle";
import Heading from "./components/Heading";
import Link from "next/link";
import { useSession } from "next-auth/react";
import GeneralRanking from "./components/GeneralRanking";

// Definindo um tipo para os nossos Pokémon vindos da API
interface RankedPokemon {
  id: number;
  name: string;
  votes: number;
  // adicione outros campos se necessário
}

export default function Ranking() {
  const [remainingVotes, setRemainingVotes] = useState<number | null>(null);
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

  const fetchAllRankings = useCallback(async () => {
    // Não precisamos do setIsLoading(true) aqui para evitar um "flash" de loading
    // durante a re-busca, a atualização será quase instantânea.
    const fetchRanking = async (endpoint: string) => {
      try {
        const response = await fetch(`/api/ranking/${endpoint}`);
        return await response.json();
      } catch (error) {
        console.error(`Erro ao buscar ranking para ${endpoint}:`, error);
        return []; // Retorna array vazio em caso de erro
      }
    };

    const [general, fire, water, flying] = await Promise.all([
      fetchRanking('general'),
      fetchRanking('fire'),
      fetchRanking('water'),
      fetchRanking('flying'),
    ]);
    
    setGeneralPokemons(general);
    setFirePokemons(fire);
    setWaterPokemons(water);
    setFlyingPokemons(flying);
  }, []); // useCallback com array de dependências vazio

  useEffect(() => {
    const initialLoad = async () => {
      setIsLoading(true);
      await fetchAllRankings();
      setIsLoading(false);
    }
    initialLoad();

    const fetchUserStatus = async () => {
      if (status === 'authenticated') {
        const res = await fetch('/api/user/status');
        if (res.ok) {
          const data = await res.json();
          setRemainingVotes(data.remainingVotes);
        }
      }
    }
    fetchUserStatus();
  }, [status, fetchAllRankings]); // Adicione fetchAllRankings à dependência

  return(
    <main className="bg-gradient-to-b from-red-500 to-red-800 flex flex-col items-center
    justify-start min-h-screen h-max min-w-full gap-5 py-10">
      <VotesContext.Provider value={contextValue}>
        <Heading/>
        <section id="rankings" className="flex w-full gap-8 justify-center flex-wrap">
          {isLoading ? (
            <p className="text-white text-2xl">Carregando rankings...</p>
          ) : (
            <div className="flex flex-wrap gap-10 items-center justify-center">
              <GeneralRanking pokemonsList={generalPokemons} />
              <RankingArticle title="Fire Pokemons" pokemonsList={firePokemons} color="bg-red-800" onVoteSuccess={fetchAllRankings}/>
              <RankingArticle title="Water Pokemons" pokemonsList={waterPokemons} color="bg-blue-700" onVoteSuccess={fetchAllRankings}/>
              <RankingArticle title="Flying Pokemons" pokemonsList={flyingPokemons} color="bg-sky-500" onVoteSuccess={fetchAllRankings}/>
            </div>
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