import { prisma } from './prisma';
import { DAILY_BATTLE_THEMES, DailyBattleTheme } from '../constants/dailyBattleThemes';

/**
 * Calculates the dateKey for the current 12:00 UTC-3 battle cycle.
 * Each cycle runs from 12:00 noon UTC-3 today until 12:00 noon UTC-3 tomorrow.
 */
export function getBrasiliaDateKey(date: Date = new Date()): { dateKey: string; secondsRemaining: number } {
  // Convert UTC time to UTC-3 (Brasília Time) timestamp
  const utcTime = date.getTime();
  const brasiliaOffsetMs = -3 * 60 * 60 * 1000;
  const brasiliaDate = new Date(utcTime + brasiliaOffsetMs);

  // Shift by 12 hours so the 12:00 boundary maps to 00:00 midnight for dateKey calculation
  const shiftedDate = new Date(brasiliaDate.getTime() - 12 * 60 * 60 * 1000);
  const year = shiftedDate.getUTCFullYear();
  const month = String(shiftedDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(shiftedDate.getUTCDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;

  // Next 12:00 UTC-3 boundary
  const currentHours = brasiliaDate.getUTCHours();
  const next12NoonBrasilia = new Date(brasiliaDate);
  if (currentHours >= 12) {
    next12NoonBrasilia.setUTCDate(next12NoonBrasilia.getUTCDate() + 1);
  }
  next12NoonBrasilia.setUTCHours(12, 0, 0, 0);

  const secondsRemaining = Math.max(0, Math.floor((next12NoonBrasilia.getTime() - brasiliaDate.getTime()) / 1000));

  return { dateKey, secondsRemaining };
}

/**
 * Selects a theme deterministically based on dateKey hash
 */
export function getThemeForDateKey(dateKey: string): DailyBattleTheme {
  // Simple deterministic hash of dateKey
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash << 5) - hash + dateKey.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % DAILY_BATTLE_THEMES.length;
  return DAILY_BATTLE_THEMES[index];
}

/**
 * Auto-closes any previous unclosed battles and updates the winner's dailyBattleWins in Pokemon table
 */
export async function resolveEndedBattles(currentDateKey: string) {
  try {
    const unclosedBattles = await prisma.dailyBattle.findMany({
      where: {
        dateKey: { not: currentDateKey },
        ended: false,
      },
      include: {
        votes: true,
      },
    });

    for (const battle of unclosedBattles) {
      if (battle.votes.length > 0) {
        // Tally votes per pokemonId
        const tally: Record<number, number> = {};
        battle.votes.forEach((v) => {
          tally[v.pokemonId] = (tally[v.pokemonId] || 0) + 1;
        });

        // Determine winnerId (candidate with highest vote count)
        let winnerId: number | null = null;
        let maxVoteCount = -1;
        Object.entries(tally).forEach(([pIdStr, count]) => {
          const pId = Number(pIdStr);
          if (count > maxVoteCount) {
            maxVoteCount = count;
            winnerId = pId;
          }
        });

        if (winnerId) {
          // Increment dailyBattleWins on the winning Pokemon
          await prisma.pokemon.update({
            where: { id: winnerId },
            data: { dailyBattleWins: { increment: 1 } },
          });
        }

        await prisma.dailyBattle.update({
          where: { id: battle.id },
          data: { ended: true, winnerId },
        });
      } else {
        await prisma.dailyBattle.update({
          where: { id: battle.id },
          data: { ended: true },
        });
      }
    }
  } catch (err) {
    console.error('Error resolving ended battles:', err);
  }
}
