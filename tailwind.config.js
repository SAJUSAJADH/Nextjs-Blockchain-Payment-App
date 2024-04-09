/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      lexend: 'Lexend'
    },
    screens:{
      sm: '480px',
      md: '500px',
      lg: '1340px',
      xl: '1440px'
    },
  },
  plugins: [],
}
