import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Habilita soporte para variables globales como "describe" y "it"
    environment: "jsdom", // Configura el entorno para pruebas de React
    setupFiles: "./vitest.setup.js" // Archivo para configuraciones adicionales
  }
})
