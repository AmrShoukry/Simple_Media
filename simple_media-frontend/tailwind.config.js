/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey1: '#D7D7D7',
        grey2: '#7C7B7B',
        grey3: '#fafafa',
        pry: '#00658B',
        black1: '#151722',
        textPry: '#f4f6f9',
        grey4: '#F7F7F7',
        grey5: '#E0E0E0',
      },
      fontSize: {
        12: '12px',
        13: '13px',
        14: '14px',
        16: '16px',
        18: '18px'
      },
      borderRadius: {
        10: '10px',
      },
      spacing: {
        280: '280px',
        topNav: 'calc(100% - 280px)',
        70: '70px',
        rem: 'calc(100% - 300px)',
        300: '300px',
        500: '520px',
      }
    },
  },
  plugins: [],
}

