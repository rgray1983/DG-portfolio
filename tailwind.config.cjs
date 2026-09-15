/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './js/*.js'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#080808',
        panel: '#111111',
        soft: '#d8d4c9',
        muted: '#8f8f8f',
        line: '#252525',
        accent: '#f04b23',
        amerinavy: '#061a44',
        amerired: '#c90d18'
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
        display: ['Arial Black', 'Arial', 'Helvetica', 'sans-serif']
      }
    }
  }
};
