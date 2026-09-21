import { pt, Translations } from './pt';
import { en } from './en';

export type Language = 'pt' | 'en';

export const dictionaries: Record<Language, Translations> = {
  pt,
  en,
};

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

export type { Translations };
