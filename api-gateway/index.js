require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Puerto público del gateway
const PORT = process.env.PORT || 4000;

// URL interna del backend (Nest)
// en docker http://backend:3000
// en local usar  http://localhost:3000  fuera de Docker.
const TARGET_API = process.env.CATALOG_API_URL || 'http://localhost:3000';

console.log('API Gateway configurado con:');
console.log('  PORT          =', PORT);
console.log('  CATALOG_API_URL =', TARGET_API);

// se libera CORS para desarrollo
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());

// Healthcheck
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    gateway: 'catalog-api-gateway',
    target: TARGET_API
  });
});

// Proxy de todas las rutas /* hacia el backend Nest
app.use(
  '/api',
  createProxyMiddleware({
    target: TARGET_API,
    changeOrigin: true,
    // /catalogs -> /catalogs
    pathRewrite: {
      '^/': ''
    },
    // Opcional: logs de debug de proxy
    logLevel: 'debug',
    onError(err, req, res) {
      console.error('Error en el proxy:', err.message);
      if (!res.headersSent) {
        res.status(502).json({ message: 'Error en API Gateway', detail: err.message });
      }
    }
  })
);

// 404 por defecto 
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada en API Gateway',
    path: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`🚪 API Gateway escuchando en http://localhost:${PORT}`);
});
