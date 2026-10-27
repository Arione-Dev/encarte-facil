/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        retail: {
          red: '#D32F2F',
          yellow: '#FFC107',
          darkRed: '#B71C1C',
          green: '#2E7D32',
          blue: '#1565C0',
          dark: '#1E293B',
          gold: '#FFD700'
        }
      },
      fontFamily: {
        impact: ['Impact', 'Arial Black', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}

