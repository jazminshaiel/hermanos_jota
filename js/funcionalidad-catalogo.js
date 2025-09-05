let productos = [];
let busquedaActiva = false;
let productosFiltrados = [];
let terminoBuscado = '';

// Cargar datos desde el archivo externo
function inicializarProductos() {
  if (typeof productosData !== 'undefined') {
    productos = [...productosData];
    productosFiltrados = [...productos];
  } else {
    console.error('Error: No se pudieron cargar los datos de productos');
  }
}

function crearCartaProducto(producto) {
  return `
    <a href="detalle-producto.html?id=${producto.id}" class="carta-producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="info-producto">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <span class="precio-producto">${producto.precio}</span>
        </div>
    </a>
  `;
}

function mostrarProductos(productosAMostrar) {
  const contenedor = document.getElementById("contenedorProductos");
  
  if (!contenedor) {
    console.error('Contenedor de productos no encontrado');
    return;
  }
  
  // Limpiamos contenido anterior
  contenedor.innerHTML = "";
  
  if (productosAMostrar.length === 0) {
    contenedor.innerHTML = `
      <div class="no-results">
        <div style="margin-bottom: 1rem;">
          <i class="fas fa-search" style="font-size: 3rem; color: #ccc;"></i>
        </div>
        <h3 style="margin-bottom: 1rem; color: #333;">No se encontraron productos</h3>
        ${terminoBuscado ? `<p style="margin-bottom: 0.5rem; color: #666;">No hay resultados para "<strong style="color: #a0522d;">${terminoBuscado}</strong>"</p>` : ''}
        <p style="color: #888; font-size: 0.9rem;">Intenta con otros términos como "mesa", "silla", "sofá" o el nombre de una región</p>
        <button onclick="limpiarBusqueda();" 
                style="margin-top: 1rem; padding: 8px 16px; background: #a0522d; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Mostrar todos los productos
        </button>
      </div>
    `;
    return;
  }

  let html = "";
  productosAMostrar.forEach((producto) => {
    html += crearCartaProducto(producto);
  });
  contenedor.innerHTML = html;
}

// Función para simular la carga asíncrona de datos con una Promesa
function cargarProductosAsync() {
  const contenedor = document.getElementById("contenedorProductos");
  if (contenedor) {
    contenedor.innerHTML = '<div class="cargando">Cargando productos...</div>';
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 1500); // 1.5s delay
  });
}

function aplicarBusqueda(termino) {
  if (termino) {
    productosFiltrados = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(termino) ||
        producto.descripcion.toLowerCase().includes(termino) ||
        (producto.categoria && producto.categoria.toLowerCase().includes(termino))
    );
  } else {
    productosFiltrados = [...productos]; // Crear nueva copia
    terminoBuscado = '';
  }

  busquedaActiva = false;
  mostrarProductos(productosFiltrados)
}

// Función separada para la lógica de búsqueda
function realizarBusqueda(termino) {
  if (termino) {
    productosFiltrados = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(termino) ||
        producto.descripcion.toLowerCase().includes(termino)
    );
  } else {
    productosFiltrados = [...productos]; // Crear nueva copia
  }

  busquedaActiva = false;
  mostrarProductos(productosFiltrados);
}

// Función para limpiar búsqueda
function limpiarBusqueda() {
  const busquedaInput = document.getElementById("busquedaInput");
  if (busquedaInput) {
    busquedaInput.value = "";
    aplicarBusqueda("");
    busquedaInput.focus();
  }
}

// Función para estadísticas de búsqueda
function mostrarEstadisticas(cantidad, total, termino) {
  console.log(`Búsqueda: "${termino}" - ${cantidad} de ${total} productos encontrados`);
}

//Eventos de "escucha"
document.addEventListener("DOMContentLoaded", () => {
  inicializarProductos();
  
  if (productos.length > 0) {
    cargarProductosAsync().then((data) => {
      mostrarProductos(data);
    });
  }
  
  // Configurar eventos de búsqueda
  configurarEventosBusqueda();
});

function configurarEventosBusqueda() {
  const busquedaInput = document.getElementById("busquedaInput");
  const busquedaButton = document.querySelector(".btn-busqueda");

  if (busquedaButton) {
    busquedaButton.addEventListener("click", (event) => {
      event.preventDefault();
      const termino = busquedaInput ? busquedaInput.value.toLowerCase().trim() : '';
      aplicarBusqueda(termino);

      if (termino) {
        mostrarEstadisticas(productosFiltrados.length, productos.length, termino);
      }
    });

    if (busquedaInput) {
    busquedaInput.addEventListener("input", (event) => {
      // Limpiar timeout anterior para evitar búsquedas innecesarias
      clearTimeout(busquedaInput.searchTimeout);
      const termino = busquedaInput.value.toLowerCase().trim();

      if (busquedaActiva) return;
      
      busquedaInput.searchTimeout = setTimeout(() => {
        aplicarBusqueda(termino);
      }, 300); // 300ms de delay
    });
  }

busquedaButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevención del comportamiento por defecto
  const termino = busquedaInput.value.toLowerCase().trim();
  aplicarBusqueda(termino);

  if (termino) {
    mostrarEstadisticas(productosFiltrados.length, productos.length, termino);
  }
});

busquedaInput.addEventListener("input", (event) => {
  // Limpiar timeout anterior para evitar búsquedas innecesarias
  clearTimeout(busquedaInput.searchTimeout);
  const termino = busquedaInput.value.toLowerCase().trim();

  if (busquedaActiva) return;
  
  busquedaInput.searchTimeout = setTimeout(() => {
    aplicarBusqueda(termino);
  }, 300); // 300ms de delay
});

busquedaInput.addEventListener("keydown", (event) => {
      switch(event.key) {
        case "Enter":
          event.preventDefault();
          clearTimeout(busquedaInput.searchTimeout);
          const termino = busquedaInput.value.toLowerCase().trim();
          aplicarBusqueda(termino);
          break;
          
        case "Escape":
          event.preventDefault();
          limpiarBusqueda();
          break;
          
        default:
          // No hacer nada para otras teclas
          break;
      }
    });
  }
}

// Exponer función globalmente para uso en HTML
window.aplicarBusqueda = aplicarBusqueda;
window.limpiarBusqueda = limpiarBusqueda;
