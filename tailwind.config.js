// tailwind.config.js 업데이트
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#6B7280",
        success: "#059669",
        warning: "#D97706",
        danger: "#DC2626",
      },
      backgroundColor: {
        dark: {
          primary: '#1a1a1a',
          secondary: '#2d2d2d',
          card: '#363636',
        },
      },
      textColor: {
        dark: {
          primary: '#ffffff',
          secondary: '#a3a3a3',
        },
      },
    },
  },
  plugins: [],
}

