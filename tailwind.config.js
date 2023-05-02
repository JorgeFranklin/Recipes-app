const { colors } = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        'app-light': '#EBE9D3',
        'app-dark': '#0C1F2B',
        'app-red': '#db6666',
        'app-green-dark': '#2F6C71',
        'app-green': '#74A6A4',
        'app-green-light': '#A4D2C0',
      },
    },
  },
  plugins: [],
}
