import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#090b0f",
        panel: "#11141a",
        panel2: "#151920",
        line: "#262b33",
        acid: "#c7ff00",
        muted: "#9299a4",
      },
      boxShadow: {
        acid: "0 0 0 1px rgba(199,255,0,.18), 0 12px 42px rgba(0,0,0,.34)",
      },
      letterSpacing: {
        wider2: ".14em",
      },
    },
  },
  plugins: [],
};

export default config;
