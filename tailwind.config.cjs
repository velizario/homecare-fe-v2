const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'order' : '1px 1px 15px -4px rgba(200,200,200,0.7)',
        'order-hover' : '2px 2px 20px -4px rgba(200,200,200,1)',
        'button-active' : '1px 2px 8px -2px rgba(200, 200, 200,0.8)'
      },
      maxWidth: {
        'chat' : "15rem",
        'chat-md' : "17rem"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  variants: {
    
  }
}