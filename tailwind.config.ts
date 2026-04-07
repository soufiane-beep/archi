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
        // Fonds
        bg: "#f9f7f4",
        "bg-alt": "#f1ede6",
        "bg-card": "#eae6de",
        // Texte
        ink: "#141414",
        "ink-mid": "#4a4a46",
        "ink-muted": "#8c8c84",
        // Accent vert forêt
        accent: "#253d32",
        "accent-warm": "#3a5e4e",
        // Règles décoratives
        rule: "#d8d3c8",
        // Noir éditorial (footer)
        editorial: "#141414",
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
