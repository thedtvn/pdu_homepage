import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      allowedHosts: true,
      proxy: {
          '/api/': 'http://localhost:3000',
          '/cdn/': 'http://localhost:3000'
      }
  }
})
