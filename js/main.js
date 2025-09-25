// Main.js - Punto de entrada principal para Hermanos Jota
// Usa módulos ES6 para una mejor organización del código
/* centraliza la inicialización y coordinación de todos los módulos del carrito, 
reemplazando la necesidad de cargar múltiples archivos JS en cada HTML. */

// Importar el sistema de carrito (debe estar disponible globalmente)
import { SistemaCarrito } from './sistema-carrito.js';

// Importar funcionalidades específicas según la página
import { inicializarCarrito } from './funcionalidad-carrito.js';
import { inicializarPaginaEnvio } from './funcionalidad-envio.js';

// Crear instancia del sistema de carrito (sin exponer globalmente)
const sistemaCarrito = new SistemaCarrito();

// Exponer funciones globalmente para compatibilidad con código existente
window.añadirAlCarrito = (producto, cantidad = 1) => {
    console.log('Añadiendo producto al carrito:', producto.nombre);
    sistemaCarrito.aniadirProductoAlCarrito(producto, cantidad);
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

// Sistema de eventos personalizados para comunicación entre módulos
class EventManager {
    static emit(eventName, data) {
        const event = new CustomEvent(eventName, { detail: data });
        document.dispatchEvent(event);
    }
    
    static on(eventName, callback) {
        document.addEventListener(eventName, callback);
    }
    
    static off(eventName, callback) {
        document.removeEventListener(eventName, callback);
    }
}

// Configurar event listeners para el sistema de carrito
EventManager.on('carrito:aniadir', (event) => {
    const { producto, cantidad } = event.detail;
    sistemaCarrito.aniadirProductoAlCarrito(producto, cantidad);
});

EventManager.on('carrito:obtener', (event) => {
    const carrito = sistemaCarrito.obtenerProductosCarrito();
    EventManager.emit('carrito:obtenido', { carrito });
});

EventManager.on('carrito:limpiar', () => {
    sistemaCarrito.limpiarCarrito();
});

EventManager.on('carrito:actualizar-contador', () => {
    sistemaCarrito.actualizarContadorCarrito();
});

EventManager.on('carrito:actualizar-cantidad', (event) => {
    const { idProducto, nuevaCantidad, cambio } = event.detail;
    
    if (cambio) {
        // Cambio relativo (+1, -1)
        const productos = sistemaCarrito.obtenerProductosCarrito();
        const producto = productos.find(p => p.id === idProducto);
        if (producto) {
            const cantidad = producto.cantidad + cambio;
            if (cantidad > 0) {
                sistemaCarrito.actualizarCantidadProducto(idProducto, cantidad);
                EventManager.emit('carrito:actualizado');
            }
        }
    } else {
        // Cantidad absoluta
        if (nuevaCantidad > 0) {
            sistemaCarrito.actualizarCantidadProducto(idProducto, nuevaCantidad);
            EventManager.emit('carrito:actualizado');
        } else {
            sistemaCarrito.removerProductoDelCarrito(idProducto);
            EventManager.emit('carrito:producto-eliminado');
        }
    }
});

EventManager.on('carrito:remover', (event) => {
    const { idProducto } = event.detail;
    if (confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
        sistemaCarrito.removerProductoDelCarrito(idProducto);
        EventManager.emit('carrito:producto-eliminado');
    }
});

// Configurar delegación de eventos para botones en HTML
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Configurar delegación de eventos para botones del carrito
    document.addEventListener('click', (event) => {
        const target = event.target.closest('[data-carrito-action]');
        if (!target) return;
        
        event.preventDefault();
        
        const action = target.dataset.carritoAction;
        const productId = target.dataset.productId ? parseInt(target.dataset.productId) : null;
        
        switch(action) {
            case 'aniadir':
                // Este evento se maneja en el sistema de carrito existente
                break;
            case 'cambiar-cantidad':
                const cambio = parseInt(target.dataset.cambio);
                if (productId && !isNaN(cambio)) {
                    EventManager.emit('carrito:actualizar-cantidad', { 
                        idProducto: productId, 
                        nuevaCantidad: 'cambio',
                        cambio: cambio 
                    });
                }
                break;
            case 'actualizar-cantidad':
                const cantidad = parseInt(target.value);
                if (productId && !isNaN(cantidad)) {
                    EventManager.emit('carrito:actualizar-cantidad', { 
                        idProducto: productId, 
                        nuevaCantidad: cantidad 
                    });
                }
                break;
            case 'eliminar':
                if (productId) {
                    EventManager.emit('carrito:remover', { idProducto: productId });
                }
                break;
            case 'proceder-checkout':
                window.location.href = 'carrito-envio.html';
                break;
            case 'procesar-pedido':
                // Importar y ejecutar la función de procesar pedido
                import('./funcionalidad-envio.js').then(({ procesarPedido }) => {
                    procesarPedido();
                });
                break;
        }
    });
    
    // Inicializar funcionalidades según la página actual
    switch(currentPage) {
        case 'carrito.html':
            inicializarCarrito();
            break;
        case 'carrito-envio.html':
            inicializarPaginaEnvio();
            break;
        default:
            // Para otras páginas, solo inicializar el sistema de carrito
            console.log('Sistema de carrito inicializado para:', currentPage);
            // Asegurar que el contador se actualice
            sistemaCarrito.actualizarContadorCarrito();
            break;
    }
});

// Exportar para uso en otros módulos
export { sistemaCarrito, EventManager };
