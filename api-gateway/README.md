# API Gateway - Catálogo

## Tecnologías
- Node.js 20
- Express
- http-proxy-middleware
- CORS
- Morgan

## Descripción

Este API Gateway actúa como punto de entrada para el cliente (frontend).
Su función es redirigir todas las solicitudes hacia el backend NestJS,
evitando problemas de CORS y centralizando rutas de acceso.

```
Frontend -> API Gateway -> Backend NestJS -> MongoDB
```

Todas las peticiones que comiencen con `/api/*` serán enviadas al backend.

---

## Configuración de Variables de Entorno

Crear archivo **.env** junto al proyecto con el siguiente contenido:

```
PORT=4000
CATALOG_API_URL=http://localhost:3000   # URL del backend Nest
```

---

## Instalación

```bash
cd api-gateway
npm install
```

---

## Ejecución

### Modo desarrollo (con reinicio automático)
```bash
npm run dev
```

### Producción
```bash
npm start
```

El gateway estará disponible en:

```
http://localhost:4000/api/
```

Ejemplo:
```
GET http://localhost:4000/api/catalogs
```

---

## Endpoints internos

### Health Check
```
GET /health
```
Respuesta esperada:
```json
{
  "status": "ok",
  "gateway": "catalog-api-gateway",
  "target": "http://localhost:3000"
}
```

---

## Notas

- El frontend NO llamará nunca al backend directamente.
- Todas las solicitudes saldrán desde `http://localhost:4000/api/...`
- Si se cambia la ruta del backend — solo se actualiza `CATALOG_API_URL`.

---

