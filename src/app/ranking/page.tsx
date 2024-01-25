'use client'
import { VotesContext } from "@/contexts/RankingContext";
import { useEffect, useState } from "react";
import RankingArticle from "./components/RankingArticle";
import Heading from "./components/Heading";

export default function Ranking() {

  const [remainingVotes, setRemainingVotes] = useState(10)
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

      await Promise.all([
        getPokemonsOfType('fire'),
        getPokemonsOfType('water'),
        getPokemonsOfType('flying')
      ]).then((groupsOfPokemons)=>{
        setFirePokemons(groupsOfPokemons[0]);
        setWaterPokemons(groupsOfPokemons[1]);
        setFlyingPokemons(groupsOfPokemons[2]);
        setIsLoading(false);
      });
      
      
    };
  
    fetchData();
  },[])

  return(
      <main className="bg-gradient-to-b from-red-500 to-red-800 flex flex-col items-center
      justify-around min-h-screen h-max min-w-full gap-5">
        <VotesContext.Provider value={{remainingVotes, setRemainingVotes}}>
          <Heading/>
          <section id="rankings" className="flex w-full gap-8 justify-center flex-wrap">
            {!isLoading ? <RankingArticle pokemonsList={firePokemons} name={'Fire'} /> : null}
            {!isLoading ? <RankingArticle pokemonsList={waterPokemons} name={'Water'} /> : null}
            {!isLoading ? <RankingArticle pokemonsList={flyingPokemons} name={'Flying'} /> : null}
          </section>
          <a
            href='/'
            className='h-14 w-max p-4 mb-4 cursor-pointer flex items-center text-3xl font-bold rounded-md bg-white hover:scale-105 shadow-md'
            target='_self'
          >
            Back {'<-'}
          </a>
        </VotesContext.Provider>
      </main>
  )
}