import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
