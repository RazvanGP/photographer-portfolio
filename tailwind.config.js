/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      primary: ["Oswald", "Oswald", "sans-serif"],
      hero: ["Arizonia", "cursive"],
    },
    extend: {
      backgroundImage: {
        hero: "url('../public/images/bg.png')",
      },
    },
    plugins: [],
  },
};
