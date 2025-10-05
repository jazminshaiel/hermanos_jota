export function DetailedProduct({ producto, añadirAlCarrito }) {
	const precioFormateado = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
		minimumFractionDigits: 0,
	}).format(producto.precio);

	const handleAñadirAlCarrito = () => {
		if (añadirAlCarrito) {
			añadirAlCarrito(producto);
		}
	};

	return (
		<section className="main-producto">
			<aside className="producto-imagen">
				<img src={producto.imagen} alt={producto.nombre} />
			</aside>
			<div className="producto-info">
				<h1>{producto.nombre}</h1>
				<p className="precio">{precioFormateado}</p>
				<p className="descripcion">{producto.descripcion}</p>
				<button 
					className="boton-carrito" 
					onClick={handleAñadirAlCarrito}
				>
					Añadir al carrito
				</button>
			</div>
		</section>
	);
}
