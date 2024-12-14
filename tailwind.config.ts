import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        
        'blue-dark': '#35627A',
        'blue-darker': '#203F50',
        'blue-darkest': '#0D1F29',
        'light-gray': '#F7F7F7',
        'light-gray-blue': '#DFE3E5',
        "blackOpacity5": "#0000000D"
      },
      fontFamily: {
        libre: ['"Libre Caslon Text"', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
