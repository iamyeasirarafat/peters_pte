/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        red: "#FF0000",
        yellow_green: "#849C3E",
      },
      fontFamily: {
        cabin: ["Cabin", "sans-serif"],
        avantt: ["Avantt", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
