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
        'sidebar-color': '#222222',
        'select-color': '#76b9ed',
        'star-color': '#e0a8b3',
        'home-color': '#84b09d',
        'submenu-selected-color': '#2d2d2d'
      },
    },
  },
  plugins: [],
}
