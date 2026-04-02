import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Outfit", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#e79916",
        "primary-hover": "#00357a",
      },
    },
  },
  plugins: [],
};

export default config;
