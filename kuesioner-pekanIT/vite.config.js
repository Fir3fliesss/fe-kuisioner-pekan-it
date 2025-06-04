import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        kuesioner: resolve(__dirname, 'kuesioner.html'),
        antrian: resolve(__dirname, 'antrian.html')
      }
    }
  },
  plugins: [],
  server: {
    hmr: {
      overlay: false
    }
  }
});
