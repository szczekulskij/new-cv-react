import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#e9e4d9',
        'bg-card': '#e0dbd0',
        text: '#1a1a1a',
        'text-muted': '#52524a',
        'text-light': '#6b6659',
        accent: '#4a5a3a',
        'accent-hover': '#3d4d2f',
        border: '#d4d0c8',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
