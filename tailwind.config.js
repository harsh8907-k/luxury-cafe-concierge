/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F5F0',
        surface: '#FFFFFF', 
        borderLight: '#E5E0D8',
        textMain: '#2B2B2B',   
        textMuted: '#6B6B6B',
        primary: '#C9A962',    
        primaryHover: '#B69752',
        accent: '#8B2635',
        accentHover: '#6E1F2B'
      },
      fontFamily: {
        sans: ['"Crimson Pro"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.4)',
        'medium': '0 12px 40px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-soft': 'bounceSoft 1.4s infinite ease-in-out both',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        bounceSoft: {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: 0.5 },
          '40%': { transform: 'scale(1)', opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
