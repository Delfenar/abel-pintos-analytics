/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FAF8F0',
          100: '#F3E5AB',
          200: '#EBD27A',
          300: '#E2BD49',
          400: '#D4AF37', // Official Gold Accent
          500: '#C5A059',
          600: '#A68037',
          700: '#836224',
          800: '#614618',
          900: '#432E0E',
        },
        obsidian: {
          950: '#07090E',
          900: '#0B0F17',
          850: '#101726',
          800: '#172033',
        },
        instagram: '#E1306C',
        threads: '#000000',
        tiktok: '#00F2FE',
        facebook: '#1877F2',
        twitter: '#1DA1F2',
        youtube: '#FF0000',
        spotify: '#1DB954',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
