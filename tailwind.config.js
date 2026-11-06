/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
    },
    extend: {
      colors: {
        ivory: '#FAF8F3',
        beige: '#EDE4D3',
        sand: '#D8C9AE',
        taupe: '#8C7F6E',
        black: '#0B0B0B',
        charcoal: '#1A1A1A',
        gold: {
          DEFAULT: '#C9A45C',
          light: '#E3C88A',
          dark: '#A8833C',
          muted: 'rgba(201, 164, 92, 0.25)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cormorant', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Jost"', '"Manrope"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'luxury-sm': '0.15em',
        'luxury-md': '0.25em',
        'luxury-lg': '0.35em',
        'luxury-xl': '0.5em',
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

