import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        accent: {
          primary: 'rgba(var(--color-primary) / <alpha-value>)',
          primary95: 'rgba(var(--color-primary95) / <alpha-value>)',
          secondary: 'rgba(var(--color-secondary) / <alpha-value>)',
          ternary: 'rgba(var(--color-ternary) / <alpha-value>)',
        },
        bgk: 'rgba(var(--color-bgk) / <alpha-value>)',
        bgl: 'rgba(var(--color-bgl) / <alpha-value>)',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
