/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "appBackgroundColor":"#0D1117",
        "columnBackgroundColor":"#151A22",
      }
    },
  },
  plugins: [],
}
