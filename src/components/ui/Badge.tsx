import React from 'react';
import { POKEMON_TYPES } from '@/src/constants/pokemonTypesInfo';
import { clsx } from 'clsx';

interface BadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({ type, size = 'md', className }: BadgeProps) {
  const typeKey = type.toLowerCase();
  const info = POKEMON_TYPES[typeKey] || {
    nameEn: type,
    namePt: type,
    badgeBg: 'bg-slate-700 text-slate-300 border-slate-600',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] gap-1 font-medium',
    md: 'px-2.5 py-1 text-xs gap-1.5 font-semibold',
    lg: 'px-3.5 py-1.5 text-sm gap-2 font-bold',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center uppercase tracking-wider rounded-full border shadow-sm transition-all',
        info.badgeBg,
        sizeClasses[size],
        className
      )}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: info.color || '#94a3b8' }}
      />
      {info.nameEn}
    </span>
  );
}
