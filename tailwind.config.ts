import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#252B48',
        'custom-gray': '#445069',
        'custom-green': '#5B9A8B',
        'custom-yellow': '#F7E987',
      }
    },
  },
  plugins: [],
} satisfies Config;
