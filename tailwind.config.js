/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: "#FFFFFF",
          50: "#F1F1F1",
        },
        black: {
          DEFAULT: "#000000",
          50: "#1D1616",
        },
        primary: {
          DEFAULT: "#D3CA79",
        },
        secondary: {
          DEFAULT: "#BF9264",
        },
      },
    },
  },
  plugins: [],
};
