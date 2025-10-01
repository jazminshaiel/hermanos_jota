// Funcionalidad de la pagina del carrito - Hermanos Jota
// Variables y funciones en CamelCase, textos en espanol

export function inicializarCarrito() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarCarrito);
        return;
    }
    
    // Verificar si el sistema de carrito está disponible
    if (typeof window.obtenerCarrito === 'function') {
        const productosEnCarrito = window.obtenerCarrito();
        mostrarProductosCarrito(productosEnCarrito);
        actualizarResumenCarrito(productosEnCarrito);
    } else {
        mostrarCarritoVacio();
    }
}

function mostrarProductosCarrito(productos) {
    const contenedorProductos = document.querySelector('.product-list');
    
    if (!contenedorProductos) {
        console.error('Contenedor de productos del carrito no encontrado');
        return;
    }

    // Limpiar contenido existente excepto el header
    const header = contenedorProductos.querySelector('.cart-header');
    // Limpiar de forma segura
    while (contenedorProductos.firstChild) {
        contenedorProductos.removeChild(contenedorProductos.firstChild);
    }
    if (header) {
        contenedorProductos.appendChild(header);
    }

    if (productos.length === 0) {
        mostrarCarritoVacio();
        return;
    }

    // Crear elementos para cada producto
    productos.forEach(producto => {
        const elementoProducto = crearElementoProductoCarrito(producto);
        contenedorProductos.appendChild(elementoProducto);
    });
}

function crearElementoProductoCarrito(producto) {
    const elemento = document.createElement('div');
    elemento.className = 'cart-item';
    elemento.setAttribute('data-producto-id', producto.id);
    
    // Calcular subtotal
    const precioNumerico = extraerPrecioNumerico(producto.precio);
    const subtotal = precioNumerico * producto.cantidad;
    
    // Crear elementos de forma segura
    const itemProducto = document.createElement('div');
    itemProducto.className = 'item-producto';
    
    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;
    img.className = 'product-image';
    
    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';
    
    const productName = document.createElement('span');
    productName.className = 'product-name';
    productName.textContent = producto.nombre;
    
    const productCategory = document.createElement('span');
    productCategory.className = 'product-category';
    productCategory.textContent = capitalizarPrimeraLetra(producto.categoria);
    
    productInfo.appendChild(productName);
    productInfo.appendChild(productCategory);
    
    itemProducto.appendChild(img);
    itemProducto.appendChild(productInfo);
    
    const itemPrecio = document.createElement('div');
    itemPrecio.className = 'item-precio';
    itemPrecio.textContent = producto.precio;
    
    const itemCantidad = document.createElement('div');
    itemCantidad.className = 'item-cantidad';
    
    const btnMenos = document.createElement('button');
    btnMenos.className = 'btn-cantidad';
    btnMenos.setAttribute('data-carrito-action', 'cambiar-cantidad');
    btnMenos.setAttribute('data-product-id', producto.id);
    btnMenos.setAttribute('data-cambio', '-1');
    const iconoMenos = document.createElement('i');
    iconoMenos.className = 'fas fa-minus';
    btnMenos.appendChild(iconoMenos);
    
    const inputCantidad = document.createElement('input');
    inputCantidad.type = 'number';
    inputCantidad.value = producto.cantidad;
    inputCantidad.min = '1';
    inputCantidad.className = 'quantity-input';
    inputCantidad.setAttribute('data-carrito-action', 'actualizar-cantidad');
    inputCantidad.setAttribute('data-product-id', producto.id);
    
    const btnMas = document.createElement('button');
    btnMas.className = 'btn-cantidad';
    btnMas.setAttribute('data-carrito-action', 'cambiar-cantidad');
    btnMas.setAttribute('data-product-id', producto.id);
    btnMas.setAttribute('data-cambio', '1');
    const iconoMas = document.createElement('i');
    iconoMas.className = 'fas fa-plus';
    btnMas.appendChild(iconoMas);
    
    itemCantidad.appendChild(btnMenos);
    itemCantidad.appendChild(inputCantidad);
    itemCantidad.appendChild(btnMas);
    
    const itemSubtotal = document.createElement('div');
    itemSubtotal.className = 'item-subtotal';
    itemSubtotal.textContent = `$${formatearPrecio(subtotal)}`;
    
    const itemRemove = document.createElement('div');
    itemRemove.className = 'item-remove';
    
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.title = 'Eliminar producto';
    btnEliminar.setAttribute('data-carrito-action', 'eliminar');
    btnEliminar.setAttribute('data-product-id', producto.id);
    const iconoEliminar = document.createElement('i');
    iconoEliminar.className = 'fas fa-trash';
    btnEliminar.appendChild(iconoEliminar);
    
    itemRemove.appendChild(btnEliminar);
    
    // Ensamblar el elemento completo
    elemento.appendChild(itemProducto);
    elemento.appendChild(itemPrecio);
    elemento.appendChild(itemCantidad);
    elemento.appendChild(itemSubtotal);
    elemento.appendChild(itemRemove);
    
    return elemento;
}

function mostrarCarritoVacio() {
    const contenedorProductos = document.querySelector('.product-list');
    const resumenCarrito = document.querySelector('.order-summary');
    
    if (contenedorProductos) {
        // Limpiar contenedor de forma segura
        while (contenedorProductos.firstChild) {
            contenedorProductos.removeChild(contenedorProductos.firstChild);
        }
        
        const carritoVacio = document.createElement('div');
        carritoVacio.className = 'carrito-vacio';
        
        const carritoVacioContent = document.createElement('div');
        carritoVacioContent.className = 'carrito-vacio-content';
        
        const icono = document.createElement('i');
        icono.className = 'fas fa-shopping-cart';
        
        const titulo = document.createElement('h3');
        titulo.textContent = 'Tu carrito esta vacio';
        
        const parrafo = document.createElement('p');
        parrafo.textContent = 'No tienes productos en tu carrito de compras.';
        
        const enlace = document.createElement('a');
        enlace.href = 'productos.html';
        enlace.className = 'btn-continuar-comprando';
        
        const iconoEnlace = document.createElement('i');
        iconoEnlace.className = 'fas fa-arrow-left';
        enlace.appendChild(iconoEnlace);
        enlace.appendChild(document.createTextNode(' Continuar comprando'));
        
        carritoVacioContent.appendChild(icono);
        carritoVacioContent.appendChild(titulo);
        carritoVacioContent.appendChild(parrafo);
        carritoVacioContent.appendChild(enlace);
        
        carritoVacio.appendChild(carritoVacioContent);
        contenedorProductos.appendChild(carritoVacio);
    }
    
    if (resumenCarrito) {
        // Limpiar resumen de forma segura
        while (resumenCarrito.firstChild) {
            resumenCarrito.removeChild(resumenCarrito.firstChild);
        }
        
        const titulo = document.createElement('h3');
        titulo.textContent = 'Total de carrito';
        
        const subtotalItem = document.createElement('div');
        subtotalItem.className = 'summary-item';
        const subtotalSpan1 = document.createElement('span');
        subtotalSpan1.textContent = 'Subtotal';
        const subtotalSpan2 = document.createElement('span');
        subtotalSpan2.textContent = '$0';
        subtotalItem.appendChild(subtotalSpan1);
        subtotalItem.appendChild(subtotalSpan2);
        
        const totalItem = document.createElement('div');
        totalItem.className = 'summary-item total';
        const totalSpan1 = document.createElement('span');
        totalSpan1.textContent = 'Total';
        const totalSpan2 = document.createElement('span');
        totalSpan2.textContent = '$0';
        totalItem.appendChild(totalSpan1);
        totalItem.appendChild(totalSpan2);
        
        const boton = document.createElement('button');
        boton.className = 'checkout-btn disabled';
        boton.disabled = true;
        boton.textContent = 'Continuar';
        
        resumenCarrito.appendChild(titulo);
        resumenCarrito.appendChild(subtotalItem);
        resumenCarrito.appendChild(totalItem);
        resumenCarrito.appendChild(boton);
    }
}

function actualizarResumenCarrito(productos) {
    const resumenCarrito = document.querySelector('.order-summary');
    
    if (!resumenCarrito) return;
    
    const subtotal = productos.reduce((total, producto) => {
        const precioNumerico = extraerPrecioNumerico(producto.precio);
        return total + (precioNumerico * producto.cantidad);
    }, 0);
    
    const total = subtotal; // Por ahora sin impuestos ni envio
    
    // Limpiar resumen de forma segura
    while (resumenCarrito.firstChild) {
        resumenCarrito.removeChild(resumenCarrito.firstChild);
    }
    
    const titulo = document.createElement('h3');
    titulo.textContent = 'Total de carrito';
    
    const subtotalItem = document.createElement('div');
    subtotalItem.className = 'summary-item';
    const subtotalSpan1 = document.createElement('span');
    subtotalSpan1.textContent = 'Subtotal';
    const subtotalSpan2 = document.createElement('span');
    subtotalSpan2.textContent = `$${formatearPrecio(subtotal)}`;
    subtotalItem.appendChild(subtotalSpan1);
    subtotalItem.appendChild(subtotalSpan2);
    
    const totalItem = document.createElement('div');
    totalItem.className = 'summary-item total';
    const totalSpan1 = document.createElement('span');
    totalSpan1.textContent = 'Total';
    const totalSpan2 = document.createElement('span');
    totalSpan2.textContent = `$${formatearPrecio(total)}`;
    totalItem.appendChild(totalSpan1);
    totalItem.appendChild(totalSpan2);
    
    const boton = document.createElement('button');
    boton.className = 'checkout-btn';
    boton.setAttribute('data-carrito-action', 'proceder-checkout');
    boton.textContent = 'Continuar';
    
    resumenCarrito.appendChild(titulo);
    resumenCarrito.appendChild(subtotalItem);
    resumenCarrito.appendChild(totalItem);
    resumenCarrito.appendChild(boton);
}

// Funciones para manejar cambios en el carrito
function recargarCarrito() {
    // Pequeño delay para asegurar que el localStorage se haya actualizado
    setTimeout(() => {
        inicializarCarrito();
    }, 100);
}

// Configurar event listeners para actualizar la vista cuando cambie el carrito
document.addEventListener('DOMContentLoaded', () => {
    // Escuchar eventos personalizados del sistema de carrito
    document.addEventListener('carrito:actualizado', recargarCarrito);
    document.addEventListener('carrito:producto-eliminado', recargarCarrito);
});

// Funciones auxiliares
function extraerPrecioNumerico(precioString) {
    // Remover "$" y convertir a numero
    const precioLimpio = precioString.replace(/[$,.]/g, '');
    return parseInt(precioLimpio) || 0;
}

function formatearPrecio(precio) {
    return precio.toLocaleString('es-AR');
}

function capitalizarPrimeraLetra(texto) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Nota: la funcion inicializarCarrito ya esta exportada en la linea 4
