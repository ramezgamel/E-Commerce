/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container:{
      center: true
    },
    extend: {
      colors: {
        main: "var(--color-main)",
        sec: "var(--color-sec)",
        clicked: "var(--color-clicked)",
        back: "var(--color-bg)",
        content: "var(--color-content)",
      },
    },
  },
  plugins: [],
};
