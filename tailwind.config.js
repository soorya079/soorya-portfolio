/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: '#111118',
        'surface-raised': '#1a1a24',
        'surface-border': '#2a2a3a',
        'text-primary': '#f0f0f5',
        'text-secondary': '#8888aa',
        'text-muted': '#555568',
        accent: '#00d4ff',
        'accent-dim': '#00d4ff33',
        'accent-purple': '#7c3aed',
        warning: '#f59e0b',
        error: '#ef4444',
        success: '#10b981',
        'node-aws': '#ff9900',
        'node-docker': '#2496ed',
        'node-python': '#3776ab',
        'node-network': '#10b981',
        'node-github': '#f0f0f5',
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'type': 'type 0.05s steps(1) forwards',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 10px #00d4ff33, 0 0 20px #00d4ff22' },
          'to': { boxShadow: '0 0 20px #00d4ff66, 0 0 40px #00d4ff33' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)`,
        'radial-accent': 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}
