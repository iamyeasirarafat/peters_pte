/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#F2B277",
      secondary: "#FFF4EB",
      tertiary: "#FFFAF6",
      blue: "#4399FF",
      cream: "#7DD8FF",
      white: "#FFFFFF",
      black: "#000000",
      gold: "#B57700",
      gray: "#616161",
      accent: "#949494",
    },
    fontFamily: {
      cabin: ["Cabin", "sans-serif"],
      avantt: ["Avantt", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
