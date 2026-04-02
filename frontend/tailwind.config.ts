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
        primary: "#32B2A4",
        "primary-hover": "#289287",
      },
    },
  },
  plugins: [],
};

export default config;
