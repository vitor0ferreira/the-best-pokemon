// src/app/catalogue/[pokemon]/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function PokemonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-red-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-2xl">
        <h2 className="text-4xl font-bold text-red-600 mb-4">Algo deu errado!</h2>
        <p className="text-lg text-gray-700 mb-6">
          Não foi possível carregar os dados do Pokémon. A API externa pode estar offline ou indisponível no momento.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={
              // Tenta renderizar a página novamente
              () => reset()
            }
          >
            Tentar Novamente
          </button>
          <Link href="/catalogue" className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700">
            Voltar para o Catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}