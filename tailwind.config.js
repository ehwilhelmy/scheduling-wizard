/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: '#b60074',
          surface: '#e0008008',
          border: '#af006f2d',
          hover: '#e2008b23',
          text: '#b60074d6',
        },
        neutral: {
          text: '#1c2024',
          muted: '#0007149f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}