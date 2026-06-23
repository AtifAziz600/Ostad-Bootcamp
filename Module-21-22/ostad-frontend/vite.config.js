import { defineConfig } from 'vite' // it helps vite to undstand about the type size config
import react from '@vitejs/plugin-react' // in here we are using this plugin with jsx fast refreash support

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    "@": "/src" // it helps to define path of the project
  },
  build: {
    outDir: "production"
  }
})
