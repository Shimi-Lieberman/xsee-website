/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        premium: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "#FF1B8D",
          dark: "#D4006E",
          mid: "#FF4BA6",
          light: "#FF80C2",
        },
        dark: {
          DEFAULT: "#050d1a",
          card: "#0a1628",
        },
      },
    },
  },
  plugins: [],
};
