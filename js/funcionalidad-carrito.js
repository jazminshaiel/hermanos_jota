// Funcionalidad de la página del carrito - Hermanos Jota
// Variables y funciones en CamelCase, textos en español

document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrito();
});

function inicializarCarrito() {
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
    contenedorProductos.innerHTML = '';
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
    
    elemento.innerHTML = `
        <div class="item-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <div class="product-info">
                <span class="product-name">${producto.nombre}</span>
                <span class="product-category">${capitalizarPrimeraLetra(producto.categoria)}</span>
            </div>
        </div>
        <div class="item-precio">${producto.precio}</div>
        <div class="item-cantidad">
            <button class="btn-cantidad" onclick="cambiarCantidad(${producto.id}, -1)">
                <i class="fas fa-minus"></i>
            </button>
            <input type="number" value="${producto.cantidad}" min="1" 
                   class="quantity-input" 
                   onchange="actualizarCantidad(${producto.id}, this.value)">
            <button class="btn-cantidad" onclick="cambiarCantidad(${producto.id}, 1)">
                <i class="fas fa-plus"></i>
            </button>
        </div>
        <div class="item-subtotal">$${formatearPrecio(subtotal)}</div>
        <div class="item-remove">
            <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})" 
                    title="Eliminar producto">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return elemento;
}

function mostrarCarritoVacio() {
    const contenedorProductos = document.querySelector('.product-list');
    const resumenCarrito = document.querySelector('.order-summary');
    
    if (contenedorProductos) {
        contenedorProductos.innerHTML = `
            <div class="carrito-vacio">
                <div class="carrito-vacio-content">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Tu carrito está vacío</h3>
                    <p>No tienes productos en tu carrito de compras.</p>
                    <a href="productos.html" class="btn-continuar-comprando">
                        <i class="fas fa-arrow-left"></i>
                        Continuar comprando
                    </a>
                </div>
            </div>
        `;
    }
    
    if (resumenCarrito) {
        resumenCarrito.innerHTML = `
            <h3>Total de carrito</h3>
            <div class="summary-item">
                <span>Subtotal</span>
                <span>$0</span>
            </div>
            <div class="summary-item total">
                <span>Total</span>
                <span>$0</span>
            </div>
            <button class="checkout-btn disabled" disabled>
                Continuar
            </button>
        `;
    }
}

function actualizarResumenCarrito(productos) {
    const resumenCarrito = document.querySelector('.order-summary');
    
    if (!resumenCarrito) return;
    
    const subtotal = productos.reduce((total, producto) => {
        const precioNumerico = extraerPrecioNumerico(producto.precio);
        return total + (precioNumerico * producto.cantidad);
    }, 0);
    
    const total = subtotal; // Por ahora sin impuestos ni envío
    
    resumenCarrito.innerHTML = `
        <h3>Total de carrito</h3>
        <div class="summary-item">
            <span>Subtotal</span>
            <span>$${formatearPrecio(subtotal)}</span>
        </div>
        <div class="summary-item total">
            <span>Total</span>
            <span>$${formatearPrecio(total)}</span>
        </div>
        <button class="checkout-btn" onclick="procederAlCheckout()">
            Continuar
        </button>
    `;
}

// Funciones para manejar cambios en el carrito
function cambiarCantidad(idProducto, cambio) {
    if (typeof window.obtenerCarrito === 'function') {
        const productos = window.obtenerCarrito();
        const producto = productos.find(p => p.id === idProducto);
        
        if (producto) {
            const nuevaCantidad = producto.cantidad + cambio;
            if (nuevaCantidad > 0) {
                // Usar el sistema de carrito para actualizar
                if (typeof sistemaCarrito !== 'undefined') {
                    sistemaCarrito.actualizarCantidadProducto(idProducto, nuevaCantidad);
                    recargarCarrito();
                }
            }
        }
    }
}

function actualizarCantidad(idProducto, nuevaCantidad) {
    const cantidad = parseInt(nuevaCantidad);
    
    if (cantidad > 0 && typeof sistemaCarrito !== 'undefined') {
        sistemaCarrito.actualizarCantidadProducto(idProducto, cantidad);
        recargarCarrito();
    } else if (cantidad <= 0) {
        eliminarProducto(idProducto);
    }
}

function eliminarProducto(idProducto) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
        if (typeof sistemaCarrito !== 'undefined') {
            sistemaCarrito.removerProductoDelCarrito(idProducto);
            recargarCarrito();
        }
    }
}

function recargarCarrito() {
    // Pequeño delay para asegurar que el localStorage se haya actualizado
    setTimeout(() => {
        inicializarCarrito();
    }, 100);
}

function procederAlCheckout() {
    const productos = window.obtenerCarrito();
    
    if (productos.length === 0) {
        alert('Tu carrito está vacío. Añade algunos productos antes de continuar.');
        return;
    }
    
    // Redirigir a la página de envío
    window.location.href = 'carrito-envio.html';
}

// Funciones auxiliares
function extraerPrecioNumerico(precioString) {
    // Remover "$" y convertir a número
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

// Exponer funciones globalmente
window.cambiarCantidad = cambiarCantidad;
window.actualizarCantidad = actualizarCantidad;
window.eliminarProducto = eliminarProducto;
window.procederAlCheckout = procederAlCheckout;
