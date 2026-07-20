/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#060A14",
          panel: "#0B1220",
          raised: "#101A2E",
        },
        cyan: {
          glow: "#22D3EE",
        },
        blue: {
          neon: "#3B82F6",
        },
        violet: {
          glow: "#8B5CF6",
        },
        danger: "#F43F5E",
        success: "#34D399",
        ink: {
          primary: "#E6EDF7",
          muted: "#7C8BA8",
          faint: "#4A5876",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 24px rgba(34, 211, 238, 0.35)",
        "glow-blue": "0 0 24px rgba(59, 130, 246, 0.35)",
        "glow-violet": "0 0 24px rgba(139, 92, 246, 0.35)",
        "glow-danger": "0 0 24px rgba(244, 63, 94, 0.35)",
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(12px, -14px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.55, filter: "blur(0px)" },
          "50%": { opacity: 1, filter: "blur(0.5px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        drift: "drift 9s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [],
};
