/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        mainColor: '#145887',
        secondColor: '#EC1B30',
        lightMain: '#29ACE2',
        rbgSecond: 'rgb(236, 27, 48, 0.5)',
        rbgMain: 'rgba(20, 88, 135, 0.5)',
        customDark: 'rgba(6, 15, 21, 0.7)',
        customDarkRed: 'rgba(94, 22, 29, 0.5)',
      },
      animation: {
        scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
    },
  },
  plugins: [
  ],
};
