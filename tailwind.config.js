/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pokeball-gradient': 'radial-gradient(circle at 50% -20%, white, rgba(239, 68, 68, 0.5) 35%, transparent 60%)',
      },
      boxShadow: {
        '3xl': '0 0 2rem -.4rem rgba(0, 0, 0, 0.5)',
      },
      animation: {
        fadein: 'fadein 1s linear'
      },
      keyframes: {
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1}
        }
      }
    },
  },
  plugins: [],
}
