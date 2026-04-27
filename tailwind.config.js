/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        sun: {
          DEFAULT: "#b35535",
          50: "#fdf5f1",
          100: "#fbe7dd",
          200: "#f5c8b3",
          300: "#eea585",
          400: "#d97a55",
          500: "#b35535",
          600: "#9a4429",
          700: "#7c3622",
          800: "#5e2a1c",
          900: "#3f1d14",
        },
        earth: {
          DEFAULT: "#453526",
          50: "#f6f2ed",
          100: "#e7ddd1",
          200: "#c8b69b",
          300: "#a08566",
          400: "#735840",
          500: "#453526",
          600: "#3a2c1f",
          700: "#2d2118",
          800: "#1f1610",
          900: "#120c08",
        },
        canvas: {
          DEFAULT: "#faf1e8",
          deep: "#f3e6d6",
        },
        zap: {
          DEFAULT: "#73bcbc",
          light: "#a4d3d3",
          dark: "#4d9a9a",
        },
        electric: {
          DEFAULT: "#edd45e",
          light: "#f5e394",
          dark: "#c9b145",
        },
        border: "rgba(69, 53, 38, 0.12)",
        input: "rgba(69, 53, 38, 0.16)",
        ring: "#b35535",
        background: "#faf1e8",
        foreground: "#453526",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Manrope"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 6vw + 1rem, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4vw + 0.5rem, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 2.5vw + 0.5rem, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(69,53,38,0.04), 0 8px 24px -12px rgba(69,53,38,0.12)",
        lift: "0 10px 15px -3px rgba(69,53,38,0.08), 0 20px 40px -20px rgba(69,53,38,0.18)",
        glow: "0 0 0 1px rgba(179,85,53,0.18), 0 20px 40px -20px rgba(179,85,53,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "marquee": "marquee 40s linear infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
