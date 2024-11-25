/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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
        dark: {
          background: '#0F172A',    // 더 진한 네이비 색상으로 변경
          primary: '#1E293B',       // 카드 배경색
          secondary: '#334155',     // 더 밝은 요소들
          card: '#1E293B',
          text: {
            primary: '#F8FAFC',     // 더 밝은 흰색
            secondary: '#94A3B8'    // 회색빛 텍스트
          },
          border: '#2D3748',
          hover: '#2D3748'
        }
      }
    },
  },
  plugins: [],
}