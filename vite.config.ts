import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) {
              return 'lucide'
            }
            if (id.includes('recharts')) {
              return 'recharts'
            }
            if (id.includes('date-fns')) {
              return 'date-fns'
            }
            if (id.includes('@supabase')) {
              return 'supabase'
            }
            if (id.includes('@radix-ui')) {
              return 'radix'
            }
            if (
              id.includes('react-dom') ||
              id.includes('react/') ||
              id.includes('react-router')
            ) {
              return 'react'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
