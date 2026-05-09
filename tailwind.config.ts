import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: "#C5A059",
        purple: {
          300: "#c4a5ff",
          400: "#a78bfa",
        },
      },
      fontFamily: {
        cormorant: ["Cormorant Display", "serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;