import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';

// Set up ESM equivalents for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression for faster load times
app.use(compression());

// Secure Express app with Helmet security headers
app.use(
  helmet({
    // Disable CSP to ensure embedded scripts, styles, and fonts load correctly
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Express middleware for JSON and form parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint for monitoring/deployment checks
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve Vite build output with optimal caching headers
const distPath = path.join(process.cwd(), 'dist');

app.use(
  express.static(distPath, {
    maxAge: '1y', // Cache static assets for 1 year
    immutable: true,
    setHeaders: (res, filePath) => {
      // Do not cache HTML files (so updates are fetched immediately)
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    },
  })
);

// Support Single Page Application (SPA) routing: fallback to index.html
app.get('*', (req, res, next) => {
  // If requesting a file (e.g. static asset that wasn't found in express.static), skip and let 404 handle it
  if (req.path.includes('.') && !req.path.endsWith('.html')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// 404 handler for missing assets
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running in production mode on port ${PORT}`);
});
