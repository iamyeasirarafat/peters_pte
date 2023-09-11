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
        lightGray: "#ABABAB",
        accent: "#949494",
        red: "#FF0000",
        yellowGreen: "#849C3E",
      },
      fontFamily: {
        cabin: ["Cabin", "sans-serif"],
        avantt: ["Avantt", "sans-serif"],
      },
      screens: {
        xs: "320px",
        // => @media (min-width: 320px) { ... }

        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
