# Proyecto Catálogo – Backend + Frontend + MongoDB

Aplicación administrativa para gestión de catálogos y productos con autenticación JWT, control de usuarios, panel administrativo y base de datos MongoDB.
El proyecto está preparado para funcionar en desarrollo local y en entornos Docker. Incluye **seed automática** para iniciar con datos listos para usar.

---

## 1. Tecnologías utilizadas

| Módulo    | Tecnología |
|----------|------------|
| Backend  | NestJS, Mongoose, JWT, bcrypt |
| Frontend | Vue 2, Vue Router, Axios, Vuetify |
| Base de Datos | MongoDB 6 |
| Infraestructura | Docker & Docker Compose |
| API Gateway (opcional) | Node + Express + http-proxy-middleware |

---

## 2. Variables de entorno necesarias

### Backend → `/back-end/.env`
```
MONGO_URI=mongodb://mongo:27017/catalogdb
PORT=3000
JWT_SECRET=secret-key-123
SEED_RUN=true
```

### Frontend → `/front-end/.env`
```
VITE_API_URL=http://localhost:3000
```

Si el proyecto se levanta con Gateway, la API del frontend cambiaría a:
```
VITE_API_URL=http://localhost:4000/
```

---

## 3. Seed automática incluida

La API genera datos iniciales si la base está vacía, permitiendo prueba inmediata del sistema.

| Usuario inicial | Contraseña | Rol |
|----------------|------------|-----|
| admin@mail.com | admin123   | admin |

### Catálogos creados automáticamente:

| Código | Nombre |
|--------|---------|
| 1 | Tecnología |
| 2 | Gamer |
| 3 | Ropa |

### Productos incluidos en el seed:
6 productos con imágenes, stock y asignación a catálogos.

---

## 4. Instalación **sin Docker**

### 4.1 Backend
```
cd back-end
npm install
npm run seed        # opcional, si se desea regenerar datos
npm run start:dev
```

### 4.2 Frontend
```
cd front-end
npm install
npm run dev
```

La aplicación queda disponible en:
```
Frontend → http://localhost:8080
Backend  → http://localhost:3000
```

---

## 5. Ejecución completa con Docker (Recomendada)

### 5.1 Levantar todo el sistema
```
docker compose up -d --build
```

### 5.2 Detener servicios
```
docker compose down
```

Servicios levantados:

| Servicio | URL |
|---------|-------------------------|
| Backend NestJS | http://localhost:3000 |
| Frontend Vue  | http://localhost:8080 |
| MongoDB | mongodb://localhost:27017 |

Las seeds se ejecutan automáticamente si la base está vacía.

---

## 6. Implementación API Gateway 

La API Gateway permite unificar todas las rutas del backend bajo una sola puerta de entrada.

### 6.1 Variables necesarias (`/api-gateway/.env`)
```
PORT=4000
CATALOG_API_URL=http://backend:3000
```

### 6.2 Instalación y ejecución
```
cd api-gateway
npm install
npm start
```

### 6.3 Accesos resultantes con Gateway habilitada

| Recurso | Ruta |
|--------|--------------------------|
| Login | http://localhost:4000/auth/login |
| Usuarios | http://localhost:4000/users |
| Productos | http://localhost:4000/products |
| Catálogos | http://localhost:4000/catalogs |

Para usar con frontend, actualizar `.env`:
```
VITE_API_URL=http://localhost:4000/
```

---

## 7. Estructura del proyecto

```
📁 proyecto
├── docker-compose.yml
├── README.md
│
├── back-end
│   ├── src
│   │   ├── auth
│   │   ├── catalogs
│   │   ├── products
│   │   ├── users
│   │   └── seeds
│   ├── package.json
│   └── .env
│
└── front-end
    ├── src
    │   ├── router
    │   ├── views
    │   ├── components
    │   └── services/api.js
    ├── package.json
    └── .env
```

---

## 8. Estado del proyecto

| Componente | Estado |
|-----------|--------|
| Backend | Operativo con datos iniciales |
| Frontend | UI estable conectada a API |
| Docker | Funcionamiento completo |
| API Gateway | Listo para integrarse |

---

