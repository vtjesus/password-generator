/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        JetMonoVar: ["JetMonoVar", "sans-serif"],
        JetMonoItal: ["JetMonoItal", "sans-serif"],
      }
    },
  },
  plugins: [],
}

