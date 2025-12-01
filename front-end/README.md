
# Frontend Catalog App (Vue + Vuetify + Axios)

Aplicación orientada a consumir el backend mediante autenticación JWT.  
Permite administrar catálogo, productos y usuarios.

---

##  Tecnologías utilizadas

| Librería | Uso |
|---------|-----|
| Vue 2 | Framework base SPA |
| Vue Router | Navegación entre vistas |
| Vuetify UI | Componentes visuales |
| Axios | Consumo API HTTP |
| Vite / Vue CLI | Build y desarrollo local |
| Docker | Empaquetado y despliegue |

---

##  Estructura del proyecto

```
front-end/
 ├── src/
 │   ├── views/
 │   ├── pages/
 │   ├── router/
 │   ├── layouts/
 │   └── api.js
 ├── .env
 ├── Dockerfile
 └── package.json
```

### Rutas

| Vista | Ruta |
|-------|------|
| Login | / |
| Catálogos | /catalogs |
| Productos | /products |
| Usuarios | /users |

Control de acceso vía localStorage:

```js
// router/index.js
beforeEnter(to, from, next) {
  const token = localStorage.getItem("token")
  if(!token) return next("/")
  next()
}
```

---

##  Comunicación con backend

Archivo `/src/api.js`:
```js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(config=>{
  const token = localStorage.getItem("token")
  if(token) config.headers.Authorization = "Bearer " + token
  return config
})

export default api
```

### Variables .env
```
VITE_API_URL=http://localhost:3000
```

---

## Ejecución

### Local
```bash
cd front-end
npm install
npm run serve
```

### Docker
```bash
docker compose up -d
```

---

