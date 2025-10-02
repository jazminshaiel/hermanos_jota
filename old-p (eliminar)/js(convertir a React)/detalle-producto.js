document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const idProducto = parseInt(params.get("id"));

	const producto = productosData.find((p) => p.id === idProducto);

	if (!producto) {
		document.querySelector(".main-producto").innerHTML = `
      <div style="padding: 2rem; text-align: center;">
        <h2>Producto no encontrado</h2>
        <a href="productos.html" style="color: #a0522d;">Volver al catálogo</a>
      </div>
    `;
		return;
	}
	const imagen = document.querySelector(".producto-imagen img");
	const titulo = document.querySelector(".producto-info h1");
	const precio = document.querySelector(".producto-info .precio");
	const descripcion = document.querySelector(".producto-info .descripcion");

	imagen.src = producto.imagen;
	imagen.alt = producto.nombre;
	titulo.textContent = producto.nombre;
	precio.textContent = producto.precio;
	descripcion.textContent = producto.descripcion;

	// Configurar botón de carrito
	const botonCarrito = document.querySelector('.boton-carrito');
	if (botonCarrito) {
		botonCarrito.addEventListener('click', (event) => {
			event.preventDefault();
			
			if (typeof window.añadirAlCarrito === 'function') {
				window.añadirAlCarrito(producto);
				
				// Animación del botón
				botonCarrito.classList.add('añadido');
				botonCarrito.innerHTML = '<i class="fas fa-check"></i> Añadido al carrito';
				
				setTimeout(() => {
					botonCarrito.classList.remove('añadido');
					botonCarrito.innerHTML = '<i class="fas fa-shopping-cart"></i> Añadir al carrito';
				}, 2000);
			}
		});
	}

	cargarRelacionados(idProducto);
});

function cargarRelacionados(idActual) {
	const contenedor = document.getElementById("relacionados-container");

	const relacionados = productosData
		.filter((p) => p.id !== idActual)
		.sort(() => Math.random() - 0.5)
		.slice(0, 3);

	relacionados.forEach((prod) => {
		const item = document.createElement("div");
		item.classList.add("relacionado-item");
		item.innerHTML = `
      <a href="producto.html?id=${prod.id}" class="enlace-relacionado">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p class="precio">${prod.precio}</p>
      </a>
      <button class="boton-carrito" data-producto-id="${prod.id}">
        <i class="fas fa-shopping-cart"></i>
        Añadir al carrito
      </button>
    `;
		
		// Configurar evento para el botón de carrito
		const botonCarrito = item.querySelector('.boton-carrito');
		if (botonCarrito) {
			botonCarrito.addEventListener('click', (event) => {
				event.preventDefault();
				event.stopPropagation();
				
				if (typeof window.añadirAlCarrito === 'function') {
					window.añadirAlCarrito(prod);
					
					// Animación del botón
					botonCarrito.classList.add('añadido');
					setTimeout(() => {
						botonCarrito.classList.remove('añadido');
					}, 600);
				}
			});
		}
		
		contenedor.appendChild(item);
	});
}
