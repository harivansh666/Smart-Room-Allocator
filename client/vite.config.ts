import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild', // safer minifier for React + TS
    rollupOptions: {
      output: {
        manualChunks: undefined, // avoid splitting small chunks that can break imports
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "axios"], // pre-bundle critical packages
  },
})
