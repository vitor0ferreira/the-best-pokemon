'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User, LogOut, LogIn, Sparkles, Shield, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoteContext } from '@/src/contexts/VoteContext';

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const { remainingVotes } = useVoteContext();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await signOut({ callbackUrl: '/' });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const user = status === 'authenticated' ? session?.user : null;

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 hover:border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-poke-red/50"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-slate-900 flex items-center justify-center">
          {user?.image ? (
            <Image
              src={user.image}
              fill
              sizes="32px"
              alt={user.name || 'User avatar'}
              className="object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-slate-300" />
          )}
        </div>

        {user && (
          <span className="hidden md:inline text-xs font-semibold text-slate-200 max-w-[100px] truncate">
            {user.name?.split(' ')[0]}
          </span>
        )}

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl border border-white/10 shadow-2xl p-2 z-50 overflow-hidden text-slate-200"
          >
            {status === 'authenticated' && user ? (
              <div className="flex flex-col">
                <div className="px-3 py-2.5 border-b border-white/10 mb-1">
                  <p className="text-xs text-slate-400 font-medium">Logado como</p>
                  <p className="text-sm font-bold text-white truncate">{user.name}</p>

                  {remainingVotes !== null && (
                    <div className="mt-2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] font-semibold text-amber-300">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{remainingVotes} voto(s) hoje</span>
                    </div>
                  )}
                </div>

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Shield className="w-4 h-4 text-poke-cyan" />
                  <span>Meu Perfil & Votos</span>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors mt-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <div className="p-1">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-poke-red to-rose-600 hover:from-rose-600 hover:to-poke-red text-white text-sm font-bold transition-all shadow-glow-red"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Entrar para Votar</span>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}