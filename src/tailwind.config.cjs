/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Definimos tu paleta oficial para usar 'bg-dark-deep' o 'text-accent'
        dark: {
          deep: '#1A1B22',   // El fondo principal
          card: '#2D2F39',   // El fondo de las tarjetas
          border: '#373943', // El color de los bordes
        },
        accent: {
          DEFAULT: '#DE8676', // Mi salmón desaturado
          soft: 'rgba(222, 134, 118, 0.1)', // Para fondos con transparencia
        }
      },
      animation: {
        // Agregamos la animación que mencionamos para el Hero
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        // Un gradiente predefinido para usar en el Hero
        'radial-glow': 'radial-gradient(circle, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
