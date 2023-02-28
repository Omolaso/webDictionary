/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      purple: "#9750DD",
      grey: "#6E6E6E",
      red: "#EF1313",
      green: "#5BED44",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Merriweather", "serif"],
      mono: ["Cursive", "monospace"],
    },
    extend: {},
  },
  plugins: [],
};
