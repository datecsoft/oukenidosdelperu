import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'

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
        } else if (req.url === '/api/deploy' && req.method === 'POST') {
          exec('git add src/data/blacklist.json && git commit -m "Actualización desde panel de control" && git push origin main && npm run deploy', (error, stdout, stderr) => {
            if (error) {
              console.error(`Deploy error: ${error.message}`);
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: error.message }));
              return;
            }
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
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
