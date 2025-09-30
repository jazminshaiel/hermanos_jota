let productos = [];
let productosFiltrados = [];
let terminoBuscado = "";
let categoriaSeleccionada = "todos"; //  Variable para filtro de categoría
let imageObserver; // Intersection Observer para lazy loading de imágenes

// Función principal: cargar productos desde el backend
async function cargarProductosDesdeAPI() {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = `
	<div class="cargando" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
	<p>Cargando productos...</p>
	</div>
	`;

  try {
    const response = await fetch("/api/productos");

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: Error en la respuesta del servidor`
      );
    }
    const data = await response.json();

    // Normalizar productos (fallback de imagen y texto)
    productos = data.map((producto) => ({
      ...producto,
      imagen:
        producto.imagen?.trim() ||
        "https://jazminshaiel.github.io/hermanos_jota/img/placeholder.png",
      nombre: producto.nombre?.trim() || "Producto sin nombre",
      descripcion: producto.descripcion?.trim() || "Sin descripción disponible",
      categoria: producto.categoria?.toLowerCase()?.trim() || "sin-categoria",
      id: parseInt(producto.id),
    }));

	generarOpcionesCategorias(); // Genera las categorías en el select
    aplicarFiltrosYMostrar();    // Muestra todos los productos inicialmente
    productosFiltrados = [...productos];

    mostrarProductos(productosFiltrados);
  } catch (error) {
    console.error("Error al cargar productos:", error);
    mostrarErrorCarga();
  }
}

// Función para mostrar error de carga
function mostrarErrorCarga() {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = `
    <div class="error-carga" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #a0522d;">
        <p>⚠️ Error al cargar los productos. Por favor, intente más tarde.</p>
        <p>Detalle: ${error.message}</p>
    </div>
  `;
}

function mostrarProductos(lista) {
   const contenedor = document.getElementById("contenedorProductos");

  if (!lista || lista.length === 0) {
    contenedor.innerHTML =
      '<div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 2rem;">No se encontraron productos con esos filtros.</div>';
    return;
  }

  const html = lista.map(producto => crearCartaProducto(producto)).join('');
  contenedor.innerHTML = html;

  inicializarLazyLoading();
}

// Lazy loading de imagenes
function inicializarLazyLoading() {
  const lazyImages = document.querySelectorAll("img.lazy");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        obs.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => observer.observe(img));
}

// Función para generar opciones de categoría dinámicamente
function generarOpcionesCategorias() {
 const categoriaSelect = document.getElementById("filtro-categoria");
    if (!categoriaSelect) {
        console.warn("Elemento #filtro-categoria no encontrado.");
        return;
    }

    // Obtener categorías únicas
    const categoriasUnicas = ["todos", ...new Set(productos.map(p => p.categoria.toLowerCase()))];

    // Llenar el select
    categoriaSelect.innerHTML = "";
    categoriasUnicas.forEach(categoria => {
        const nombreMostrar = categoria === "todos" ? "Todas las Categorías" : categoria.charAt(0).toUpperCase() + categoria.slice(1);
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = nombreMostrar;
        categoriaSelect.appendChild(option);
    });
}

function configurarEventosBusqueda() {
  const categoriaSelect = document.getElementById("filtro-categoria");
    const busquedaInput = document.getElementById("busquedaInput");
    
    // Evento de Búsqueda
    if (busquedaInput) {
        busquedaInput.addEventListener("input", (event) => {
            clearTimeout(busquedaInput.searchTimeout);
            terminoBuscado = event.target.value.toLowerCase().trim();

            busquedaInput.searchTimeout = setTimeout(() => {
                aplicarFiltrosYMostrar(); // Llama a la función unificada
            }, 300);
        });
    }

    // Evento de Filtro por Categoría
    if (categoriaSelect) {
        categoriaSelect.addEventListener("change", (event) => {
            categoriaSeleccionada = event.target.value;
            aplicarFiltrosYMostrar(); // Llama a la función unificada
        });
    }
}

// Función para mostrar información de resultados
function actualizarInfoResultados(encontrados, total) {
  const infoElement = document.getElementById("resultados-info");
  if (!infoElement) return;

  if (terminoBuscado || categoriaSeleccionada !== "todos") {
    let mensaje = `Mostrando ${encontrados} de ${total} productos`;

    if (terminoBuscado && categoriaSeleccionada !== "todos") {
      mensaje += ` para "${terminoBuscado}" en categoría "${categoriaSeleccionada}"`;
    } else if (terminoBuscado) {
      mensaje += ` para "${terminoBuscado}"`;
    } else if (categoriaSeleccionada !== "todos") {
      mensaje += ` en categoría "${categoriaSeleccionada}"`;
    }

    infoElement.textContent = mensaje;
    infoElement.classList.remove("oculto");
  } else {
    infoElement.classList.add("oculto");
  }
}

function crearCartaProducto(producto) {
  // Usar data-src para lazy loading
  const imagenSrc = imageObserver
    ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDI1MCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI1MCIgaGVpZ2h0PSIyNTAiIGZpbGw9IiNmNWU2ZDMiLz48L3N2Zz4="
    : producto.imagen;
  const dataSrc = imageObserver ? producto.imagen || "" : "";
  const lazyClass = imageObserver ? "lazy" : "";

  return `
    <div class="carta-producto" tabindex="0">
        <a href="producto.html?id=${producto.id}" class="enlace-producto">
            <img src="${imagenSrc}" 
                 ${dataSrc ? `data-src="${dataSrc}"` : ""}
                 alt="${producto.nombre}"
                 class="${lazyClass}"
                 onerror="this.src='https://jazminshaiel.github.io/hermanos_jota/img/placeholder.png'; this.onerror=null;"
                 loading="lazy">
            <div class="info-producto">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <span class="precio-producto">${producto.precio}</span>
            </div>
        </a>
        <button class="boton-carrito" data-producto-id="${producto.id}">
            <i class="fas fa-shopping-cart"></i>
            Añadir al carrito
        </button>
    </div>
  `;
}

function aplicarFiltrosYMostrar() {
  let productosAFiltrar = [...productos]; // Empieza con todos los productos

    // A) FILTRAR POR TÉRMINO DE BÚSQUEDA
    if (terminoBuscado) {
        const termino = terminoBuscado.toLowerCase();
        productosAFiltrar = productosAFiltrar.filter(
            (producto) =>
                producto.nombre.toLowerCase().includes(termino) ||
                producto.descripcion.toLowerCase().includes(termino)
        );
    }

    // B) FILTRAR POR CATEGORÍA
    if (categoriaSeleccionada !== "todos") {
        productosAFiltrar = productosAFiltrar.filter(
            (producto) => producto.categoria === categoriaSeleccionada
        );
    }

    // Mostrar el resultado filtrado
    productosFiltrados = productosAFiltrar;
    mostrarProductos(productosFiltrados);
}

function limpiarTodosFiltros() {
  const busquedaInput = document.getElementById("busquedaInput");
  const filtroCategoria = document.getElementById("filtro-categoria");

  if (busquedaInput) {
    busquedaInput.value = "";
  }

  if (filtroCategoria) {
    filtroCategoria.value = "todos";
  }

  terminoBuscado = "";
  categoriaSeleccionada = "todos";
  aplicarFiltros();

  if (busquedaInput) {
    busquedaInput.focus();
  }
}

// Función para limpiar búsqueda
function limpiarBusqueda() {
  limpiarTodosFiltros();
}

//Eventos de "escucha"
// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  cargarProductosDesdeAPI();
    configurarEventosBusqueda();
});

// Función para manejar errores de imágenes de forma global
function manejarErrorImagen(img) {
  img.src = "https://jazminshaiel.github.io/hermanos_jota/img/placeholder.png";
  img.onerror = null; // Evitar bucle infinito
  console.warn(`Error al cargar imagen: ${img.dataset.src || img.src}`);
}

// Función para limpiar recursos al salir de la página
window.addEventListener("beforeunload", () => {
  if (imageObserver) {
    imageObserver.disconnect();
  }
});

// Funciones globalmente
window.limpiarBusqueda = limpiarBusqueda;
window.limpiarTodosFiltros = limpiarTodosFiltros;
window.manejarErrorImagen = manejarErrorImagen;