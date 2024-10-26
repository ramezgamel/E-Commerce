/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container:{
        center:true,
        xs:"620px"
      },
      screens:{
        'xs':"321px"
      },
      colors: {
        main: "var(--color-main)",
        sec: "var(--color-sec)",
        clicked: "var(--color-clicked)",
        back: "var(--color-back)",
        content: "var(--color-content)",
      },
    },
  },
  plugins: [
  ],
};
