import Image from "next/image";
import React, { useState, useContext } from "react"

import PokemonModal from "@/src/components/modals/PokemonModal";
import VoteCompletedModal from "@/src/components/modals/VoteCompletedModal";
import { VotesContext } from "@/src/contexts/RankingContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


interface PokemonProps {
  pokemon: string,
  id: number,
  rank: number,
  votes: number
}

function RankingItem({pokemon, rank, id, votes}: PokemonProps) {

  const [imageUrl, setImageUrl] = useState<string>(`https://img.pokemondb.net/artwork/large/${pokemon}.jpg`)
  const [showModal, setShowModal] = useState<Boolean>(false)
  const [showVotedModal, setShowVotedModal] = useState<Boolean>(false)
  const router = useRouter()
  
  const { data: session } = useSession();
  const { setRemainingVotes } = useContext(VotesContext)

  console.log(`Renderizado ${pokemon}`)

  const handleClick = (e:any) => {
    setShowModal(!showModal)
    if(e.target.parentElement.id != ''){
      console.log(e.target.parentElement.id)
    } else {
      console.log(e.target.parentElement.parentElement.id)
    }
  }

  const handleCloseVotedModal = () => {
    setShowVotedModal(false);
  }

  const handleVote = async () => {
    if (!session) {
      alert('Você precisa estar logado para votar!');
      // Idealmente, redirecionar para a página de login
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pokemonId: id }),
      });

      const data = await response.json();

      if (response.ok) {
        if (showModal) setShowModal(false);
        setShowVotedModal(true);
        setRemainingVotes(data.remainingVotes); // Atualiza o contexto com os votos restantes
      } else {
        // Se a API retornar um erro (ex: limite de votos), exibe a mensagem
        alert(data.message);
        if (showModal) setShowModal(false);
      }
    } catch (error) {
      console.error('Erro ao votar:', error);
      alert('Ocorreu um erro ao tentar votar.');
    }
  };

  const handleImageLoadError = () => {
    setImageUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`)
  }
 

  return (
    <>
      <div id={id.toString()} className="w-full min-h-[3rem] h-16 border-black border-2 cursor-pointer hover:opacity-80 flex" onClick={(e)=> handleClick(e)}>
        <div className="w-16 bg-black text-white flex items-center justify-center text-4xl font-bold">
          {rank}
        </div>
        <div className="flex-1 flex items-center justify-between px-3 font-bold whitespace-nowrap text-white text-[1.5rem] bg-gradient-to-b h-full overflow-hidden" >
          <span className="no-underline">
            {pokemon[0].toLocaleUpperCase()+pokemon.slice(1)}
          </span>
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
            alt="pokemon photo"
            sizes="80px"
            onError={handleImageLoadError}
          />
        </div>
      </div>
      
      { showModal && <PokemonModal pokemonData={pokemon} onclick={handleClick} onyesclick={handleVote} />}

      { showVotedModal && <VoteCompletedModal pokemonData={pokemon} onclick={handleCloseVotedModal} />}
      
    </>
  );
}

export default React.memo(RankingItem)