/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          'light': '#f9f9f9',
          'dark': '#1a1a1d'
        },
        'secondary': {
          'light': '#bdbec7',
          'dark': '#434552'
        },
      },
    },
  },
  plugins: [],
}
