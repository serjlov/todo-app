/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.js"],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "checked-img": "url('./public/images/checked.png')",
        "uncheked-img": "url('/images/unchecked.png')",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
