import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', lg: '2rem' },
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        ink: {
          50: '#f5f5f4',
          100: '#e7e5e4',
          200: '#cfcdca',
          300: '#a8a4a0',
          400: '#787470',
          500: '#4d4945',
          600: '#312e2b',
          700: '#23211f',
          800: '#161513',
          900: '#0b0a09',
          950: '#050504',
        },
        gold: {
          50: '#fbf6e9',
          100: '#f4ead0',
          200: '#e8d39a',
          300: '#dcb963',
          400: '#cda23b',
          500: '#b8862a',
          600: '#946720',
          700: '#714c1b',
          800: '#4f3514',
          900: '#2f1f0d',
        },
        cream: '#f5f0e6',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
      },
      backgroundImage: {
        'hero-vignette':
          'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.85) 100%)',
        'gold-shine':
          'linear-gradient(110deg, #b8862a 0%, #f4ead0 45%, #b8862a 55%, #946720 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
