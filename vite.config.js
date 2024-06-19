import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  server: {
    port: 5500
  },
  build: {
    sourcemap: false,
    outDir: './dist',
    //assetsDir: './assets',
  },
  plugins: [solid()],
  base: '/PokeGen/'
})
