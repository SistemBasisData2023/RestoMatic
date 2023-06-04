/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          60: '#FAFAFA',
          80: '#D9D9D9',
          90: '#8D8D8D',
          100: '#526D82',
          120: '#27374D',
        },
        dark: {
          60: '#B3BFCB',
          80: '#6A798A',
          90: '#46505D',
          100: '#292D32',
          120: '#151719',
        },
        peach: {
          60: '#FCE2CF',
          80: '#F6BA8D',
          90: '#EA985B',
          100: '#D47F40',
          120: '#A4602D',
        },
        light: {
          60: '#D5DEE7',
          80: '#EFF2F5',
          100: '#FFFFFF',
        },
        success: {
          80: '#BCEBE0',
          100: '#28B996',
          120: '#276D5C',
        },
        error: {
          80: '#FAD6D6',
          100: '#E47070',
          120: '#B13E3E',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
