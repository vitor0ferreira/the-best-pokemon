import Image from "next/image";
import React, { useState, useContext } from "react"

import PokemonModal from "@/components/modals/PokemonModal";
import VoteCompletedModal from "@/components/modals/VoteCompletedModal";
import { VotesContext } from "@/contexts/RankingContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


interface RankingItemProps {
  pokemon: string,
  id: number,
  rank: number,
}

function RankingItem({pokemon, rank, id}: RankingItemProps) {

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
      
      { showModal && <PokemonModal pokemonData={pokemon} onclick={handleClick} onyesclick={handleVote} />}

      { showVotedModal && <VoteCompletedModal pokemonData={pokemon} onclick={handleVote} />}
      
    </>
  );
}

export default React.memo(RankingItem)