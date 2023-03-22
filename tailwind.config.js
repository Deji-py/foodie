/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
    },
    extend: {
      boxShadow: {
        medium:
          "-10px -10px 30px -15px rgba(0, 0, 0, 0.1), 10px 10px 30px -15px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        primary: "#8000a7",
        secondary: "#ef233c",
      },
      fontFamily: {
        medium: "'Poppins', sans-serif",
      },
    },
  },
  plugins: [],
};
