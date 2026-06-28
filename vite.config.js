import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:11434',
        changeOrigin: true,
        // PENTING: Memaksa header Origin menjadi lokal agar Ollama tidak memblokir (403 Forbidden)
        headers: {
          'Origin': 'http://127.0.0.1:11434'
        },
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('[Vite Proxy Error]:', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('[Vite Proxy Request]:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('[Vite Proxy Response]:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  }
});
