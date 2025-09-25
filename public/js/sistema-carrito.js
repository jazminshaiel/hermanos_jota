// Sistema de Carrito de Compras - Hermanos Jota
// Variables y funciones en CamelCase, textos en espanol

export class SistemaCarrito {
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

    // Aniadir producto al carrito
    aniadirProductoAlCarrito(producto, cantidad = 1) {
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
        this.mostrarNotificacionAniadido(producto.nombre);
        
        // Emitir evento de actualización
        document.dispatchEvent(new CustomEvent('carrito:actualizado'));
    }

    // Remover producto del carrito
    removerProductoDelCarrito(idProducto) {
        this.productosEnCarrito = this.productosEnCarrito.filter(item => item.id !== idProducto);
        this.guardarCarritoEnLocalStorage();
        this.actualizarContadorCarrito();
        
        // Emitir evento de producto eliminado
        document.dispatchEvent(new CustomEvent('carrito:producto-eliminado'));
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
                
                // Emitir evento de actualización
                document.dispatchEvent(new CustomEvent('carrito:actualizado'));
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
            // Extraer numero del precio (asumiendo formato "$XX.XXX")
            const precioNumerico = this.extraerPrecioNumerico(item.precio);
            return total + (precioNumerico * item.cantidad);
        }, 0);
    }

    // Extraer precio numerico del string de precio
    extraerPrecioNumerico(precioString) {
        // Remover "$" y convertir a numero
        const precioLimpio = precioString.replace(/[$,.]/g, '');
        return parseInt(precioLimpio) || 0;
    }

    // Actualizar contador en la barra de navegacion
    actualizarContadorCarrito() {
        const contadorCarrito = document.getElementById('contadorCarrito');
        const cantidadTotal = this.obtenerCantidadTotalProductos();
        
        if (contadorCarrito) {
            contadorCarrito.textContent = cantidadTotal;
            contadorCarrito.style.display = cantidadTotal > 0 ? 'block' : 'none';
        }
    }

    // Mostrar notificacion de producto aniadido
    mostrarNotificacionAniadido(nombreProducto) {
        console.log('Mostrando notificación para:', nombreProducto);
        // Crear notificacion temporal
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion-carrito';
        
        // Crear contenido de la notificacion de forma segura
        const contenido = document.createElement('div');
        contenido.className = 'notificacion-contenido';
        
        const icono = document.createElement('i');
        icono.className = 'fas fa-check-circle';
        
        const texto = document.createElement('span');
        texto.textContent = `${nombreProducto} aniadido al carrito`;
        
        contenido.appendChild(icono);
        contenido.appendChild(texto);
        notificacion.appendChild(contenido);
        
        // Estilos para la notificacion
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
        
        // Remover despues de 3 segundos
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
        // Evento para botones de "Aniadir al carrito"
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('boton-carrito') || 
                event.target.closest('.boton-carrito')) {
                event.preventDefault();
                this.manejarClickAniadirCarrito(event);
            }
        });
    }

    // Manejar click en boton aniadir al carrito
    manejarClickAniadirCarrito(event) {
        const boton = event.target.classList.contains('boton-carrito') ? 
                     event.target : event.target.closest('.boton-carrito');
        
        // Obtener informacion del producto desde el contexto
        const producto = this.obtenerInformacionProductoDesdeContexto(boton);
        
        if (producto) {
            this.aniadirProductoAlCarrito(producto);
        } else {
            console.error('No se pudo obtener informacion del producto');
                alert('Error: No se pudo aniadir el producto al carrito');
        }
    }

    // Obtener informacion del producto desde el contexto del boton
    obtenerInformacionProductoDesdeContexto(boton) {
        // Buscar en diferentes contextos segun la pagina
        let producto = null;
        
        // Contexto de pagina de producto individual
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
        
        // Contexto de catalogo de productos
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

    // Verificar si un producto esta en el carrito
    estaProductoEnCarrito(idProducto) {
        return this.productosEnCarrito.some(item => item.id === idProducto);
    }

    // Obtener cantidad de un producto especifico en el carrito
    obtenerCantidadProductoEnCarrito(idProducto) {
        const producto = this.productosEnCarrito.find(item => item.id === idProducto);
        return producto ? producto.cantidad : 0;
    }
}

// Nota: La instancia global ahora se crea en main.js
// para mantener la compatibilidad con el codigo existente
