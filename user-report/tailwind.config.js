/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        proxima: ['"Proxima Nova"', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        'ppl': '#262C40',
        'lp': '#8189A3',
        'sp': '#432EAB'
      },
    },
  },
  plugins: [],
}

