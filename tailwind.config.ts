import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        monad: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        seguro: {
          health: '#10B981', // Verde salud
          weather: '#3B82F6', // Azul clima
          security: '#EF4444', // Rojo seguridad
          mobility: '#F59E0B', // Amarillo movilidad
        },
        mexican: {
          green: '#006341',
          white: '#FFFFFF',
          red: '#C8102E',
        }
      },
      backgroundImage: {
        'aztec-pattern': "url('/images/aztec-pattern.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      fontFamily: {
        'mexican': ['Cinzel', 'serif'],
        'modern': ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
  // Optimizaciones para hidratación
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Configuración para mejorar el rendimiento
  corePlugins: {
    preflight: true,
  }
}
export default config
