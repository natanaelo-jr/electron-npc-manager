/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        violet: {
          100: '#f3e8ff',
          200: '#c77dff',
          300: '#9d4edd',
          400: '#7b2cbf',
          500: '#5a189a',
          600: '#3c096c',
          700: '#240046',
          800: '#10002b'
        }
      },
      fontFamily: {
        sans: ['Quicksand', 'Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
}
