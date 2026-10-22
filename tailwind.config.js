/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hammer: {
          green: '#2d844c',
          greenDark: '#1b5e32',
          greenLight: '#43a047',
          dark: '#0e1726',
          darker: '#0a0f1d',
          accent: '#10b981',
          gold: '#c99700',
          silver: '#94a3b8',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
