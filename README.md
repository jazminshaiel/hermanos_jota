# Proyecto: E-Commerce Hermanos Jota
### Integrantes
 - Srdos Gorosito Silvana
 - Roman Ezequiel Zorrilla
 - Jazmín Shaiel Nieto
 - Moreno Iñaki
 - Torres Lell Pablo A.
 
# Catálogo - Mueblería Hermanos Jota

Este módulo corresponde al **Catálogo de Productos** de Hermanos Jota, migrado a **React + Node/Express**.  
Se conecta a un backend propio que expone una API REST con los productos de la mueblería.

---

## Estructura de Carpetas

hermanos_jota/
│
├── backend/ # Servidor con Node + Express
│ ├── server.js # Configuración del servidor y rutas API
│ ├── productos-data.js # Array con productos (mock data)
│
├── client/ # Frontend con React
│ ├── public/ # Archivos estáticos (logo, imágenes, index.html)
│ └── src/
│ ├── App.js # Enrutador principal con React Router
│ ├── pages/
│ │ └── Catalog.jsx # Página principal del catálogo
│ ├── components/
│ │ ├── Header.jsx # Header global
│ │ ├── Footer.jsx # Footer global
│ │ ├── ProductCard.jsx # Componente para mostrar un producto
│ │ ├── ProductList.jsx # Renderiza lista de productos
│ │ ├── Filters.jsx # Filtro por categorías
│ │ └── SearchBar.jsx # Barra de búsqueda
│ └── styles/
│ ├── estilos-catalogo.css
│ └── estilos-globales.css


---

## Dependencias

### Backend
- `express`
- `cors`
- `nodemon` (solo dev)

### Frontend
- `react`
- `react-dom`
- `react-router-dom`

---

## Cómo ejecutar el proyecto

### 1. Backend
```bash
cd backend
npm install
npx nodemon server.js

El backend corre en http://localhost:3001

### 2. Frontend

cd client
npm install
npm start
El frontend corre en http://localhost:3000

## Endpoints de la API

GET /api/productos
Retorna el listado completo de productos.

GET /api/productos/:id
Retorna un único producto por id.
Si no existe, devuelve 404.

## Componentes de React

Catalog.jsx
Página que consume la API y muestra los productos con filtros y búsqueda.

ProductCard.jsx
Tarjeta visual con imagen, nombre, descripción y precio.

SearchBar.jsx
Input controlado para buscar productos por nombre o descripción.

Filters.jsx
Selector de categorías.

ProductList.jsx
Renderiza la grilla de ProductCards.

Header.jsx / Footer.jsx
Se usan de manera global en el layout para mantener consistencia.

