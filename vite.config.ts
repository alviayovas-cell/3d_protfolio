import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { contentPlugin } from './scripts/content-plugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [contentPlugin(), react(), tailwindcss()],
})
