let productos = [];
let busquedaActiva = false;
let productosFiltrados = [];
let terminoBuscado = "";
let categoriaSeleccionada = "todos"; //  Variable para filtro de categoría
// Intersection Observer para lazy loading de imágenes
let imageObserver;

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
			throw new Error("Error en la respuesta del servidor");
		}
		const data = await response.json();
		
		// Normalizar productos (fallback de imagen y texto)
		productos = data.map((producto) => ({
			...producto,
			imagen: producto.imagen?.trim() || "https://jazminshaiel.github.io/hermanos_jota/img/placeholder.png",
			nombre: producto.nombre?.trim() || "Producto sin nombre",
			descripcion: producto.descripcion?.trim() || "Sin descripción disponible",
			categoria: producto.categoria?.toLowerCase()?.trim() || "sin-categoria",
		}));
		
		productosFiltrados = [...productos];
		
		generarOpcionesCategorias();
		mostrarProductos(productos);
	} catch (error) {
		console.error("Error al cargar productos:", error);
		mostrarErrorCarga();
	}
	
	// Ejecutar al cargar la página
	document.addEventListener("DOMContentLoaded", () => {
		inicializarLazyLoading();
		cargarProductosDesdeAPI();  // Ahora usamos la API real
		configurarEventosBusqueda();
		configurarFiltroCategoria();
	});
}

// Función para mostrar error de carga
function mostrarErrorCarga() {
	const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = `
    <div class="error" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: red;">
      <p>Error al cargar los productos. Intenta nuevamente más tarde.</p>
    </div>
  `;
}

function mostrarProductos(lista) {
	const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";

  if (!lista || lista.length === 0) {
    contenedor.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <p>No se encontraron productos para mostrar.</p>
      </div>
    `;
    return;
  }

  lista.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("producto");

    card.innerHTML = `
      <img class="lazy" data-src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p><strong>$${producto.precio}</strong></p>
    `;

    contenedor.appendChild(card);
  });

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
	const selectCategoria = document.getElementById("filtro-categoria");
	if (!selectCategoria) return;

	// Obtener categorías únicas de los productos
	const categoriasUnicas = [
		...new Set(productos.map((p) => p.categoria)),
	].sort();

	// Limpiar opciones existentes (mantener solo "todos")
	selectCategoria.innerHTML =
		'<option value="todos">Todas las categorías</option>';

	// Agregar opciones dinámicamente
	categoriasUnicas.forEach((categoria) => {
		if (categoria && categoria !== "sin-categoria") {
			const option = document.createElement("option");
			option.value = categoria;
			option.textContent =
				categoria.charAt(0).toUpperCase() + categoria.slice(1);
			selectCategoria.appendChild(option);
		}
	});
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




function aplicarFiltros() {
	let productosTemp = [...productos];

	// Filtrar por categoría
	if (categoriaSeleccionada && categoriaSeleccionada !== "todos") {
		productosTemp = productosTemp.filter(
			(producto) => producto.categoria === categoriaSeleccionada
		);
	}

	// Filtrar por búsqueda
	if (terminoBuscado) {
		productosTemp = productosTemp.filter(
			(producto) =>
				producto.nombre.toLowerCase().includes(terminoBuscado) ||
				producto.descripcion.toLowerCase().includes(terminoBuscado) ||
				(producto.categoria &&
					producto.categoria.toLowerCase().includes(terminoBuscado))
		);
	}

	productosFiltrados = productosTemp;
	busquedaActiva = false;
	mostrarProductos(productosFiltrados);

	// Estadísticas
	if (terminoBuscado || categoriaSeleccionada !== "todos") {
		console.log(
			`Filtros aplicados - Búsqueda: "${terminoBuscado}", Categoría: "${categoriaSeleccionada}" - ${productosFiltrados.length} de ${productos.length} productos encontrados`
		);
	}
}

function aplicarBusqueda(termino) {
	terminoBuscado = termino.toLowerCase().trim();
	aplicarFiltros();
}

// Función para filtro por categoría
function aplicarFiltroPorCategoria(categoria) {
	categoriaSeleccionada = categoria;
	aplicarFiltros();
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

// Función para configurar filtro de categoría
function configurarFiltroCategoria() {
	const filtroCategoria = document.getElementById("filtro-categoria");

	if (filtroCategoria) {
		filtroCategoria.addEventListener("change", (event) => {
			const categoria = event.target.value;
			aplicarFiltroPorCategoria(categoria);
		});
	}
}

function configurarEventosBusqueda() {
	const busquedaInput = document.getElementById("busquedaInput");
	const busquedaButton = document.querySelector(".btn-busqueda");

	if (busquedaButton) {
		busquedaButton.addEventListener("click", (event) => {
			event.preventDefault();
			const termino = busquedaInput
				? busquedaInput.value.toLowerCase().trim()
				: "";
			aplicarBusqueda(termino);
		});

		if (busquedaInput) {
			let timeoutId;

			busquedaInput.addEventListener("input", (event) => {
				const termino = busquedaInput.value.toLowerCase().trim();
				clearTimeout(timeoutId);

				if (busquedaActiva) return;

				timeoutId = setTimeout(() => {
					aplicarBusqueda(termino);
				}, 300); // Aumentado a 300ms para mejor performance
			});

			busquedaInput.addEventListener("keydown", (event) => {
				switch (event.key) {
					case "Enter":
						event.preventDefault();
						clearTimeout(timeoutId);
						const termino = busquedaInput.value.toLowerCase().trim();
						aplicarBusqueda(termino);
						break;

					case "Escape":
						event.preventDefault();
						limpiarTodosFiltros();
						break;
				}
			});

			// Mejorar accesibilidad
			busquedaInput.addEventListener("focus", () => {
				busquedaInput.setAttribute("aria-expanded", "true");
			});

			busquedaInput.addEventListener("blur", () => {
				busquedaInput.setAttribute("aria-expanded", "false");
			});
		}
	}
}

//Eventos de "escucha"
document.addEventListener("DOMContentLoaded", () => {
	// Inicializar lazy loading
	inicializarLazyLoading();
	// Configurar eventos de búsqueda y filtros
	configurarEventosBusqueda();
	configurarFiltroCategoria();
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
window.aplicarBusqueda = aplicarBusqueda;
window.limpiarBusqueda = limpiarBusqueda;
window.limpiarTodosFiltros = limpiarTodosFiltros;
window.aplicarFiltroPorCategoria = aplicarFiltroPorCategoria;
window.manejarErrorImagen = manejarErrorImagen;
