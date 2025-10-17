{import('tailwindcss').Config}
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',
        secondary: '#4B5563',
        accent: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
