/*
  vite.config.js - Vite Build Tool Configuration

  This configuration file sets up Vite to work with React by including
  the official React plugin. Vite is used as the development server and bundler,
  providing fast builds and hot module replacement during development.

  The defineConfig function helps with IDE support and type checking.
  The React plugin enables JSX and React Fast Refresh features seamlessly.
*/
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
