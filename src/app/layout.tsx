import './globals.css';
import { Outfit } from 'next/font/google';
import SessionProvider from '../contexts/ServerProvider';
import { ThemeProvider } from '../contexts/ThemeContext';
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
    <html lang="en" className={`${outfit.variable} font-sans dark`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('pokemon_app_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'light' || (!theme && !prefersDark)) {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-obsidian text-slate-900 dark:text-slate-100 selection:bg-poke-red selection:text-white transition-colors duration-200">
        <SessionProvider>
          <ThemeProvider>
            <LanguageProvider>
              <VoteProvider>
                <Header />

                <div className="flex-grow flex flex-col">{children}</div>

                <Footer />
              </VoteProvider>
            </LanguageProvider>
          </ThemeProvider>
        </SessionProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
