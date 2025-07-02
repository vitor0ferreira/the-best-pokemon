
import Image from "next/image";
import React from "react";
import { useVoting } from "@/src/hooks/useVoting";

interface PokemonProps {
  pokemon: string;
  id: number;
  rank: number;
  votes: number;
  onVoteSuccess: () => void;
}

function RankingItem({ pokemon, id, rank, votes, onVoteSuccess }: PokemonProps) {
  
  const { VotingModals, initiateVote } = useVoting({ onVoteSuccess });
  const [imageUrl, setImageUrl] = React.useState<string>(`https://img.pokemondb.net/artwork/large/${pokemon}.jpg`);

  const handleImageLoadError = () => {
    setImageUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`);
  };

  return (
    <>
      <VotingModals />
      <div 
        id={id.toString()} 
        className="w-full min-h-[3rem] h-16 border-black border-2 cursor-pointer hover:opacity-80 flex" 
        onClick={() => initiateVote({ id, name: pokemon })}
      >
        <div className="w-16 bg-black text-white flex items-center justify-center text-4xl font-bold">
          {rank}
        </div>
        <div className="flex-1 flex items-center justify-between px-3 font-bold whitespace-nowrap text-white text-[1.5rem] bg-gradient-to-b h-full overflow-hidden">
          <span className="no-underline">{pokemon[0].toUpperCase() + pokemon.slice(1)}</span>
          <span className="text-[0.5rem] h-min w-8 bg-black px-1 flex flex-col items-center justify-around">
            <span className="text-[1.2rem]">{votes}</span>
            <span className="-translate-y-1">votes</span>
          </span>
        </div>
        <div className="relative w-20 p-1 flex items-center justify-center overflow-hidden">
          <Image
            src={imageUrl}
            fill
            className="object-contain overflow-hidden p-1"
            alt={`${pokemon} photo`}
            sizes="80px"
            onError={handleImageLoadError}
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(RankingItem);