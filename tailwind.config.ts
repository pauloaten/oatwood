import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './posts/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        bark:  '#2C1A0E',
        oak:   '#6B3F1F',
        grain: '#A0622A',
        flax:  '#E8D5B0',
        cream: '#F7F0E3',
        parchment: '#FDFAF5',
        sage:  '#7A8C6E',
        char:  '#1A1008',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-lora)',      'Georgia', 'serif'],
        ui:      ['var(--font-dm-sans)',   'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%':      { transform: 'translateX(-50%) translateY(6px)' },
        },
      },
      animation: {
        'fade-in-up':   'fadeInUp 0.6s ease both',
        'fade-in-up-1': 'fadeInUp 0.6s 0.1s ease both',
        'fade-in-up-2': 'fadeInUp 0.6s 0.2s ease both',
        'fade-in-up-3': 'fadeInUp 0.6s 0.3s ease both',
        'bob':          'bob 2s ease-in-out infinite',
      },
      typography: {
        woodcraft: {
          css: {
            '--tw-prose-body':        '#2C1A0E',
            '--tw-prose-headings':    '#2C1A0E',
            '--tw-prose-links':       '#A0622A',
            '--tw-prose-bold':        '#2C1A0E',
            '--tw-prose-quotes':      '#6B3F1F',
            '--tw-prose-quote-borders': '#A0622A',
            '--tw-prose-code':        '#2C1A0E',
            '--tw-prose-pre-bg':      '#2C1A0E',
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontSize:   '1.0625rem',
            lineHeight: '1.75',
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-playfair), Georgia, serif',
            },
            blockquote: {
              borderLeftColor: '#A0622A',
              background:      '#E8D5B0',
              borderRadius:    '0 6px 6px 0',
              padding:         '1rem 1.5rem',
              fontStyle:       'italic',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
