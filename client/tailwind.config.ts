import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        mono: ['Roboto Mono', 'monospace'],
        'space-mono':['Space Mono','monospace']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        customBlue: '#050A44',
        customBlack:'#141619',
        customPurple: 'hsl(261deg 80% 48%)',

        
      }
    },
    
  },
  plugins: [],
};
export default config;
