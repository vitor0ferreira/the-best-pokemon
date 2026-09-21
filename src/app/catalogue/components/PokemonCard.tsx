'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/src/components/ui/Badge';

interface CardProps {
  name: string;
  id: number;
  types?: string[];
}

function PokemonCard({ name, id, types = [] }: CardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link
      href={`/catalogue/${name}`}
      className="group relative glass-panel glass-panel-hover rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-between text-center overflow-hidden transition-all hover:scale-105"
    >
      {/* ID Chip */}
      <span className="absolute top-2.5 left-2.5 text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-200 dark:border-white/5 z-10">
        #{id.toString().padStart(4, '0')}
      </span>

      {/* Pokemon Image */}
      <div className="relative w-full aspect-square my-2 flex items-center justify-center">
        <Image
          src={imageUrl}
          fill
          alt={name}
          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>

      {/* Name */}
      <span className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base capitalize tracking-tight truncate w-full group-hover:text-poke-cyan transition-colors mt-1">
        {name}
      </span>

      {/* Type Badges */}
      <div className="flex items-center gap-1 mt-1.5 flex-wrap justify-center min-h-[22px]">
        {types.map((t) => (
          <Badge key={t} type={t} size="sm" />
        ))}
      </div>
    </Link>
  );
}

export default React.memo(PokemonCard);
