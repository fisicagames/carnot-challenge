import { defineConfig } from 'vite';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  build: {
    minify: 'terser', // Usa Terser para minificação avançada
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log
        drop_debugger: true, // Remove debugger
        passes: 3, // Aplica múltiplas otimizações
      },
      mangle: {
        properties: true, // Renomeia propriedades privadas
        toplevel: true, // Minifica variáveis globais
      },
      format: {
        comments: false, // Remove comentários
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'babylon-loaders': ['@babylonjs/loaders/glTF'],
          'core': ['@babylonjs/core'],
        },
      },
      plugins: [terser()],
    },
  },
  server: {
    compress: true, // Habilita Gzip para servir arquivos menores
  },
});
