export interface GenerationInfo {
  id: number;
  roman: string;
  namePt: string;
  nameEn: string;
  region: string;
  start: number;
  end: number;
}

export const GENERATIONS: GenerationInfo[] = [
  { id: 1, roman: 'Gen I', namePt: 'Geração I', nameEn: 'Gen I', region: 'Kanto', start: 1, end: 151 },
  { id: 2, roman: 'Gen II', namePt: 'Geração II', nameEn: 'Gen II', region: 'Johto', start: 152, end: 251 },
  { id: 3, roman: 'Gen III', namePt: 'Geração III', nameEn: 'Gen III', region: 'Hoenn', start: 252, end: 386 },
  { id: 4, roman: 'Gen IV', namePt: 'Geração IV', nameEn: 'Gen IV', region: 'Sinnoh', start: 387, end: 493 },
  { id: 5, roman: 'Gen V', namePt: 'Geração V', nameEn: 'Gen V', region: 'Unova', start: 494, end: 649 },
  { id: 6, roman: 'Gen VI', namePt: 'Geração VI', nameEn: 'Gen VI', region: 'Kalos', start: 650, end: 721 },
  { id: 7, roman: 'Gen VII', namePt: 'Geração VII', nameEn: 'Gen VII', region: 'Alola', start: 722, end: 809 },
  { id: 8, roman: 'Gen VIII', namePt: 'Geração VIII', nameEn: 'Gen VIII', region: 'Galar / Hisui', start: 810, end: 905 },
  { id: 9, roman: 'Gen IX', namePt: 'Geração IX', nameEn: 'Gen IX', region: 'Paldea', start: 906, end: 1025 },
];

export function getGenerationById(pokemonId: number): GenerationInfo | undefined {
  return GENERATIONS.find((gen) => pokemonId >= gen.start && pokemonId <= gen.end);
}
