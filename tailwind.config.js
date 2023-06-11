// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: true,
    'colors.black': true,
  },
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    colors: {
      primary: '#ee4d2d',
      secondary: '#F5F5F5',
      black: '#000000de',
      'green-custom': '#30b566',
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      gray: '#222222',
      'border-color': '#00000024',
      ...colors
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container-1040': {
          maxWidth: '1040px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        },
        '.container-1200': {
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        },
        '.text-basic': {
          fontSize: '13px',
          fontWeight: '300'
        },
        ".text-gray-primary": {
          fontSize: "14px",
          fontWeight: "400",
          color: '#555',
        }
      })
    })
  ],
  variants: {
    extend: {
      fontSize: ['hover', 'focus'],
      backgroundOpacity: ['active'],
      borderWidth: ['hover', 'focus'],
      colors: ['hover', 'focus']
    }
  }
}
