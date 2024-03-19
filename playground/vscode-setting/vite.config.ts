import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { i18n } from 'vite-plugin-i18n-ally'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    i18n({
      root: __dirname,
    }),
  ],
})
