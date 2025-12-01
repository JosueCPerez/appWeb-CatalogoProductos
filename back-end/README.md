
# Backend - API REST (NestJS + MongoDB)

Este backend implementa un servicio completo para gestión de usuarios, catálogos y productos.  
Se desarrolló con **NestJS**, **Mongoose**, **JWT**, **BCrypt**, y estructurado en módulos escalables.

---

##  Tecnologías principales

| Tecnología | Uso |
|-----------|-----|
| NestJS | Arquitectura modular y controladores REST |
| Mongoose | Modelado de documentos y conexión a MongoDB |
| TypeScript | Tipado y mantenibilidad del proyecto |
| JWT | Autenticación basada en tokens |
| Bcrypt | Hashing seguro de contraseñas |
| Docker | Contenedorización para despliegue |
| MongoDB | Base de datos NoSQL para entidades catalogadas |

---

##  Estructura del proyecto

```
back-end/
 ├── src/
 │   ├── users/
 │   ├── auth/
 │   ├── catalogs/
 │   ├── products/
 │   ├── seeds/
 │   └── app.module.ts
 ├── .env
 ├── Dockerfile
 └── package.json
```

### Entidades & Schema (MongoDB)

- **User**
- **Catalog**
- **Product** (referencia a catalogIds)

### Seeds ejecutadas al levantar el contenedor

| Tabla | Datos cargados |
|-------|----------------|
| Users | admin (admin@mail.com / 123456) |
| Catalogs & Products | Datos iniciales según seed.ts |

---

##  Comandos de ejecución

### Local
```bash
cd back-end
npm install
npm run start:dev
```

### Docker
```bash
docker compose up -d
```

---

##  Seguridad

- Login vía `/auth/login`
- Respuesta devuelve `token JWT`
- Acceso protegido con Bearer Token en `Authorization`

---

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /auth/login | Login y obtención de token |
| CRUD | /users | Administración de usuarios |
| CRUD | /catalogs | Gestión de catálogos |
| CRUD | /products | Gestión de productos |
| GET | /products/byCatalog/:id | Productos filtrados por catálogo |

---
