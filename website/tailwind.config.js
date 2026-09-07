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
        inset: 'rgb(var(--color-inset) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        'panel-strong': 'rgb(var(--color-panel-strong) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        body: 'rgb(var(--color-body) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        faint: 'rgb(var(--color-faint) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        'line-soft': 'rgb(var(--color-line-soft) / <alpha-value>)',
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
          gray: 'rgb(var(--color-inset) / <alpha-value>)',
          white: 'rgb(var(--color-foreground) / <alpha-value>)',
          blue: 'rgb(var(--color-accent-cyan) / <alpha-value>)',
          purple: 'rgb(var(--color-accent-purple) / <alpha-value>)',
          green: 'rgb(var(--color-accent-green) / <alpha-value>)',
          pink: 'rgb(var(--color-accent-pink) / <alpha-value>)',
          yellow: 'rgb(var(--color-accent-yellow) / <alpha-value>)',
        }
      },
      fontFamily: {
        mono: ['"Courier New"', 'Courier', 'monospace'],
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgb(var(--color-border))',
        'neo-sm': '2px 2px 0px 0px rgb(var(--color-border))',
        'neo-lg': '8px 8px 0px 0px rgb(var(--color-border))',
        'neo-cyan': '4px 4px 0px 0px rgb(var(--color-accent-cyan))',
        'neo-blue': '4px 4px 0px 0px rgb(var(--color-accent-cyan))',
        'neo-purple': '4px 4px 0px 0px rgb(var(--color-accent-purple))',
        'neo-green': '4px 4px 0px 0px rgb(var(--color-accent-green))',
        'neo-pink': '4px 4px 0px 0px rgb(var(--color-accent-pink))',
        'neo-yellow': '4px 4px 0px 0px rgb(var(--color-accent-yellow))',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
