import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import fs from 'fs'
import path from 'path'

function saveJsonPlugin() {
  return {
    name: 'save-json-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-blacklist', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const filePath = path.resolve(process.cwd(), 'src/data/blacklist.json');
              fs.writeFileSync(filePath, body, 'utf-8');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              console.error(err);
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), saveJsonPlugin()],
  base: '/oukenidosdelperu/',
})
