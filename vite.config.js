import { defineConfig } from 'vite';
import inferno from 'vite-plugin-inferno';

export default defineConfig({
  server: {
    sourcemap: false,
    port: 5500
  },
  build: {
    sourcemap: false,
    outDir: 'dist'
  },
  plugins: [
    inferno()
  ],
  resolve: {
    alias: {
      'inferno': 'inferno/dist/index.esm.js'
    }
  }
});
