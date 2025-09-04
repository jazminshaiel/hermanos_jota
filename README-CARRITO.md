# Páginas del Carrito - Hermanos Jota

## Descripción

Se han creado dos nuevas páginas para el sistema de carrito de compras de Hermanos Jota:

1. **carrito.html** - Página principal del carrito de compras
2. **carrito-envio.html** - Página de envío y pago

## Características

### Página del Carrito (carrito.html)
- ✅ Visualización de productos en el carrito
- ✅ Modificación de cantidades
- ✅ Eliminación de productos
- ✅ Cálculo automático de subtotales y total
- ✅ Diseño responsive
- ✅ Integración con localStorage para persistencia de datos

### Página de Envío (carrito-envio.html)
- ✅ Formulario completo de datos de envío
- ✅ Resumen del pedido
- ✅ Selección de métodos de pago
- ✅ Validación de formularios
- ✅ Política de privacidad
- ✅ Diseño responsivo

## Archivos Creados

### HTML
- `carrito.html` - Página principal del carrito
- `carrito-envio.html` - Página de envío y pago

### CSS
- `css/carrito.css` - Estilos para ambas páginas del carrito


## Funcionalidades Implementadas

### Gestión del Carrito
- **Visualización estática**: Productos mostrados en el carrito
- **Diseño responsive**: Adaptable a diferentes dispositivos
- **Interfaz limpia**: Diseño moderno y profesional

### Navegación
- **Header consistente**: Logo, navegación e íconos
- **Breadcrumbs**: Navegación contextual
- **Responsive**: Adaptable a móviles y tablets

### Formularios
- **Validación HTML5**: Campos requeridos y tipos específicos
- **Métodos de pago**: Transferencia bancaria, tarjeta, efectivo
- **Datos de envío**: Formulario completo con todos los campos necesarios

### Notificaciones
- **Diseño estático**: Sin funcionalidad JavaScript
- **Interfaz visual**: Elementos de UI preparados para futuras funcionalidades

## Uso

### Para Ver las Páginas
```html
<!-- Enlace directo -->
<a href="carrito.html">Ver Carrito</a>
<a href="carrito-envio.html">Ver Página de Envío</a>
```

### Navegación Manual
- Abrir `carrito.html` en el navegador para ver la página del carrito
- Abrir `carrito-envio.html` en el navegador para ver la página de envío

## Estructura Visual

### Página del Carrito (carrito.html)
- Header con logo "hj" y navegación
- Hero section con título "Carrito"
- Lista de productos con imagen, nombre, precio, cantidad y subtotal
- Resumen del carrito con total
- Botón "Ir a pagar" que enlaza a carrito-envio.html
- Sección de características
- Footer con información de la empresa

### Página de Envío (carrito-envio.html)
- Header con logo "hj" y navegación
- Hero section con título "Envío"
- Formulario de datos de envío
- Resumen del producto y total
- Métodos de pago
- Política de privacidad
- Botón "Ir a pagar"
- Sección de características
- Footer con información de la empresa

## Personalización

### Colores
Los colores principales se pueden modificar en `css/carrito.css`:
- **Color principal**: `#A0522D` (marrón)
- **Color secundario**: `#8B4513` (marrón oscuro)
- **Color de éxito**: `#28a745` (verde)
- **Color de error**: `#dc3545` (rojo)

### Fuentes
- **Familia principal**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Tamaños**: Responsive con breakpoints en 768px y 480px


## Dependencias

- **Font Awesome 6.0.0**: Para íconos
- **CSS Grid y Flexbox**: Para layouts

