/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        cartier: {
          red: '#B0121B',
          ivory: '#F8F7F4',
          black: '#0B0B0B'
        }
      }
    },
  },
  plugins: [],
}
