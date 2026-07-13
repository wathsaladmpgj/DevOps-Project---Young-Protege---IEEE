import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#07111f',
        surface: '#0f1d33',
        accent: '#6ee7ff',
        accentStrong: '#22d3ee',
        success: '#34d399',
        warning: '#fbbf24',
        danger: '#fb7185'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(110, 231, 255, 0.14), 0 24px 80px rgba(15, 23, 42, 0.45)'
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)']
      }
    }
  },
  plugins: []
};

export default config;