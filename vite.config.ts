import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/** Dev middleware: forward POST /api/callback to Google Apps Script (avoids proxy POST issues) */
function callbackFormMiddleware(googleScriptUrl) {
  return {
    name: 'callback-form-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/api/callback' || req.method !== 'POST') {
          next();
          return;
        }
        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', async () => {
          try {
            const body = Buffer.concat(chunks).toString('utf8');
            const forward = await fetch(googleScriptUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: body || '{}',
            });
            const text = await forward.text();
            res.statusCode = forward.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(text);
          } catch (e) {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: e.message || 'Proxy error' }));
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, path.resolve(__dirname), '');
    const googleScriptUrl = (env.VITE_GOOGLE_SCRIPT_URL || '').trim();
    const plugins = [react()];
    if (googleScriptUrl) {
      try {
        new URL(googleScriptUrl);
        plugins.unshift(callbackFormMiddleware(googleScriptUrl));
      } catch {
        // invalid URL, skip
      }
    }
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins,
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
