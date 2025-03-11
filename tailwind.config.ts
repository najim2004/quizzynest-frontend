import type { Config } from "tailwindcss";
const config: Config = {
  theme: {
    extend: {
      fontFamily: {
          poppins: ["var(--font-poppins)", "sans-serif"],
      },
      fontSize: {
        "display-lg": [
          "3.75rem",
          { lineHeight: "1.2", letterSpacing: "-0.02em" },
        ], // 60px
        display: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }], // 48px
        h1: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }], // 40px
        h2: ["2rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }], // 32px
        h3: ["1.5rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }], // 24px
        h4: ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }], // 20px
        "body-lg": ["1.125rem", { lineHeight: "1.5" }], // 18px
        body: ["1rem", { lineHeight: "1.5" }], // 16px
        "body-sm": ["0.875rem", { lineHeight: "1.5" }], // 14px
        caption: ["0.75rem", { lineHeight: "1.5" }], // 12px
      },
    },
  },
};

export default config;
