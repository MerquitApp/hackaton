/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        creepster: ['Creepster', 'cursive'],
        nosifer: ['Nosifer', 'cursive'],
        unifraktur: ['UnifrakturMaguntia', 'cursive'],
      },
      backgroundImage: {
        'hero-pattern': "url('./media/background-image.webp')",
        'footer-texture': "url('./media/background-image.webp')",
      }
    }
  },
  plugins: []
};

