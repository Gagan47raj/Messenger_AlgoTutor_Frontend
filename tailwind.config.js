/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0a0a',
          black: '#111111',
          gray: '#1a1a1a',
          blue: '#00d4ff',
          purple: '#9d4edd',
          pink: '#ff006e',
          yellow: '#ffbe0b',
          green: '#8ecae6',
          red: '#f72585'
        },
        neon: {
          blue: '#00f5ff',
          purple: '#bf40bf',
          pink: '#ff1493',
          green: '#39ff14',
          yellow: '#dfff00',
          red: '#ff073a'
        }
      },
      fontFamily: {
        cyber: ['Orbitron', 'monospace'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'scan': 'scan 2s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
        'cyber-blink': 'cyber-blink 1s step-end infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'zoom-in': 'zoom-in 0.2s ease-out',
        'cyber-pulse': 'cyber-pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { 
            boxShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 15px #00f5ff',
            textShadow: '0 0 5px #00f5ff'
          },
          '100%': { 
            boxShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff',
            textShadow: '0 0 10px #00f5ff'
          }
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'matrix': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'cyber-blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0.3' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'cyber-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff, inset 0 0 5px #00f5ff',
            borderColor: '#00f5ff'
          },
          '50%': { 
            boxShadow: '0 0 20px #00f5ff, 0 0 30px #00f5ff, inset 0 0 10px #00f5ff',
            borderColor: '#bf40bf'
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
