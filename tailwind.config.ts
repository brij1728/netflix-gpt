/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'netflix-black': '#000000',
        'netflix-red': '#dc2626',
        red: {
          600: '#dc2626',
          700: '#b91c1c',
        },
        white: {
          100: '#ffffff',
          200: '#f2f2f2',
          300: '#e5e5e5',
          400: '#cccccc',
          500: '#b2b2b2',
        },
        gray: {
          500: '#6b7280',
          700: '#374151',
          800: '#1f2937',
        },
      },
    },
  },
  plugins: [],
};
