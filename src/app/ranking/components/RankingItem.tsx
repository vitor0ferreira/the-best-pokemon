import Image from "next/image";
import { useState, useEffect, useContext } from "react"

import PokemonModal from "@/components/modals/PokemonModal";
import VoteCompletedModal from "@/components/modals/VoteCompletedModal";
import { VotesContext } from "@/contexts/RankingContext";

interface RankingItemProps {
  pokemon: string,
  id: number,
  rank: number,
}

export default function RankingItem({pokemon, rank, id}: RankingItemProps) {

  const [imageUrl, setImageUrl] = useState<string>(`https://img.pokemondb.net/artwork/large/${pokemon}.jpg`)
  const [showModal, setShowModal] = useState<Boolean>(false)
  const [showVotedModal, setShowVotedModal] = useState<Boolean>(false)
  
  const {remainingVotes, setRemainingVotes} = useContext(VotesContext)

  const handleClick = (e:any) => {
    setShowModal(!showModal)
    if(e.target.parentElement.id != ''){
      console.log(e.target.parentElement.id)
    } else {
      console.log(e.target.parentElement.parentElement.id)
    }
  }

  const handleVote = () => {
    if(showModal){
      setShowModal(false)
    }
    setShowVotedModal(!showVotedModal)
    setRemainingVotes(remainingVotes - 1)
  }

  const handleImageLoadError = () => {
    setImageUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`)
  }
 

  return (
    <>
      <div id={id.toString()} className="w-full min-h-12 h-16 border-black border-2 cursor-pointer hover:opacity-80 flex" onClick={(e)=> handleClick(e)}>
        <div className="h-full w-20 bg-black text-white flex items-center justify-center text-4xl font-bold">
          {rank}
        </div>
        <div className={`flex-1 flex items-center justify-start pl-3 font-bold whitespace-nowrap text-white text-[2.5rem] bg-gradient-to-b h-full overflow-hidden`}>
          <abbr title={pokemon.toLocaleUpperCase()} className="no-underline">
            {pokemon[0].toLocaleUpperCase()+pokemon.slice(1)}
          </abbr>
        </div>
        <div className="relative h-full w-20 p-1 flex items-center justify-center overflow-hidden">
          <Image 
            src={imageUrl}
            fill
            className="object-contain overflow-hidden p-1"
            alt="pokemon photo"
            sizes="80px"
            onError={handleImageLoadError}
          />
        </div>
      </div>
      
      {showModal && <PokemonModal pokemonData={pokemon} onclick={handleClick} 
        onyesclick={handleVote}
      />}
      {showVotedModal && <VoteCompletedModal pokemonData={pokemon} onclick={handleVote}/>}
    </>
  );
}