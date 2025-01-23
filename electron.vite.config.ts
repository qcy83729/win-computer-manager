import { resolve, join } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          index: join(__dirname, 'src/renderer/index.html'),
          net: join(__dirname, 'src/renderer/net.html')
        }
      }
    },
    resolve: {
      alias: {
        '@main': resolve('src/renderer/main'),
        '@net': resolve('src/renderer/net')
      }
    },
    plugins: [react()]
  }
})
