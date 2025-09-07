# Sistema de Carrito de Compras - Hermanos Jota

## Descripción
Sistema completo de carrito de compras implementado para la tienda de muebles Hermanos Jota. Incluye funcionalidad para añadir productos, contador en tiempo real, notificaciones y persistencia de datos.

## Características Implementadas

### Contador en Barra de Navegación
- Muestra la cantidad total de productos en el carrito
- Se actualiza automáticamente al añadir/remover productos
- Diseño responsive y accesible
- Animaciones suaves

### Funcionalidad de Añadir al Carrito
- Botones "Añadir al carrito" en todas las páginas de productos
- Funciona desde:
  - Página de catálogo (`productos.html`)
  - Página de detalle de producto (`producto.html`)
  - Productos relacionados
- Notificaciones visuales al añadir productos
- Animaciones de confirmación

### Persistencia de Datos
- Los productos se guardan en `localStorage`
- El carrito persiste entre sesiones del navegador
- Sincronización automática entre pestañas

### Convenciones de Código
- Variables y funciones en **CamelCase**
- Nombres descriptivos y claros
- Código bien documentado
- Estructura modular y mantenible

## Ultimas modificaciones hechas 
### Nuevos Archivos
- `js/sistema-carrito.js` - Sistema principal del carrito
- `css/estilos-carrito.css` - Estilos para el carrito y botones

### Archivos Modificados
- `index.html` - Añadido contador y scripts
- `producto.html` - Añadido contador y scripts
- `productos.html` - Añadido contador y scripts
- `js/funcionalidad-catalogo.js` - Botones de carrito en catálogo
- `js/detalle-producto.js` - Botones de carrito en detalle

## Funciones Principales

### SistemaCarrito (Clase)
```javascript
// Añadir producto al carrito
añadirProductoAlCarrito(producto, cantidad)
// Remover producto del carrito
removerProductoDelCarrito(idProducto)
// Actualizar cantidad de producto
actualizarCantidadProducto(idProducto, nuevaCantidad)
// Obtener cantidad total
obtenerCantidadTotalProductos()
// Obtener precio total
obtenerPrecioTotalCarrito(
// Limpiar carrito
limpiarCarrito()
```

### Funciones Globales
```javascript
// Añadir al carrito (desde cualquier página)
window.añadirAlCarrito(producto, cantidad)
// Obtener productos del carrito
window.obtenerCarrito()
// Limpiar carrito
window.limpiarCarrito()
// Actualizar contador
window.actualizarContadorCarrito()
```

## Estructura de Datos del Carrito

```javascript
{
  id: 1,
  nombre: "Aparador Uspallata",
  precio: "$XX.XXX",
  imagen: "url_de_imagen",
  descripcion: "Descripción del producto",
  categoria: "aparadores",
  cantidad: 1
}
```

## Estilos CSS

### Clases Principales
- `.contador-carrito` - Contador en la barra de navegación
- `.boton-carrito` - Botones de añadir al carrito
- `.notificacion-carrito` - Notificaciones de producto añadido
- `.carta-producto` - Tarjetas de productos con botón
- `.relacionado-item` - Productos relacionados

### Características de Diseño
- Colores consistentes con la marca (#a0522d)
- Tipografías: Inter y Playfair Display

