'use client'
import { VotesContext, VotesProvider } from "@/contexts/RankingContext";
import RankingCard from "@/components/RankingCard";
import { useContext, useEffect, useState } from "react";
import RankingArticle from "./components/RankingArticle";

export default function Ranking() {

  const { remainingVotes } = useContext(VotesContext)
  const [firePokemons, setFirePokemons] = useState()
  const [waterPokemons, setWaterPokemons] = useState()
  const [flyingPokemons, setFlyingPokemons] = useState()
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  const getPokemonsOfType = async (pokemonType:string) => {
      const fetchTypeResponse = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`)
      const fetchedData = await fetchTypeResponse.json()
      const pokemons = fetchedData.pokemon

      return pokemons
  }

  useEffect(()=>{
    
    const fetchData = async () => {
      const firePokemonsData = await getPokemonsOfType('fire');
      const waterPokemonsData = await getPokemonsOfType('water');
      const flyingPokemonsData = await getPokemonsOfType('flying');
  
      setFirePokemons(firePokemonsData);
      setWaterPokemons(waterPokemonsData);
      setFlyingPokemons(flyingPokemonsData);
      setIsLoading(false);
    };
  
    fetchData();
  },[])

  return(
      <main className="bg-gradient-to-b from-red-500 to-red-800 flex flex-col items-center
      justify-center min-h-screen h-max min-w-full gap-5">
        <VotesProvider>
          <span className="text-8xl text-center text-white font-bold block">Top Ranking</span>
          <span className="font-bold text-3xl text-yellow-400 block">Remaining Votes: {remainingVotes}</span>
          <section id="rankings" className="flex w-full gap-8 justify-center flex-wrap">
            {!isLoading ? <RankingArticle pokemonsList={firePokemons} /> : null}
            {!isLoading ? <RankingArticle pokemonsList={waterPokemons} /> : null}
            {!isLoading ? <RankingArticle pokemonsList={flyingPokemons} /> : null}
          </section>
          <a
            href='/'
            className='h-14 w-max p-4 cursor-pointer flex items-center text-3xl font-bold rounded-md bg-white hover:scale-105 shadow-md'
            target='_self'
          >
            Back {'<-'}
          </a>
        </VotesProvider>
      </main>
  )
}