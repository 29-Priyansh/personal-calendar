/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        handwritten: ['Comic Sans MS', 'cursive'],
      },
      animation: {
        'tilt': 'tilt 10s infinite linear',
      },
      keyframes: {
        tilt: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(-4deg)' },
        },
      },
    },
  },
  plugins: [],
};