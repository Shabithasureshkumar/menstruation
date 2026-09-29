/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      colors: {
        tracker: {
          pink: {
            DEFAULT: '#F43F8F',
            primary: '#F43F8F',
            secondary: '#FF5AA7',
            soft: '#FFF0F6',
            light: '#FFFCFE',
            border: '#F1DDE8',
            deep: '#D81B60',
            50: '#FFF0F6',
            100: '#FFE2EE',
            200: '#FFC6DF',
            300: '#FFA0CA',
            400: '#FF6EA8',
            500: '#F43F8F',
            600: '#DB2073',
            700: '#BC1058',
          },
          navy: '#17152B',
          gray: '#68708A',
          purple: '#6C5CE7',
          bg: '#FFFCFE',
          card: '#FFFFFF',
        },
        brand: {
          pink: {
            50: '#FFF1F2',
            100: '#FFE4E6',
            200: '#FECDD3',
            300: '#FDA4AF',
            400: '#FB7185',
            500: '#F43F5E',
            600: '#E11D48',
            700: '#BE123C',
            accent: '#EA33A1',
            light: '#FFDEE9',
          },
          purple: {
            50: '#FAF5FF',
            100: '#F3E8FF',
            200: '#E9D5FF',
            300: '#D8B4FE',
            400: '#C084FC',
            500: '#A855F7',
            600: '#9333EA',
            700: '#7E22CE',
            deep: '#26214E',
            border: '#955BE3',
          },
        },
      },
      // Tokens below back class names already used across the UI (Tailwind v4-style
      // names such as shadow-2xs / w-4.5) so they generate real CSS on Tailwind v3.
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '8.5': '2.125rem',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      scale: {
        '102': '1.02',
      },
      backdropBlur: {
        xs: '2px',
      },
      dropShadow: {
        xs: '0 1px 1px rgb(0 0 0 / 0.05)',
      },
      boxShadow: {
        '2xs': '0 1px rgb(0 0 0 / 0.05)',
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'card': '0 4px 20px -2px rgba(173, 149, 178, 0.08)',
        'card-hover': '0 10px 25px -4px rgba(173, 149, 178, 0.14)',
        'section': '0 8px 30px rgba(173, 149, 178, 0.08)',
        'pill': '0 2px 8px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xs': '0.125rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
    },
  },
  plugins: [],
}
