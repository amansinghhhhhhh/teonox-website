import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2022',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lucide-react')) {
                return 'icons';
              }
              if (/[\\/]motion/.test(id) || id.includes('framer-motion') || id.includes('popmotion')) {
                return 'motion';
              }
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'react-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Same-origin media proxy for ACF image attachment IDs. During `npm run
      // dev` (standalone Vite) any `/api/media/:id` request is forwarded to the
      // WordPress media REST API on the server side, so the browser never makes
      // a cross-origin request to cms.teonox.com (no CORS errors). When the app
      // runs through server.ts (Express + Vite middleware), the Express
      // `/api/media/:id` route handles the same requests first.
      proxy: {
        '/api/media': {
          target: 'https://cms.teonox.com',
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(
              /^\/api\/media\/(\d+)$/,
              '/index.php?rest_route=/wp/v2/media/$1&_fields=source_url',
            ),
        },
      },
    },
  };
});
