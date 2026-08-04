'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  name: string;
  id: number;
}

export default function PokemonCard({ name, id }: CardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link
      href={`/catalogue/${name}`}
      className="group relative glass-panel glass-panel-hover rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-between text-center overflow-hidden aspect-square"
    >
      {/* ID Chip */}
      <span className="absolute top-3 left-3 text-[11px] font-mono font-bold text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-md border border-white/5">
        #{id.toString().padStart(4, '0')}
      </span>

      {/* Pokemon Image */}
      <div className="relative w-full flex-1 my-2 flex items-center justify-center">
        <Image
          src={imageUrl}
          fill
          alt={name}
          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>

      {/* Name */}
      <span className="font-extrabold text-white text-sm sm:text-base capitalize tracking-tight truncate w-full group-hover:text-poke-cyan transition-colors">
        {name}
      </span>
    </Link>
  );
}
