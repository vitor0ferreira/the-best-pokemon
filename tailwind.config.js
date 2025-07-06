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
        'main-gradient': 'radial-gradient( circle at 51.2% 51%,  rgba(11,27,103,1) 0%, rgba(16,66,157,1) 0%, rgba(11,27,103,1) 17.3%, rgba(11,27,103,1) 58.8%, rgba(11,27,103,1) 71.4%, rgba(16,66,157,1) 100.2%, rgba(187,187,187,1) 100.2% )',
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
