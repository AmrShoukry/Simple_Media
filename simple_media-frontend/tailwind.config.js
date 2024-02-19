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
        pry: '#004E98'
      },
      fontSize: {
        12: '12px',
        13: '13px',
        14: '14px',
        16: '16px',
      },
      borderRadius: {
        10: '10px',
      }
    },
  },
  plugins: [],
}

