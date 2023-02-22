/** eslint-disable no-undef*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bluy: {
          100: '#156BA3',
          200: '#1553A3',
        },
        redy: {
          100: '#CB1C50',
          200: '#A21640'
        }
      }
    },
  },
  plugins: [],
}
