/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aws: {
          orange: '#FF9900',
          'orange-dark': '#E68A00',
          'orange-light': '#FFB340',
          blue: '#232F3E',
          'blue-light': '#3D4D5E',
          teal: '#00A8A9',
          'teal-dark': '#007B7C',
          gray: '#F2F3F3',
          'gray-dark': '#6C757D',
          white: '#FFFFFF',
          black: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}