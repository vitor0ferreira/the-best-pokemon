import './globals.css';
import { Outfit } from 'next/font/google';
import SessionProvider from '../contexts/ServerProvider';
import { VoteProvider } from '../contexts/VoteContext';
import Header from '../components/Header';
import Link from 'next/link';
import { Trophy } from 'lucide-react';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
});

export const metadata = {
  title: 'The Best Pokémon — O Ranking Definitivo de Pokémon',
  description: 'Vote e escolha os melhores Pokémon de todos os tempos. Pokedex completa, estatísticas, áudios e rankings elementares em tempo real.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} font-sans dark`}>
      <body className="flex flex-col min-h-screen bg-obsidian text-slate-100 selection:bg-poke-red selection:text-white">
        <SessionProvider>
          <VoteProvider>
            <Header />

            <div className="flex-grow flex flex-col">{children}</div>

            {/* Footer */}
            <footer className="w-full border-t border-white/10 bg-obsidian-surface py-10 px-4 mt-auto">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
                  <span className="font-extrabold text-lg text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-poke-gold" />
                    THE BEST <span className="text-gradient-red">POKÉMON</span>
                  </span>
                  <p className="text-xs text-slate-400 max-w-md">
                    Eleição democrática em tempo real para definir os Pokémon mais amados de todas as gerações.
                  </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <Link href="/" className="hover:text-white transition-colors">Início</Link>
                  <Link href="/ranking" className="hover:text-white transition-colors">Rankings</Link>
                  <Link href="/catalogue" className="hover:text-white transition-colors">Pokédex</Link>
                  <Link href="/profile" className="hover:text-white transition-colors">Perfil</Link>
                </div>

                <div className="text-xs text-slate-500 text-center md:text-right">
                  <p>Desenvolvido com Next.js 15 & Prisma.</p>
                  <p className="mt-0.5">Pokémon e marcas registradas são propriedade da Nintendo / Game Freak.</p>
                </div>
              </div>
            </footer>
          </VoteProvider>
        </SessionProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
