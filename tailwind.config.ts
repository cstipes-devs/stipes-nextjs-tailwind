/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          500: "#00e0a4",
          600: "#00c48f",
        }
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(0,0,0,0.25)"
      }
    },
  },
  plugins: [],
}
