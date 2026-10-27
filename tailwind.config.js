/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F9F5EC',
          200: '#F2EBDC',
          300: '#E8DCBF',
        },
        warm: {
          slate: '#2B303A',
          brown: '#5C4033',
          orange: '#FF7A45',
          gold: '#E5A93B',
          green: '#4E8752',
          blue: '#4A7FB0',
          coral: '#FF6F59',
          purple: '#7E68A8'
        }
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'Apple SD Gothic Neo',
          'Malgun Gothic',
          'sans-serif'
        ],
      },
      fontSize: {
        'senior-sm': '1.05rem',   // 17px
        'senior-base': '1.25rem', // 20px
        'senior-lg': '1.45rem',   // 23px
        'senior-xl': '1.75rem',   // 28px
        'senior-2xl': '2.15rem',  // 34px
      }
    },
  },
  plugins: [],
}
