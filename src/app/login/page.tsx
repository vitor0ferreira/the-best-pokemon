'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Trophy, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/');
    }
  }, [session, status, router]);

  const handleGithubSignIn = () => {
    signIn('github', { redirectTo: '/' });
  };

  const handleGoogleSignIn = () => {
    signIn('google', { redirectTo: '/' });
  };

  if (status === 'loading') {
    return (
      <main className="flex-grow w-full min-h-screen flex items-center justify-center bg-obsidian">
        <div className="w-12 h-12 border-4 border-poke-red/30 border-t-poke-red rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="relative flex-grow w-full min-h-[85vh] flex items-center justify-center p-4 bg-hero-glow overflow-hidden">
      {/* Decorative Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-poke-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-poke-cyan/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Login Card */}
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl z-10 text-slate-100 flex flex-col items-center text-center">
        {/* Back Link */}
        <div className="w-full flex justify-start mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Início
          </Link>
        </div>

        {/* Brand Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-poke-red to-rose-600 flex items-center justify-center text-white shadow-glow-red mb-4">
          <Trophy className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          ENTRAR NO <span className="text-gradient-red">RANKING</span>
        </h1>

        <p className="text-slate-400 text-sm mt-2 max-w-xs leading-relaxed">
          Conecte sua conta para garantir 10 votos diários e participar da eleição dos melhores Pokémon.
        </p>

        {/* Features Bullet */}
        <div className="my-6 w-full p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2 text-left text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Login rápido e 100% seguro com OAuth</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Contagem de votos renovada a cada 24 horas</span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="w-full space-y-3">
          <button
            onClick={handleGithubSignIn}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-bold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-md"
          >
            <FaGithub className="w-5 h-5" />
            <span>Continuar com GitHub</span>
          </button>

          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-md"
          >
            <FaGoogle className="w-5 h-5 text-red-500" />
            <span>Continuar com Google</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-500 mt-6">
          Ao entrar, você concorda com as diretrizes da comunidade The Best Pokémon.
        </p>
      </div>
    </main>
  );
}