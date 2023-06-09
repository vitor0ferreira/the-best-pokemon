import Image from "next/image";
import { useState, useEffect, useContext } from "react"

import PokemonModal from "@/components/modals/PokemonModal";
import VoteCompletedModal from "./modals/VoteCompletedModal";

export default function RankingCard(props:any) {

  const [pokemon, setPokemon] = useState<Object | any>({})
  const [showModal, setShowModal] = useState<Boolean>(false)
  const [showVotedModal, setShowVotedModal] = useState<Boolean>(false)

  const handleClick = (e:any) => {
    setShowModal(!showModal)
    if(e.target.parentElement.id != ''){
      console.log(e.target.parentElement.id)
    } else {
      console.log(e.target.parentElement.parentElement.id)
    }
  }

  const handleVote = (e:any) => {
    if(showModal){
      setShowModal(false)
    }
    setShowVotedModal(!showVotedModal)
  }
  
  const pokemonFetch = async (pokemon:string) => {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await pokemonResponse.json();
    setPokemon(data);
  }

  useEffect(()=>{
    let randomPokemon = (Math.round(Math.random()*600))
    pokemonFetch('' + randomPokemon);
  }, []);

  return (
    <>
      <div id={pokemon.id ? pokemon.id : null} className="w-full min-h-8 h-16 outline outline-black outline-2 cursor-pointer hover:opacity-80 flex" onClick={(e)=> handleClick(e)}>
        <div className="h-full w-20 bg-black text-white flex items-center justify-center text-4xl font-bold">
          {props.rank}
        </div>
        <div className="flex-1 flex items-center justify-start pl-3 font-bold whitespace-nowrap text-white text-[2.5rem] bg-gradient-to-b from-red-400 to-red-600 h-full overflow-hidden">
          <abbr title={(pokemon.name ? pokemon.name.toUpperCase() : null)} className="no-underline">
            {pokemon.name ? pokemon.name.toUpperCase() : null}
          </abbr>
        </div>
        <div className="h-full w-20 p-1 flex items-center justify-center">
          {pokemon.name ? (
            <Image 
              src={pokemon.sprites.front_default}
              height={80}
              width={80}
              alt="pokemon photo" />
          ) : null}
        </div>
      </div>
      {showModal && <PokemonModal pokemonData={pokemon} onclick={handleClick} 
        onyesclick={()=>{
          handleVote;
          
        }}
      />}
      {showVotedModal && <VoteCompletedModal pokemonData={pokemon} onclick={handleVote}/>}
    </>
  );
}