import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base — fond clair
        obsidian: "#f7f5f0",
        "obsidian-light": "#efefea",
        "obsidian-muted": "#e5e2db",
        // Texte principal
        cream: "#1a1a1a",
        "cream-muted": "#4a4a4a",
        // Accent vert forêt (remplace gold)
        gold: "#2c4a3e",
        "gold-light": "#4a7c68",
        "gold-dark": "#1a2e26",
        // Pierre claire
        stone: "#ebe8e0",
        "stone-light": "#d6d1c7",
        muted: "#7a7a72",
        // Vert sauge pour accents subtils
        sage: "#8aaf9f",
        // Footer / sections sombres
        forest: "#1e3530",
        "forest-light": "#2c4a3e",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "fluid-xl": "clamp(3rem, 8vw, 7rem)",
        "fluid-lg": "clamp(2rem, 5vw, 4rem)",
        "fluid-md": "clamp(1.25rem, 3vw, 2rem)",
      },
      spacing: {
        "section": "8rem",
        "section-sm": "5rem",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-grow": "lineGrow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        lineGrow: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
