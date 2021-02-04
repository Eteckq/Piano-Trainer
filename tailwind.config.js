const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    mode: 'layers',
    layers: ['base', 'components', 'utilities'],
    content: [
      './components/*.vue',
      './components/layouts/*.vue',
      './layouts/*.vue',
      './pages/*.vue',
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Euclid Circular B', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: '.60rem',
        '3xs': '0.40rem',
      },
      colors: {
        gray01: '#F4F7FA',
        gray02: '#D8DDE2',
        gray03: '#C7CDD2',
        gray04: '#AEBBC0',
        gray05: '#829298',
        gray06: '#3D4051',
        gray07: '#272A3A',
        gray08: '#161615',
      },
      borderWidth: {
        6: '6px',
        3: '3px',
        1: '1px',
      },
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  variants: {},
}
