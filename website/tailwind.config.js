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
        navy: 'rgb(var(--color-navy) / <alpha-value>)',
        sky: 'rgb(var(--color-sky) / <alpha-value>)',
        'on-dark': 'rgb(var(--color-on-dark) / <alpha-value>)',
        'on-light': 'rgb(var(--color-on-light) / <alpha-value>)',
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
        display: ['"Arial Black"', 'Impact', 'Haettenschweiler', 'sans-serif'],
        mono: ['"Courier New"', 'Courier', 'monospace'],
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'neo': '5px 6px 0px 0px #000000',
        'neo-sm': '3px 3px 0px 0px #000000',
        'neo-lg': '9px 10px 0px 0px #000000',
        'plate': '5px 6px 0px 0px #000000, 11px 13px 0px 0px rgb(var(--color-navy))',
        'neo-cyan': '5px 6px 0px 0px #000000',
        'neo-blue': '5px 6px 0px 0px #000000',
        'neo-purple': '5px 6px 0px 0px #000000',
        'neo-green': '5px 6px 0px 0px #000000',
        'neo-pink': '5px 6px 0px 0px #000000',
        'neo-yellow': '5px 6px 0px 0px #000000',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
