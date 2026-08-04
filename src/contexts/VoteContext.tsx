'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import { Sparkles, CheckCircle2, AlertCircle, X, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Portal from '@/src/components/Portal';

interface PokemonInfo {
  id: number;
  name: string;
}

interface VoteContextType {
  remainingVotes: number | null;
  initiateVote: (pokemon: PokemonInfo, onVoteSuccess?: () => void) => void;
  refetchUserStatus: () => Promise<void>;
}

const VoteContext = createContext<VoteContextType>({
  remainingVotes: null,
  initiateVote: () => {},
  refetchUserStatus: async () => {},
});

export function VoteProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [remainingVotes, setRemainingVotes] = useState<number | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonInfo | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | null>(null);

  const fetchUserStatus = useCallback(async () => {
    if (status === 'authenticated') {
      try {
        const res = await fetch('/api/user/status');
        if (res.ok) {
          const data = await res.json();
          setRemainingVotes(data.remainingVotes);
        }
      } catch (err) {
        console.error('Failed to fetch user vote status:', err);
      }
    } else {
      setRemainingVotes(null);
    }
  }, [status]);

  useEffect(() => {
    fetchUserStatus();
  }, [fetchUserStatus]);

  const initiateVote = (pokemon: PokemonInfo, onVoteSuccess?: () => void) => {
    if (status !== 'authenticated' || !session) {
      router.push('/login');
      return;
    }
    setSelectedPokemon(pokemon);
    setErrorMessage(null);
    if (onVoteSuccess) {
      setOnSuccessCallback(() => onVoteSuccess);
    } else {
      setOnSuccessCallback(null);
    }
    setShowConfirmModal(true);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#00f2fe', '#f59e0b', '#10b981'],
    });
  };

  const handleConfirmVote = async () => {
    if (!selectedPokemon) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemonId: selectedPokemon.id }),
      });

      const data = await res.json();

      if (res.ok) {
        setRemainingVotes(data.remainingVotes);
        setShowConfirmModal(false);
        setShowSuccessModal(true);
        triggerConfetti();
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      } else {
        setErrorMessage(data.message || 'Erro ao registrar voto.');
      }
    } catch (err) {
      console.error('Vote submission error:', err);
      setErrorMessage('Erro de conexão ao enviar seu voto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <VoteContext.Provider
      value={{
        remainingVotes,
        initiateVote,
        refetchUserStatus: fetchUserStatus,
      }}
    >
      {children}

      <Portal>
        {/* Global Confirmation Modal */}
        <AnimatePresence>
          {showConfirmModal && selectedPokemon && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-obsidian/85 backdrop-blur-xl z-[-1]"
                onClick={() => !isSubmitting && setShowConfirmModal(false)}
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-obsidian-card border border-white/15 rounded-3xl p-6 shadow-2xl overflow-hidden z-10 text-slate-100"
              >
                <button
                  disabled={isSubmitting}
                  onClick={() => setShowConfirmModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 my-2 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-poke-red/30 to-poke-cyan/30 blur-xl animate-pulse" />
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
                      alt={selectedPokemon.name}
                      width={120}
                      height={120}
                      className="object-contain relative z-10 drop-shadow-2xl"
                    />
                  </div>

                  <h3 className="text-2xl font-black capitalize tracking-tight mt-2">
                    Votar em <span className="text-gradient-red">{selectedPokemon.name}</span>?
                  </h3>

                  <p className="text-sm text-slate-400 mt-2">
                    Seu voto ajudará este Pokémon a subir no Ranking Geral e na sua categoria elemental.
                  </p>

                  {remainingVotes !== null && (
                    <div className="mt-4 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Votos restantes hoje: <span className="font-bold text-white">{remainingVotes}</span>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="mt-4 w-full p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="mt-6 flex gap-3 w-full">
                    <button
                      disabled={isSubmitting}
                      onClick={() => setShowConfirmModal(false)}
                      className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-all disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                    <button
                      disabled={isSubmitting}
                      onClick={handleConfirmVote}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-poke-red to-rose-600 hover:from-rose-600 hover:to-poke-red text-white font-bold transition-all shadow-glow-red flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Trophy className="w-4 h-4" /> Confirmar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Global Success Modal */}
        <AnimatePresence>
          {showSuccessModal && selectedPokemon && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-obsidian/85 backdrop-blur-xl z-[-1]"
                onClick={() => setShowSuccessModal(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                className="relative w-full max-w-sm bg-obsidian-card border border-emerald-500/30 rounded-3xl p-6 shadow-glow-gold overflow-hidden z-10 text-slate-100 text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <h4 className="text-2xl font-bold text-white capitalize">Voto Computado!</h4>

                <p className="text-slate-300 text-sm mt-1">
                  Você votou com sucesso em <strong className="text-emerald-400 capitalize">{selectedPokemon.name}</strong>.
                </p>

                {remainingVotes !== null && (
                  <p className="text-xs text-amber-300 font-medium mt-3 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                    Você ainda tem <strong>{remainingVotes}</strong> voto(s) disponível(is) hoje.
                  </p>
                )}

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all"
                >
                  Continuar
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>
    </VoteContext.Provider>
  );
}

export function useVoteContext() {
  return useContext(VoteContext);
}
