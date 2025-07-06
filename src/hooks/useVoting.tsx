// src/hooks/useVoting.ts
'use client';

import { useState, useContext, JSX } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { VotesContext } from '@/src/contexts/RankingContext';
import PokemonModal from '@/src/components/modals/PokemonModal';
import VoteCompletedModal from '@/src/components/modals/VoteCompletedModal';

interface PokemonInfo {
  id: number;
  name: string;
}

interface VotingHook {
  isVoting: boolean;
  VotingModals: () => JSX.Element | null;
  initiateVote: (pokemon: PokemonInfo) => void;
}

export function useVoting({ onVoteSuccess }: { onVoteSuccess?: () => void }): VotingHook {
  const { data: session } = useSession();
  const router = useRouter();
  const { setRemainingVotes } = useContext(VotesContext);

  const [isVoting, setIsVoting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonInfo | null>(null);

  const initiateVote = (pokemon: PokemonInfo) => {
    if (!session) {
      alert('Você precisa estar logado para votar!');
      router.push('/login');
      return;
    }
    setSelectedPokemon(pokemon);
    setShowConfirmationModal(true);
  };

  const handleVote = async () => {
    if (!selectedPokemon) return;

    setIsVoting(true);
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemonId: selectedPokemon.id }),
      });

      const data = await response.json();

      if (response.ok) {
        setRemainingVotes(data.remainingVotes);
        setShowConfirmationModal(false);
        setShowSuccessModal(true);
        onVoteSuccess?.();
      } else {
        alert(data.message);
        setShowConfirmationModal(false);
      }
    } catch (error) {
      console.error('Erro ao votar:', error);
      alert('Ocorreu um erro ao tentar votar.');
    } finally {
      setIsVoting(false);
    }
  };

  const handleCloseConfirmation = () => setShowConfirmationModal(false);
  const handleCloseSuccess = () => setShowSuccessModal(false);

  const VotingModals = () => (
      <>
        {showConfirmationModal && selectedPokemon && (
          <PokemonModal
            pokemonName={selectedPokemon.name}
            isVoting={isVoting}
            onConfirmVote={handleVote}
            onDeclineVote={handleCloseConfirmation}
          />
        )}
        {showSuccessModal && selectedPokemon && (
          <VoteCompletedModal
            pokemonData={selectedPokemon.name}
            onclick={handleCloseSuccess}
          />
        )}
      </>
    );
  

  return { isVoting, VotingModals, initiateVote };
}