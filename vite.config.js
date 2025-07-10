import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./assets/scss/main.scss";`
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
