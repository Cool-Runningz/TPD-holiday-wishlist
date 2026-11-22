export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6EE',
        paper: '#FFFDF8',
        sand: '#F0E8D8',
        ink: {
          DEFAULT: '#14213D',
          soft: '#4A5468',
          muted: '#646B7A',
        },
        sky: {
          DEFAULT: '#74C7D5',
          deep: '#1D6A78',
          wash: '#E3F3F6',
        },
      },
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
};
