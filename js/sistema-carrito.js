// Sistema de Carrito de Compras - Hermanos Jota
// Variables y funciones en CamelCase, textos en español

class SistemaCarrito {
    constructor() {
        this.productosEnCarrito = this.obtenerCarritoDesdeLocalStorage();
        this.actualizarContadorCarrito();
        this.configurarEventos();
    }

    // Obtener carrito desde localStorage
    obtenerCarritoDesdeLocalStorage() {
        try {
            const carritoGuardado = localStorage.getItem('carritoHermanosJota');
            return carritoGuardado ? JSON.parse(carritoGuardado) : [];
        } catch (error) {
            console.error('Error al cargar carrito desde localStorage:', error);
            return [];
        }
    }

    // Guardar carrito en localStorage
    guardarCarritoEnLocalStorage() {
        try {
            localStorage.setItem('carritoHermanosJota', JSON.stringify(this.productosEnCarrito));
        } catch (error) {
            console.error('Error al guardar carrito en localStorage:', error);
        }
    }

    // Añadir producto al carrito
    añadirProductoAlCarrito(producto, cantidad = 1) {
        const productoExistente = this.productosEnCarrito.find(item => item.id === producto.id);
        
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            this.productosEnCarrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                descripcion: producto.descripcion,
                categoria: producto.categoria,
                cantidad: cantidad
            });
        }
        
        this.guardarCarritoEnLocalStorage();
        this.actualizarContadorCarrito();
        this.mostrarNotificacionAñadido(producto.nombre);
    }

    // Remover producto del carrito
    removerProductoDelCarrito(idProducto) {
        this.productosEnCarrito = this.productosEnCarrito.filter(item => item.id !== idProducto);
        this.guardarCarritoEnLocalStorage();
        this.actualizarContadorCarrito();
    }

    // Actualizar cantidad de producto en carrito
    actualizarCantidadProducto(idProducto, nuevaCantidad) {
        const producto = this.productosEnCarrito.find(item => item.id === idProducto);
        if (producto) {
            if (nuevaCantidad <= 0) {
                this.removerProductoDelCarrito(idProducto);
            } else {
                producto.cantidad = nuevaCantidad;
                this.guardarCarritoEnLocalStorage();
                this.actualizarContadorCarrito();
            }
        }
    }

    // Obtener cantidad total de productos en carrito
    obtenerCantidadTotalProductos() {
        return this.productosEnCarrito.reduce((total, item) => total + item.cantidad, 0);
    }

    // Obtener precio total del carrito
    obtenerPrecioTotalCarrito() {
        return this.productosEnCarrito.reduce((total, item) => {
            // Extraer número del precio (asumiendo formato "$XX.XXX")
            const precioNumerico = this.extraerPrecioNumerico(item.precio);
            return total + (precioNumerico * item.cantidad);
        }, 0);
    }

    // Extraer precio numérico del string de precio
    extraerPrecioNumerico(precioString) {
        // Remover "$" y convertir a número
        const precioLimpio = precioString.replace(/[$,.]/g, '');
        return parseInt(precioLimpio) || 0;
    }

    // Actualizar contador en la barra de navegación
    actualizarContadorCarrito() {
        const contadorCarrito = document.getElementById('contadorCarrito');
        const cantidadTotal = this.obtenerCantidadTotalProductos();
        
        if (contadorCarrito) {
            contadorCarrito.textContent = cantidadTotal;
            contadorCarrito.style.display = cantidadTotal > 0 ? 'block' : 'none';
        }
    }

    // Mostrar notificación de producto añadido
    mostrarNotificacionAñadido(nombreProducto) {
        // Crear notificación temporal
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion-carrito';
        notificacion.innerHTML = `
            <div class="notificacion-contenido">
                <i class="fas fa-check-circle"></i>
                <span>${nombreProducto} añadido al carrito</span>
            </div>
        `;
        
        // Estilos para la notificación
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
        `;
        
        document.body.appendChild(notificacion);
        
        // Animar entrada
        setTimeout(() => {
            notificacion.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notificacion.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.parentNode.removeChild(notificacion);
                }
            }, 300);
        }, 3000);
    }

    // Configurar eventos globales
    configurarEventos() {
        // Evento para botones de "Añadir al carrito"
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('boton-carrito') || 
                event.target.closest('.boton-carrito')) {
                event.preventDefault();
                this.manejarClickAñadirCarrito(event);
            }
        });
    }

    // Manejar click en botón añadir al carrito
    manejarClickAñadirCarrito(event) {
        const boton = event.target.classList.contains('boton-carrito') ? 
                     event.target : event.target.closest('.boton-carrito');
        
        // Obtener información del producto desde el contexto
        const producto = this.obtenerInformacionProductoDesdeContexto(boton);
        
        if (producto) {
            this.añadirProductoAlCarrito(producto);
        } else {
            console.error('No se pudo obtener información del producto');
            alert('Error: No se pudo añadir el producto al carrito');
        }
    }

    // Obtener información del producto desde el contexto del botón
    obtenerInformacionProductoDesdeContexto(boton) {
        // Buscar en diferentes contextos según la página
        let producto = null;
        
        // Contexto de página de producto individual
        const tituloProducto = document.querySelector('.producto-info h1');
        const precioProducto = document.querySelector('.producto-info .precio');
        const imagenProducto = document.querySelector('.producto-imagen img');
        const descripcionProducto = document.querySelector('.producto-info .descripcion');
        
        if (tituloProducto && precioProducto) {
            // Obtener ID del producto desde la URL
            const params = new URLSearchParams(window.location.search);
            const idProducto = parseInt(params.get("id"));
            
            if (idProducto && typeof productosData !== 'undefined') {
                producto = productosData.find(p => p.id === idProducto);
            }
        }
        
        // Contexto de catálogo de productos
        if (!producto) {
            const cartaProducto = boton.closest('.carta-producto');
            if (cartaProducto) {
                const enlaceProducto = cartaProducto.getAttribute('href');
                const match = enlaceProducto.match(/id=(\d+)/);
                if (match && typeof productosData !== 'undefined') {
                    const idProducto = parseInt(match[1]);
                    producto = productosData.find(p => p.id === idProducto);
                }
            }
        }
        
        return producto;
    }

    // Obtener todos los productos del carrito
    obtenerProductosCarrito() {
        return this.productosEnCarrito;
    }

    // Limpiar carrito completamente
    limpiarCarrito() {
        this.productosEnCarrito = [];
        this.guardarCarritoEnLocalStorage();
        this.actualizarContadorCarrito();
    }

    // Verificar si un producto está en el carrito
    estaProductoEnCarrito(idProducto) {
        return this.productosEnCarrito.some(item => item.id === idProducto);
    }

    // Obtener cantidad de un producto específico en el carrito
    obtenerCantidadProductoEnCarrito(idProducto) {
        const producto = this.productosEnCarrito.find(item => item.id === idProducto);
        return producto ? producto.cantidad : 0;
    }
}

// Crear instancia global del sistema de carrito
const sistemaCarrito = new SistemaCarrito();

// Exponer funciones globalmente para uso en otras páginas
window.añadirAlCarrito = (producto, cantidad = 1) => {
    sistemaCarrito.añadirProductoAlCarrito(producto, cantidad);
};

window.obtenerCarrito = () => {
    return sistemaCarrito.obtenerProductosCarrito();
};

window.limpiarCarrito = () => {
    sistemaCarrito.limpiarCarrito();
};

window.actualizarContadorCarrito = () => {
    sistemaCarrito.actualizarContadorCarrito();
};
