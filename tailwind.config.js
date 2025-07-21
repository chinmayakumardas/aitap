// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // optional if your code is in /src
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
}
