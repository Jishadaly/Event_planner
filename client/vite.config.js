import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// DO NOT import @tailwindcss/vite - remove it!
export default defineConfig({
  plugins: [react()], // Only React plugin
})