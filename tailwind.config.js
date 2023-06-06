// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: '#ee4d2d',
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      gray: '#222222',
      'border-color': '#00000024',
      ...colors
    }
  },
  plugins: []
}
