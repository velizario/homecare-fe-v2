const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // fontFamily: {
    //   display: ['Source Serif Pro', 'Georgia', 'serif'],
    //   body: ['Synonym', 'system-ui', 'sans-serif'],
    // },
    // colors: {
    //   primary: {
    //     50: '#f8fafc',
    //     100: '#f1f5f9',
    //     200: '#e2e8f0',
    //     300: '#cbd5e1',
    //     400: '#94a3b8',
    //     500: '#64748b',
    //     600: '#475569',
    //     700: '#334155',
    //     800: '#1e293b',
    //     900: '#0f172a',
    //   },
    //   secondary: {
    //     50: '#ecfdf5',
    //     100: '#d1fae5',
    //     200: '#a7f3d0',
    //     300: '#6ee7b7',
    //     400: '#34d399',
    //     500: '#10b981',
    //     600: '#059669',
    //     700: '#047857',
    //     800: '#065f46',
    //     900: '#064e3b',
    //   },
    // },
    extend: {
      fontFamily: {
        sans: [
          // "Apple Color Emoji",
          // "Android Emoji",
          // "EmojiOne Color",
          // "Segoe UI Symbol",
          // "Twemoji Mozilla",
          "Inter var",
          "Noto Color Emoji",
          "Segoe UI Emoji",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      boxShadow: {
        order: "1px 1px 15px -4px rgba(200,200,200,0.7)",
        "order-hover": "2px 2px 20px -4px rgba(200,200,200,1)",
        "button-active": "1px 2px 8px -2px rgba(200, 200, 200,0.8)",
      },
      maxWidth: {
        chat: "15rem",
        "chat-md": "17rem",
      },
      height: {
        "screen-fixed": "100dvh",
      },
      lineClamp: {
        none: "display: flex"
      }
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
  variants: {},
};
