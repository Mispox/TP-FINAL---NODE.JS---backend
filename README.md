# TP Final - API REST Node.js - Talento Tech

**API desplegada:** https://tp-final-nodejs-backend.onrender.com

API REST para la administración de productos de una librería, que emulé para el proyecto final del curso de React,js https://bathory.vercel.app/. esta API está desarrollada como proyecto final del curso de Back End con Node.js.

Permite consultar, crear, actualizar y eliminar productos almacenados en Firestore, con una capa de autenticación mediante JWT que protege las operaciones de escritura.

## Tecnologías

- Node.js + Express
- Firebase / Firestore (base de datos en la nube)
- Firebase Authentication (validación de credenciales)
- JSON Web Tokens (jsonwebtoken)
- dotenv, cors

## Arquitectura

El proyecto separa responsabilidades en capas:

```
src/
├── config/        → conexión a Firebase
├── models/        → interacción directa con Firestore
├── services/      → lógica de negocio y validaciones
├── controllers/   → manejo de peticiones y respuestas HTTP
├── routes/        → definición de endpoints
└── middlewares/   → autenticación y verificación de roles
```

## Instalación

```bash
git clone https://github.com/Mispox/TP-FINAL---NODE.JS---backend.git
cd TP-FINAL---NODE.JS---backend
npm install
```

## Configuración

Crear un archivo `.env` en la raíz del proyecto, tomando como referencia `.env.example`:

```
PORT=3000

FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu_proyecto
FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id

JWT_SECRET=una_clave_secreta_larga
```

## Ejecución

```bash
npm run start
```

El servidor queda disponible en `http://localhost:3000`

## Endpoints

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/login` | Valida las credenciales y devuelve un Bearer Token |

**Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

**Respuesta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "uid": "...",
    "email": "usuario@ejemplo.com",
    "rol": "admin"
  }
}
```

El token tiene una validez de 1 hora.

### Productos

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| GET | `/api/products` | Público | Devuelve todos los productos |
| GET | `/api/products/:id` | Público | Devuelve un producto por ID |
| POST | `/api/products/create` | Admin | Crea un nuevo producto |
| PUT | `/api/products/:id` | Admin | Actualiza un producto existente |
| DELETE | `/api/products/:id` | Admin | Elimina un producto |

**Body para crear un producto:**

```json
{
  "name": "Nombre del libro",
  "price": 15000,
  "category": "terror",
  "description": "Autor",
  "image": "/img/portada.jpg",
  "longDescription": "Reseña del libro."
}

```
**Body para actualizar un producto:**

Acepta actualizaciones parciales: solo se modifican los campos enviados.

```json
{
  "price": 32000
}
```

### Rutas protegidas

Las operaciones de creación, actualización y eliminación requieren un token válido de un usuario con rol `admin`, enviado en el header:

```
Authorization: Bearer <token>
```

## Códigos de estado

| Código | Situación |
|--------|-----------|
| 200 | Petición exitosa |
| 201 | Producto creado |
| 400 | Faltan campos obligatorios o son inválidos |
| 401 | Token ausente, inválido o expirado |
| 403 | El usuario no tiene permisos de administrador |
| 404 | Producto o ruta inexistente |
| 500 | Error interno o del servicio de datos |

## Autor

Milagros Loeda — [@Mispox](https://github.com/Mispox)
