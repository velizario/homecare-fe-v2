import { defineConfig, mergeConfig  } from 'vite'
import react from '@vitejs/plugin-react'
import {} from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  // Add for deployment to Github
  base: '/',
  plugins: [react()],
})
 
