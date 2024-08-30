/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  theme: {
    screens: {
        sm: '600px',
        md: '728px',
        lg: '980px',
        xl: '980px',
        '2xl': '980px',
      },
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        text: '#e2fbf5',
        background: '#031411',
        card: '#0f1a20',
        primary: '#7aebd8',
        secondary: '#164e95',
        accent: '#4060e3',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      fontSize: {
        'sm': '8px',
        'md': '14px',
        'lg': '22px',
        'xl': '26px',
        '2xl': '38px',
      },
    },
  },
  plugins: [],
}
