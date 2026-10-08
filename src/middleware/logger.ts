import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

import { logRequest } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { healthRouter } from './routes/health';
import { metaRouter } from './routes/meta';
import { socialRouter } from './routes/social';

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT || 3000);

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Lord Metadata API</title>
      <style>
        :root {
          --bg: #0b1020;
          --panel: #111827;
          --panel-2: #1f2937;
          --text: #e5e7eb;
          --muted: #a5b4cf;
          --primary: #60a5fa;
          --accent: #a78bfa;
          --success: #34d399;
        }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          min-height: 100vh;
          font-family: Inter, Arial, sans-serif;
          background: linear-gradient(135deg, #0b1020 0%, #111827 100%);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
        }
        .container {
          max-width: 1100px;
          width: 100%;
        }
        h1 {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          margin: 0 0 12px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .lead {
          font-size: 1.15rem;
          color: var(--muted);
          margin-bottom: 28px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 28px;
        }
        .card {
          background: rgba(17, 24, 39, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }
        .card h3 {
          margin: 0 0 10px;
          color: var(--primary);
        }
        .card p {
          margin: 0;
          line-height: 1.7;
          color: var(--muted);
        }
        .endpoint-box {
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 18px;
          padding: 22px;
        }
        .endpoint-box h2 {
          margin-top: 0;
          color: var(--primary);
        }
        .endpoints {
          display: grid;
          gap: 12px;
          margin-top: 18px;
        }
        .endpoint {
          padding: 12px 14px;
          border-radius: 10px;
          background: rgba(31, 41, 55, 0.9);
          color: #c4f1ff;
          font-family: 'Courier New', monospace;
          border-left: 3px solid var(--primary);
        }
        .status {
          margin-top: 28px;
          color: var(--success);
          font-weight: 700;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Lord Metadata API</h1>
        <p class="lead">Global metadata monetization platform for social media intelligence.</p>

        <div class="grid">
          <div class="card">
            <h3>Metadata</h3>
            <p>Structured data packages designed for API access, product claims, and premium analytics.</p>
          </div>
          <div class="card">
            <h3>Platforms</h3>
            <p>Facebook, Instagram, and Pinterest data sources aggregated under one API layer.</p>
          </div>
          <div class="card">
            <h3>Subscriptions</h3>
            <p>Flexible plan structure for developer access, agencies, and enterprise buyers.</p>
          </div>
        </div>

        <div class="endpoint-box">
          <h2>API Endpoints</h2>
          <div class="endpoints">
            <div class="endpoint">GET /health</div>
            <div class="endpoint">GET /api/v1/meta</div>
            <div class="endpoint">GET /api/v1/social/facebook</div>
            <div class="endpoint">GET /api/v1/social/instagram</div>
            <div class="endpoint">GET /api/v1/social/pinterest</div>
          </div>
        </div>

        <div class="status">System online | status: active</div>
      </div>
    </body>
    </html>
  `);
});

app.use('/health', healthRouter);
app.use('/api/v1/meta', metaRouter);
app.use('/api/v1/social', socialRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} does not exist`,
    timestamp: new Date().toISOString()
  });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(error, req, res, next);
});

app.listen(port, () => {
  console.log(`Lord Metadata API running on http://localhost:${port}`);
});

export default app;
