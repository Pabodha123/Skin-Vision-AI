export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: '#FAF7F1',
        surface: '#FFFFFF',
        muted: '#7A6B5C',
        line: '#E9E1D5',
        ink: {
          400: '#8A7A6A',
          500: '#6B5B4B',
          600: '#4A3F34',
          700: '#3A3128',
          800: '#241E18',
          900: '#17130F',
        },
        gold: {
          50: '#FBF7EF',
          100: '#F5EBD8',
          200: '#EBDBBB',
          300: '#DCC48F',
          400: '#C9A667',
          500: '#B08B4F',
          600: '#93703A',
          700: '#6E532A',
        },
        coral: {
          50: '#FDF4F1',
          100: '#F9E7E1',
          200: '#F0D2C8',
          500: '#B4553F',
          700: '#8C3F2D',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(36, 30, 24, 0.04), 0 8px 24px -14px rgba(36, 30, 24, 0.10)',
        lift: '0 2px 4px rgba(36, 30, 24, 0.05), 0 18px 40px -20px rgba(36, 30, 24, 0.16)',
        sheet: '0 -8px 40px -12px rgba(36, 30, 24, 0.18)',
      },
      maxWidth: {
        page: '1180px',
      },
    },
  },
}
