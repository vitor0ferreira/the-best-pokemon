'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

const STAT_COLORS: Record<string, string> = {
  hp: '#ef4444',
  attack: '#f97316',
  defense: '#eab308',
  'special-attack': '#06b6d4',
  'special-defense': '#10b981',
  speed: '#ec4899',
};

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'Sp. ATK',
  'special-defense': 'Sp. DEF',
  speed: 'SPD',
};

export default function StatBar({ label, value, max = 255 }: StatBarProps) {
  const normalizedKey = label.toLowerCase().replace(/\s+/g, '-');
  const statName = STAT_LABELS[normalizedKey] || label.toUpperCase();
  const barColor = STAT_COLORS[normalizedKey] || '#38bdf8';
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="w-full flex flex-col gap-1 text-xs font-semibold">
      <div className="flex justify-between items-center text-slate-300">
        <span className="tracking-wider uppercase font-mono">{statName}</span>
        <span className="font-mono text-white text-sm font-bold tabular-nums">{value}</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-slate-900 border border-white/5 overflow-hidden p-0.5 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ backgroundColor: barColor }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}
