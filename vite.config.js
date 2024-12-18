import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'babylon-loaders': ['@babylonjs/loaders/glTF'],
          'core': ['@babylonjs/core'],
        },
      },
    },
  }
});
