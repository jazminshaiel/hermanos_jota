# Proyecto: E-Commerce Hermanos Jota
### Integrantes
 - Srdos Gorosito Silvana
 - Roman Ezequiel Zorrilla
 - Jazmín Shaiel Nieto
 - Moreno Iñaki
 - Torres Lell Pablo A.
 
# E-Commerce Hermanos Jota

Sistema completo de e-commerce para la **Mueblería Hermanos Jota**, desarrollado con **React + Node/Express**.  
Incluye catálogo de productos, carrito de compras, páginas de detalle, formulario de contacto y navegación completa.

## Características Principales

- ✅ **Single Page Application (SPA)** con React Router
- ✅ **Catálogo de productos** con filtros y búsqueda
- ✅ **Carrito de compras** completo con persistencia
- ✅ **Páginas de detalle** de productos
- ✅ **Formulario de contacto** funcional
- ✅ **Diseño responsive** para todos los dispositivos
- ✅ **API REST** con Express.js
- ✅ **Navegación moderna** con efectos visuales

---

## Estructura de Carpetas

hermanos_jota/
│
├── backend/ # Servidor con Node + Express
│ ├── server.js # Configuración del servidor y rutas API
│ ├── productos-data.js # Array con productos (mock data)
│ ├── routes-productos.js # Rutas específicas de productos
│ └── middlewares/
│   └── logger.js # Middleware de logging
│
├── client/ # Frontend con React
│ ├── public/ # Archivos estáticos (logo, imágenes, index.html)
│ └── src/
│   ├── App.js # Enrutador principal con React Router
│   ├── pages/
│   │ ├── Home.jsx # Página de inicio con productos destacados
│   │ ├── Catalog.jsx # Página del catálogo
│   │ ├── ProductDetail.jsx # Página de detalle de producto
│   │ ├── Cart.jsx # Página del carrito de compras
│   │ └── Contacto.jsx # Página de contacto
│   ├── components/
│   │ ├── Header.jsx # Header global con navegación
│   │ ├── Footer.jsx # Footer global
│   │ ├── ProductCard.jsx # Tarjeta de producto
│   │ ├── ProductList.jsx # Lista de productos
│   │ ├── DetailedProduct.jsx # Componente de producto detallado
│   │ ├── RelatedProducts.jsx # Productos relacionados
│   │ ├── Filters.jsx # Filtros por categorías
│   │ ├── SearchBar.jsx # Barra de búsqueda
│   │ ├── ModalCarrito.jsx # Modal de confirmación de carrito
│   │ └── ScrollToTop.jsx # Componente para scroll automático
│   └── styles/
│     ├── estilos-globales.css # Estilos globales y header
│     ├── Home.css # Estilos de la página de inicio
│     ├── estilos-catalogo.css # Estilos del catálogo
│     ├── estilos-producto.css # Estilos de detalle de producto
│     ├── estilos-carrito.css # Estilos del carrito y modal
│     ├── estilos-contacto.css # Estilos de contacto
│     └── Footer.css # Estilos del footer
│
├── documentation/ # Documentación del proyecto
│ ├── README-index.md # Documentación de la página inicial
│ └── README-CARRITO.md # Documentación del sistema de carrito


---

## Dependencias

### Backend
- `express` - Framework web para Node.js
- `cors` - Middleware para habilitar CORS
- `nodemon` (solo dev) - Auto-restart del servidor

### Frontend
- `react` - Biblioteca principal de React
- `react-dom` - Renderizado de React en el DOM
- `react-router-dom` - Enrutamiento para React SPA

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

## Endpoints de la API

### Productos
- **GET /api/productos** - Retorna el listado completo de productos
- **GET /api/productos/:id** - Retorna un producto específico por ID (404 si no existe)

### Middleware
- **Logging** - Registra todas las peticiones HTTP (método y URL)
- **CORS** - Habilita peticiones desde el frontend
- **JSON Parser** - Procesa datos JSON en las peticiones

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

## Sistema de Carrito de Compras

### Funcionalidades
- ✅ **Añadir productos** desde cualquier página
- ✅ **Contador en tiempo real** en la barra de navegación
- ✅ **Gestión de cantidades** (aumentar/disminuir)
- ✅ **Eliminar productos** del carrito
- ✅ **Cálculo automático** del total
- ✅ **Modal de confirmación** al añadir productos
- ✅ **Persistencia** en el estado global de React

### Estados del Carrito
- **Array de productos** con información completa
- **Cantidad total** de items para el contador
- **Modal de confirmación** con auto-cierre

---

## Diseño y Estilos

### Características de Diseño
- **Responsive Design** - Mobile-first con breakpoints
- **Paleta de colores** - Marrón siena (#A0522D), verde salvia (#87A96B)
- **Tipografías** - Inter (sans-serif) y Playfair Display (serif)
- **Efectos visuales** - Hover, transiciones suaves, sombras
- **Layout moderno** - Flexbox y CSS Grid

### Páginas Estilizadas
- **Home** - Hero banner con productos destacados
- **Catálogo** - Grid responsivo con filtros
- **Detalle de producto** - Layout de dos columnas
- **Carrito** - Lista de productos con controles
- **Contacto** - Formulario centrado con banner

---

## Funcionalidades Técnicas

### React Router
- **Navegación SPA** - Sin recarga de página
- **Rutas protegidas** - Manejo de rutas no encontradas
- **Scroll automático** - Al cambiar de página

### Estado Global
- **Carrito de compras** - Estado compartido entre componentes
- **Modal de confirmación** - Estado global del modal
- **Gestión de props** - Paso de funciones entre componentes

### Formularios
- **Formulario de contacto** - Componente controlado con validación
- **Console.log** - Envío de datos al hacer submit

---

## Responsive Design

### Breakpoints
- **Desktop** - > 1000px (4 columnas de productos)
- **Tablet** - 768px - 1000px (2 columnas de productos)
- **Móvil** - < 768px (1 columna de productos)

### Adaptaciones
- **Navegación** - Menú colapsable en móvil
- **Imágenes** - Optimización de tamaños
- **Texto** - Tamaños de fuente adaptativos
- **Espaciado** - Márgenes y padding responsivos

---

## Cumplimiento de Requisitos

### Frontend (React SPA)
- ✅ **Single Page Application** con React Router
- ✅ **Componentes reutilizables** (Header, Footer, ProductCard, etc.)
- ✅ **Página de catálogo** con fetch al backend
- ✅ **Estados de carga** ("Cargando..." y "Error al cargar")
- ✅ **Renderizado con .map()** de productos
- ✅ **Vista de detalle** con renderizado condicional
- ✅ **Carrito de compras** con estado en App.js
- ✅ **Contador en Navbar** actualizado en tiempo real
- ✅ **Formulario de contacto** controlado con useState
- ✅ **Console.log** en envío de formulario

### Backend (Express.js)
- ✅ **Servidor Express** configurado correctamente
- ✅ **Datos locales** en archivo .js (productos-data.js)
- ✅ **Endpoints API**:
  - GET /api/productos (listado completo)
  - GET /api/productos/:id (producto específico con 404)
- ✅ **Middleware global** de logging
- ✅ **express.json()** para procesar JSON
- ✅ **express.Router** para organización de rutas
- ✅ **Manejadores de errores** (404 y centralizados)



## Contacto del Proyecto

**Equipo de Desarrollo Hermanos Jota**
- Srdos Gorosito Silvana
- Roman Ezequiel Zorrilla  
- Jazmín Shaiel Nieto
- Moreno Iñaki
- Torres Lell Pablo A.

**Documentación adicional:**
- [README de la página inicial](documentation/README-index.md)
- [README del sistema de carrito](documentation/README-CARRITO.md)

