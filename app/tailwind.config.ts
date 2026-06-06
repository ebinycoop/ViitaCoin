import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Core design color definitions for the wealth security dashboard layout
        sovereign: {
          50: "#f4f7f6",
          100: "#e5ecea",
          500: "#1b4332", // Deep premium green representing locked asset vaults
          900: "#081c15",
        },
      },
    },
  },
  plugins: [],
};

export default config;
