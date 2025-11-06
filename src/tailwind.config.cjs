/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        'primary': {
          DEFAULT: '#3a3a41',
          500: '#3a3a41',
        }, 
        'secondary': {
          DEFAULT: '#816797',
          500: '#816797',
        },
      }
    },
  },
  plugins: [],
};
