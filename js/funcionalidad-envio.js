// Funcionalidad de la pagina de envio - Hermanos Jota
// Variables y funciones en CamelCase, textos en español

export function inicializarPaginaEnvio() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarPaginaEnvio);
        return;
    }
    
    // Verificar si el sistema de carrito está disponible
    if (typeof window.obtenerCarrito === 'function') {
        const productosEnCarrito = window.obtenerCarrito();
        
        if (productosEnCarrito.length === 0) {
            mostrarCarritoVacioEnvio();
            return;
        }
        
        mostrarProductosEnvio(productosEnCarrito);
        actualizarResumenEnvio(productosEnCarrito);
        configurarFormularioEnvio();
    } else {
        mostrarCarritoVacioEnvio();
    }
}

function mostrarProductosEnvio(productos) {
    const contenedorProductos = document.querySelector('.order-summary');
    
    if (!contenedorProductos) {
        console.error('Contenedor de productos de envio no encontrado');
        return;
    }

    // Limpiar contenido existente de forma segura
    while (contenedorProductos.firstChild) {
        contenedorProductos.removeChild(contenedorProductos.firstChild);
    }

    // Mostrar cada producto
    productos.forEach(producto => {
        const elementoProducto = crearElementoProductoEnvio(producto);
        contenedorProductos.appendChild(elementoProducto);
    });

    // Aniadir separador antes de los totales
    const separador = document.createElement('div');
    separador.className = 'summary-separator';
    const hr = document.createElement('hr');
    separador.appendChild(hr);
    contenedorProductos.appendChild(separador);
}

function crearElementoProductoEnvio(producto) {
    const elemento = document.createElement('div');
    elemento.className = 'summary-item producto-item';
    
    const productoInfo = document.createElement('div');
    productoInfo.className = 'producto-envio-info';
    
    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;
    img.className = 'producto-envio-imagen';
    
    const details = document.createElement('div');
    details.className = 'producto-envio-details';
    
    const nombre = document.createElement('span');
    nombre.className = 'producto-envio-nombre';
    nombre.textContent = producto.nombre;
    
    const cantidad = document.createElement('span');
    cantidad.className = 'producto-envio-cantidad';
    cantidad.textContent = `Cantidad: ${producto.cantidad}`;
    
    const precio = document.createElement('span');
    precio.className = 'producto-envio-precio';
    precio.textContent = producto.precio;
    
    details.appendChild(nombre);
    details.appendChild(cantidad);
    details.appendChild(precio);
    
    productoInfo.appendChild(img);
    productoInfo.appendChild(details);
    
    elemento.appendChild(productoInfo);
    
    return elemento;
}

function actualizarResumenEnvio(productos) {
    const contenedorProductos = document.querySelector('.order-summary');
    
    if (!contenedorProductos) return;
    
    const subtotal = productos.reduce((total, producto) => {
        const precioNumerico = extraerPrecioNumerico(producto.precio);
        return total + (precioNumerico * producto.cantidad);
    }, 0);
    
    const costoEnvio = 0; // Por ahora sin costo de envio
    const total = subtotal + costoEnvio;
    
    // Crear elementos de resumen
    const subtotalElement = document.createElement('div');
    subtotalElement.className = 'summary-item';
    const subtotalSpan1 = document.createElement('span');
    subtotalSpan1.textContent = 'Subtotal';
    const subtotalSpan2 = document.createElement('span');
    subtotalSpan2.textContent = `$${formatearPrecio(subtotal)}`;
    subtotalElement.appendChild(subtotalSpan1);
    subtotalElement.appendChild(subtotalSpan2);
    
    const envioElement = document.createElement('div');
    envioElement.className = 'summary-item';
    const envioSpan1 = document.createElement('span');
    envioSpan1.textContent = 'Envio';
    const envioSpan2 = document.createElement('span');
    envioSpan2.textContent = `$${formatearPrecio(costoEnvio)}`;
    envioElement.appendChild(envioSpan1);
    envioElement.appendChild(envioSpan2);
    
    const totalElement = document.createElement('div');
    totalElement.className = 'summary-item total';
    const totalSpan1 = document.createElement('span');
    totalSpan1.textContent = 'Total';
    const totalSpan2 = document.createElement('span');
    totalSpan2.textContent = `$${formatearPrecio(total)}`;
    totalElement.appendChild(totalSpan1);
    totalElement.appendChild(totalSpan2);
    
    contenedorProductos.appendChild(subtotalElement);
    contenedorProductos.appendChild(envioElement);
    contenedorProductos.appendChild(totalElement);
}

function mostrarCarritoVacioEnvio() {
    const contenedorProductos = document.querySelector('.order-summary');
    const botonFinalizar = document.querySelector('.checkout-btn');
    
    if (contenedorProductos) {
        // Limpiar contenedor de forma segura
        while (contenedorProductos.firstChild) {
            contenedorProductos.removeChild(contenedorProductos.firstChild);
        }
        
        const carritoVacioEnvio = document.createElement('div');
        carritoVacioEnvio.className = 'carrito-vacio-envio';
        
        const icono = document.createElement('i');
        icono.className = 'fas fa-shopping-cart';
        
        const titulo = document.createElement('h3');
        titulo.textContent = 'Tu carrito esta vacio';
        
        const parrafo = document.createElement('p');
        parrafo.textContent = 'No tienes productos para enviar.';
        
        const enlace = document.createElement('a');
        enlace.href = 'productos.html';
        enlace.className = 'btn-continuar-comprando';
        
        const iconoEnlace = document.createElement('i');
        iconoEnlace.className = 'fas fa-arrow-left';
        enlace.appendChild(iconoEnlace);
        enlace.appendChild(document.createTextNode(' Continuar comprando'));
        
        carritoVacioEnvio.appendChild(icono);
        carritoVacioEnvio.appendChild(titulo);
        carritoVacioEnvio.appendChild(parrafo);
        carritoVacioEnvio.appendChild(enlace);
        
        contenedorProductos.appendChild(carritoVacioEnvio);
    }
    
    if (botonFinalizar) {
        botonFinalizar.disabled = true;
        botonFinalizar.textContent = 'Carrito vacio';
        botonFinalizar.classList.add('disabled');
    }
}

function configurarFormularioEnvio() {
    const botonFinalizar = document.querySelector('.checkout-btn');
    
    if (botonFinalizar) {
        botonFinalizar.setAttribute('data-carrito-action', 'procesar-pedido');
    }
}

function procesarPedido() {
    const productos = window.obtenerCarrito();
    
    if (productos.length === 0) {
        alert('Tu carrito esta vacio. Aniade algunos productos antes de continuar.');
        return;
    }
    
    // Validar formulario
    if (!validarFormularioEnvio()) {
        return;
    }
    
    // Obtener datos del formulario
    const datosEnvio = obtenerDatosFormulario();
    
    // Simular procesamiento del pedido
    mostrarConfirmacionPedido(productos, datosEnvio);
}

function validarFormularioEnvio() {
    const camposRequeridos = [
        'nombre',
        'apellido', 
        'email',
        'telefono',
        'direccion',
        'ciudad',
        'codigo-postal'
    ];
    
    let formularioValido = true;
    
    camposRequeridos.forEach(campo => {
        const input = document.getElementById(campo);
        if (input && !input.value.trim()) {
            input.classList.add('error');
            formularioValido = false;
        } else if (input) {
            input.classList.remove('error');
        }
    });
    
    if (!formularioValido) {
        alert('Por favor, completa todos los campos requeridos.');
    }
    
    return formularioValido;
}

function obtenerDatosFormulario() {
    return {
        nombre: document.getElementById('nombre')?.value || '',
        apellido: document.getElementById('apellido')?.value || '',
        email: document.getElementById('email')?.value || '',
        telefono: document.getElementById('telefono')?.value || '',
        direccion: document.getElementById('direccion')?.value || '',
        ciudad: document.getElementById('ciudad')?.value || '',
        codigoPostal: document.getElementById('codigo-postal')?.value || '',
        informacionAdicional: document.getElementById('informacion-adicional')?.value || ''
    };
}

function mostrarConfirmacionPedido(productos, datosEnvio) {
    const total = productos.reduce((sum, producto) => {
        const precioNumerico = extraerPrecioNumerico(producto.precio);
        return sum + (precioNumerico * producto.cantidad);
    }, 0);
    
    const mensaje = `
        ¡Pedido confirmado!
        
        Productos: ${productos.length}
        Total: $${formatearPrecio(total)}
        
        Los datos de envio han sido registrados.
        Te contactaremos pronto para coordinar la entrega.
    `;
    
    alert(mensaje);
    
    // Limpiar carrito despues de confirmar pedido
    if (typeof window.limpiarCarrito === 'function') {
        window.limpiarCarrito();
    }
    
    // Redirigir a pagina de inicio
    window.location.href = 'index.html';
}

// Funciones auxiliares
function extraerPrecioNumerico(precioString) {
    const precioLimpio = precioString.replace(/[$,.]/g, '');
    return parseInt(precioLimpio) || 0;
}

function formatearPrecio(precio) {
    return precio.toLocaleString('es-AR');
}

// Exportar funciones para uso en otros modulos
export { procesarPedido };
