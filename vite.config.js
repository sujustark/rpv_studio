import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        service: resolve(import.meta.dirname, 'service.html'),
        gallery: resolve(import.meta.dirname, 'gallery.html'),
        video: resolve(import.meta.dirname, 'video.html'),
        contact: resolve(import.meta.dirname, 'contact.html')
      }
    }
  }
});
