
'use client'
import { VotesContext } from "@/src/contexts/RankingContext";
import { useEffect, useState, useMemo, useCallback } from "react";
import RankingArticle from "./components/RankingArticle";
import Heading from "./components/Heading";
import Link from "next/link";
import { useSession } from "next-auth/react";
import GeneralRanking from "./components/GeneralRanking";
import { IoHome } from "react-icons/io5";

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
  const [firePokemons, setFirePokemons] = useState<RankedPokemon[]>([])
  const [grassPokemons, setGrassPokemons] = useState<RankedPokemon[]>([])
  const [waterPokemons, setWaterPokemons] = useState<RankedPokemon[]>([])
  const [fairyPokemons, setFairyPokemons] = useState<RankedPokemon[]>([])
  const [flyingPokemons, setFlyingPokemons] = useState<RankedPokemon[]>([])
  
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const contextValue = useMemo(() => ({
    remainingVotes,
    setRemainingVotes
  }), [remainingVotes]);

  const fetchAllRankings = useCallback(async () => {
    const fetchRanking = async (endpoint: string) => {
      try {
        const response = await fetch(`/api/ranking/${endpoint}`);
        return await response.json();
      } catch (error) {
        console.error(`Erro ao buscar ranking para ${endpoint}:`, error);
        return []; // Retorna array vazio em caso de erro
      }
    };

    const [general, fire, grass, water, fairy, flying] = await Promise.all([
      fetchRanking('general'),
      fetchRanking('fire'),
      fetchRanking('grass'),
      fetchRanking('water'),
      fetchRanking('fairy'),
      fetchRanking('flying'),
    ]);
    
    setGeneralPokemons(general);
    setFirePokemons(fire);
    setGrassPokemons(grass);
    setWaterPokemons(water);
    setFairyPokemons(fairy);
    setFlyingPokemons(flying);
  }, []);

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
    <main className="flex flex-grow flex-col items-center
    justify-start h-max min-w-full gap-5 py-10 px-4">
      <VotesContext.Provider value={contextValue}>
        <Heading/>
        <section id="rankings" className="flex w-full gap-8 justify-center flex-wrap">
          {isLoading ? (
            <p className="text-white text-2xl">Carregando rankings...</p>
          ) : (
            <div className="flex flex-wrap gap-10 items-center justify-center">
              <GeneralRanking pokemonsList={generalPokemons} />
              <RankingArticle title="Fire Pokemons" pokemonsList={firePokemons} color="bg-red-600" onVoteSuccess={fetchAllRankings}/>
              <RankingArticle title="Grass Pokemons" pokemonsList={grassPokemons} color="bg-green-700" onVoteSuccess={fetchAllRankings}/>
              <RankingArticle title="Water Pokemons" pokemonsList={waterPokemons} color="bg-blue-700" onVoteSuccess={fetchAllRankings}/>
              <RankingArticle title="Fairy Pokemons" pokemonsList={fairyPokemons} color="bg-pink-500" onVoteSuccess={fetchAllRankings}/>
              <RankingArticle title="Flying Pokemons" pokemonsList={flyingPokemons} color="bg-sky-600" onVoteSuccess={fetchAllRankings}/>
            </div>
          )}
        </section>
        <Link
          href='/'
          className='h-max w-max px-3 sm:px-5 py-1 sm:py-3 my-10 cursor-pointer flex items-center gap-2 text-xl sm:text-2xl font-bold rounded-md bg-white hover:scale-105 hover:bg-slate-100 shadow-md'
          target='_self'
        >
          <IoHome />
          Homepage
        </Link>
      </VotesContext.Provider>
    </main>
  )
}