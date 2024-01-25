
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  safelist: ["dark"],
  content: [
    './components/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
	],

  plugins: [require("@tailwindcss/typography"),     require('tailwindcss-animated'),  require("daisyui")],

}
