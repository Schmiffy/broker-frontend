import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // The base path should be the root for S3 deployments.
  base: '/', 
  plugins: [react()],
})
