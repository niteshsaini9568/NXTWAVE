import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import sirv from 'sirv';
import { createServer as createViteServer } from 'vite';

// Import your database connection and routes
import './Models/db.js';
import Authrouter from './Routes/Authrouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://nxtwave-l75r.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use('/', Authrouter);

let vite;
let templateHtml;

(async () => {
  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    });

    app.use(vite.middlewares);
  } else {
    app.use(compression());
    app.use(base, sirv('./dist/client', { extensions: [] }));
    templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8');
  }

  app.use('*', async (req, res, next) => {
    if (req.originalUrl.startsWith('/api/')) {
      return next();
    }

    try {
      const url = req.originalUrl.replace(base, '');

      let template;
      let render;

      if (!isProduction) {
        template = await fs.readFile('./index.html', 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
      } else {
        template = templateHtml;
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const rendered = await render(url);

      const html = template
        .replace(`<!--app-head-->`, rendered.head || '')
        .replace(`<!--app-html-->`, rendered.html || '');

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      console.error(e.stack);
      res.status(500).end(e.stack);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();