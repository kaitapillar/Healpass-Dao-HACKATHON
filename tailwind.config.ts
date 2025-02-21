/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Ensure this includes page.tsx and layout.tsx
  ],
  theme: {
    screens: {
      xs: "510px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
        sansMono: ["Noto Sans Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-to-b": "linear-gradient(to bottom, transparent, #000/90%)",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        chromePulse: "chromePulse 2s ease-in-out infinite",
        liquidMetal: "liquidMetal 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;