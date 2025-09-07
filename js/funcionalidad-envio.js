// Funcionalidad de la página de envío - Hermanos Jota
// Variables y funciones en CamelCase, textos en español

document.addEventListener('DOMContentLoaded', function() {
    inicializarPaginaEnvio();
});

function inicializarPaginaEnvio() {
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
        console.error('Contenedor de productos de envío no encontrado');
        return;
    }

    // Limpiar contenido existente
    contenedorProductos.innerHTML = '';

    // Mostrar cada producto
    productos.forEach(producto => {
        const elementoProducto = crearElementoProductoEnvio(producto);
        contenedorProductos.appendChild(elementoProducto);
    });

    // Añadir separador antes de los totales
    const separador = document.createElement('div');
    separador.className = 'summary-separator';
    separador.innerHTML = '<hr>';
    contenedorProductos.appendChild(separador);
}

function crearElementoProductoEnvio(producto) {
    const elemento = document.createElement('div');
    elemento.className = 'summary-item producto-item';
    
    elemento.innerHTML = `
        <div class="producto-envio-info">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-envio-imagen">
            <div class="producto-envio-details">
                <span class="producto-envio-nombre">${producto.nombre}</span>
                <span class="producto-envio-cantidad">Cantidad: ${producto.cantidad}</span>
                <span class="producto-envio-precio">${producto.precio}</span>
            </div>
        </div>
    `;
    
    return elemento;
}

function actualizarResumenEnvio(productos) {
    const contenedorProductos = document.querySelector('.order-summary');
    
    if (!contenedorProductos) return;
    
    const subtotal = productos.reduce((total, producto) => {
        const precioNumerico = extraerPrecioNumerico(producto.precio);
        return total + (precioNumerico * producto.cantidad);
    }, 0);
    
    const costoEnvio = 0; // Por ahora sin costo de envío
    const total = subtotal + costoEnvio;
    
    // Crear elementos de resumen
    const subtotalElement = document.createElement('div');
    subtotalElement.className = 'summary-item';
    subtotalElement.innerHTML = `
        <span>Subtotal</span>
        <span>$${formatearPrecio(subtotal)}</span>
    `;
    
    const envioElement = document.createElement('div');
    envioElement.className = 'summary-item';
    envioElement.innerHTML = `
        <span>Envío</span>
        <span>$${formatearPrecio(costoEnvio)}</span>
    `;
    
    const totalElement = document.createElement('div');
    totalElement.className = 'summary-item total';
    totalElement.innerHTML = `
        <span>Total</span>
        <span>$${formatearPrecio(total)}</span>
    `;
    
    contenedorProductos.appendChild(subtotalElement);
    contenedorProductos.appendChild(envioElement);
    contenedorProductos.appendChild(totalElement);
}

function mostrarCarritoVacioEnvio() {
    const contenedorProductos = document.querySelector('.order-summary');
    const botonFinalizar = document.querySelector('.checkout-btn');
    
    if (contenedorProductos) {
        contenedorProductos.innerHTML = `
            <div class="carrito-vacio-envio">
                <i class="fas fa-shopping-cart"></i>
                <h3>Tu carrito está vacío</h3>
                <p>No tienes productos para enviar.</p>
                <a href="productos.html" class="btn-continuar-comprando">
                    <i class="fas fa-arrow-left"></i>
                    Continuar comprando
                </a>
            </div>
        `;
    }
    
    if (botonFinalizar) {
        botonFinalizar.disabled = true;
        botonFinalizar.textContent = 'Carrito vacío';
        botonFinalizar.classList.add('disabled');
    }
}

function configurarFormularioEnvio() {
    const formulario = document.querySelector('form');
    const botonFinalizar = document.querySelector('.checkout-btn');
    
    if (formulario && botonFinalizar) {
        botonFinalizar.addEventListener('click', function(event) {
            event.preventDefault();
            procesarPedido();
        });
    }
}

function procesarPedido() {
    const productos = window.obtenerCarrito();
    
    if (productos.length === 0) {
        alert('Tu carrito está vacío. Añade algunos productos antes de continuar.');
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
        
        Los datos de envío han sido registrados.
        Te contactaremos pronto para coordinar la entrega.
    `;
    
    alert(mensaje);
    
    // Limpiar carrito después de confirmar pedido
    if (typeof window.limpiarCarrito === 'function') {
        window.limpiarCarrito();
    }
    
    // Redirigir a página de inicio
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

// Exponer funciones globalmente
window.procesarPedido = procesarPedido;
