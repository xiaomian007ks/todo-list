/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        background: '#FAF9F6',
        surface: '#FFFFFF',
        'text-primary': '#2D3436',
        'text-secondary': '#636E72',
        'priority-high': '#FF6B6B',
        'priority-medium': '#FFE66D',
        'priority-low': '#4ECDC4',
        'status-pending': '#DFE6E9',
        'status-progress': '#74B9FF',
        'status-completed': '#55EFC4',
      },
      fontFamily: {
        'display': ['Nunito', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0,0,0,0.05)',
        'md': '0 4px 12px rgba(0,0,0,0.08)',
        'lg': '0 8px 24px rgba(0,0,0,0.12)',
        'hover': '0 8px 32px rgba(255,107,107,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-highlight': 'pulseHighlight 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseHighlight: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,107,107,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(255,107,107,0)' },
        },
      },
    },
  },
  plugins: [],
}
