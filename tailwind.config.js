/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        mainBlue: "#28B9B5",
        midColor: "#f7f7f7",
        borderColor: "#e7e7e7",
      },
      fontFamily: {
        poppins: "Open sans",
      },
    },
  },
  plugins: [],
};
