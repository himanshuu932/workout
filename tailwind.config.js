// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        'semicircle-path-large': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-40px) translateX(40px) rotate(90deg)' },
          '50%': { transform: 'translateY(0px) translateX(80px) rotate(180deg)' },
          '75%': { transform: 'translateY(40px) translateX(40px) rotate(270deg)' },
        },
      },
      animation: {
        'semicircle-path-large': 'semicircle-path-large 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}