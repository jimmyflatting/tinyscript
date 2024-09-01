const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}'
  ],
  theme: {
    screens: {
      sm: '600px',
      md: '728px',
      lg: '980px',
      xl: '980px',
      '2xl': '980px'
    },
    extend: {
      container: {
        center: true,
        padding: '2rem'
      },
      colors: {
        text: '#e2fbf5',
        background: '#031411',
        card: '#18181b',
        primary: '#7aebd8',
        secondary: '#164e95',
        accent: '#4060e3'
      },
      borderRadius: {
        DEFAULT: '0.5rem'
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '22px',
        xl: '26px',
        '2xl': '38px'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
