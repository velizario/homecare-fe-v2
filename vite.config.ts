import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {} from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  // Add for deployment to Github
  base: '/homecare-fe-v2/',
  plugins: [react()],
})
 