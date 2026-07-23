/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        visa: {
          navy: '#0A142F',
          indigo: '#1A1F71',
          gold: '#FAA61A',
          goldHover: '#E59510',
          darkBg: '#051424',
          surface: '#122131',
          card: '#1C2B3C',
          border: '#273647',
          textMuted: '#909098'
        }
      }
    },
  },
  plugins: [],
}
