/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

