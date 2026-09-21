import './globals.css';
import { Outfit } from 'next/font/google';
import SessionProvider from '../contexts/ServerProvider';
import { LanguageProvider } from '../contexts/LanguageContext';
import { VoteProvider } from '../contexts/VoteContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <html lang="en" className={`${outfit.variable} font-sans dark`}>
      <body className="flex flex-col min-h-screen bg-obsidian text-slate-100 selection:bg-poke-red selection:text-white">
        <SessionProvider>
          <LanguageProvider>
            <VoteProvider>
              <Header />

              <div className="flex-grow flex flex-col">{children}</div>

              <Footer />
            </VoteProvider>
          </LanguageProvider>
        </SessionProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
