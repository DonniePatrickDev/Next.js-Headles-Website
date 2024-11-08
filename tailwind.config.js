module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  darkMode: 'media',
  theme: {
    fontFamily: {
      sans: ['Jost', 'sans-serif'],
    },
    fontSize: {
      sm: ['12px', '16px'],
      base: ['14px', '22px'],
      lg: ['16px', '24px'],
      xl: ['18px', '28px'],
      '2xl': ['28px', '34px'],
      '3xl': ['30px', '38px'],
      '4xl': ['40px', '56px'],
      '5xl': ['55px', '70px'],
      '6xl': ['64px', '80px'],
    },
    colors: {
      'gray-100': '#F6F7F8',
      'gray-200': '#F3F1F6',
      'gray-300': '#E8EAEB',
      'gray-400': '#BCBDC2',
      gray: '#4C4D5C',
      'gray-dark': '#222222',
      dark: '#152030',
      'purple-dark': '#321898',
      purple: '#582BCF',
      'purple-light': '#E2E4F5',
      'pink-100': '#E1DCEE',
      'pink-200': '#B678EC',
      pink: '#582BCF',
      red: '#FF4F52',
      'red-dark': '#DD4F52',
      'blue-dark': '#1C0A62',
      blue: '#4267B2',
      sky: '#1DA1F2',
      white: '#FFFFFF',
      black: '#000839',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        xl: '4rem',
        '2xl': '11rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
      },
      boxShadow: {
        sm: '0px 3.56511px 40px rgba(60, 70, 85, 0.13);',
        md: '0px 3.40616px 60px rgba(32, 30, 115, 0.15);',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tw-elements/dist/plugin'),
  ],
}
