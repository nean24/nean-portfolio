import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        glass: {
          light: "rgba(255,255,255,0.6)",
          dark: "rgba(17,17,17,0.5)"
        }
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0,0,0,0.1)"
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};
export default config;