/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}', // Asegúrate de incluir las rutas correctas
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"], // Cambia a "light" o a otro tema que prefieras
  },
}
