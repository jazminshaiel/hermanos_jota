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

	cargarRelacionados(idProducto);
});

function cargarRelacionados(idActual) {
	const contenedor = document.getElementById("relacionados-container");

	const relacionados = productosData
		.filter((p) => p.id !== idActual)
		.sort(() => Math.random() - 0.5)
		.slice(0, 3);

	relacionados.forEach((prod) => {
		const item = document.createElement("a");
		item.href = `producto.html?id=${prod.id}`;
		item.classList.add("relacionado-item");
		item.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p class="precio">${prod.precio}</p>
    `;
		contenedor.appendChild(item);
	});
}
