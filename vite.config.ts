import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {} from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/homecare-fe-v2/"
})
