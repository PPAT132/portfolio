/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--color-accent-cyan) / <alpha-value>)',
          cyan: 'rgb(var(--color-accent-cyan) / <alpha-value>)',
          purple: 'rgb(var(--color-accent-purple) / <alpha-value>)',
          green: 'rgb(var(--color-accent-green) / <alpha-value>)',
          pink: 'rgb(var(--color-accent-pink) / <alpha-value>)',
          yellow: 'rgb(var(--color-accent-yellow) / <alpha-value>)',
        },
        error: 'rgb(var(--color-error) / <alpha-value>)',
        cyber: {
          black: 'rgb(var(--color-background) / <alpha-value>)',
          dark: 'rgb(var(--color-surface) / <alpha-value>)',
          gray: 'rgb(26 26 26 / <alpha-value>)',
          white: 'rgb(var(--color-foreground) / <alpha-value>)',
          blue: 'rgb(var(--color-accent-cyan) / <alpha-value>)',
          purple: 'rgb(var(--color-accent-purple) / <alpha-value>)',
          green: 'rgb(var(--color-accent-green) / <alpha-value>)',
          pink: 'rgb(var(--color-accent-pink) / <alpha-value>)',
          yellow: 'rgb(var(--color-accent-yellow) / <alpha-value>)',
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
