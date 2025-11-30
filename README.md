# 🌟 Proyecto Final: E-Commerce Mueblería Hermanos Jota

**Mueblería Hermanos Jota** es un proyecto de **e-commerce full-stack** construido con la arquitectura **MERN** (MongoDB, Express, React, Node.js). La plataforma simula una tienda de muebles, ofreciendo un **catálogo interactivo** con filtros, gestión de **carrito de compras** persistente, y un sistema de **autenticación seguro (JWT)**. Cubre el ciclo completo de vida del usuario: registro, login, acceso a rutas protegidas y finalización de pedidos.

La aplicación posee un completo **catálogo de productos**, **carrito de compras**, **páginas de detalle**, **formulario de contacto** y **navegación** completa.

----

## 👥 Integrantes del Equipo

  * Srdos Gorosito Silvana
  * Roman Ezequiel Zorrilla
  * Jazmín Shaiel Nieto
  * Moreno Iñaki
  * Torres Lell Pablo A.

----

## ⚙️ Arquitectura y Características Principales

El proyecto utiliza el stack **MERN** (MongoDB, Express, React, Node.js), la encriptación de contraseñas con **bcrypt** y la gestión de sesiones mediante **JSON Web Tokens (JWT)**, cumpliendo así con los requisitos de desarrollo final.

### 🖼️ Frontend (React SPA)

  - **Single Page Application (SPA):** Arquitectura basada en React Router para una navegación fluida.
  - **Gestión de Estado Profesional:** Uso de la **React Context API** para centralizar la gestión del estado global de **Autenticación** (`AuthContext`) y **Carrito de Compras** (`CartContext`).
  - **Rutas Protegidas:** Implementación de componentes `<ProtectedRoute>` que verifican el estado de autenticación antes de permitir el acceso a páginas sensibles (ej: `/perfil`, `/carrito`).
  - **Catálogo y Búsqueda:** Catálogo de productos con filtros y funcionalidad de búsqueda.
  - **Diseño Responsive:** Layout adaptativo para garantizar accesibilidad en todos los dispositivos mediante implementación de menú colapsable (móvil), optimización de tamaños y tamaños de fuente adaptativos.
      **Breakpoints (Responsive Design):**
          -**Desktop**: 1000px (4 columnas de productos)
          -**Tablet**: 768px - 1000px (2 columnas de productos)
          -**Móvil**: \< 768px (1 columna de productos)

### 🔒 Backend (Express API)

  * **Autenticación y Autorización (JWT):** Sistema de **Registro** y **Login** seguro que utiliza **bcrypt** para el hashing de contraseñas. Generación de **JSON Web Tokens** para la gestión de sesiones.
  * **Rutas Protegidas (Middleware):** Las rutas sensibles están protegidas por un middleware (`auth.js`) que verifica la validez del JWT y adjunta el objeto `usuario` al request.
  * **API RESTful:** Endpoints organizados con el patrón **MVC (Modelo-Vista-Controlador)**.
  * **Organización:** Uso de `express.Router` y controladores para separar la lógica de negocio de la definición de rutas.

-----

## 📦 Dependencias del Proyecto

### Backend

  * **`express`**: Framework web principal para construir la API RESTful.
  * **`mongoose`**: Modelado de objetos para MongoDB (ORM).
  * **`bcrypt / bcryptjs`**: Librerías para el hashing seguro de contraseñas.
  * **`jsonwebtoken`**: Generación y verificación de JSON Web Tokens (JWT) para autenticación.
  * **`cors`**: Middleware para habilitar peticiones CORS (Cross-Origin Resource Sharing) entre Frontend y Backend.
  * **`dotenv`**: Gestión de variables de entorno (ej. `JWT_SECRET`, `MONGODB_URI`) desde un archivo `.env`.
  * **`nodemon` (Dev)**: Herramienta para el reinicio automático del servidor durante el desarrollo.

### Frontend

  * **`react`**: Biblioteca principal para la construcción de la interfaz de usuario.
  * **`react-dom`**: Paquete para el renderizado de componentes React en el DOM.
  * **`react-router-dom`**: Implementación del enrutamiento dinámico para la Single Page Application (SPA).
  * **`axios`**: Cliente HTTP basado en promesas para hacer peticiones al Backend API.
  * **`jwt-decode`**: Decodificación rápida de JWT en el lado del cliente para obtener datos del usuario (ej. ID).
  * **`react-scripts`**: Conjunto de scripts proporcionados por Create React App (CRA) para la configuración y el build.

-----

## 📁 Estructura de Carpetas

```
hermanos_jota/
├── backend/                  # Servidor con Node.js y Express (API RESTful)
│   ├── config/               # Configuraciones del servidor y base de datos
│   │   └── database.js
│   ├── controllers/          # Lógica de negocio para las rutas
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middlewares/          # Middlewares de Express (ej. autenticación, logging)
│   │   ├── auth.js           # Middleware para verificar JWT
│   │   ├── logger.js         # Middleware para manejo de errores
│   │   └── verifyToken.js
│   ├── models/               # Modelos de Mongoose (esquemas de la DB)
│   │   ├── Pedido.js
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Usuario.js
│   ├── routes/               # Definición de rutas de la API
│   │   ├── auth.js
│   │   ├── authRoutes.js
│   │   ├── pedidos.js
│   │   ├── productos.js
│   │   └── userRoutes.js
│   ├── server.js             # Punto de entrada del servidor Express
│   └── productos-data.js     # Datos mock iniciales para cargar en la base de datos
│
├── client/                   # Frontend con React
│   ├── public/               # Archivos estáticos (index.html, imágenes, etc.)
│   │   ├── index.html
│   │   └── ...               # Imágenes y otros recursos
│   ├── src/                  # Código fuente de la aplicación React
│   │   ├── components/       # Componentes reutilizables de UI
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Filters.jsx
│   │   │   ├── DetailedProduct.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── ...
│   │   ├── contexts/          # Context API para gestión de estado global
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/             # Componentes de página (rutas principales)
│   │   │   ├── Cart.jsx
│   │   │   ├── Catalog.jsx
│   │   │   ├── Contacto.jsx
│   │   │   ├── CreateProdcutPage.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   ├── styles/           # Archivos CSS/SCSS modulares o globales
│   │   │   ├── Home.css
│   │   │   ├── Footer.css
│   │   │   ├── carrito.css
│   │   │   └── ...
│   │   ├── App.js            # Componente principal y enrutador de React
│   └── └── index.js          # Punto de entrada de la aplicación React
│
└── README.md                 # Documentación principal del proyecto
```

-----

## 🎨 Componentes de React

### Páginas (`pages/`)

  * **Home.jsx**: Página de inicio con productos destacados y hero banner.
  * **Catalog.jsx**: Catálogo completo con filtros y búsqueda.
  * **ProductDetail.jsx**: Vista detallada de un producto individual.
  * **Cart.jsx**: Carrito de compras con gestión completa y lógica de checkout.
  * **Contacto.jsx**: Formulario de contacto funcional.
  * **LoginPage.jsx / RegisterPage.jsx**: Formularios para el flujo de autenticación.
  * **ProfilePage.jsx**: Ruta protegida para ver y actualizar el perfil de usuario.

### Componentes Reutilizables (`components/`)

  * **Header.jsx**: Navegación global con lógica condicional para el estado de autenticación y contador de carrito.
  * **Footer.jsx**: Pie de página con información de la empresa.
  * **ProductCard.jsx**: Tarjeta individual de producto con botón de añadir al carrito.
  * **ProductList.jsx**: Grid responsivo para listar productos.
  * **Filters.jsx / SearchBar.jsx**: Componentes para la navegación y filtrado del catálogo.
  * **ProtectedRoute.jsx**: Lógica para proteger rutas.

-----

## ▶️ Cómo Ejecutar el Proyecto

### 1\. Configuración Previa (Setup)

Antes de iniciar los servidores, debes instalar todas las dependencias en **ambos** proyectos y configurar el archivo de entorno del backend.

#### A. Instalar Dependencias

  * **Backend:** Abre una terminal, navega a `backend` y ejecuta: `npm install`
  * **Frontend:** Abre una **segunda** terminal, navega a `client` y ejecuta: `npm install`

#### B. Configurar Variables de Entorno (.env)

En la carpeta `backend/` (donde está `server.js`), crea un archivo llamado `.env` y añade tu URI de MongoDB y la clave secreta para JWT.

```env
# Reemplaza con tu cadena de conexión a MongoDB Atlas
MONGODB_URI=mongodb+srv://tu_usuario:tu_contraseña@tucluster.mongodb.net/hermanosjota?retryWrites=true&w=majority

# Clave secreta para JWT (debe ser fuerte)
JWT_SECRET=TU_SECRETO_SUPER_SEGURO_CAMBIAR_EN_PRODUCCION
```

### 2\. Iniciar el Proyecto (Doble Terminal)

Necesitas **dos terminales abiertas** simultáneamente:

#### Terminal 1: Backend (API)

  * En la terminal del `backend`, ejecuta: `npx nodemon server.js`
  * El backend correrá en **`http://localhost:3001`**.

#### Terminal 2: Frontend (React)

  * En la terminal del `client`, ejecuta: `npm start`
  * El frontend correrá en **`http://localhost:3000`**.

### 3\. Acceso Local

  * **Frontend (App)**: `http://localhost:3000`
  * **API Backend (Ejemplo)**: `http://localhost:3001/api/productos`