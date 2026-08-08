/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#F6F7F9",
          100: "#ECEEF2",
          200: "#D7DBE3",
          300: "#B4BAC8",
          400: "#8891A3",
          500: "#636D82",
          600: "#4A5268",
          700: "#363C4E",
          800: "#20232E",
          900: "#14161D",
          950: "#0B0C11",
        },
        cobalt: {
          50: "#EEF1FF",
          100: "#DCE1FF",
          200: "#B9C4FF",
          300: "#8E9EFF",
          400: "#6577F8",
          500: "#3B4EEE",
          600: "#2C3AD1",
          700: "#232EA6",
          800: "#1C2582",
          900: "#171F67",
        },
        amber: {
          400: "#F5A623",
          500: "#E8940F",
        },
        signal: {
          green: "#1FAA6D",
          red: "#E5484D",
          amber: "#F5A623",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20, 22, 29, 0.04), 0 4px 16px rgba(20, 22, 29, 0.06)",
        card: "0 1px 3px rgba(20, 22, 29, 0.06), 0 8px 24px -4px rgba(20, 22, 29, 0.08)",
        pop: "0 12px 32px -8px rgba(59, 78, 238, 0.25)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0, transform: "translateY(4px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        slideIn: { "0%": { opacity: 0, transform: "translateX(-8px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-out",
        slideIn: "slideIn 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
