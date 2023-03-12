module.exports = {
  content: [
    // ...
  ],
  theme: {
    fontFamily: {
      sans: ['Nunito'],
    },
    extend: {
      scale: {
        60: '0.60',
        65: '0.65',
        70: '0.70',
      },
      spacing: {
        '128': '29rem',
      },
      fontSize: {
        xxs: [
          '0.6rem',
          {
            lineHeight: '0.5rem',
          },
        ],
      },
      colors: {
        foreground: {
          DEFAULT: '#ffffff',
          light: '#ffffff',
          dark: '#000000',
        },
        background: '#ffffff',
        primary: {
          100: '#ABD1E4',
          200: '#2497e0',
          250: '#78BDEA',
          600: '#54bbcb',
          650: '#58B1BF',
          800: '#1d2f6f',
          850: '#2A4CC3',
        },
        secondary: {
          200: '#f2f2f2',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
