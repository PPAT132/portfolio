/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#050505',
          dark: '#0a0a0a',
          gray: '#1a1a1a',
          white: '#ffffff',
          blue: '#00f3ff', // Neon Cyan
          purple: '#bc13fe', // Neon Purple
          green: '#00ff41', // Matrix Green
          pink: '#ff00ff', // Magenta
          yellow: '#fcee0a', // Cyber Yellow
        }
      },
      fontFamily: {
        mono: ['"Courier New"', 'Courier', 'monospace'], // Force brutalist mono font
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'], // Clean sans for body
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(255, 255, 255, 1)',
        'neo-sm': '2px 2px 0px 0px rgba(255, 255, 255, 1)',
        'neo-lg': '8px 8px 0px 0px rgba(255, 255, 255, 1)',
        'neo-blue': '4px 4px 0px 0px #00f3ff',
        'neo-purple': '4px 4px 0px 0px #bc13fe',
        'neo-green': '4px 4px 0px 0px #00ff41',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
