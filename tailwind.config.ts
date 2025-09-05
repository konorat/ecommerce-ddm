import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // importante: incluir ./src/
  theme: {
    extend: {
      colors: {
        rosaPadaria: "#b8375d", // nome que você escolhe para a cor
      },
    },
  },
  plugins: [],
};

export default config;
