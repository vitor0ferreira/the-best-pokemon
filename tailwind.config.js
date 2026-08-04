/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#090d16',
          surface: '#111726',
          card: '#161e31',
          border: '#222f47',
          hover: '#1e293b',
        },
        poke: {
          red: '#ff3366',
          gold: '#f59e0b',
          cyan: '#00f2fe',
          purple: '#8b5cf6',
        },
        type: {
          normal: '#a8a77a',
          fire: '#ff4222',
          water: '#3899f8',
          electric: '#f8d030',
          grass: '#78c850',
          ice: '#98d8d8',
          fighting: '#c03028',
          poison: '#a040a0',
          ground: '#e0c068',
          flying: '#a890f0',
          psychic: '#f85888',
          bug: '#a8b820',
          rock: '#b8a038',
          ghost: '#705898',
          dragon: '#7038f8',
          dark: '#705848',
          steel: '#b8b8d0',
          fairy: '#ee99ac',
        }
      },
      backgroundImage: {
        'pokeball-radial': 'radial-gradient(circle at 50% 30%, rgba(255, 51, 102, 0.15) 0%, rgba(9, 13, 22, 0.95) 70%)',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0, 242, 254, 0.18), transparent 100%)',
        'gold-podium': 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0.05) 100%)',
        'silver-podium': 'linear-gradient(135deg, rgba(148, 163, 184, 0.25) 0%, rgba(148, 163, 184, 0.05) 100%)',
        'bronze-podium': 'linear-gradient(135deg, rgba(217, 119, 6, 0.25) 0%, rgba(217, 119, 6, 0.05) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-red': '0 0 25px rgba(255, 51, 102, 0.4)',
        'glow-cyan': '0 0 25px rgba(0, 242, 254, 0.4)',
        'glow-gold': '0 0 30px rgba(245, 158, 11, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
