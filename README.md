# Proyecto Final: E-Commerce Mueblería Hermanos Jota
Mueblería Hermanos Jota es un proyecto de e-commerce full-stack que simula una tienda de muebles, ofreciendo un catálogo interactivo con filtros, gestión de carrito de compras persistente, y un sistema de autenticación seguro (JWT). Cubre el ciclo completo de vida del usuario: registro, login, acceso a rutas protegidas y finalización de pedidos.
La página posee: catálogo de productos, carrito de compras, páginas de detalle, formulario de contacto y navegación completa.

### Integrantes
 - Srdos Gorosito Silvana
 - Roman Ezequiel Zorrilla
 - Jazmín Shaiel Nieto
 - Moreno Iñaki
 - Torres Lell Pablo A.

# ⚙️ Arquitectura
El proyecto utiliza el stack MERN (MongoDB, Express, React, Node.js), la encriptación de contraseñas con bcrypt y la gestión de sesiones mediante JSON Web Tokens (JWT), cumpliendo así con los requisitos de desarrollo.

## Frontend
- *Single Page Application (SPA):* Arquitectura basada en React Router para una navegación fluida.
- *Diseño Responsive:* Layout adaptativo para garantizar accesibilidad en todos los dispositivos mediante implementación de menú colapsable (móvil), optimizacipon de tamaños y tamaños de fuente adaptativos.

    ### Breakpoints
    - **Desktop**: 1000px (4 columnas de productos)
    - **Tablet**: 768px - 1000px (2 columnas de productos)
    - **Móvil**: < 768px (1 columna de productos)


- *Gestión de Estado Profesional:* Uso de la React Context API para centralizar la gestión del estado global de Autenticación (AuthContext) y Carrito de Compras (CartContext).
- *Rutas Protegidas:* Implementación de componentes <ProtectedRoute> que verifican el estado de autenticación antes de permitir el acceso a páginas sensibles (ej: /perfil, /carrito).
- *Catálogo y Búsqueda:¨* Catálogo de productos con filtros y funcionalidad de búsqueda.

## Backend
-*Autenticación y Autorización (JWT):* Sistema de Registro y Login seguro que utiliza bcrypt para el hashing de contraseñas. Generación de JSON Web Tokens para la gestión de sesiones.
-*Rutas Protegidas (Middleware):* Las rutas sensibles están protegidas por un middleware que verifica la validez del JWT y adjunta el objeto usuario al request.
-*API RESTful:* Endpoints organizados con el patrón MVC (Modelo-Vista-Controlador).
-*Organización:* Uso de express.Router y controladores para separar la lógica de negocio de la definición de rutas.
---

## Estructura de Carpetas
```
hermanos_jota/
├── backend/                  # Servidor con Node.js y Express (API RESTful)
│   ├── config/               # Configuraciones del servidor y base de datos
│   │   └── database.js
│   ├── controllers/          # Lógica de negocio para las rutas
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middlewares/          # Middlewares de Express (ej. autenticación, logging)
│   │   ├── auth.js           # Middleware para verificar JWT
│   │   ├── logger.js         # Middleware para manejo de errores
│   │   └── verifyToken.js 
│   ├── models/               # Modelos de Mongoose (esquemas de la DB)
│   │   ├── Pedido.js
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Usuario.js
│   ├── routes/               # Definición de rutas de la API
│   │   ├── auth.js
│   │   ├── authRoutes.js
│   │   ├── pedidos.js
│   │   ├── productos.js
│   │   └── userRoutes.js
│   ├── server.js             # Punto de entrada del servidor Express
│   └── productos-data.js     # Datos mock iniciales para cargar en la base de datos
│
├── client/                   # Frontend con React
│   ├── public/               # Archivos estáticos (index.html, imágenes, etc.)
│   │   ├── index.html
│   │   └── ...               # Imágenes y otros recursos
│   ├── src/                  # Código fuente de la aplicación React
│   │   ├── components/       # Componentes reutilizables de UI
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Filters.jsx
│   │   │   ├── DetailedProduct.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── ...
│   │   ├── contexts/          # Context API para gestión de estado global
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/             # Componentes de página (rutas principales)
│   │   │   ├── Cart.jsx
│   │   │   ├── Catalog.jsx
│   │   │   ├── Contacto.jsx
│   │   │   ├── CreateProdcutPage.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   ├── styles/           # Archivos CSS/SCSS modulares o globales
│   │   │   ├── Home.css
│   │   │   ├── Footer.css
│   │   │   ├── carrito.css
│   │   │   └── ...
│   │   ├── App.js            # Componente principal y enrutador de React
│   └── └── index.js          # Punto de entrada de la aplicación React
│
├── README.md                 # Documentación principal del proyecto (este archivo)
└── package.json              # Metadatos y dependencias del proyecto (global)
```
---

## 📦 Dependencias

### Backend
- `express`	- Framework web principal para construir la API RESTful.
- `mongoose` - Modelado de objetos para MongoDB (ORM).
- `bcrypt / bcryptjs` -	Librerías para el hashing seguro de contraseñas.
-`jsonwebtoken` - Generación y verificación de JSON Web Tokens (JWT) para autenticación.
-`cors` -	Middleware para habilitar peticiones CORS (Cross-Origin Resource Sharing) entre Frontend y Backend.
-`dotenv` -	Gestión de variables de entorno (ej. JWT_SECRET, MONGODB_URI) desde un archivo .env.
- `nodemon (Dev)` -	Herramienta para el reinicio automático del servidor durante el desarrollo.

### Frontend
-`react` -	Biblioteca principal para la construcción de la interfaz de usuario.
-`react-dom` -	Paquete para el renderizado de componentes React en el DOM.
-`react-router-dom` -	Implementación del enrutamiento dinámico para la Single Page Application (SPA).
-`react-scripts` -	Conjunto de scripts proporcionados por Create React App (CRA) para la configuración y el build.
-`axios` -	Cliente HTTP basado en promesas para hacer peticiones al Backend API.
-`jwt-decode` -	Decodificación rápida de JWT en el lado del cliente para obtener datos del usuario (ej. ID).
---


## Componentes de React
### Páginas
- **Home.jsx** - Página de inicio con productos destacados y hero banner
- **Catalog.jsx** - Catálogo completo con filtros y búsqueda
- **ProductDetail.jsx** - Vista detallada de un producto individual
- **Cart.jsx** - Carrito de compras con gestión completa
- **Contacto.jsx** - Formulario de contacto funcional

### Componentes Reutilizables
- **Header.jsx** - Navegación global con contador de carrito
- **Footer.jsx** - Footer con información de la empresa
- **ProductCard.jsx** - Tarjeta de producto con botón de añadir al carrito
- **ProductList.jsx** - Grid responsivo de productos
- **DetailedProduct.jsx** - Vista detallada de producto
- **RelatedProducts.jsx** - Productos relacionados
- **Filters.jsx** - Filtros por categorías
- **SearchBar.jsx** - Búsqueda de productos
- **ModalCarrito.jsx** - Modal de confirmación al añadir al carrito
- **ScrollToTop.jsx** - Scroll automático al cambiar de página

---

## Cómo ejecutar el proyecto

### 1\. Configuración Previa (Setup)
Antes de iniciar los servidores, necesitas instalar todas las dependencias en *ambos* proyectos (backend y frontend) y configurar el archivo de entorno del backend.
#### A. Instalar Dependencias del Backend
*Abre una terminal y navega a la carpeta `backend`.*
```bash
cd backend
npm install
```
*(Esto instalará `express`, `mongoose`, `dotenv`, etc.)*
#### B. Instalar Dependencias del Frontend
*Abre una **segunda** terminal y navega a la carpeta `client`.*
```bash
cd client
npm install
```
*(Esto instalará `react`, `react-router-dom`, etc.)*
#### C. Configurar Variables de Entorno (.env)
El backend necesita un archivo `.env` para conectarse a MongoDB.
1.  En la carpeta `backend/` (en la misma ubicación que `server.js`), crea un archivo llamado `.env`
2.  Abre el archivo y añade tu cadena de conexión de MongoDB.
*Si usas una base de datos local (MongoDB Community):*
```env
MONGODB_URI=mongodb://localhost:27017/hermanosjota
```
*Si usas MongoDB Atlas (reemplaza con tus credenciales):*
```env
MONGODB_URI=mongodb+srv://tu_usuario:tu_contraseña@tucluster.mongodb.net/hermanosjota?retryWrites=true&w=majority
```
### 2\. Ejecutar el Proyecto
Una vez configurado, necesitarás **dos terminales abiertas** para ejecutar la aplicación.
#### Terminal 1: Backend (API)
*En la terminal del `backend`*
```bash
npx nodemon server.js
```
El backend correrá en **http://localhost:3001**
#### Terminal 2: Frontend (React)
*En la terminal del `client`*
```bash
npm start
```
El frontend correrá en **http://localhost:3000**
### 3\. Acceso
  - **Frontend**: http://localhost:3000
  - **API Backend**: http://localhost:3001/api/productos

